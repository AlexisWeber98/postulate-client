import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { CTASectionProps } from '../../../types/components/landing/landing.types';

const CTASection: React.FC<CTASectionProps> = ({ t }) => {
  return (
    <div className="relative w-full py-20">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1920&q=80)'
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
      </div>
      <div className="relative z-10 container mx-auto px-4 sm:px-8">
        <div className="mt-16 text-center mb-16 md:mb-32">
          <h3 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent drop-shadow-lg">
            {t('landing.cta.title')}
          </h3>
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
    </div>
  );
};

export default CTASection;
