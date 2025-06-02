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

type PersonalityType =
  | "The Visionary"         // Big-picture, idea-driven
  | "The Connector"         // Empathetic, social, people-person
  | "The Analyst"           // Logical, curious, detail-focused
  | "The Creator"           // Imaginative, expressive
  | "The Doer"              // Action-oriented, efficient

const questionsByTheme: Record<Theme, Question[]> = {
  Food: [
    { id: 1, optionA: "Start a food blog rating your local spots?", optionB: "Organize a food bank for your area?" },  // A: Creator, B: Connector
    { id: 2, optionA: "Invent your own snack brand?", optionB: "Run a nutrition campaign at school?" },              // A: Visionary, B: Doer
    { id: 3, optionA: "Create an app to track healthy eating?", optionB: "Interview chefs for your podcast?" },      // A: Analyst, B: Creator
  ],
  Water: [
    { id: 1, optionA: "Build a smart water-saving system?", optionB: "Make a short film about water use?" },         // A: Analyst, B: Creator
    { id: 2, optionA: "Organize a local water clean-up?", optionB: "Research city-wide water issues?" },             // A: Doer, B: Analyst
    { id: 3, optionA: "Create a comic book on water heroes?", optionB: "Host a water trivia night?" },               // A: Creator, B: Connector
  ],
  Energy: [
    { id: 1, optionA: "Design a futuristic energy system?", optionB: "Build a working battery pack?" },             // A: Visionary, B: Doer
    { id: 2, optionA: "Pitch a campaign for energy saving at school?", optionB: "Write a blog breaking down energy facts?" }, // A: Connector, B: Analyst
    { id: 3, optionA: "Create a stop-motion video on renewables?", optionB: "Build a solar-powered model car?" },    // A: Creator, B: Doer
  ],
  Transportation: [
    { id: 1, optionA: "Sketch a map of your ideal city?", optionB: "Interview commuters about their experiences?" }, // A: Visionary, B: Connector
    { id: 2, optionA: "Code a simple bus route simulator?", optionB: "Make a meme page about transport problems?" }, // A: Analyst, B: Creator
    { id: 3, optionA: "Set up a carpool program?", optionB: "Design funny transport-themed stickers?" },            // A: Doer, B: Creator
  ],
  Waste: [
    { id: 1, optionA: "Invent a gamified recycling app?", optionB: "Organize a community clean-up day?" },           // A: Visionary, B: Doer
    { id: 2, optionA: "Interview local youth about waste habits?", optionB: "Create posters for your school bins?" }, // A: Connector, B: Creator
    { id: 3, optionA: "Make a data dashboard about waste?", optionB: "Host a competition on reducing trash?" },      // A: Analyst, B: Connector
  ],
  Buildings: [
    { id: 1, optionA: "Design your dream youth hub?", optionB: "Survey students about their ideal hangout spot?" },  // A: Visionary, B: Connector
    { id: 2, optionA: "Build a cardboard model of a new school layout?", optionB: "3D model a smart classroom?" },   // A: Creator, B: Analyst
    { id: 3, optionA: "Coordinate a classroom redesign?", optionB: "Film a timelapse of the process?" },             // A: Doer, B: Creator
  ],
  Nature: [
    { id: 1, optionA: "Create an animation about biodiversity?", optionB: "Document wildlife in your neighborhood?" }, // A: Creator, B: Analyst
    { id: 2, optionA: "Start a 'Nature Club' at school?", optionB: "Host an open mic on nature topics?" },             // A: Doer, B: Connector
    { id: 3, optionA: "Map green spots in your city?", optionB: "Write poems inspired by nature?" },                   // A: Analyst, B: Creator
  ],
  Community: [
    { id: 1, optionA: "Lead a student council initiative?", optionB: "Design graphics for community posters?" },       // A: Visionary, B: Creator
    { id: 2, optionA: "Host a podcast for youth voices?", optionB: "Organize a local youth meetup?" },                // A: Connector, B: Doer
    { id: 3, optionA: "Build a feedback form for your classmates?", optionB: "Start a suggestion board in school?" }, // A: Analyst, B: Doer
  ],
}

const answerToPersonalityMap: Record<Theme, Record<number, { A: PersonalityType, B: PersonalityType }>> = {
  Food: {
    1: { A: "The Creator", B: "The Connector" },
    2: { A: "The Visionary", B: "The Doer" },
    3: { A: "The Analyst", B: "The Creator" },
  },
  Water: {
    1: { A: "The Analyst", B: "The Creator" },
    2: { A: "The Doer", B: "The Analyst" },
    3: { A: "The Creator", B: "The Connector" },
  },
  Energy: {
    1: { A: "The Visionary", B: "The Doer" },
    2: { A: "The Connector", B: "The Analyst" },
    3: { A: "The Creator", B: "The Doer" },
  },
  Transportation: {
    1: { A: "The Visionary", B: "The Connector" },
    2: { A: "The Analyst", B: "The Creator" },
    3: { A: "The Doer", B: "The Creator" },
  },
  Waste: {
    1: { A: "The Visionary", B: "The Doer" },
    2: { A: "The Connector", B: "The Creator" },
    3: { A: "The Analyst", B: "The Connector" },
  },
  Buildings: {
    1: { A: "The Visionary", B: "The Connector" },
    2: { A: "The Creator", B: "The Analyst" },
    3: { A: "The Doer", B: "The Creator" },
  },
  Nature: {
    1: { A: "The Creator", B: "The Analyst" },
    2: { A: "The Doer", B: "The Connector" },
    3: { A: "The Analyst", B: "The Creator" },
  },
  Community: {
    1: { A: "The Visionary", B: "The Creator" },
    2: { A: "The Connector", B: "The Doer" },
    3: { A: "The Analyst", B: "The Doer" },
  },
}

// Map answers to personality types
const determinePersonality = (
  answers: string[],
  theme: Theme
): PersonalityType => {
  const personalityCount: Record<PersonalityType, number> = {
    "The Visionary": 0,
    "The Connector": 0,
    "The Analyst": 0,
    "The Creator": 0,
    "The Doer": 0,
  }

  answers.forEach((answer, index) => {
    const questionMap = answerToPersonalityMap[theme][index + 1]
    const type = questionMap[answer as "A" | "B"]
    personalityCount[type]++
  })

  // Get the personality type with the highest count
  return (Object.entries(personalityCount).sort((a, b) => b[1] - a[1])[0][0]) as PersonalityType
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
        const personalityType = determinePersonality(newAnswers, theme)
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
