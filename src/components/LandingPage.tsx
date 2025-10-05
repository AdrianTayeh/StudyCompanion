import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { BookOpen, Brain, TrendingUp, Zap } from "lucide-react";

interface LandingPageProps {
  onLogin: () => void;
  onSignup: () => void;
  isLoggedIn?: boolean;
  username?: string;
  onDashboard?: () => void;
}

export function LandingPage({
  onLogin,
  onSignup,
  isLoggedIn = false,
  username,
  onDashboard = () => {},
}: LandingPageProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-green-10">
      {/*Header*/}
      <header className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          <span className="text-xl">Study Companion</span>
        </div>
        <div className="flex gap-3">
          {isLoggedIn ? (
            <Button
              onClick={onDashboard}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Dashboard
            </Button>
          ) : (
            <>
              <Button variant="ghost" onClick={onLogin}>
                Log In
              </Button>
              <Button
                onClick={onSignup}
                className="bg-purple-600 hover:bg-purple-700"
              >
                Sign Up
              </Button>
            </>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-6x mx-auto px-6 py-20 text-center">
        <div className="mb-8">
          <h1 className="text-5xl mb-6 bg-gradient-to-r from-purple-600 via-blue-600 to-green-600 bg-clip-text text-transparent">
            Turn your notes into smart study sessions
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Upload your notes and let AI generate interactive flashcards and
            quizzes. Track your progress and study smarter, not harder.
          </p>
        </div>
        <div className="flex gap-4 justify-center">
          {isLoggedIn ? (
            <Button
              onClick={onDashboard}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Go to dashboard
            </Button>
          ) : (
            <Button
              onClick={onLogin}
              size="lg"
              className="bg-purple-600 hover:bg-purple-700"
            >
              Log in to get started
            </Button>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-center mb-12">
          Everything you need to ace your studies
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-3">AI-Powered Flashcards</h3>
            <p className="text-muted-foreground">
              Automatically generate smart flashcards from your notes. Review
              and customize them to fit your learning style.
            </p>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="mb-3">Interactive Quizzes</h3>
            <p className="text-muted-foreground">
              Test your knowledge with auto-generated quizzes. Get instant
              feedback and learn from your mistakes.
            </p>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white/80 backdrop-blur">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="mb-3">Progress Tracking</h3>
            <p className="text-muted-foreground">
              Visualize your study progress with detailed charts and insights.
              Stay motivated and on track.
            </p>
          </Card>
        </div>
      </section>

      {/*CTA Seciton*/}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <Card className="p-12 rounded-3xl border-0 shadow-xl bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <h2 className="mb-4 text-white">Ready to transform your studying?</h2>
          <Button
            onClick={onSignup}
            size="lg"
            className="bg-white text-purple-600 hover:bg-gray-100"
          >
            Start Learning Today
          </Button>
        </Card>
      </section>
    </div>
  );
}
