"use client"

import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

interface BuzzlyIntroProps {
  onStart: () => void
}

export function BuzzlyIntro({ onStart }: BuzzlyIntroProps) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center max-w-2xl">
      <div className="mb-6 flex justify-center">
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 20,
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
            duration: 2,
          }}
        >
          {/* Buzzly Logo */}
          <div className="w-32 h-32 bg-yellow-400 rounded-full flex items-center justify-center mb-4 mx-auto">
            <span className="text-5xl font-bold text-black">B</span>
          </div>
        </motion.div>
      </div>

      <h1 className="text-4xl font-bold mb-4 text-purple-800">Welcome to Buzzly!</h1>

      <div className="bg-gradient-to-r from-yellow-100 to-yellow-200 p-4 rounded-lg mb-6">
        <p className="text-xl mb-4">
          Buzzly is a platform where <span className="font-bold">YOUR IDEAS</span> can make a real difference in
          fighting climate change!
        </p>
        <p className="text-lg mb-2">🌍 Submit your best climate solutions</p>
        <p className="text-lg mb-2">
          💰 Win cash prizes: <span className="font-bold text-green-600">$50</span> for Power Ideas and{" "}
          <span className="font-bold text-amber-500">$10</span> for Awesome Ideas
        </p>
        <p className="text-lg">🚀 Join a community of young climate leaders</p>
      </div>

      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-3 text-purple-700">How It Works:</h2>
        <ol className="text-left list-decimal list-inside space-y-2">
          <li>Spin the Wheel of Fortune to get your climate challenge</li>
          <li>Complete a fun interactive challenge</li>
          <li>Discover your Climate Leader personality type</li>
          <li>Submit your innovative climate solution</li>
          <li>Win prizes and join the Buzzly community!</li>
        </ol>
      </div>

      <div className="mb-6">
        <div className="text-lg font-semibold mb-2">Available Prizes:</div>
        <div className="flex justify-center gap-8">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">$50</div>
            <div>Power Idea (3 available)</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-amber-500">$10</div>
            <div>Awesome (5 available)</div>
          </div>
        </div>
      </div>

      <Button size="lg" className="mt-4 bg-purple-600 hover:bg-purple-700 text-xl px-8 py-6" onClick={onStart}>
        Let's Get Started!
      </Button>
    </motion.div>
  )
}
