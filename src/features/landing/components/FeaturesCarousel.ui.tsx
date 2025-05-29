import React from "react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../../../components/ui/carousel"
import type { EmblaCarouselType } from 'embla-carousel'
import { useIsMobile } from "../../../shared/components/useIsMobile"
import type { FeaturesCarouselProps, Feature } from "../../../interfaces/components/cards"

const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({ features, autoplay = true, interval = 3500 }) => {
  const [emblaApi, setEmblaApi] = React.useState<EmblaCarouselType | undefined>(undefined)
  const isMobile = useIsMobile()

  React.useEffect(() => {
    if (!autoplay || !emblaApi) return
    let timer: NodeJS.Timeout
    const play = () => {
      timer = setInterval(() => {
        if (!emblaApi) return
        if (emblaApi.canScrollNext()) {
          emblaApi.scrollNext()
        } else {
          emblaApi.scrollTo(0)
        }
      }, interval)
    }
    play()
    return () => clearInterval(timer)
  }, [autoplay, emblaApi, interval])

  return (
    <section className="py-8 md:py-16">
      <div className="max-w-5xl mx-auto px-4 md:px-8">
        <Carousel
          setApi={setEmblaApi}
          opts={{
            loop: true,
            align: 'start',
            slidesToScroll: isMobile ? 1 : 2,
            containScroll: 'trimSnaps'
          }}
        >
          <CarouselContent className="-ml-2 md:-ml-4">
            {features.map((feature: Feature, idx: number) => (
              <CarouselItem
                key={idx}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-white/60 backdrop-blur-md p-6 md:p-8 rounded-2xl shadow-xl border border-white/30 flex flex-col items-center text-center h-full min-h-[220px] md:min-h-[260px] relative hover:z-20">
                  <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-full mb-3 md:mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                    <feature.icon className="w-5 h-5 md:w-6 md:h-6 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg lg:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-sm md:text-base text-gray-700">{feature.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="flex justify-center gap-4 mt-6 md:mt-8">
            <CarouselPrevious className="static md:absolute md:left-0 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2" />
            <CarouselNext className="static md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:translate-x-1/2" />
          </div>
        </Carousel>
      </div>
    </section>
  )
}

export default FeaturesCarousel
