"use client";

import dynamic from "next/dynamic";
import { useAuth } from "@/contexts/AuthContext";

const SignIn = dynamic(() => import("@/components/auth/SignIn"));
const UserMenu = dynamic(() => import("@/components/auth/UserMenu"));

export default function SignInButton() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return null; // or a loading skeleton
  }

  if (user) {
    return <UserMenu user={user} />;
  }

  return <SignIn />;
}
