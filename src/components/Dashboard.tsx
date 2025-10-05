import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Progress } from "./ui/progress";
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
import { BookOpen, Brain, Clock, Plus } from "lucide-react";

// Sample data for the dashboard
const studyData = [
  { day: "Mon", minutes: 45 },
  { day: "Tue", minutes: 80 },
  { day: "Wed", minutes: 60 },
  { day: "Thu", minutes: 90 },
  { day: "Fri", minutes: 55 },
  { day: "Sat", minutes: 30 },
  { day: "Sun", minutes: 30 },
];

const progressData = [
  { subject: "Mathematics", progress: 78 },
  { subject: "Computer Science", progress: 92 },
  { subject: "History", progress: 45 },
  { subject: "Biology", progress: 63 },
];

const recentNotes = [
  { id: 1, title: "Neural Networks", date: "Oct 3, 2025", cards: 42 },
  { id: 2, title: "World War II", date: "Oct 2, 2025", cards: 28 },
  { id: 3, title: "Cell Biology", date: "Sep 29, 2025", cards: 36 },
];

interface DashboardProps {
  onNavigate: (view: string) => void;
  username?: string;
}

export function Dashboard({ onNavigate, username }: DashboardProps) {
  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50/30 via-purple-50/30 to-green-50/30">
      {/*Top Bar*/}
      <header className="bg-white border-b border-border px-8 py-4">
        <div className="flex justify-between items-center">
          <div>
            <h1>Welcome back, {username}! 👋</h1>
            <p className="text-muted-foreground">
              Let&#39;s make today productive
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Quick Actions */}
        <div className="mb-8">
          <Button
            onClick={() => onNavigate("notes")}
            size="lg"
            className="bg-purple-600 hover:bg-purple-700 rounded-xl shadow-lg"
          >
            <Plus className="w-5 h-5 mr-2" />
            Start New Study Session
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center">
                <Clock className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-green-600">+12%</span>
            </div>
            <p className="text-3xl mb-1">390</p>
            <p className="text-muted-foreground">Minutes this week</p>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-purple-100 flex items-center justify-center">
                <Brain className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-green-600">+8%</span>
            </div>
            <p className="text-3xl mb-1">142</p>
            <p className="text-muted-foreground">Cards mastered</p>
          </Card>

          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <div className="flex items-start justify-between mb-4">
              <div className="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600">+3</span>
            </div>
            <p className="text-3xl mb-1">12</p>
            <p className="text-muted-foreground">Active note sets</p>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Study Time Chart */}
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <h3 className="mb-6">Study Time This Week</h3>
            <ResponsiveContainer width="100%" height={200}>
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

          {/* Subject Progress */}
          <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
            <h3 className="mb-6">Subject Progress</h3>
            <div className="space-y-5">
              {progressData.map((subject) => (
                <div key={subject.subject}>
                  <div className="flex justify-between mb-2">
                    <span>{subject.subject}</span>
                    <span className="text-muted-foreground">
                      {subject.progress}%
                    </span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Recent Notes */}
        <Card className="p-6 rounded-2xl border-0 shadow-lg bg-white">
          <div className="flex justify-between items-center mb-6">
            <h3>Recent Notes</h3>
            <Button variant="ghost" onClick={() => onNavigate("notes")}>
              View All
            </Button>
          </div>
          <div className="space-y-3">
            {recentNotes.map((note) => (
              <button
                key={note.id}
                onClick={() => onNavigate("flashcards")}
                className="w-full p-4 rounded-xl bg-accent hover:bg-accent/80 transition-all flex items-center justify-between"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                    <BookOpen className="w-5 h-5 text-purple-600" />
                  </div>
                  <div className="text-left">
                    <p>{note.title}</p>
                    <p className="text-sm text-muted-foreground">{note.date}</p>
                  </div>
                </div>
                <div className="text-sm text-muted-foreground">
                  {note.cards} cards
                </div>
              </button>
            ))}
          </div>
        </Card>
      </main>
    </div>
  );
}
