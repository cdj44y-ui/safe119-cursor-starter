import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand-50 py-16">
        <div className="max-w-[960px] mx-auto px-7">
          <span className="text-[11px] font-bold text-copper uppercase tracking-[1.2px] block mb-2.5">
            전문가 소개
          </span>
          <div className="w-8 h-0.5 bg-sand-400 mb-6" />
          <h1 className="text-[28px] font-extrabold text-ink tracking-tight mb-10">
            안전 &times; 노동 &times; HR
            <br />
            트라이브리드 전문가
          </h1>

          <div className="bg-white border border-sand-200 rounded-lg p-8 mb-8">
            <div className="text-xs text-ink-5 mb-1">노무법인 위너스</div>
            <h2 className="text-2xl font-extrabold text-ink mb-2">조대진 노무사</h2>
            <p className="text-[14.5px] text-ink-3 leading-relaxed mb-6 max-w-lg">
              안전공학 박사 &times; 공인노무사 15년 &times; 대기업 HR 실무·컨설팅 경험.
              단일 분야 전문가가 아니라 안전(사고) &times; 노동법(책임) &times; HR(성과)을
              하나의 시스템으로 다루는 트라이브리드 전문가입니다.
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {['안전공학 박사', '공인노무사 15년', '대기업 HR 실무'].map((badge) => (
                <span key={badge} className="text-[11px] bg-copper-light text-copper px-3 py-1 rounded-full font-bold">
                  {badge}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-bold text-ink mb-3">전문 분야</h3>
            <div className="flex flex-wrap gap-2 mb-8">
              {[
                '중대재해처벌법 대응', '안전보건관리체계 구축', '위험성평가',
                '수사·감독 대응', '직장 내 괴롭힘', 'HR 제도 설계',
                '근로시간 설계', '성과관리체계', '노사관계',
              ].map((tag) => (
                <span key={tag} className="text-[11px] bg-sand-100 text-ink-4 px-2.5 py-1 rounded font-medium">
                  {tag}
                </span>
              ))}
            </div>

            <h3 className="text-sm font-bold text-ink mb-3">사고 방식</h3>
            <ul className="space-y-2 text-[13px] text-ink-3 leading-relaxed mb-8">
              <li>판례·논문·행정해석·데이터 기반 판단을 중시합니다.</li>
              <li>법적·학술적으로 방어 가능한가를 기준으로 사고합니다.</li>
              <li>단편적 해결보다 구조·시스템·프레임을 설계합니다.</li>
            </ul>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/diagnosis" className="btn-primary">
                무료 진단 시작하기
              </Link>
              <Link
                href="/consult"
                className="inline-flex items-center justify-center gap-2 bg-ink text-white font-semibold py-3 px-6 rounded transition-all duration-200 hover:bg-ink-2"
              >
                전문가 상담 신청
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
