'use client';

import Link from 'next/link';

export default function Header() {
  return (
    <nav className="bg-sand-50/92 backdrop-blur-md border-b border-sand-200 py-3.5 sticky top-0 z-50">
      <div className="max-w-[960px] mx-auto px-7 flex items-center justify-between">
        <Link href="/" className="text-base font-extrabold text-ink tracking-tight">
          SAFE<span className="text-copper">119</span>
        </Link>
        <div className="flex gap-6 items-center">
          <Link href="/about" className="text-[13px] font-medium text-ink-4 hover:text-ink transition-colors hidden sm:block">
            전문가 소개
          </Link>
          <Link href="/consult" className="text-[13px] font-medium text-ink-4 hover:text-ink transition-colors hidden sm:block">
            상담 신청
          </Link>
          <Link
            href="/diagnosis"
            className="bg-ink text-white px-4 py-1.5 rounded-md text-xs font-semibold hover:bg-ink-2 transition-colors"
          >
            진단 시작
          </Link>
        </div>
      </div>
    </nav>
  );
}
