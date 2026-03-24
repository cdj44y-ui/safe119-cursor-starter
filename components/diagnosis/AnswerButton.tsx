'use client';

/** 진단 화면에서 선택 가능한 응답 (해당없음 제외) */
export type DiagnosisAnswerOption = 'O' | 'triangle' | 'X';

interface AnswerButtonProps {
  value: DiagnosisAnswerOption;
  selected: boolean;
  onClick: () => void;
}

const answerConfig: Record<DiagnosisAnswerOption, { label: string; icon: string; color: string; selectedBg: string; selectedBorder: string }> = {
  O: {
    label: '이행 완료 (O)',
    icon: '✅',
    color: 'text-semantic-green-text',
    selectedBg: 'bg-semantic-green-bg',
    selectedBorder: 'border-semantic-green-text',
  },
  triangle: {
    label: '일부 이행 (△)',
    icon: '⚠️',
    color: 'text-semantic-amber-text',
    selectedBg: 'bg-semantic-amber-bg',
    selectedBorder: 'border-semantic-amber-text',
  },
  X: {
    label: '미이행 (X)',
    icon: '❌',
    color: 'text-semantic-red-text',
    selectedBg: 'bg-semantic-red-bg',
    selectedBorder: 'border-semantic-red-text',
  },
};

export default function AnswerButton({ value, selected, onClick }: AnswerButtonProps) {
  if (!value) return null;
  const config = answerConfig[value];

  return (
    <button
      onClick={onClick}
      className={`w-full text-left px-4 py-3 rounded-lg border-2 transition-all duration-200 cursor-pointer ${
        selected
          ? `${config.selectedBg} ${config.selectedBorder} ${config.color} font-bold`
          : 'bg-white border-sand-200 text-ink-3 hover:border-sand-400 hover:bg-sand-50'
      }`}
      aria-pressed={selected}
    >
      <span className="mr-2">{config.icon}</span>
      {config.label}
    </button>
  );
}
