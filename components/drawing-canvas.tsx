"use client"

import type React from "react"

import { useRef, useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Check, X, Eraser } from "lucide-react"
import type { Alphabet } from "@/lib/alphabets"
import confetti from "canvas-confetti"

interface DrawingCanvasProps {
  alphabet: Alphabet
  onComplete: (accuracy: number) => void;
  backgroundSvg: string; 
}

export default function DrawingCanvas({ alphabet, onComplete }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
  const [strokes, setStrokes] = useState<Array<{ x: number; y: number; isDrawing: boolean }>>([])
  const [feedback, setFeedback] = useState<"correct" | "incorrect" | null>(null)
  const [drawingTimeout, setDrawingTimeout] = useState<NodeJS.Timeout | null>(null);
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

    drawGuidePattern(ctx, alphabet);
  }

  const drawGuidePattern = (context: CanvasRenderingContext2D, alphabet: Alphabet) => {
    // Draw a faint guide pattern based on the alphabet
    context.save();
    context.globalAlpha = 0.15;
    context.lineWidth = 6;
    context.strokeStyle = "#6366f1";
  
    // Draw guide strokes
    alphabet.strokes.forEach((stroke) => {
      const path = new Path2D(stroke);
      context.stroke(path);
    });
  
    // Draw background letter
    context.globalAlpha = 0.2; // Make the text more faint
    context.font = "bold 180px Arial"; // Adjust font size as needed
    context.fillStyle = "#d1d5db"; // Light gray color
    context.textAlign = "center";
    context.textBaseline = "middle";
    const { width, height } = context.canvas;
  
    if (alphabet.character) {
      context.fillText(alphabet.character, width / 2, height / 2); // Centered letter
    }
  
    context.restore();
  };
  
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    
    // Clear any pending timeout since the child resumed drawing
    if (drawingTimeout) clearTimeout(drawingTimeout);

    const canvas = canvasRef.current;
    if (!canvas || !ctx) return;

    const rect = canvas.getBoundingClientRect();
    let x: number, y: number;

    if ("touches" in e) {
        x = e.touches[0].clientX - rect.left;
        y = e.touches[0].clientY - rect.top;
    } else {
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    ctx.beginPath();
    ctx.moveTo(x, y);

    setStrokes((prev) => [...prev, { x, y, isDrawing: false }]);
};


const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
  if (!isDrawing || !ctx || !canvasRef.current) return;

  const canvas = canvasRef.current;
  const rect = canvas.getBoundingClientRect();
  
  // Get the scale factor to handle different screen sizes
  const scaleX = canvas.width / rect.width;
  const scaleY = canvas.height / rect.height;

  let x: number, y: number;

  if ("touches" in e) {
      x = (e.touches[0].clientX - rect.left) * scaleX;
      y = (e.touches[0].clientY - rect.top) * scaleY;
  } else {
      x = (e.clientX - rect.left) * scaleX;
      y = (e.clientY - rect.top) * scaleY;
  }

  // If starting a new stroke after lifting the pen, reset the path
  if (strokes.length === 0 || !strokes[strokes.length - 1].isDrawing) {
      ctx.beginPath();
      ctx.moveTo(x, y);
  }

  ctx.lineTo(x, y);
  ctx.stroke();

  setStrokes((prev) => [...prev, { x, y, isDrawing: true }]);
};

const endDrawing = () => {
  setIsDrawing(false);
  if (ctx) ctx.closePath();

  // Wait 3 seconds before analyzing, unless the child starts drawing again
  const timeout = setTimeout(() => {
      analyzeDrawing();
  }, 3000);

  setDrawingTimeout(timeout);
};

const analyzeDrawing = () => {
  if (strokes.length < 5) {
      setFeedback("incorrect");
      onComplete(0);
      return;
  }

  // Calculate bounding box of strokes
  const xValues = strokes.map((s) => s.x);
  const yValues = strokes.map((s) => s.y);
  const minX = Math.min(...xValues);
  const maxX = Math.max(...xValues);
  const minY = Math.min(...yValues);
  const maxY = Math.max(...yValues);

  const width = maxX - minX;
  const height = maxY - minY;

  // Check if drawing covers a reasonable area
  if (width < 50 || height < 50) {
      setFeedback("incorrect");
      onComplete(10);
      return;
  }

  // Compare strokes with expected pattern (better check)
  const correctPattern = alphabet.strokes.length; // Expected strokes
  const drawnPattern = strokes.length;

  // New accuracy calculation with threshold
  let accuracy = (drawnPattern / correctPattern) * 100;

  // Ensure accuracy stays between 10% and 100%
  accuracy = Math.max(10, Math.min(100, accuracy));

  // Adjust feedback based on threshold
  if (accuracy >= 80) {
      setFeedback("correct");
      confetti({ particleCount: 100, spread: 70 });
  } else {
      setFeedback("incorrect");
  }

  onComplete(accuracy);
};


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

