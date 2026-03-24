'use client';

import Link from 'next/link';

export default function Step6Offer() {
  return (
    <section className="py-20">
      <div className="max-w-[960px] mx-auto px-7">
        <div className="bg-white border-2 border-copper/30 rounded-lg p-8 sm:p-12 text-center relative overflow-hidden">
          {/* Ribbon */}
          <div className="inline-block bg-copper text-white text-[11px] font-bold px-4 py-1 rounded-full mb-6 tracking-wide">
            🎁 완전 무료 · 제한 없음
          </div>

          <h2 className="text-[26px] font-extrabold text-ink tracking-tight mb-2.5">
            지금 바로, 무료로 진단받으세요
          </h2>
          <p className="text-[14.5px] text-ink-4 mb-8">
            회원가입 없이, 10분이면 확인 가능합니다.
          </p>

          {/* Free Points */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['회원가입 불필요', '개인정보 수집 없음', 'PDF 리포트 무료', '67문항 전체 무료'].map((point) => (
              <span key={point} className="text-[13px] text-ink-3 font-medium">
                ✓ {point}
              </span>
            ))}
          </div>

          {/* CTA */}
          <Link href="/diagnosis" className="btn-primary text-[15px] font-bold">
            🔍 무료 진단 시작하기 — 10분이면 끝
          </Link>

          {/* Urgency Box */}
          <div className="mt-8 bg-semantic-amber-bg border border-semantic-amber-text/20 rounded-lg p-4 text-left">
            <p className="text-[13px] text-semantic-amber-text font-semibold leading-relaxed">
              ⚠️ 징벌적 손해배상 검토 중 — 감독·수사 강도가 높아지고 있습니다.
              <br />
              체계 점검을 미루면, 예고 없는 감독에 무방비 상태가 됩니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
