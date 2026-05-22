/**
 * AddToCartCard Component
 *
 * Product card with add to cart functionality
 * Features video preview on hover
 */

"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { BsPersonFillCheck, BsBasket3Fill } from "react-icons/bs";

/* ============================================
   TYPES
   ============================================ */

interface AddToCartCardProps {
  /** Game title */
  title?: string;
  /** Game price */
  price?: string;
  /** Cover image path */
  coverImage?: string;
  /** Preview video path */
  previewVideo?: string;
  /** Seller name */
  sellerName?: string;
  /** Seller avatar */
  sellerAvatar?: string;
  /** Seller rank */
  sellerRank?: string;
  /** On add to cart callback */
  onAddToCart?: () => void;
}

/* ============================================
   CONSTANTS
   ============================================ */

const DEFAULTS = {
  title: "Deliver At All Costs",
  price: "$38.30",
  coverImage: "/product1.png",
  previewVideo: "/video/product1.webm",
  sellerName: "Easy-key",
  sellerAvatar: "/avt1.png",
  sellerRank: "🦄 Legendary",
} as const;

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * AddToCartCard Component
 */
export default function AddToCartCard({
  title = DEFAULTS.title,
  price = DEFAULTS.price,
  coverImage = DEFAULTS.coverImage,
  previewVideo = DEFAULTS.previewVideo,
  sellerName = DEFAULTS.sellerName,
  sellerAvatar = DEFAULTS.sellerAvatar,
  sellerRank = DEFAULTS.sellerRank,
  onAddToCart,
}: AddToCartCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = useCallback(() => {
    setIsHovered(true);
    videoRef.current?.play();
  }, []);

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  }, []);

  const handleAddToCart = useCallback(() => {
    onAddToCart?.();
  }, [onAddToCart]);

  return (
    <article className="relative h-[300px] w-[360px]">
      <div
        className="group absolute top-1/2 left-1/2 flex h-[275px] w-full -translate-x-1/2 -translate-y-1/2 cursor-pointer flex-col overflow-hidden rounded-lg bg-surface-base transition-all duration-700 hover:h-[300px]"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        tabIndex={0}
        onFocus={handleMouseEnter}
        onBlur={handleMouseLeave}
        aria-label={`${title} - ${price}`}
      >
        {/* Media Container */}
        <div className="relative flex-1">
          {/* Cover Image */}
          <div
            className={`absolute inset-0 h-full w-full transition-opacity duration-300 ${
              isHovered ? "opacity-0" : "opacity-100"
            }`}
          >
            <Image
              src={coverImage}
              alt={title}
              fill
              className="object-cover"
              sizes="360px"
            />
          </div>

          {/* Preview Video */}
          <video
            ref={videoRef}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${
              isHovered ? "opacity-100" : "opacity-0"
            }`}
            src={previewVideo}
            muted
            loop
            playsInline
            aria-hidden="true"
          />

          {/* Seller Info Overlay */}
          <div className="absolute bottom-0 w-full">
            <div className="relative flex h-[65px] w-full items-center gap-x-2 bg-surface-card/30 px-4 backdrop-blur-xs">
              {/* Seller Avatar */}
              <Image
                src={sellerAvatar}
                alt={`${sellerName} avatar`}
                width={30}
                height={30}
                className="rounded-full"
              />

              {/* Seller Details */}
              <div className="flex flex-col">
                <div className="flex items-center gap-x-1 text-dm-text-primary">
                  <span className="text-[12px]">{sellerName}</span>
                  <BsPersonFillCheck size={15} aria-label="Verified seller" />
                </div>
                <span className="text-[10px] text-dm-text-muted">
                  Rank: {sellerRank}
                </span>
              </div>

              {/* Add to Cart Button (slides in on hover) */}
              <div className="absolute inset-0 w-[225px] -translate-x-full transition duration-1000 group-hover:translate-x-0">
                <button
                  onClick={handleAddToCart}
                  className="flex h-full w-full items-center justify-center gap-x-3 bg-dm-accent-green px-5 pr-12 transition-colors hover:bg-dm-accent-green-hover"
                  style={{
                    clipPath:
                      "polygon(0 0, calc(100% - 30px) 0, 100% 50%, calc(100% - 30px) 100%, 0 100%)",
                  }}
                  aria-label={`Add ${title} to cart`}
                >
                  <BsBasket3Fill
                    className="text-dm-text-primary"
                    aria-hidden="true"
                  />
                  <span className="text-[14px] font-bold text-dm-text-primary">
                    ADD TO CART
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex h-[57px] w-full items-center justify-between bg-surface-card px-2">
          <h3 className="truncate text-xl font-semibold text-dm-text-primary">
            {title}
          </h3>
          <span className="text-xl font-semibold text-dm-text-primary">
            {price}
          </span>
        </div>
      </div>
    </article>
  );
}
