import React from 'react';
import Navbar from '../components/organisms/Navbar';
import Footer from '../components/organisms/Footer';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import HeroSectionContainer from '../features/landing/components/HeroSection.container';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import HowItWorksSection from '../features/landing/components/HowItWorksSection.ui';
import FeaturesSectionContainer from '../features/landing/components/FeaturesSection.container';
import BenefitsSection from '../features/landing/components/BenefitsSection.ui';
import TrustSection from '../features/landing/components/TrustSection.ui';

const Landing: React.FC = () => {
  const { t } = useLanguage();
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-400 via-blue-200 to-violet-200 px-0 py-0 font-sans">
      <Navbar />

      <HeroSectionContainer />

      <main className="flex-grow">
          <div className="container mx-auto px-4 sm:px-8">
          <div className="border-b border-white/70 mb-10" />
        </div>
        <div className="container mx-auto px-4 sm:px-8 py-10">
          {/* Encabezado con estilo similar al Dashboard */}
          <header className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 p-6 gap-6 md:gap-0">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-white/30 backdrop-blur-md shadow-lg">
                <CheckCircle2 className="h-8 w-8 text-blue-500" />
              </div>
              <div>
                <h1 className="text-3xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-500 to-violet-500 text-transparent bg-clip-text mb-1">
                  {t('landing.hero.title')}
                </h1>
                <span className="text-lg text-gray-700 font-semibold tracking-wide">{t('landing.hero.subtitle')}</span>
              </div>
            </div>

          </header>
        </div>



        <div className="container mx-auto px-4 sm:px-8">
          <HowItWorksSection t={t} />
        </div>



        <div className="container mx-auto px-4 sm:px-8">
          <FeaturesSectionContainer t={t} />
        </div>


        <div className="container mx-auto px-4 sm:px-8">
          <BenefitsSection t={t} />
        </div>



        <div className="container mx-auto px-4 sm:px-8">
          <TrustSection t={t} />
        </div>



        <div className="container mx-auto px-4 sm:px-8">
          <div className="mt-16 text-center">
            <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">{t('landing.cta.title')}</h3>
            <p className="text-gray-700 mb-8 max-w-2xl mx-auto text-base md:text-lg">
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
      </main>

      <Footer />
    </div>
  );
};

export default Landing;
