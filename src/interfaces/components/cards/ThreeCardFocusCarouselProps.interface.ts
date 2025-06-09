import { ReactNode } from 'react';

export interface ThreeCardFocusCarouselProps {
  features: {
    icon: ReactNode;
    title: string;
    desc: string;
  }[];
}
