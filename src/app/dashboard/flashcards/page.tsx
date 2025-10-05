"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ChevronLeft, ChevronRight, RotateCw, Check, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const flashcards = [
  {
    id: 1,
    front: "What is photosynthesis?",
    back: "The process by which plants convert light energy into chemical energy, producing glucose and oxygen from carbon dioxide and water.",
  },
  {
    id: 2,
    front: "Define mitosis",
    back: "A type of cell division that results in two daughter cells, each having the same number and kind of chromosomes as the parent nucleus.",
  },
  {
    id: 3,
    front: "What are the four main macromolecules?",
    back: "Carbohydrates, Lipids, Proteins, and Nucleic Acids",
  },
  {
    id: 4,
    front: "What is the powerhouse of the cell?",
    back: "Mitochondria - they generate most of the cell's supply of ATP through cellular respiration.",
  },
  {
    id: 5,
    front: "Define osmosis",
    back: "The movement of water molecules across a semipermeable membrane from an area of lower solute concentration to an area of higher solute concentration.",
  },
];

export default function FlashcardsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [mastered, setMastered] = useState<Set<number>>(new Set());

  const currentCard = flashcards[currentIndex];
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  const handleNext = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const handleMastered = () => {
    setMastered(new Set([...mastered, currentCard.id]));
    handleNext();
  };

  const handleNeedsPractice = () => {
    handleNext();
  };

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-green-50/30">
      {/* Top Bar */}
      <header className="bg-white border-b border-border px-8 py-4">
        <div>
          <h1>Biology - Cell Structure</h1>
          <p className="text-muted-foreground">Review your flashcards</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-4xl mx-auto">
        {/* Progress */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-3">
            <span>
              Progress: {currentIndex + 1}/{flashcards.length}
            </span>
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              {mastered.size} Mastered
            </Badge>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Flashcard */}
        <div className="mb-8 perspective-1000">
          <Card
            onClick={() => setIsFlipped(!isFlipped)}
            className={`relative h-96 rounded-3xl border-0 shadow-2xl cursor-pointer transition-all duration-500 transform ${
              isFlipped ? "rotate-y-180" : ""
            }`}
            style={{
              transformStyle: "preserve-3d",
              transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
            }}
          >
            {/* Front */}
            <div
              className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center bg-gradient-to-br from-purple-500 to-blue-500 rounded-3xl"
              style={{
                backfaceVisibility: "hidden",
              }}
            >
              <RotateCw className="w-8 h-8 text-white/50 mb-6" />
              <p className="text-2xl text-white">{currentCard.front}</p>
              <p className="text-sm text-white/70 mt-6">
                Click to reveal answer
              </p>
            </div>

            {/* Back */}
            <div
              className="absolute inset-0 p-12 flex flex-col items-center justify-center text-center bg-white rounded-3xl"
              style={{
                backfaceVisibility: "hidden",
                transform: "rotateY(180deg)",
              }}
            >
              <Check className="w-8 h-8 text-green-500 mb-6" />
              <p className="text-xl">{currentCard.back}</p>
              <p className="text-sm text-muted-foreground mt-6">
                Click to flip back
              </p>
            </div>
          </Card>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Button
            variant="outline"
            size="lg"
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="rounded-xl"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>

          {isFlipped && (
            <>
              <Button
                variant="outline"
                size="lg"
                onClick={handleNeedsPractice}
                className="rounded-xl border-orange-300 text-orange-600 hover:bg-orange-50"
              >
                <X className="w-5 h-5 mr-2" />
                Need Practice
              </Button>
              <Button
                size="lg"
                onClick={handleMastered}
                className="rounded-xl bg-green-600 hover:bg-green-700"
              >
                <Check className="w-5 h-5 mr-2" />
                Mastered
              </Button>
            </>
          )}

          <Button
            variant="outline"
            size="lg"
            onClick={handleNext}
            disabled={currentIndex === flashcards.length - 1}
            className="rounded-xl"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Card Grid */}
        <div className="grid grid-cols-5 gap-3">
          {flashcards.map((card, index) => (
            <button
              key={card.id}
              onClick={() => {
                setCurrentIndex(index);
                setIsFlipped(false);
              }}
              className={`aspect-square rounded-xl border-2 transition-all ${
                index === currentIndex
                  ? "border-purple-500 bg-purple-100"
                  : mastered.has(card.id)
                  ? "border-green-300 bg-green-50"
                  : "border-border bg-white hover:border-purple-300"
              }`}
            >
              <span>{index + 1}</span>
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
