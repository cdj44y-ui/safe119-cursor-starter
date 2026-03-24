'use client';

export default function LinkedService() {
  return (
    <section className="py-16">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-[11px] font-bold text-ink-5 uppercase tracking-[1.2px] block mb-2.5">
          연계 서비스
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />

        <a
          href="https://free119.site"
          target="_blank"
          rel="noopener noreferrer"
          className="block bg-white border border-sand-200 rounded-lg p-6 hover:shadow-md transition-shadow"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-sand-100 rounded-lg flex items-center justify-center text-xl font-extrabold text-ink">
              F<span className="text-copper">119</span>
            </div>
            <div>
              <h3 className="text-sm font-bold text-ink mb-0.5">FREE119 — 근로자성 자가진단</h3>
              <p className="text-xs text-ink-4">
                프리랜서인가, 근로자인가? 5개 영역 19문항으로 근로자성을 무료 진단합니다.
              </p>
            </div>
            <span className="ml-auto text-ink-5 text-lg">→</span>
          </div>
        </a>
      </div>
    </section>
  );
}
