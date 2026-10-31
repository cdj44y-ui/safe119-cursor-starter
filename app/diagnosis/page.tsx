'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useDiagnosisStore } from '@/store/diagnosisStore';
import { STEPS, questions, getQuestionsByStep, AnswerValue } from '@/data/questions';

// 2026-10-18 가독성 개편: 한 화면 한 질문, 큰 글씨·큰 버튼, 법 조문 순서 단계 목록
const OPTIONS: { value: Exclude<AnswerValue, null>; label: string; hint: string; mark: string; c: string; tint: string }[] = [
  { value: 'O', label: '이행 완료 (O)', hint: '갖추고 있고 기록도 있습니다', mark: 'O', c: '#2F6B4F', tint: '#EDF4EF' },
  { value: 'triangle', label: '일부 이행 (△)', hint: '일부만 갖추었거나 기록이 부족합니다', mark: '△', c: '#A06C14', tint: '#FBF3E2' },
  { value: 'X', label: '미이행 (X)', hint: '아직 갖추지 못했습니다', mark: 'X', c: '#A4262C', tint: '#FBEDEB' },
  { value: 'NA', label: '해당없음 (N/A)', hint: '우리 사업장에는 해당하지 않습니다', mark: '–', c: '#5E6670', tint: '#F1F2F3' },
];

