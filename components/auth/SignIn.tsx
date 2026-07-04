"use client";

import Image from "next/image";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaTwitch, FaMicrosoft } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { PiSignInBold } from "react-icons/pi";
import { type ReactNode } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";

const getGoogleAuthUrl = () => {
  const rawBaseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const normalizedBaseUrl = rawBaseUrl.replace(/\/$/, "");
  const apiBaseUrl = normalizedBaseUrl.endsWith("/api")
    ? normalizedBaseUrl
    : `${normalizedBaseUrl}/api`;

  return `${apiBaseUrl}/auth/google`;
};

export default function SignIn() {
  return (
    <Dialog modal={true}>
      <DialogTrigger className="flex cursor-pointer items-center gap-x-2 border-none bg-transparent px-2 py-4 text-dm-text-secondary outline-hidden transition-colors duration-500 hover:text-dm-text-primary">
        <PiSignInBold size={24} aria-hidden="true" />
        <span className="hidden 770:block">SIGN IN</span>
      </DialogTrigger>
      <DialogContent
        showCloseButton={true}
        className="w-full max-w-[950px] gap-0 overflow-hidden border-dm-border-subtle bg-surface-base p-0 duration-1000 ease-out data-closed:animate-out data-closed:fade-out-0 data-closed:slide-out-to-bottom-[100%] data-open:animate-in data-open:fade-in-0 data-open:slide-in-from-bottom-[100%] sm:rounded-3xl"
      >
        <DialogTitle className="sr-only">Sign In</DialogTitle>
        <DialogDescription className="sr-only">
          Login to your account and join the world of games together
        </DialogDescription>

        <div className="grid min-h-[550px] grid-cols-1 md:grid-cols-2">
          {/* Left Column: Hero Image with Background */}
          <div className="relative hidden h-full w-full overflow-hidden md:block">
            <Image
              src="/modal-animate-bg.jpg"
              alt="Modal Background"
              fill
              className="object-cover"
              priority
            />

            <Image
              src="/modal-hero.webp"
              alt="Sign In Hero"
              fill
              className="z-10 object-cover"
              priority
            />

            <div className="absolute inset-0 z-20 bg-linear-to-t from-surface-base/80 to-transparent" />

            <div className="absolute right-8 bottom-12 left-8 z-30 rounded-2xl border border-white/10 bg-surface-base/40 p-6 backdrop-blur-md">
              <h3 className="mb-2 text-xl font-bold text-white">
                Get your Cashback
              </h3>
              <p className="text-sm leading-relaxed text-dm-text-secondary">
                Log in and get up to{" "}
                <span className="font-bold text-white">10%</span> cashback!
              </p>
            </div>
          </div>

          <div className="relative flex flex-col justify-center bg-[#161b26] p-8 md:p-12">
            <div className="mb-10">
              <h2 className="mb-3 text-3xl font-bold text-white">
                Log in to your account
              </h2>
              <p className="text-sm text-dm-text-secondary">
                Login to your account and join the world of games together
              </p>
            </div>

            <Button
              variant="default"
              className="mb-8 flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-white text-base font-bold text-black transition-all hover:bg-gray-200"
              onClick={async () => {
                try {
                  const { error } = await supabase.auth.signInWithOAuth({
                    provider: "google",
                    options: {
                      redirectTo: `${window.location.origin}/`,
                    },
                  });
                  if (error) throw error;
                } catch (err) {
                  console.error("Google sign in error:", err);
                }
              }}
            >
              <FcGoogle className="h-6 w-6" />
              <span>Log in with Google</span>
            </Button>

            <div className="mb-8 h-px w-full bg-white/10" />

            <div className="grid grid-cols-2 gap-4">
              <SocialButton
                icon={
                  <MdEmail
                    className="text-dm-text-secondary transition-colors group-hover:text-white"
                    size={20}
                  />
                }
                label="Email"
              />
              <SocialButton
                icon={
                  <FaFacebook
                    className="text-dm-text-secondary transition-colors group-hover:text-[#1877F2]"
                    size={20}
                  />
                }
                label="Facebook"
              />
              <SocialButton
                icon={
                  <FaTwitch
                    className="text-dm-text-secondary transition-colors group-hover:text-[#9146FF]"
                    size={20}
                  />
                }
                label="Twitch"
              />
              <SocialButton
                icon={
                  <FaMicrosoft
                    className="text-dm-text-secondary transition-colors group-hover:text-[#00A4EF]"
                    size={20}
                  />
                }
                label="Microsoft"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function SocialButton({ icon, label }: { icon: ReactNode; label: string }) {
  return (
    <Button
      variant="outline"
      className="group flex h-12 w-full items-center justify-center gap-3 rounded-lg border-none bg-[#1F2533] font-medium text-dm-text-secondary transition-all duration-300 hover:bg-[#2A3140] hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
