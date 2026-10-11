'use client';

import Link from 'next/link';

export default function IntroVideo() {
  return (
    <section id="intro-video" className="py-14 md:py-16">
      <div className="max-w-[960px] mx-auto px-7">
        <p className="text-xs font-bold tracking-[0.18em] uppercase text-ink-3 text-center mb-2">Intro</p>
        <h2 className="text-2xl md:text-3xl font-extrabold text-ink text-center leading-snug">
          15초로 보는 SAFE119
        </h2>
        <p className="text-sm md:text-base text-ink-3 text-center leading-relaxed mt-3">
          우리 회사 안전, 어디부터 점검할지 약 10분이면 기준이 보입니다.
        </p>
        <div className="mt-8 overflow-hidden rounded-lg border border-ink/10 bg-white">
          <video
            className="block w-full aspect-video bg-ink/5"
            src="/video/safe119-intro.mp4"
            poster="/video/safe119-intro-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            controls
            preload="metadata"
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
              바로 진단 시작하기 →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
