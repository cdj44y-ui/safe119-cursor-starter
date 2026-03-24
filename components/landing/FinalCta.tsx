'use client';

import Link from 'next/link';

export default function FinalCta() {
  return (
    <section className="py-20 bg-sand-900 text-white text-center">
      <div className="max-w-[960px] mx-auto px-7">
        <h2 className="text-[26px] font-extrabold tracking-tight mb-3">
          지금 우리 사업장을 점검하세요
        </h2>
        <p className="text-sm text-white/50 mb-8">
          중처법 안전보건관리체계 구축·이행점검 자가진단
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/diagnosis"
            className="inline-flex items-center justify-center gap-2 bg-copper text-white font-bold py-3.5 px-8 rounded transition-all duration-200 hover:bg-copper-hover hover:-translate-y-0.5"
          >
            🔍 무료 진단 시작하기
          </Link>
          <Link
            href="/consult"
            className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-semibold py-3.5 px-8 rounded transition-all duration-200 hover:bg-white/20"
          >
            🔒 전문가 상담 신청
          </Link>
        </div>
      </div>
    </section>
  );
}
