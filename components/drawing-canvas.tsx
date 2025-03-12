"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, Eraser } from "lucide-react"
import type { Alphabet } from "@/lib/alphabets"
import confetti from "canvas-confetti"

interface DrawingCanvasProps {
  alphabet: Alphabet
  onComplete: (accuracy: number) => void
}

export default function DrawingCanvas({ alphabet, onComplete }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [strokes, setStrokes] = useState<Array<{ x: number; y: number; isDrawing: boolean }>>([])
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const context = canvas.getContext("2d")
    if (!context) return

    // Set canvas size
    canvas.width = canvas.offsetWidth
    canvas.height = canvas.offsetHeight

    // Set line style
    context.lineWidth = 8
    context.lineCap = "round"
    context.lineJoin = "round"
    context.strokeStyle = "#8b5cf6"

    setCtx(context)

    // Clear canvas when alphabet changes
    clearCanvas()

    // Draw guide pattern
    drawGuidePattern(context, alphabet)
  }, [alphabet])

  const clearCanvas = () => {
    if (!ctx || !canvasRef.current) return
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
    setStrokes([])
    setFeedback(null)

    // Redraw guide pattern
    if (ctx && alphabet) {
      drawGuidePattern(ctx, alphabet)
    }
  }

  const drawGuidePattern = (context: CanvasRenderingContext2D, alphabet: Alphabet) => {
    // Draw a faint guide pattern based on the alphabet
    context.save()
    context.globalAlpha = 0.15
    context.lineWidth = 6
    context.strokeStyle = "#6366f1"

    // Draw guide strokes
    alphabet.strokes.forEach((stroke) => {
      const path = new Path2D(stroke)
      context.stroke(path)
    })

    context.restore()
  }

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true)

    const canvas = canvasRef.current
    if (!canvas || !ctx) return

    const rect = canvas.getBoundingClientRect()
    const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left
    const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top

    ctx.beginPath()
    ctx.moveTo(x, y)

    setStrokes((prev) => [...prev, { x, y, isDrawing: false }])
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !ctx || !canvasRef.current) return

    const rect = canvasRef.current.getBoundingClientRect()
    const x = e instanceof MouseEvent ? e.clientX - rect.left : e.touches[0].clientX - rect.left
    const y = e instanceof MouseEvent ? e.clientY - rect.top : e.touches[0].clientY - rect.top

    ctx.lineTo(x, y)
    ctx.stroke()

    setStrokes((prev) => [...prev, { x, y, isDrawing: true }])
  }

  const endDrawing = () => {
    setIsDrawing(false)
    if (ctx) ctx.closePath()

    // Analyze drawing and provide feedback
    analyzeDrawing()
  }

  const analyzeDrawing = () => {
    // Simulate AI analysis of the drawing
    // In a real implementation, this would use a CNN to compare with the correct stroke pattern

    // For demo purposes, generate a random accuracy score between 60-100
    const accuracy = Math.floor(Math.random() * 41) + 60

    // Provide feedback based on accuracy
    if (accuracy > 80) {
      setFeedback("correct")

      // Trigger confetti for good performance
      if (canvasRef.current) {
        const canvas = canvasRef.current
        const rect = canvas.getBoundingClientRect()

        confetti({
          particleCount: 100,
          spread: 70,
          origin: {
            x: (rect.left + rect.width / 2) / window.innerWidth,
            y: (rect.top + rect.height / 2) / window.innerHeight,
          },
        })
      }
    } else {
      setFeedback("incorrect")
    }

    // Call the onComplete callback with the accuracy score
    onComplete(accuracy)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-full border-4 rounded-2xl overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 shadow-inner border-purple-300">
        {/* Feedback overlay */}
        {feedback && (
          <div
            className={`absolute inset-0 flex items-center justify-center bg-opacity-40 z-10 ${
              feedback === "correct" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            <div
              className={`rounded-full p-4 ${
                feedback === "correct" ? "bg-green-100" : "bg-red-100"
              } shadow-xl animate-bounce`}
            >
              {feedback === "correct" ? (
                <Check className="h-12 w-12 text-green-600" />
              ) : (
                <X className="h-12 w-12 text-red-600" />
              )}
            </div>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="w-full aspect-square touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={endDrawing}
          onMouseLeave={endDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={endDrawing}
        />
      </div>

      <Button
        variant="outline"
        size="lg"
        onClick={clearCanvas}
        className="mt-6 bg-gradient-to-r from-red-400 to-pink-400 hover:from-red-500 hover:to-pink-500 text-white border-none rounded-full px-6 shadow-md"
      >
        <Eraser className="h-4 w-4 mr-2" />
        Clear
      </Button>
    </div>
  )
}

