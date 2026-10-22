'use client';

import { useEffect, useState, type ReactNode } from 'react';

type NewsItem = {
  body: ReactNode;
  source: string;
};

const NEWS_ITEMS: NewsItem[] = [
  {
    body: (
      <>
        고용노동부, 2026년 3분기(누적) 재해조사 대상 사고사망자{' '}
        <b className="text-toss font-semibold">366명(전년 동기 대비 19.9% 감소)</b>, 반복발생 사업장 감독 강화 방침
      </>
    ),
    source: '고용노동부 보도자료 2026.10.20',
  },
  {
    body: (
      <>
        고용노동부, 10.16부터 전국 건설현장{' '}
        <b className="text-toss font-semibold">붕괴사고 예방 집중점검·감독</b> 실시(~12.15)
      </>
    ),
    source: '고용노동부 보도자료 2026.10.16',
  },
  {
    body: (
      <>
        대법원, 중대재해처벌법상 <b className="text-toss font-semibold">&ldquo;사업 또는 사업장&rdquo;은 상시근로자 수 합산</b>{' '}
        기준으로 판단
      </>
    ),
    source: '대법원 2026.01.29. 선고 2025도15060',
  },
];

export default function NewsBanner() {
  const [visible, setVisible] = useState(true);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setIdx((i) => (i + 1) % NEWS_ITEMS.length);
    }, 6000);
    return () => window.clearInterval(timer);
  }, []);

  if (!visible) return null;
  const current = NEWS_ITEMS[idx];

  return (
    <div className="bg-sand-900 text-white/75 text-sm tracking-tight">
      <div className="max-w-[960px] mx-auto px-7 py-2.5 flex items-center gap-2.5 flex-wrap">
        <span className="bg-semantic-red-text text-white px-2 py-0.5 rounded-sm text-xs font-bold tracking-wider uppercase">
          속보
        </span>
        <span className="flex-1 font-normal">{current.body}</span>
        <span className="text-white/30 text-xs hidden sm:inline">{current.source}</span>
        <div className="flex shrink-0 items-center gap-1.5" role="tablist" aria-label="속보 목록">
          {NEWS_ITEMS.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIdx(i)}
              role="tab"
              aria-selected={i === idx}
              aria-label={`${i + 1}번째 소식 보기`}
              className={`h-1.5 w-1.5 rounded-full border-none p-0 transition ${
                i === idx ? 'bg-white/70' : 'bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
        <button
          onClick={() => setVisible(false)}
          className="text-white/25 hover:text-white/60 text-base leading-none p-0 bg-transparent border-none cursor-pointer"
          aria-label="배너 닫기"
        >
          &times;
        </button>
      </div>
    </div>
  );
}
