'use client';

import { statistics } from '@/data/statistics';

export default function Step4Trust() {
  const stats = [
    { value: `${statistics.prosecution.total}건`, label: statistics.prosecution.label, desc: statistics.prosecution.description },
    { value: `${statistics.convictionRate.value}%`, label: statistics.convictionRate.label, desc: statistics.convictionRate.description },
    { value: `${statistics.deaths.total}명`, label: statistics.deaths.label, desc: `${statistics.deaths.description} (${statistics.deaths.yoyChange})` },
    { value: `${statistics.probation.value}%`, label: statistics.probation.label, desc: statistics.probation.description },
  ];

  return (
    <section className="py-20">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-[11px] font-bold text-copper uppercase tracking-[1.2px] block mb-2.5">
          전문가가 직접 설계한 진단 도구
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />
        <h2 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight mb-2.5">
          안전 &times; 노동 &times; HR 통합 관점으로 만들었습니다
        </h2>
        <p className="text-[14.5px] text-ink-4 leading-relaxed max-w-[520px] mb-10">
          사고만 보는 안전전문가도, 법만 보는 노무사도 아닙니다.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Expert Card */}
          <div className="bg-white border border-sand-200 rounded-lg p-7">
            <div className="text-xs text-ink-5 mb-2">노무법인 위너스</div>
            <h3 className="text-lg font-extrabold text-ink mb-1">조대진 노무사</h3>
            <p className="text-[13px] text-ink-4 leading-relaxed mb-4">
              안전공학 박사 &times; 공인노무사 15년 &times; 대기업 HR 실무
              <br />
              사고·책임·성과를 하나의 시스템으로 다루는 트라이브리드 전문가
            </p>

            <div className="flex flex-wrap gap-1.5 mb-4">
              {['안전공학 박사', '공인노무사 15년', '대기업 HR 실무'].map((badge) => (
                <span key={badge} className="text-[10.5px] bg-copper-light text-copper px-2 py-0.5 rounded font-semibold">
                  {badge}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-1.5">
              {['중대재해 대응', '안전보건체계 구축', '위험성평가', '수사·감독 대응', '직장내괴롭힘', 'HR제도설계'].map((tag) => (
                <span key={tag} className="text-[10px] bg-sand-100 text-ink-4 px-1.5 py-0.5 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat) => (
              <div key={stat.label} className="bg-sand-50 border border-sand-200 rounded-lg p-4 text-center">
                <div className="text-2xl font-extrabold text-ink mb-1">{stat.value}</div>
                <div className="text-xs font-bold text-copper mb-1">{stat.label}</div>
                <div className="text-[10px] text-ink-5 leading-snug">{stat.desc}</div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-[10px] text-ink-5 mt-4">
          출처: 고용노동부 산업재해 통계, KDI 정책포럼, 정책브리핑 (2025)
        </p>
      </div>
    </section>
  );
}
