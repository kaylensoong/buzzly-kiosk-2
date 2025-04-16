"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface WheelOfFortuneProps {
  onThemeSelected: (theme: string) => void
}

const themes = ["Food", "Water", "Energy", "Transportation", "Waste", "Buildings", "Nature", "Community"]

const colors = [
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-red-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-emerald-500",
  "bg-purple-500",
]

export function WheelOfFortune({ onThemeSelected }: WheelOfFortuneProps) {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const wheelRef = useRef<HTMLDivElement>(null)

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // Random number of full rotations (3-5) plus a random segment
    const fullRotations = 3 + Math.floor(Math.random() * 3)
    const segmentAngle = 360 / themes.length
    const randomSegment = Math.floor(Math.random() * themes.length)
    const randomOffset = Math.random() * segmentAngle

    const newRotation = rotation + fullRotations * 360 + randomSegment * segmentAngle + randomOffset
    setRotation(newRotation)

    // Calculate which segment will be at the top when the wheel stops
    const normalizedRotation = newRotation % 360
    const selectedSegment = Math.floor(((360 - normalizedRotation) % 360) / segmentAngle)

    setTimeout(() => {
      setSelectedIndex(selectedSegment)
      setTimeout(() => {
        onThemeSelected(themes[selectedSegment])
      }, 1500)
    }, 5000)
  }

  const segmentAngle = 360 / themes.length

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <h2 className="text-3xl font-bold mb-4 text-center text-purple-800">Spin the Wheel!</h2>
      <p className="text-lg mb-6 text-center">Discover which climate challenge you'll tackle today</p>

      <div className="relative w-80 h-80 md:w-96 md:h-96">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[30px] border-l-transparent border-r-transparent border-t-yellow-500"></div>
        </div>

        {/* Wheel */}
        <motion.div
          ref={wheelRef}
          className="w-full h-full rounded-full overflow-hidden border-8 border-yellow-300 shadow-lg relative"
          animate={{ rotate: rotation }}
          transition={{ duration: 5, ease: "easeOut" }}
          style={{ transformOrigin: "center center" }}
        >
          {themes.map((theme, index) => (
            <div
              key={theme}
              className={`absolute w-1/2 h-1/2 origin-bottom-right ${colors[index]} flex items-center justify-center`}
              style={{
                transform: `rotate(${index * segmentAngle}deg) skew(${90 - segmentAngle}deg)`,
                transformOrigin: "0% 100%",
              }}
            >
              <div
                className="text-white font-bold text-sm rotate-[25deg] ml-12 mt-4"
                style={{ transform: `rotate(${segmentAngle / 2}deg) skew(${90 - segmentAngle}deg)` }}
              >
                {theme}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      <Button
        onClick={spinWheel}
        disabled={isSpinning}
        size="lg"
        className="mt-8 bg-yellow-500 hover:bg-yellow-600 text-xl"
      >
        {isSpinning ? "Spinning..." : "Spin the Wheel!"}
      </Button>

      {selectedIndex !== null && (
        <div className="mt-6 text-xl font-bold text-center text-purple-800 animate-bounce">
          Your theme: {themes[selectedIndex]}!
        </div>
      )}
    </div>
  )
}
