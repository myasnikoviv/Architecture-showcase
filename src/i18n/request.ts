import { getRequestConfig } from "next-intl/server";
import { hasLocale } from "next-intl";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  const common = (await import(`../content/locales/${locale}/common.json`)).default;
  const hero = (await import(`../content/locales/${locale}/hero.json`)).default;

  return {
    locale,
    messages: {
      common,
      hero,
    },
  };
});
