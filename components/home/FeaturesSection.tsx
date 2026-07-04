/**
 * AboutSection1 Component
 *
 * Section hiển thị 3 tính năng chính: Buyer Protection, Payment, Support
 * Có hover effect với background images
 */

import Image from "next/image";
import { HiShieldCheck } from "react-icons/hi";
import { FaCreditCard } from "react-icons/fa";
import { IoPerson } from "react-icons/io5";

/* ============================================
   CONSTANTS
   ============================================ */

/** Mask gradient style for fade effect */
const MASK_STYLE = {
  maskImage: `linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)`,
};

/** Radial gradient overlay for center fade effect */
const RADIAL_GRADIENT_STYLE = {
  background: `radial-gradient(circle at center, rgba(0,0,0,0) 0%, rgba(0,0,0,0.08) 60%, rgba(0,0,0,0.15) 100%)`,
  pointerEvents: "none" as const,
};

/** Feature items data */
const FEATURES = [
  {
    id: "buyer-protection",
    icon: HiShieldCheck,
    iconSize: 30,
    title: "Buyer Protection",
    description: "Secure transactions and personal data",
    hoverImage: "/hover-ab-1.webp",
  },
  {
    id: "secure-payment",
    icon: FaCreditCard,
    iconSize: 28,
    title: "Secure Payment",
    description: "Secure transactions and personal data",
    hoverImage: "/hover-ab-3.webp",
  },
  {
    id: "customer-support",
    icon: IoPerson,
    iconSize: 28,
    title: "24/7 Support",
    description: "Secure transactions and personal data",
    hoverImage: "/hover-ab-2.webp",
  },
] as const;

/* ============================================
   SUB-COMPONENTS
   ============================================ */

interface FeatureCardProps {
  icon: React.ElementType;
  iconSize: number;
  title: string;
  description: string;
  hoverImage: string;
}

/**
 * Individual feature card with hover effect
 */
function FeatureCard({
  icon: Icon,
  iconSize,
  title,
  description,
  hoverImage,
}: FeatureCardProps) {
  return (
    <div className="group relative h-full w-1/3 overflow-hidden rounded-2xl">
      {/* Hover background image */}
      <Image
        src={hoverImage}
        alt=""
        fill
        className="z-10 origin-center rounded-full object-cover opacity-0 transition-all duration-1000 ease-out group-hover:opacity-100"
        aria-hidden="true"
      />

      {/* Radial gradient overlay for fade effect */}
      <div
        style={RADIAL_GRADIENT_STYLE}
        className="absolute inset-0 z-[15] opacity-0 transition-opacity duration-1000 ease-out group-hover:opacity-100"
      />

      {/* Content */}
      <div className="relative z-20 flex h-full w-full flex-col items-center justify-center">
        {/* Icon container */}
        <div className="mb-3 flex h-[56px] w-[56px] items-center justify-center rounded-lg text-dm-text-muted shadow-custom">
          <Icon size={iconSize} aria-hidden="true" />
        </div>

        {/* Title */}
        <h3 className="text-[18px] font-semibold text-dm-text-primary">
          {title}
        </h3>

        {/* Description */}
        <span className="text-[14px] text-dm-text-muted">{description}</span>
      </div>
    </div>
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * AboutSection1 Component
 *
 * Displays three key features with interactive hover effects
 */
export default function AboutSection1() {
  return (
    <section
      className="relative z-10 flex h-[156px] w-full items-center justify-center text-center"
      aria-label="Key Features"
    >
      {/* Background image */}
      <Image
        src="/about-us-1.webp"
        alt=""
        fill
        className="z-10 object-cover"
        aria-hidden="true"
        priority={false}
      />

      {/* Features container */}
      <div className="relative z-20 flex h-full w-full max-w-[940px] 1200:max-w-[1140px] 1640:max-w-[1310px] 1920:max-w-[1590px]">
        {FEATURES.map((feature) => (
          <FeatureCard
            key={feature.id}
            icon={feature.icon}
            iconSize={feature.iconSize}
            title={feature.title}
            description={feature.description}
            hoverImage={feature.hoverImage}
          />
        ))}
      </div>
    </section>
  );
}
