import React from "react"
import { CheckCircle2, BarChart2, Search } from "lucide-react"
import { TranslationKey } from "../../../i18n";
import { FeatureCard } from "@/interfaces/components/cards/FeatureCard.interface";
import ThreeCardFocusCarousel from "../../../shared/components/ThreeCardFocusCarousel";

interface FeaturesSectionProps {
  translate: (key: TranslationKey) => string;
}

const FeaturesSectionContainer: React.FC<FeaturesSectionProps> = ({ translate }) => {
  const features: FeatureCard[] = [
    {
      icon: (
        <span className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white">
          <CheckCircle2 className="h-7 w-7 text-blue-500" />
        </span>
      ),
      title: translate('card1.title'),
      desc: translate('card1.desc'),
    },
    {
      icon: (
        <span className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white">
          <BarChart2 className="h-7 w-7 text-blue-500" />
        </span>
      ),
      title: translate('card2.title'),
      desc: translate('card2.desc'),
    },
    {
      icon: (
        <span className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white">
          <Search className="h-7 w-7 text-blue-500" />
        </span>
      ),
      title: translate('card3.title'),
      desc: translate('card3.desc'),
    },
  ]
  const sectionTitle = translate('features.title') && translate('features.title') !== 'features.title'
    ? translate('features.title')
    : translate('features.altTitle')
  return (
    <section className="py-20 flex flex-col items-center">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center mb-14 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
        {sectionTitle}
      </h2>
      <ThreeCardFocusCarousel
        features={features}
        cardClassName="border border-blue-200 shadow-2xl rounded-3xl bg-gradient-to-r from-blue-500 to-violet-500 text-white"
        cardWidth={380}
        cardHeight={340}
      />
    </section>
  )
}

export default FeaturesSectionContainer
