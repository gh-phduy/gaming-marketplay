/**
 * Footer Component
 *
 * Site footer with:
 * - Navigation links
 * - Social media icons
 * - Payment method icons
 * - Legal disclaimers
 */

import Link from "next/link";

// Social Icons
import { BiLogoFacebook } from "react-icons/bi";
import { BsDiscord, BsTwitterX, BsPaypal, BsTranslate } from "react-icons/bs";
import { IoLogoYoutube, IoLogoWechat } from "react-icons/io5";
import { FaInstagram, FaAmazonPay } from "react-icons/fa";
import { FaMoneyBills, FaGooglePay } from "react-icons/fa6";
import { GrLocation } from "react-icons/gr";

// Payment Icons
import { RiVisaLine } from "react-icons/ri";
import {
  SiMastercard,
  SiFampay,
  SiPaytm,
  SiSamsungpay,
  SiAfterpay,
  SiPayloadcms,
} from "react-icons/si";
import { AiOutlineAlipay } from "react-icons/ai";
import { TbBrandPaypay } from "react-icons/tb";
import { PiContactlessPaymentFill } from "react-icons/pi";

/* ============================================
   CONSTANTS
   ============================================ */

/** Footer navigation sections */
const FOOTER_SECTIONS = [
  {
    title: "DIFMARK",
    links: [
      { label: "About us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "SUPPORT",
    links: [
      { label: "Help Center", href: "/help" },
      { label: "FAQ", href: "/faq" },
      { label: "Refund Policy", href: "/refund" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
  {
    title: "CATEGORIES",
    links: [
      { label: "Steam Games", href: "/games/steam" },
      { label: "Xbox Games", href: "/games/xbox" },
      { label: "PlayStation", href: "/games/playstation" },
      { label: "Gift Cards", href: "/gift-cards" },
      { label: "Software", href: "/software" },
    ],
  },
] as const;

/** Social media links */
const SOCIAL_LINKS = [
  { icon: BsDiscord, label: "Discord", href: "https://discord.com" },
  { icon: IoLogoYoutube, label: "YouTube", href: "https://youtube.com" },
  { icon: BsTwitterX, label: "Twitter", href: "https://twitter.com" },
  { icon: BiLogoFacebook, label: "Facebook", href: "https://facebook.com" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com" },
] as const;

/** Payment methods */
const PAYMENT_METHODS = [
  { icon: RiVisaLine, label: "Visa", size: 48 },
  { icon: SiMastercard, label: "Mastercard", size: 34 },
  { icon: IoLogoWechat, label: "WeChat Pay", size: 28 },
  { icon: FaGooglePay, label: "Google Pay", size: 34 },
  { icon: FaAmazonPay, label: "Amazon Pay", size: 34 },
  { icon: SiFampay, label: "FamPay", size: 24 },
  { icon: BsPaypal, label: "PayPal", size: 24 },
  { icon: AiOutlineAlipay, label: "Alipay", size: 24 },
  { icon: SiPaytm, label: "Paytm", size: 30 },
  { icon: TbBrandPaypay, label: "PayPay", size: 28 },
  { icon: SiSamsungpay, label: "Samsung Pay", size: 32 },
  { icon: PiContactlessPaymentFill, label: "Contactless", size: 28 },
  { icon: SiAfterpay, label: "Afterpay", size: 28 },
  { icon: SiPayloadcms, label: "Other", size: 28 },
] as const;

/* ============================================
   SUB-COMPONENTS
   ============================================ */

/**
 * Footer section with title and links
 */
interface FooterSectionProps {
  title: string;
  links: readonly { label: string; href: string }[];
}

function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div className="flex flex-col gap-y-5">
      <h3 className="text-[16px] font-bold mb-2 text-dm-text-primary">
        {title}
      </h3>
      <nav aria-label={`${title} navigation`}>
        <ul className="flex flex-col gap-y-5">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[14px] text-dm-text-secondary hover:text-dm-text-primary transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

/**
 * Social media icon button
 */
interface SocialIconProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

function SocialIcon({ icon: Icon, label, href }: SocialIconProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="h-8 w-8 flex items-center justify-center rounded-sm bg-surface-overlay text-dm-text-muted hover:text-dm-text-primary hover:bg-state-hover transition-colors"
      aria-label={`Follow us on ${label}`}
    >
      <Icon size={24} aria-hidden="true" />
    </a>
  );
}

/**
 * Payment method icon
 */
interface PaymentIconProps {
  icon: React.ElementType;
  label: string;
  size: number;
}

function PaymentIcon({ icon: Icon, label, size }: PaymentIconProps) {
  return (
    <div
      className="h-10 1920:w-[100px] 1640:w-[80px] w-[68px] flex items-center justify-center rounded-sm bg-surface-overlay text-dm-text-muted"
      title={label}
    >
      <Icon size={size} aria-hidden="true" />
    </div>
  );
}

/**
 * Horizontal divider
 */
function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`h-px bg-dm-border-subtle ${className}`}
      aria-hidden="true"
    />
  );
}

/* ============================================
   MAIN COMPONENT
   ============================================ */

/**
 * Footer Component
 */
export default function Footer() {
  return (
    <footer className="bg-[#11151a] 800:px-0 px-8 w-full flex justify-center">
      <div className="max-w-[720px] 990:max-w-[940px] 1200:max-w-[1140px] 1640:max-w-[1310px] 1920:max-w-[1590px] w-full py-8">
        {/* Top Section: Links & Social */}
        <div className="1025:flex-row flex-col flex mb-8 justify-between">
          {/* Navigation Links */}
          <div className="flex justify-between 1025:justify-normal 1025:gap-x-20 1200:gap-x-40">
            {FOOTER_SECTIONS.map((section) => (
              <FooterSection
                key={section.title}
                title={section.title}
                links={section.links}
              />
            ))}
          </div>

          {/* Mobile Divider */}
          <Divider className="1025:hidden block my-8" />

          {/* Social & Settings */}
          <div className="flex text-dm-text-muted justify-between 1025:justify-normal flex-col 800:flex-row 1025:flex-col gap-y-24">
            {/* Social Icons */}
            <div className="flex gap-x-7">
              {SOCIAL_LINKS.map((social) => (
                <SocialIcon
                  key={social.label}
                  icon={social.icon}
                  label={social.label}
                  href={social.href}
                />
              ))}
            </div>

            {/* Location, Currency, Language */}
            <div className="flex gap-x-8">
              <div className="flex gap-x-2 items-center">
                <GrLocation size={22} aria-hidden="true" />
                <span>Asia</span>
              </div>

              <div className="flex gap-x-2 items-center">
                <div className="h-7 w-[0.5px] bg-dm-border-subtle" />
                <FaMoneyBills size={22} aria-hidden="true" />
                <span>USD</span>
              </div>

              <div className="flex gap-x-2 items-center">
                <div className="h-7 w-[0.5px] bg-dm-border-subtle" />
                <BsTranslate size={22} aria-hidden="true" />
                <span>EN</span>
              </div>
            </div>
          </div>
        </div>

        <Divider className="mb-3" />

        {/* Payment Methods */}
        <div
          className="1200:flex hidden items-center gap-x-4"
          aria-label="Accepted payment methods"
        >
          {PAYMENT_METHODS.map((payment) => (
            <PaymentIcon
              key={payment.label}
              icon={payment.icon}
              label={payment.label}
              size={payment.size}
            />
          ))}
        </div>

        <Divider className="mt-3" />

        {/* Bottom Section: Disclaimer & Copyright */}
        <div className="w-full mt-5 flex justify-between">
          {/* Disclaimer */}
          <div className="text-dm-text-secondary max-w-[310px] text-[14px] font-semibold">
            DISCLAIMER:{" "}
            <span className="text-[12px] font-normal">
              Trademarks, names, images, and any copyrighted materials,
              displayed on marketplace solely as a venue platform, are the
              property of their respective owners.
            </span>
          </div>

          {/* Copyright */}
          <div className="text-[12px] text-dm-text-primary max-w-[324px] text-right">
            Accepting more than 300 payment methods
            <br />
            ©Technical platform (solution) is provided by&nbsp;
            <Link href="/" className="hover:underline">
              Difmark
            </Link>
            &nbsp;2025
          </div>
        </div>
      </div>
    </footer>
  );
}
