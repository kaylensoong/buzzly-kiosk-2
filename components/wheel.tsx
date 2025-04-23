"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { Sparkles, Zap, ArrowDown } from "lucide-react"
import type { Theme } from "@/components/buzzly-game"

interface WheelProps {
  onThemeSelected: (theme: Theme) => void
}

const themes: Theme[] = ["Food", "Water", "Energy", "Transportation", "Waste", "Buildings", "Nature", "Community"]

const themeColors = {
  Food: "#facc15", // yellow-400
  Water: "#3b82f6", // blue-500
  Energy: "#84cc16", // lime-500
  Transportation: "#8b5cf6", // purple-500
  Waste: "#f97316", // orange-500
  Buildings: "#ef4444", // red-500
  Nature: "#16a34a", // green-600
  Community: "#ec4899", // pink-500
}

export const Wheel = ({ onThemeSelected }: WheelProps) => {
  const [rotation, setRotation] = useState(0)
  const [isSpinning, setIsSpinning] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Draw the wheel on canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 10

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw wheel segments
    const segmentAngle = (2 * Math.PI) / themes.length

    themes.forEach((theme, index) => {
      const startAngle = index * segmentAngle
      const endAngle = (index + 1) * segmentAngle

      // Draw segment
      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      // Fill segment with theme color
      ctx.fillStyle = themeColors[theme]
      ctx.fill()

      // Add segment border
      ctx.lineWidth = 2
      ctx.strokeStyle = "#ffffff"
      ctx.stroke()

      // Add theme text
      const textAngle = startAngle + segmentAngle / 2
      const textX = centerX + radius * 0.75 * Math.cos(textAngle)
      const textY = centerY + radius * 0.75 * Math.sin(textAngle)

      ctx.save()
      ctx.translate(textX, textY)
      ctx.rotate(textAngle + Math.PI / 2)
      ctx.fillStyle = "#ffffff"
      ctx.font = "bold 16px sans-serif"
      ctx.textAlign = "center"
      ctx.fillText(theme, 0, 0)
      ctx.restore()
    })

    // Draw center circle for logo
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius * 0.3, 0, 2 * Math.PI)
    ctx.fillStyle = "#4338ca" // indigo-700
    ctx.fill()
    ctx.lineWidth = 4
    ctx.strokeStyle = "#a3e635" // lime-400
    ctx.stroke()
  }, [])

  // Apply rotation to canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    canvas.style.transform = `rotate(${rotation}deg)`
  }, [rotation])

  const spinWheel = () => {
    if (isSpinning) return

    setIsSpinning(true)

    // Random number of full rotations (3-5) plus a random segment
    const spinDegrees = 1080 + Math.floor(Math.random() * 720)
    const finalRotation = rotation + spinDegrees
    setRotation(finalRotation)

    // Calculate which theme was selected based on final rotation
    setTimeout(() => {
      const normalizedDegree = finalRotation % 360
      const segmentSize = 360 / themes.length
      // We need to adjust the index calculation because of how the wheel is drawn
      const selectedIndex = Math.floor(((360 - normalizedDegree) % 360) / segmentSize)
      const selected = themes[selectedIndex]
      setSelectedTheme(selected)

      setTimeout(() => {
        onThemeSelected(selected)
      }, 1000)
    }, 5000) // Match this with the CSS transition duration
  }

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {/* City skyline background - MADE MORE VISIBLE */}
      <div className="fixed inset-0 overflow-hidden z-0">
        {/* Buzzly pattern overlay */}
        <div className="absolute inset-0 bg-indigo-800 opacity-90">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(79, 70, 229, 0.4) 10%, transparent 10%), radial-gradient(circle, rgba(79, 70, 229, 0.4) 10%, transparent 10%)",
              backgroundPosition: "0 0, 50px 50px",
              backgroundSize: "100px 100px",
            }}
          ></div>
        </div>

        {/* City buildings - MUCH MORE VISIBLE NOW */}
        <div className="absolute bottom-0 left-0 right-0 h-64 flex items-end justify-center">
          {/* Tall building 1 */}
          <div className="relative h-64 w-24 bg-indigo-900 mx-1 rounded-t-lg border-t-2 border-l-2 border-r-2 border-lime-400">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="flex justify-center my-2">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="h-2 w-2 mx-1 bg-yellow-400 rounded-full"></div>
                ))}
              </div>
            ))}
          </div>

          {/* Skyscraper */}
          <div className="relative h-80 w-16 bg-indigo-900 mx-1 rounded-t-lg border-t-2 border-l-2 border-r-2 border-lime-400">
            <div className="absolute top-0 left-0 right-0 h-10 bg-yellow-400 rounded-t-lg"></div>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} className="flex justify-center my-2 mt-10">
                <div className="h-1 w-6 bg-yellow-400"></div>
              </div>
            ))}
          </div>

          {/* Wide building */}
          <div className="relative h-40 w-32 bg-indigo-900 mx-1 rounded-t-lg border-t-2 border-l-2 border-r-2 border-lime-400">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex justify-center my-3">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j} className="h-3 w-3 mx-1 bg-yellow-400"></div>
                ))}
              </div>
            ))}
          </div>

          {/* Tall building 2 */}
          <div className="relative h-56 w-20 bg-indigo-900 mx-1 rounded-t-lg border-t-2 border-l-2 border-r-2 border-lime-400">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex justify-center my-2">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="h-2 w-2 mx-1 bg-yellow-400 rounded-full"></div>
                ))}
              </div>
            ))}
          </div>

          {/* Dome building */}
          <div className="relative mx-1">
            <div className="h-20 w-28 rounded-t-full bg-indigo-900 border-t-2 border-l-2 border-r-2 border-lime-400"></div>
            <div className="h-30 w-28 bg-indigo-900 border-l-2 border-r-2 border-lime-400">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="flex justify-center my-2">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-2 w-2 mx-1 bg-yellow-400 rounded-full"></div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Medium building */}
          <div className="relative h-48 w-24 bg-indigo-900 mx-1 rounded-t-lg border-t-2 border-l-2 border-r-2 border-lime-400">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex justify-center my-2">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="h-2 w-4 mx-1 bg-yellow-400"></div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-indigo-800 bg-opacity-90 rounded-xl p-6 md:p-8 w-full max-w-4xl mx-auto relative z-10 border border-indigo-600 shadow-xl">
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-8 text-center uppercase tracking-wider">
          DISCOVER WHICH <span className="text-lime-400">BUZZLY</span> CHALLENGE YOU'LL TACKLE TODAY!
        </h1>

        <div className="bg-indigo-700 p-4 rounded-lg border-2 border-yellow-400 mb-8 text-center">
          <p className="text-yellow-400 font-bold text-lg mb-1">Win Cash Prizes!</p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div className="bg-indigo-800 p-3 rounded-lg">
              <p className="text-yellow-400 font-bold">
                Power Idea: $50 <span className="text-white text-sm">(3x to be claimed)</span>
              </p>
              <p className="text-white text-sm mt-1">
                High-impact, meaningful, and solution-focused. May lead to real-world action or deeper support.
              </p>
            </div>

            <div className="bg-indigo-800 p-3 rounded-lg">
              <p className="text-lime-400 font-bold">
                Awesome Idea: $10 <span className="text-white text-sm">(5x to be claimed)</span>
              </p>
              <p className="text-white text-sm mt-1">Creative, fun, and inspiring. Gets praise and encouragement.</p>
            </div>
          </div>
        </div>

        <div className="flex justify-center mb-4">
          <ArrowDown className="text-lime-400 w-12 h-12 animate-bounce" />
        </div>

        <div className="relative w-[350px] h-[350px] md:w-[500px] md:h-[500px] mx-auto">
          {/* Wheel */}
          <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={spinWheel}>
            <canvas
              ref={canvasRef}
              width={500}
              height={500}
              className={`transition-transform duration-5000 ease-out ${isSpinning ? "cursor-not-allowed" : "cursor-pointer hover:scale-105 transition-transform"}`}
            />

            {/* Pointer */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20">
            <div className="w-0 h-0 border-l-[20px] border-r-[20px] border-t-[40px] border-l-transparent border-r-transparent border-t-lime-400" />
            </div>
          </div>

          {/* Center logo */}
          <div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] md:w-[150px] md:h-[150px] rounded-full bg-indigo-700 flex items-center justify-center z-10 border-4 border-lime-400 cursor-pointer hover:bg-indigo-600 transition-colors"
            onClick={spinWheel}
          >
            <Image
              src="/buzzly_logo.png"
              alt="Buzzly Logo"
              width={80}
              height={80}
              className="w-16 h-16 md:w-20 md:h-20"
            />
            {!isSpinning && (
              <div className="absolute inset-0 flex items-center justify-center bg-indigo-900 bg-opacity-70 rounded-full">
                <p className="text-lime-400 font-bold text-sm text-center">
                  CLICK TO
                  <br />
                  SPIN
                </p>
              </div>
            )}
          </div>
        </div>

        <div className="text-center mt-8">
          {isSpinning ? (
            <div className="inline-flex items-center bg-indigo-700 text-white px-6 py-3 rounded-full">
              <Zap className="animate-pulse mr-2" />
              <span className="font-bold">SPINNING...</span>
            </div>
          ) : (
            <p className="text-lime-300 font-bold text-lg uppercase">CLICK THE WHEEL TO SPIN!</p>
          )}
        </div>
      </div>

      {/* Sparkles decoration - now bigger */}
      <div className="absolute top-10 right-10 z-20">
        <Sparkles className="text-yellow-300 w-12 h-12 animate-pulse" />
      </div>
      <div className="absolute bottom-10 left-10 z-20">
        <Sparkles className="text-lime-300 w-12 h-12 animate-pulse" />
      </div>
      <div className="absolute top-1/3 left-10 z-20">
        <Sparkles className="text-lime-400 w-14 h-14 animate-pulse" />
      </div>
      <div className="absolute bottom-1/3 right-10 z-20">
        <Sparkles className="text-yellow-400 w-14 h-14 animate-pulse" />
      </div>
    </div>
  )
}
