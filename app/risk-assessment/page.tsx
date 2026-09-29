'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Disclaimer from '@/components/layout/Disclaimer';
import Badge from '@/components/ui/Badge';
import TallyEmbed from '@/components/ui/TallyEmbed';
import { buildTallyEmbedUrl } from '@/lib/tally';

type AnswerValue = 'O' | 'TRIANGLE' | 'X' | null;

type FineGroupKey = 'A' | 'B' | 'C';

interface ChecklistItem {
  code: string;
  title: string;
  lawRef: string;
  question: string;
  plainTip: string;
  fineGroup: FineGroupKey;
}

const FINE_GROUPS: Record<FineGroupKey, { label: string; tier1: number; tier2: number; tier3: number }> = {
  A: { label: '위험성평가 미실시', tier1: 500, tier2: 700, tier3: 1000 },
  B: { label: '근로자·근로자대표 참여 및 공유 의무 위반', tier1: 150, tier2: 300, tier3: 500 },
  C: { label: '결과 기록·보존 의무 위반', tier1: 50, tier2: 150, tier3: 300 },
};

const ITEMS: ChecklistItem[] = [
  {
    code: '01',
    title: '실시 의무',
    lawRef: '산업안전보건법 제36조 제1항 · 시행규칙 제37조',
    question:
      '유해·위험요인을 파악해 위험성 크기를 결정하고, 개선대책을 수립·이행하는 위험성평가를 최초(작업 개시 전)·정기(매년 1회 이상)·수시(신규 위험요인·중대산업사고·산업재해 발생 시)로 실시하고 있습니까?',
    plainTip: '쉽게 말하면, 우리 사업장에 어떤 위험이 있는지 찾아 등급을 매기고, 개선책까지 만들어 실제로 실행하고 있는지를 묻는 항목입니다.',
    fineGroup: 'A',
  },
  {
    code: '02',
    title: '근로자 참여',
    lawRef: '산업안전보건법 제36조 제2항',
    question: '위험성평가를 실시할 때 해당 사업장 근로자를 참여시키고 있습니까?',
    plainTip: '안전관리자나 외부 업체 혼자 평가하지 말고, 현장 근로자도 의견을 낼 수 있게 참여시켜야 합니다.',
    fineGroup: 'B',
  },
  {
    code: '03',
    title: '근로자대표 참여',
    lawRef: '산업안전보건법 제36조 제3항',
    question: '근로자대표가 참여를 요구하면 위험성평가에 참여시키고 있습니까?',
    plainTip: '노조나 근로자대표가 참여를 요구하면 거부할 수 없습니다. 해당없음(요구 이력 없음)이면 이행으로 체크하세요.',
    fineGroup: 'B',
  },
  {
    code: '04',
    title: '공유 및 주지',
    lawRef: '산업안전보건법 제36조 제4항',
    question:
      '위험성평가 결과를 안전보건교육·설명회·사업장 게시·서면 또는 전자적 방법으로 근로자에게 알리고 있습니까? (신규 채용자에게도 즉시 공유)',
    plainTip: '평가만 해놓고 서랍에 넣어두면 안 됩니다. 근로자에게 실제로 알려야 하고, 새로 들어온 직원도 빠뜨리면 안 됩니다.',
    fineGroup: 'B',
  },
  {
    code: '05',
    title: '기록·보존',
    lawRef: '산업안전보건법 제36조 제5항',
    question: '위험성평가 결과를 기록하여 보존하고 있습니까?',
    plainTip: '평가 결과 문서를 남겨서 감독 나왔을 때 바로 제시할 수 있어야 합니다.',
    fineGroup: 'C',
  },
];

const ANSWER_OPTIONS: { value: AnswerValue; label: string; emoji: string }[] = [
  { value: 'O', label: '이행', emoji: '✅' },
  { value: 'TRIANGLE', label: '일부 이행', emoji: '⚠️' },
  { value: 'X', label: '미이행', emoji: '❌' },
];

