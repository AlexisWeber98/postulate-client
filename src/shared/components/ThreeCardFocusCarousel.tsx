import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIsMobile } from "./useIsMobile"
import { ThreeCardFocusCarouselProps } from "../../interfaces/components/cards/ThreeCardFocusCarouselProps.interface"

const DEFAULT_CARD_WIDTH = 320 // px (w-80)
const DEFAULT_CARD_HEIGHT = 320

const ThreeCardFocusCarousel: React.FC<ThreeCardFocusCarouselProps> = ({
  features,
  cardClassName,
  cardWidth = DEFAULT_CARD_WIDTH,
  cardHeight = DEFAULT_CARD_HEIGHT
}) => {
  const [centerIdx, setCenterIdx] = React.useState(1)
  const total = features.length
  const isMobile = useIsMobile()

  const handlePrev = () => {
    setCenterIdx((prev) => (prev - 1 + total) % total)
  }

  const handleNext = () => {
    setCenterIdx((prev) => (prev + 1) % total)
  }

  const getVisibleCards = () => {
    if (isMobile) {
      return [features[centerIdx]]
    }
    const left = (centerIdx - 1 + total) % total
    const right = (centerIdx + 1) % total
    return [features[left], features[centerIdx], features[right]]
  }

  const visibleCards = getVisibleCards()

  return (
    <div className="w-full flex flex-col items-center px-4 sm:px-6 md:px-8">
      <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto mb-8">
        <button
          onClick={handlePrev}
          className="z-20 w-12 h-12 md:w-20 md:h-20 items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-[0_8px_32px_rgba(80,112,255,0.25)] absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 hidden lg:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 md:w-9 md:h-9 text-blue-500" />
        </button>

        <div
          className="overflow-visible w-full flex justify-center"
          style={{ maxWidth: isMobile ? cardWidth * 0.9 : '100vw' }}
        >
          <div className="flex gap-4 md:gap-8 transition-all duration-500 ease-in-out justify-center w-full">
            {visibleCards.map((feature, pos) => {
              const base = "transition-all duration-500 flex flex-col items-center text-center min-w-0"
              const isCenter = isMobile ? true : pos === 1
              const styles = isCenter
                ? `scale-110 md:scale-115 opacity-100 blur-0 z-10 shadow-md ${cardClassName ?? "bg-white/10"}`
                : `scale-95 md:scale-100 opacity-50 blur-sm z-0 ${cardClassName ?? "bg-transparent"}`
              const sizeStyle = isCenter
                ? {
                    width: isMobile ? cardWidth : cardWidth,
                    minWidth: isMobile ? cardWidth : cardWidth,
                    height: isMobile ? cardHeight : cardHeight,
                    minHeight: isMobile ? cardHeight : cardHeight
                  }
                : {
                    width: isMobile ? cardWidth * 0.7 : cardWidth * 0.8,
                    minWidth: isMobile ? cardWidth * 0.7 : cardWidth * 0.8,
                    height: isMobile ? cardHeight * 0.7 : cardHeight * 0.8,
                    minHeight: isMobile ? cardHeight * 0.7 : cardHeight * 0.8
                  }

              return (
                <div
                  key={pos + '-' + feature.title}
                  className={`${base} ${styles} rounded-2xl p-4 md:p-8 overflow-y-auto`}
                  style={{ pointerEvents: isCenter ? 'auto' : 'none', ...sizeStyle }}
                >
                  {feature.icon}
                  <h3 className="text-base md:text-xl font-semibold text-white mb-2 break-words">{feature.title}</h3>
                  <p className="text-white text-sm md:text-base break-words">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>

        <button
          onClick={handleNext}
          className="z-20 w-12 h-12 md:w-20 md:h-20 items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-[0_8px_32px_rgba(80,112,255,0.25)] absolute -right-6 md:-right-12 top-1/2 -translate-y-1/2 hidden lg:flex"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 md:w-9 md:h-9 text-blue-500" />
        </button>
      </div>

      <div className="flex lg:hidden gap-8 md:gap-12 mt-10">
        <button onClick={handlePrev} className="p-3 rounded-full bg-white/80 hover:bg-white shadow" aria-label="Anterior">
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        <button onClick={handleNext} className="p-3 rounded-full bg-white/80 hover:bg-white shadow" aria-label="Siguiente">
          <ChevronRight className="w-6 h-6 text-blue-500" />
        </button>
      </div>
    </div>
  )
}

export default ThreeCardFocusCarousel
