"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Dashboard } from "@/components/Dashboard";
import { createClient } from "@/lib/supabase/client";

export default function DashboardPage() {
  const router = useRouter();
  const [username, setUsername] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    const fetchUser = async () => {
      const supabase = createClient();
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Redirect to login if not authenticated
        router.push("/login");
        return;
      }
      
      // Set username from session
      setUsername(session?.user?.email || session?.user?.user_metadata?.name || "User");
      setIsLoading(false);
    };
    
    fetchUser();
  }, [router]);
  
  // Handle navigation within the dashboard
  const handleNavigate = (view: string) => {
    switch(view) {
      case "notes":
        // TODO: Implement notes navigation
        alert("Notes feature coming soon!");
        break;
      case "flashcards":
        // TODO: Implement flashcards navigation
        alert("Flashcards feature coming soon!");
        break;
      default:
        console.log(`Navigation to ${view} not implemented`);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl">Loading dashboard...</div>
      </div>
    );
  }
  
  return (
    <Dashboard
      username={username}
      onNavigate={handleNavigate}
    />
  );
}
