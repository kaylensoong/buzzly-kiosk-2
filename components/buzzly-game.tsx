"use client"

import { useState } from "react"
import { Wheel } from "@/components/wheel"
import { WouldYouRather } from "@/components/would-you-rather"
import { PersonalityResult } from "@/components/personality-result"
import { ChallengeSubmission } from "@/components/challenge-submission"
import { ContactCollection } from "@/components/contact-collection"
import { RewardConfirmation } from "@/components/reward-confirmation"
import { BuzzlyPopup } from "@/components/buzzly-popup"
import { ConfettiEffect } from "@/components/confetti-effect"

export type GameStage = "wheel" | "popup" | "questions" | "personality" | "challenge" | "contact" | "reward"

export type Theme = "Food" | "Water" | "Energy" | "Transportation" | "Waste" | "Buildings" | "Nature" | "Community"

export type PersonalityType =
  | "Community Groundbreaker"
  | "Eco Innovator"
  | "Urban Visionary"
  | "Resource Guardian"
  | "Nature Advocate"

export const BuzzlyGame = () => {
  const [stage, setStage] = useState<GameStage>("wheel")
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [personalityType, setPersonalityType] = useState<PersonalityType | null>(null)
  const [showConfetti, setShowConfetti] = useState(false)

  const handleThemeSelected = (theme: Theme) => {
    setSelectedTheme(theme)
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setStage("popup")
    }, 3000)
  }

  const handlePopupClosed = () => {
    setStage("questions")
  }

  const handleQuestionsCompleted = (personality: PersonalityType) => {
    setPersonalityType(personality)
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setStage("personality")
    }, 2000)
  }

  const handlePersonalityConfirmed = () => {
    setStage("challenge")
  }

  const handleChallengeSubmitted = () => {
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setStage("contact")
    }, 2000)
  }

  const handleContactSubmitted = () => {
    setStage("reward")
  }

  const handleRestart = () => {
    setStage("wheel")
    setSelectedTheme(null)
    setPersonalityType(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {showConfetti && <ConfettiEffect />}

      {stage === "wheel" && <Wheel onThemeSelected={handleThemeSelected} />}

      {stage === "popup" && <BuzzlyPopup onClose={handlePopupClosed} />}

      {stage === "questions" && selectedTheme && (
        <WouldYouRather theme={selectedTheme} onComplete={handleQuestionsCompleted} />
      )}

      {stage === "personality" && personalityType && (
        <PersonalityResult personalityType={personalityType} onContinue={handlePersonalityConfirmed} />
      )}

      {stage === "challenge" && personalityType && (
        <ChallengeSubmission personalityType={personalityType} onSubmit={handleChallengeSubmitted} />
      )}

      {stage === "contact" && <ContactCollection onSubmit={handleContactSubmitted} />}

      {stage === "reward" && <RewardConfirmation onRestart={handleRestart} />}
    </div>
  )
}
