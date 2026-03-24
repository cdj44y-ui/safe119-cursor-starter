'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { useDiagnosisStore } from '@/store/diagnosisStore';
import { calculateTotalResult, GRADE_DESCRIPTIONS, Grade } from '@/lib/calculateScore';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Disclaimer from '@/components/layout/Disclaimer';
import Badge from '@/components/ui/Badge';

const gradeEmoji: Record<Grade, string> = { A: '🟢', B: '🟡', C: '🟠', D: '🔴' };
const riskVariant = { high: 'danger' as const, medium: 'warning' as const, low: 'success' as const };

export default function ResultPage() {
  const { answers, companyName } = useDiagnosisStore();
  const result = useMemo(() => calculateTotalResult(answers), [answers]);
  const gradeInfo = GRADE_DESCRIPTIONS[result.overallGrade];

  // 만약 답변이 없으면 리다이렉트 안내
  if (Object.keys(answers).length === 0) {
    return (
      <>
        <Header />
        <main className="min-h-screen flex flex-col items-center justify-center gap-4 px-7">
          <p className="text-ink-3 text-center">진단 데이터가 없습니다. 먼저 진단을 완료해주세요.</p>
          <Link href="/diagnosis" className="btn-primary">
            진단 시작하기
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand-50">
        <div className="max-w-[960px] mx-auto px-7 py-12">
          {/* Title */}
          <h1 className="text-2xl font-extrabold text-ink tracking-tight mb-2">
            안전보건관리체계 진단 결과
          </h1>
          {companyName && (
            <p className="text-sm text-ink-4 mb-8">{companyName}</p>
          )}

          {/* ═══════ 1. 종합 등급 카드 ═══════ */}
          <div className="bg-white border border-sand-200 rounded-lg p-8 mb-8 text-center">
            <div className="text-5xl mb-2">{gradeEmoji[result.overallGrade]}</div>
            <h2 className="text-3xl font-extrabold mb-1" style={{ color: gradeInfo.color }}>
              {gradeInfo.label}
            </h2>
            <p className="text-4xl font-extrabold text-ink mb-2">
              {result.overallPercentage}<span className="text-lg text-ink-4 font-normal"> / 100</span>
            </p>
            <p className="text-sm text-ink-4 leading-relaxed max-w-md mx-auto mb-6">
              {gradeInfo.description}
            </p>

            {/* Donut-style summary */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-xl font-extrabold text-semantic-green-text">{result.oCount}</div>
                <div className="text-[10px] text-ink-5">이행(O)</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-extrabold text-semantic-amber-text">{result.triangleCount}</div>
                <div className="text-[10px] text-ink-5">일부이행(△)</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-extrabold text-semantic-red-text">{result.xCount}</div>
                <div className="text-[10px] text-ink-5">미이행(X)</div>
              </div>
            </div>
          </div>

          {/* ═══════ 2. 영역별 바 차트 ═══════ */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-extrabold text-ink mb-6">9대 핵심요소별 진단 결과</h2>
            <div className="space-y-4">
              {result.stepScores.map((ss) => (
                <div key={ss.step}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-[13px] font-bold text-ink">
                      {ss.stepLabel}. {ss.stepName}
                    </span>
                    <span className="text-[13px] font-bold" style={{ color: GRADE_DESCRIPTIONS[ss.grade].color }}>
                      {ss.percentage}% {gradeEmoji[ss.grade]}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-sand-200 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-700"
                      style={{
                        width: `${ss.percentage}%`,
                        backgroundColor: GRADE_DESCRIPTIONS[ss.grade].color,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ 3. 고위험 미이행 항목 ═══════ */}
          {result.immediateActions.length > 0 && (
            <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-extrabold text-ink mb-1">
                🔴 즉시 개선 필요 항목
              </h2>
              <p className="text-xs text-ink-4 mb-4">고위험 미이행 — 1개월 이내 조치 권고</p>
              <div className="space-y-3">
                {result.immediateActions.map((q) => (
                  <div key={q.id} className="bg-semantic-red-bg border border-semantic-red-text/10 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[13px] font-bold text-ink leading-snug">{q.question}</h3>
                      <Badge variant="danger">고위험</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-[10px] bg-white text-ink-4 px-1.5 py-0.5 rounded">{q.stepLabel}. {q.stepName}</span>
                      <span className="text-[10px] bg-white text-ink-5 px-1.5 py-0.5 rounded">{q.legalBasis}</span>
                    </div>
                    {q.guidance && (
                      <p className="text-[11px] text-semantic-red-text leading-relaxed">
                        💡 {q.guidance}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ═══════ 4. 수사·감독 관점 리스크 분석 ═══════ */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-extrabold text-ink mb-4">수사·감독 관점 리스크 분석</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                { title: '감독관 관점', icon: '🔍', items: result.investigatorView.inspector },
                { title: '검사 관점', icon: '⚖️', items: result.investigatorView.prosecutor },
                { title: '경찰 관점', icon: '🚔', items: result.investigatorView.police },
              ].map((view) => (
                <div key={view.title} className="bg-sand-50 border border-sand-200 rounded-lg p-4">
                  <h3 className="text-sm font-bold text-ink mb-2">
                    {view.icon} {view.title}
                  </h3>
                  <ul className="space-y-1.5">
                    {view.items.map((item, i) => (
                      <li key={i} className="text-[12px] text-ink-3 leading-relaxed">• {item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* ═══════ 5. 개선 우선순위 액션플랜 ═══════ */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-extrabold text-ink mb-4">개선 우선순위 액션플랜</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-semantic-red-text mt-1.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-ink">즉시 (1개월 이내)</h3>
                  <p className="text-xs text-ink-4">고위험 미이행 항목 {result.immediateActions.length}건</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-semantic-amber-text mt-1.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-ink">단기 (3개월 이내)</h3>
                  <p className="text-xs text-ink-4">중위험 미이행 + 고위험 일부이행 {result.shortTermActions.length}건</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-semantic-green-text mt-1.5 flex-shrink-0" />
                <div>
                  <h3 className="text-sm font-bold text-ink">중기 (6개월 이내)</h3>
                  <p className="text-xs text-ink-4">체계 고도화 항목 {result.midTermActions.length}건</p>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════ 6. 듀얼 CTA ═══════ */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => {
                // PDF 다운로드 — Cursor에서 lib/generatePdf.ts 구현 후 연결
                alert('PDF 다운로드 기능은 Cursor에서 lib/generatePdf.ts를 구현한 후 연결하세요.');
              }}
              className="btn-primary text-[15px]"
            >
              📋 결과 PDF 다운로드
            </button>
            <Link
              href="/consult"
              className="inline-flex items-center justify-center gap-2 bg-ink text-white font-semibold py-3.5 px-8 rounded transition-all duration-200 hover:bg-ink-2"
            >
              🔒 전문가 상담 신청
            </Link>
          </div>

          {/* 면책 고지 */}
          <Disclaimer variant="compact" />
        </div>
      </main>
      <Footer />
    </>
  );
}
