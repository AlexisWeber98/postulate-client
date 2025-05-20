import React from "react"
import ThreeCardFocusCarousel, { FeatureCard } from "../../../shared/components/ThreeCardFocusCarousel"
import { CheckCircle2, BarChart2, Search } from "lucide-react"


interface FeaturesSectionProps {
  t: (key: string) => string;
}

const FeaturesSectionContainer: React.FC<FeaturesSectionProps> = ({ t }) => {
  const features: FeatureCard[] = [
    {
      icon: (
        <span className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white">
          <CheckCircle2 className="h-7 w-7 text-blue-500" />
        </span>
      ),
      title: t('card1.title'),
      desc: t('card1.desc'),
    },
    {
      icon: (
        <span className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white">
          <BarChart2 className="h-7 w-7 text-blue-500" />
        </span>
      ),
      title: t('card2.title'),
      desc: t('card2.desc'),
    },
    {
      icon: (
        <span className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-white">
          <Search className="h-7 w-7 text-blue-500" />
        </span>
      ),
      title: t('card3.title'),
      desc: t('card3.desc'),
    },
  ]
  const sectionTitle = t('features.title') && t('features.title') !== 'features.title'
    ? t('features.title')
    : (t('¿Por qué elegir Postulate?') || 'Why choose Postulate?')
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
