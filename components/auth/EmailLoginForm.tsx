import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { IoArrowBack } from "react-icons/io5";
import { TfiEmail } from "react-icons/tfi";
import { GoShieldLock } from "react-icons/go";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { supabase } from "@/lib/supabase";
import { parseError } from "./auth-utils";
import SubmitButton from "./SubmitButton";
import { loginSchema, type LoginFormData } from "@/lib/schemas/auth.schema";

interface EmailLoginFormProps {
  onBack: () => void;
  onSignUpClick: () => void;
  onSuccess: (message: string) => void;
}

/**
 * Handles the login form submission via email and password credentials.
 * Manages user input validation, password visibility states, and form error display.
 */
export default function EmailLoginForm({
  onBack,
  onSignUpClick,
  onSuccess,
}: EmailLoginFormProps) {
  // Password visibility toggle state
  const [showPassword, setShowPassword] = useState(false);
  // Submission loading state
  const [loading, setLoading] = useState(false);
  // Error state from the API response
  const [apiError, setApiError] = useState<string | null>(null);

  // Initialize React Hook Form with Zod schema verification
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.input<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", rememberMe: false },
    mode: "onChange",
  });

  // Action executed upon submitting credentials
  const onSubmit = async (data: z.input<typeof loginSchema>) => {
    setLoading(true);
    setApiError(null);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: data.email,
        password: data.password,
      });

      if (error) throw error;

      // Persist success toast description in storage and notify parent component
      sessionStorage.setItem("auth_success_toast", "Logged in successfully!");
      onSuccess("Logged in successfully!");
    } catch (err: any) { // eslint-disable-line @typescript-eslint/no-explicit-any
      setApiError(parseError(err, "Invalid email or password. Please try again."));
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Return button back to the main Providers list */}
      <button
        onClick={onBack}
        className="mb-8 flex w-fit cursor-pointer items-center gap-2 text-sm text-dm-text-secondary transition-colors hover:text-white"
      >
        <IoArrowBack size={16} />
        <span>Back</span>
      </button>

      {/* Form title information */}
      <div className="mb-8">
        <h2 className="mb-2 text-3xl font-bold text-white">Log in to your account</h2>
        <p className="text-sm text-dm-text-secondary">
          Login to your account and join the world of games together
        </p>
      </div>

      {/* Main Email Login Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        {/* API response error alert */}
        {apiError && (
          <div className="rounded-lg border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
            {apiError}
          </div>
        )}

        {/* Email input field */}
        <div className="relative">
          <div 
            className={`flex h-[54px] items-center gap-3 rounded-xl border px-4 transition-all duration-200 ${
              errors.email 
                ? "border-red-500/50 bg-red-500/5 focus-within:border-red-500" 
                : "border-white/10 bg-[#1F2533] focus-within:border-white/30 focus-within:bg-[#252d3d]"
            }`}
          >
            <TfiEmail size={18} className={`shrink-0 ${errors.email ? "text-red-400" : "text-dm-text-secondary"}`} />
            <input
              type="email"
              placeholder="Your email"
              {...register("email")}
              className="flex-1 bg-transparent text-sm text-white placeholder-dm-text-secondary outline-none"
            />
          </div>
          {errors.email && (
            <p className="absolute -bottom-5 left-2 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        {/* Password input field */}
        <div className="relative">
          <div 
            className={`flex h-[54px] items-center gap-3 rounded-xl border px-4 transition-all duration-200 ${
              errors.password 
                ? "border-red-500/50 bg-red-500/5 focus-within:border-red-500" 
                : "border-white/10 bg-[#1F2533] focus-within:border-white/30 focus-within:bg-[#252d3d]"
            }`}
          >
            <GoShieldLock size={18} className={`shrink-0 ${errors.password ? "text-red-400" : "text-dm-text-secondary"}`} />
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Your password"
              {...register("password")}
              className="flex-1 bg-transparent text-sm text-white placeholder-dm-text-secondary outline-none"
            />
            {/* View/Hide password toggle trigger */}
            <button
              type="button"
              onClick={() => setShowPassword((v) => !v)}
              className={`shrink-0 cursor-pointer transition-colors hover:text-white ${errors.password ? "text-red-400" : "text-dm-text-secondary"}`}
            >
              {showPassword ? (
                <MdOutlineVisibility size={18} />
              ) : (
                <MdOutlineVisibilityOff size={18} />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="absolute -bottom-5 left-2 text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        {/* Remember me & Forgot password option */}
        <div className="flex items-center justify-between">
          <label className="flex cursor-pointer items-center gap-2">
            <input
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 rounded border-white/20 bg-[#1F2533] text-[#46ca43] focus:ring-[#46ca43] focus:ring-offset-0"
            />
            <span className="text-sm text-dm-text-secondary">Remember me</span>
          </label>
          
          <button
            type="button"
            className="cursor-pointer text-sm font-medium text-[#46ca43] transition-colors hover:text-[#5de85a]"
          >
            Forgot Password?
          </button>
        </div>

        {/* Form submission button */}
        <SubmitButton loading={loading} label="LOG IN" />
      </form>

      {/* Toggle option to navigate to the sign-up form */}
      <div className="mt-6 text-center text-sm text-dm-text-secondary">
        Not registered?{" "}
        <button
          onClick={onSignUpClick}
          className="cursor-pointer font-semibold text-[#46ca43] transition-colors hover:text-[#5de85a]"
        >
          Sign Up
        </button>
      </div>
    </>
  );
}
