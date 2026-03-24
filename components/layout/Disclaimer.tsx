'use client';

interface DisclaimerProps {
  variant?: 'full' | 'compact';
}

export default function Disclaimer({ variant = 'full' }: DisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div className="text-[11px] text-ink-5 leading-relaxed text-center py-4">
        본 진단은 참고용 자가진단이며 법적 효력이 없습니다. 정확한 법률 검토는 전문가 상담을 이용하세요.
      </div>
    );
  }

  return (
    <section className="py-12 bg-sand-100">
      <div className="max-w-[960px] mx-auto px-7">
        <div className="bg-white border border-sand-200 rounded-lg p-6">
          <h3 className="text-xs font-bold text-ink-4 uppercase tracking-wider mb-3">면책 고지</h3>
          <div className="text-[12.5px] text-ink-4 leading-relaxed space-y-2">
            <p>
              본 자가진단은 중대재해처벌법 시행령 제4조 및 KOSHA 7대 핵심요소를 참고하여 제작된 참고용 도구입니다.
              진단 결과는 법적 효력이 없으며, 실제 법적 판단이나 행정처분의 근거로 사용될 수 없습니다.
            </p>
            <p>
              정확한 법률 검토와 안전보건관리체계 구축·이행점검은 반드시 전문가(공인노무사, 안전보건 전문기관)의 자문을 받으시기 바랍니다.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
