'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Disclaimer from '@/components/layout/Disclaimer';
import TallyEmbed from '@/components/ui/TallyEmbed';
import { buildTallyEmbedUrl } from '@/lib/tally';
import ResultSheet from '@/components/brand/ResultSheet';
import { PROMISE } from '@/components/brand/constants';

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

// 2026-10-18 수사 기록형 서식으로 재구성 — 금액은 시행령 [별표 35](대통령령 제36540호) 기준, 합산 추정치는 표시하지 않음
const ANSWER_OPTIONS: { value: Exclude<AnswerValue, null>; label: string; mark: string; on: string }[] = [
  { value: 'O', label: '이행', mark: 'O', on: 'border-[#2F6B4F] bg-[#EEF5F0] text-[#2F6B4F]' },
  { value: 'TRIANGLE', label: '일부 이행', mark: '△', on: 'border-[#9A6A16] bg-[#FBF3E4] text-[#8A5A12]' },
  { value: 'X', label: '미이행', mark: 'X', on: 'border-[#A4262C] bg-[#FBEDEA] text-[#A4262C]' },
];

const serif = { fontFamily: "'Noto Serif KR', serif" };
const won = (n: number) => n.toLocaleString('ko-KR') + '만원';

function SectionHead({ no, title, sub }: { no: string; title: string; sub?: string }) {
  return (
    <div className="mb-9 grid gap-3 md:grid-cols-[96px_1fr] md:gap-8">
      <p className="text-[40px] leading-none text-[#C8912E]" style={serif}>{no}</p>
      <div>
        <h2 className="text-[28px] font-bold leading-[1.35] tracking-[-0.6px] md:text-[34px]" style={serif}>{title}</h2>
        {sub ? <p className="mt-2 text-[18px] leading-[1.7] text-[#6A706B]">{sub}</p> : null}
      </div>
    </div>
  );
}

