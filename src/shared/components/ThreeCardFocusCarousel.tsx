"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, FileText, BarChart2, Calendar, Users, Brain } from "lucide-react"
import { motion, useMotionValue, useTransform } from "framer-motion"

interface Feature {
  id: number
  icon: React.ReactNode
  title: string
  description: string
}

export default function FeaturesCarousel() {
  const [activeIndex, setActiveIndex] = useState(1)
  const [autoplay, setAutoplay] = useState(true)
  const [/* direction */, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const features: Feature[] = [
    {
      id: 0,
      icon: <FileText className="w-12 h-12 text-white" />,
      title: "Resume Builder",
      description: "Create professional resumes tailored for your applications",
    },
    {
      id: 1,
      icon: <BarChart2 className="w-12 h-12 text-white" />,
      title: "Application Tracking",
      description: "Keep an organized record of all your applications",
    },
    {
      id: 2,
      icon: <Calendar className="w-12 h-12 text-white" />,
      title: "Interview Scheduler",
      description: "Schedule and prepare for upcoming interviews",
    },
    {
      id: 3,
      icon: <Users className="w-12 h-12 text-white" />,
      title: "Networking Tools",
      description: "Connect with professionals in your industry",
    },
    {
      id: 4,
      icon: <Brain className="w-12 h-12 text-white" />,
      title: "Skill Assessment",
      description: "Evaluate and improve your professional skills",
    },
  ]

  // Animation variants for rotating cards
  const cardVariants = {
    leftPosition: {
      x: -280,
      scale: 0.85,
      opacity: 0.7,
      filter: "blur(1.5px)",
      zIndex: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      },
    },
    centerPosition: {
      x: 0,
      scale: 1,
      opacity: 1,
      filter: "blur(0px)",
      zIndex: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      },
    },
    rightPosition: {
      x: 280,
      scale: 0.85,
      opacity: 0.7,
      filter: "blur(1.5px)",
      zIndex: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
        duration: 0.6,
      },
    },
    // Temporary positions for smooth rotation
    exitLeft: {
      x: -500,
      scale: 0.7,
      opacity: 0,
      filter: "blur(3px)",
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.4,
      },
    },
    exitRight: {
      x: 500,
      scale: 0.7,
      opacity: 0,
      filter: "blur(3px)",
      zIndex: 0,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 30,
        duration: 0.4,
      },
    },
    enterLeft: {
      x: -500,
      scale: 0.7,
      opacity: 0,
      filter: "blur(3px)",
      zIndex: 0,
    },
    enterRight: {
      x: 500,
      scale: 0.7,
      opacity: 0,
      filter: "blur(3px)",
      zIndex: 0,
    },
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }


  const buttonVariants = {
    hidden: {
      scale: 0,
      opacity: 0,
    },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 15,
      },
    },
    hover: {
      scale: 1.1,
      boxShadow: "0 10px 25px rgba(90, 123, 207, 0.3)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
    tap: {
      scale: 0.95,
    },
  }

  const indicatorVariants = {
    inactive: {
      scale: 1,
      backgroundColor: "#233d85",
    },
    active: {
      scale: 1.2,
      backgroundColor: "#5a7bcf",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
      },
    },
  }

  // Auto-rotate carousel
  useEffect(() => {
    if (!autoplay || isHovered) return

    const interval = setInterval(() => {
      setDirection(1)
      setActiveIndex((prev) => (prev + 1) % features.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [autoplay, isHovered, features.length])

  const handlePrev = () => {
    setAutoplay(false)
    setDirection(-1)
    setActiveIndex((prev) => (prev - 1 + features.length) % features.length)
  }

  const handleNext = () => {
    setAutoplay(false)
    setDirection(1)
    setActiveIndex((prev) => (prev + 1) % features.length)
  }

  const handleIndicatorClick = (index: number) => {
    setAutoplay(false)
    setDirection(index > activeIndex ? 1 : -1)
    setActiveIndex(index)
  }

  // Get visible cards
  const getVisibleFeatures = () => {
    const prev = (activeIndex - 1 + features.length) % features.length
    const next = (activeIndex + 1) % features.length
    return { prev, current: activeIndex, next }
  }

  const { prev, current, next } = getVisibleFeatures()

  // Mouse parallax effect
  const rotateX = useTransform(mouseY, [-300, 300], [5, -5])
  const rotateY = useTransform(mouseX, [-300, 300], [-5, 5])

  // Get card position based on its role
  const getCardPosition = (cardIndex: number) => {
    if (cardIndex === current) return "centerPosition"
    if (cardIndex === prev) return "leftPosition"
    if (cardIndex === next) return "rightPosition"
    return "exitLeft" // Hidden cards
  }

  return (
    <motion.div
      className="w-full py-16 px-4  overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set(e.clientX - rect.left - rect.width / 2)
        mouseY.set(e.clientY - rect.top - rect.height / 2)
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="max-w-6xl mx-auto">


        <div className="relative flex items-center justify-center min-h-[350px]">
          {/* Navigation buttons */}
          <motion.button
            onClick={handlePrev}
            className="absolute left-4 z-30 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-2xl text-[#1a2f69]"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Previous feature"
          >
            <ChevronLeft className="w-6 h-6" />
          </motion.button>

          {/* Cards container */}
          <div className="relative w-full max-w-4xl flex items-center justify-center">
            {/* Render all cards with their positions */}
            {features.map((feature, index) => {
              const position = getCardPosition(index)
              const isCenter = index === current

              return (
                <motion.div
                  key={feature.id}
                  className="absolute w-96 p-10 rounded-3xl text-white shadow-2xl cursor-pointer bg-gradient-to-r from-blue-500 to-violet-500 flex items-center justify-center text-center min-h-[340px] h-full"
                  style={{
                    rotateX: isCenter ? rotateX : 0,
                    rotateY: isCenter ? rotateY : 0,
                  }}
                  variants={cardVariants}
                  animate={position}
                  onClick={() => {
                    if (index === prev) handlePrev()
                    if (index === next) handleNext()
                  }}
                  whileHover={
                    !isCenter
                      ? {
                          filter: "blur(0.5px)",
                          opacity: 0.85,
                          scale: 0.9,
                          transition: { duration: 0.2 },
                        }
                      : {
                          scale: 1.05,
                          boxShadow: "0 25px 50px rgba(90, 123, 207, 0.4)",
                          transition: {
                            type: "spring",
                            stiffness: 300,
                            damping: 20,
                          },
                        }
                  }
                >
                  <div className="flex flex-col items-center justify-center text-center w-full h-full">
                    <motion.div
                      className="w-20 h-20 flex items-center justify-center bg-white/20 rounded-full mb-6 backdrop-blur-sm"
                      whileHover={
                        isCenter
                          ? {
                              scale: 1.1,
                              rotate: 5,
                              transition: { duration: 0.2 },
                            }
                          : {}
                      }
                    >
                      {feature.icon}
                    </motion.div>
                    <h3 className="text-2xl font-bold mb-4 w-full text-center">{feature.title}</h3>
                    <p className="text-base leading-relaxed w-full text-center">{feature.description}</p>
                  </div>
                </motion.div>
              )
            })}
          </div>

          <motion.button
            onClick={handleNext}
            className="absolute right-4 z-30 w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-2xl text-[#1a2f69]"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
            aria-label="Next feature"
          >
            <ChevronRight className="w-6 h-6" />
          </motion.button>
        </div>

        {/* Enhanced Indicators */}
        <motion.div className="flex justify-center mt-12 gap-3" variants={containerVariants}>
          {features.map((_, index) => (
            <motion.button
              key={index}
              onClick={() => handleIndicatorClick(index)}
              className="relative w-4 h-4 flex items-center justify-center"
              variants={indicatorVariants}
              animate={index === activeIndex ? "active" : "inactive"}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              aria-label={`Go to feature ${index + 1}`}
            >
              <div
                className={`w-4 h-4 rounded-full aspect-square transition-all duration-300 ${
                  index === activeIndex ? "bg-[#5a7bcf]" : "bg-[#233d85]"
                }`}
              />
              {index === activeIndex && (
                <motion.div
                  className="absolute inset-0 w-4 h-4 rounded-full aspect-square bg-[#5a7bcf] opacity-30"
                  initial={{ scale: 1 }}
                  animate={{ scale: 2 }}
                  transition={{
                    repeat: Number.POSITIVE_INFINITY,
                    duration: 2,
                    ease: "easeOut",
                  }}
                />
              )}
            </motion.button>
          ))}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-full max-w-md mx-auto mt-8 h-1 bg-[#233d85] rounded-full overflow-hidden"
          variants={containerVariants}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-[#5a7bcf] to-[#ff7eb3] rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${((activeIndex + 1) / features.length) * 100}%` }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
            }}
          />
        </motion.div>
      </div>
    </motion.div>
  )
}
