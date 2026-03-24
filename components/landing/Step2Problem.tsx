'use client';

import { presidentQuote } from '@/data/statistics';

export default function Step2Problem() {
  return (
    <section className="py-20">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-[11px] font-bold text-semantic-red-text uppercase tracking-[1.2px] block mb-2.5">
          혹시 이런 상황이신가요?
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />
        <h2 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight mb-2.5">
          경영책임자라면 지금 이 순간에도 위험합니다
        </h2>
        <p className="text-[14.5px] text-ink-4 leading-relaxed max-w-[520px] mb-10">
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
              <span className="text-[11px] font-bold text-copper">{pain.num}</span>
              <p className="text-[15px] font-bold text-ink mt-3 mb-3 leading-snug">{pain.quote}</p>
              <p className="text-[13px] text-ink-4 leading-relaxed">{pain.desc}</p>
            </div>
          ))}
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
                className="text-[11px] bg-white/10 text-white/70 px-2 py-0.5 rounded font-medium"
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
