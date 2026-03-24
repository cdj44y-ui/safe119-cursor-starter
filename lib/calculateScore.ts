import { AnswerValue, Question, questions, getQuestionsByStep, STEPS } from '@/data/questions';

export type Grade = 'A' | 'B' | 'C' | 'D';

export interface StepScore {
  step: number;
  stepName: string;
  stepLabel: string;
  totalQuestions: number;
  applicableQuestions: number; // N/A 제외
  score: number;
  maxScore: number;
  percentage: number;
  grade: Grade;
  oCount: number;
  triangleCount: number;
  xCount: number;
  naCount: number;
  highRiskFails: Question[];
}

export interface TotalResult {
  overallGrade: Grade;
  overallPercentage: number;
  overallScore: number;
  overallMaxScore: number;
  totalQuestions: number;
  applicableQuestions: number;
  oCount: number;
  triangleCount: number;
  xCount: number;
  naCount: number;
  stepScores: StepScore[];
  immediateActions: Question[];  // 고위험 미이행
  shortTermActions: Question[];  // 중위험 미이행 + 고위험 일부이행
  midTermActions: Question[];    // 저위험 미이행 + 중위험 일부이행
  investigatorView: {
    inspector: string[];
    prosecutor: string[];
    police: string[];
  };
}

function getGrade(percentage: number): Grade {
  if (percentage >= 90) return 'A';
  if (percentage >= 70) return 'B';
  if (percentage >= 50) return 'C';
  return 'D';
}

function getAnswerScore(answer: AnswerValue): number {
  switch (answer) {
    case 'O': return 3;
    case 'triangle': return 1;
    case 'X': return 0;
    default: return 0;
  }
}

export function calculateStepScore(step: number, answers: Record<number, AnswerValue>): StepScore {
  const stepQuestions = getQuestionsByStep(step);
  const stepInfo = STEPS.find(s => s.step === step)!;

  let score = 0;
  let oCount = 0;
  let triangleCount = 0;
  let xCount = 0;
  let naCount = 0;
  const highRiskFails: Question[] = [];

  stepQuestions.forEach(q => {
    const answer = answers[q.id];
    if (answer === 'NA') {
      naCount++;
    } else {
      const pts = getAnswerScore(answer);
      score += pts;
      if (answer === 'O') oCount++;
      else if (answer === 'triangle') triangleCount++;
      else {
        xCount++;
        if (q.riskLevel === 'high') highRiskFails.push(q);
      }
    }
  });

  const applicableQuestions = stepQuestions.length - naCount;
  const maxScore = applicableQuestions * 3;
  const percentage = maxScore > 0 ? Math.round((score / maxScore) * 100) : 100;

  return {
    step,
    stepName: stepInfo.name,
    stepLabel: stepInfo.label,
    totalQuestions: stepQuestions.length,
    applicableQuestions,
    score,
    maxScore,
    percentage,
    grade: getGrade(percentage),
    oCount,
    triangleCount,
    xCount,
    naCount,
    highRiskFails,
  };
}

export function calculateTotalResult(answers: Record<number, AnswerValue>): TotalResult {
  const stepScores = STEPS.map(s => calculateStepScore(s.step, answers));

  let totalScore = 0;
  let totalMaxScore = 0;
  let totalO = 0;
  let totalTriangle = 0;
  let totalX = 0;
  let totalNA = 0;

  stepScores.forEach(ss => {
    totalScore += ss.score;
    totalMaxScore += ss.maxScore;
    totalO += ss.oCount;
    totalTriangle += ss.triangleCount;
    totalX += ss.xCount;
    totalNA += ss.naCount;
  });

  const overallPercentage = totalMaxScore > 0 ? Math.round((totalScore / totalMaxScore) * 100) : 0;

  // 액션플랜 분류
  const immediateActions: Question[] = [];
  const shortTermActions: Question[] = [];
  const midTermActions: Question[] = [];

  questions.forEach(q => {
    const answer = answers[q.id];
    if (answer === 'NA') return;

    if (answer === 'X' && q.riskLevel === 'high') {
      immediateActions.push(q);
    } else if (
      (answer === 'X' && q.riskLevel === 'medium') ||
      (answer === 'triangle' && q.riskLevel === 'high')
    ) {
      shortTermActions.push(q);
    } else if (
      (answer === 'X' && q.riskLevel === 'low') ||
      (answer === 'triangle' && q.riskLevel === 'medium')
    ) {
      midTermActions.push(q);
    }
  });

  // 수사·감독 관점 분석
  const investigatorView = generateInvestigatorView(answers, stepScores);

  return {
    overallGrade: getGrade(overallPercentage),
    overallPercentage,
    overallScore: totalScore,
    overallMaxScore: totalMaxScore,
    totalQuestions: questions.length,
    applicableQuestions: questions.length - totalNA,
    oCount: totalO,
    triangleCount: totalTriangle,
    xCount: totalX,
    naCount: totalNA,
    stepScores,
    immediateActions,
    shortTermActions,
    midTermActions,
    investigatorView,
  };
}

