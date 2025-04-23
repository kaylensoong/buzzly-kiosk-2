"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import type { Theme, PersonalityType } from "@/components/buzzly-game"
import { Sparkles } from "lucide-react"

interface WouldYouRatherProps {
  theme: Theme
  onComplete: (personalityType: PersonalityType) => void
}

interface Question {
  id: number
  optionA: string
  optionB: string
}

// Questions by theme
const questionsByTheme: Record<Theme, Question[]> = {
  Food: [
    { id: 1, optionA: "Create a zero-waste food system?", optionB: "Create a locally-sourced food network?" },
    { id: 2, optionA: "Design urban farms on rooftops?", optionB: "Create community gardens in neighborhoods?" },
    { id: 3, optionA: "Develop plant-based alternatives to meat?", optionB: "Improve sustainable fishing practices?" },
  ],
  Water: [
    {
      id: 1,
      optionA: "Design water-saving technologies for homes?",
      optionB: "Create community rainwater collection systems?",
    },
    {
      id: 2,
      optionA: "Restore natural waterways in urban areas?",
      optionB: "Develop advanced water filtration systems?",
    },
    { id: 3, optionA: "Create water-efficient urban landscapes?", optionB: "Design flood protection infrastructure?" },
  ],
  Energy: [
    { id: 1, optionA: "Create a zero-emissions energy grid?", optionB: "Develop neighborhood microgrids?" },
    { id: 2, optionA: "Design solar-powered public spaces?", optionB: "Create wind energy systems for urban areas?" },
    { id: 3, optionA: "Develop energy storage solutions?", optionB: "Create energy-efficient building standards?" },
  ],
  Transportation: [
    {
      id: 1,
      optionA: "Create a zero-emissions transport system?",
      optionB: "Design walkable, bike-friendly neighborhoods?",
    },
    { id: 2, optionA: "Develop electric public transportation?", optionB: "Create car-free zones in city centers?" },
    { id: 3, optionA: "Design smart traffic management systems?", optionB: "Create shared mobility solutions?" },
  ],
  Waste: [
    { id: 1, optionA: "Create a circular economy for plastics?", optionB: "Develop zero-waste packaging solutions?" },
    { id: 2, optionA: "Design community recycling centers?", optionB: "Create systems to repurpose industrial waste?" },
    { id: 3, optionA: "Develop composting systems for urban areas?", optionB: "Create incentives for reducing waste?" },
  ],
  Buildings: [
    { id: 1, optionA: "Design carbon-neutral buildings?", optionB: "Create living buildings with integrated nature?" },
    { id: 2, optionA: "Develop affordable eco-housing?", optionB: "Create community-centered building designs?" },
    {
      id: 3,
      optionA: "Design buildings that generate their own energy?",
      optionB: "Create adaptable spaces for changing needs?",
    },
  ],
  Nature: [
    {
      id: 1,
      optionA: "Restore native ecosystems in urban areas?",
      optionB: "Create wildlife corridors through cities?",
    },
    {
      id: 2,
      optionA: "Design urban forests and tree canopies?",
      optionB: "Create coastal ecosystem restoration projects?",
    },
    {
      id: 3,
      optionA: "Develop pollinator-friendly urban landscapes?",
      optionB: "Create nature-based solutions for climate resilience?",
    },
  ],
  Community: [
    {
      id: 1,
      optionA: "Create inclusive community decision-making processes?",
      optionB: "Design neighborhood resilience hubs?",
    },
    {
      id: 2,
      optionA: "Develop intergenerational knowledge sharing programs?",
      optionB: "Create community climate action teams?",
    },
    {
      id: 3,
      optionA: "Design public spaces that bring diverse groups together?",
      optionB: "Create local economic systems that benefit everyone?",
    },
  ],
}

// Map answers to personality types
const determinePersonality = (answers: string[]): PersonalityType => {
  // This is a simplified algorithm - in a real app, this would be more sophisticated
  const count = {
    a: answers.filter((a) => a === "A").length,
    b: answers.filter((a) => a === "B").length,
  }

  if (count.a === 3) return "Eco Innovator"
  if (count.b === 3) return "Community Groundbreaker"
  if (count.a > count.b) return "Urban Visionary"
  if (count.b > count.a) return "Nature Advocate"
  return "Resource Guardian"
}

export const WouldYouRather = ({ theme, onComplete }: WouldYouRatherProps) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [selectedOption, setSelectedOption] = useState<string | null>(null)

  const questions = questionsByTheme[theme]
  const currentQuestion = questions[currentQuestionIndex]
  const isLastQuestion = currentQuestionIndex === questions.length - 1

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option)
  }

  const handleNext = () => {
    if (selectedOption) {
      const newAnswers = [...answers, selectedOption]
      setAnswers(newAnswers)

      if (isLastQuestion) {
        const personalityType = determinePersonality(newAnswers)
        onComplete(personalityType)
      } else {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setSelectedOption(null)
      }
    }
  }

  return (
    <div className="bg-indigo-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-white">Would You Rather?</h2>
        <div className="bg-lime-400 text-indigo-900 px-4 py-1 rounded-full font-bold">{theme}</div>
      </div>

      <div className="text-white mb-2">
        <p className="text-lg">
          Question {currentQuestionIndex + 1} of {questions.length}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <Card
          className={`p-6 cursor-pointer transition-all ${
            selectedOption === "A"
              ? "bg-lime-400 text-indigo-900 border-2 border-white"
              : "bg-indigo-700 text-white hover:bg-indigo-600"
          }`}
          onClick={() => handleOptionSelect("A")}
        >
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-900 text-lime-400 flex items-center justify-center font-bold mr-3 flex-shrink-0">
              A
            </div>
            <p className="text-lg font-medium">{currentQuestion.optionA}</p>
          </div>
          {selectedOption === "A" && (
            <div className="absolute top-2 right-2">
              <Sparkles className="text-indigo-900 w-6 h-6" />
            </div>
          )}
        </Card>

        <Card
          className={`p-6 cursor-pointer transition-all ${
            selectedOption === "B"
              ? "bg-lime-400 text-indigo-900 border-2 border-white"
              : "bg-indigo-700 text-white hover:bg-indigo-600"
          }`}
          onClick={() => handleOptionSelect("B")}
        >
          <div className="flex items-start">
            <div className="w-8 h-8 rounded-full bg-indigo-900 text-lime-400 flex items-center justify-center font-bold mr-3 flex-shrink-0">
              B
            </div>
            <p className="text-lg font-medium">{currentQuestion.optionB}</p>
          </div>
          {selectedOption === "B" && (
            <div className="absolute top-2 right-2">
              <Sparkles className="text-indigo-900 w-6 h-6" />
            </div>
          )}
        </Card>
      </div>

      <div className="flex justify-end">
        <Button
          onClick={handleNext}
          disabled={!selectedOption}
          className="bg-lime-400 text-indigo-900 hover:bg-lime-300 px-8 py-2 text-lg"
        >
          {isLastQuestion ? "See Your Results" : "Next Question"}
        </Button>
      </div>

      <div className="mt-6 flex justify-center">
        <div className="flex space-x-2">
          {questions.map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index < currentQuestionIndex
                  ? "bg-lime-400"
                  : index === currentQuestionIndex
                    ? "bg-white"
                    : "bg-indigo-600"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
