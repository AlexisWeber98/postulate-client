// Adaptación del Carousel de shadcn/ui para React puro
import * as React from "react"
import useEmblaCarousel, { type UseEmblaCarouselType } from "embla-carousel-react"
import type { EmblaOptionsType, EmblaPluginType } from "embla-carousel"

import { cn } from "../../lib/utils"

const CarouselContext = React.createContext<{
  embla?: UseEmblaCarouselType[1]
} | null>(null)

export function useCarousel() {
  const context = React.useContext(CarouselContext)
  if (!context) {
    throw new Error("useCarousel debe usarse dentro de <Carousel />")
  }
  return context
}

export interface CarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  opts?: EmblaOptionsType
  orientation?: "horizontal" | "vertical"
  setApi?: (api: UseEmblaCarouselType[1]) => void
  plugins?: EmblaPluginType[]
}

const Carousel = React.forwardRef<HTMLDivElement, CarouselProps>(
  (
    {
      orientation = "horizontal",
      opts,
      setApi,
      plugins,
      className,
      children,
      ...props
    },
    ref
  ) => {
    const [emblaRef, emblaApi] = useEmblaCarousel({
      ...opts,
      axis: orientation === "vertical" ? "y" : "x",
    }, plugins)

    React.useEffect(() => {
      if (!setApi) return
      setApi(emblaApi)
    }, [emblaApi, setApi])

    return (
      <CarouselContext.Provider value={{ embla: emblaApi }}>
        <div
          ref={ref}
          className={cn("relative", className)}
          {...props}
        >
          <div ref={emblaRef} className="overflow-hidden">
            {children}
          </div>
        </div>
      </CarouselContext.Provider>
    )
  }
)
Carousel.displayName = "Carousel"

export { Carousel }

// CarouselContent
export const CarouselContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex",
        className
      )}
      {...props}
    />
  )
})
CarouselContent.displayName = "CarouselContent"

// CarouselItem
export const CarouselItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("relative min-w-0 flex-[0_0_100%]", className)}
      {...props}
    />
  )
})
CarouselItem.displayName = "CarouselItem"

// CarouselPrevious
export const CarouselPrevious = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { embla } = useCarousel()
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white focus:outline-none",
        className
      )}
      onClick={() => embla?.scrollPrev()}
      {...props}
    >
      <span className="sr-only">Anterior</span>
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M15 18l-6-6 6-6" /></svg>
    </button>
  )
})
CarouselPrevious.displayName = "CarouselPrevious"

// CarouselNext
export const CarouselNext = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { embla } = useCarousel()
  return (
    <button
      ref={ref}
      type="button"
      className={cn(
        "absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/80 p-2 shadow hover:bg-white focus:outline-none",
        className
      )}
      onClick={() => embla?.scrollNext()}
      {...props}
    >
      <span className="sr-only">Siguiente</span>
      <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M9 6l6 6-6 6" /></svg>
    </button>
  )
})
CarouselNext.displayName = "CarouselNext"
