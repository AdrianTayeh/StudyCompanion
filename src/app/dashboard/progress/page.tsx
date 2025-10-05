"use client";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import { BookOpen, Brain, Clock, TrendingUp } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const studyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 60 },
  { day: "Wed", minutes: 30 },
  { day: "Thu", minutes: 75 },
  { day: "Fri", minutes: 50 },
  { day: "Sat", minutes: 90 },
  { day: "Sun", minutes: 40 },
];

const progressData = [
  { subject: "Biology", progress: 85, cards: 142, quizzes: 8 },
  { subject: "Chemistry", progress: 72, cards: 98, quizzes: 5 },
  { subject: "Physics", progress: 68, cards: 76, quizzes: 4 },
  { subject: "Math", progress: 91, cards: 168, quizzes: 12 },
];

const weeklyProgress = [
  { week: "Week 1", score: 65 },
  { week: "Week 2", score: 72 },
  { week: "Week 3", score: 78 },
  { week: "Week 4", score: 85 },
];

export default function ProgressPage() {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-green-50/30">
      {/* Top Bar */}
      <header className="bg-white border-b border-border px-8 py-4">
        <div>
          <h1>Your Progress</h1>
          <p className="text-muted-foreground">Track your learning journey</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 max-w-6xl mx-auto">
        {/* Overall Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center mb-4">
              <Clock className="w-6 h-6 text-blue-600" />
            </div>
            <p className="text-3xl mb-1">390</p>
            <p className="text-muted-foreground">Minutes this week</p>
            <Badge className="mt-2 bg-green-100 text-green-700">+12%</Badge>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center mb-4">
              <Brain className="w-6 h-6 text-purple-600" />
            </div>
            <p className="text-3xl mb-1">484</p>
            <p className="text-muted-foreground">Total flashcards</p>
            <Badge className="mt-2 bg-green-100 text-green-700">+8%</Badge>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-green-600" />
            </div>
            <p className="text-3xl mb-1">29</p>
            <p className="text-muted-foreground">Quizzes completed</p>
            <Badge className="mt-2 bg-green-100 text-green-700">+3</Badge>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <div className="w-12 h-12 rounded-xl bg-orange-100 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-orange-600" />
            </div>
            <p className="text-3xl mb-1">79%</p>
            <p className="text-muted-foreground">Average score</p>
            <Badge className="mt-2 bg-green-100 text-green-700">+5%</Badge>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Study Time Chart */}
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <h3 className="mb-6">Study Time This Week</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={studyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Bar dataKey="minutes" fill="#9333ea" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Weekly Performance */}
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <h3 className="mb-6">Quiz Performance Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="week" stroke="#888" />
                <YAxis stroke="#888" />
                <Tooltip
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#9333ea"
                  strokeWidth={3}
                  dot={{ fill: "#9333ea", r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Subject Breakdown */}
        <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
          <h3 className="mb-6">Subject Breakdown</h3>
          <div className="space-y-6">
            {progressData.map((subject) => (
              <div key={subject.subject}>
                <div className="flex justify-between items-center mb-3">
                  <div>
                    <h4>{subject.subject}</h4>
                    <p className="text-sm text-muted-foreground">
                      {subject.cards} cards • {subject.quizzes} quizzes
                    </p>
                  </div>
                  <span className="text-2xl">{subject.progress}%</span>
                </div>
                <Progress value={subject.progress} className="h-3" />
              </div>
            ))}
          </div>
        </Card>

        {/* Study Streaks */}
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-purple-500 to-blue-500 text-white">
            <h3 className="mb-4 text-white">🔥 Current Streak</h3>
            <p className="text-5xl mb-2">7 days</p>
            <p className="text-purple-100">Keep it going! You&#39;re on fire!</p>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-gradient-to-br from-green-500 to-blue-500 text-white">
            <h3 className="mb-4 text-white">🏆 Longest Streak</h3>
            <p className="text-5xl mb-2">21 days</p>
            <p className="text-green-100">Your personal best!</p>
          </Card>
        </div>
      </main>
    </div>
  );
}
