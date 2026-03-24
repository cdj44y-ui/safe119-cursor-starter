'use client';

import Button from '../ui/Button';

interface NavigationBarProps {
  onPrev: () => void;
  onNext: () => void;
  canGoPrev: boolean;
  canGoNext: boolean;
  isLast: boolean;
  onComplete: () => void;
}

export default function NavigationBar({
  onPrev,
  onNext,
  canGoPrev,
  canGoNext,
  isLast,
  onComplete,
}: NavigationBarProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <Button
        variant="outline"
        size="md"
        onClick={onPrev}
        disabled={!canGoPrev}
      >
        ◀ 이전
      </Button>

      {isLast ? (
        <Button
          variant="primary"
          size="lg"
          onClick={onComplete}
        >
          진단 완료 · 결과 보기
        </Button>
      ) : (
        <Button
          variant="primary"
          size="md"
          onClick={onNext}
          disabled={!canGoNext}
        >
          다음 ▶
        </Button>
      )}
    </div>
  );
}
