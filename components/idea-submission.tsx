"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Lightbulb } from "lucide-react"

interface IdeaSubmissionProps {
  leaderType: string | null
  theme: string
  onSubmit: (quality: "high" | "medium" | "low") => void
}

const ideaPrompts = {
  "Community Groundbreaker": {
    Food: "How could your community work together to reduce food waste or increase access to sustainable food?",
    Water: "What community-based solution could help conserve or protect water resources in your area?",
    Energy: "How could your community collaborate to reduce energy use or implement renewable energy?",
    Transportation: "What community initiative could make transportation more sustainable in your area?",
    Waste: "How could your community work together to reduce waste or improve recycling?",
    Buildings: "What community project could make buildings in your area more sustainable?",
    Nature: "How could your community protect or restore natural areas?",
    Community: "What collaborative project could help your community prepare for climate impacts?",
  },
  "Tech Innovator": {
    Food: "What technology could help reduce food waste or make food systems more sustainable?",
    Water: "What technological solution could help conserve or clean water resources?",
    Energy: "What innovation could help increase renewable energy use or improve energy efficiency?",
    Transportation: "What technology could make transportation more sustainable?",
    Waste: "What technological solution could reduce waste or improve recycling?",
    Buildings: "What innovation could make buildings more energy-efficient or sustainable?",
    Nature: "What technology could help protect or restore natural ecosystems?",
    Community: "What digital platform could help communities collaborate on climate solutions?",
  },
  "Policy Pioneer": {
    Food: "What policy change could help reduce food waste or make food systems more sustainable?",
    Water: "What water policy would you advocate for to protect this vital resource?",
    Energy: "What energy policy would help accelerate the transition to renewable energy?",
    Transportation: "What transportation policy would significantly reduce emissions?",
    Waste: "What waste reduction or recycling policy would you propose?",
    Buildings: "What building code or policy would make construction more sustainable?",
    Nature: "What environmental protection policy would you advocate for?",
    Community: "What policy would help vulnerable communities adapt to climate change?",
  },
  "Creative Communicator": {
    Food: "How would you create a campaign to change people's food habits to be more sustainable?",
    Water: "How would you communicate the importance of water conservation in a compelling way?",
    Energy: "How would you design a campaign to encourage renewable energy adoption?",
    Transportation: "How would you create a message that inspires people to use sustainable transportation?",
    Waste: "How would you design a campaign to reduce waste or improve recycling?",
    Buildings: "How would you communicate the benefits of green buildings to the public?",
    Nature: "How would you create a message that inspires people to protect natural areas?",
    Community: "How would you design a campaign to build community resilience to climate change?",
  },
}

export function IdeaSubmission({ leaderType, theme, onSubmit }: IdeaSubmissionProps) {
  const [idea, setIdea] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const defaultType = "Community Groundbreaker"
  const defaultTheme = "Food"

  const prompt = leaderType && theme ? ideaPrompts[leaderType][theme] : ideaPrompts[defaultType][defaultTheme]

  const handleSubmit = () => {
    if (!idea.trim()) return

    setIsSubmitting(true)

    // Determine idea quality based on length and complexity
    // This is a simple heuristic - in a real app, you might use more sophisticated criteria
    let quality: "high" | "medium" | "low"

    if (idea.length > 200 && idea.includes(" because ")) {
      quality = "high" // Longer ideas with reasoning are considered high quality
    } else if (idea.length > 100) {
      quality = "medium"
    } else {
      quality = "low"
    }

    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit(quality)
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-2xl">
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-2xl text-center text-purple-800">Submit Your Climate Solution</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-yellow-50 p-4 rounded-lg mb-6 flex items-start">
            <Lightbulb className="h-6 w-6 text-yellow-600 mr-2 mt-1 flex-shrink-0" />
            <div>
              <p className="font-semibold mb-1">Your Challenge:</p>
              <p>{prompt}</p>
              <p className="mt-2 text-sm">
                <span className="font-semibold">Tip:</span> The most detailed and thoughtful ideas have a chance to win
                the $50 Power Idea prize!
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <Textarea
              placeholder="Share your climate solution idea here..."
              className="min-h-[150px] text-base"
              value={idea}
              onChange={(e) => setIdea(e.target.value)}
            />

            <div className="flex justify-between items-center">
              <div className="text-sm text-gray-500">
                {idea.length} characters {idea.length < 50 ? "(try to write more for a better chance to win)" : ""}
              </div>
              <Button
                onClick={handleSubmit}
                disabled={idea.length < 20 || isSubmitting}
                className="bg-yellow-500 hover:bg-yellow-600"
              >
                {isSubmitting ? "Submitting..." : "Submit My Idea"}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