export default function RiskAssessmentPage() {
  const [answers, setAnswers] = useState<AnswerValue[]>(ITEMS.map(() => null));
  const [companySize, setCompanySize] = useState<'over50' | 'under50'>('over50');

  const answeredCount = answers.filter((a) => a !== null).length;
  const allAnswered = answeredCount === ITEMS.length;
  const violations = useMemo(() => ITEMS.filter((_, i) => answers[i] === 'X'), [answers]);
  const partials = useMemo(() => ITEMS.filter((_, i) => answers[i] === 'TRIANGLE'), [answers]);
  const applyDate = companySize === 'over50' ? '2027년 1월 1일' : '2028년 1월 1일';

  const tallySrc = useMemo(
    () =>
      buildTallyEmbedUrl({
        grade: answeredCount > 0
          ? `[SAFE119-위험성평가] 미이행 ${violations.length}건 · 일부이행 ${partials.length}건 · ${companySize === 'over50' ? '50명 이상' : '50명 미만'}`
          : '[SAFE119-위험성평가]',
      }),
    [answeredCount, violations.length, partials.length, companySize],
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#F4EFE4] text-[#1C2421] [word-break:keep-all]">
        {/* 히어로 */}
        <section className="bg-[#1C2421] text-white">
          <div className="mx-auto grid max-w-[1140px] items-end gap-10 px-6 py-14 md:grid-cols-[1.3fr_1fr] md:gap-14 md:px-9 md:py-[68px]">
            <div>
              <p className="text-[16px] font-bold text-[#D9A44A]">산업안전보건법 제36조 · 위험성평가 자가진단</p>
              <h1 className="mt-4 text-[36px] font-bold leading-[1.32] tracking-[-1px] md:text-[48px]" style={serif}>
                위험성평가,<br />했다는 것만으로는<br />과태료를 피할 수 없습니다
              </h1>
              <p className="mt-5 text-[19px] leading-[1.75] text-[#CFC9BB]">
                실시·근로자 참여·근로자대표 참여·공유·기록보존, 5가지 의무를 모두 지켜야 합니다. 항목별로 이행 여부를 고르면 어느 의무에서 과태료 대상이 되는지 바로 보입니다.
              </p>
              <p className="mt-5 text-[15px] text-[#9AA29C]">약 3분 · {PROMISE}</p>
            </div>
            <div className="rounded-xl border border-[#3A4540] p-6">
              <p className="text-[15px] font-bold text-[#D9A44A]">우리 회사 규모를 먼저 고르십시오</p>
              <div className="mt-4 grid gap-2.5">
                {([['over50', '상시근로자 50명 이상', '건설업은 공사금액 50억원 이상', '2027.1.1'], ['under50', '상시근로자 50명 미만', '건설업은 공사금액 50억원 미만', '2028.1.1']] as const).map(([k, t, s, d]) => (
                  <button key={k} type="button" onClick={() => setCompanySize(k)} aria-pressed={companySize === k}
                    className={'grid grid-cols-[1fr_auto] items-center gap-3 rounded-lg border px-5 py-4 text-left transition-colors ' + (companySize === k ? 'border-[#F4EFE4] bg-[#F4EFE4] text-[#1C2421]' : 'border-[#3A4540] text-white hover:border-[#9AA29C]')}>
                    <span><b className="block text-[18px]">{t}</b><span className={'text-[14px] ' + (companySize === k ? 'text-[#6A706B]' : 'text-[#9AA29C]')}>{s}</span></span>
                    <span className="text-right"><span className={'block text-[13px] font-bold ' + (companySize === k ? 'text-[#A4262C]' : 'text-[#D9A44A]')}>과태료 시행</span><b className="text-[20px]" style={serif}>{d}</b></span>
                  </button>
                ))}
              </div>
              <p className="mt-4 text-[14px] leading-[1.6] text-[#9AA29C]">의무 자체는 지금도 적용됩니다. 과태료만 규모별로 위 날짜부터 부과됩니다.</p>
            </div>
          </div>
        </section>

        {/* 01 과태료 기준 */}
        <section className="py-14 md:py-[72px]">
          <div className="mx-auto max-w-[1140px] px-6 md:px-9">
            <SectionHead no="01" title="위반하면 부과되는 과태료" sub={`귀사는 ${applyDate}부터 아래 기준이 적용됩니다. 같은 위반으로 최근 5년간 처분을 받은 횟수에 따라 2차·3차 금액이 적용됩니다.`} />
            <div className="overflow-x-auto border-t-2 border-[#1C2421] bg-white">
              <table className="w-full min-w-[640px] text-left">
                <thead><tr className="border-b border-[#D9D0BE] text-[15px] text-[#6A706B]"><th className="px-5 py-3 font-semibold">위반 내용</th><th className="px-5 py-3 font-semibold">해당 의무</th><th className="px-4 py-3 text-right font-semibold">1차</th><th className="px-4 py-3 text-right font-semibold">2차</th><th className="px-5 py-3 text-right font-semibold">3차 이상</th></tr></thead>
                <tbody>
                  {(['A', 'B', 'C'] as FineGroupKey[]).map((g) => (
                    <tr key={g} className="border-b border-[#E6DFD0] text-[17px]">
                      <td className="px-5 py-4 font-bold">{FINE_GROUPS[g].label}</td>
                      <td className="px-5 py-4 text-[15px] text-[#6A706B]">{ITEMS.filter((it) => it.fineGroup === g).map((it) => it.code).join(' · ')}</td>
                      <td className="px-4 py-4 text-right tabular-nums">{won(FINE_GROUPS[g].tier1)}</td>
                      <td className="px-4 py-4 text-right tabular-nums">{won(FINE_GROUPS[g].tier2)}</td>
                      <td className="px-5 py-4 text-right font-bold tabular-nums text-[#A4262C]">{won(FINE_GROUPS[g].tier3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-[14px] leading-[1.7] text-[#6A706B]">근거: 산업안전보건법 제175조, 같은 법 시행령 [별표 35] 과태료의 부과기준(대통령령 제36540호, 2026.7.28. 일부개정) 및 부칙 · 고용노동부 국무회의 의결 발표(2026.7.21)</p>
          </div>
        </section>

        {/* 02 점검표 */}
        <section className="border-t border-[#D9D0BE] py-14 md:py-[72px]">
          <div className="mx-auto max-w-[1140px] px-6 md:px-9">
            <SectionHead no="02" title="5가지 의무 점검표" sub="항목마다 지금 상태에 가장 가까운 답을 고르십시오." />
            <div className="mb-5 flex items-center gap-4">
              <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-[#E6DFD0]"><div className="h-full rounded-full bg-[#1C2421] transition-all" style={{ width: `${(answeredCount / ITEMS.length) * 100}%` }} /></div>
              <p className="shrink-0 text-[16px] font-bold tabular-nums">{answeredCount} / {ITEMS.length}</p>
            </div>
            <div className="border-t-2 border-[#1C2421]">
              {ITEMS.map((item, i) => {
                const fine = FINE_GROUPS[item.fineGroup];
                return (
                  <div key={item.code} className="grid gap-5 border-b border-[#D9D0BE] py-8 md:grid-cols-[96px_1fr] md:gap-8">
                    <div>
                      <p className="text-[34px] leading-none text-[#C8912E]" style={serif}>{item.code}</p>
                      <p className="mt-2 text-[17px] font-bold">{item.title}</p>
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
                        <span className="text-[15px] font-semibold text-[#6A706B]">{item.lawRef}</span>
                        <span className="rounded bg-[#FBEDEA] px-2 py-0.5 text-[14px] font-bold text-[#A4262C]">위반 시 1차 {won(fine.tier1)} · 최대 {won(fine.tier3)}</span>
                      </div>
                      <p className="mt-3 text-[21px] font-bold leading-[1.6] md:text-[22px]">{item.question}</p>
                      <p className="mt-3 border-l-[3px] border-[#C8912E] bg-white/60 py-2 pl-4 text-[17px] leading-[1.7] text-[#4A524D]">{item.plainTip}</p>
                      <div className="mt-5 grid grid-cols-3 gap-2.5">
                        {ANSWER_OPTIONS.map((opt) => {
                          const on = answers[i] === opt.value;
                          return (
                            <button key={opt.value} type="button" aria-pressed={on}
                              onClick={() => setAnswers((prev) => { const next = [...prev]; next[i] = opt.value; return next; })}
                              className={'flex min-h-[60px] items-center justify-center gap-2 rounded-lg border-2 text-[18px] font-bold transition-colors ' + (on ? opt.on : 'border-[#D9D0BE] bg-white text-[#4A524D] hover:border-[#1C2421]')}>
                              <span className="text-[20px]" aria-hidden>{opt.mark}</span>{opt.label}
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 03 결과 */}
        {answeredCount > 0 && (
          <section className="border-t border-[#D9D0BE] bg-[#1C2421] py-14 text-white md:py-[72px]">
            <div className="mx-auto max-w-[1140px] px-6 md:px-9">
              <div className="mb-9 grid gap-3 md:grid-cols-[96px_1fr] md:gap-8">
                <p className="text-[40px] leading-none text-[#D9A44A]" style={serif}>03</p>
                <div>
                  <h2 className="text-[28px] font-bold leading-[1.35] md:text-[34px]" style={serif}>점검 결과</h2>
                  <p className="mt-2 text-[18px] text-[#CFC9BB]">{answeredCount} / {ITEMS.length}개 항목 응답{!allAnswered && ' · 나머지 항목도 답하면 결과가 더 정확해집니다'}</p>
                </div>
              </div>
              <div className="mb-8">
                <ResultSheet
                  conclusion={violations.length > 0 ? `과태료 대상이 될 수 있는 의무가 ${violations.length}건 있습니다` : partials.length > 0 ? '보완이 필요한 의무가 있습니다' : '응답 기준 미이행 의무가 없습니다'}
                  score={`이행 ${answers.filter((a) => a === 'O').length} / ${ITEMS.length}`}
                  fixes={[...violations, ...partials].map((it) => ({ title: `${it.code}. ${it.title} — ${answers[ITEMS.indexOf(it)] === 'X' ? '미이행' : '일부 이행'}`, basis: it.lawRef }))}
                  rows={ITEMS.map((it, i) => ({ label: `${it.code}. ${it.title}`, value: answers[i] === 'O' ? '이행' : answers[i] === 'X' ? '미이행' : answers[i] === 'TRIANGLE' ? '일부 이행' : '미응답', basis: `${it.lawRef} · 위반 시 1차 ${won(FINE_GROUPS[it.fineGroup].tier1)}` }))}
                  pending={[
                    ...(partials.length > 0 ? [`일부 이행 ${partials.length}건 — 참여·공유·기록이 서면으로 남아 있는지 확인이 필요합니다.`] : []),
                    ...(answeredCount < ITEMS.length ? [`미응답 ${ITEMS.length - answeredCount}건 — 나머지 항목도 답해야 결과가 완성됩니다.`] : []),
                    '「사업장 위험성평가에 관한 지침」 전부개정안 — 행정예고 후 확정 고시 전이라 최종 내용 확인이 필요합니다.',
                  ]}
                  siteUrl="https://safe119.site/risk-assessment"
                />
              </div>
              <div className="grid gap-4 md:grid-cols-3">
                {[['미이행', violations.length, '#F2B8B5'], ['일부 이행', partials.length, '#E9C98A'], ['이행', answers.filter((a) => a === 'O').length, '#A9D3BC']].map(([l, n, c]) => (
                  <div key={l as string} className="rounded-xl border border-[#3A4540] p-6">
                    <p className="text-[16px] font-bold" style={{ color: c as string }}>{l}</p>
                    <p className="mt-1 text-[48px] font-bold leading-none" style={serif}>{n}<span className="ml-1 text-[18px] font-semibold text-[#9AA29C]">건</span></p>
                  </div>
                ))}
              </div>
              {violations.length === 0 && partials.length === 0 ? (
                <p className="mt-6 rounded-xl border border-[#3A4540] p-6 text-[18px] leading-[1.7] text-[#E8E3D6]">응답한 항목 기준으로는 미이행 사항이 없습니다. {applyDate} 시행에 대비해 정기평가(매년 1회 이상)와 참여·공유 기록을 계속 남겨 두십시오.</p>
              ) : (
                <div className="mt-6 border-t-2 border-[#E8E3D6]">
                  {[...violations.map((it) => ({ it, kind: 'X' })), ...partials.map((it) => ({ it, kind: 'T' }))].map(({ it, kind }) => (
                    <div key={it.code} className="grid gap-2 border-b border-[#3A4540] py-5 md:grid-cols-[150px_1fr_auto] md:items-baseline md:gap-6">
                      <p className={'text-[16px] font-bold ' + (kind === 'X' ? 'text-[#F2B8B5]' : 'text-[#E9C98A]')}>{kind === 'X' ? '미이행' : '일부 이행 · 보완 권장'}</p>
                      <p className="text-[19px] font-bold">{it.code}. {it.title} <span className="text-[15px] font-normal text-[#9AA29C]">{it.lawRef}</span></p>
                      <p className="text-[16px] text-[#E8E3D6] md:text-right">{FINE_GROUPS[it.fineGroup].label} · 1차 {won(FINE_GROUPS[it.fineGroup].tier1)} ~ 3차 {won(FINE_GROUPS[it.fineGroup].tier3)}</p>
                    </div>
                  ))}
                  <p className="mt-4 text-[14px] leading-[1.7] text-[#9AA29C]">{applyDate} 이후 적발 시 적용되는 항목별 기준입니다. 실제 부과 여부와 금액은 감독 결과와 위반 횟수에 따라 달라집니다.</p>
                </div>
              )}
            </div>
          </section>
        )}

        {/* 04 상담 */}
        <section className="border-t border-[#D9D0BE] py-14 md:py-[72px]">
          <div className="mx-auto max-w-[1140px] px-6 md:px-9">
            <SectionHead no={answeredCount > 0 ? '04' : '03'} title="위험성평가 준비 상담 신청" sub={answeredCount > 0 ? '방금 점검한 결과(미이행·일부 이행 건수, 사업장 규모)가 신청서에 함께 전달됩니다.' : '점검표에 먼저 답하시면 결과가 신청서에 함께 전달됩니다.'} />
            <p className="mb-5 text-[16px] leading-[1.7] text-[#4A524D]">상담은 유료 자문으로 진행됩니다. 신청서 확인 후 일정과 비용을 안내드리며, 일정에 따라 노무법인 위너스 소속의 경험 많은 노무사가 먼저 연락드릴 수 있습니다.</p>
            <div className="rounded-xl border border-[#D9D0BE] bg-white p-4 md:p-6">
              <TallyEmbed src={tallySrc} title="노무 상담 문의 · 조대진 노무사" height={720} />
            </div>
          </div>
        </section>

        {/* 정책 동향 · 근거 */}
        <section className="border-t border-[#D9D0BE] bg-[#EFE8DA] py-14 md:py-[72px]">
          <div className="mx-auto grid max-w-[1140px] gap-10 px-6 md:grid-cols-2 md:px-9">
            <div>
              <span className="inline-block rounded bg-white px-2.5 py-1 text-[14px] font-bold text-[#6A706B]">확정 전 · 행정예고안</span>
              <h3 className="mt-3 text-[24px] font-bold leading-[1.4]" style={serif}>위험성평가 지침 전부개정안</h3>
              <p className="mt-3 text-[17px] leading-[1.75] text-[#4A524D]">고용노동부가 2026년 9월 23일 「사업장 위험성평가에 관한 지침」 전부개정고시안을 행정예고했습니다(공고 제2026-461호). 의견 제출 기간은 10월 13일에 끝났고, 2026년 10월 18일 기준 확정 고시 전입니다.</p>
              <ul className="mt-4 border-t border-[#D9D0BE]">
                {['도급인·수급인의 공동 위험성평가 실시 근거', '근로자 참여 단계와 근로자대표 협의사항 구체화', '중대재해 발생 시 사업장 전체 재평가', '위험성평가 실시규정 작성(상시 5명 미만 제외 예정)'].map((t) => (
                  <li key={t} className="border-b border-[#D9D0BE] py-3 text-[17px]">{t}</li>
                ))}
              </ul>
              <p className="mt-3 text-[14px] text-[#6A706B]">확정되면 이 페이지에 반영합니다. 최종 내용은 달라질 수 있습니다.</p>
            </div>
            <div>
              <span className="inline-block rounded bg-white px-2.5 py-1 text-[14px] font-bold text-[#6A706B]">법령 원문 요약</span>
              <h3 className="mt-3 text-[24px] font-bold leading-[1.4]" style={serif}>산업안전보건법 제36조</h3>
              <ol className="mt-4 border-t border-[#D9D0BE]">
                {[['제1항', '유해·위험요인을 찾아 위험성을 평가하고 개선대책을 수립·이행'], ['제2항', '위험성평가에 해당 작업장 근로자 참여'], ['제3항', '근로자대표가 요구하면 참여'], ['제4항', '평가 결과를 근로자에게 공유·주지'], ['제5항', '평가 결과 기록·보존']].map(([k, v]) => (
                  <li key={k} className="grid grid-cols-[64px_1fr] gap-3 border-b border-[#D9D0BE] py-3 text-[17px]"><b className="text-[#C8912E]">{k}</b><span>{v}</span></li>
                ))}
              </ol>
            </div>
          </div>
          <div className="mx-auto mt-10 max-w-[1140px] px-6 md:px-9">
            <Link href="/" className="text-[17px] font-bold text-[#D32F2F] underline underline-offset-4">← SAFE119 홈으로</Link>
          </div>
        </section>

        <Disclaimer variant="compact" />
      </main>
      <Footer />
    </>
  );
}
