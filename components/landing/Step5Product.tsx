'use client';

import { nineElements } from '@/data/statistics';

export default function Step5Product() {
  const processSteps = [
    { num: '①', title: '사업장 정보 입력', desc: '업종·규모 선택' },
    { num: '②', title: '67문항 응답', desc: 'O/X/△/N·A 선택' },
    { num: '③', title: '결과 리포트 확인', desc: '등급·리스크 분석' },
    { num: '④', title: 'PDF 다운로드', desc: '액션플랜 포함' },
  ];

  return (
    <section className="py-20 bg-sand-100">
      <div className="max-w-[960px] mx-auto px-7">
        <span className="text-[11px] font-bold text-copper uppercase tracking-[1.2px] block mb-2.5">
          진단 프로세스
        </span>
        <div className="w-8 h-0.5 bg-sand-400 mb-6" />
        <h2 className="text-[26px] font-extrabold text-ink tracking-tight leading-tight mb-10">
          이렇게 진단합니다
        </h2>

        {/* Process Steps */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-14">
          {processSteps.map((ps, i) => (
            <div key={ps.num} className="bg-white border border-sand-200 rounded-lg p-5 text-center relative">
              <div className="text-2xl font-extrabold text-copper mb-2">{ps.num}</div>
              <div className="text-sm font-bold text-ink mb-1">{ps.title}</div>
              <div className="text-[11px] text-ink-5">{ps.desc}</div>
              {i < processSteps.length - 1 && (
                <span className="hidden md:block absolute top-1/2 -right-3 text-sand-400 text-lg">→</span>
              )}
            </div>
          ))}
        </div>

        {/* 9 Elements Grid */}
        <h3 className="text-lg font-extrabold text-ink mb-6">시행령 제4조 9대 핵심요소</h3>
        <div className="grid grid-cols-3 gap-3">
          {nineElements.map((el) => (
            <div key={el.code} className="bg-white border border-sand-200 rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="text-xl mb-2">{el.icon}</div>
              <div className="text-[11px] font-bold text-copper mb-0.5">{el.code}.</div>
              <div className="text-[12.5px] font-bold text-ink leading-snug mb-1">{el.name}</div>
              <div className="text-[10px] text-ink-5">{el.article}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
