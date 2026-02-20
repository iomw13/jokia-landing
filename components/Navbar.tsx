 "use client";

import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { label: "Jokia", href: "#jokia" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
    { label: "Resultados", href: "#results" },
    { label: "Marcas", href: "#marcas" },
    { label: "Contacto", href: "#contacto" },
  ];

  return (
    <nav
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled ? "py-2" : "py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between rounded-2xl border border-gray-200 bg-white/60 px-6 py-3 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/5 ${
            isScrolled ? "shadow-lg" : ""
          }`}
        >
          <a
            href="#"
            className="bg-gradient-to-r from-jokia-primary to-jokia-secondary bg-clip-text text-2xl font-bold text-transparent"
          >
            JOKIA
          </a>

          <div className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[1rem] font-medium text-gray-700 transition-colors hover:text-jokia-primary dark:text-white/70 dark:hover:text-white"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-jokia-primary to-jokia-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white/50 text-gray-700 transition-all hover:border-jokia-primary/30 hover:bg-white dark:border-white/10 dark:bg-white/5 dark:text-white/70 dark:hover:border-jokia-primary/30 dark:hover:bg-white/10"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
                  />
                </svg>
              )}
            </button>

            <a
              href="#contacto"
              className="hidden rounded-xl bg-gradient-to-r from-jokia-primary to-jokia-secondary px-6 py-2.5 text-[1rem] font-medium text-white shadow-lg transition-all hover:scale-105 hover:shadow-xl md:block"
            >
              Iniciar proyecto →
            </a>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="block md:hidden"
              aria-label="Abrir menú"
            >
              <svg
                className="h-6 w-6 text-gray-700 dark:text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="mt-2 rounded-2xl border border-gray-200 bg-white/90 p-4 backdrop-blur-xl animate-fade-in dark:border-white/10 dark:bg-white/5 md:hidden">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-lg px-4 py-2 text-[1rem] font-medium text-gray-700 transition-colors hover:bg-jokia-primary/10 hover:text-jokia-primary dark:text-white/70 dark:hover:bg-jokia-primary/10 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="#contacto"
                onClick={() => setIsMobileMenuOpen(false)}
                className="rounded-lg bg-gradient-to-r from-jokia-primary to-jokia-secondary px-4 py-2 text-center text-[1rem] font-medium text-white"
              >
                Iniciar proyecto →
              </a>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
