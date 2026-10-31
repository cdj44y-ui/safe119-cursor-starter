import NewsBanner from '@/components/layout/NewsBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Disclaimer from '@/components/layout/Disclaimer';
import InvestigationLanding from '@/components/landing/InvestigationLanding';
import Step7Faq from '@/components/landing/Step7Faq';
import LinkedService from '@/components/landing/LinkedService';

export default function HomePage() {
  return (
    <>
      <NewsBanner />
      <Header />
      <main>
        {/* 수사 기록형 본문 (2026-10-17) */}
        <InvestigationLanding />
        {/* FAQ */}
        <Step7Faq />
        {/* 연계 서비스 */}
        <LinkedService />
        {/* 면책 고지 */}
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
