"use client"

import { useState } from "react"
import { Wheel } from "@/components/wheel"
import { WouldYouRather } from "@/components/would-you-rather"
import { AnimalSelection } from "@/components/animal-selection"
import { PersonalityResult } from "@/components/personality-result"
import { ContactCollection } from "@/components/contact-collection"
import { RewardConfirmation } from "@/components/reward-confirmation"
import { BuzzlyPopup } from "@/components/buzzly-popup"
import { ConfettiEffect } from "@/components/confetti-effect"

export type GameStage = "wheel" | "popup" | "questions" | "animal" | "personality" | "contact" | "reward"

export type Theme =
  | "Food" | "Water" | "Energy" | "Transportation"
  | "Waste" | "Buildings" | "Nature" | "Community"

export type PersonalityType =
  | "The Visionary"
  | "The Connector"
  | "The Analyst"
  | "The Creator"
  | "The Doer"

export const BuzzlyGame = () => {
  const [stage, setStage] = useState<GameStage>("wheel")
  const [selectedTheme, setSelectedTheme] = useState<Theme | null>(null)
  const [personalityType, setPersonalityType] = useState<PersonalityType | null>(null)
  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null)
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
    setStage("animal")
  }

  const handleAnimalSelected = (animalImage: string) => {
    setSelectedAnimal(animalImage)
    setShowConfetti(true)
    setTimeout(() => {
      setShowConfetti(false)
      setStage("personality")
    }, 2000)
  }

  const handlePersonalityConfirmed = () => {
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
    setSelectedAnimal(null)
  }

  return (
    <div className="w-full max-w-4xl mx-auto relative">
      {showConfetti && <ConfettiEffect />}

      {stage === "wheel" && <Wheel onThemeSelected={handleThemeSelected} />}

      {stage === "popup" && <BuzzlyPopup onClose={handlePopupClosed} />}

      {stage === "questions" && selectedTheme && (
        <WouldYouRather theme={selectedTheme} onComplete={handleQuestionsCompleted} />
      )}

      {stage === "animal" && personalityType && (
        <AnimalSelection
          personalityType={personalityType}
          onAnimalSelected={handleAnimalSelected}
        />
      )}

      {stage === "personality" && personalityType && (
        <PersonalityResult
          personalityType={personalityType}
          selectedAnimal={selectedAnimal}
          onContinue={handlePersonalityConfirmed}
        />
      )}

      {stage === "contact" && <ContactCollection onSubmit={handleContactSubmitted} />}

      {stage === "reward" && <RewardConfirmation onRestart={handleRestart} />}
    </div>
  )
}