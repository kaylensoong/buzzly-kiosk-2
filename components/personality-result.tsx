"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { PersonalityType } from "@/components/buzzly-game"
import { Sparkles, Zap } from "lucide-react"

interface PersonalityResultProps {
  personalityType: PersonalityType
  onContinue: () => void
}

// Updated Personality descriptions
const personalityDescriptions: Record<
  PersonalityType,
  {
    description: string
    strengths: string[]
    icon: React.ReactNode
  }
> = {
  "The Visionary": {
    description:
      "You're a big-picture thinker, driven by possibility. You imagine bold futures and help others see the path forward.",
    strengths: [
      "Seeing opportunities where others see obstacles",
      "Inspiring others with future-forward thinking",
      "Driving momentum around long-term visions",
    ],
    icon: <Sparkles className="w-12 h-12 text-lime-400" />,
  },
  "The Connector": {
    description:
      "You thrive on building relationships and creating bridges. You believe in the power of collaboration to spark change.",
    strengths: [
      "Bringing people and ideas together",
      "Fostering inclusive and supportive environments",
      "Strengthening networks and communities",
    ],
    icon: <Zap className="w-12 h-12 text-pink-400" />,
  },
  "The Analyst": {
    description:
      "You're detail-oriented and data-driven. You make sense of complex information to guide smart decision-making.",
    strengths: [
      "Breaking down problems with precision",
      "Using data to uncover insights",
      "Designing evidence-based solutions",
    ],
    icon: <Sparkles className="w-12 h-12 text-blue-400" />,
  },
  "The Creator": {
    description:
      "You're imaginative, expressive, and full of ideas. You use storytelling and design to make change compelling.",
    strengths: [
      "Communicating with clarity and emotion",
      "Designing engaging and impactful experiences",
      "Turning ideas into tangible action",
    ],
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
  },
  "The Doer": {
    description:
      "You're practical, action-oriented, and always ready to get things done. You believe in learning by doing.",
    strengths: [
      "Making plans real through action",
      "Leading with reliability and determination",
      "Taking initiative and adapting quickly",
    ],
    icon: <Sparkles className="w-12 h-12 text-green-400" />,
  },
}

export const PersonalityResult = ({ personalityType, onContinue }: PersonalityResultProps) => {
  const personality = personalityDescriptions[personalityType]

  return (
    <div className="bg-indigo-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-white">
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4">{personality.icon}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-lime-400 text-center">You are {personalityType}!</h2>
      </div>

      <p className="text-xl mb-6 text-center">{personality.description}</p>

      <div className="bg-indigo-700 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-lime-300">Your Climate Leadership Strengths:</h3>
        <ul className="space-y-3">
          {personality.strengths.map((strength, index) => (
            <li key={index} className="flex items-start">
              <div className="w-6 h-6 rounded-full bg-lime-400 text-indigo-900 flex items-center justify-center font-bold mr-3 flex-shrink-0">
                {index + 1}
              </div>
              <p className="text-lg">{strength}</p>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={onContinue}
          className="bg-lime-400 text-indigo-900 hover:bg-lime-300 px-8 py-6 text-xl font-bold"
        >
          Continue to Your Buzzly Challenge <Zap className="ml-2" />
        </Button>
      </div>
    </div>
  )
}