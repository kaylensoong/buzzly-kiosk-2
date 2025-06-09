"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Sparkles, Mail, Phone, QrCode } from "lucide-react"
import Image from "next/image"
import Frame from "./frame.png"

interface ContactCollectionProps {
  onSubmit: (data: { email: string; phone: string }) => void
}

export const ContactCollection = ({ onSubmit }: ContactCollectionProps) => {
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [isValid, setIsValid] = useState(false)

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value
    setEmail(newEmail)
    setIsValid(validateEmail(newEmail))
  }

  const getLastPersonality = async () => {
    try {
      const response = await fetch('/api/csv')
      if (!response.ok) throw new Error('Failed to fetch CSV')
      const data = await response.json()
      return data.personalityType
    } catch (error) {
      console.error('Error fetching personality type:', error)
      return ''
    }
  }

  const handleSubmit = async () => {
    if (!isValid) return
    console.log("Submitting...")

    const personalityType = await getLastPersonality()
    console.log("Latest Personality Type:", personalityType)

    try {
      // Step 1: Append personality type to Google Sheet
      const formDataAppend = new FormData()
      formDataAppend.append('personalityType', personalityType)
      formDataAppend.append('action', 'append')

      await fetch('https://script.google.com/macros/s/AKfycbwPhpue9JIu8EBVg4F1I5NydlnEbwsjDVR96_Jt5QI_FNv0GaNOucu1B_0QJ1LMk50/exec', {
        method: 'POST',
        body: formDataAppend,
        mode: 'no-cors'
      })

      // Step 2: Update the latest row with email and phone
      const formDataUpdate = new FormData()
      formDataUpdate.append('email', email)
      formDataUpdate.append('phone', phone)
      formDataUpdate.append('action', 'update')

      await fetch('https://script.google.com/macros/s/AKfycbwPhpue9JIu8EBVg4F1I5NydlnEbwsjDVR96_Jt5QI_FNv0GaNOucu1B_0QJ1LMk50/exec', {
        method: 'POST',
        body: formDataUpdate,
        mode: 'no-cors'
      })

      onSubmit({ email, phone })
      console.log("Submission complete")
    } catch (error) {
      console.error("Submission error:", error)
    }
  }

  return (
    <div className="bg-indigo-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-white">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-lime-400 text-indigo-900 px-6 py-2 rounded-full font-bold text-xl flex items-center">
          <Sparkles className="mr-2" /> Contact Collection
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Almost there!</h2>
        <p className="text-lg">Leave your contact details to receive the awards!</p>
      </div>

      <div className="bg-indigo-700 rounded-lg p-6 mb-8">
        <div className="space-y-4">
          <div>
            <Label htmlFor="email" className="text-white flex items-center mb-2">
              <Mail className="mr-2 w-4 h-4" /> Email Address (required)
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              placeholder="your.email@example.com"
              className="bg-indigo-600 border-lime-400 text-white"
              required
            />
            {email && !isValid && <p className="text-red-400 text-sm mt-1">Please enter a valid email address</p>}
          </div>

          <div>
            <Label htmlFor="phone" className="text-white flex items-center mb-2">
              <Phone className="mr-2 w-4 h-4" /> Phone Number (optional)
            </Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="(+64) 123 456 789"
              className="bg-indigo-600 border-lime-400 text-white"
            />
          </div>

          <div className="flex flex-col items-center justify-center mt-6 space-y-2">
            <div className="flex items-center">
              <QrCode className="w-8 h-8 text-lime-400 mr-3" />
              <p className="text-lime-300">Scan the QR code to sign up to gain the in-person awards!</p>
            </div>
            <Image src={Frame} alt="QR Code" width={128} height={128} />
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        <Button
          onClick={handleSubmit}
          disabled={!isValid}
          className="bg-lime-400 text-indigo-900 hover:bg-lime-300 px-8 py-6 text-xl font-bold"
        >
          Submit & Get Your Reward <Sparkles className="ml-2" />
        </Button>
      </div>
    </div>
  )
}