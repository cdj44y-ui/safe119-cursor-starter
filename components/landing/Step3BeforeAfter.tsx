'use client';

export default function Step3BeforeAfter() {
  const beforeItems = [
    '형식적 체계만 갖춤',
    '어디가 빠졌는지 모름',
    '감독 오면 무엇을 보여줄지 막막',
    '기소 가능성 높음',
    '우선순위 불명확',
  ];

  const afterItems = [
    'A~D 등급 확인 완료',
    '핵심요소별 리스크등급 파악',
    '감독관·검사·경찰 관점 분석',
    '즉시/단기/중기 액션플랜',
    '전문가 상담 핵심 포인트 정리',
  ];

  return (
    <section className="py-20 bg-sand-100">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-[11px] font-bold text-copper uppercase tracking-[1.2px] block mb-2.5">
          Before → After
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />
        <h2 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight mb-10">
          10분 진단이 만드는 차이
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Before */}
          <div className="bg-white border border-sand-200 rounded-lg p-6">
            <h3 className="text-sm font-bold text-semantic-red-text mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-semantic-red-bg rounded-full flex items-center justify-center text-xs">✕</span>
              진단 전
            </h3>
            <ul className="space-y-3">
              {beforeItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-ink-3 leading-relaxed">
                  <span className="text-semantic-red-text mt-0.5">❌</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div className="bg-white border-2 border-semantic-green-text/20 rounded-lg p-6">
            <h3 className="text-sm font-bold text-semantic-green-text mb-4 flex items-center gap-2">
              <span className="w-6 h-6 bg-semantic-green-bg rounded-full flex items-center justify-center text-xs">✓</span>
              진단 후
            </h3>
            <ul className="space-y-3">
              {afterItems.map((item) => (
                <li key={item} className="flex items-start gap-2 text-[13px] text-ink-3 leading-relaxed">
                  <span className="text-semantic-green-text mt-0.5">✅</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
