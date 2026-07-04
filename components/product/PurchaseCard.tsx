"use client";

import Image from "next/image";
import {
  FaKey,
  FaGamepad,
  FaTruck,
  FaShoppingCart,
  FaEye,
  FaShareAlt,
  FaComments,
  FaStar,
} from "react-icons/fa";
import { MdPerson, MdInfo } from "react-icons/md";
import { IoMdCheckmarkCircle } from "react-icons/io";
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { OptimizedAvatar } from "@/components/shared/OptimizedAvatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { FcGoogle } from "react-icons/fc";
import { FaApplePay } from "react-icons/fa";
import { PurchaseCardProps } from "@/types/api-product";

export default function PurchaseCard({
  product,
  seller,
  onAddToCart,
  onCheckout,
  onChat,
}: PurchaseCardProps) {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);

  return (
    <Card className="w-full border-none bg-[#2a3441]/80 backdrop-blur-md lg:max-w-[780px]">
      <CardContent className="flex flex-col gap-4 p-4 sm:gap-5 sm:p-6">
        {/* Seller Info Section */}
        <div className="flex items-start justify-between">
          <Popover open={isPopoverOpen} onOpenChange={setIsPopoverOpen}>
            <PopoverTrigger
              className="flex cursor-pointer items-center gap-3"
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
            >
              {/* Seller Avatar - Using OptimizedAvatar for Next.js Image optimization */}
              <OptimizedAvatar
                src={seller.avatar}
                alt={`${seller.name} avatar`}
                size={48}
                isOnline={seller.isOnline}
                fallback={seller.name.substring(0, 2).toUpperCase()}
              />

              {/* Seller Name and Badge */}
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-white">
                    {seller.name}
                  </span>
                  <span className="text-yellow-500">{seller.badge}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 border-green-500/30 bg-green-500/10 text-xs text-gray-400 hover:bg-green-500/10"
                  >
                    {seller.tier}
                  </Badge>
                  {/* Star Rating */}
                  <div className="flex items-center gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        className={`text-sm ${i < seller.rating ? "text-yellow-500" : "text-gray-600"}`}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </PopoverTrigger>

            <PopoverContent
              className="w-[320px] border-gray-600 bg-[#3a4654] p-4"
              side="bottom"
              align="start"
              onMouseEnter={() => setIsPopoverOpen(true)}
              onMouseLeave={() => setIsPopoverOpen(false)}
            >
              {/* Tooltip Header */}
              <div className="mb-4 flex items-center gap-3">
                <OptimizedAvatar
                  src={seller.avatar}
                  alt={`${seller.name} avatar`}
                  size={48}
                  isOnline={seller.isOnline}
                  fallback={seller.name.substring(0, 2).toUpperCase()}
                />
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white">
                      {seller.name}
                    </span>
                    <span className="text-yellow-500">{seller.badge}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 border-green-500/30 bg-green-500/10 text-xs text-gray-400 hover:bg-green-500/10"
                    >
                      {seller.tier}
                    </Badge>
                    <div className="flex items-center gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs ${i < seller.rating ? "text-yellow-500" : "text-gray-600"}`}
                          aria-hidden="true"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <div className="mb-1 text-xs text-gray-400">
                    Success rate:
                  </div>
                  <div className="font-semibold text-white">
                    {seller.successRate.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">
                    Total feedbacks:
                  </div>
                  <div className="font-semibold text-white">
                    {seller.totalFeedbacks.toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">
                    Seller's time zone:
                  </div>
                  <div className="font-semibold text-white">
                    {seller.timezone}
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">Total sales:</div>
                  <div className="font-semibold text-white">
                    {seller.totalSales.toLocaleString()}
                  </div>
                </div>
              </div>

              {/* Feedback Stats */}
              <div className="mb-4 grid grid-cols-2 gap-3">
                <div>
                  <div className="mb-1 text-xs text-gray-400">
                    Positive feedbacks:
                  </div>
                  <div className="font-semibold text-green-500">
                    {seller.positiveFeedbacks.toFixed(2)}%
                  </div>
                </div>
                <div>
                  <div className="mb-1 text-xs text-gray-400">
                    Negative feedbacks:
                  </div>
                  <div className="font-semibold text-red-500">
                    {seller.negativeFeedbacks.toFixed(2)}%
                  </div>
                </div>
              </div>

              {/* Chat Button */}
              <Button
                className="w-full bg-[#4ade80] font-semibold text-white hover:bg-[#3bc66d]"
                onClick={onChat}
              >
                <FaComments className="mr-2 h-4 w-4" />
                CHAT
              </Button>
            </PopoverContent>
          </Popover>

          {/* Action Icons */}
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:bg-transparent hover:text-white"
              aria-label="View product details"
            >
              <FaEye className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="text-gray-400 hover:bg-transparent hover:text-white"
              aria-label="Share product"
            >
              <FaShareAlt className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
          {/* Left Column */}
          <div className="flex flex-col gap-3">
            {/* Product Type */}
            <div className="flex items-center gap-2 sm:gap-3">
              <FaKey className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-xs text-gray-400 sm:text-sm">
                Product type:
              </span>
              <span className="text-sm font-medium text-white sm:text-base">
                {product.type}
              </span>
            </div>

            {/* Platform */}
            <div className="flex items-center gap-2 sm:gap-3">
              <FaGamepad className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-xs text-gray-400 sm:text-sm">
                Platform:
              </span>
              <span className="text-sm font-medium text-white sm:text-base">
                {product.platform}
              </span>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-3">
            {/* Edition */}
            <div className="flex items-center gap-2 sm:gap-3">
              <MdPerson className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-xs text-gray-400 sm:text-sm">Edition:</span>
              <span className="text-sm font-medium text-white sm:text-base">
                {product.edition}
              </span>
            </div>

            {/* Delivery */}
            <div className="flex items-center gap-2 sm:gap-3">
              <FaTruck className="h-4 w-4 shrink-0 text-gray-400" />
              <span className="text-xs text-gray-400 sm:text-sm">
                Delivery:
              </span>
              <span className="text-sm font-medium text-white sm:text-base">
                {product.delivery}
              </span>
            </div>
          </div>
        </div>

        {/* Activation Info */}
        <div className="flex items-center gap-2 text-sm">
          <IoMdCheckmarkCircle className="h-5 w-5 shrink-0 text-green-500" />
          <span className="text-gray-300">
            Can be activated from{" "}
            <span className="font-medium text-white">
              {product.activationRegion}
            </span>
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto text-gray-400 hover:bg-transparent hover:text-white"
          >
            <MdInfo className="h-5 w-5" />
          </Button>
        </div>

        {/* Divider with Price Label */}
        <div className="flex w-full items-center gap-x-4">
          <Separator className="flex-1 bg-gray-600" />
          <span className="text-xs text-gray-400">Price</span>
          <Separator className="flex-1 bg-gray-600" />
        </div>

        {/* Price Section */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="text-sm text-gray-400">Total amount:</span>
          <div className="flex items-center gap-3">
            <span className="text-2xl font-bold text-white sm:text-3xl">
              {product.currency} {product.price.toFixed(2)}
            </span>
            {/* Payment Options */}
            <div className="flex items-center gap-2">
              <Badge
                variant="secondary"
                className="rounded-full bg-white px-2 py-1 text-black sm:px-3 sm:py-1.5"
              >
                <FcGoogle size={16} />
                <span className="text-xs font-medium sm:text-sm">Pay</span>
              </Badge>
              <Badge
                variant="secondary"
                className="rounded-full bg-white text-black"
              >
                <FaApplePay size={28} className="sm:hidden" />
                <FaApplePay size={32} className="hidden sm:block" />
              </Badge>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Button
            className="flex-1 bg-[#3d4b5c] text-sm font-semibold text-white hover:bg-[#4a5866] sm:text-base"
            onClick={onAddToCart}
          >
            <FaShoppingCart className="mr-2 h-4 w-4" />
            ADD TO CART
          </Button>
          <Button
            className="flex-1 cursor-pointer bg-[#4ade80] text-sm font-semibold text-white hover:bg-[#3bc66d] sm:text-base"
            onClick={onCheckout}
          >
            GO TO CHECKOUT
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
