import React from "react"
import { CheckCircle2, BarChart2, Search } from "lucide-react"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../../../components/ui/carousel"

interface Feature {
  icon: React.ReactNode
  title: string
  desc: string
}

interface FeaturesCarouselProps {
  features: Feature[]
  autoplay?: boolean
  interval?: number
}

const FeaturesCarousel: React.FC<FeaturesCarouselProps> = ({ features, autoplay = true, interval = 3500 }) => {
  const [emblaApi, setEmblaApi] = React.useState<any>(null)
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
    <section className="py-16">
      <div className="max-w-5xl mx-auto px-2">
        <Carousel setApi={setEmblaApi} opts={{ loop: true, align: 'start' }}>
          <CarouselContent className="-ml-2 md:-ml-4">
            {features.map((feature, idx) => (
              <CarouselItem
                key={idx}
                className="pl-2 md:pl-4 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl shadow-xl border border-white/30 flex flex-col items-center text-center h-full min-h-[260px]">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full mb-4 bg-gradient-to-r from-blue-500 to-violet-500">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
                  <p className="text-gray-700 text-base md:text-base">{feature.desc}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </section>
  )
}

export default FeaturesCarousel
