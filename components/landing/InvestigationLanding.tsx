import Link from 'next/link';
import LawCalendar from '@/components/brand/LawCalendar';
import { PROMISE } from '@/components/brand/constants';

// 수사 기록형 랜딩 (2026-10-17, 대문 주간 갱신 2026-10-19) — 사업장 실명 미사용, 모든 법적 서술은 국가법령정보센터 원문 대조
const STATS = [
  { v: '81곳', l: '형 확정으로 공표된 중대산업재해 사업장 누적', s: '고용노동부, 2026.10.15 발표' },
  { v: '89.3%', l: '1심 기소 사건 중 유죄 판결 비율', s: '국회입법조사처, 2025.8 기준' },
  { v: '253명', l: '2026년 상반기 재해조사 대상 사망자', s: '고용노동부, 2026.7.15 발표' },
];

const AFTER = [
  { t: '사고 직후', h: '작업을 멈추고, 지체 없이 보고합니다', d: '중대재해가 발생하면 사업주는 즉시 작업을 중지시키고 근로자를 대피시켜야 합니다. 지체 없이 고용노동부장관에게도 보고해야 합니다.', law: '산업안전보건법 제54조' },
  { t: '작업중지', h: '같은 작업이 멈출 수 있습니다', d: '재해가 다시 발생할 급박한 위험이 있다고 판단되면 고용노동부장관은 해당 작업과 동일한 작업의 중지를 명할 수 있습니다.', law: '산업안전보건법 제55조' },
  { t: '수사', h: '사고 이전의 체계를 묻습니다', d: '경영책임자가 사고 전에 안전보건관리체계를 구축하고 이행했는지, 시행령 제4조의 9가지 조치를 했는지를 확인합니다.', law: '중대재해처벌법 제4조, 시행령 제4조' },
  { t: '입증', h: '기록으로 증명해야 합니다', d: '조치의 이행 사항은 서면(전자문서 포함)으로 작성해 이행한 날부터 5년간 보관해야 합니다. 소상공인은 제외됩니다.', law: '중대재해처벌법 시행령 제13조' },
  { t: '처벌', h: '경영책임자 개인이 처벌받을 수 있습니다', d: '사망사고는 1년 이상 징역 또는 10억 원 이하 벌금(병과 가능)입니다. 부상·질병은 7년 이하 징역 또는 1억 원 이하 벌금입니다. 법인에는 50억 원 또는 10억 원 이하 벌금이 따로 부과될 수 있습니다.', law: '중대재해처벌법 제6조, 제7조' },
  { t: '그 이후', h: '사고는 끝나도 책임은 이어집니다', d: '사업장 명칭이 공표될 수 있습니다. 경영책임자는 안전보건교육을 이수해야 하며, 미이수 시 5천만 원 이하 과태료입니다. 고의 또는 중대한 과실로 의무를 위반해 중대재해가 발생하면 손해액의 5배 이내 배상책임이 생길 수 있습니다. 형 확정 후 5년 안에 다시 위반하면 형이 2분의 1까지 가중됩니다.', law: '중대재해처벌법 제13조, 제8조, 제15조, 제6조 제3항' },
];

const NINE = [
  ['제1호', '안전·보건 목표와 경영방침 설정', ''],
  ['제2호', '안전·보건 전담 조직', '해당 사업장'],
  ['제3호', '유해·위험요인 확인·개선 (위험성평가)', '반기 1회 점검'],
  ['제4호', '재해예방 예산 편성·집행', ''],
  ['제5호', '안전보건관리책임자등 권한·평가', '반기 1회 평가'],
  ['제6호', '안전관리자 등 배치·업무시간 보장', ''],
  ['제7호', '종사자 의견 청취', '반기 1회 점검'],
  ['제8호', '중대산업재해 대비 매뉴얼', '반기 1회 점검'],
  ['제9호', '도급·용역·위탁 기준', '반기 1회 점검'],
];

const serif = { fontFamily: "'Pretendard Variable', Pretendard, -apple-system, system-ui, sans-serif", fontWeight: 800, letterSpacing: '-0.03em' };

