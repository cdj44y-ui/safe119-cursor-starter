'use client';

import { useState } from 'react';

const faqs = [
  {
    q: '이 진단은 법적 효력이 있나요?',
    a: '본 진단은 중대재해처벌법 시행령 제4조와 KOSHA 7대 핵심요소를 참고한 자가진단 도구입니다. 법적 효력은 없으며, 정확한 판단은 전문가 검토를 거치시기 바랍니다.',
  },
  {
    q: '어떤 사업장이 대상인가요?',
    a: '상시근로자 5인 이상 사업장이 대상입니다. 2024년 1월 27일부터 5인 이상으로 확대됐습니다. 다만 개별 공장·지점의 인원만으로 판단하지 않습니다. 대법원은 2026년 1월 29일 선고(2025도15060)에서 \'사업 또는 사업장\'이란 재해가 발생한 개별 장소가 아니라 인사·재무가 함께 운영되는 \'경영상 일체를 이루는 경제적·사회적 활동단위\'를 의미한다고 판시했습니다. 따라서 특정 공장·지점이 기준 인원 미만이어도, 본사와 다른 지점을 합한 전체 인원으로 적용 여부를 판단할 수 있습니다.',
  },
  {
    q: '진단에 얼마나 걸리나요?',
    a: '38문항에 O/X/△/N·A로 답하며, 약 10분 걸립니다.',
  },
  {
    q: '개인정보를 수집하나요?',
    a: '진단 입력 내용은 서버에 저장하지 않고 브라우저에서만 처리합니다. 상담을 신청하실 때에 한해 신청서에 담긴 내용이 전달됩니다.',
  },
  {
    q: '결과 리포트에는 무엇이 포함되나요?',
    a: '종합 등급(A~D), 9대 핵심요소별 이행률, 고위험 미이행 항목, 수사·감독 3관점 리스크, 즉시·단기·중기 실행 계획이 담깁니다.',
  },
  {
    q: '진단 후 전문가 상담도 받을 수 있나요?',
    a: '네. 상담은 유료 자문으로 진행되며, 결과 페이지에서 바로 신청하실 수 있습니다.',
  },
  {
    q: '중대재해처벌법 위반이 인정되면 형량은 어떻게 되나요?',
    a: '중대재해처벌법은 안전·보건 확보의무를 위반해 사망사고가 발생한 경우 경영책임자에게 1년 이상 징역 또는 10억원 이하 벌금을 규정하고 있습니다(제4조·제6조). 대법원 양형위원회는 2026년 9월 중대산업재해치사죄 양형기준안을 논의했습니다. 감경 사유가 없으면 징역 1년 6개월을 기본으로, 위반 정도가 중대하면 최대 15년까지 선고할 수 있게 하는 방안입니다. 아직 의견수렴이 남은 초안이며, 확정된 기준이 아닙니다.',
  },
];

export default function Step7Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-10 bg-sand-100">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-xs font-bold text-ink-5 uppercase tracking-[1.2px] block mb-2.5">
          자주 묻는 질문
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />
        <h2 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight mb-5">
          FAQ
        </h2>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white border border-sand-200 rounded-lg overflow-hidden">
              <button
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full text-left px-6 py-4 flex justify-between items-center cursor-pointer"
              >
                <span className="text-sm font-bold text-ink pr-4">Q. {faq.q}</span>
                <span className="text-ink-5 text-lg flex-shrink-0 transition-transform duration-200" style={{ transform: openIndex === i ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                  ▾
                </span>
              </button>
              {openIndex === i && (
                <div className="px-6 pb-4">
                  <p className="text-sm text-ink-4 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
