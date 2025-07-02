import * as React from "react"
import type { UseEmblaCarouselType } from "embla-carousel-react"

export const CarouselContext = React.createContext<{
  embla?: UseEmblaCarouselType[1]
} | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel must be used within a <Carousel /> component")
  }
  return context
}
