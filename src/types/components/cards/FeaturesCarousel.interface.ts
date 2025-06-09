

export interface Feature {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
}

export interface FeaturesCarouselProps {
  features: Feature[];
  autoplay?: boolean;
  interval?: number;
}
