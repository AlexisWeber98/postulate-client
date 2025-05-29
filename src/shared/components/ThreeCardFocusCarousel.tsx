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

  // Devuelve las 3 cards visibles (izquierda, centro, derecha)
  const getVisibleCards = () => {
    if (isMobile) {
      return [features[centerIdx]]
    }
    const left = (centerIdx - 1 + total) % total
    const right = (centerIdx + 1) % total
    return [features[left], features[centerIdx], features[right]]
  }

  const visibleCards = getVisibleCards()

  // Mobile: solo una card visible
  if (isMobile) {
    const feature = features[centerIdx]
    return (
      <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
        <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto mb-8">
          <button
            onClick={handlePrev}
            className="z-20 w-12 h-12 md:w-20 md:h-20 items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-[0_8px_32px_rgba(80,112,255,0.25)] absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 hidden lg:flex"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 md:w-9 md:h-9 text-blue-500" />
          </button>
          <div className="overflow-visible w-full flex justify-center items-center">
            <div
              className={`transition-transform transition-opacity flex flex-col items-center justify-center text-center min-w-0 scale-110 opacity-100 blur-0 z-10 ${cardClassName ?? "bg-white/10"} rounded-2xl p-4 md:p-8`}
              style={{
                width: '90vw',
                minWidth: '90vw',
                height: cardHeight,
                minHeight: cardHeight,
                transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.7s cubic-bezier(0.4,0,0.2,1)',
                willChange: 'transform, opacity, filter'
              }}
            >
              {feature.icon}
              <h3 className="text-base md:text-xl font-semibold text-white mb-2 break-words w-full text-center">{feature.title}</h3>
              <p className="text-white text-sm md:text-base break-words w-full text-center">{feature.desc}</p>
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
        <div className="flex lg:hidden gap-8 md:gap-12 mt-10 justify-center items-center">
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

  // Desktop: 3 cards visibles, foco dinámico
  return (
    <div className="w-full flex flex-col items-center justify-center px-4 sm:px-6 md:px-8">
      <div className="relative flex flex-col items-center justify-center w-full max-w-4xl mx-auto mb-8">
        <button
          onClick={handlePrev}
          className="z-20 w-12 h-12 md:w-20 md:h-20 items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-[0_8px_32px_rgba(80,112,255,0.25)] absolute -left-6 md:-left-12 top-1/2 -translate-y-1/2 hidden lg:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 md:w-9 md:h-9 text-blue-500" />
        </button>
        <div
          className="overflow-visible w-full flex justify-center items-center"
          style={{ maxWidth: '100vw' }}
        >
          <div className="flex gap-4 md:gap-8 transition-all duration-500 ease-in-out justify-center items-center w-full">
            {visibleCards.map((feature, pos) => {
              // Solo la card central tiene foco
              const isCenter = pos === 1
              const styles = isCenter
                ? `scale-110 opacity-100 blur-0 z-10 ${cardClassName ?? "bg-white/10"}`
                : `scale-95 opacity-50 blur-sm z-0 ${cardClassName ?? "bg-transparent"}`
              const sizeStyle = isCenter
                ? {
                    width: cardWidth,
                    minWidth: cardWidth,
                    height: cardHeight,
                    minHeight: cardHeight
                  }
                : {
                    width: cardWidth * 0.8,
                    minWidth: cardWidth * 0.8,
                    height: cardHeight * 0.8,
                    minHeight: cardHeight * 0.8
                  }
              return (
                <div
                  key={pos + '-' + feature.title}
                  className={`transition-transform transition-opacity flex flex-col items-center justify-center text-center min-w-0 rounded-2xl p-4 md:p-8 overflow-y-auto ${styles}`}
                  style={{
                    pointerEvents: isCenter ? 'auto' : 'none',
                    ...sizeStyle,
                    transition: 'transform 0.7s cubic-bezier(0.4,0,0.2,1), opacity 0.7s cubic-bezier(0.4,0,0.2,1), filter 0.7s cubic-bezier(0.4,0,0.2,1)',
                    willChange: 'transform, opacity, filter'
                  }}
                >
                  {feature.icon}
                  <h3 className="text-base md:text-xl font-semibold text-white mb-2 break-words w-full text-center">{feature.title}</h3>
                  <p className="text-white text-sm md:text-base break-words w-full text-center">{feature.desc}</p>
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
      <div className="flex lg:hidden gap-8 md:gap-12 mt-10 justify-center items-center">
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
