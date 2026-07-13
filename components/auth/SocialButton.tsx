import { type ReactNode } from "react";
import { Button } from "@/components/ui/button";

interface SocialButtonProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
}

/**
 * Component displaying a social integration button (Facebook, Twitch, Microsoft, etc.).
 * Utilizes the custom UI Button with hover effects to transition colors for both the icon and label text.
 */
export default function SocialButton({ icon, label, onClick }: SocialButtonProps) {
  return (
    <Button
      variant="outline"
      onClick={onClick}
      className="group flex h-12 w-full cursor-pointer items-center justify-center gap-3 rounded-lg border-none bg-[#1F2533] font-medium text-dm-text-secondary transition-all duration-300 hover:bg-[#2A3140] hover:text-white"
    >
      {icon}
      <span>{label}</span>
    </Button>
  );
}
