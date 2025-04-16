"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle, XCircle } from "lucide-react"

interface ChallengeProps {
  theme: string
  onComplete: (success: boolean) => void
}

// Sample challenges by theme
const challengesByTheme: Record<string, Array<{ question: string; options: string[]; correctAnswer: number }>> = {
  Food: [
    {
      question: "What percentage of global greenhouse gas emissions come from food systems?",
      options: ["10-15%", "20-25%", "30-35%", "40-45%"],
      correctAnswer: 2,
    },
    {
      question: "Which of these foods typically has the highest carbon footprint?",
      options: ["Beef", "Chicken", "Tofu", "Lentils"],
      correctAnswer: 0,
    },
  ],
  Water: [
    {
      question: "How much of the Earth's water is freshwater available for human use?",
      options: ["About 70%", "About 30%", "Less than 1%", "About 10%"],
      correctAnswer: 2,
    },
    {
      question: "Which sector consumes the most freshwater globally?",
      options: ["Domestic use", "Industry", "Agriculture", "Energy production"],
      correctAnswer: 2,
    },
  ],
  Energy: [
    {
      question: "Which renewable energy source is growing the fastest globally?",
      options: ["Wind", "Solar", "Hydroelectric", "Geothermal"],
      correctAnswer: 1,
    },
    {
      question: "What percentage of global electricity comes from renewable sources?",
      options: ["Less than 10%", "About 15-20%", "About 25-30%", "More than 50%"],
      correctAnswer: 2,
    },
  ],
  Transportation: [
    {
      question: "What percentage of global CO2 emissions come from transportation?",
      options: ["About 5%", "About 15%", "About 25%", "About 35%"],
      correctAnswer: 1,
    },
    {
      question: "Which mode of transportation is typically the most carbon-efficient for long distances?",
      options: ["Car", "Bus", "Train", "Airplane"],
      correctAnswer: 2,
    },
  ],
  Waste: [
    {
      question: "What percentage of plastic ever produced has been recycled?",
      options: ["About 9%", "About 25%", "About 40%", "About 60%"],
      correctAnswer: 0,
    },
    {
      question: "Which of these is NOT a principle of the circular economy?",
      options: [
        "Design out waste and pollution",
        "Keep products in use",
        "Regenerate natural systems",
        "Maximize extraction of resources",
      ],
      correctAnswer: 3,
    },
  ],
  Buildings: [
    {
      question: "What percentage of global energy consumption comes from buildings?",
      options: ["About 10%", "About 20%", "About 30%", "About 40%"],
      correctAnswer: 3,
    },
    {
      question: "Which building certification focuses on the health and wellbeing of occupants?",
      options: ["LEED", "WELL", "Passive House", "Energy Star"],
      correctAnswer: 1,
    },
  ],
  Nature: [
    {
      question: "What is the estimated percentage of species at risk of extinction due to climate change?",
      options: ["Less than 5%", "About 10-15%", "About 20-30%", "More than 50%"],
      correctAnswer: 2,
    },
    {
      question: "Which ecosystem is known as the 'lungs of the Earth'?",
      options: ["Coral reefs", "Grasslands", "Rainforests", "Tundra"],
      correctAnswer: 2,
    },
  ],
  Community: [
    {
      question: "What is the term for communities that are disproportionately affected by climate change?",
      options: ["Climate victims", "Environmental justice communities", "Adaptation zones", "Climate refugees"],
      correctAnswer: 1,
    },
    {
      question: "Which approach emphasizes local, community-based solutions to climate challenges?",
      options: ["Top-down governance", "Centralized planning", "Grassroots organizing", "International policy"],
      correctAnswer: 2,
    },
  ],
}

export function Challenge({ theme, onComplete }: ChallengeProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null)
  const [challenge, setChallenge] = useState<{ question: string; options: string[]; correctAnswer: number } | null>(
    null,
  )

  useEffect(() => {
    // Get challenges for the selected theme, or default to Food
    const challenges = challengesByTheme[theme] || challengesByTheme["Food"]
    // Select a random challenge
    const randomChallenge = challenges[Math.floor(Math.random() * challenges.length)]
    setChallenge(randomChallenge)
  }, [theme])

  const handleSubmit = () => {
    if (selectedAnswer === null || !challenge) return

    const correct = selectedAnswer === challenge.correctAnswer
    setIsCorrect(correct)

    setTimeout(() => {
      onComplete(correct)
    }, 2000)
  }

  if (!challenge) {
    return <div>Loading challenge...</div>
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-2 text-center text-purple-800">{theme} Challenge</h2>
      <p className="text-lg mb-6 text-center">Test your knowledge about climate solutions!</p>

      <Card className="mb-6">
        <CardContent className="p-6">
          <h3 className="text-xl font-semibold mb-4">{challenge.question}</h3>

          <RadioGroup value={selectedAnswer?.toString()} className="space-y-3">
            {challenge.options.map((option, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedAnswer === index ? "border-yellow-500 bg-yellow-50" : "border-gray-200"
                } ${isCorrect !== null && index === challenge.correctAnswer ? "border-green-500 bg-green-50" : ""} ${
                  isCorrect === false && index === selectedAnswer ? "border-red-500 bg-red-50" : ""
                }`}
                onClick={() => isCorrect === null && setSelectedAnswer(index)}
              >
                <RadioGroupItem
                  value={index.toString()}
                  id={`option-${index}`}
                  checked={selectedAnswer === index}
                  className="sr-only"
                />
                <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer text-lg">
                  {option}
                </Label>
                {isCorrect !== null && index === challenge.correctAnswer && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
                {isCorrect === false && index === selectedAnswer && <XCircle className="h-5 w-5 text-red-500" />}
              </div>
            ))}
          </RadioGroup>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={selectedAnswer === null || isCorrect !== null}
          size="lg"
          className="bg-yellow-500 hover:bg-yellow-600 text-xl px-8"
        >
          Submit Answer
        </Button>
      </div>

      {isCorrect !== null && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className={`mt-6 p-4 rounded-lg text-center text-xl font-bold ${
            isCorrect ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {isCorrect
            ? "Correct! You're on your way to becoming a climate leader!"
            : "That's not quite right, but you're still on your way to becoming a climate leader!"}
        </motion.div>
      )}
    </motion.div>
  )
}
