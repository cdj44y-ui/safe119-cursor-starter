import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function ConsultPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand-50 py-16">
        <div className="max-w-[960px] mx-auto px-7">
          <span className="text-[11px] font-bold text-copper uppercase tracking-[1.2px] block mb-2.5">
            상담 신청
          </span>
          <div className="w-8 h-0.5 bg-sand-400 mb-6" />
          <h1 className="text-[28px] font-extrabold text-ink tracking-tight mb-4">
            전문가 상담 신청
          </h1>
          <p className="text-[14.5px] text-ink-4 leading-relaxed max-w-lg mb-10">
            안전공학 박사 + 공인노무사의 통합 자문을 받아보세요.
            중대재해처벌법 안전보건관리체계 구축·이행점검을 원스톱으로 지원합니다.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {/* Calendly Embed Placeholder */}
            <div className="bg-white border border-sand-200 rounded-lg p-8">
              <h2 className="text-lg font-extrabold text-ink mb-4">비대면 상담 예약</h2>
              <p className="text-[13px] text-ink-4 leading-relaxed mb-6">
                아래 Calendly 위젯을 통해 편리한 시간에 상담을 예약하세요.
              </p>
              {/* TODO: Calendly 임베드 — Cursor에서 아래 주석을 실제 Calendly URL로 교체하세요 */}
              <div className="bg-sand-100 border border-sand-200 rounded-lg p-12 text-center">
                <p className="text-sm text-ink-5">
                  Calendly 임베드 영역
                  <br />
                  <span className="text-[11px]">(Cursor에서 Calendly URL을 설정하세요)</span>
                </p>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-sand-200 rounded-lg p-8">
              <h2 className="text-lg font-extrabold text-ink mb-4">직접 연락</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-ink-5 uppercase tracking-wider mb-1">전화</h3>
                  <p className="text-sm text-ink font-medium">000-0000-0000</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-5 uppercase tracking-wider mb-1">이메일</h3>
                  <p className="text-sm text-ink font-medium">consult@winners.co.kr</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-5 uppercase tracking-wider mb-1">운영 시간</h3>
                  <p className="text-sm text-ink-3">평일 09:00 ~ 18:00 (주말·공휴일 휴무)</p>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-5 uppercase tracking-wider mb-1">상담 범위</h3>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {['안전보건관리체계 구축', '위험성평가', '수사·감독 대응', '중처법 컨설팅'].map((item) => (
                      <span key={item} className="text-[10px] bg-sand-100 text-ink-4 px-2 py-0.5 rounded font-medium">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
