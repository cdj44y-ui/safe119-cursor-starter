'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

/** 전체 페이지 공통 고정(floating) 상담 신청 버튼 — 코퍼 CTA, 우하단 고정 */
export default function FloatingConsultButton() {
  const pathname = usePathname();
  // 상담 신청 페이지 자체에서는 숨김(이미 해당 페이지에 있으므로 중복 방지)
  if (pathname === '/consult') return null;

  return (
    <Link
      href="/consult"
      className="fixed bottom-5 right-4 z-50 flex items-center gap-2 rounded-full bg-copper px-5 py-3.5 text-sm font-bold text-white shadow-[0_8px_24px_rgba(49,130,246,0.4)] transition-all hover:-translate-y-0.5 hover:bg-copper-hover hover:shadow-[0_10px_28px_rgba(49,130,246,0.45)] sm:bottom-6 sm:right-6 sm:px-6 sm:py-4 sm:text-base"
      aria-label="상담 신청하기"
    >
      <span aria-hidden>💬</span>
      <span>상담 신청</span>
    </Link>
  );
}
