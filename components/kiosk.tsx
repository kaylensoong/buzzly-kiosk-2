"use client"

import { useState } from "react"
import { WheelOfFortune } from "@/components/wheel-of-fortune"
import { Challenge } from "@/components/challenge"
import { ContactForm } from "@/components/contact-form"
import { RewardScreen } from "@/components/reward-screen"
import { Card, CardContent } from "@/components/ui/card"
import { BuzzlyIntro } from "@/components/buzzly-intro"
import { WouldYouRather } from "@/components/would-you-rather"
import { IdeaSubmission } from "@/components/idea-submission"
import { PersonalityResult } from "@/components/personality-result"

type GameState =
  | "start"
  | "wheel"
  | "challenge"
  | "would-you-rather"
  | "personality"
  | "idea-submission"
  | "contact"
  | "reward"
type ClimateLeaderType =
  | "Community Groundbreaker"
  | "Tech Innovator"
  | "Policy Pioneer"
  | "Creative Communicator"
  | null
type ChallengeTheme = "Food" | "Water" | "Energy" | "Transportation" | "Waste" | "Buildings" | "Nature" | "Community"

export function Kiosk() {
  const [gameState, setGameState] = useState<GameState>("start")
  const [selectedTheme, setSelectedTheme] = useState<ChallengeTheme | "">("")
  const [leaderType, setLeaderType] = useState<ClimateLeaderType>(null)
  const [reward, setReward] = useState<"power" | "awesome" | null>(null)
  const [challengeType, setChallengeType] = useState<"quiz" | "would-you-rather">("quiz")

  const handleThemeSelected = (theme: ChallengeTheme) => {
    setSelectedTheme(theme)

    // Randomly choose between quiz challenge or "would you rather"
    const randomChallenge = Math.random() > 0.5 ? "quiz" : "would-you-rather"
    setChallengeType(randomChallenge)

    if (randomChallenge === "quiz") {
      setGameState("challenge")
    } else {
      setGameState("would-you-rather")
    }
  }

  const handleChallengeCompleted = (success: boolean) => {
    // Determine leader type based on theme and performance
    const leaderTypes: ClimateLeaderType[] = [
      "Community Groundbreaker",
      "Tech Innovator",
      "Policy Pioneer",
      "Creative Communicator",
    ]
    const randomType = leaderTypes[Math.floor(Math.random() * leaderTypes.length)]
    setLeaderType(randomType)
    setGameState("personality")
  }

  const handleWouldYouRatherCompleted = (choice: string) => {
    // Determine leader type based on choices
    let type: ClimateLeaderType = null

    if (choice.includes("community") || choice.includes("local")) {
      type = "Community Groundbreaker"
    } else if (choice.includes("technology") || choice.includes("innovation")) {
      type = "Tech Innovator"
    } else if (choice.includes("policy") || choice.includes("government")) {
      type = "Policy Pioneer"
    } else {
      type = "Creative Communicator"
    }

    setLeaderType(type)
    setGameState("personality")
  }

  const handlePersonalityComplete = () => {
    setGameState("idea-submission")
  }

  const handleIdeaSubmitted = (quality: "high" | "medium" | "low") => {
    // Assign reward based on idea quality
    const rewardType = quality === "high" ? "power" : "awesome"
    setReward(rewardType)
    setGameState("contact")
  }

  const handleContactSubmitted = () => {
    setGameState("reward")
  }

  const resetGame = () => {
    setGameState("start")
    setSelectedTheme("")
    setLeaderType(null)
    setReward(null)
  }

  return (
    <Card className="w-full max-w-4xl min-h-[600px] shadow-xl">
      <CardContent className="p-6 flex flex-col items-center justify-center">
        {gameState === "start" && <BuzzlyIntro onStart={() => setGameState("wheel")} />}

        {gameState === "wheel" && <WheelOfFortune onThemeSelected={handleThemeSelected} />}

        {gameState === "challenge" && <Challenge theme={selectedTheme} onComplete={handleChallengeCompleted} />}

        {gameState === "would-you-rather" && (
          <WouldYouRather theme={selectedTheme} onComplete={handleWouldYouRatherCompleted} />
        )}

        {gameState === "personality" && (
          <PersonalityResult leaderType={leaderType} onContinue={handlePersonalityComplete} />
        )}

        {gameState === "idea-submission" && (
          <IdeaSubmission leaderType={leaderType} theme={selectedTheme} onSubmit={handleIdeaSubmitted} />
        )}

        {gameState === "contact" && <ContactForm onSubmit={handleContactSubmitted} />}

        {gameState === "reward" && <RewardScreen rewardType={reward} leaderType={leaderType} onReset={resetGame} />}
      </CardContent>
    </Card>
  )
}
