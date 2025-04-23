"use client"

import { useEffect, useState } from "react"

export const ConfettiEffect = () => {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    // Load confetti script
    const confettiScript = document.createElement("script")
    confettiScript.src = "https://cdn.jsdelivr.net/npm/canvas-confetti@1.5.1/dist/confetti.browser.min.js"
    confettiScript.async = true
    document.body.appendChild(confettiScript)

    confettiScript.onload = () => {
      setLoaded(true)
    }

    return () => {
      document.body.removeChild(confettiScript)
    }
  }, [])

  useEffect(() => {
    if (loaded) {
      // Fire confetti
      // @ts-ignore
      const myConfetti = window.confetti.create(undefined, { resize: true })

      myConfetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      })

      // Fire again after a short delay
      setTimeout(() => {
        myConfetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
        })
      }, 250)

      setTimeout(() => {
        myConfetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
        })
      }, 400)
    }
  }, [loaded])

  return null
}
