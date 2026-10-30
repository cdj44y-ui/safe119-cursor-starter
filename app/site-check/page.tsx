'use client';

// 2026-10-31 고용노동부 「3대 사고유형(추락·끼임·부딪힘) 8대 위험요인 사업장 자체 점검표」(별첨1, 순회점검용) 및
// 「건설현장 주요 위험요인별 핵심 안전수칙」(별첨2) 반영. 사망자 수 등 위협 수치는 쓰지 않음.
import { useMemo, useState } from 'react';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Disclaimer from '@/components/layout/Disclaimer';

type Mark = 'NA' | 'OK' | 'NG' | null;
type Group = '추락' | '끼임' | '부딪힘';

interface Item { id: string; no: string; risk: string; group: Group; text: string; detail?: string; tip: string }

const ITEMS: Item[] = [
  { id: '1a', no: '①', risk: '비계', group: '추락', text: '비계에 안전난간·추락방호망을 설치하고 안전대를 착용합니까?', detail: '달비계: 작업용 로프와 별도로 구명줄 설치, 로프 고정점 2곳 이상 · 이동식비계: 최상단 안전난간·작업발판', tip: '안전난간은 임의로 해체하지 않습니다. 달비계 로프와 구명줄은 서로 다른 고정점에 묶습니다.' },
  { id: '1b', no: '①', risk: '비계', group: '추락', text: '작업발판이 제대로 설치되어 있습니까?', tip: '작업발판은 뒤집히지 않게 고정합니다.' },
  { id: '2a', no: '②', risk: '지붕', group: '추락', text: '지붕 위 작업 때 안전난간·추락방호망을 설치하고 안전대를 착용합니까?', tip: '폭 30cm 이상 작업발판을 설치합니다.' },
  { id: '2b', no: '②', risk: '지붕', group: '추락', text: '썬라이트 등 약한 지붕재 위에 작업발판이나 채광창 덮개를 설치했습니까?', tip: '채광창에는 덮개를 설치합니다.' },
  { id: '3a', no: '③', risk: '사다리', group: '추락', text: '이동식 사다리를 작업높이별 안전작업 지침대로 사용합니까?', detail: '1.2m 미만: 안전모 · 1.2~2m: 안전모, 2인 1조, 최상부 발판 작업 금지 · 2~3.5m: 최상부와 그 아래 디딤대 작업 금지 · 3.5m 초과: 작업발판으로 사용 금지', tip: '가능하면 말비계·이동식비계로 대체하고, 2인 1조로 작업합니다.' },
  { id: '4a', no: '④', risk: '고소작업대', group: '추락', text: '고소작업대에 안전난간·과상승방지장치가 있고 안전대를 착용합니까?', tip: '아웃트리거와 브레이크를 설치합니다.' },
  { id: '4b', no: '④', risk: '고소작업대', group: '추락', text: '작업자가 탄 상태로 고소작업대를 이동하지 않습니까?', tip: '사람이 탄 채로 주행하지 않습니다.' },
  { id: '5a', no: '⑤', risk: '철골·거푸집 동바리', group: '추락', text: '철골 조립·해체 때 추락방호망과 안전대 부착설비를 먼저 설치합니까?', detail: '철골 인양·조립 전에 지상에서 우선 설치', tip: '철골을 들어 올릴 때는 2줄 걸이로 체결합니다.' },
  { id: '5b', no: '⑤', risk: '철골·거푸집 동바리', group: '추락', text: '주요 이동통로에 고정된 가설통로나 안전대 부착설비가 있습니까?', tip: '이동 중에도 안전대를 걸 수 있게 합니다.' },
  { id: '5c', no: '⑤', risk: '철골·거푸집 동바리', group: '추락', text: '거푸집동바리·데크플레이트 조립·해체 때 추락방호망·작업발판을 설치합니까?', tip: '구조검토 후 조립도를 작성해 지킵니다. 높이 4.2m 이상은 시스템 동바리를 씁니다.' },
  { id: '6a', no: '⑥', risk: '건설기계·장비·설비', group: '끼임', text: '건설기계·하역운반기계·양중기에 안전장치를 갖추고 작업계획서를 작성합니까?', detail: '공통: 출입금지, 유도자 배치, 작업계획서 · 굴착기: 퀵커플러 안전핀, 후방영상장치 · 지게차: 백레스트, 헤드가드 · 양중기: 과부하·권과방지장치, 비상정지장치', tip: '작업 전 후방카메라 작동과 좌석 안전띠를 확인합니다.' },
  { id: '6b', no: '⑥', risk: '건설기계·장비·설비', group: '끼임', text: '정비·수리할 때 전원 차단, 고임목 설치, 작동금지 표지를 합니까?', tip: '전원을 끄고 표지를 붙인 뒤 작업합니다.' },
  { id: '6c', no: '⑥', risk: '건설기계·장비·설비', group: '끼임', text: '그라인더·둥근톱·절단기 등 돌출부에 덮개나 울을 설치했습니까?', tip: '덮개를 떼고 쓰지 않습니다.' },
  { id: '7a', no: '⑦', risk: '혼재 작업', group: '부딪힘', text: '작업 관계자 외에는 출입을 금지하고 있습니까?', tip: '작업반경 안 출입을 통제합니다.' },
  { id: '7b', no: '⑦', risk: '혼재 작업', group: '부딪힘', text: '작업구간과 이동 동선을 나누어 표시했습니까?', tip: '사람과 장비의 길을 구분합니다.' },
  { id: '7c', no: '⑦', risk: '혼재 작업', group: '부딪힘', text: '작업지휘자·유도자·신호수를 배치해 통제합니까?', tip: '장비가 움직일 때는 유도자를 둡니다.' },
  { id: '8a', no: '⑧', risk: '충돌 방지', group: '부딪힘', text: '건설기계·장비에 결함이나 작동 이상이 없습니까?', tip: '작업 전 안전점검(TBM)에서 확인합니다.' },
  { id: '8b', no: '⑧', risk: '충돌 방지', group: '부딪힘', text: '인양·하역 때 유도로프, 2줄걸이, 훅 해지장치를 사용합니까?', tip: '정격하중을 지키고 훅 해지장치를 씁니다.' },
  { id: '8c', no: '⑧', risk: '충돌 방지', group: '부딪힘', text: '차량계 건설기계를 원래 용도 외로 쓰지 않습니까?', tip: '굴착기로 인양할 때는 달기구와 작업설명서를 확인합니다.' },
  { id: '8d', no: '⑧', risk: '충돌 방지', group: '부딪힘', text: '건설자재·중량물을 정해진 장소에 안정되게 쌓아 둡니까?', tip: '적재 장소를 정하고 무너지지 않게 쌓습니다.' },
];