function generateInvestigatorView(
  answers: Record<number, AnswerValue>,
  stepScores: StepScore[]
): TotalResult['investigatorView'] {
  const inspector: string[] = [];
  const prosecutor: string[] = [];
  const police: string[] = [];

  // 감독관 관점 — 서류·절차 미비 중심
  const docRelatedSteps = stepScores.filter(s => s.step === 12);
  docRelatedSteps.forEach(ss => {
    if (ss.xCount > 0) {
      inspector.push(`이행점검·서류보존 영역에서 ${ss.xCount}건의 미이행 발견 → 시정명령 대상`);
    }
  });
  const step3 = stepScores.find(s => s.step === 3);
  if (step3 && step3.percentage < 70) {
    inspector.push('안전보건 목표·경영방침 미흡 → 체계 미구축으로 판단 가능');
  }

  // 검사 관점 — 의무 불이행 중심
  const highRiskXCount = questions.filter(q => q.riskLevel === 'high' && answers[q.id] === 'X').length;
  if (highRiskXCount > 0) {
    prosecutor.push(`고위험 핵심의무 ${highRiskXCount}건 미이행 → 기소 시 주요 입증 사항`);
  }
  const step1 = stepScores.find(s => s.step === 1);
  if (step1 && step1.percentage < 50) {
    prosecutor.push('경영책임자 역할 미흡 → 안전보건 확보의무 위반 직접 입증 가능');
  }

  // 경찰 관점 — 증거 확보 중심
  const step12 = stepScores.find(s => s.step === 12);
  if (step12 && step12.xCount > 5) {
    police.push(`이행 증빙 서류 ${step12.xCount}건 미비 → 수사 시 불리한 증거 상황`);
  }
  const naCount = Object.values(answers).filter(a => a === 'NA').length;
  if (naCount > 10) {
    police.push(`해당없음 응답 ${naCount}건 → 의도적 회피 여부 검토 대상`);
  }

  // 기본 안내
  if (inspector.length === 0) inspector.push('현재 감독 시 주요 지적 사항 없음');
  if (prosecutor.length === 0) prosecutor.push('현재 기소 시 주요 입증 사항 없음');
  if (police.length === 0) police.push('현재 수사 시 불리한 증거 상황 없음');

  return { inspector, prosecutor, police };
}

// 등급별 설명
export const GRADE_DESCRIPTIONS: Record<Grade, { label: string; color: string; description: string }> = {
  A: { label: 'A등급 (양호)', color: '#3A6B4A', description: '안전보건관리체계가 전반적으로 잘 구축·이행되고 있습니다. 지속적인 유지·개선이 필요합니다.' },
  B: { label: 'B등급 (보통)', color: '#7A5B1F', description: '안전보건관리체계의 기본 골격은 갖추었으나, 일부 영역에서 개선이 필요합니다.' },
  C: { label: 'C등급 (미흡)', color: '#B5694F', description: '안전보건관리체계에 상당한 미비 사항이 있습니다. 시급한 개선 조치가 필요합니다.' },
  D: { label: 'D등급 (위험)', color: '#8B3A3A', description: '안전보건관리체계가 심각하게 미흡합니다. 즉시 전문가 자문을 받아 체계를 구축해야 합니다.' },
};
