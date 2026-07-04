// Language and currency constants for UserMenu

export const LANGUAGES = [
  { code: "EN", flag: "🇬🇧", flagImage: "/en.svg", name: "English" },
  { code: "DE", flag: "🇩🇪", flagImage: "/de.svg", name: "Deutsch" },
  { code: "FR", flag: "🇫🇷", flagImage: "/fr.svg", name: "Français" },
  { code: "PL", flag: "🇵🇱", flagImage: "/pl.svg", name: "Polski" },
  { code: "ES", flag: "🇪🇸", flagImage: "/es.svg", name: "Español" },
  { code: "PT", flag: "🇵🇹", flagImage: "/pt.svg", name: "Português" },
  { code: "NL", flag: "🇳🇱", flagImage: "/nl.svg", name: "Nederlands" },
  { code: "IT", flag: "🇮🇹", flagImage: "/it.svg", name: "Italiano" },
  { code: "JA", flag: "🇯🇵", flagImage: "/jp.svg", name: "日本語" },
  { code: "CN", flag: "🇨🇳", flagImage: "/cn.svg", name: "中文" },
  { code: "KO", flag: "🇰🇷", flagImage: "/kr.svg", name: "한국어" },
  { code: "TR", flag: "🇹🇷", flagImage: "/tr.svg", name: "Türkçe" },
  { code: "FI", flag: "🇫🇮", flagImage: "/fi.svg", name: "Suomi" },
  { code: "AR", flag: "🇸🇦", flagImage: "/sa.svg", name: "العربية" },
  { code: "EL", flag: "🇬🇷", flagImage: "/gr.svg", name: "Ελληνικά" },
  { code: "NO", flag: "🇳🇴", flagImage: "/no.svg", name: "Norsk" },
  { code: "DA", flag: "🇩🇰", flagImage: "/dk.svg", name: "Dansk" },
  { code: "SV", flag: "🇸🇪", flagImage: "/se.svg", name: "Svenska" },
] as const;

export const CURRENCIES = [
  { code: "USD", symbol: "$", name: "US Dollar" },
  { code: "AUD", symbol: "A$", name: "Australian Dollar" },
  { code: "SGD", symbol: "S$", name: "Singapore Dollar" },
  { code: "JPY", symbol: "¥", name: "Japanese Yen" },
  { code: "CNY", symbol: "¥", name: "Chinese Yuan" },
  { code: "KRW", symbol: "₩", name: "Korean Won" },
  { code: "SAR", symbol: "﷼", name: "Saudi Riyal" },
  { code: "TRY", symbol: "₺", name: "Turkish Lira" },
  { code: "CAD", symbol: "C$", name: "Canadian Dollar" },
  { code: "EUR", symbol: "€", name: "Euro" },
  { code: "GBP", symbol: "£", name: "British Pound" },
] as const;

export type Language = (typeof LANGUAGES)[number];
export type Currency = (typeof CURRENCIES)[number];
