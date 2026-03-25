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
            <div className="bg-white border border-sand-200 rounded-lg p-8">
              <h2 className="text-lg font-extrabold text-ink mb-4">비대면 상담 예약</h2>
              <p className="text-[13px] text-ink-4 leading-relaxed mb-4">
                Calendly로 편한 시간을 선택하거나, 우측 연락처로 문의해 주세요.
              </p>
              <a
                href="https://calendly.com/cdj44y/15min"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center w-full sm:w-auto bg-ink text-white font-semibold py-3 px-6 rounded-md text-sm hover:bg-ink-2 transition-colors mb-4"
              >
                Calendly에서 15분 예약하기
              </a>
              <div className="rounded-lg overflow-hidden border border-sand-200 bg-sand-50 min-h-[520px]">
                <iframe
                  title="Calendly 예약"
                  src="https://calendly.com/cdj44y/15min"
                  className="w-full h-[520px] border-0"
                />
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white border border-sand-200 rounded-lg p-8">
              <h2 className="text-lg font-extrabold text-ink mb-4">직접 연락</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xs font-bold text-ink-5 uppercase tracking-wider mb-1">전화</h3>
                  <a href="tel:0221380240" className="text-sm text-ink font-medium hover:text-copper">
                    02-2138-0240
                  </a>
                </div>
                <div>
                  <h3 className="text-xs font-bold text-ink-5 uppercase tracking-wider mb-1">이메일</h3>
                  <a
                    href="mailto:cdj44y@gmail.com"
                    className="text-sm text-ink font-medium hover:text-copper break-all"
                  >
                    cdj44y@gmail.com
                  </a>
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
