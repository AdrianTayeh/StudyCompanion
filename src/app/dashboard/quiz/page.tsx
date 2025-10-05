"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const quizQuestions = [
  {
    id: 1,
    question: "Which organelle is responsible for protein synthesis?",
    options: ["Mitochondria", "Ribosome", "Nucleus", "Golgi Apparatus"],
    correctAnswer: 1,
  },
  {
    id: 2,
    question: "What is the pH of a neutral solution?",
    options: ["5", "7", "9", "11"],
    correctAnswer: 1,
  },
  {
    id: 3,
    question: "Which molecule stores genetic information?",
    options: ["RNA", "Protein", "DNA", "Lipid"],
    correctAnswer: 2,
  },
  {
    id: 4,
    question: "What process breaks down glucose to release energy?",
    options: [
      "Photosynthesis",
      "Cellular Respiration",
      "Fermentation",
      "Diffusion",
    ],
    correctAnswer: 1,
  },
  {
    id: 5,
    question: "Which type of bond holds the two strands of DNA together?",
    options: [
      "Ionic bonds",
      "Covalent bonds",
      "Hydrogen bonds",
      "Metallic bonds",
    ],
    correctAnswer: 2,
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<Set<number>>(
    new Set()
  );

  const question = quizQuestions[currentQuestion];
  const progress = ((currentQuestion + 1) / quizQuestions.length) * 100;
  const isQuizComplete = answeredQuestions.size === quizQuestions.length;

  const handleSelectAnswer = (index: number) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
  };

  const handleSubmit = () => {
    if (selectedAnswer === null) return;

    setShowFeedback(true);
    const newAnsweredQuestions = new Set(answeredQuestions);
    newAnsweredQuestions.add(question.id);
    setAnsweredQuestions(newAnsweredQuestions);

    if (selectedAnswer === question.correctAnswer) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < quizQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedAnswer(null);
    setShowFeedback(false);
    setScore(0);
    setAnsweredQuestions(new Set());
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-green-50/30">
      {/* Top Bar */}
      <header className="bg-white border-b border-border px-8 py-4">
        <div>
          <h1>Biology Quiz - Cell Structure & Function</h1>
          <p className="text-muted-foreground">Test your knowledge</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-3xl mx-auto">
        {!isQuizComplete ? (
          <>
            {/* Progress */}
            <div className="mb-8">
              <div className="flex justify-between items-center mb-3">
                <span>
                  Question {currentQuestion + 1} of {quizQuestions.length}
                </span>
                <span className="text-muted-foreground">
                  Score: {score}/{answeredQuestions.size}
                </span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>

            {/* Question Card */}
            <Card className="p-8 rounded-3xl border-0 shadow-xl bg-white mb-6">
              <h2 className="mb-8">{question.question}</h2>

              <div className="space-y-3">
                {question.options.map((option, index) => {
                  const isSelected = selectedAnswer === index;
                  const isCorrectAnswer = index === question.correctAnswer;
                  const shouldShowCorrect = showFeedback && isCorrectAnswer;
                  const shouldShowIncorrect =
                    showFeedback && isSelected && !isCorrect;

                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectAnswer(index)}
                      disabled={showFeedback}
                      className={cn(
                        "w-full p-4 rounded-xl border-2 text-left transition-all flex items-center justify-between",
                        !showFeedback &&
                          !isSelected &&
                          "border-border bg-white hover:border-purple-300 hover:bg-purple-50",
                        !showFeedback &&
                          isSelected &&
                          "border-purple-500 bg-purple-100",
                        shouldShowCorrect && "border-green-500 bg-green-100",
                        shouldShowIncorrect && "border-red-500 bg-red-100"
                      )}
                    >
                      <span>{option}</span>
                      {shouldShowCorrect && (
                        <Check className="w-5 h-5 text-green-600" />
                      )}
                      {shouldShowIncorrect && (
                        <X className="w-5 h-5 text-red-600" />
                      )}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div
                  className={cn(
                    "mt-6 p-4 rounded-xl",
                    isCorrect
                      ? "bg-green-50 border border-green-200"
                      : "bg-red-50 border border-red-200"
                  )}
                >
                  <p className={isCorrect ? "text-green-700" : "text-red-700"}>
                    {isCorrect
                      ? "✓ Correct! Great job!"
                      : "✗ Incorrect. The correct answer is highlighted above."}
                  </p>
                </div>
              )}
            </Card>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3">
              {!showFeedback ? (
                <Button
                  size="lg"
                  onClick={handleSubmit}
                  disabled={selectedAnswer === null}
                  className="bg-purple-600 hover:bg-purple-700 rounded-xl"
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  size="lg"
                  onClick={handleNext}
                  disabled={currentQuestion === quizQuestions.length - 1}
                  className="bg-purple-600 hover:bg-purple-700 rounded-xl"
                >
                  Next Question
                </Button>
              )}
            </div>
          </>
        ) : (
          <Card className="p-12 rounded-3xl border-0 shadow-xl bg-white text-center">
            <div className="mb-6">
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" />
              </div>
              <h2 className="mb-4">Quiz Complete! 🎉</h2>
              <p className="text-4xl mb-2">
                {score}/{quizQuestions.length}
              </p>
              <p className="text-muted-foreground">
                {score === quizQuestions.length
                  ? "Perfect score! You're a master!"
                  : score >= quizQuestions.length * 0.7
                  ? "Great job! Keep up the good work!"
                  : "Good effort! Review the material and try again."}
              </p>
            </div>

            <div className="flex gap-3 justify-center">
              <Button
                size="lg"
                onClick={handleRestart}
                className="bg-purple-600 hover:bg-purple-700 rounded-xl"
              >
                Retake Quiz
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl">
                Review Answers
              </Button>
            </div>
          </Card>
        )}
      </main>
    </div>
  );
}