const GROUPS: Group[] = ['추락', '끼임', '부딪힘'];
const OPTS: [Exclude<Mark, null>, string][] = [['NA', '해당 없음'], ['OK', '적정'], ['NG', '부적정']];

export default function SiteCheckPage() {
  const [marks, setMarks] = useState<Mark[]>(ITEMS.map(() => null));
  const pick = (i: number, m: Exclude<Mark, null>) => setMarks((p) => p.map((v, k) => (k === i ? (v === m ? null : m) : v)));
  const done = marks.filter((m) => m !== null).length;
  const ok = marks.filter((m) => m === 'OK').length;
  const ng = useMemo(() => ITEMS.filter((_, i) => marks[i] === 'NG'), [marks]);

  return (
    <>
      <Header />
      <main className="min-h-screen bg-white text-[#111] [word-break:keep-all]">
        <section className="border-b border-[#E6E6E6]">
          <div className="mx-auto max-w-[1120px] px-6 py-12 md:px-8 md:py-16">
            <p className="text-[15px] font-bold text-[#8E2B2B]">현장 자체 점검표 · 순회점검용</p>
            <h1 className="mt-3 text-[34px] font-extrabold leading-[1.3] tracking-[-1px] md:text-[46px]">추락·끼임·부딪힘<br />8대 위험요인을 현장에서 점검합니다</h1>
            <p className="mt-4 max-w-[720px] text-[18px] leading-[1.75] text-[#333]">고용노동부가 배포한 점검표 20개 항목입니다. 현장을 돌며 항목마다 해당 없음·적정·부적정을 고르면, 고칠 항목과 핵심 안전수칙이 정리됩니다.</p>
            <p className="mt-3 text-[14px] leading-[1.7] text-[#777]">근거: 고용노동부 「3대 사고유형 8대 위험요인 사업장 자체 점검표」·「건설현장 주요 위험요인별 핵심 안전수칙」 · 답은 서버에 저장되지 않습니다</p>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-[1120px] px-6 md:px-8">
            <div className="sticky top-0 z-10 mb-6 flex items-center justify-between border-b border-[#E6E6E6] bg-white py-3">
              <p className="text-[16px] font-bold">점검 {done} / {ITEMS.length}</p>
              <p className="text-[16px]">적정 <b>{ok}</b> · 부적정 <b className="text-[#8E2B2B]">{ng.length}</b></p>
            </div>
            {GROUPS.map((g) => (
              <div key={g} className="mb-10">
                <h2 className="border-b-2 border-[#111] pb-2 text-[26px] font-extrabold">{g}</h2>
                {ITEMS.map((it, i) =>
                  it.group !== g ? null : (
                    <div key={it.id} className="grid gap-3 border-b border-[#E6E6E6] py-5 md:grid-cols-[1fr_auto] md:items-center md:gap-8">
                      <div>
                        <p className="text-[15px] font-bold text-[#666]">{it.no} {it.risk}</p>
                        <p className="mt-1 text-[18px] font-bold leading-[1.6]">{it.text}</p>
                        {it.detail ? <p className="mt-1 text-[15px] leading-[1.7] text-[#555]">{it.detail}</p> : null}
                      </div>
                      <div className="flex gap-2">
                        {OPTS.map(([m, l]) => (
                          <button key={m} type="button" aria-pressed={marks[i] === m} onClick={() => pick(i, m)}
                            className={'h-[48px] min-w-[88px] border px-3 text-[16px] font-bold ' + (marks[i] === m ? (m === 'NG' ? 'border-[#8E2B2B] bg-[#8E2B2B] text-white' : 'border-[#111] bg-[#111] text-white') : 'border-[#BDBDBD] bg-white text-[#333]')}>
                            {l}
                          </button>
                        ))}
                      </div>
                    </div>
                  ),
                )}
              </div>
            ))}
          </div>
        </section>

        <section className="border-t border-[#E6E6E6] bg-[#F5F5F4] py-10 md:py-14">
          <div className="mx-auto max-w-[1120px] px-6 md:px-8">
            <h2 className="text-[28px] font-extrabold leading-[1.35] md:text-[34px]">고칠 항목</h2>
            {ng.length === 0 ? (
              <p className="mt-3 text-[17px] text-[#555]">{done === 0 ? '항목을 점검하면 여기에 정리됩니다.' : '부적정 항목이 없습니다. 다음 순회점검 때 다시 확인하세요.'}</p>
            ) : (
              <ol className="mt-5 border-t border-[#111]">
                {ng.map((it, k) => (
                  <li key={it.id} className="grid grid-cols-[40px_1fr] gap-3 border-b border-[#DADADA] py-4">
                    <span className="text-[22px] font-light text-[#8E2B2B]">{k + 1}</span>
                    <div>
                      <p className="text-[15px] font-bold text-[#666]">{it.group} · {it.risk}</p>
                      <p className="mt-1 text-[17px] font-bold">{it.text}</p>
                      <p className="mt-1 text-[16px] leading-[1.7] text-[#333]">핵심 수칙: {it.tip}</p>
                    </div>
                  </li>
                ))}
              </ol>
            )}
            <p className="mt-5 text-[15px] leading-[1.7] text-[#555]">부적정 항목은 조치 담당자와 완료일을 정해 기록해 두세요. 이 점검 기록은 위험성평가 수시평가 자료로도 쓸 수 있습니다.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button type="button" onClick={() => window.print()} className="h-[52px] border border-[#111] bg-white px-6 text-[17px] font-bold">점검표 인쇄하기</button>
              <Link href="/risk-assessment" className="inline-flex h-[52px] items-center border border-[#111] bg-white px-6 text-[17px] font-bold text-[#111] no-underline">위험성평가 자가진단 →</Link>
              <Link href="/consult" className="inline-flex h-[52px] items-center bg-[#111] px-6 text-[17px] font-bold text-white no-underline">상담 신청</Link>
            </div>
          </div>
        </section>

        <section className="py-10 md:py-14">
          <div className="mx-auto max-w-[1120px] px-6 md:px-8">
            <h2 className="text-[24px] font-extrabold">모든 현장 공통 수칙</h2>
            <div className="mt-4 grid border-t border-[#111] md:grid-cols-2">
              <div className="border-b border-[#E6E6E6] py-4 md:pr-8"><p className="text-[17px] font-bold">높은 곳 작업</p><p className="mt-1 text-[16px] leading-[1.7] text-[#333]">안전난간과 작업발판, 추락방호망, 안전대 부착설비</p></div>
              <div className="border-b border-[#E6E6E6] py-4"><p className="text-[17px] font-bold">기계·장비 작업</p><p className="mt-1 text-[16px] leading-[1.7] text-[#333]">지반 상태 확인(전도 방지), 작업반경 출입 통제, 유도자 배치</p></div>
            </div>
            <p className="mt-4 text-[16px] font-bold">안전모·안전대 착용, 작업 전 안전점검(TBM)</p>
            <Link href="/" className="mt-8 inline-block text-[17px] font-bold text-[#8E2B2B] underline underline-offset-4">← SAFE119 홈으로</Link>
          </div>
        </section>

        <Disclaimer variant="compact" />
      </main>
      <Footer />
    </>
  );
}
