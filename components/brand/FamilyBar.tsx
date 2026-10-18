import { BRAND_FAMILY, COMPANY_URL, SITE_NAME } from './constants';

/** 2026-10-18 고객 2층 분리: 사업주 라인(RISK·SAFE·FREE·1분 상담소)만 상단에 표시. AUDIT119·리더 강의는 푸터와 회사 소개에서 연결 */
const TIER_LINKS: { key: string; label: string; url: string }[] = [
  { key: 'RISK119', label: 'RISK119 근로감독', url: 'https://risk119.site' },
  { key: 'SAFE119', label: 'SAFE119 중대재해', url: 'https://safe119.site' },
  { key: 'FREE119', label: 'FREE119 근로자성', url: 'https://free119.site' },
  { key: 'SANGDAMSO', label: '사장님 1분 상담소', url: 'https://risk119.site/sangdamso' },
]

/** A1 상단 패밀리 바 — 네 사이트 동일 */
export default function FamilyBar() {
  return (
    <div className="h-10 border-b border-[#E5E7EB] bg-white text-[14px]" style={{ fontFamily: "'Pretendard Variable', Pretendard, system-ui, sans-serif" }}>
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 md:px-9">
        <p className="truncate text-[#111827]"><a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: '#1F4E79' }}>{BRAND_FAMILY}</a> · <b>{SITE_NAME}</b></p>
        <nav className="flex shrink-0 items-center gap-5" aria-label="위너스 진단 서비스">
          <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1F4E79] hover:underline">회사 소개</a>
          {TIER_LINKS.filter((f) => f.key !== SITE_NAME).map((f) => (
            <a key={f.key} href={f.url} target="_blank" rel="noopener noreferrer" className="hidden text-[#4B5563] hover:text-[#1F4E79] hover:underline md:inline">{f.label}</a>
          ))}
        </nav>
      </div>
    </div>
  );
}
