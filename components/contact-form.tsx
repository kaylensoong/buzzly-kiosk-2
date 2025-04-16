"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { motion } from "framer-motion"
import { CheckCircle, MessageSquare } from "lucide-react"

interface ContactFormProps {
  onSubmit: () => void
}

export function ContactForm({ onSubmit }: ContactFormProps) {
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [school, setSchool] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [showTestimonials, setShowTestimonials] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Simple validation
    if (!email.includes("@") || !name || !school) {
      setError("Please fill out all fields correctly.")
      return
    }

    setIsSubmitting(true)
    setError("")

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      onSubmit()
    }, 1500)
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl text-center text-purple-800">Claim Your Prize!</CardTitle>
          <CardDescription className="text-center">
            Enter your details to receive your prize and join the Buzzly community.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="school">School/College</Label>
              <Input
                id="school"
                value={school}
                onChange={(e) => setSchool(e.target.value)}
                placeholder="Your school or college"
                required
              />
            </div>

            {error && <div className="text-red-500 text-sm">{error}</div>}

            <div className="pt-2">
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600" disabled={isSubmitting}>
                {isSubmitting ? "Submitting..." : "Submit & Get Prize"}
              </Button>
            </div>

            <p className="text-xs text-center text-gray-500 mt-4">
              By submitting, you agree to receive information about Buzzly and future climate action opportunities.
            </p>

            <div className="pt-2">
              <Button
                type="button"
                variant="outline"
                className="w-full text-sm"
                onClick={() => setShowTestimonials(!showTestimonials)}
              >
                {showTestimonials ? "Hide" : "See"} what previous winners say
              </Button>
            </div>

            {showTestimonials && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="space-y-3 pt-2"
              >
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <MessageSquare className="h-4 w-4 text-yellow-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Jamie L.</p>
                      <p className="text-xs text-gray-500">Power Idea Winner</p>
                      <p className="text-sm mt-1">
                        "I won $50 for my community garden idea! Buzzly actually helped me connect with others to make
                        it happen."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-start">
                    <MessageSquare className="h-4 w-4 text-yellow-500 mr-2 mt-1" />
                    <div>
                      <p className="text-sm font-medium">Alex T.</p>
                      <p className="text-xs text-gray-500">Awesome Idea Winner</p>
                      <p className="text-sm mt-1">
                        "Got $10 for my recycling app concept! The Buzzly team was super supportive and I'm still
                        involved."
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-center">
                  <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                  <p className="text-xs text-green-600">All prizes verified and delivered within 2 weeks</p>
                </div>
              </motion.div>
            )}
          </form>
        </CardContent>
      </Card>
    </motion.div>
  )
}
