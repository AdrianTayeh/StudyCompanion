import {
  Home,
  BookOpen,
  Brain,
  FileText,
  TrendingUp,
  LogOut,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppSidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

export function AppSidebar({
  currentView,
  onNavigate,
  onLogout,
}: AppSidebarProps) {
  const navItems = [
    { id: "dashboard", label: "Dashboard", icon: Home },
    { id: "notes", label: "My Notes", icon: FileText },
    { id: "flashcards", label: "Flashcards", icon: Brain },
    { id: "quiz", label: "Quiz Mode", icon: BookOpen },
    { id: "progress", label: "Progress", icon: TrendingUp },
  ];

  return (
    <aside className="w-64 bg-white border-r border-border flex flex-col h-screen">
      {/* Logo */}
      <div className="p-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Brain className="w-8 h-8 text-purple-600" />
          <span className="text-xl">Study Companion</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                    currentView === item.id
                      ? "bg-purple-100 text-purple-700"
                      : "text-muted-foreground hover:bg-accent hover:text-foreground"
                  )}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout */}
      <div className="p-4 border-t border-border">
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-muted-foreground hover:bg-accent hover:text-foreground transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span>Log Out</span>
        </button>
      </div>
    </aside>
  );
}
