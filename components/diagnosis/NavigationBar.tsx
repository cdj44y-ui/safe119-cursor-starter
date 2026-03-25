'use client';

import Button from '../ui/Button';

interface NavigationBarProps {
  onPrev: () => void;
  canGoPrev: boolean;
  /** 전체 문항 응답 완료 시(또는 수정 후) 결과 페이지로 이동 */
  showResultCta: boolean;
  onComplete: () => void;
}

export default function NavigationBar({
  onPrev,
  canGoPrev,
  showResultCta,
  onComplete,
}: NavigationBarProps) {
  return (
    <div className="flex justify-between items-center gap-4 mt-6">
      <Button
        variant="outline"
        size="md"
        onClick={onPrev}
        disabled={!canGoPrev}
      >
        ◀ 이전
      </Button>

      {showResultCta ? (
        <Button variant="primary" size="lg" onClick={onComplete}>
          결과 보기
        </Button>
      ) : (
        <p className="text-[11px] text-ink-5 text-right leading-snug max-w-[220px] sm:max-w-none">
          응답을 선택하면 다음 문항으로 이동합니다
        </p>
      )}
    </div>
  );
}
