'use client';

import { useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useDiagnosisStore } from '@/store/diagnosisStore';
import { calculateTotalResult, GRADE_DESCRIPTIONS } from '@/lib/calculateScore';
import { questions, STEPS } from '@/data/questions';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Disclaimer from '@/components/layout/Disclaimer';
import ResultSheet from '@/components/brand/ResultSheet';
import ReportRequest from '@/components/result/ReportRequest';

const LEGAL_UPDATES = [
  {
    date: '2026.10.27',
    text: '[입법 동향] 산업안전보건법 개정 법률 제22122호 공포(2026.10.27) — 반복 산재 사망(1년간 3명 이상) 사업주 영업이익 5% 이내 과징금·등록말소요청·작업중지 범위 확대는 2027.4.28 시행, 안전한일터위원회·신고포상금은 2027.1.28 시행, 건설공사 기간연장 사유(폭염·한파)·안전인증 면제 확대는 공포일(2026.10.27)부터 즉시 시행',
  },
  {
    date: '2026.10.17',
    text: '첫 화면 개편 — 개별 사업장 사례 대신 사고 이후 경영책임자에게 적용되는 절차(산업안전보건법 제54·55조, 중대재해처벌법 제4·6·7·8·13·15조, 시행령 제4·13조)를 원문 기준으로 정리',
  },
  {
    date: '2026.10.15',
    text: '자가진단 개편(67→38문항) — 중대재해처벌법 제4조·제5조, 시행령 제4조 각 호·제5조·제13조 원문 대조로 재구성. 위험성평가는 2026년 산업안전보건법 제36조·시행규칙 제37조의2~4 개정(근로자·근로자대표 참여, 결과 공유, 기록 3년 보존)을 반영해 7문항으로 강화. 반기 1회 이행점검 의무(위험성평가·평가관리·의견청취·매뉴얼·도급·관계법령)도 각 단계에 포함',
  },
  {
    date: '2026.10.04',
    text: '반복 사망사고 사업장 사례 표기 정밀화 — 재판 대상 사고와 누적 사망자를 구분하고 진행 단계(구형 단계 · 확정 전) 명시',
  },
  {
    date: '2026.10.04',
    text: '[입법 동향] 산업안전보건법 개정안 국회 본회의 통과(2026.10.1) 반영 — 1년간 3명 이상 사망 시 영업이익 5% 이내 과징금(공포 6개월 후 시행 예정), 고용노동부 보도참고자료 기준',
  },
  {
    date: '2026.09.30',
    text: '중대재해처벌법 실제 사례 2건 추가(제조업 반복사고 · 검찰 구형 단계, 제조업 화재 · 수사송치 단계, 모두 확정 전)',
  },
  {
    date: '2026.09.30',
    text: 'FAQ 보강 — 대법원 2026.1.29. 선고(2025도15060) "사업 또는 사업장" 다사업장 상시근로자 합산 기준 판례 반영, 양형기준안(초안) 안내 추가',
  },
  {
    date: '2026.09.23',
    text: '중대재해처벌법 위반 실제 판결사례 추가(건설 현장 크레인 사고, 1심 실형 선고 · 확정 전)',
  },
  {
    date: '2026.09.23',
    text: '산업재해 사망사고 통계 최신화(2026년 상반기 재해조사 대상 사망사고, 고용노동부 발표 기준)',
  },
];

const serif = { fontFamily: "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif", fontWeight: 800, letterSpacing: '-0.03em' };
const tone = (p: number) => (p >= 90 ? ['양호', '#2F6B4F', '#EDF4EF'] : p >= 70 ? ['보통', '#A06C14', '#FBF3E2'] : p >= 50 ? ['미흡', '#C2581E', '#FCEEE4'] : ['위험', '#A4262C', '#FBEDEB']);

