'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '이 진단은 법적 효력이 있나요?',
    a: '본 진단은 중처법 시행령 제4조 및 KOSHA 7대 핵심요소를 참고한 자가진단 도구입니다. 법적 효력은 없으며, 정확한 법률 검토는 전문가 상담을 권장합니다.',
  },
  {
    q: '어떤 사업장이 대상인가요?',
    a: '상시근로자 5인 이상 전 업종이 대상입니다. 2024년 1월 27일부터 5인 이상 사업장으로 적용이 확대되었습니다.',
  },
  {
    q: '진단에 얼마나 걸리나요?',
    a: '67문항을 O/X/△/N·A로 선택하는 방식으로, 약 10분 정도 소요됩니다.',
  },
  {
    q: '개인정보를 수집하나요?',
    a: '일체 수집하지 않습니다. 모든 데이터는 브라우저 로컬에서만 처리되며, 서버로 전송되지 않습니다.',
  },
  {
    q: '결과 리포트에는 무엇이 포함되나요?',
    a: '종합 등급(A~D) + 9대 핵심요소별 이행률 + 고위험 미이행 항목 + 수사·감독 3관점 리스크 분석 + 즉시/단기/중기 액션플랜이 포함됩니다.',
  },
  {
    q: '진단 후 전문가 상담도 받을 수 있나요?',
    a: '네. 안전공학 박사 + 공인노무사의 통합 자문을 받을 수 있습니다. 결과 페이지에서 바로 상담을 신청할 수 있습니다.',
  },
];

export default function Step7Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 bg-sand-100">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-[11px] font-bold text-ink-5 uppercase tracking-[1.2px] block mb-2.5">
          자주 묻는 질문
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />
        <h2 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight mb-10">
          FAQ
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-sand-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center cursor-pointer"
              >
                <span className="text-[14px] font-bold text-ink pr-4">Q. {faq.q}</span>
                <span className="text-ink-5 text-lg flex-shrink-0 transition-transform duration-200" style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▾
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-[13px] text-ink-4 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
