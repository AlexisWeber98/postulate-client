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
  autoplay?: boolean
  interval?: number
}

const ThreeCardFocusCarousel: React.FC<ThreeCardFocusCarouselProps> = ({ features, autoplay = true, interval = 3500 }) => {
  const [centerIdx, setCenterIdx] = React.useState(1)
  const total = features.length
  const isMobile = useIsMobile()

  // Autoplay
  React.useEffect(() => {
    if (!autoplay) return
    const timer = setInterval(() => {
      setCenterIdx((prev) => (prev + 1) % total)
    }, interval)
    return () => clearInterval(timer)
  }, [autoplay, interval, total])

  // Helpers para obtener los índices de las cards a mostrar
  const getIndices = () => {
    if (total < 3) {
      // Si hay menos de 3, rellenar con nulls
      const arr = [centerIdx - 1, centerIdx, centerIdx + 1].map(i => (i + total) % total)
      return arr
    }
    // Normal: 3 cards
    return [
      (centerIdx - 1 + total) % total,
      centerIdx % total,
      (centerIdx + 1) % total,
    ]
  }
  const indices = getIndices()

  // Navegación manual
  const goPrev = () => setCenterIdx((prev) => (prev - 1 + total) % total)
  const goNext = () => setCenterIdx((prev) => (prev + 1) % total)

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative flex items-center justify-center w-full max-w-4xl mx-auto">
        {/* Flecha izquierda */}
        <button
          onClick={goPrev}
          className="z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow absolute left-0 top-1/2 -translate-y-1/2 hidden md:block"
          aria-label="Anterior"
        >
          <ChevronLeft className="w-6 h-6 text-blue-500" />
        </button>
        {/* Cards */}
        <div className="flex w-full justify-center gap-2 md:gap-8">
          {indices.map((idx, pos) => {
            const feature = features[idx]
            // Mobile: solo la central
            if (isMobile && pos !== 1) return null
            // Estilos dinámicos
            const base = "transition-all duration-500 flex-1 flex flex-col items-center text-center min-w-0"
            const styles =
              pos === 1
                ? "scale-110 opacity-100 blur-0 z-10 bg-white/80 shadow-2xl border-2 border-blue-300"
                : "scale-95 opacity-50 blur-sm z-0 bg-white/60 border border-white/30"
            return (
              <div
                key={idx}
                className={`${base} ${styles} rounded-2xl p-8 h-full min-h-[260px] max-w-xs md:max-w-sm`}
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
        {/* Flecha derecha */}
        <button
          onClick={goNext}
          className="z-10 p-2 rounded-full bg-white/80 hover:bg-white shadow absolute right-0 top-1/2 -translate-y-1/2 hidden md:block"
          aria-label="Siguiente"
        >
          <ChevronRight className="w-6 h-6 text-blue-500" />
        </button>
      </div>
      {/* Navegación mobile */}
      <div className="flex md:hidden gap-4 mt-4">
        <button onClick={goPrev} className="p-2 rounded-full bg-white/80 hover:bg-white shadow" aria-label="Anterior">
          <ChevronLeft className="w-5 h-5 text-blue-500" />
        </button>
        <button onClick={goNext} className="p-2 rounded-full bg-white/80 hover:bg-white shadow" aria-label="Siguiente">
          <ChevronRight className="w-5 h-5 text-blue-500" />
        </button>
      </div>
    </div>
  )
}

export default ThreeCardFocusCarousel
