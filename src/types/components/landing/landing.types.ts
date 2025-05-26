import { TranslationKey } from '../../../i18n';

export interface LandingSectionProps {
  translate: (key: TranslationKey) => string;
}

export interface CardProps {
  icon: React.ReactNode;
  text: string;
  image: string;
}

export interface IntroSectionProps extends LandingSectionProps {
  cards?: CardProps[];
}

export type CTASectionProps = LandingSectionProps;
export type TrustSectionProps = LandingSectionProps;
export type FeaturesSectionProps = LandingSectionProps;
export type HowItWorksSectionProps = LandingSectionProps;

export interface BenefitsSectionProps {
  t: (key: string) => string;
}

export interface HeroBackgroundProps {
  imageUrl?: string;
  overlayOpacity?: number;
}
