import { create } from 'zustand';
import { AnswerValue, STEPS, questions, getQuestionsByStep } from '@/data/questions';

interface DiagnosisState {
  // 응답 데이터
  answers: Record<number, AnswerValue>;
  // 현재 진행 상태
  currentStep: number;
  currentQuestionIndex: number; // step 내 질문 인덱스 (0-based)
  // 타임스탬프
  startedAt: Date | null;
  completedAt: Date | null;
  // 사업장 정보
  companyName: string;
  industry: string;
  employeeCount: string;

  // 액션
  setAnswer: (questionId: number, answer: AnswerValue) => void;
  nextQuestion: () => void;
  prevQuestion: () => void;
  goToStep: (step: number) => void;
  startDiagnosis: () => void;
  completeDiagnosis: () => void;
  setCompanyInfo: (name: string, industry: string, count: string) => void;
  reset: () => void;

  // 계산된 값
  getProgress: () => { answered: number; total: number; percentage: number };
  getCurrentQuestion: () => typeof questions[0] | null;
  getStepQuestions: () => typeof questions;
  isStepComplete: (step: number) => boolean;
  isAllComplete: () => boolean;
}

export const useDiagnosisStore = create<DiagnosisState>((set, get) => ({
  answers: {},
  currentStep: 1,
  currentQuestionIndex: 0,
  startedAt: null,
  completedAt: null,
  companyName: '',
  industry: '',
  employeeCount: '',

  setAnswer: (questionId, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    }));
  },

  nextQuestion: () => {
    const state = get();
    const stepQuestions = getQuestionsByStep(state.currentStep);

    if (state.currentQuestionIndex < stepQuestions.length - 1) {
      // 같은 STEP 내에서 다음 질문
      set({ currentQuestionIndex: state.currentQuestionIndex + 1 });
    } else {
      // 다음 STEP으로 이동
      const nextStep = state.currentStep + 1;
      if (nextStep <= STEPS.length) {
        set({ currentStep: nextStep, currentQuestionIndex: 0 });
      }
    }
  },

  prevQuestion: () => {
    const state = get();

    if (state.currentQuestionIndex > 0) {
      set({ currentQuestionIndex: state.currentQuestionIndex - 1 });
    } else {
      // 이전 STEP의 마지막 질문으로
      const prevStep = state.currentStep - 1;
      if (prevStep >= 1) {
        const prevStepQuestions = getQuestionsByStep(prevStep);
        set({
          currentStep: prevStep,
          currentQuestionIndex: prevStepQuestions.length - 1,
        });
      }
    }
  },

  goToStep: (step) => {
    set({ currentStep: step, currentQuestionIndex: 0 });
  },

  startDiagnosis: () => {
    set({ startedAt: new Date(), currentStep: 1, currentQuestionIndex: 0 });
  },

  completeDiagnosis: () => {
    set({ completedAt: new Date() });
  },

  setCompanyInfo: (name, industry, count) => {
    set({ companyName: name, industry, employeeCount: count });
  },

  reset: () => {
    set({
      answers: {},
      currentStep: 1,
      currentQuestionIndex: 0,
      startedAt: null,
      completedAt: null,
      companyName: '',
      industry: '',
      employeeCount: '',
    });
  },

  getProgress: () => {
    const { answers } = get();
    const answered = Object.values(answers).filter((a) => a !== null).length;
    const total = questions.length;
    return {
      answered,
      total,
      percentage: total > 0 ? Math.round((answered / total) * 100) : 0,
    };
  },

  getCurrentQuestion: () => {
    const { currentStep, currentQuestionIndex } = get();
    const stepQuestions = getQuestionsByStep(currentStep);
    return stepQuestions[currentQuestionIndex] ?? null;
  },

  getStepQuestions: () => {
    const { currentStep } = get();
    return getQuestionsByStep(currentStep);
  },

  isStepComplete: (step) => {
    const { answers } = get();
    const stepQuestions = getQuestionsByStep(step);
    return stepQuestions.every((q) => answers[q.id] !== undefined && answers[q.id] !== null);
  },

  isAllComplete: () => {
    const { answers } = get();
    return questions.every((q) => answers[q.id] !== undefined && answers[q.id] !== null);
  },
}));
