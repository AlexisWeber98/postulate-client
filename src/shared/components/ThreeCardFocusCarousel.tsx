import React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useIsMobile } from "./useIsMobile"

export interface FeatureCard {
  icon: React.ReactNode
  title: string
  desc: string
}

interface ThreeCardFocusCarouselProps {
  features: FeatureCard[]
  cardClassName?: string
  cardWidth?: number
  cardHeight?: number
}

const DEFAULT_CARD_WIDTH = 320 // px (w-80)
const DEFAULT_CARD_HEIGHT = 320


const ThreeCardFocusCarousel: React.FC<ThreeCardFocusCarouselProps> = ({ features, cardClassName, cardWidth = DEFAULT_CARD_WIDTH, cardHeight = DEFAULT_CARD_HEIGHT }) => {
  const [centerIdx, setCenterIdx] = React.useState(1)
  const total = features.length
  const isMobile = useIsMobile()

  // Navegación manual
  const handlePrev = () => {
    setCenterIdx((prev) => (prev - 1 + total) % total)
  }
  const handleNext = () => {
    setCenterIdx((prev) => (prev + 1) % total)
  }

  // Para slide real: renderizar todas las cards en fila y mover el wrapper
  // Solo mostrar 3 en desktop, 1 en mobile
  const getVisibleCards = () => {
    if (isMobile) {
      return [features[centerIdx]]
    }
    // Desktop: 3 cards, centrada
    const left = (centerIdx - 1 + total) % total
    const right = (centerIdx + 1) % total
    return [features[left], features[centerIdx], features[right]]
  }
  const visibleCards = getVisibleCards()

  // El contenedor tiene width = 3*cardWidth + 2*GAP
  // Para centrar la card del medio: el wrapper debe tener justify-center y gap, y no usar translateX
  // Así, las 3 cards siempre quedan perfectamente alineadas

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
        {/* Flecha izquierda */}
        <button
          onClick={handlePrev}
          className="z-20 w-20 h-20 flex items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-[0_8px_32px_rgba(80,112,255,0.25)] absolute -left-12 top-1/2 -translate-y-1/2 hidden md:flex"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-9 h-9 text-blue-500" />
        </button>
        {/* Carrusel visible */}
        <div
          className="overflow-visible w-full flex justify-center"
          style={{ maxWidth: isMobile ? cardWidth : '100vw' }}
        >
          <div
            className={`flex gap-8 transition-all duration-500 ease-in-out justify-center w-full`}
          >
            {visibleCards.map((feature, pos) => {
              // pos: 0=izq, 1=centro, 2=der
              const base = "transition-all duration-500 flex flex-col items-center text-center min-w-0"
              const isCenter = pos === 1
              const styles =
                isCenter
                  ? `scale-115 opacity-100 blur-0 z-10 shadow-2xl border-2 border-blue-300 ${cardClassName ?? "bg-white/80"}`
                  : `scale-100 opacity-50 blur-sm z-0 border border-white/30 ${cardClassName ?? "bg-white/60"}`
              const sizeStyle = isCenter
                ? { width: cardWidth, minWidth: cardWidth, height: cardHeight, minHeight: cardHeight }
                : { width: cardWidth * 0.8, minWidth: cardWidth * 0.8, height: cardHeight * 0.8, minHeight: cardHeight * 0.8 }
              return (
                <div
                  key={pos + '-' + feature.title}
                  className={`${base} ${styles} rounded-2xl p-8 overflow-y-auto`}
                  style={{ pointerEvents: isCenter ? 'auto' : 'none', ...sizeStyle }}
                >
                  {feature.icon}
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 break-words">{feature.title}</h3>
                  <p className="text-white text-base md:text-base break-words">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
        {/* Flecha derecha */}
        <button
          onClick={handleNext}
          className="z-20 w-20 h-20 flex items-center justify-center rounded-full bg-white/95 hover:bg-white shadow-[0_8px_32px_rgba(80,112,255,0.25)] absolute -right-12 top-1/2 -translate-y-1/2 hidden md:flex"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-9 h-9 text-blue-500" />
        </button>
      </div>
      {/* Navegación mobile */}
      <div className="flex md:hidden gap-4 mt-4">
        <button onClick={handlePrev} className="p-2 rounded-full bg-white/80 hover:bg-white shadow" aria-label="Anterior">
          <ChevronLeft className="w-5 h-5 text-blue-500" />
        </button>
        <button onClick={handleNext} className="p-2 rounded-full bg-white/80 hover:bg-white shadow" aria-label="Siguiente">
          <ChevronRight className="w-5 h-5 text-blue-500" />
        </button>
      </div>
    </div>
  )
}

export default ThreeCardFocusCarousel
