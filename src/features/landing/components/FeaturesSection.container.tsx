import React from "react"
import ThreeCardFocusCarousel, { FeatureCard } from "../../../shared/components/ThreeCardFocusCarousel"
import { CheckCircle2, BarChart2, Search } from "lucide-react"

interface FeaturesSectionContainerProps {
  t: (key: string) => string
}

const FeaturesSectionContainer: React.FC<FeaturesSectionContainerProps> = ({ t }) => {
  const features: FeatureCard[] = [
    {
      icon: <CheckCircle2 className="h-7 w-7 text-white" />,
      title: t('card1.title'),
      desc: t('card1.desc'),
    },
    {
      icon: <BarChart2 className="h-7 w-7 text-white" />,
      title: t('card2.title'),
      desc: t('card2.desc'),
    },
    {
      icon: <Search className="h-7 w-7 text-white" />,
      title: t('card3.title'),
      desc: t('card3.desc'),
    },
  ]
  return <ThreeCardFocusCarousel features={features} autoplay interval={3500} />
}

export default FeaturesSectionContainer
