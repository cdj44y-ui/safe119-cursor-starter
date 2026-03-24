import NewsBanner from '@/components/layout/NewsBanner';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Disclaimer from '@/components/layout/Disclaimer';
import Step1Hero from '@/components/landing/Step1Hero';
import Step2Problem from '@/components/landing/Step2Problem';
import Step3BeforeAfter from '@/components/landing/Step3BeforeAfter';
import Step4Trust from '@/components/landing/Step4Trust';
import Step5Product from '@/components/landing/Step5Product';
import Step6Offer from '@/components/landing/Step6Offer';
import Step7Faq from '@/components/landing/Step7Faq';
import LinkedService from '@/components/landing/LinkedService';
import FinalCta from '@/components/landing/FinalCta';

export default function HomePage() {
  return (
    <>
      <NewsBanner />
      <Header />
      <main>
        {/* STEP 1: Hero / Headline */}
        <Step1Hero />
        {/* STEP 2: Problem / Agitation */}
        <Step2Problem />
        {/* STEP 3: Before / After */}
        <Step3BeforeAfter />
        {/* STEP 4: Trust & Authority */}
        <Step4Trust />
        {/* STEP 5: Product / Deep Dive */}
        <Step5Product />
        {/* STEP 6: Price / Offer */}
        <Step6Offer />
        {/* STEP 7: FAQ */}
        <Step7Faq />
        {/* 연계 서비스 */}
        <LinkedService />
        {/* 최종 듀얼 CTA */}
        <FinalCta />
        {/* 면책 고지 */}
        <Disclaimer />
      </main>
      <Footer />
    </>
  );
}
