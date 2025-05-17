import React from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import { ArrowRight, CheckCircle2, Search, ClipboardList, Briefcase } from 'lucide-react';
import HeroSectionContainer from '../features/landing/components/HeroSection.container';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import HowItWorksSection from '../features/landing/components/HowItWorksSection.ui';
import FeaturesSectionContainer from '../features/landing/components/FeaturesSection.container';
import BenefitsSection from '../features/landing/components/BenefitsSection.ui';
import TrustSection from '../features/landing/components/TrustSection.ui';
import { motion } from 'framer-motion';
import SideNavbar from '../components/organisms/SideNavbar';

const Landing: React.FC = () => {
  const { t } = useLanguage();

  const sections = [
    { id: 'hero', label: t('landing.hero.title') },
    { id: 'intro', label: t('landing.intro.title') },
    { id: 'how-it-works', label: t('landing.howItWorks.title') },
    { id: 'features', label: t('landing.features.title') },
    { id: 'benefits', label: t('landing.benefits.title') },
    { id: 'trust', label: t('landing.trust.title') },
    { id: 'cta', label: t('landing.cta.title') },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 px-0 py-0 font-sans">
      <Navbar />
      <div id="hero" className="relative w-full h-screen">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1920&q=80)', zIndex: 0 }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10">
          <HeroSectionContainer />
        </div>
      </div>
      <SideNavbar sections={sections} />

      <div id="intro">
        <section className="py-20">
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-y-8 gap-x-12 w-full">
              <div className="relative w-full h-44 md:h-56 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1515168833906-d2a3b82b302b?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
                  <CheckCircle2 className="w-10 h-10 text-white mb-2 drop-shadow-lg" />
                  <span className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg">
                    {t('landing.intro.card1')}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-44 md:h-56 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
                  <Search className="w-10 h-10 text-white mb-2 drop-shadow-lg" />
                  <span className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg">
                    {t('landing.intro.card2')}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-44 md:h-56 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
                  <ClipboardList className="w-10 h-10 text-white mb-2 drop-shadow-lg" />
                  <span className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg">
                    {t('landing.intro.card3')}
                  </span>
                </div>
              </div>
              <div className="relative w-full h-44 md:h-56 rounded-2xl shadow-lg overflow-hidden flex items-center justify-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="absolute inset-0 bg-black/30" />
                <div className="relative z-10 flex flex-col items-center justify-center w-full h-full px-4">
                  <Briefcase className="w-10 h-10 text-white mb-2 drop-shadow-lg" />
                  <span className="text-2xl md:text-3xl font-extrabold text-white text-center drop-shadow-lg">
                    {t('landing.intro.card4')}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>
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
            <HowItWorksSection t={t} />
          </div>
        </motion.div>

        <motion.div id="features" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.1 }} className="container mx-auto px-4 sm:px-8">
          <FeaturesSectionContainer t={t} />
        </motion.div>

        <motion.div id="benefits" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }} className="relative w-full py-20">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=1920&q=80)' }}>
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-8">
            <BenefitsSection t={t} />
          </div>
        </motion.div>

        <motion.div id="trust" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.3 }} className="container mx-auto px-4 sm:px-8">
          <TrustSection t={t} />
        </motion.div>

        <motion.div id="cta" initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.4 }} className="relative w-full py-20">
          <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80)' }}>
            <div className="absolute inset-0 bg-black/60" />
          </div>
          <div className="relative z-10 container mx-auto px-4 sm:px-8">
            <div className="mt-16 text-center mb-16 md:mb-32">
              <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">{t('landing.cta.title')}</h3>
              <p className="text-white mb-8 max-w-2xl mx-auto text-base md:text-lg drop-shadow-lg bg-black/40 rounded-lg px-4 py-2 inline-block">
                {t('landing.cta.description')}
              </p>
              <Link
                to="/register"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl shadow-lg text-white font-extrabold text-lg transition bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 focus:outline-none focus:ring-2 focus:ring-blue-400 w-[320px] whitespace-nowrap gap-4"
                style={{ boxShadow: '0 4px 24px 0 rgba(80, 112, 255, 0.15)' }}
              >
                {t('landing.cta.button')}
                <ArrowRight className="h-5 w-5 text-white" />
              </Link>
            </div>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
