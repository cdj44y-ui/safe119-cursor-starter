import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

const expertiseBlocks = [
  {
    title: '근로자성·고용구조',
    subtitle: '실질로 판단한다',
    items: [
      '대법원 판례 기준 판단요소의 실무 적용',
      '위탁·도급·프리랜서 계약의 근로자성 리스크 진단',
      '가짜 3.3%·위장고용·근로감독 이슈 대비',
      '고용형태 전환·계약 구조 설계 자문',
    ],
  },
  {
    title: '중대재해·안전보건체계',
    subtitle: '경영책임과 현장을 연결한다',
    items: [
      '중대재해처벌법·시행령 제4조 핵심요소 이행 점검',
      '안전보건관리체계 구축·이행점검',
      '도급·다층 구조에서의 보호의무·합동 점검',
      '산업재해·수사·감독 맥락에서의 책임 정리',
    ],
  },
  {
    title: '분쟁·감독 대응',
    subtitle: '책임을 구조로 방어한다',
    items: [
      '근로자 지위 확인·임금·퇴직금 쟁점 대응',
      '고용노동부 근로감독·시정지시 대응',
      '4대보험·국세 연계 이슈 정리(실무 협업)',
      'HR 제도·성과관리와 지휘·감독 논점 정합성',
    ],
  },
];

