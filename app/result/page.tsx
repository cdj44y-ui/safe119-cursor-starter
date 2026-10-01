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

const LEGAL_UPDATES = [
  {
    date: '2026.09.30',
    text: '중대재해처벌법 실제 사례 2건 추가(세아베스틸 반복사고 · 검찰 구형 단계, 대전 안전공업 화재 · 수사송치 단계, 모두 확정 전)',
  },
  {
    date: '2026.09.30',
    text: 'FAQ 보강 — 대법원 2026.1.29. 선고(2025도15060) "사업 또는 사업장" 다사업장 상시근로자 합산 기준 판례 반영, 양형기준안(초안) 안내 추가',
  },
  {
    date: '2026.09.23',
    text: '중대재해처벌법 위반 실제 판결사례 추가(신구건설 크레인 사고, 1심 실형 선고 · 확정 전)',
  },
  {
    date: '2026.09.23',
    text: '산업재해 사망사고 통계 최신화(2026년 상반기 재해조사 대상 사망사고, 고용노동부 발표 기준)',
  },
];

function ScoreDonut({ percentage, color }: { percentage: number; color: string }) {
  const size = 160;
  const stroke = 14;
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const dashOffset = circumference * (1 - percentage / 100);

  return (
    <div className="relative mx-auto mb-4" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
        <circle cx={size / 2} cy={size / 2} r={radius} fill="none" stroke="#F0ECE5" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={dashOffset}
          style={{ transition: 'stroke-dashoffset 0.7s ease' }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-4xl font-extrabold leading-none text-ink">{percentage}</span>
        <span className="mt-1 text-xs text-ink-4">/ 100</span>
      </div>
    </div>
  );
}

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
            <ScoreDonut percentage={result.overallPercentage} color={gradeInfo.color} />
            <div className="text-3xl mb-1">{gradeEmoji[result.overallGrade]}</div>
            <h2 className="text-2xl font-extrabold mb-2" style={{ color: gradeInfo.color }}>
              {gradeInfo.label}
            </h2>
            <p className="text-sm text-ink-4 leading-relaxed max-w-md mx-auto mb-6">
              {gradeInfo.description}
            </p>

            {/* O/△/X 요약 */}
            <div className="flex justify-center gap-6 flex-wrap">
              <div className="text-center">
                <div className="text-xl font-extrabold text-semantic-green-text">{result.oCount}</div>
                <div className="text-xs text-ink-5">이행(O)</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-extrabold text-semantic-amber-text">{result.triangleCount}</div>
                <div className="text-xs text-ink-5">일부이행(△)</div>
              </div>
              <div className="text-center">
                <div className="text-xl font-extrabold text-semantic-red-text">{result.xCount}</div>
                <div className="text-xs text-ink-5">미이행(X)</div>
              </div>
            </div>
          </div>

          {/* ═══════ 1-1. 법령·판례 업데이트 신뢰 배지 ═══════ */}
          <div className="bg-white border border-sand-200 rounded-lg p-5 mb-8">
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-copper text-[11px] font-bold text-white">
                ✓
              </span>
              <h2 className="text-xs font-bold uppercase tracking-wider text-ink-4">법령·판례 업데이트 반영 현황</h2>
            </div>
            <ul className="space-y-2">
              {LEGAL_UPDATES.map((u, i) => (
                <li key={i} className="flex flex-wrap gap-x-3 gap-y-0.5 text-sm">
                  <span className="shrink-0 font-mono text-xs text-ink-5">{u.date}</span>
                  <span className="text-ink-3">{u.text}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-xs text-ink-5">
              본 진단 문항과 통계는 매일 최신 법령·판례 여부를 점검해 반영합니다.
            </p>
          </div>

          {/* ═══════ 2. 영역별 바 차트 ═══════ */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-extrabold text-ink mb-6">9대 핵심요소별 진단 결과</h2>
            <div className="space-y-4">
              {result.stepScores.map((ss) => (
                <div key={ss.step}>
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-bold text-ink">
                      {ss.stepLabel}. {ss.stepName}
                    </span>
                    <span className="text-sm font-bold" style={{ color: GRADE_DESCRIPTIONS[ss.grade].color }}>
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
                      <h3 className="text-sm font-bold text-ink leading-snug">{q.question}</h3>
                      <Badge variant="danger">고위험</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <span className="text-xs bg-white text-ink-4 px-1.5 py-0.5 rounded">{q.stepLabel}. {q.stepName}</span>
                      <span className="text-xs bg-white text-ink-5 px-1.5 py-0.5 rounded">{q.legalBasis}</span>
                    </div>
                    {q.guidance && (
                      <p className="text-xs text-semantic-red-text leading-relaxed">
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
                { title: '감독관 관점', icon: '🔍', items: result.investigatorView.inspector, badgeBg: 'bg-semantic-amber-bg' },
                { title: '검사 관점', icon: '⚖️', items: result.investigatorView.prosecutor, badgeBg: 'bg-semantic-red-bg' },
                { title: '경찰 관점', icon: '🚔', items: result.investigatorView.police, badgeBg: 'bg-copper-light' },
              ].map((view) => (
                <div key={view.title} className="bg-sand-50 border border-sand-200 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm ${view.badgeBg}`}>
                      {view.icon}
                    </span>
                    <h3 className="text-sm font-bold text-ink">{view.title}</h3>
                  </div>
                  <ul className="space-y-1.5">
                    {view.items.map((item, i) => (
                      <li key={i} className="text-sm text-ink-3 leading-relaxed">• {item}</li>
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

          {/* ═══════ 5-1. 연계 진단 추천 (등급 C/D 시) ═══════ */}
          {(result.overallGrade === 'C' || result.overallGrade === 'D') && (
            <div className="bg-white border border-sand-200 rounded-lg p-5 mb-8">
              <p className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-3">함께 확인하면 좋은 진단</p>
              <a
                href="https://risk119.site"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-lg border border-sand-200 bg-sand-50 p-4 hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 bg-sand-100 rounded-lg flex items-center justify-center text-sm font-extrabold text-ink shrink-0">
                  R<span className="text-copper">119</span>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-ink">안전보건관리체계뿐 아니라 근로감독 리스크도 확인해보세요</p>
                  <p className="text-xs text-ink-4 mt-0.5">
                    임금체불·연장근로 등 50여개 항목을 RISK119에서 무료로 점검할 수 있습니다.
                  </p>
                </div>
                <span className="text-ink-5 text-lg shrink-0">→</span>
              </a>
            </div>
          )}

          {/* ═══════ 6. 듀얼 CTA ═══════ */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => {
                // PDF 다운로드 — Cursor에서 lib/generatePdf.ts 구현 후 연결
                alert('PDF 다운로드 기능은 Cursor에서 lib/generatePdf.ts를 구현한 후 연결하세요.');
              }}
              className="btn-primary text-base"
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


          {/* ═══════ 6-1. 카카오톡 채널 — 가장 낮은 진입장벽 ═══════ */}
          <div className="bg-[#FFFBE6] border border-[#FEE500]/60 rounded-lg p-5 mb-8 text-center">
            <p className="text-sm font-bold text-ink mb-1">💬 이 점수, 다음 달에도 유지될까요?</p>
            <p className="text-xs text-ink-4 mb-4">
              안전보건 법령은 계속 바뀝니다. 상담은 아직 부담스러우셔도, 채널 추가 한 번이면 중대재해처벌법 개정과 실제 판결 소식을 가장 먼저 받아보실 수 있어요.
            </p>
            <a
              href="https://pf.kakao.com/_yxexbaX/friend"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded bg-[#FEE500] px-6 py-3 text-sm font-bold text-[#391B1B] transition hover:bg-[#F5D800]"
            >
              놓치기 전에 채널 추가하기
            </a>
          </div>

          {/* 면책 고지 */}
          <Disclaimer variant="compact" />
        </div>
      </main>
      <Footer />
    </>
  );
}
