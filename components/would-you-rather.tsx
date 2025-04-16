"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"

interface WouldYouRatherProps {
  theme: string
  onComplete: (choice: string) => void
}

// Sample "would you rather" questions by theme
const questionsByTheme: Record<string, Array<{ optionA: string; optionB: string; typeA: string; typeB: string }>> = {
  Food: [
    {
      optionA: "Create a zero-waste food system in your community",
      optionB: "Develop a new plant-based meat alternative that tastes exactly like meat",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign to reduce food waste in schools and restaurants",
      optionB: "Design an app that helps people track and reduce their food carbon footprint",
      typeA: "policy-focused",
      typeB: "technology-focused",
    },
  ],
  Water: [
    {
      optionA: "Create a community rainwater harvesting system",
      optionB: "Develop a new water purification technology",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign for stricter water conservation laws",
      optionB: "Design an educational program about water conservation",
      typeA: "policy-focused",
      typeB: "communication-focused",
    },
  ],
  Energy: [
    {
      optionA: "Create a community-owned solar farm",
      optionB: "Develop a new more efficient solar panel technology",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign for renewable energy policies",
      optionB: "Design an energy conservation awareness campaign",
      typeA: "policy-focused",
      typeB: "communication-focused",
    },
  ],
  Transportation: [
    {
      optionA: "Create a bike-sharing program in your community",
      optionB: "Develop a new electric vehicle battery technology",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign for better public transportation",
      optionB: "Design a campaign to encourage walking and biking",
      typeA: "policy-focused",
      typeB: "communication-focused",
    },
  ],
  Waste: [
    {
      optionA: "Create a community composting system",
      optionB: "Develop a new biodegradable packaging material",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign for a plastic bag ban",
      optionB: "Design a zero-waste lifestyle education program",
      typeA: "policy-focused",
      typeB: "communication-focused",
    },
  ],
  Buildings: [
    {
      optionA: "Create a community garden on building rooftops",
      optionB: "Develop a new energy-efficient building material",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign for green building codes",
      optionB: "Design an educational program about energy-efficient homes",
      typeA: "policy-focused",
      typeB: "communication-focused",
    },
  ],
  Nature: [
    {
      optionA: "Create a community tree-planting initiative",
      optionB: "Develop a new technology to monitor forest health",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign to protect local natural areas",
      optionB: "Design a nature appreciation program for schools",
      typeA: "policy-focused",
      typeB: "communication-focused",
    },
  ],
  Community: [
    {
      optionA: "Create a neighborhood climate action group",
      optionB: "Develop a platform for communities to share climate solutions",
      typeA: "community-focused",
      typeB: "technology-focused",
    },
    {
      optionA: "Lead a campaign for climate justice in vulnerable communities",
      optionB: "Design a program to help communities prepare for climate impacts",
      typeA: "policy-focused",
      typeB: "communication-focused",
    },
  ],
}

export function WouldYouRather({ theme, onComplete }: WouldYouRatherProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [question, setQuestion] = useState(() => {
    const questions = questionsByTheme[theme] || questionsByTheme["Food"]
    return questions[Math.floor(Math.random() * questions.length)]
  })

  const handleSelect = (option: "A" | "B") => {
    const choice = option === "A" ? question.typeA : question.typeB
    setSelectedOption(option)

    setTimeout(() => {
      onComplete(choice)
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-2 text-center text-purple-800">Would You Rather?</h2>
      <p className="text-lg mb-6 text-center">Your choice will reveal your Climate Leader type!</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-4">
        <Card
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedOption === "A" ? "ring-4 ring-yellow-400 bg-yellow-50" : ""
          }`}
          onClick={() => !selectedOption && handleSelect("A")}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4 text-center">Option A</h3>
            <p className="text-center mb-4">{question.optionA}</p>
            <Button
              className={`w-full ${selectedOption ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`}
              disabled={!!selectedOption}
              onClick={() => handleSelect("A")}
            >
              Choose This
            </Button>
          </CardContent>
        </Card>

        <Card
          className={`cursor-pointer transition-all hover:scale-105 ${
            selectedOption === "B" ? "ring-4 ring-yellow-400 bg-yellow-50" : ""
          }`}
          onClick={() => !selectedOption && handleSelect("B")}
        >
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <h3 className="text-xl font-semibold mb-4 text-center">Option B</h3>
            <p className="text-center mb-4">{question.optionB}</p>
            <Button
              className={`w-full ${selectedOption ? "bg-gray-400" : "bg-yellow-500 hover:bg-yellow-600"}`}
              disabled={!!selectedOption}
              onClick={() => handleSelect("B")}
            >
              Choose This
            </Button>
          </CardContent>
        </Card>
      </div>

      {selectedOption && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-6 p-4 rounded-lg text-center">
          <p className="text-lg font-semibold">Great choice! Discovering your Climate Leader type...</p>
        </motion.div>
      )}
    </motion.div>
  )
}
