"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap, Award, Gift } from "lucide-react"

interface RewardConfirmationProps {
  onRestart: () => void
}

export const RewardConfirmation = ({ onRestart }: RewardConfirmationProps) => {
  useEffect(() => {
    // Trigger confetti effect when component mounts
    const confettiScript = document.createElement("script")
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
    confettiScript.async = true
    document.body.appendChild(confettiScript)

    confettiScript.onload = () => {
      // @ts-ignore
      window.confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })
    }

    return () => {
      document.body.removeChild(confettiScript)
    }
  }, [])

  return (
    <div className="bg-indigo-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-white">
      <div className="flex flex-col items-center justify-center mb-8">
        <div className="text-yellow-400 mb-4">
          <Award className="w-20 h-20" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-lime-400 text-center mb-2">Congratulations!</h2>
        <p className="text-xl text-center">You may have a chance to win $$$ and you have a reward!</p>
      </div>

      <div className="bg-indigo-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-center text-lime-300">Your idea has been submitted!</h3>
        <p className="text-lg text-center mb-6">
          The Buzzly team will review your submission and notify you by email if you're selected as a winner.
        </p>

        <div className="flex items-center justify-center space-x-2 mb-4">
          <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse"></div>
          <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse delay-100"></div>
          <div className="w-3 h-3 bg-lime-400 rounded-full animate-pulse delay-200"></div>
        </div>

        <p className="text-center text-lime-300">Winners announced within 2 weeks</p>
      </div>

      <div className="bg-indigo-900 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center justify-center">
          <Gift className="mr-2 text-yellow-400" /> Your Micro Rewards
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-indigo-800 p-4 rounded-lg border border-lime-400 flex flex-col items-center">
            <Sparkles className="text-lime-400 w-10 h-10 mb-2" />
            <h4 className="font-bold text-lg mb-2">Mini Awards</h4>
            <p className="text-center">Collect your Buzzly badge after completion!</p>
          </div>

          <div className="bg-indigo-800 p-4 rounded-lg border border-yellow-400 flex flex-col items-center">
            <Zap className="text-yellow-400 w-10 h-10 mb-2" />
            <h4 className="font-bold text-lg mb-2">Personality Card</h4>
            <p className="text-center">Get your Buzzly Personality Card after completion!</p>
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onRestart}
          className="bg-lime-400 text-indigo-900 hover:bg-lime-300 px-8 py-6 text-xl font-bold"
        >
          Play Again <Zap className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