export default function RiskAssessmentPage() {
  const [answers, setAnswers] = useState<AnswerValue[]>(ITEMS.map(() => null));
  const [companySize, setCompanySize] = useState<'over50' | 'under50'>('over50');

  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === ITEMS.length;

  const violations = useMemo(
    () => ITEMS.filter((_, i) => answers[i] === 'X'),
    [answers],
  );
  const partials = useMemo(
    () => ITEMS.filter((_, i) => answers[i] === 'TRIANGLE'),
    [answers],
  );

  const estimatedFine = useMemo(
    () => violations.reduce((sum, item) => sum + FINE_GROUPS[item.fineGroup].tier1, 0),
    [violations],
  );
  const estimatedFineMax = useMemo(
    () => violations.reduce((sum, item) => sum + FINE_GROUPS[item.fineGroup].tier3, 0),
    [violations],
  );

  const applyDate = companySize === 'over50' ? '2027년 1월 1일' : '2028년 1월 1일';

  const tallySrc = useMemo(
    () =>
      buildTallyEmbedUrl({
        grade: allAnswered || answeredCount > 0
          ? `[SAFE119-위험성평가] 미이행 ${violations.length}건 · 일부이행 ${partials.length}건`
          : '[SAFE119-위험성평가]',
        score: estimatedFine > 0 ? `예상 과태료 약 ${estimatedFine}만원(1차 기준)` : undefined,
      }),
    [allAnswered, answeredCount, violations.length, partials.length, estimatedFine],
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand-50">
        <div className="max-w-[720px] mx-auto px-7 py-12">
          {/* 상단 타이틀 */}
          <Badge variant="warning">산업안전보건법 제36조 · 과태료 부과기준 반영</Badge>
          <h1 className="text-2xl md:text-[28px] font-extrabold text-ink tracking-tight mt-3 mb-3">
            위험성평가 자가진단표
          </h1>
          <p className="text-sm text-ink-3 leading-relaxed mb-8">
            위험성평가는 실시했는지 여부만이 아니라, <strong className="text-ink">근로자 참여·공유·기록보존까지 5가지 의무</strong>를
            모두 지켜야 과태료 대상에서 벗어납니다. 항목별로 O/△/X로 답하면 예상 과태료를 바로 확인할 수 있습니다.
          </p>

          {/* 시행일 안내 */}
          <div className="bg-white border border-semantic-amber-text/25 rounded-lg p-5 mb-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-base">⏳</span>
              <h2 className="text-sm font-bold text-ink">과태료 시행일 안내 (아직 시행 전)</h2>
            </div>
            <p className="text-sm text-ink-3 leading-relaxed mb-3">
              위험성평가 과태료는 법령상 이미 확정된 금액이지만, 사업장 규모별로 적용 시작일이 다릅니다. 오늘
              기준으로는 아래 어느 규모든 <strong className="text-ink">아직 과태료가 실제로 부과되지 않는 시행 전 상태</strong>입니다.
            </p>
            <div className="flex gap-2 mb-3">
              <button
                type="button"
                onClick={() => setCompanySize('over50')}
                className={`flex-1 text-xs font-semibold rounded-md py-2 px-3 border transition-colors ${
                  companySize === 'over50'
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-ink-3 border-sand-300 hover:border-ink/40'
                }`}
              >
                상시근로자 50인 이상
                <br />
                (건설업 공사금액 50억원 이상)
              </button>
              <button
                type="button"
                onClick={() => setCompanySize('under50')}
                className={`flex-1 text-xs font-semibold rounded-md py-2 px-3 border transition-colors ${
                  companySize === 'under50'
                    ? 'bg-ink text-white border-ink'
                    : 'bg-white text-ink-3 border-sand-300 hover:border-ink/40'
                }`}
              >
                상시근로자 50인 미만
                <br />
                (건설업 공사금액 50억원 미만)
              </button>
            </div>
            <p className="text-sm text-ink-2 leading-relaxed bg-semantic-amber-bg rounded-md px-3 py-2">
              귀사는 <strong>{applyDate}부터</strong> 아래 과태료 부과 대상이 됩니다. 시행 전이라도 지금부터
              준비해야 시행일에 바로 대응할 수 있습니다.
            </p>
            <p className="mt-2 text-xs text-ink-5">
              근거: 산업안전보건법 시행령 [별표35] 과태료의 부과기준(제119조 관련), 대통령령 제36540호(2026.7.28.
              일부개정, 2026.8.1. 시행) 부칙 · 연합뉴스 등 보도(2026.7.21, 고용노동부 국무회의 의결)
            </p>
          </div>

          {/* 체크리스트 */}
          <div className="space-y-4 mb-8">
            {ITEMS.map((item, i) => {
              const fine = FINE_GROUPS[item.fineGroup];
              return (
                <div key={item.code} className="bg-white border border-sand-200 rounded-lg p-5">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-copper-light text-copper text-xs font-extrabold">
                      {item.code}
                    </span>
                    <h3 className="text-sm font-extrabold text-ink">{item.title}</h3>
                    <span className="text-xs text-ink-5">{item.lawRef}</span>
                    <Badge variant={item.fineGroup === 'A' ? 'danger' : item.fineGroup === 'B' ? 'warning' : 'neutral'}>
                      위반 시 최대 {fine.tier3.toLocaleString('ko-KR')}만원
                    </Badge>
                  </div>
                  <p className="text-[15px] font-semibold text-ink leading-relaxed mb-2">{item.question}</p>
                  <p className="text-sm text-ink-4 leading-relaxed mb-3">💡 {item.plainTip}</p>
                  <div className="flex gap-2">
                    {ANSWER_OPTIONS.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() =>
                          setAnswers((prev) => {
                            const next = [...prev];
                            next[i] = opt.value;
                            return next;
                          })
                        }
                        className={`flex-1 inline-flex items-center justify-center gap-1.5 rounded-md py-2.5 text-sm font-semibold border transition-colors ${
                          answers[i] === opt.value
                            ? 'bg-ink text-white border-ink'
                            : 'bg-white text-ink-3 border-sand-300 hover:border-ink/40'
                        }`}
                      >
                        <span>{opt.emoji}</span>
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* 결과 요약 */}
          {answeredCount > 0 && (
            <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
              <h2 className="text-lg font-extrabold text-ink mb-1">진단 결과</h2>
              <p className="text-xs text-ink-4 mb-4">
                {answeredCount} / {ITEMS.length}개 항목 응답{!allAnswered && ' · 나머지 항목도 답하면 결과가 더 정확해집니다'}
              </p>

              {violations.length === 0 && partials.length === 0 && answeredCount > 0 && (
                <div className="bg-semantic-green-bg border border-semantic-green-text/15 rounded-lg p-4 text-sm text-semantic-green-text font-semibold">
                  ✅ 응답한 항목 기준으로는 미이행 사항이 없습니다. 다만 {applyDate} 시행에 대비해 정기평가(매년 1회
                  이상) 이력을 계속 관리하세요.
                </div>
              )}

              {(violations.length > 0 || partials.length > 0) && (
                <>
                  <div className="bg-semantic-red-bg border border-semantic-red-text/10 rounded-lg p-4 mb-4">
                    <p className="text-xs text-ink-4 mb-1">
                      1차 적발 기준 예상 과태료 합(단순 합산 추정치, {applyDate} 시행 이후 기준)
                    </p>
                    <p className="text-2xl font-extrabold text-semantic-red-text">
                      약 {estimatedFine.toLocaleString('ko-KR')}만원
                      <span className="ml-2 text-sm font-semibold text-ink-4">
                        (반복 위반 시 최대 {estimatedFineMax.toLocaleString('ko-KR')}만원)
                      </span>
                    </p>
                    <p className="mt-2 text-xs text-ink-5 leading-relaxed">
                      실제 부과액은 위반 항목이 동일한 위험성평가에서 함께 지적되는 경우 등 사업장 상황에 따라
                      달라질 수 있는 참고 추정치입니다.
                    </p>
                  </div>

                  {violations.length > 0 && (
                    <div className="mb-3">
                      <h3 className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-2">미이행 항목</h3>
                      <ul className="space-y-2">
                        {violations.map((item) => (
                          <li key={item.code} className="text-sm text-ink-2 leading-relaxed">
                            ❌ <strong>{item.code}. {item.title}</strong> — {FINE_GROUPS[item.fineGroup].label}, 1차{' '}
                            {FINE_GROUPS[item.fineGroup].tier1}만원 · 2차 {FINE_GROUPS[item.fineGroup].tier2}만원 · 3차 이상{' '}
                            {FINE_GROUPS[item.fineGroup].tier3}만원
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {partials.length > 0 && (
                    <div>
                      <h3 className="text-xs font-bold text-ink-4 uppercase tracking-wide mb-2">일부 이행 항목(개선 권장)</h3>
                      <ul className="space-y-1.5">
                        {partials.map((item) => (
                          <li key={item.code} className="text-sm text-ink-3 leading-relaxed">
                            ⚠️ {item.code}. {item.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </>
              )}

            </div>
          )}

          {/* 상담 신청 — 진단 결과 자동 반영 */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-extrabold text-ink mb-1">🔒 위험성평가 준비 상담 신청</h2>
            <p className="text-sm text-ink-4 leading-relaxed mb-4">
              {answeredCount > 0
                ? '방금 진행한 위험성평가 자가진단 결과가 문의 내용에 함께 전달됩니다.'
                : '위 체크리스트에 먼저 답하면 진단 결과가 문의 내용에 자동으로 함께 전달됩니다.'}
            </p>
            <TallyEmbed src={tallySrc} title="노무 상담 문의 · 조대진 노무사" height={720} />
          </div>

          {/* 정책 동향 (확정 전) */}
          <div className="bg-white border border-sand-200 rounded-lg p-6 mb-8">
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="neutral">확정 전 · 의견수렴 중</Badge>
            </div>
            <h2 className="text-base font-extrabold text-ink mb-2">
              📋 정책 동향: 위험성평가 지침 개정안 행정예고
            </h2>
            <p className="text-sm text-ink-3 leading-relaxed mb-3">
              고용노동부가 2026년 9월 23일 「사업장 위험성평가에 관한 지침」 전부개정 고시안을 행정예고했습니다
              (고용노동부 공고 제2026-461호). 의견 제출 마감은 <strong className="text-ink">2026년 10월 13일</strong>이며,
              아직 확정되지 않았습니다. 주요 방향은 다음과 같습니다.
            </p>
            <ul className="space-y-1.5 text-sm text-ink-3 leading-relaxed mb-3">
              <li>· 도급인·수급인의 공동 위험성평가 실시 근거 마련</li>
              <li>· 근로자 참여 단계, 근로자대표 협의사항 구체화</li>
              <li>· 중대재해 발생 시 사업장 전체 재평가 의무 명시</li>
              <li>· 위험성평가 실시규정 작성 의무화 검토(상시근로자 5인 미만 사업장은 제외 예정)</li>
            </ul>
            <p className="text-xs text-ink-5 leading-relaxed bg-sand-100 rounded-md px-3 py-2">
              ⚠️ 위 내용은 확정된 법령이 아니라 의견수렴 중인 고시 개정안입니다. 최종 확정 시 이 페이지에 반영해
              드립니다.
            </p>
          </div>

          {/* 법적 근거 원문 */}
          <div className="bg-sand-100 border border-sand-200 rounded-lg p-5 mb-8">
            <h2 className="text-xs font-bold text-ink-4 uppercase tracking-wider mb-2">관련 법령 원문 요약</h2>
            <p className="text-sm text-ink-3 leading-relaxed">
              산업안전보건법 제36조는 사업주에게 유해·위험요인을 찾아 위험성을 평가하고 개선대책을 수립·이행할
              의무(제1항), 근로자 참여 의무(제2항), 근로자대표 참여 의무(제3항), 근로자 공유·주지 의무(제4항),
              결과 기록·보존 의무(제5항)를 각각 규정하고 있습니다.
            </p>
          </div>

          <Link href="/" className="text-sm font-semibold text-copper hover:underline">
            ← SAFE119 홈으로 돌아가기
          </Link>
        </div>

        <Disclaimer variant="compact" />
      </main>
      <Footer />
    </>
  );
}