export default function ResultPage() {
  const { answers } = useDiagnosisStore();
  const result = useMemo(() => calculateTotalResult(answers), [answers]);
  const gradeInfo = GRADE_DESCRIPTIONS[result.overallGrade];
  useEffect(() => { if (Object.keys(answers).length) { try { (window as any).va?.('event', { name: 'diag_complete', data: { site: 'safe', grade: gradeInfo?.label } }); } catch {} } }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (Object.keys(answers).length === 0) {
    return (
      <>
        <Header />
        <main className="flex min-h-screen items-center justify-center bg-[#F4EFE4] px-6">
          <div className="w-full max-w-[560px] border border-[#D9D0BE] bg-white p-10 text-center">
            <p className="text-[22px] font-bold">아직 진단 결과가 없습니다</p>
            <p className="mt-2 text-[17px] text-[#6A706B]">38개 질문에 답하시면 비어 있는 기록과 법적 근거를 정리해 드립니다.</p>
            <Link href="/diagnosis" className="mt-7 inline-flex h-[56px] items-center rounded-lg bg-[#8E2B2B] px-8 text-[18px] font-bold text-white hover:bg-[#74221F]">진단 시작하기 →</Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const gaps = questions
    .filter((q) => answers[q.id] === 'X' || answers[q.id] === 'triangle')
    .sort((a, b) => {
      const r = (q: typeof a) => (answers[q.id] === 'X' ? 0 : 2) + (q.riskLevel === 'high' ? 0 : 1);
      return r(a) - r(b) || a.id - b.id;
    });
  const coreMissing = gaps.filter((q) => answers[q.id] === 'X' && q.riskLevel === 'high').length;
  const shown = gaps.slice(0, 6);
  const rest = gaps.length - shown.length;
  const gapSteps = Array.from(new Set(gaps.map((q) => STEPS.find((s) => s.step === q.step)?.label))).filter(Boolean);
  const [gTxt, gColor] = tone(result.overallPercentage);
  // A4 결과지 데이터 (표시 방식만, 점수 로직 불변)
  const sheetFixes = gaps.slice(0, 3).map((q) => ({
    title: `${STEPS.find((s) => s.step === q.step)?.label ?? ''} · ${q.question} (${answers[q.id] === 'X' ? '미이행' : '일부 이행'})`,
    basis: q.legalBasis,
  }));
  const sheetRows = result.stepScores.map((ss) => {
    const st = STEPS.find((s) => s.step === ss.step);
    return {
      label: st && !ss.stepName.startsWith(st.label) ? `${st.label} ${ss.stepName}` : ss.stepName,
      value: ss.applicableQuestions === 0 ? '해당없음' : `${ss.percentage}% · ${tone(ss.percentage)[0]}`,
      basis: st?.article ?? '',
    };
  });
  const naCount = questions.filter((q) => answers[q.id] === 'NA').length;
  const triCount = questions.filter((q) => answers[q.id] === 'triangle').length;
  const sheetPending = [
    ...(triCount > 0 ? [`일부 이행으로 답한 ${triCount}개 문항 — 이행했다는 서면 기록이 남아 있는지 확인이 필요합니다.`] : []),
    ...(naCount > 0 ? [`해당 없음으로 답한 ${naCount}개 문항 — 실제로 적용 대상이 아닌지 확인이 필요합니다.`] : []),
    '반복 산재 사망 사업장 영업이익 최대 5% 과징금 — 산업안전보건법 개정 법률 제22122호(2026.10.27 공포), 과징금·작업중지 확대는 2027.4.28 시행 예정이라 그 전까지는 적용되지 않습니다.',
  ];

  return (
    <>
      <Header />
      <main className="bg-[#F4EFE4] pb-28 text-[#1C2421] [word-break:keep-all]">
        {/* A4 결과지 (브랜드 v1.1 공통 형식) */}
        <section className="bg-[#1C2421] pt-10 md:pt-14">
          <div className="mx-auto max-w-[1140px] px-6 md:px-9">
            <ResultSheet conclusion={`${gradeInfo.label}입니다`} score={`${result.overallPercentage}점`} fixes={sheetFixes} rows={sheetRows} pending={sheetPending} siteUrl="https://safe119.site" />
            <div className="mt-5 flex flex-col items-start gap-3 md:flex-row md:items-center md:justify-between">
              <p className="text-[16px] text-[#CFC9BB]">진단 결과는 상담 신청서에 자동으로 담깁니다. 상담은 유료 자문으로 진행됩니다.</p>
              <Link href="/consult" className="inline-flex h-[56px] shrink-0 items-center bg-white px-7 text-[18px] font-bold text-[#1C2421] hover:bg-[#F4EFE4]">상담 신청서 작성 →</Link>
            </div>
          </div>
        </section>

        {/* 조문별 이행률 — 2026-10-31 읽기 쉽게: 막대는 사이트색 하나, 낮은 조문만 굵게 */}
        <section className="border-b border-[#D9D0BE] py-12 md:py-[64px]">
          <div className="mx-auto max-w-[1140px] px-6 md:px-9">
            <h2 className="text-[26px] font-bold tracking-[-0.6px] md:text-[30px]" style={serif}>조문별 이행률</h2>
            <p className="mt-1.5 text-[16px] text-[#6A706B]">법 조문 순서입니다. 90% 이상이면 양호입니다.</p>
            <div className="mt-6 border-t border-[#1C2421]">
              {result.stepScores.map((ss) => {
                const st = STEPS.find((s) => s.step === ss.step);
                const na = ss.applicableQuestions === 0;
                const low = !na && ss.percentage < 70;
                return (
                  <div key={ss.step} className="border-b border-[#D9D0BE] py-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className={'text-[17px] ' + (low ? 'font-extrabold' : 'font-semibold text-[#3D4540]')}><span className="mr-2 text-[14px] text-[#6A706B]">{st?.label}</span>{ss.stepName}</p>
                      {na ? <span className="shrink-0 text-[15px] text-[#6A706B]">해당없음</span> : <p className="flex shrink-0 items-baseline gap-2"><span className="text-[15px] text-[#6A706B]">{tone(ss.percentage)[0]}</span><span className="text-[24px] font-extrabold leading-none text-[#8E2B2B]">{ss.percentage}</span></p>}
                    </div>
                    {!na && <div className="mt-2.5 h-[8px] bg-[#E6DFD0]"><div className="h-full" style={{ width: Math.max(ss.percentage, 2) + '%', background: low ? '#8E2B2B' : '#A39A8A' }} /></div>}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* 2026-10-29 리포트 받기 */}
        <ReportRequest site="safe" answers={answers} tallyUrl="/consult" color="#8E2B2B" />


        {/* 2. 비어 있는 기록 */}
        {gaps.length > 0 && (
          <section className="border-b border-[#D9D0BE] py-12 md:py-[64px]">
            <div className="mx-auto max-w-[1140px] px-6 md:px-9">
              <h2 className="text-[30px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[36px]" style={serif}>지금 비어 있는 기록</h2>
              <p className="mt-2.5 text-[18px] text-[#6A706B]">미이행·일부 이행으로 답하신 항목입니다. 핵심 의무 미이행부터 보여드립니다.</p>
              <div className="mt-8 border-t-2 border-[#1C2421]">
                {shown.map((q, i) => {
                  const st = STEPS.find((s) => s.step === q.step);
                  const isX = answers[q.id] === 'X';
                  return (
                    <div key={q.id} className="grid gap-3 border-b border-[#D9D0BE] py-6 md:grid-cols-[52px_1fr]">
                      <p className="text-[24px] text-[#8E2B2B]" style={serif}>{String(i + 1).padStart(2, '0')}</p>
                      <div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[14px] font-bold text-[#1C2421]">{st?.article}</span>
                          <span className={'text-[14px] font-bold ' + (isX ? 'text-[#8E2B2B]' : 'text-[#6A706B]')}>· {isX ? '미이행' : '일부 이행'}</span>
                          {q.riskLevel === 'high' && <span className="text-[14px] text-[#6A706B]">· 핵심 의무</span>}
                        </div>
                        <h3 className="mt-1.5 text-[18px] font-bold leading-[1.6] md:text-[20px]">{q.question}</h3>
                        <p className="mt-1.5 text-[15px] text-[#6A706B]">근거 · {q.legalBasis}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
              {rest > 0 && <p className="mt-5 text-[18px] font-semibold">이 밖에도 <b>{rest}건</b>이 더 있습니다. 전체 목록은 상담에서 함께 정리해 드립니다.</p>}
            </div>
          </section>
        )}

        {/* 6. 전문가 */}
        <section className="border-b border-[#D9D0BE] py-14 md:py-[80px]">
          <div className="mx-auto grid max-w-[1140px] items-start gap-10 px-6 md:grid-cols-[210px_1fr] md:px-9">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={210} height={273} className="h-[156px] w-[120px] object-cover md:h-[200px] md:w-[154px]" />
            <div>
              <p className="text-[16px] font-bold text-[#C8912E]">이 결과를 함께 정리할 사람</p>
              <h2 className="mt-2 text-[30px] font-bold md:text-[34px]" style={serif}>대기업 인사팀 출신 노무사, 조대진</h2>
              <p className="mt-1 text-[17px] text-[#6A706B]">공인노무사 16년 · 안전공학 박사 · 노무법인 위너스 대표노무사</p>
              <p className="mt-5 text-[19px] font-semibold leading-[1.65]">대형 건설사, 에너지 공기업, 중소 제조업체 50여 곳의 중대재해처벌법 대응을 함께해 왔습니다. 비어 있는 기록을 어떤 순서로, 어떤 서류로 채워야 하는지 알고 있습니다.</p>
              <div className="mt-6 border-t-2 border-[#1C2421]">
                {[
                  ['1', '결과 검토', '신청서에 담긴 진단 결과를 검토해 먼저 채울 기록을 정합니다.'],
                  ['2', '체계 정비', '시행령 제4조 각 호의 절차·기준·서식을 사업장에 맞게 갖춥니다.'],
                  ['3', '반기 점검', '반기 1회 점검과 경영책임자 보고가 실제로 돌아가도록 운영을 돕습니다.'],
                ].map(([n, t, d]) => (
                  <div key={n} className="grid grid-cols-[44px_1fr] gap-3 border-b border-[#D9D0BE] py-4">
                    <span className="text-[24px] text-[#C8912E]" style={serif}>{n}</span>
                    <p className="text-[18px] leading-[1.6]"><b>{t}</b> — <span className="text-[#3D4540]">{d}</span></p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 7. 제안 */}
        <section className="bg-[#1C2421] py-14 text-center text-white md:py-[84px]">
          <div className="mx-auto max-w-[780px] px-6">
            <h2 className="text-[32px] font-bold leading-[1.35] md:text-[40px]" style={serif}>기록이 비어 있는 채로<br />사고를 맞지 않도록</h2>
            <p className="mt-4 text-[19px] leading-[1.7] text-[#CFC9BB]">진단 결과는 상담 신청서에 자동으로 담깁니다. 다시 설명하실 필요가 없습니다.</p>
            <Link href="/consult" className="mt-8 inline-flex h-[64px] w-full items-center justify-center bg-white text-[21px] font-bold text-[#1C2421] hover:bg-[#F4EFE4] md:w-auto md:px-12">상담 신청서 작성하기 →</Link>
            <p className="mt-4 text-[16px] leading-[1.7] text-[#9AA29C]">상담은 유료 자문으로 진행됩니다. 신청서를 확인한 뒤 일정과 비용을 안내드립니다.<br />일정에 따라 노무법인 위너스 소속의 경험 많은 노무사가 먼저 연락드릴 수 있습니다.</p>
            <div className="mt-6 flex flex-wrap justify-center gap-6 text-[16px]">
              <Link href="/diagnosis" className="text-[#CFC9BB] underline underline-offset-4">다시 진단하기</Link>
              <a href="https://pf.kakao.com/_yxexbaX/friend" target="_blank" rel="noopener noreferrer" className="text-[#CFC9BB] underline underline-offset-4">법 개정 소식 받기(카카오톡 채널)</a>
            </div>
          </div>
        </section>

        {/* 업데이트 이력 */}
        <section className="py-10">
          <div className="mx-auto max-w-[1140px] px-6 md:px-9">
            <details className="border border-[#D9D0BE] bg-white px-5 py-4">
              <summary className="cursor-pointer text-[16px] font-bold">법령·판례 업데이트 반영 이력 보기</summary>
              <ul className="mt-4 space-y-2">
                {LEGAL_UPDATES.map((u, i) => (
                  <li key={i} className="grid gap-1 text-[15px] md:grid-cols-[110px_1fr] md:gap-3"><span className="font-bold text-[#6A706B]">{u.date}</span><span className="text-[#3D4540]">{u.text}</span></li>
                ))}
              </ul>
            </details>
          </div>
        </section>

        <Disclaimer />

        {gaps.length > 0 && (
          <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[#D9D0BE] bg-white/95 backdrop-blur">
            <div className="mx-auto flex max-w-[1140px] items-center justify-between gap-3 px-6 py-3 md:px-9">
              <p className="text-[16px] font-bold md:text-[18px]">비어 있는 기록 <span className="text-[#8E2B2B]">{gaps.length}건</span><span className="hidden font-normal text-[#6A706B] md:inline"> · 진단 결과가 신청서에 자동으로 담깁니다</span></p>
              <Link href="/consult" className="inline-flex h-[52px] shrink-0 items-center rounded-lg bg-[#1F4E79] px-6 text-[17px] font-bold text-white hover:bg-[#173B5C]">상담 신청서 작성</Link>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