const whyBlocks = [
  {
    step: '01',
    title: '판례·행정해석 기반으로 판단합니다',
    body:
      '근로자성·사용자 책임 이슈는 감으로 넘기기 어렵습니다. 대법원·하급심·노동위·행정해석을 업종·고용형태별로 정리한 판단 프레임으로, 귀사 사안과 유사한 선례를 기준으로 방향을 제시합니다.',
  },
  {
    step: '02',
    title: '사후 대응보다 사전 설계를 우선합니다',
    body:
      '분쟁이 표면화된 뒤 비용·시간은 급증합니다. 계약 구조, 지시·보고 체계, 보수·보험 처리를 사전에 점검해 근로자성·감독 리스크를 구조적으로 줄이는 것을 지향합니다.',
  },
  {
    step: '03',
    title: '안전 × 노동 × HR을 한 번에 봅니다',
    body:
      '근로자성 문제는 단독으로 끝나지 않습니다. 산업재해·중처법 이슈가 붙으면 특수고용·도급의 안전보호 의무와 겹치고, 성과·근태 관리는 지휘·감독 논점과 맞닿습니다. 안전공학 박사·공인노무사·대기업 HR 실무 경험을 바탕으로 통합적으로 정리합니다.',
  },
];

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0a0908] text-sand-600">
        {/* Hero — 다크 브루탈 + 그라데이션 */}
        <section className="relative overflow-hidden border-b border-white/[0.08]">
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.35]"
            style={{
              backgroundImage:
                'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(181,105,79,0.45), transparent 55%), radial-gradient(ellipse 60% 40% at 100% 0%, rgba(255,255,255,0.06), transparent 50%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            }}
          />
          <div className="relative max-w-[1100px] mx-auto px-7 pt-16 pb-20 md:pt-24 md:pb-28">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-copper mb-6">
                  Expert · 노무법인 위너스
                </p>
                <h1 className="text-[clamp(2.25rem,6vw,3.75rem)] font-extrabold text-white leading-[1.05] tracking-tight">
                  조대진
                  <span className="text-sand-500 font-bold"> 노무사</span>
                </h1>
                <div className="mt-8 h-px w-24 bg-gradient-to-r from-copper to-transparent" />
                <p className="mt-8 text-[15px] md:text-base leading-relaxed text-sand-400 max-w-2xl">
                  <span className="text-white font-semibold">
                    안전공학 박사 × 공인노무사 × 근로자성·고용감독 리스크 실무
                  </span>
                  <br />
                  <span className="text-sand-500">
                    현대카드·삼성서울병원 인사팀 출신. 계약서 제목이 아니라{' '}
            </span>
                  <span className="text-white">실질관계</span>
                  <span className="text-sand-500">
                    로 판단되는 근로자성, 위장고용·가짜 3.3%에 대한 고용부 감독 강화, 그리고 중대재해처벌법상
                    안전보건관리체계 이행 — 이슈가 겹칠 때 단일 분야만으로는 방어가 어렵습니다. 사고·책임·성과를
                    하나의 시스템으로 다루는{' '}
            </span>
                  <span className="text-white font-semibold">트라이브리드</span>
                  <span className="text-sand-500"> 전문가입니다.</span>
                </p>
              </div>
              <div className="shrink-0 flex flex-wrap gap-2 md:justify-end">
                {['안전공학 박사', '공인노무사 15년', '대기업 HR', '근로자성 자문'].map((badge) => (
                  <span
                    key={badge}
                    className="font-mono text-[10px] uppercase tracking-wider text-sand-300 border border-white/15 px-3 py-1.5 bg-white/[0.03]"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 리스크 — 라이트 카드 on 다크 */}
        <section className="border-b border-white/[0.06] bg-[#0c0b09]">
          <div className="max-w-[1100px] mx-auto px-7 py-16 md:py-20">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
              <div className="lg:w-[38%] shrink-0">
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-copper mb-6">
                  Risk layer
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white leading-snug tracking-tight">
                  왜 근로자성·고용형태 리스크가
                  <br />
                  <span className="text-sand-500">안전·중처법과 함께 붙는가</span>
                </h2>
              </div>
              <div className="flex-1 space-y-px bg-white/[0.08] border border-white/[0.08]">
                {[
                  {
                    title: '형식이 아니라 실질로 판단됩니다.',
                    body:
                      '위탁·도급·프리랜서 계약이라도 실질이 근로관계이면 근로자로 다투어질 수 있고, 그 과정에서 임금·4대보험·퇴직금이 소급될 수 있습니다. 고용노동부 보도에서도 3.3% 사업소득·위장고용 적발 사례가 반복적으로 지적되고 있습니다.',
                  },
                  {
                    title: '판단은 복수 요소의 종합입니다.',
                    body:
                      '업무 지시·취업규칙 적용·지휘감독·근무 구속·보수의 근로대가성·보험 처리 등이 한꺼번에 검토됩니다. 한 요소만 보고 결론 내리기 어렵습니다.',
                  },
                  {
                    title: '현장이 겹칩니다.',
                    body:
                      '도급·플랫폼·특수형태 노동에서 산업재해·중대재해 이슈가 발생하면, 사용자·수급인 책임과 근로자성 논점이 동시에 올라옵니다. SAFE119 자가진단이 다루는 안전보건관리체계와도 연결해 보아야 합니다.',
                  },
                ].map((row) => (
                  <div key={row.title} className="bg-[#0a0908] p-6 md:p-8">
                    <h3 className="text-sm font-bold text-white mb-3">{row.title}</h3>
                    <p className="text-[13.5px] text-sand-500 leading-relaxed">{row.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 전문 영역 — 그리드 */}
        <section className="bg-[#0a0908] border-b border-white/[0.06]">
          <div className="max-w-[1100px] mx-auto px-7 py-16 md:py-20">
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
              <div>
                <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-copper mb-6">
                  Scope
                </p>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">전문 영역</h2>
              </div>
              <p className="text-[13px] text-sand-500 max-w-md lg:text-right">
                근로자성·고용 구조 문제는{' '}
                <span className="text-white font-semibold">진단 → 방어 → 재설계</span> 순서로 정리할 때 같은
                분쟁이 반복되지 않습니다.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/[0.1] border border-white/[0.1]">
              {expertiseBlocks.map((block) => (
                <div
                  key={block.title}
                  className="bg-[#0a0908] p-6 md:p-8 flex flex-col min-h-[280px] group hover:bg-[#0e0d0b] transition-colors duration-300"
                >
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <h3 className="text-base font-extrabold text-white leading-snug">{block.title}</h3>
                    <span className="font-mono text-[10px] text-copper shrink-0 pt-1">{'//'}</span>
                  </div>
                  <p className="text-[13px] font-medium text-sand-400 mb-6 border-l-2 border-copper/60 pl-3">
                    {block.subtitle}
                  </p>
                  <ul className="space-y-3 text-[12.5px] text-sand-500 leading-snug mt-auto">
                    {block.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="text-copper/80 font-mono text-[10px] mt-0.5">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 왜 조대진 — 번호 스트립 */}
        <section className="bg-[#0c0b09]">
          <div className="max-w-[1100px] mx-auto px-7 py-16 md:py-20">
            <p className="font-mono text-[11px] uppercase tracking-[0.35em] text-copper mb-6">
              Method
            </p>
            <h2 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight mb-2">
              왜 조대진 노무사인가
            </h2>
            <p className="text-sm text-sand-500 mb-12 max-w-xl">데이터·판례·현장 구조를 같은 축에 둡니다.</p>

            <div className="space-y-0">
              {whyBlocks.map((b) => (
                <div
                  key={b.step}
                  className="grid grid-cols-1 md:grid-cols-[minmax(0,88px)_1fr] gap-6 md:gap-10 py-10 border-t border-white/[0.08] first:border-t-0 first:pt-0"
                >
                  <div className="font-mono text-4xl md:text-5xl font-bold text-white/[0.12] leading-none">
                    {b.step}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white mb-3">{b.title}</h3>
                    <p className="text-[13.5px] text-sand-500 leading-relaxed max-w-2xl">{b.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 연계 + CTA */}
        <section className="relative border-t border-white/[0.08] bg-gradient-to-b from-[#0a0908] to-[#121110]">
          <div className="max-w-[1100px] mx-auto px-7 py-16 md:py-20">
            <div className="flex flex-col lg:flex-row gap-10 lg:items-stretch">
              <div className="flex-1 border border-white/10 p-6 md:p-8 bg-white/[0.02]">
                <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-copper mb-4">Link</p>
                <p className="text-[13px] text-sand-500 leading-relaxed">
                  <span className="text-white font-semibold">연계 안내:</span> 근로자성 자가진단·프리랜서 구분 점검은{' '}
                  <a
                    href="https://free119.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-copper font-semibold underline underline-offset-4 decoration-copper/40 hover:text-white transition-colors"
                  >
                    FREE119 (free119.site)
                  </a>
                  에서 확인하실 수 있습니다. 본 SAFE119는 중대재해처벌법 안전보건관리체계 이행 점검에 특화되어 있습니다.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 lg:w-[min(100%,360px)] shrink-0">
                <Link
                  href="/diagnosis"
                  className="inline-flex items-center justify-center gap-2 bg-copper text-white font-bold py-4 px-6 text-sm uppercase tracking-wide hover:bg-copper-hover transition-colors"
                >
                  무료 진단 시작
                </Link>
                <Link
                  href="/consult"
                  className="inline-flex items-center justify-center gap-2 bg-white text-ink font-bold py-4 px-6 text-sm uppercase tracking-wide hover:bg-sand-200 transition-colors"
                >
                  전문가 상담 신청
                </Link>
                <a
                  href="https://free119.site/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 border border-white/20 text-white font-semibold py-4 px-6 text-sm hover:border-copper hover:text-copper transition-colors"
                >
                  FREE119 근로자성 소개
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
