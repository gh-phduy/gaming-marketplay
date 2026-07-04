/**
 * AboutSection2 Component
 *
 * Banner section displaying promotional text about game deals
 */

import Image from "next/image";

/**
 * AboutSection2 Component
 *
 * Full-width banner with background image and promotional text
 */
export default function AboutSection2() {
  return (
    <section
      className="h-[130px] 800:h-[204px] flex items-center justify-center text-center relative w-full"
      aria-label="Promotional banner"
    >
      {/* Background image */}
      <Image
        src="/about-us-2.webp"
        alt=""
        fill
        className="z-10 object-cover"
        aria-hidden="true"
        priority={false}
      />

      {/* Content */}
      <div className="relative z-20 flex flex-col gap-y-5 text-dm-text-primary p-4">
        <h2 className="text-[16px] 800:text-[32px] font-bold">
          Game Keys, Gift Cards &amp; Software — Best Prices on Difmark
        </h2>
        <p className="text-[14px] 800:text-[18px] text-dm-text-muted">
          Buy your favourite games for a low price.
          <br />
          Discounts, Prices, Bonuses for Games
        </p>
      </div>
    </section>
  );
}
