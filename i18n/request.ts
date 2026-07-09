import { getRequestConfig } from "next-intl/server";
import { locales, defaultLocale } from "./config";

export default getRequestConfig(async () => {
  return {
    locale: defaultLocale,
    messages: (await import(`../messages/${defaultLocale}.json`)).default,
  };
});
