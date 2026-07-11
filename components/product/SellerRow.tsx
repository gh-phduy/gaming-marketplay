"use client";

import Link from "next/link";
import OptimizedAvatar from "../shared/OptimizedAvatar";
import { Separator } from "@/components/ui/separator";
import { IoKey } from "react-icons/io5";
import { RiXboxFill, RiGlobalLine, RiSteamFill } from "react-icons/ri";
import { FaMedal } from "react-icons/fa6";
import { SlCheck } from "react-icons/sl";
import { LuInfo } from "react-icons/lu";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { FaCartShopping } from "react-icons/fa6";
import { BsShieldFillCheck } from "react-icons/bs";
import { TiStarFullOutline } from "react-icons/ti";
import { IoBanSharp } from "react-icons/io5";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SiPlaystation, SiNintendo } from "react-icons/si";
import SellerInfoTooltip from "./SellerInfoTooltip";
import { getSellerProfilePath } from "../user/seller-profile.route";
import { useCart } from "@/contexts/CartContext";
import { useTranslations } from "next-intl";

export interface SellerOffer {
  data: {
    id: string;
    type: string;
    platform: string;
    edition: string;
    activationRegion: string;
    price: number;
    currency: string;
    title: string;
    image_url: string;
  };
  seller: {
    id: string;
    name: string;
    avatar: string;
    isOnline: boolean;
    tier: string;
    rating: number;
  };
}

const getPlatformIcon = (platform: string) => {
  const p = platform.toLowerCase();
  if (p.includes("xbox")) return <RiXboxFill />;
  if (p.includes("playstation")) return <SiPlaystation />;
  if (p.includes("nintendo")) return <SiNintendo />;
  if (p.includes("steam")) return <RiSteamFill />;
  return <RiGlobalLine />;
};