export default function DiagnosisPage() {
  const router = useRouter();
  const {
    answers, currentStep, currentQuestionIndex, startedAt,
    setAnswer, nextQuestion, prevQuestion, goToStep, startDiagnosis, completeDiagnosis,
    getProgress, getCurrentQuestion, isAllComplete,
  } = useDiagnosisStore();
  const [showGuide, setShowGuide] = useState(false);

  useEffect(() => { if (!startedAt) startDiagnosis(); }, [startedAt, startDiagnosis]);

  const progress = getProgress();
  const q = getCurrentQuestion();
  const stepQuestions = useMemo(() => getQuestionsByStep(currentStep), [currentStep]);
  const stepInfo = STEPS.find((s) => s.step === currentStep);

  useEffect(() => { try { (window as any).va?.('event', { name: 'diag_section', data: { site: 'safe', section: currentStep + '. ' + (stepInfo?.name ?? '') } }); } catch {} }, [currentStep]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    setShowGuide(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentStep, currentQuestionIndex]);

  const canGoPrev = currentStep > 1 || currentQuestionIndex > 0;
  const isLast = currentStep === STEPS.length && currentQuestionIndex === stepQuestions.length - 1;
  const allDone = isAllComplete();

  const handleAnswer = (answer: AnswerValue) => {
    if (!q) return;
    const prev = answers[q.id];
    const wasUnanswered = prev === undefined || prev === null;
    setAnswer(q.id, answer);
    if (isLast && wasUnanswered) {
      completeDiagnosis();
      router.push('/result');
      return;
    }
    if (!wasUnanswered && prev === answer) return;
    if (!isLast) setTimeout(() => nextQuestion(), 220);
  };

  const finish = () => { completeDiagnosis(); router.push('/result'); };

  if (!q) return <div className="flex min-h-screen items-center justify-center text-[18px] text-[#6A706B]">불러오는 중…</div>;

  const stepDone = (s: number) => {
    const qs = getQuestionsByStep(s);
    return { done: qs.filter((x) => answers[x.id] != null).length, total: qs.length };
  };

  return (
    <div className="min-h-screen bg-[#F4EFE4] pb-28 text-[#1C2421] [word-break:keep-all] md:pb-16">
      {/* 상단 */}
      <header className="sticky top-0 z-50 border-b border-[#D9D0BE] bg-white">
        <div className="mx-auto flex max-w-[1140px] items-center gap-6 px-5 py-4 md:px-8">
          <Link href="/" className="shrink-0 text-[20px] font-extrabold text-[#1C2421]">SAFE<span className="text-[#8E2B2B]">119</span></Link>
          <div className="flex-1">
            <div className="flex items-baseline justify-between text-[16px]">
              <span className="font-bold">진행 {progress.answered} / {progress.total} 문항</span>
              <span className="font-bold text-[#74221F]">{progress.percentage}%</span>
            </div>
            <div className="mt-2 h-2.5 overflow-hidden rounded-full bg-[#E6DFD0]">
              <div className="h-full rounded-full bg-[#8E2B2B] transition-all" style={{ width: progress.percentage + '%' }} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto mt-6 grid max-w-[1140px] gap-6 px-5 md:mt-8 md:grid-cols-[290px_1fr] md:px-8">
        {/* 단계 목록 */}
        <aside className="hidden md:block">
          <p className="mb-3 text-[15px] font-bold text-[#6A706B]">점검 순서 · 법 조문 순</p>
          <nav className="overflow-hidden rounded-[14px] border border-[#D9D0BE] bg-white">
            {STEPS.map((s) => {
              const st = stepDone(s.step);
              const active = s.step === currentStep;
              const done = st.done === st.total;
              return (
                <button key={s.step} type="button" onClick={() => goToStep(s.step)}
                  className={'grid w-full grid-cols-[64px_1fr_auto] items-center gap-2 border-b border-[#EFE8DA] px-4 py-3 text-left last:border-b-0 ' + (active ? 'bg-[#1C2421] text-white' : 'bg-white hover:bg-[#FAF6EE]')}>
                  <span className={'text-[13px] font-bold ' + (active ? 'text-[#D9A44A]' : 'text-[#C8912E]')}>{s.label}</span>
                  <span className={'text-[15px] leading-snug ' + (active ? 'font-bold' : 'text-[#3D4540]')}>{s.name}</span>
                  <span className={'text-[13px] font-bold ' + (done ? (active ? 'text-[#F2B8B5]' : 'text-[#74221F]') : active ? 'text-[#CFC9BB]' : 'text-[#9A9384]')}>{done ? '완료' : st.done + '/' + st.total}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* 질문 */}
        <main>
          <div className="rounded-[16px] border border-[#D9D0BE] bg-white p-6 md:p-10">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="rounded-md bg-[#1C2421] px-2.5 py-1 text-[14px] font-bold text-white">{stepInfo?.article}</span>
              <span className="text-[16px] font-bold text-[#6A706B]">{stepInfo?.name} · {currentQuestionIndex + 1} / {stepQuestions.length}</span>
              {q.riskLevel === 'high' && <span className="rounded-md bg-[#FBEDEA] px-2 py-0.5 text-[13px] font-bold text-[#A4262C]">핵심 의무</span>}
            </div>
            <h1 className="mt-4 text-[24px] font-bold leading-[1.55] tracking-[-0.4px] md:text-[29px]">{q.question}</h1>
            {q.plainTip && <p className="mt-3 text-[18px] leading-[1.7] text-[#3D4540]"><b className="text-[#C8912E]">쉽게 말하면 · </b>{q.plainTip}</p>}

            <div className="mt-6 rounded-xl border border-[#E6DFD0] bg-[#FAF7F0] px-5 py-4">
              <div className="grid gap-1 md:grid-cols-[86px_1fr] md:gap-3">
                <p className="text-[15px] font-bold text-[#6A706B]">법적 근거</p>
                <p className="text-[17px] leading-[1.6]">{q.legalBasis}{q.reference ? <span className="block text-[15px] text-[#6A706B]">참고: {q.reference}</span> : null}</p>
              </div>
              {/* 2026-10-31 lean: 문항별 준비 방법은 상담에서 안내 */}
            </div>

            <div className="mt-7 grid gap-3">
              {OPTIONS.map((o) => {
                const sel = answers[q.id] === o.value;
                return (
                  <button key={o.value} type="button" onClick={() => handleAnswer(o.value)} aria-pressed={sel}
                    className="group flex min-h-[72px] w-full items-center gap-4 overflow-hidden rounded-xl border-2 bg-white pr-5 text-left transition hover:-translate-y-px"
                    style={{ borderColor: sel ? o.c : '#E3DBCB', background: sel ? o.tint : '#FFFFFF' }}>
                    <span className="flex h-full min-h-[72px] w-[64px] shrink-0 items-center justify-center text-[24px] font-extrabold transition"
                      style={{ background: sel ? o.c : o.tint, color: sel ? '#FFFFFF' : o.c }} aria-hidden>{o.mark}</span>
                    <span className="flex-1 py-3">
                      <span className="block text-[20px] font-bold leading-tight" style={{ color: sel ? o.c : '#1C2421' }}>{o.label}</span>
                      <span className="mt-1 block text-[15px] text-[#6A706B]">{o.hint}</span>
                    </span>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border-2 text-[16px] font-extrabold transition"
                      style={{ borderColor: sel ? o.c : '#D6CDBB', background: sel ? o.c : 'transparent', color: sel ? '#FFFFFF' : 'transparent' }} aria-hidden>✓</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-5 flex items-center justify-between gap-3">
            <button type="button" onClick={prevQuestion} disabled={!canGoPrev} className="h-[56px] rounded-[10px] border-[1.5px] border-[#CFC6B4] bg-white px-6 text-[18px] font-bold text-[#3D4540] disabled:opacity-40">← 이전 질문</button>
            {allDone ? (
              <button type="button" onClick={finish} className="h-[56px] rounded-[10px] bg-[#8E2B2B] px-8 text-[18px] font-bold text-white hover:bg-[#74221F]">결과 보기 →</button>
            ) : (
              <span className="text-[15px] text-[#6A706B]">답을 고르면 다음 질문으로 넘어갑니다</span>
            )}
          </div>
          <p className="mt-6 text-[14px] leading-[1.7] text-[#6A706B]">본 진단은 중대재해처벌법 시행령 제4조 등을 바탕으로 한 참고용 자가진단이며 법적 효력이 없습니다. 구체적인 판단은 전문가 상담으로 확인하시기 바랍니다.</p>
        </main>
      </div>

      {/* 모바일 단계 이동 */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D9D0BE] bg-white px-3 py-2.5 md:hidden">
        <div className="flex gap-2 overflow-x-auto">
          {STEPS.map((s) => {
            const st = stepDone(s.step);
            return (
              <button key={s.step} type="button" onClick={() => goToStep(s.step)}
                className={'shrink-0 whitespace-nowrap rounded-lg border px-3 py-2 text-[15px] ' + (s.step === currentStep ? 'border-[#1C2421] bg-[#1C2421] font-bold text-white' : 'border-[#D9D0BE] bg-white text-[#3D4540]')}>
                {s.label} {st.done}/{st.total}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
