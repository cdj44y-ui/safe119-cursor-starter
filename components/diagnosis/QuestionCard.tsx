'use client';

import { Question, AnswerValue } from '@/data/questions';
import AnswerButton from './AnswerButton';
import Badge from '../ui/Badge';

interface QuestionCardProps {
  question: Question;
  questionIndexInStep: number;
  totalInStep: number;
  globalIndex: number;
  totalGlobal: number;
  selectedAnswer: AnswerValue;
  onAnswer: (answer: AnswerValue) => void;
}

const riskBadge = {
  high: { variant: 'danger' as const, label: '고위험' },
  medium: { variant: 'warning' as const, label: '중위험' },
  low: { variant: 'success' as const, label: '저위험' },
};

export default function QuestionCard({
  question,
  questionIndexInStep,
  totalInStep,
  globalIndex,
  totalGlobal,
  selectedAnswer,
  onAnswer,
}: QuestionCardProps) {
  const risk = riskBadge[question.riskLevel];

  return (
    <div className="bg-white border border-sand-200 rounded-lg p-6 sm:p-8 shadow-sm">
      {/* Step & Question counter */}
      <div className="flex justify-between items-center mb-4">
        <span className="text-xs font-semibold text-ink-5">
          {questionIndexInStep + 1} / {totalInStep} · 전체 {globalIndex + 1}/{totalGlobal}
        </span>
        <Badge variant={risk.variant}>{risk.label}</Badge>
      </div>

      {/* Question text */}
      <h3 className="text-lg font-bold text-ink leading-relaxed mb-4">
        {question.question}
      </h3>

      {/* Legal basis & Reference */}
      <div className="flex flex-wrap gap-2 mb-6">
        <span className="text-[11px] bg-sand-100 text-ink-4 px-2 py-0.5 rounded font-medium">
          근거: {question.legalBasis}
        </span>
        {question.reference && (
          <span className="text-[11px] bg-sand-100 text-ink-5 px-2 py-0.5 rounded">
            참고: {question.reference}
          </span>
        )}
      </div>

      {/* Guidance */}
      {question.guidance && (
        <div className="bg-sand-50 border border-sand-200 rounded p-3 mb-6">
          <p className="text-xs text-ink-4 leading-relaxed">
            <span className="font-bold text-ink-3">💡 조치 가이드:</span> {question.guidance}
          </p>
        </div>
      )}

      {/* Answer buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {(['O', 'triangle', 'X', 'NA'] as AnswerValue[]).map((value) => (
          <AnswerButton
            key={value}
            value={value}
            selected={selectedAnswer === value}
            onClick={() => onAnswer(value)}
          />
        ))}
      </div>
    </div>
  );
}
