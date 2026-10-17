import { BRAND_FAMILY, COMPANY_URL, FAMILY, SITE_NAME } from './constants';

/** A1 상단 패밀리 바 — 네 사이트 동일 */
export default function FamilyBar() {
  return (
    <div className="h-10 border-b border-[#E5E7EB] bg-white text-[14px]" style={{ fontFamily: "'Pretendard Variable', Pretendard, system-ui, sans-serif" }}>
      <div className="mx-auto flex h-full max-w-[1140px] items-center justify-between px-6 md:px-9">
        <p className="truncate text-[#111827]"><a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="font-bold hover:underline" style={{ color: '#1F4E79' }}>{BRAND_FAMILY}</a> · <b>{SITE_NAME}</b></p>
        <nav className="flex shrink-0 items-center gap-5" aria-label="위너스 진단 서비스">
          <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-[#1F4E79] hover:underline">회사 소개</a>
          {FAMILY.filter((f) => f.key !== SITE_NAME).map((f) => (
            <a key={f.key} href={f.url} target="_blank" rel="noopener noreferrer" className="hidden text-[#4B5563] hover:text-[#1F4E79] hover:underline md:inline">{f.label}</a>
          ))}
        </nav>
      </div>
    </div>
  );
}
