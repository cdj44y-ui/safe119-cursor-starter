'use client';

import { useMemo } from 'react';
import { KAKAO_URL, SITE_COLOR, SITE_NAME, VERIFIED_DATE } from './constants';

export interface SheetFix { title: string; basis: string }
export interface SheetRow { label: string; value: string; basis: string }

interface Props {
  conclusion: string;
  score?: string;
  fixes: SheetFix[];
  rows: SheetRow[];
  pending: string[];
  siteUrl?: string;
}

const fmt = (d: Date) => `${d.getFullYear()}.${String(d.getMonth() + 1).padStart(2, '0')}.${String(d.getDate()).padStart(2, '0')}`;
const ymd = (d: Date) => fmt(d).replace(/\./g, '');

function Head({ n, t, right }: { n: string; t: string; right?: string }) {
  return (
    <div className="flex items-baseline justify-between gap-3">
      <h3 className="text-[18px] font-bold text-[#111827]"><span className="mr-1.5" style={{ color: SITE_COLOR }}>{n}</span>{t}</h3>
      {right ? <span className="shrink-0 text-[14px] text-[#6B7280]">{right}</span> : null}
    </div>
  );
}

/** A4 결과지 — 네 사이트 동일 구조. 인쇄·PDF 기능 없음 */
export default function ResultSheet({ conclusion, score, fixes, rows, pending, siteUrl = 'https://safe119.site' }: Props) {
  const { today, next } = useMemo(() => {
    const t = new Date();
    const n = new Date(t);
    n.setMonth(n.getMonth() + 6);
    return { today: t, next: n };
  }, []);

  const addCalendar = () => {
    const end = new Date(next);
    end.setDate(end.getDate() + 1);
    const ics = [
      'BEGIN:VCALENDAR', 'VERSION:2.0', 'PRODID:-//Winners//119//KO', 'BEGIN:VEVENT',
      `UID:${Date.now()}@${SITE_NAME.toLowerCase()}`,
      `DTSTAMP:${ymd(today)}T000000Z`,
      `DTSTART;VALUE=DATE:${ymd(next)}`,
      `DTEND;VALUE=DATE:${ymd(end)}`,
      `SUMMARY:${SITE_NAME} 반기 재진단`,
      `DESCRIPTION:6개월 전과 같은 문항으로 다시 점검하세요. ${siteUrl}`,
      `URL:${siteUrl}`,
      'END:VEVENT', 'END:VCALENDAR',
    ].join('\r\n');
    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${SITE_NAME}-반기재진단-${ymd(next)}.ics`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <section className="rounded-[12px] border border-[#D1D5DB] bg-white p-5 text-[#374151] md:p-8 [word-break:keep-all]" style={{ fontFamily: "'Pretendard Variable', Pretendard, system-ui, sans-serif" }} aria-label={`${SITE_NAME} 진단 결과지`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 border-b border-[#E5E7EB] pb-4">
        <h2 className="text-[22px] font-bold text-[#111827]">{SITE_NAME} 진단 결과지</h2>
        <p className="text-[15px] text-[#6B7280]">진단일 {fmt(today)}</p>
      </div>

      <div className="border-b border-[#E5E7EB] py-5">
        <Head n="①" t="결론" />
        <p className="mt-2 text-[20px] font-bold text-[#111827]">{conclusion}{score ? <span className="ml-2" style={{ color: SITE_COLOR }}>({score})</span> : null}</p>
      </div>

      <div className="border-b border-[#E5E7EB] py-5">
        <Head n="②" t="먼저 고칠 3가지" />
        {fixes.length === 0 ? (
          <p className="mt-2 text-[17px]">지금 응답 기준으로 급히 고칠 항목은 없습니다.</p>
        ) : (
          <ol className="mt-2 space-y-2.5">
            {fixes.slice(0, 3).map((f, i) => (
              <li key={i} className="grid grid-cols-[24px_1fr] gap-2 text-[17px] leading-[1.6]">
                <b style={{ color: SITE_COLOR }}>{i + 1}</b>
                <span>{f.title}<span className="block text-[14px] text-[#6B7280]">근거: {f.basis}</span></span>
              </li>
            ))}
          </ol>
        )}
      </div>

      {/* 2026-10-31 부분 공개: 상세 근거·확인 필요는 메일 리포트로(정보에 걸맞은 3칸 입력 — 대표님 결정) */}
      <div className="border-b border-[#E5E7EB] py-6">
        <div className="border border-[#111827] bg-[#F9FAFB] px-5 py-5">
          <p className="text-[18px] font-bold text-[#111827]">전체 결과지는 메일로 보내 드립니다</p>
          <ul className="mt-2 space-y-1 text-[16px] leading-[1.6] text-[#374151]">
            <li>③ 항목별 근거 · 조문 {rows.length}개</li>
            <li>④ 확인 필요 · {pending.length}개 문항</li>
            <li>문항별 답과 근거 조문, 다음 점검일</li>
          </ul>
          <a href="#report" className="mt-4 inline-flex h-[48px] items-center bg-[#111827] px-5 text-[16px] font-bold text-white no-underline visited:text-white">리포트 받기 ↓</a>
        </div>
      </div>

      <div className="py-5">
        <Head n="⑤" t="다음 점검일" />
        <p className="mt-2 text-[20px] font-bold text-[#111827]">{fmt(next)}</p>
        <p className="mt-1 text-[16px] leading-[1.7]">결과는 저장되지 않습니다. 6개월 뒤 같은 문항으로 다시 점검하시면 달라진 점을 바로 확인할 수 있습니다.</p>
        <div className="mt-4 flex flex-wrap gap-2.5">
          <button type="button" onClick={addCalendar} className="inline-flex h-[48px] items-center rounded-lg border border-[#D1D5DB] bg-white px-5 text-[16px] font-bold text-[#111827] hover:border-[#111827]">캘린더에 추가</button>
          <a href={KAKAO_URL} target="_blank" rel="noopener noreferrer" className="inline-flex h-[48px] items-center rounded-lg bg-[#FEE500] px-5 text-[16px] font-bold text-[#391B1B] hover:bg-[#F5D800]">법 바뀌기 전에 먼저 알기</a>
        </div>
      </div>

      <p className="border-t border-[#E5E7EB] pt-4 text-center text-[15px] font-semibold text-[#6B7280]">형식은 같고, 내용은 귀사뿐입니다</p>
    </section>
  );
}
