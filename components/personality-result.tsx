"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Users, Lightbulb, Scale, MessageSquare } from "lucide-react"

interface PersonalityResultProps {
  leaderType: string | null
  onContinue: () => void
}

const leaderTypeInfo = {
  "Community Groundbreaker": {
    description: "You're a natural community builder who brings people together to create local climate solutions.",
    strengths: ["Building coalitions", "Organizing events", "Creating inclusive spaces", "Practical implementation"],
    icon: Users,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  "Tech Innovator": {
    description:
      "You see technology as a powerful tool to address climate challenges through innovation and creativity.",
    strengths: ["Problem-solving", "Technical thinking", "Innovation", "Efficiency optimization"],
    icon: Lightbulb,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  "Policy Pioneer": {
    description: "You understand that systemic change requires policy action and you're ready to advocate for it.",
    strengths: ["Strategic thinking", "Advocacy", "Understanding systems", "Building consensus"],
    icon: Scale,
    color: "text-purple-600",
    bgColor: "bg-purple-100",
  },
  "Creative Communicator": {
    description: "You have a gift for translating complex climate issues into compelling stories that inspire action.",
    strengths: ["Storytelling", "Visual communication", "Public speaking", "Social media savvy"],
    icon: MessageSquare,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
}

export function PersonalityResult({ leaderType, onContinue }: PersonalityResultProps) {
  const typeInfo = leaderType ? leaderTypeInfo[leaderType] : leaderTypeInfo["Community Groundbreaker"]
  const Icon = typeInfo.icon

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <h2 className="text-3xl font-bold mb-2 text-center text-purple-800">Your Climate Leader Type</h2>
      <p className="text-lg mb-6 text-center">Based on your choices, we've identified your climate leadership style!</p>

      <Card className={`mb-6 border-2 border-yellow-400 ${typeInfo.bgColor}`}>
        <CardContent className="p-6">
          <div className="flex flex-col items-center mb-4">
            <div className={`p-3 rounded-full ${typeInfo.bgColor} mb-2`}>
              <Icon className={`h-12 w-12 ${typeInfo.color}`} />
            </div>
            <h3 className={`text-2xl font-bold ${typeInfo.color}`}>{leaderType}</h3>
          </div>

          <p className="text-center mb-4">{typeInfo.description}</p>

          <div className="mb-4">
            <h4 className="font-semibold mb-2">Your Climate Leadership Strengths:</h4>
            <ul className="list-disc pl-5 space-y-1">
              {typeInfo.strengths.map((strength, index) => (
                <li key={index}>{strength}</li>
              ))}
            </ul>
          </div>

          <div className="bg-white p-4 rounded-lg">
            <p className="text-center font-semibold">
              Now it's time to put your {leaderType} skills to work! In the next step, you'll submit your climate
              solution idea.
            </p>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-center">
        <Button onClick={onContinue} size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-xl px-8">
          Continue to Idea Submission
        </Button>
      </div>
    </motion.div>
  )
}
