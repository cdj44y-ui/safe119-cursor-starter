'use client';

import { presidentQuote } from '@/data/statistics';

export default function Step2Problem() {
  return (
    <section className="py-20">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-xs font-bold text-semantic-red-text uppercase tracking-[1.2px] block mb-2.5">
          혹시 이런 상황이신가요?
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />
        <h2 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight mb-2.5">
          경영책임자라면 지금 이 순간에도 위험합니다
        </h2>
        <p className="text-sm text-ink-4 leading-relaxed max-w-[520px] mb-10">
          중처법은 사고 발생 여부와 관계없이, 체계 미구축 자체를 처벌합니다.
        </p>

        {/* Pain Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            {
              num: '01',
              quote: '"서류만 있으면 되는 거 아닌가요?"',
              desc: '형식적 체계는 수사 시 면책 사유가 되지 않습니다. 실질적 이행 여부가 핵심입니다.',
            },
            {
              num: '02',
              quote: '"사고가 안 났으니 괜찮겠지..."',
              desc: '안전보건 의무 불이행 자체가 처벌 대상입니다. 사고 발생은 가중 사유일 뿐입니다.',
            },
            {
              num: '03',
              quote: '"컨설팅 비용 부담, 혼자 하자니 어디서부터..."',
              desc: '9대 핵심요소별 무엇을 점검해야 하는지조차 모르는 상태가 가장 위험합니다.',
            },
          ].map((pain) => (
            <div
              key={pain.num}
              className="bg-white border border-sand-200 rounded-lg p-7 transition-shadow hover:shadow-md"
            >
              <span className="text-xs font-bold text-copper">{pain.num}</span>
              <p className="text-base font-bold text-ink mt-3 mb-3 leading-snug">{pain.quote}</p>
              <p className="text-sm text-ink-4 leading-relaxed">{pain.desc}</p>
            </div>
          ))}
        </div>

        {/* Real Case — 실제 사례 (출처가 명확한 공개 보도만 인용) */}
        <div className="bg-white border border-sand-200 rounded-lg p-7 mb-10">
          <span className="text-xs font-bold text-semantic-red-text uppercase tracking-[1.2px] block mb-2.5">
            실제 사례
          </span>
          <p className="text-sm text-ink-3 leading-relaxed">
            2025년 7월, 한솔제지 신탄진공장에서 폐지를 옮기던 30대 직원이 기계 투입구로 떨어져 숨지는 사고가
            있었습니다. 2026년 1월, 관할 노동청은 한솔제지 대표를 중대재해처벌법 위반 혐의로, 공장장을
            산업안전보건법 위반 혐의로 검찰에 송치했습니다.{' '}
            <span className="font-semibold text-ink">아직 수사·재판이 진행 중인 사안으로, 유죄가 확정된 것은 아닙니다.</span>
          </p>
          <p className="text-xs text-ink-5 mt-3">
            출처: 연합뉴스TV, &ldquo;한솔제지 대표, 중대재해처벌법 위반 혐의 송치&rdquo; (2026.1.29)
          </p>
        </div>

        {/* Presidential Quote — Agitation */}
        <div className="bg-sand-900 rounded-lg p-8 text-white">
          <blockquote className="text-lg font-bold leading-relaxed mb-3">
            &ldquo;{presidentQuote.text}&rdquo;
          </blockquote>
          <p className="text-sm text-white/50 mb-5">
            — {presidentQuote.author}, {presidentQuote.date}
          </p>
          <div className="flex gap-2 flex-wrap">
            {presidentQuote.policies.map((policy) => (
              <span
                key={policy}
                className="text-xs bg-white/10 text-white/70 px-2 py-0.5 rounded font-medium"
              >
                {policy}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
