import { SITE_COLOR, VERIFIED_DATE } from './constants';

/** D3 법 개정 한 장 — 네 사이트 공통 데이터·모양 */
export const LAW_CALENDAR = [
  { d: '2026.10.08', s: '시행', h: '임금 정기지급·체불 등 위반 처벌 상향(3년·3천만원 → 5년·5천만원)', n: '근로기준법 제107조(법률 제21533호)' },
  { d: '2026.10.01', s: '국회 통과 · 공포 전', h: '반복 산재 사망 사업장 영업이익 최대 5% 과징금', n: '산업안전보건법 개정안' },
  { d: '2026.12.08', s: '시행 예정', h: '근로감독관 명칭 → 노동감독관', n: '근로기준법 제101조(법률 제21533호)' },
  { d: '2027.01.01', s: '시행 예정', h: '위험성평가 미이행 과태료(상시 50명 이상, 건설업 공사금액 50억원 이상)', n: '산업안전보건법 제175조, 시행령 [별표 35]' },
  { d: '2027.01.08', s: '시행 예정', h: '외국인 근로자 기초안전보건교육 의무화', n: '산업안전보건법 제31조의2' },
  { d: '2028.01.01', s: '시행 예정', h: '위험성평가 미이행 과태료(상시 50명 미만)', n: '산업안전보건법 제175조, 시행령 [별표 35]' },
  { d: '입법 전', s: '국회 계류', h: '근로자 추정제(일하는 사람을 근로자로 추정, 반증 책임은 사업주)', n: '근로기준법 개정안(2025.12.24 발의 등)' },
];

const statusColor = (s: string) => (s === '시행' ? '#111827' : s === '시행 예정' ? SITE_COLOR : '#6B7280');

export default function LawCalendar() {
  return (
    <div className="rounded-[12px] border border-[#D1D5DB] bg-white p-5 text-[#374151] md:p-8 [word-break:keep-all]" style={{ fontFamily: "'Pretendard Variable', Pretendard, system-ui, sans-serif" }}>
      <h2 className="text-[24px] font-bold text-[#111827] md:text-[28px]">앞으로 달라지는 노동·안전 법령</h2>
      <p className="mt-1.5 text-[15px] text-[#6B7280]">국가법령정보센터 원문 대조 {VERIFIED_DATE} · 시행 전 법령은 시행일 표기</p>
      <div className="mt-5 border-t-2 border-[#111827]">
        {LAW_CALENDAR.map((c) => (
          <div key={c.d + c.h} className="grid gap-1.5 border-b border-[#E5E7EB] py-4 md:grid-cols-[120px_130px_1fr] md:items-baseline md:gap-5">
            <p className="text-[18px] font-bold tabular-nums text-[#111827]">{c.d}</p>
            <p className="text-[15px] font-bold" style={{ color: statusColor(c.s) }}>{c.s}</p>
            <div><p className="text-[17px] font-semibold leading-[1.55] text-[#111827]">{c.h}</p><p className="text-[14px] text-[#6B7280]">{c.n}</p></div>
          </div>
        ))}
      </div>
    </div>
  );
}
