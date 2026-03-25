'use client';

import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDiagnosisStore } from '@/store/diagnosisStore';
import { STEPS, questions, getQuestionsByStep, AnswerValue } from '@/data/questions';
import ProgressBar from '@/components/diagnosis/ProgressBar';
import StepIndicator from '@/components/diagnosis/StepIndicator';
import QuestionCard from '@/components/diagnosis/QuestionCard';
import NavigationBar from '@/components/diagnosis/NavigationBar';
import Disclaimer from '@/components/layout/Disclaimer';
import Link from 'next/link';

export default function DiagnosisPage() {
  const router = useRouter();
  const {
    answers,
    currentStep,
    currentQuestionIndex,
    startedAt,
    setAnswer,
    nextQuestion,
    prevQuestion,
    startDiagnosis,
    completeDiagnosis,
    getProgress,
    getCurrentQuestion,
    isAllComplete,
  } = useDiagnosisStore();

  // 진단 시작 시 타이머 세팅
  useEffect(() => {
    if (!startedAt) {
      startDiagnosis();
    }
  }, [startedAt, startDiagnosis]);

  const progress = getProgress();
  const currentQuestion = getCurrentQuestion();
  const stepQuestions = useMemo(() => getQuestionsByStep(currentStep), [currentStep]);
  const stepInfo = STEPS.find((s) => s.step === currentStep);

  // 전체 문항 중 현재 인덱스 계산
  const globalIndex = useMemo(() => {
    let idx = 0;
    for (let s = 1; s < currentStep; s++) {
      idx += getQuestionsByStep(s).length;
    }
    return idx + currentQuestionIndex;
  }, [currentStep, currentQuestionIndex]);

  // 네비게이션 조건
  const canGoPrev = currentStep > 1 || currentQuestionIndex > 0;
  const isLastQuestion = currentStep === STEPS.length && currentQuestionIndex === stepQuestions.length - 1;

  const handleAnswer = (answer: AnswerValue) => {
    if (!currentQuestion) return;
    const prev = answers[currentQuestion.id];
    const wasUnanswered = prev === undefined || prev === null;
    const isChange = wasUnanswered || prev !== answer;

    setAnswer(currentQuestion.id, answer);

    // 마지막 문항을 처음 응답한 경우 → 근로자성 진단(free119)처럼 바로 결과로
    if (isLastQuestion && wasUnanswered) {
      completeDiagnosis();
      router.push('/result');
      return;
    }

    // 같은 응답을 다시 누른 경우(복귀 후 확인 등)에는 이동하지 않음
    if (!isChange) return;

    if (!isLastQuestion) {
      nextQuestion();
    }
  };

  const handleComplete = () => {
    completeDiagnosis();
    router.push('/result');
  };

  if (!currentQuestion) {
    return <div className="min-h-screen flex items-center justify-center text-ink-4">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* 상단 고정바 */}
      <div className="sticky top-0 z-50 bg-sand-50/95 backdrop-blur-md border-b border-sand-200">
        <div className="max-w-[960px] mx-auto px-7 py-3">
          {/* Header row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-3">
              <Link href="/consult" className="text-[11px] text-ink-4 hover:text-ink font-medium">
                비대면 상담
              </Link>
              <Link href="/" className="text-[11px] text-ink-4 hover:text-ink font-medium">
                처음으로
              </Link>
            </div>
            <div className="text-sm font-extrabold text-ink tracking-tight">
              SAFE<span className="text-copper">119</span>{' '}
              <span className="text-xs font-normal text-ink-5">자가진단</span>
            </div>
            <a
              href="https://free119.site"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[11px] text-ink-4 hover:text-ink font-medium"
            >
              FREE119 근로자성 진단
            </a>
          </div>

          {/* Progress bar */}
          <ProgressBar
            answered={progress.answered}
            total={progress.total}
            percentage={progress.percentage}
          />

          {/* Step indicator */}
          <div className="mt-3">
            <StepIndicator />
          </div>
        </div>
      </div>

      {/* Main content */}
      <main className="max-w-[960px] mx-auto px-7 py-8">
        {/* Step Header */}
        <div className="mb-6">
          <span className="text-[11px] font-bold text-copper uppercase tracking-[1.2px]">
            STEP {currentStep} / {STEPS.length}
          </span>
          <h2 className="text-xl font-extrabold text-ink mt-1 mb-1">{stepInfo?.name}</h2>
          <p className="text-[13px] text-ink-4 leading-relaxed">{stepInfo?.description}</p>
          <p className="text-[11px] text-ink-5 mt-1">
            관련 조문: {stepInfo?.article}
          </p>
        </div>

        {/* Disclaimer (collapsible) */}
        <details className="mb-6 bg-sand-100 border border-sand-200 rounded-lg">
          <summary className="px-4 py-2.5 text-[11px] text-ink-5 cursor-pointer font-medium">
            면책 안내 (클릭하여 펼치기)
          </summary>
          <div className="px-4 pb-3 text-[11px] text-ink-5 leading-relaxed">
            본 진단은 중처법 시행령 제4조·KOSHA 7대 핵심요소를 참고한 자가진단입니다.
            법적 효력이 없으며, 정확한 법률 검토는 전문가 상담을 이용하세요.
          </div>
        </details>

        {/* Question Card */}
        <QuestionCard
          question={currentQuestion}
          questionIndexInStep={currentQuestionIndex}
          totalInStep={stepQuestions.length}
          globalIndex={globalIndex}
          totalGlobal={questions.length}
          selectedAnswer={answers[currentQuestion.id] ?? null}
          onAnswer={handleAnswer}
        />

        {/* Navigation — 다음 버튼 없이 응답 선택으로 이동(연계 근로자성 진단과 동일 UX) */}
        <NavigationBar
          onPrev={prevQuestion}
          canGoPrev={canGoPrev}
          showResultCta={isAllComplete()}
          onComplete={handleComplete}
        />

      </main>

      {/* Footer Disclaimer */}
      <Disclaimer variant="compact" />
    </div>
  );
}
