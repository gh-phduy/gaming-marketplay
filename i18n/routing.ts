import { defineRouting } from 'next-intl/routing';
import { locales, defaultLocale } from './config';

import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales,
  defaultLocale,
});

export const { Link, redirect, usePathname, useRouter } = createNavigation(routing);
