'use client';

import Link from 'next/link';

export default function Step1Hero() {
  return (
    <section className="pt-20 pb-16 bg-gradient-to-b from-sand-100 to-sand-50">
      <div className="max-w-[960px] mx-auto px-7">
        {/* Eyebrow */}
        <span className="inline-block text-xs font-semibold text-semantic-red-text bg-semantic-red-bg px-2.5 py-1 rounded mb-4 tracking-wide">
          기소 121건 · 유죄율 89.3%
        </span>

        {/* Headline */}
        <h1 className="text-[clamp(28px,4.2vw,44px)] font-extrabold text-ink leading-[1.32] tracking-tight max-w-[640px] mb-6">
          경영책임자 기소 전에,
          <br />
          <span className="text-copper">안전보건관리체계</span>
          <br />
          <span className="underline decoration-copper decoration-2 underline-offset-4">10분</span> 만에 점검하세요
        </h1>

        {/* Description */}
        <p className="text-base text-ink-3 max-w-[520px] leading-relaxed mb-7">
          중처법 시행령 제4조{' '}
          <span className="bg-semantic-amber-bg text-semantic-amber-text px-1.5 py-0.5 rounded text-[13px] font-semibold">
            9대 핵심요소
          </span>{' '}
          기준 67문항 자가진단.
          <br />
          법적 근거·조치 가이드까지 한 번에 확인하세요.
        </p>

        {/* Social Proof */}
        <div className="flex items-center gap-2 text-[13px] text-ink-4 mb-8">
          <span className="bg-semantic-green-bg text-semantic-green-text px-2.5 py-0.5 rounded text-[11.5px] font-bold">
            무료
          </span>
          <span>회원가입 없음 · 10분 소요 · PDF 결과 리포트 즉시 제공</span>
        </div>

        {/* CTA */}
        <Link href="/diagnosis" className="btn-primary text-[15px] font-bold">
          🔍 무료 진단 시작하기
        </Link>
        <span className="block mt-2.5 text-[11.5px] text-ink-5">
          🔒 개인정보 수집 없음 · 100% 무료 · 결과 즉시 확인
        </span>

        {/* Trust Indicators */}
        <div className="flex gap-4 mt-10 flex-wrap">
          {[
            { icon: '⚖️', text: '안전공학 박사+노무사 설계' },
            { icon: '📈', text: '고용노동부 통계 기반' },
            { icon: '📄', text: 'KOSHA 7대 핵심요소 준거' },
          ].map((item) => (
            <div key={item.text} className="text-xs text-ink-4 font-medium flex items-center gap-1.5">
              <span>{item.icon}</span> {item.text}
            </div>
          ))}
        </div>

        {/* Metric Chips */}
        <div className="flex gap-2 mt-7 flex-wrap">
          {[
            { val: '9대', lbl: '핵심요소' },
            { val: '67', lbl: '문항' },
            { val: 'A~D', lbl: '리스크등급' },
            { val: 'PDF', lbl: '리포트' },
            { val: '~10분', lbl: '소요시간' },
          ].map((c) => (
            <div key={c.lbl} className="bg-white border border-sand-200 rounded-md px-3.5 py-2 text-center min-w-[88px]">
              <div className="text-[13px] font-extrabold text-ink-2">{c.val}</div>
              <div className="text-[10.5px] text-ink-5 mt-0.5">{c.lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
