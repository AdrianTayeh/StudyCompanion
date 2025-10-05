"use client";

import { AppSidebar } from "../../components/AppSidebar";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const getCurrentView = () => {
    if (pathname === "/dashboard") return "dashboard";
    if (pathname === "/dashboard/notes") return "notes";
    if (pathname === "/dashboard/flashcards") return "flashcards";
    if (pathname === "/dashboard/quiz") return "quiz";
    if (pathname === "/dashboard/progress") return "progress";
    return "dashboard";
  };

  const handleNavigate = (view: string) => {
    if (view === "dashboard") {
      router.push("/dashboard");
    } else {
      router.push(`/dashboard/${view}`);
    }
  };

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
      router.push("/");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <AppSidebar
        currentView={getCurrentView()}
        onNavigate={handleNavigate}
        onLogout={handleLogout}
      />
      {children}
    </div>
  );
}
