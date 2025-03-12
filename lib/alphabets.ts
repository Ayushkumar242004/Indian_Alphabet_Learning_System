export interface Alphabet {
  character: string
  name: string
  pronunciation: string
  audio: string
  strokes: string[]
}

// Sample Hindi alphabets with SVG path data for strokes
// In a real implementation, this would include all alphabets with accurate stroke data
export const alphabets: Alphabet[] = [
  {
    character: "अ",
    name: "अ (a)",
    pronunciation: "Pronounced as 'a' in 'about'",
    audio: "a.mp3",
    strokes: ["M30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 C20,60 20,40 30,30", "M70,30 L70,70"],
  },
  {
    character: "आ",
    name: "आ (aa)",
    pronunciation: "Pronounced as 'a' in 'father'",
    audio: "aa.mp3",
    strokes: [
      "M20,30 C30,20 50,20 60,30 C70,40 70,60 60,70 C50,80 30,80 20,70 C10,60 10,40 20,30",
      "M60,30 L60,70",
      "M75,20 C85,30 85,70 75,80",
    ],
  },
  {
    character: "इ",
    name: "इ (i)",
    pronunciation: "Pronounced as 'i' in 'sit'",
    audio: "i.mp3",
    strokes: ["M50,20 L50,80", "M30,30 C40,20 60,20 70,30"],
  },
  {
    character: "ई",
    name: "ई (ee)",
    pronunciation: "Pronounced as 'ee' in 'feet'",
    audio: "ee.mp3",
    strokes: ["M40,20 L40,80", "M20,30 C30,20 50,20 60,30", "M70,40 C80,50 80,70 70,80"],
  },
  {
    character: "उ",
    name: "उ (u)",
    pronunciation: "Pronounced as 'u' in 'put'",
    audio: "u.mp3",
    strokes: ["M30,30 C40,20 60,20 70,30", "M50,30 L50,70", "M30,70 C40,80 60,80 70,70"],
  },
  {
    character: "ऊ",
    name: "ऊ (oo)",
    pronunciation: "Pronounced as 'oo' in 'boot'",
    audio: "oo.mp3",
    strokes: ["M20,30 C30,20 50,20 60,30", "M40,30 L40,70", "M20,70 C30,80 50,80 60,70", "M70,40 C80,50 80,70 70,80"],
  },
  {
    character: "ए",
    name: "ए (e)",
    pronunciation: "Pronounced as 'e' in 'bed'",
    audio: "e.mp3",
    strokes: ["M30,30 L70,30", "M50,30 L50,70", "M30,70 L70,70"],
  },
  {
    character: "ऐ",
    name: "ऐ (ai)",
    pronunciation: "Pronounced as 'ai' in 'fair'",
    audio: "ai.mp3",
    strokes: ["M20,30 L60,30", "M40,30 L40,70", "M20,70 L60,70", "M70,20 C80,30 80,70 70,80"],
  },
  {
    character: "ओ",
    name: "ओ (o)",
    pronunciation: "Pronounced as 'o' in 'go'",
    audio: "o.mp3",
    strokes: ["M30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 C20,60 20,40 30,30", "M20,20 L80,20"],
  },
  {
    character: "औ",
    name: "औ (au)",
    pronunciation: "Pronounced as 'au' in 'caught'",
    audio: "au.mp3",
    strokes: [
      "M30,30 C40,20 60,20 70,30 C80,40 80,60 70,70 C60,80 40,80 30,70 C20,60 20,40 30,30",
      "M20,20 L80,20",
      "M85,30 C95,40 95,60 85,70",
    ],
  },
]

