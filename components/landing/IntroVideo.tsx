'use client';

import Link from 'next/link';

export default function IntroVideo() {
  return (
    <section id="intro-video" className="py-6 md:py-8">
      <div className="max-w-[960px] mx-auto px-7">
        <details className="group overflow-hidden rounded-lg border border-ink/10 bg-white">
          <summary className="flex min-h-[48px] cursor-pointer list-none items-center justify-between gap-3 px-5 py-3 text-base font-bold text-ink [&::-webkit-details-marker]:hidden">
            <span>15초 소개 영상 보기</span>
            <span aria-hidden="true" className="shrink-0 text-ink-5 transition-transform group-open:rotate-180">▾</span>
          </summary>
          <video
            className="block w-full aspect-video bg-ink/5"
            src="/video/safe119-intro.mp4"
            poster="/video/safe119-intro-poster.jpg"
            muted
            loop
            playsInline
            controls
            preload="none"
            aria-label="SAFE119 소개 영상: 안전보건관리체계 자가진단 안내"
          />
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 border-t border-ink/10 px-5 py-4 md:px-6">
            <p className="text-sm text-ink-3">
              <span className="font-bold text-ink">조대진 대표노무사</span> · 노무법인 위너스 · 안전 × 노동 × HR
            </p>
            <Link
              href="/diagnosis"
              className="shrink-0 inline-flex items-center justify-center border border-ink text-ink font-semibold py-2.5 px-5 rounded text-sm transition-colors duration-200 hover:bg-ink hover:text-white md:mr-28"
            >
              진단 시작하기 →
            </Link>
          </div>
        </details>
      </div>
    </section>
  );
}
