"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import type { PersonalityType } from "@/components/buzzly-game"
import { Sparkles, Zap, MessageSquare, LightbulbIcon } from "lucide-react"

interface ChallengeSubmissionProps {
  personalityType: PersonalityType
  onSubmit: () => void
}

// Challenges based on personality type
const challengesByPersonality: Record<
  PersonalityType,
  {
    title: string
    description: string
  }
> = {
  "Community Groundbreaker": {
    title: "Design a community climate action program",
    description:
      "How would you bring together diverse community members to take action on climate issues in Auckland? What activities, events, or platforms would you create to ensure everyone's voice is heard?",
  },
  "Eco Innovator": {
    title: "Create a tech solution for urban sustainability",
    description:
      "Design an app, device, or technology that could help Auckland residents reduce their environmental impact. How would it work and what problem would it solve?",
  },
  "Urban Visionary": {
    title: "Reimagine a neighborhood for climate resilience",
    description:
      "Choose a neighborhood in Auckland and redesign it to be more climate-resilient. What changes would you make to buildings, streets, and public spaces?",
  },
  "Resource Guardian": {
    title: "Design a zero-waste system",
    description:
      "Create a plan for reducing waste in a specific sector (food, packaging, electronics, etc.) in Auckland. How would you change current practices to eliminate  packaging, electronics, etc.) in Auckland. How would you change current practices to eliminate waste and create a circular economy?",
  },
  "Nature Advocate": {
    title: "Integrate nature into urban infrastructure",
    description:
      "Develop a proposal for integrating natural systems into Auckland's infrastructure. How could natural elements help with water management, temperature regulation, or air quality?",
  },
}

// Previous winner testimonials
const testimonials = [
  {
    name: "Maia T.",
    age: 17,
    quote:
      "I won $50 for my idea about community gardens in schools. Buzzly actually connected me with the council to discuss implementing it!",
    award: "Power Idea",
  },
  {
    name: "Liam K.",
    age: 22,
    quote:
      "My transportation app concept won an Awesome Idea award. The $10 was cool, but the recognition and feedback from professionals was even better.",
    award: "Awesome Idea",
  },
  {
    name: "Aroha W.",
    age: 15,
    quote:
      "I couldn't believe my waste reduction idea was selected! The Buzzly team helped me refine it and now I'm working with a local business to test it.",
    award: "Power Idea",
  },
]

export const ChallengeSubmission = ({ personalityType, onSubmit }: ChallengeSubmissionProps) => {
  const [idea, setIdea] = useState("")
  const challenge = challengesByPersonality[personalityType]

  // Calculate idea quality based on length
  const getIdeaQuality = () => {
    const length = idea.trim().length
    if (length === 0) return { text: "Start typing...", color: "text-gray-400" }
    if (length < 100) return { text: "Keep going! Add more details...", color: "text-yellow-300" }
    if (length < 250) return { text: "Good start! More details improve your chances!", color: "text-lime-300" }
    if (length < 400) return { text: "Great idea! Very detailed!", color: "text-lime-400" }
    return { text: "Excellent! Your detailed idea stands out!", color: "text-lime-400 font-bold" }
  }

  const ideaQuality = getIdeaQuality()

  const handleSubmit = async () => {
    if (idea.trim().length > 0) {
      await fetch("/api/save", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          idea,
          personalityType,
        }),
      })
      onSubmit()
    }
  }

  return (
    <div className="bg-indigo-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold text-lime-400">Your Buzzly Challenge</h2>
        <div className="bg-yellow-400 text-indigo-900 px-4 py-1 rounded-full font-bold flex items-center">
          <Zap className="mr-1 w-4 h-4" /> Win Money!
        </div>
      </div>

      <div className="bg-indigo-700 rounded-lg p-6 mb-6">
        <h3 className="text-xl font-bold mb-2">{challenge.title}</h3>
        <p className="text-lg">{challenge.description}</p>
      </div>

      <div className="mb-4">
        <div className="bg-indigo-900 p-4 rounded-lg border-l-4 border-yellow-400 mb-4">
          <div className="flex items-start">
            <LightbulbIcon className="text-yellow-400 w-6 h-6 mr-2 flex-shrink-0 mt-1" />
            <p className="text-white">
              <span className="font-bold text-yellow-400">Pro Tip:</span> Detailed, well-thought-out ideas have a much
              higher chance of winning! The more specific your solution, the better your chances of receiving a cash
              prize.
            </p>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <h3 className="text-xl font-bold">Submit Your Idea:</h3>
          <div className="flex items-center">
            <span className={ideaQuality.color + " mr-2"}>{ideaQuality.text}</span>
            <span className="text-lime-300">{idea.length}/500 characters</span>
          </div>
        </div>
        <Textarea
          value={idea}
          onChange={(e) => setIdea(e.target.value)}
          placeholder="Share your creative solution here... Be specific and detailed for a better chance to win!"
          className="min-h-[200px] bg-indigo-700 border-lime-400 text-white"
          maxLength={500}
        />
      </div>

      <div className="bg-indigo-900 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-lime-400 flex items-center">
          <Sparkles className="mr-2" /> Money Incentives
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-indigo-800 p-4 rounded-lg border border-yellow-400">
            <div className="text-yellow-400 font-bold text-lg mb-1">
              Power Idea: $50 <span className="text-sm text-white">(2x to be claimed)</span>
            </div>
            <div className="text-sm">
              High-impact, meaningful, and solution-focused. May lead to real-world action or deeper support.
            </div>
          </div>
          <div className="bg-indigo-800 p-4 rounded-lg border border-lime-400">
            <div className="text-lime-400 font-bold text-lg mb-1">
              Awesome Idea: $10 <span className="text-sm text-white">(5x to be claimed)</span>
            </div>
            <div className="text-sm">Creative, fun, and inspiring. Gets praise and encouragement.</div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <MessageSquare className="mr-2" /> From Previous Winners
        </h3>
        <div className="space-y-4">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-indigo-700 p-4 rounded-lg">
              <p className="italic mb-2">"{testimonial.quote}"</p>
              <div className="flex justify-between">
                <div className="font-bold">
                  {testimonial.name}, {testimonial.age}
                </div>
                <div className="text-lime-300 text-sm">{testimonial.award} Winner</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={idea.trim().length === 0}
          className="bg-lime-400 text-indigo-900 hover:bg-lime-300 px-8 py-6 text-xl font-bold"
        >
          Submit Your Idea <Zap className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
