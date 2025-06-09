import { ReactNode } from 'react';

export interface Feature {
  icon: ReactNode;
  title: string;
  desc: string;
}

export interface ThreeCardFocusCarouselProps {
  features: Feature[];
  autoplay?: boolean;
  interval?: number;
  cardClassName?: string;
  cardWidth?: number;
  cardHeight?: number;
}
