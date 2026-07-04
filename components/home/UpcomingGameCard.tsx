/**
 * UpcomingGameItem Component
 *
 * Game card with release date badge and video preview on hover
 * Uses GSAP for smooth animations
 */

"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { IoMdDesktop } from "react-icons/io";

/* ============================================
   TYPES
   ============================================ */

interface UpcomingGameItemProps {
  /** Game title */
  title?: string;
  /** Game price */
  price?: string;
  /** Release date */
  releaseDate?: string;
  /** Cover image path */
  coverImage?: string;
  /** Preview video path */
  previewVideo?: string;
  /** Platform icon */
  platform?: "pc" | "xbox" | "playstation";
}

/* ============================================
   CONSTANTS
   ============================================ */

const DEFAULTS = {
  title: "Deliver At All Costs",
  price: "$38.30",
  releaseDate: "28 Aug 2025",
  coverImage: "/product2.jpg",
  previewVideo: "/video/product2.webm",
  platform: "pc" as const,
} as const;

/** Animation durations */
const ANIMATION = {
  containerExpand: 0.7,
  imageFade: 0.3,
  videoFade: 0.3,
  footerColor: 0.5,
} as const;

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * UpcomingGameItem Component
 *
 * Game card for upcoming releases with release date badge
 */
export default function UpcomingGameItem({
  title = DEFAULTS.title,
  price = DEFAULTS.price,
  releaseDate = DEFAULTS.releaseDate,
  coverImage = DEFAULTS.coverImage,
  previewVideo = DEFAULTS.previewVideo,
}: UpcomingGameItemProps) {
  // State
  const [isHovered, setIsHovered] = useState(false);

  // Refs
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Initialize GSAP timeline
  useEffect(() => {
    if (!containerRef.current || !imageRef.current || !footerRef.current) {
      return;
    }

    timelineRef.current = gsap.timeline({ paused: true });

    timelineRef.current
      .to(
        containerRef.current,
        {
          height: "300px",
          duration: ANIMATION.containerExpand,
          ease: "power2.out",
        },
        0
      )
      .to(
        imageRef.current,
        {
          opacity: 0,
          duration: ANIMATION.imageFade,
          ease: "power2.out",
        },
        0
      )
      .to(
        videoRef.current,
        {
          opacity: 1,
          duration: ANIMATION.videoFade,
          ease: "power2.out",
        },
        0.1
      )
      .to(
        footerRef.current,
        {
          backgroundColor: "#2A3240",
          duration: ANIMATION.footerColor,
          ease: "power2.out",
        },
        0.3
      );

    return () => {
      timelineRef.current?.kill();
    };
  }, []);

  // Event handlers
  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    videoRef.current?.play();
    timelineRef.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
    timelineRef.current?.reverse();
  }, []);

  return (
    <article
      className="relative w-[252px] 800:w-full h-[300px] mx-auto select-none"
      role="listitem"
    >
      <div
        ref={containerRef}
        className="w-full cursor-pointer absolute top-1/2 group -translate-y-1/2 left-1/2 -translate-x-1/2 h-[275px] rounded-lg overflow-hidden bg-surface-base flex flex-col"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label={`${title} - Release: ${releaseDate} - ${price}`}
      >
        {/* Media Container */}
        <div className="relative flex-1">
          {/* Release Date Badge */}
          <div
            className="absolute z-20 px-2 py-[10px] bg-[#95740080] flex justify-center items-center pointer-events-none"
            aria-label={`Release date: ${releaseDate}`}
          >
            <span className="text-dm-accent-yellow text-[12px]">
              Release: {releaseDate}
            </span>
          </div>

          {/* Cover Image */}
          <div ref={imageRef} className="absolute inset-0 w-full h-full">
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="(max-width: 800px) 252px, 100%"
            />
          </div>

          {/* Preview Video */}
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover opacity-0"
            src={previewVideo}
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          {/* Price Overlay */}
          <div className="absolute bottom-0 w-full">
            <div className="w-full text-dm-text-primary relative gap-x-2 backdrop-blur-xs bg-surface-card/30 h-[65px] justify-between flex items-center px-4">
              <IoMdDesktop size={20} aria-label="PC Platform" />
              <span className="text-xl font-semibold">{price}</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div
          ref={footerRef}
          className="w-full h-[57px] bg-surface-card flex px-2 justify-between items-center"
        >
          <h3 className="text-dm-text-primary text-xl font-semibold truncate">
            {title}
          </h3>
        </div>
      </div>
    </article>
  );
}
