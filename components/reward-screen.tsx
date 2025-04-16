"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { useEffect } from "react"

interface RewardScreenProps {
  rewardType: "power" | "awesome" | null
  leaderType: string | null
  onReset: () => void
}

export function RewardScreen({ rewardType, leaderType, onReset }: RewardScreenProps) {
  useEffect(() => {
    // Trigger confetti when component mounts
    const duration = 3 * 1000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    function randomInRange(min: number, max: number) {
      return Math.random() * (max - min) + min
    }

    const interval: NodeJS.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      // since particles fall down, start a bit higher than random
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className="w-full max-w-md text-center"
    >
      <Card className="bg-gradient-to-r from-yellow-400 to-yellow-600 text-white shadow-xl">
        <CardContent className="p-8">
          <h2 className="text-3xl font-bold mb-6">Congratulations!</h2>

          <div className="mb-8">
            <div className="text-5xl font-bold mb-2">{rewardType === "power" ? "$50" : "$10"}</div>
            <div className="text-xl">{rewardType === "power" ? "Power Idea Prize" : "Awesome Prize"}</div>
          </div>

          <div className="bg-white/20 p-4 rounded-lg mb-6">
            <p className="font-semibold">You're a {leaderType}!</p>
            <p className="mt-2">
              Your climate solution idea has been submitted to the Buzzly team. We'll contact you soon with details
              about your prize!
            </p>
          </div>

          <div className="mb-6">
            <p className="font-semibold mb-2">What happens next?</p>
            <ul className="text-left list-disc list-inside">
              <li>You'll receive an email from Buzzly within 48 hours</li>
              <li>Your idea may be featured on the Buzzly platform</li>
              <li>You'll be invited to join the Buzzly community</li>
              <li>You'll receive your prize within 2 weeks</li>
            </ul>
          </div>

          <Button
            onClick={onReset}
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-yellow-600"
          >
            Play Again
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
