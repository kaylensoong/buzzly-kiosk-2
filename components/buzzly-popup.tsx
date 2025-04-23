"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Sparkles, Zap } from "lucide-react"
import Image from "next/image"

interface BuzzlyPopupProps {
  onClose: () => void
}

export const BuzzlyPopup = ({ onClose }: BuzzlyPopupProps) => {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    setVisible(true)

    // Auto-close after 10 seconds
    const timer = setTimeout(() => {
      handleClose()
    }, 10000)

    return () => clearTimeout(timer)
  }, [])

  const handleClose = () => {
    setVisible(false)
    setTimeout(() => {
      onClose()
    }, 300)
  }

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 transition-opacity duration-300 ${visible ? "opacity-100" : "opacity-0"}`}
    >
      <div className="absolute inset-0 bg-black bg-opacity-70" onClick={handleClose}></div>

      <div className="relative bg-indigo-800 rounded-xl p-8 max-w-2xl w-full mx-4 border-2 border-lime-400 shadow-2xl transform transition-all duration-300 scale-100">
        <div className="absolute -top-6 -right-6">
          <Sparkles className="text-yellow-300 w-12 h-12 animate-pulse" />
        </div>

        <div className="flex items-center justify-center mb-6">
          <Image src="/buzzly_logo.png" alt="Buzzly Logo" width={60} height={60} className="mr-3" />
          <h2 className="text-3xl font-bold text-lime-400">Why Buzzly?</h2>
        </div>

        <div className="text-white space-y-4">
          <p className="text-lg">
            Young people care deeply about climate change, but too often their voices are underrepresented in local
            decisions — especially in areas like infrastructure, water, food systems, and city planning.
          </p>

          <p className="text-lg">
            Buzzly aims to change that by creating a fun, interactive platform that helps young people:
          </p>

          <ul className="list-disc pl-6 space-y-2">
            <li>Learn, share opinions, and submit ideas</li>
            <li>See their input lead to real-world recognition and rewards</li>
            <li>Feel like their voice matters in the future of Auckland</li>
          </ul>

          <div className="bg-indigo-700 p-4 rounded-lg mt-6">
            <p className="font-bold text-lime-300 text-center">
              "How might we engage youth to think about, explore, and contribute ideas to future-focused climate
              decisions — in a way that feels fun, meaningful, and legitimate?"
            </p>
          </div>
        </div>

        <Button onClick={handleClose} className="mt-6 w-full bg-lime-400 text-indigo-900 hover:bg-lime-300">
          Let's Get Started! <Zap className="ml-2" />
        </Button>
      </div>
    </div>
  )
}
