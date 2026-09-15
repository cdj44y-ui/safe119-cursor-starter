'use client';

import { useMemo } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import TallyEmbed from '@/components/ui/TallyEmbed';
import { buildTallyEmbedUrl } from '@/lib/tally';
import { useDiagnosisStore } from '@/store/diagnosisStore';
import { calculateTotalResult, GRADE_DESCRIPTIONS } from '@/lib/calculateScore';

export default function ConsultPage() {
  const answers = useDiagnosisStore((state) => state.answers);
  const isAllComplete = useDiagnosisStore((state) => state.isAllComplete);

  const diagnosisSummary = useMemo(() => {
    if (Object.keys(answers).length === 0 || !isAllComplete()) return null;
    const result = calculateTotalResult(answers);
    return {
      percentage: result.overallPercentage,
      grade: result.overallGrade,
      label: GRADE_DESCRIPTIONS[result.overallGrade].label,
    };
  }, [answers, isAllComplete]);

  const tallySrc = useMemo(
    () =>
      buildTallyEmbedUrl({
        grade: diagnosisSummary ? `[SAFE119] ${diagnosisSummary.label}` : '[SAFE119]',
        score: diagnosisSummary ? `${diagnosisSummary.percentage}점` : undefined,
      }),
    [diagnosisSummary]
  );

  return (
    <>
      <Header />
      <main className="min-h-screen bg-sand-50 py-16">
        <div className="max-w-[960px] mx-auto px-7">
          <span className="text-xs font-bold text-copper uppercase tracking-[1.2px] block mb-2.5">
            상담 신청
          </span>
          <div className="w-8 h-0.5 bg-sand-400 mb-6" />
          <h1 className="text-[28px] font-extrabold text-ink tracking-tight mb-4">
            전문가 상담 신청
          </h1>
          <p className="text-sm text-ink-4 leading-relaxed max-w-lg mb-4">
            안전공학 박사 + 공인노무사의 통합 자문을 받아보세요.
            중대재해처벌법 안전보건관리체계 구축·이행점검을 원스톱으로 지원합니다.
          </p>

          {diagnosisSummary && (
            <p className="text-sm text-copper bg-copper-light rounded-lg px-4 py-3 max-w-lg mb-6 leading-relaxed">
              방금 진행한 자가진단 결과({diagnosisSummary.percentage}점 · {diagnosisSummary.label})가 문의 내용에 함께 전달됩니다.
            </p>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <div className="bg-white border border-sand-200 rounded-lg p-8">
              <h2 className="text-lg font-extrabold text-ink mb-4">상담 신청 폼</h2>
              <p className="text-sm text-ink-4 leading-relaxed mb-4">
                아래 폼을 제출하시면 담당 노무사(조대진)에게 바로 접수됩니다.
              </p>
              <TallyEmbed src={tallySrc} title="노무 상담 문의 · 조대진 노무사" height={720} />
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
                      <span key={item} className="text-xs bg-sand-100 text-ink-4 px-2 py-0.5 rounded font-medium">
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
