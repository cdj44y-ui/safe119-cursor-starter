'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-sand-900 text-sand-500 py-12">
      <div className="max-w-[960px] mx-auto px-7">
        <div className="flex flex-col sm:flex-row justify-between gap-8 mb-8">
          <div>
            <div className="text-base font-extrabold text-white tracking-tight mb-2">
              SAFE<span className="text-copper">119</span>
            </div>
            <p className="text-xs text-sand-500 leading-relaxed max-w-xs">
              중대재해처벌법 안전보건관리체계 구축·이행점검 자가진단
            </p>
          </div>
          <div className="flex gap-12">
            <div>
              <h4 className="text-xs font-bold text-sand-400 uppercase tracking-wider mb-3">서비스</h4>
              <div className="flex flex-col gap-2">
                <Link href="/diagnosis" className="text-xs hover:text-white transition-colors">자가진단</Link>
                <Link href="/about" className="text-xs hover:text-white transition-colors">전문가 소개</Link>
                <Link href="/consult" className="text-xs hover:text-white transition-colors">상담 신청</Link>
              </div>
            </div>
            <div>
              <h4 className="text-xs font-bold text-sand-400 uppercase tracking-wider mb-3">연계</h4>
              <div className="flex flex-col gap-2">
                <a href="https://free119.site" target="_blank" rel="noopener noreferrer" className="text-xs hover:text-white transition-colors">
                  FREE119 근로자성 진단
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-sand-800 pt-6 flex flex-col sm:flex-row justify-between gap-4">
          <p className="text-[10px] text-sand-600 leading-relaxed max-w-lg">
            노무법인 위너스 | 대표노무사 조대진 | 사업자등록번호 000-00-00000
            <br />
            Tel.{' '}
            <a href="tel:0221380240" className="hover:text-sand-400">
              02-2138-0240
            </a>{' '}
            | Email.{' '}
            <a href="mailto:cdj44y@gmail.com" className="hover:text-sand-400 break-all">
              cdj44y@gmail.com
            </a>
            <br />
            본 자가진단은 참고용이며 법적 효력이 없습니다. 정확한 법률 검토는 전문가 상담을 이용하세요.
          </p>
          <p className="text-[10px] text-sand-600">
            &copy; {new Date().getFullYear()} SAFE119. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
