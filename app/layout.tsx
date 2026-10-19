import type { Metadata } from 'next';
import 'pretendard/dist/web/variable/pretendardvariable.css';
import '@/styles/globals.css';
import { getSiteUrl } from '@/lib/site';
import FloatingConsultButton from '@/components/layout/FloatingConsultButton';
import FamilyBar from '@/components/brand/FamilyBar';
import Script from 'next/script';

const siteUrl = getSiteUrl();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'SAFE119 — 안전보건관리체계 자가진단',
    template: '%s | SAFE119',
  },
  description:
    '형 확정 공표 사업장 81곳 중 92.6%가 유해·위험요인 확인·개선 점검을 위반했습니다(고용노동부, 2026.10.15). 시행령 제4조 9가지 의무와 위험성평가를 38문항으로 점검해 수사에서 보는 기록이 남아 있는지 확인하세요.',
  keywords: '중대재해처벌법, 안전보건관리체계, 자가진단, 경영책임자, 중처법, 안전보건',
  applicationName: 'SAFE119',
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: siteUrl,
    siteName: 'SAFE119',
    images: [{ url: '/og/home-v4.png', width: 1200, height: 630, alt: 'SAFE119 안전보건관리체계 자가진단' }],
    title: 'SAFE119 — 안전보건관리체계 자가진단',
    description:
      '형 확정 공표 사업장 81곳 중 92.6%가 유해·위험요인 확인·개선 점검을 위반했습니다(고용노동부, 2026.10.15). 시행령 제4조 9가지 의무와 위험성평가를 38문항으로 점검해 수사에서 보는 기록이 남아 있는지 확인하세요.',
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og/home-v4.png'],
    title: 'SAFE119 — 안전보건관리체계 자가진단',
    description:
      '형 확정 공표 사업장 81곳 중 92.6%가 유해·위험요인 확인·개선 점검을 위반했습니다(고용노동부, 2026.10.15). 시행령 제4조 9가지 의무와 위험성평가를 38문항으로 점검해 수사에서 보는 기록이 남아 있는지 확인하세요.',
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
      <body className="font-pretendard">
        <FamilyBar />
        {children}
        <FloatingConsultButton />
        {/* Vercel Web Analytics (방문 수만 집계, 쿠키·입력 내용 수집 없음) */}
        <Script id="vercel-va-init" strategy="afterInteractive">{`window.va = window.va || function () { (window.vaq = window.vaq || []).push(arguments); };`}</Script>
        <Script src="/_vercel/insights/script.js" strategy="afterInteractive" />
      </body>
    </html>
  );
}
