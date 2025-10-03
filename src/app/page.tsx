"use client";

import { useRouter } from "next/navigation";
import { LandingPage } from "@/components/LandingPage";

export default function App() {
  const router = useRouter();

  return (
    <LandingPage
      onLogin={() => router.push("/login")}
      onSignup={() => router.push("/signup")}
    />
  );
}
