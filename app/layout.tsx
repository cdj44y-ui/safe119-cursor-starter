import type { Metadata } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'SAFE119 — 안전보건관리체계 자가진단',
  description:
    '중대재해처벌법 시행령 제4조 9대 핵심요소 기준, 67문항 자가진단. 경영책임자 의무 이행 수준을 10분 안에 확인하세요.',
  keywords: '중대재해처벌법, 안전보건관리체계, 자가진단, 경영책임자, 중처법, 안전보건',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="font-pretendard">{children}</body>
    </html>
  );
}
