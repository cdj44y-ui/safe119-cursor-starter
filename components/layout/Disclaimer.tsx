'use client';

interface DisclaimerProps {
  variant?: 'full' | 'compact';
}

export default function Disclaimer({ variant = 'full' }: DisclaimerProps) {
  if (variant === 'compact') {
    return (
      <div className="text-xs text-ink-5 leading-relaxed text-center py-4">
        본 진단은 참고용 자가진단이며 법적 효력이 없습니다. 정확한 법률 검토는 전문가 상담을 이용하세요.
      </div>
    );
  }

  return (
    <section className="py-6 bg-sand-100">
      <div className="max-w-[960px] mx-auto px-7">
        <p className="text-sm text-ink-4 leading-relaxed">
          <b className="font-bold">면책 고지</b> · 본 자가진단은 중대재해처벌법 시행령 제4조와 KOSHA 7대 핵심요소를 바탕으로 만든 참고용 도구로, 결과는 법적 효력이 없고 법적 판단이나 행정처분의 근거가 될 수 없습니다. 정확한 법률 검토와 체계 구축·이행점검은 전문가(공인노무사, 안전보건 전문기관)와 상의하시기 바랍니다.
        </p>
      </div>
    </section>
  );
}
