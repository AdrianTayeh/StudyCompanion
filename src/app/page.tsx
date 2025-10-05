"use client";

import { useRouter } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";
import { createClient } from "@/lib/supabase/client";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState<string | undefined>();

  useEffect(() => {
    const supabase = createClient();
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setUsername(session?.user?.email || session?.user?.user_metadata?.name);
    });
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    try {
      await supabase.auth.signOut();
      setIsLoggedIn(false);
      setUsername(undefined);
      router.push("/"); // Redirect to home page after logout
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <LandingPage
      isLoggedIn={isLoggedIn}
      username={username}
      onLogin={() => router.push("/login")}
      onSignup={() => router.push("/signup")}
      onDashboard={() => router.push("/dashboard")}
      onLogout={() => handleLogout()}
    />
  );
}
