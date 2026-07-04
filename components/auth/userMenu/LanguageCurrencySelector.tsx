"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MdArrowDropDown } from "react-icons/md";
import { LANGUAGES, CURRENCIES, Language } from "./constants";

interface LanguageCurrencySelectorProps {
  selectedLang: string;
  onLanguageChange: (lang: string) => void;
  selectedCurrency: string;
  onCurrencyChange: (currency: string) => void;
}

function FlagDisplay({ lang }: { lang: Language }) {
  return (
    <Image
      src={lang.flagImage}
      alt={lang.code}
      width={20}
      height={14}
      className="rounded-sm"
    />
  );
}

export function LanguageCurrencySelector({
  selectedLang,
  onLanguageChange,
  selectedCurrency,
  onCurrencyChange,
}: LanguageCurrencySelectorProps) {
  const [langOpen, setLangOpen] = useState(false);
  const [currencyOpen, setCurrencyOpen] = useState(false);

  return (
    <div className="mt-6 flex items-center overflow-hidden rounded-md border border-white/5 bg-[#1c243a]/50">
      {/* Language Popover */}
      <Popover open={langOpen} onOpenChange={setLangOpen}>
        <PopoverTrigger className="flex flex-1 items-center justify-between px-3 py-2.5 text-[13px] text-white/90 transition hover:bg-white/5">
          <div className="flex items-center gap-2">
            <FlagDisplay
              lang={LANGUAGES.find((l) => l.code === selectedLang)!}
            />
            <span className="font-medium">{selectedLang}</span>
          </div>
          <MdArrowDropDown className="text-lg text-white/30" />
        </PopoverTrigger>
        <PopoverContent
          className="w-[280px] border-white/10 bg-[#1c243a] p-3 text-white"
          side="bottom"
          align="start"
        >
          <div className="grid grid-cols-2 gap-2">
            {LANGUAGES.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  onLanguageChange(lang.code);
                  setLangOpen(false);
                }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                  selectedLang === lang.code
                    ? "border-brand-primary bg-brand-primary/10"
                    : "border-white/5 bg-white/5 hover:border-white/20"
                }`}
              >
                <FlagDisplay lang={lang} />
                <span>{lang.code}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Divider */}
      <div className="h-5 w-[1px] bg-white/5" />

      {/* Currency Popover */}
      <Popover open={currencyOpen} onOpenChange={setCurrencyOpen}>
        <PopoverTrigger className="flex flex-1 items-center justify-between px-3 py-2.5 text-[13px] text-white/90 transition hover:bg-white/5">
          <div className="flex items-center gap-2">
            <span className="font-mono text-white/40">
              {CURRENCIES.find((c) => c.code === selectedCurrency)?.symbol}
            </span>
            <span className="font-medium">{selectedCurrency}</span>
          </div>
          <MdArrowDropDown className="text-lg text-white/30" />
        </PopoverTrigger>
        <PopoverContent
          className="w-[280px] border-white/10 bg-[#1c243a] p-3 text-white"
          side="bottom"
          align="end"
        >
          <div className="grid grid-cols-2 gap-2">
            {CURRENCIES.map((curr) => (
              <button
                key={curr.code}
                onClick={() => {
                  onCurrencyChange(curr.code);
                  setCurrencyOpen(false);
                }}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition ${
                  selectedCurrency === curr.code
                    ? "border-brand-primary bg-brand-primary/10"
                    : "border-white/5 bg-white/5 hover:border-white/20"
                }`}
              >
                <span className="font-mono text-white/50">{curr.symbol}</span>
                <span>{curr.code}</span>
              </button>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
