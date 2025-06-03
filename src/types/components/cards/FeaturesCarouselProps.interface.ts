import { LucideIcon } from 'lucide-react';

export interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

export interface FeaturesCarouselProps {
  features: Feature[];
  autoplay?: boolean;
  interval?: number;
}
