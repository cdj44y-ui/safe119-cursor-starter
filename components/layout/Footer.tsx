import Link from 'next/link';
import { BRAND_FAMILY, COMPANY_URL, FAMILY, KAKAO_URL, PROMISE } from '@/components/brand/constants';

/** A5 공통 푸터 — 네 사이트 동일 문구·순서 */
export default function Footer() {
  return (
    <footer className="bg-[#1C2421] py-12 text-[#CFC9BB] [word-break:keep-all]">
      <div className="mx-auto max-w-[1140px] space-y-4 px-6 text-[15px] leading-[1.7] md:px-9">
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:gap-6">
          <p className="text-[16px] font-bold text-white">{BRAND_FAMILY}</p>
          <nav className="flex flex-wrap gap-x-5 gap-y-1" aria-label="위너스 진단 서비스">
            <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className="font-bold text-white hover:underline">회사 소개</a>
            {FAMILY.map((f) => (
              <a key={f.key} href={f.url} target="_blank" rel="noopener noreferrer" className="hover:text-white hover:underline">{f.label}</a>
            ))}
          </nav>
        </div>
        <p className="font-semibold text-white">{PROMISE}</p>
        <div className="flex flex-wrap gap-x-5 gap-y-1 text-[14px]">
          <Link href="/diagnosis" className="hover:text-white">자가진단</Link>
          <Link href="/risk-assessment" className="hover:text-white">위험성평가 점검</Link>
          <Link href="/about" className="hover:text-white">전문가 소개</Link>
          <Link href="/consult" className="hover:text-white">상담 신청</Link>
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-full bg-[#FEE500] px-3 text-[13px] font-bold text-[#391B1B] hover:bg-[#F5D800]">법 바뀌기 전에 먼저 알기 — 채널 추가</a>
        </div>
        <div className="border-t border-[#3A4540] pt-4 text-[14px] text-[#9AA29C]">
          <p>노무법인 위너스 | 대표노무사 조대진 | 사업자등록번호 134-85-60666</p>
          <p>서울시 강서구 마곡중앙로 171, 304호 | Tel. <a href="tel:0221380240" className="hover:text-white">02-2138-0240</a> | Email. <a href="mailto:cdj44y@gmail.com" className="break-all hover:text-white">cdj44y@gmail.com</a></p>
          <p className="mt-2">본 자가진단은 법령·판례·공개 자료에 근거한 참고용 점검이며 법적 효력이 없습니다. 개별 사안은 전문가 검토가 필요합니다.</p>
          <p className="mt-2">© 2026 노무법인 위너스</p>
        </div>
      </div>
    </footer>
  );
}
