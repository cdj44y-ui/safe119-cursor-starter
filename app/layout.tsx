import type { Metadata } from 'next';
import '@/styles/globals.css';
import { getSiteUrl } from '@/lib/site';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SAFE119 — 안전보건관리체계 자가진단',
    template: '%s | SAFE119',
  },
  description:
    '중대재해처벌법 시행령 제4조 9대 핵심요소 기준, 67문항 자가진단. 경영책임자 의무 이행 수준을 10분 안에 확인하세요.',
  keywords: '중대재해처벌법, 안전보건관리체계, 자가진단, 경영책임자, 중처법, 안전보건',
  applicationName: 'SAFE119',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: 'SAFE119',
    title: 'SAFE119 — 안전보건관리체계 자가진단',
    description:
      '중대재해처벌법 시행령 제4조 9대 핵심요소 기준, 67문항 자가진단. 경영책임자 의무 이행 수준을 10분 안에 확인하세요.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SAFE119 — 안전보건관리체계 자가진단',
    description:
      '중대재해처벌법 시행령 제4조 9대 핵심요소 기준, 67문항 자가진단. 경영책임자 의무 이행 수준을 10분 안에 확인하세요.',
  },
  robots: {
    index: true,
    follow: true,
  },
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
