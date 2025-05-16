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
}

const CARD_WIDTH = 320 // px (w-80)
const GAP = 32 // px (gap-8)

const ThreeCardFocusCarousel: React.FC<ThreeCardFocusCarouselProps> = ({ features }) => {
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

  // El contenedor tiene width = 3*CARD_WIDTH + 2*GAP
  // Para centrar la card del medio: el wrapper debe tener justify-center y gap, y no usar translateX
  // Así, las 3 cards siempre quedan perfectamente alineadas

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
        {/* Flecha izquierda */}
        <button
          onClick={handlePrev}
          className="z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow absolute left-0 top-1/2 -translate-y-1/2 hidden md:block"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        {/* Carrusel visible */}
        <div
          className="overflow-hidden w-full flex justify-center"
          style={{ maxWidth: isMobile ? CARD_WIDTH : 3 * CARD_WIDTH + 2 * GAP }}
        >
          <div
            className={`flex gap-8 transition-all duration-500 ease-in-out justify-center w-full`}
          >
            {visibleCards.map((feature, pos) => {
              // pos: 0=izq, 1=centro, 2=der
              const base = "transition-all duration-500 flex flex-col items-center text-center min-w-0"
              const styles =
                pos === 1
                  ? "scale-115 opacity-100 blur-0 z-10 bg-white/80 shadow-2xl border-2 border-blue-300"
                  : "scale-95 opacity-50 blur-sm z-0 bg-white/60 border border-white/30"
              return (
                <div
                  key={pos + '-' + feature.title}
                  className={`${base} ${styles} rounded-2xl p-8 h-full min-h-[260px] w-[320px]`}
                  style={{ pointerEvents: pos === 1 ? 'auto' : 'none' }}
                >
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700 text-base md:text-base">{feature.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
        {/* Flecha derecha */}
        <button
          onClick={handleNext}
          className="z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow absolute right-0 top-1/2 -translate-y-1/2 hidden md:block"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 text-blue-500" />
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
