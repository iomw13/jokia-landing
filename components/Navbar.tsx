"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { useTheme } from "./ThemeProvider";
import { useI18n } from "./I18nProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { toggleTheme } = useTheme();
  const { locale, messages, setLocale } = useI18n();
  const pathname = usePathname();

  const homePrefix = pathname === "/" ? "" : "/";

  useEffect(() => {
    let raf: number | null = null;
    let last = false;
    const onScroll = () => {
      if (raf != null) return;
      raf = window.requestAnimationFrame(() => {
        raf = null;
        const next = window.scrollY > 16;
        if (next === last) return;
        last = next;
        setIsScrolled(next);
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf != null) window.cancelAnimationFrame(raf);
    };
  }, []);

  const navItems = [
    { label: messages.navbar.items.home, href: `${homePrefix}#inicio` },
    { label: messages.navbar.items.results, href: `${homePrefix}#resultados` },
    { label: messages.navbar.items.process, href: `${homePrefix}#proceso` },
    { label: messages.navbar.items.contact, href: `${homePrefix}#contacto` },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${isScrolled ? "py-4" : "py-6"}`}
      suppressHydrationWarning
    >
      <div className="mx-auto w-full max-w-6xl px-6">
        <div
          className={`flex items-center justify-between rounded-2xl border px-5 py-3 transition-[background-color,border-color,box-shadow] duration-300 ${
            isScrolled
              ? "border-black/10 bg-white/55 shadow-lg backdrop-blur-xl saturate-150 dark:border-white/10 dark:bg-[#070707]/45"
              : "border-transparent bg-transparent shadow-none"
          }`}
        >
          <a href={`${homePrefix}#inicio`} className="text-sm font-semibold tracking-tight text-[#070707] dark:text-white">
            {messages.navbar.brand}
          </a>

          <div className="hidden items-center gap-8 md:flex" suppressHydrationWarning>
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className={`text-sm font-medium transition-colors ${
                  isScrolled
                    ? "text-[#070707]/70 hover:text-[#070707] dark:text-white/70 dark:hover:text-white"
                    : "text-[#070707]/60 hover:text-[#070707] dark:text-white/60 dark:hover:text-white"
                }`}
                suppressHydrationWarning
              >
                {item.label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <div
              className={`hidden h-10 items-center overflow-hidden rounded-xl border p-1 md:inline-flex ${
                isScrolled
                  ? "border-black/10 bg-white/60 dark:border-white/10 dark:bg-white/10"
                  : "border-black/10 bg-white/40 dark:border-white/10 dark:bg-white/5"
              }`}
              role="group"
              aria-label="Language"
            >
              <button
                type="button"
                onClick={() => setLocale("es")}
                className={`h-8 rounded-lg px-2.5 text-[11px] font-semibold tracking-[0.14em] transition-colors ${
                  locale === "es"
                    ? "bg-[#070707] text-white dark:bg-white dark:text-[#070707]"
                    : "text-[#070707]/65 hover:text-[#070707] dark:text-white/65 dark:hover:text-white"
                }`}
                aria-pressed={locale === "es"}
              >
                ES
              </button>
              <button
                type="button"
                onClick={() => setLocale("en")}
                className={`h-8 rounded-lg px-2.5 text-[11px] font-semibold tracking-[0.14em] transition-colors ${
                  locale === "en"
                    ? "bg-[#070707] text-white dark:bg-white dark:text-[#070707]"
                    : "text-[#070707]/65 hover:text-[#070707] dark:text-white/65 dark:hover:text-white"
                }`}
                aria-pressed={locale === "en"}
              >
                EN
              </button>
            </div>
            <button
              type="button"
              onClick={toggleTheme}
              aria-label={messages.navbar.toggleTheme}
              className={`h-10 w-10 rounded-xl border transition-colors ${
                isScrolled
                  ? "border-black/10 bg-white/60 text-[#070707]/80 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
                  : "border-black/10 bg-white/40 text-[#070707]/75 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
              }`}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="mx-auto hidden dark:block">
                <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
              </svg>
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" className="mx-auto dark:hidden">
                <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
              </svg>
            </button>

            <a
              href={`${homePrefix}#contacto`}
              className={`hidden items-center justify-center rounded-xl px-5 py-2 text-sm font-semibold transition-colors md:inline-flex ${
                isScrolled
                  ? "bg-[#070707] text-white hover:bg-black/90 dark:bg-white dark:text-[#070707] dark:hover:bg-white/90"
                  : "border border-black/15 bg-white/40 text-[#070707] hover:bg-white/60 dark:border-white/15 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
              }`}
            >
              {messages.navbar.startProject}
            </a>

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((v) => !v)}
              className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border transition-colors md:hidden ${
                isScrolled
                  ? "border-black/10 bg-white/60 text-[#070707]/80 hover:bg-white dark:border-white/10 dark:bg-white/10 dark:text-white/80 dark:hover:bg-white/15"
                  : "border-black/10 bg-white/40 text-[#070707]/75 hover:bg-white/60 dark:border-white/10 dark:bg-white/5 dark:text-white/75 dark:hover:bg-white/10"
              }`}
              aria-label={messages.navbar.openMenu}
            >
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                {isMobileMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-3 rounded-2xl border border-black/10 bg-white/90 p-5 shadow-lg backdrop-blur-md dark:border-white/10 dark:bg-[#070707]/90 md:hidden">
            <div className="flex flex-col gap-3" suppressHydrationWarning>
              <div className="flex items-center gap-2">
                <div
                  className="flex h-10 flex-1 items-center overflow-hidden rounded-xl border border-black/10 bg-white/60 p-1 dark:border-white/10 dark:bg-white/10"
                  role="group"
                  aria-label="Language"
                >
                  <button
                    type="button"
                    onClick={() => setLocale("es")}
                    className={`h-8 flex-1 rounded-lg text-[11px] font-semibold tracking-[0.14em] transition-colors ${
                      locale === "es"
                        ? "bg-[#070707] text-white dark:bg-white dark:text-[#070707]"
                        : "text-[#070707]/65 hover:text-[#070707] dark:text-white/65 dark:hover:text-white"
                    }`}
                    aria-pressed={locale === "es"}
                  >
                    ES
                  </button>
                  <button
                    type="button"
                    onClick={() => setLocale("en")}
                    className={`h-8 flex-1 rounded-lg text-[11px] font-semibold tracking-[0.14em] transition-colors ${
                      locale === "en"
                        ? "bg-[#070707] text-white dark:bg-white dark:text-[#070707]"
                        : "text-[#070707]/65 hover:text-[#070707] dark:text-white/65 dark:hover:text-white"
                    }`}
                    aria-pressed={locale === "en"}
                  >
                    EN
                  </button>
                </div>
              </div>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-sm font-medium text-[#070707]/75 hover:text-[#070707] dark:text-white/75 dark:hover:text-white"
                  suppressHydrationWarning
                >
                  {item.label}
                </a>
              ))}
              <a
                href={`${homePrefix}#contacto`}
                onClick={() => setIsMobileMenuOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-xl bg-[#070707] px-5 py-2 text-sm font-semibold text-white hover:bg-black/90 dark:bg-white dark:text-[#070707] dark:hover:bg-white/90"
              >
                {messages.navbar.startProject}
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
