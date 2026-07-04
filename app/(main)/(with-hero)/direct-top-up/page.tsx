/**
 * Direct Top Up Page
 *
 * Trang top up trực tiếp game và dịch vụ số
 * HeroCarousel được render bởi (with-hero)/layout.tsx
 */

import { DirectTopUpClient } from "@/components/home/directtopup/DirectTopUpClient";

interface DirectTopUpPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function DirectTopUpPage({
  searchParams,
}: DirectTopUpPageProps) {
  const { category } = await searchParams;

  return (
    <>
      <main
        id="main-content"
        className="flex w-full flex-col items-center gap-y-16 pt-8"
      >
        <DirectTopUpClient category={category} />
      </main>
    </>
  );
}
