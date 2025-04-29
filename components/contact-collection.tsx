"use client"

import type React from "react"

import { Resend } from 'resend';
import BuzzlySignupEmail from '@/emails/buzzlysignupemail';
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

    const handleSubmit = async (request: Request) => {
      console.log("Button Pressed")
      
      if (isValid) {
        console.log("Is valid!")
        await fetch("api/save", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, phone }),
        })
    
        onSubmit({ email, phone })

        await fetch('/api/send-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, phone }),
        });
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
        <p className="text-lg">Leave your contact details so we can notify you if you win and deliver your rewards!</p>
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

      <div className="bg-indigo-900 rounded-lg p-6 mb-8">
        <h3 className="text-xl font-bold mb-4 text-lime-400">What Previous Participants Say:</h3>
        <div className="space-y-4">
          <div className="bg-indigo-800 p-4 rounded-lg">
            <p className="italic mb-2">
              "I got my Buzzly badge instantly and was notified about my $50 win by email. The process was super
              easy!"
            </p>
            <div className="text-right text-lime-300 text-sm">- Jade, 19</div>
          </div>
          <div className="bg-indigo-800 p-4 rounded-lg">
            <p className="italic mb-2">
              "They emailed me about a workshop related to my idea. I met other young people who care about the same
              issues!"
            </p>
            <div className="text-right text-lime-300 text-sm">- Kahu, 16</div>
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
