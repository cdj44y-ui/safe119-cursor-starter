'use client';

import Link from 'next/link';

export default function RiskAssessmentBanner() {
  return (
    <section className="py-8 bg-semantic-amber-bg border-y border-semantic-amber-text/20">
      <div className="max-w-[960px] mx-auto px-7">
        <div className="flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
          <div className="flex-1">
            <span className="inline-block text-xs font-bold text-semantic-amber-text bg-white px-2.5 py-1 rounded mb-3 tracking-wide">
              ⏳ 2027.1.1(50인 이상)·2028.1.1(50인 미만) 과태료 시행 · 최대 1,000만원
            </span>
            <h2 className="text-xl md:text-2xl font-extrabold text-ink leading-snug mb-2">
              위험성평가, 우리 회사는 과태료 대상일까요?
            </h2>
            <p className="text-sm text-ink-3 leading-relaxed">
              산업안전보건법 제36조 5가지 의무(실시·근로자참여·근로자대표참여·공유·기록보존)를
              항목별 과태료 기준으로 3분 만에 점검하세요.
            </p>
          </div>
          <Link
            href="/risk-assessment"
            className="shrink-0 inline-flex items-center justify-center gap-2 bg-ink text-white font-bold py-3.5 px-7 rounded transition-all duration-200 hover:bg-ink-2 text-center text-sm whitespace-nowrap"
          >
            위험성평가 자가진단표 →
          </Link>
        </div>
      </div>
    </section>
  );
}
