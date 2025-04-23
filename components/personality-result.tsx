"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import type { PersonalityType } from "@/components/buzzly-game"
import { Sparkles, Zap } from "lucide-react"

interface PersonalityResultProps {
  personalityType: PersonalityType
  onContinue: () => void
}

// Personality descriptions
const personalityDescriptions: Record<
  PersonalityType,
  {
    description: string
    strengths: string[]
    icon: React.ReactNode
  }
> = {
  "Community Groundbreaker": {
    description:
      "You're a natural connector who brings people together to solve problems. You understand that climate solutions need community buy-in and participation.",
    strengths: [
      "Building consensus and bringing diverse voices together",
      "Creating inclusive solutions that work for everyone",
      "Mobilizing community action and participation",
    ],
    icon: <Sparkles className="w-12 h-12 text-pink-400" />,
  },
  "Eco Innovator": {
    description:
      "You're a creative problem-solver who thinks outside the box. You see technological and design opportunities where others see challenges.",
    strengths: [
      "Developing new technologies and approaches",
      "Finding efficient solutions to complex problems",
      "Connecting ideas across different domains",
    ],
    icon: <Zap className="w-12 h-12 text-yellow-400" />,
  },
  "Urban Visionary": {
    description:
      "You see the big picture of how cities can transform to meet climate challenges. You understand systems and how to redesign them for sustainability.",
    strengths: [
      "Systems thinking and holistic approaches",
      "Long-term planning and strategic vision",
      "Integrating multiple solutions into cohesive plans",
    ],
    icon: <Sparkles className="w-12 h-12 text-blue-400" />,
  },
  "Resource Guardian": {
    description:
      "You're focused on protecting and optimizing our precious resources. You understand efficiency and how to do more with less.",
    strengths: [
      "Finding efficiencies and reducing waste",
      "Protecting and conserving natural resources",
      "Creating circular systems that reuse and recycle",
    ],
    icon: <Zap className="w-12 h-12 text-green-400" />,
  },
  "Nature Advocate": {
    description:
      "You understand the deep connection between human wellbeing and natural systems. You see nature-based solutions as key to addressing climate challenges.",
    strengths: [
      "Integrating natural systems into urban environments",
      "Restoring ecosystems and biodiversity",
      "Finding solutions that benefit both people and nature",
    ],
    icon: <Sparkles className="w-12 h-12 text-lime-400" />,
  },
}

export const PersonalityResult = ({ personalityType, onContinue }: PersonalityResultProps) => {
  const personality = personalityDescriptions[personalityType]

  return (
    <div className="bg-indigo-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-white">
      <div className="flex flex-col items-center mb-6">
        <div className="mb-4">{personality.icon}</div>
        <h2 className="text-3xl md:text-4xl font-bold text-lime-400 text-center">You are a {personalityType}!</h2>
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
