'use client';

import { useState } from 'react';

export default function NewsBanner() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="bg-sand-900 text-white/75 text-[12.5px] tracking-tight">
      <div className="max-w-[960px] mx-auto px-7 py-2.5 flex items-center gap-2.5 flex-wrap">
        <span className="bg-semantic-red-text text-white px-2 py-0.5 rounded-sm text-[9.5px] font-bold tracking-wider uppercase">
          속보
        </span>
        <span className="flex-1 font-normal">
          &ldquo;산재 사망은 미필적 고의에 의한 살인&rdquo; — 이재명 대통령,{' '}
          <b className="text-[#F5D78E] font-semibold">징벌적 손해배상 검토 지시</b>
        </span>
        <span className="text-white/30 text-[11px] hidden sm:inline">정책브리핑 2025.07.29</span>
        <button
          onClick={() => setVisible(false)}
          className="text-white/25 hover:text-white/60 text-[15px] leading-none p-0 bg-transparent border-none cursor-pointer"
          aria-label="배너 닫기"
        >
          &times;
        </button>
      </div>
      <div className="bg-white/[0.03] border-t border-white/[0.05] py-1.5">
        <div className="max-w-[960px] mx-auto px-7 flex gap-2.5 flex-wrap items-center text-[11px] text-white/35">
          <span className="bg-white/5 px-2 py-0.5 rounded-sm text-white/60 font-semibold text-[10.5px]">2025 3Q</span>
          <span>누적 사고사망자 457명 · 전년 대비 +3.2%</span>
          <span className="bg-white/5 px-2 py-0.5 rounded-sm text-white/60 font-semibold text-[10.5px]">기소</span>
          <span>121건 · 유죄율 89.3%</span>
        </div>
      </div>
    </div>
  );
}