export default function InvestigationLanding() {
  return (
    <div className="bg-[#F4EFE4] text-[#1C2421] [word-break:keep-all]">
      {/* 히어로 */}
      <section className="bg-[#1C2421] text-white">
        <div className="mx-auto grid max-w-[1140px] items-end gap-8 px-6 py-10 md:grid-cols-[1.25fr_1fr] md:gap-16 md:px-9 md:py-[60px]">
          <div>
            <p className="text-[16px] font-bold text-[#D9A44A]">중대재해처벌법 · 경영책임자 자가진단</p>
            <h1 className="mt-4 text-[40px] font-bold leading-[1.3] tracking-[-1px] md:text-[54px]" style={serif}>
              수사는 사고 당일이 아니라,<br />그 전의 기록을 봅니다
            </h1>
            <p className="mt-6 text-[19px] leading-[1.75] text-[#CFC9BB] md:text-[20px]">
              형이 확정돼 공표된 사업장 81곳 중 92.6%에서 유해·위험요인 확인·개선 점검(시행령 제4조 제3호) 위반이 확인됐습니다(고용노동부, 2026.10.15). 9가지 의무와 위험성평가를 수사관이 보는 순서대로 38문항으로 점검합니다. 지금 남은 기록이 수사에서 어떻게 읽힐지 먼저 확인하십시오.
            </p>
            <div className="mt-7 flex flex-wrap items-center gap-6">
              <Link href="/diagnosis" className="inline-flex h-[62px] items-center rounded-lg bg-[#8E2B2B] px-8 text-[19px] font-bold text-white hover:bg-[#74221F]">진단 시작하기</Link>
              <a href="#after" className="border-b-2 border-white pb-0.5 text-[18px] font-bold text-white">사고 이후 절차 보기 →</a>
            </div>
            <p className="mt-5 text-[15px] text-[#9AA29C]">{PROMISE}</p>
          </div>
          <div className="rounded-xl border border-[#3A4540] px-7 py-1.5">
            {STATS.map((s) => (
              <div key={s.v} className="grid grid-cols-[auto_1fr] items-baseline gap-5 border-b border-[#3A4540] py-5 last:border-b-0">
                <b className="text-[44px] leading-none tracking-[-1px] md:text-[50px]" style={serif}>{s.v}</b>
                <p className="text-[17px] text-[#E8E3D6]">{s.l}<small className="block text-[13px] text-[#9AA29C]">{s.s}</small></p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 01 사고 이후 */}
      <section id="after" className="border-t border-[#D9D0BE] py-10 md:py-14">
        <div className="mx-auto max-w-[1140px] px-6 md:px-9">
          <div className="mb-6 grid gap-4 md:grid-cols-[110px_1fr] md:gap-9">
            <p className="text-[44px] leading-none text-[#C8912E]" style={serif}>01</p>
            <div>
              <h2 className="text-[30px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[38px]" style={serif}>사고가 나면, 경영책임자에게 일어나는 일</h2>
              <p className="mt-2.5 text-[18px] text-[#6A706B] md:text-[19px]">아래는 법이 정한 순서입니다. 사고 뒤에는 바꿀 수 없으니, 준비는 사고 전에 해야 합니다.</p>
            </div>
          </div>
          <div className="border-t-2 border-[#1C2421]">
            {AFTER.map((a, i) => (
              <details key={a.t} className="group border-b border-[#D9D0BE]">
                <summary className="grid min-h-[48px] cursor-pointer list-none gap-1 py-3.5 md:grid-cols-[220px_1fr] md:items-baseline md:gap-9 [&::-webkit-details-marker]:hidden">
                  <p className="text-[15px] font-bold text-[#A4262C]">{String(i + 1).padStart(2, '0')} · {a.t}</p>
                  <h3 className="flex items-baseline justify-between gap-3 text-[20px] font-bold leading-[1.45] md:text-[22px]"><span>{a.h}</span><span aria-hidden="true" className="shrink-0 text-[16px] text-[#6A706B] transition-transform group-open:rotate-180">▾</span></h3>
                </summary>
                <div className="pb-5 md:grid md:grid-cols-[220px_1fr] md:gap-9">
                  <span className="hidden md:block" />
                  <div>
                    <p className="text-[17px] leading-[1.75] text-[#3D4540]">{a.d}</p>
                    <p className="mt-2 text-[14px] font-semibold text-[#6A706B]">근거: {a.law}</p>
                  </div>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* 02 점검표 */}
      <section className="border-t border-[#D9D0BE] bg-[#EFE8DA] py-10 md:py-14">
        <div className="mx-auto max-w-[1140px] px-6 md:px-9">
          <div className="mb-6 grid gap-4 md:grid-cols-[110px_1fr] md:gap-9">
            <p className="text-[44px] leading-none text-[#C8912E]" style={serif}>02</p>
            <div>
              <h2 className="text-[30px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[38px]" style={serif}>수사관이 펼쳐 보는 점검표</h2>
              <p className="mt-2.5 text-[18px] text-[#6A706B] md:text-[19px]">시행령 제4조 각 호가 진단의 뼈대입니다. 이 중 다섯 가지는 반기마다 점검 기록을 남겨야 합니다.</p>
            </div>
          </div>
          <div className="relative border border-[#D9D0BE] bg-white px-6 py-9 shadow-[0_12px_30px_-18px_rgba(0,0,0,0.25)] md:px-12 md:py-11">
            <span className="absolute right-6 top-6 rotate-[-6deg] rounded border-[3px] border-[#A4262C] px-3 py-1 text-[16px] font-extrabold text-[#A4262C] opacity-85 md:right-10">반기 1회 점검</span>
            <h3 className="border-b-2 border-[#1C2421] pb-3 pr-36 text-[22px] font-bold md:text-[24px]" style={serif}>안전보건관리체계 구축·이행 점검표</h3>
            <ol className="mt-2 grid md:grid-cols-2 md:gap-x-12">
              {NINE.map(([no, t, tag]) => (
                <li key={no} className="flex items-baseline gap-3 border-b border-dashed border-[#D9D0BE] py-4 text-[18px]">
                  <b className="w-[58px] shrink-0 text-[15px] text-[#C8912E]">{no}</b>
                  <span className="flex-1">{t}</span>
                  {tag && <span className={'shrink-0 rounded px-2 py-0.5 text-[13px] font-bold ' + (tag.includes('반기') ? 'bg-[#FBEDEA] text-[#A4262C]' : 'bg-[#EEE] text-[#555]')}>{tag}</span>}
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[14px] text-[#6A706B]">근거: 중대재해처벌법 시행령 제4조 제1호~제9호 · 전담 조직은 상시근로자 500명 이상 등 해당 사업장만</p>
          </div>
        </div>
      </section>

      {/* 03 법령 달력 */}
      <section className="border-t border-[#D9D0BE] py-10 md:py-14">
        <div className="mx-auto max-w-[1140px] px-6 md:px-9">
          <div className="mb-8 grid gap-4 md:grid-cols-[110px_1fr] md:gap-9">
            <p className="text-[44px] leading-none text-[#C8912E]" style={serif}>03</p>
            <p className="self-end text-[18px] text-[#6A706B] md:text-[19px]">법 개정 일정을 한 장으로 정리했습니다. 위너스 네 사이트에 같은 내용이 실려 있습니다.</p>
          </div>
          <LawCalendar />
          {/* 2026-10-31 읽기 쉽게: 큰 카드 2개 → 토스식 목록 2줄 */}
          <div className="mt-8">
            <p className="text-[17px] font-bold text-[#1C2421]">함께 쓰는 점검 도구</p>
            <ul className="mt-3 border-t border-[#1C2421]">
              {[
                ['/risk-assessment', '위험성평가 자가진단', '5가지 의무 · 3분 · 과태료 시행 2027.1.1(50명 이상)·2028.1.1(50명 미만)'],
                ['/site-check', '현장 자체 점검표', '추락·끼임·부딪힘 8대 위험요인 · 고용노동부 배포 20개 항목'],
              ].map(([href, t, d]) => (
                <li key={href} className="border-b border-[#D9D0BE]">
                  <Link href={href} className="grid min-h-[72px] grid-cols-[1fr_auto] items-center gap-4 py-4 text-[#1C2421] no-underline hover:bg-white/60">
                    <span><b className="block text-[19px]">{t}</b><span className="mt-1 block text-[15px] leading-[1.6] text-[#6A706B]">{d}</span></span>
                    <span className="text-[22px] text-[#8E2B2B]" aria-hidden="true">›</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-3 text-[14px] text-[#6A706B]">근거: 산업안전보건법 제36조·제175조, 시행령 [별표 35](2026.7.28. 개정) · 고용노동부 「3대 사고유형 8대 위험요인 자체 점검표」</p>
          </div>
        </div>
      </section>

      {/* 2026-10-29 실제 사례 (동의받은 사례 · 회사 이름 비공개) */}
      <section className="border-t border-[#E6E6E6] bg-white py-12 md:py-16">
        <div className="mx-auto max-w-[1120px] px-6 md:px-8">
          <p className="text-[15px] font-bold text-[#666]">실제 사례 · 회사 이름은 쓰지 않습니다</p>
          <h2 className="mt-2 text-[28px] font-extrabold leading-[1.35] tracking-[-0.6px] md:text-[34px]">원청 제출용 서류를, 현장을 지키는 문서로</h2>
          <p className="mt-2 text-[16px] font-bold" style={{ color: '#8E2B2B' }}>금속가공 중소기업 · 안전</p>
          <div className="mt-6 grid border-t border-[#111] md:grid-cols-3">
            {[['상황', '원청이 요구하는 서류를 그때그때 만들었습니다. 위험성평가도 작업계획서도 제출을 위한 문서에 가까웠습니다.'], ['세운 기준', '"자기 서류는 자기가 만든다"를 원칙으로 현장을 함께 걸었습니다. 위험성평가를 공정 순서로 다시 짜고, 작업계획서와 관리감독자 지정서를 회사 실정에 맞게 정리했습니다.'], ['달라진 점', '점검자가 무엇을 물어도 담당자가 자기 문서로 설명할 수 있게 됐습니다.']].map(([k, v], i) => (
              <div key={k} className={'border-b border-[#E6E6E6] py-5 md:border-b-0 md:pr-8 ' + (i === 2 ? 'bg-[#F5F5F4] md:px-6' : '')}>
                <p className="text-[14px] font-bold text-[#666]">{k}</p>
                <p className={'mt-2 text-[17px] leading-[1.7] ' + (i === 2 ? 'font-bold text-[#111]' : 'text-[#333]')}>{v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 전문가 */}
      <section className="border-t border-[#D9D0BE] bg-[#EFE8DA] py-10 md:py-14">
        <div className="mx-auto max-w-[1140px] px-6 md:px-9">
          <div className="mb-6 grid gap-4 md:grid-cols-[110px_1fr] md:gap-9">
            <p className="text-[44px] leading-none text-[#C8912E]" style={serif}>04</p>
            <h2 className="text-[30px] font-bold leading-[1.35] tracking-[-0.8px] md:text-[38px]" style={serif}>이 진단을 설계한 사람</h2>
          </div>
          <div className="grid items-start gap-6 md:grid-cols-[240px_1fr] md:gap-14">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/expert/cho-daejin.jpg" alt="조대진 대표노무사" width={240} height={312} className="h-[312px] w-[240px] object-cover" />
            <div>
              <p className="text-[17px] font-bold text-[#6A706B]">대기업 인사팀 출신 노무사, 조대진</p>
              <p className="mt-1 text-[16px] font-semibold text-[#1C2421]">공인노무사 16년 · 안전공학 박사</p>
              <p className="mt-4 text-[24px] leading-[1.55] md:text-[28px]" style={serif}>현장의 위험과 법적 책임은 따로 움직이지 않습니다. 안전공학과 노동법을 함께 보는 이유입니다.</p>
              <div className="mt-5 grid gap-3 md:grid-cols-3">
                {[
                  ['대형 건설사', '다수 현장과 협력업체를 아우르는 중대재해처벌법 대응 체계를 함께 구축했습니다.'],
                  ['에너지 공기업', '에너지 분야 공기업의 중대재해처벌법 대응 컨설팅을 수행했습니다.'],
                  ['중소 제조업체 50여 곳', '인력과 예산이 빠듯한 제조 현장에 맞는 안전보건관리체계를 구축했습니다.'],
                ].map(([t, d]) => (
                  <div key={t} className="border border-[#D9D0BE] bg-white p-5">
                    <p className="text-[19px] font-bold" style={serif}>{t}</p>
                    <p className="mt-2 text-[16px] leading-[1.65] text-[#3D4540]">{d}</p>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                {[
                  ['소속', '노무법인 위너스 대표노무사'],
                  ['실무 이력', '현대카드 · 삼성서울병원 인사 출신'],
                  ['자문', '금융 · IT · 보건의료 · 제조 자문사 안전보건 체계 구축'],
                ].map(([k, v]) => (
                  <div key={k} className="grid grid-cols-[110px_1fr] gap-3 border-t border-[#D9D0BE] py-3.5 text-[18px] last:border-b md:grid-cols-[130px_1fr]">
                    <b className="text-[15px] font-semibold text-[#6A706B]">{k}</b><span>{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 마무리 */}
      <section className="bg-[#1C2421] py-16 text-center text-white md:py-[88px]">
        <div className="mx-auto max-w-[1140px] px-6 md:px-9">
          <h2 className="text-[32px] font-bold leading-[1.35] md:text-[44px]" style={serif}>수사관이 기록을 펼치기 전에, 먼저 점검하십시오</h2>
          <p className="mt-4 text-[18px] leading-[1.7] text-[#CFC9BB]">{PROMISE} · 약 10분<br />상담은 유료 자문이며, 신청서 확인 후 일정과 비용을 안내드립니다.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <Link href="/diagnosis" className="inline-flex h-[62px] items-center rounded-lg bg-[#8E2B2B] px-8 text-[19px] font-bold text-white hover:bg-[#74221F]">진단 시작하기</Link>
            <Link href="/consult" className="inline-flex h-[62px] items-center rounded-lg bg-[#1F4E79] px-8 text-[19px] font-bold text-white hover:bg-[#173B5C]">상담 신청</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
