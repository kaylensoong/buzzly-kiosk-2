"use client"
import { Sparkles } from "lucide-react"
import type { PersonalityType } from "@/components/buzzly-game"
import Image from "next/image"

interface AnimalSelectionProps {
  personalityType: PersonalityType
  onAnimalSelected: (animalImage: string) => void
}

const animalOptions = [
  { name: "Cool Cat", image: "/cat1.png" },
  { name: "Smart Cat", image: "/cat2.png" },
  { name: "Happy Cat", image: "/cat3.png" },
  { name: "Friendly Dog", image: "/dog1.png" },
  { name: "Wise Dog", image: "/dog2.png" },
  { name: "Adventure Dog", image: "/dog3.png" },
]

export const AnimalSelection = ({ personalityType, onAnimalSelected }: AnimalSelectionProps) => {
  return (
    <div className="bg-indigo-800 rounded-xl p-6 md:p-8 max-w-3xl mx-auto text-white">
      <div className="flex items-center justify-center mb-6">
        <div className="bg-lime-400 text-indigo-900 px-6 py-2 rounded-full font-bold text-xl flex items-center">
          <Sparkles className="mr-2" /> Choose Your Animal Avatar
        </div>
      </div>

      <div className="text-center mb-6">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Pick Your Avatar!</h2>
        <p className="text-lg">Choose an animal that represents your {personalityType} personality!</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
        {animalOptions.map((animal, index) => (
          <button
            key={index}
            onClick={() => onAnimalSelected(animal.image)}
            className="bg-indigo-700 hover:bg-indigo-600 rounded-lg p-6 transition-all border-2 border-transparent hover:border-lime-400 transform hover:scale-105"
          >
            <Image
              src={animal.image || "/placeholder.svg"}
              alt={animal.name}
              width={120}
              height={120}
              className="rounded-full mx-auto mb-3 border-2 border-lime-400"
            />
            <p className="font-bold text-center text-lg">{animal.name}</p>
          </button>
        ))}
      </div>

      <div className="bg-indigo-700 rounded-lg p-4 text-center">
        <p className="text-lime-300">
          <span className="font-bold">Tip:</span> Your avatar will represent you as a climate leader!
        </p>
      </div>
    </div>
  )
}
