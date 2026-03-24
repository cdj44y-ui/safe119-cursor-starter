'use client';

interface ProgressBarProps {
  answered: number;
  total: number;
  percentage: number;
}

export default function ProgressBar({ answered, total, percentage }: ProgressBarProps) {
  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-1.5">
        <span className="text-xs font-semibold text-ink-3">진행률</span>
        <span className="text-xs font-bold text-copper">{answered} / {total}문항 완료</span>
      </div>
      <div className="w-full h-2 bg-sand-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-copper rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