export default function SellerRow({ offer }: { offer: SellerOffer }) {
  const { addToCart } = useCart();
  const t = useTranslations("product");

  if (!offer) return null;

  const isBanStatus = offer.data.activationRegion
    ?.toLowerCase()
    .includes("restricted");

  return (
    <>
      {/* ── Desktop row (lg+) ── */}
      <div className="hidden w-full items-center justify-between rounded-sm bg-midnight-750 px-5 py-[15px] transition-colors duration-300 hover:bg-gray-700/70 lg:flex">
        {/* 1. Seller Info Section */}
        <div className="flex w-[250px] shrink-0 items-center gap-x-3">
          <OptimizedAvatar
            src={offer.seller.avatar || "/avt.jpg"}
            alt={offer.seller.name}
            size={48}
            isOnline={offer.seller.isOnline}
            fallback={offer.seller.name.substring(0, 2).toUpperCase()}
          />
          <div className="min-w-0">
            <div className="flex items-center gap-x-2">
              <Link
                href={getSellerProfilePath(offer.seller.name)}
                className="hover:text-forest-400 max-w-[120px] truncate text-lg font-semibold transition-colors"
              >
                {offer.seller.name}
              </Link>
              <BsShieldFillCheck
                className="shrink-0"
                color="#f8c944"
                size={16}
              />
            </div>
            <div className="flex items-center gap-x-3">
              <span className="text-sm whitespace-nowrap">
                🏆 {offer.seller.tier}
              </span>
              <Separator
                orientation="vertical"
                className="h-[16px] w-[1px] bg-gray-600"
              />
              <div className="flex items-center gap-x-1 whitespace-nowrap">
                <TiStarFullOutline color="#f8c944" size={16} />
                <span>{offer.seller.rating.toFixed(1)}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator
          orientation="vertical"
          className="h-[50px] w-[1px] bg-gray-600"
        />

        {/* 2. Platform Icons Section */}
        <div className="flex w-[120px] shrink-0 items-center justify-center gap-x-3">
          <TooltipProvider delayDuration={200}>
            <SellerInfoTooltip
              icon={<IoKey />}
              content={
                <p>
                  {t("theSellerWillSendYouA")}{" "}
                  {offer.data.type?.toLowerCase() || t("key")} {t("thatYouCanActivate")}
                </p>
              }
            />
            <SellerInfoTooltip
              icon={getPlatformIcon(offer.data.platform)}
              content={<p>{t("platform")} {offer.data.platform}</p>}
            />
            <SellerInfoTooltip
              icon={<RiGlobalLine />}
              content={<p>{t("region")} {offer.data.activationRegion}</p>}
            />
          </TooltipProvider>
        </div>

        <Separator
          orientation="vertical"
          className="h-[50px] w-[1px] bg-gray-600"
        />

        {/* 3. Edition Section */}
        <div className="flex w-[180px] shrink-0 items-center justify-start gap-x-2">
          <FaMedal className="text-gray-400" />
          <span className="whitespace-nowrap text-steel-500">{t("edition")}</span>
          <span className="truncate font-medium">{offer.data.edition}</span>
        </div>

        <Separator
          orientation="vertical"
          className="h-[50px] w-[1px] bg-gray-600"
        />

        {/* 4. Activation Section */}
        <div className="flex w-[320px] shrink-0 items-center gap-x-2">
          {isBanStatus ? (
            <IoBanSharp color="#f87171" size={24} className="shrink-0" />
          ) : (
            <SlCheck color="#65c756" size={24} className="shrink-0" />
          )}
          <span className="flex-1 text-sm">
            {isBanStatus
              ? t("cantBeActivatedInYourRegion")
              : `${t("canBeActivatedFrom")} ${offer.data.activationRegion}`}
          </span>
          <LuInfo
            className="ml-1 shrink-0 cursor-pointer text-steel-500"
            size={20}
          />
        </div>

        <Separator
          orientation="vertical"
          className="h-[50px] w-[1px] bg-gray-600"
        />

        {/* 5. Price Section */}
        <div className="flex w-[150px] shrink-0 flex-col items-center justify-center">
          <span className="text-sm text-steel-500">{t("totalAmount")}</span>
          <span className="text-xl font-bold">
            {offer.data.currency} {offer.data.price}
          </span>
        </div>

        <Separator
          orientation="vertical"
          className="h-[50px] w-[1px] bg-gray-600"
        />

        {/* 6. Actions Section */}
        <div className="flex shrink-0 items-center gap-x-6 text-steel-500">
          <MdOutlineRemoveRedEye
            size={24}
            className="cursor-pointer transition-colors hover:text-white"
          />
          <Separator
            orientation="vertical"
            className="h-[50px] w-[1px] bg-gray-600"
          />
          <BiDotsVerticalRounded
            size={24}
            className="cursor-pointer transition-colors hover:text-white"
          />
          <Separator
            orientation="vertical"
            className="h-[50px] w-[1px] bg-gray-600"
          />
          <div
            onClick={() => {
              addToCart({
                id: offer.data.id,
                name: offer.data.title,
                platform: offer.data.platform,
                image: offer.data.image_url,
                price: offer.data.price,
                currency: offer.data.currency,
              });
            }}
            className="flex h-[60px] w-[60px] cursor-pointer items-center justify-center rounded-lg bg-midnight-500 transition-colors hover:bg-gray-500 hover:text-white"
          >
            <FaCartShopping size={24} />
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet card (< lg) ── */}
      <div className="flex flex-col gap-3 rounded-lg bg-midnight-750 p-3 transition-colors duration-300 hover:bg-gray-700/70 sm:p-4 lg:hidden">
        {/* Top: Seller + Price */}
        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2.5">
            <OptimizedAvatar
              src={offer.seller.avatar || "/avt.jpg"}
              alt={offer.seller.name}
              size={40}
              isOnline={offer.seller.isOnline}
              fallback={offer.seller.name.substring(0, 2).toUpperCase()}
            />
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <Link
                  href={getSellerProfilePath(offer.seller.name)}
                  className="hover:text-forest-400 max-w-[100px] truncate text-sm font-semibold transition-colors sm:max-w-[160px] sm:text-base"
                >
                  {offer.seller.name}
                </Link>
                <BsShieldFillCheck
                  className="shrink-0"
                  color="#f8c944"
                  size={14}
                />
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="whitespace-nowrap">
                  🏆 {offer.seller.tier}
                </span>
                <div className="flex items-center gap-0.5">
                  <TiStarFullOutline color="#f8c944" size={14} />
                  <span>{offer.seller.rating.toFixed(1)}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-xs text-steel-500">{t("total")}</div>
            <div className="text-lg font-bold sm:text-xl">
              {offer.data.currency} {offer.data.price}
            </div>
          </div>
        </div>

        {/* Middle: Details chips */}
        <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm">
          <span className="inline-flex items-center gap-1 rounded bg-midnight-600 px-2 py-1">
            {getPlatformIcon(offer.data.platform)}
            <span className="text-steel-300">{offer.data.platform}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-midnight-600 px-2 py-1">
            <FaMedal className="text-gray-400" size={12} />
            <span className="text-steel-300">{offer.data.edition}</span>
          </span>
          <span className="inline-flex items-center gap-1 rounded bg-midnight-600 px-2 py-1">
            <IoKey size={12} />
            <span className="text-steel-300">{offer.data.type}</span>
          </span>
        </div>

        {/* Activation line */}
        <div className="flex items-center gap-1.5 text-xs sm:text-sm">
          {isBanStatus ? (
            <IoBanSharp color="#f87171" size={16} className="shrink-0" />
          ) : (
            <SlCheck color="#65c756" size={16} className="shrink-0" />
          )}
          <span>
            {isBanStatus
              ? t("cantBeActivatedInYourRegion")
              : `${t("canBeActivatedFrom")} ${offer.data.activationRegion}`}
          </span>
        </div>

        {/* Bottom: Actions */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => {
              addToCart({
                id: offer.data.id,
                name: offer.data.title,
                platform: offer.data.platform,
                image: offer.data.image_url,
                price: offer.data.price,
                currency: offer.data.currency,
              });
            }}
            className="flex flex-1 items-center justify-center gap-2 rounded-lg bg-midnight-500 py-2.5 text-sm font-medium text-steel-300 transition-colors hover:bg-gray-500 hover:text-white"
          >
            <FaCartShopping size={16} />
            <span>{t("addToCart")}</span>
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-midnight-600 text-steel-500 transition-colors hover:text-white"
          >
            <MdOutlineRemoveRedEye size={18} />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-lg bg-midnight-600 text-steel-500 transition-colors hover:text-white"
          >
            <BiDotsVerticalRounded size={18} />
          </button>
        </div>
      </div>
    </>
  );
}
