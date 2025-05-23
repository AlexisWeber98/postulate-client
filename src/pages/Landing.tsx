import React from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import HeroSectionContainer from '../features/landing/components/HeroSection.container';
import { useLanguageStore } from '../store';
import HowItWorksSection from '../features/landing/components/HowItWorksSection.ui';
import FeaturesSectionContainer from '../features/landing/components/FeaturesSection.container';
import BenefitsSection from '../features/landing/components/BenefitsSection.ui';
import TrustSection from '../features/landing/components/TrustSection.ui';
import { motion } from 'framer-motion';
import SideNavbar from '../components/organisms/SideNavbar';
import IntroSection from '../features/landing/components/IntroSection.ui';
import CTASection from '../features/landing/components/CTASection.ui';
import HeroBackground from '../features/landing/components/HeroBackground.ui';

const Landing: React.FC = () => {
  const { translate } = useLanguageStore();

  const sections = [
    { id: 'hero', label: translate('landing.hero.title') },
    { id: 'intro', label: translate('landing.intro.title') },
    { id: 'how-it-works', label: translate('landing.howItWorks.title') },
    { id: 'features', label: translate('landing.features.title') },
    { id: 'benefits', label: translate('landing.benefits.title') },
    { id: 'trust', label: translate('landing.trust.title') },
    { id: 'cta', label: translate('landing.cta.title') },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-0 py-0 font-sans transition-colors duration-200">
      <Navbar />
      <div id="hero" className="relative w-full h-screen">
        <HeroBackground />
        <div className="relative z-10">
          <HeroSectionContainer />
        </div>
      </div>
      <SideNavbar sections={sections} />

      <div id="intro">
        <IntroSection translate={translate} />
      </div>

      <main className="flex-grow">
        <div className="container mx-auto px-4 sm:px-8">
          <div className="border-b border-white/70 mb-10" />
        </div>

        <motion.div id="how-it-works" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }} className="relative w-full py-20">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1920&q=80)' }}>
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-8">
            <HowItWorksSection translate={translate} />
          </div>
        </motion.div>

        <motion.div id="features" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="container mx-auto px-4 sm:px-8">
          <FeaturesSectionContainer translate={translate} />
        </motion.div>

        <motion.div id="benefits" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative w-full py-20">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80)' }}>
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-8">
            <BenefitsSection translate={translate} />
          </div>
        </motion.div>

        <motion.div id="trust" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="container mx-auto px-4 sm:px-8">
          <TrustSection translate={translate} />
        </motion.div>

        <motion.div id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }}>
          <CTASection translate={translate} />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
