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
    { label: "Nosotros", href: "#jokia" },
    { label: "Servicios", href: "#servicios" },
    { label: "Proceso", href: "#proceso" },
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
        <style>{`
          /* ── Breakpoint custom 1000px para el nav ── */
          /* Por debajo de 1000px → hamburguesa */
          /* Por encima de 1000px → nav completo  */

          .nav-desktop { display: none; }
          .nav-hamburger { display: flex; }
          .nav-cta { display: none; }
          .nav-mobile-menu { display: block; }

          @media (min-width: 1000px) {
            .nav-desktop   { display: flex; }
            .nav-hamburger { display: none; }
            .nav-cta       { display: flex; }
            .nav-mobile-menu { display: none !important; }
          }

          /* ── Botón primario ── */
          .ui-btn {
            --btn-default-bg: transparent;
            --btn-padding: 10px 20px;
            --btn-transition: .3s;
            --btn-letter-spacing: .05rem;
            --btn-shadow: 0 2px 10px 0 rgba(0,0,0,0.137);
            --default-btn-color: #111111;
            --font-size: 0.875rem;
            --font-weight: 600;
            --font-family: ui-sans-serif, system-ui, -apple-system, sans-serif;
            box-sizing: border-box;
            padding: var(--btn-padding);
            display: flex;
            align-items: center;
            justify-content: center;
            white-space: nowrap;
            color: var(--default-btn-color);
            font: var(--font-weight) var(--font-size) var(--font-family);
            background: var(--btn-default-bg);
            cursor: pointer;
            transition: var(--btn-transition);
            box-shadow: var(--btn-shadow);
            border-radius: 10px;
            border: 2px solid #7241FF;
            text-decoration: none;
            position: relative;
          }
          .dark .ui-btn { --btn-default-bg: #010314; --default-btn-color: #ffffff; }
          .ui-btn::after {
            content: "";
            position: absolute;
            inset: 0;
            border-radius: inherit;
            background: radial-gradient(120% 120% at 10% 10%, rgba(114,65,255,0.18), transparent 60%);
            opacity: 0;
            transform: scale(0.98);
            transition: opacity .3s, transform .3s;
          }
          .ui-btn:hover, .ui-btn:focus {
            box-shadow: 0 0 10px 0 rgba(119,68,255,0.30);
            border-color: #7241FF;
            transform: translateY(-2px);
          }
          .ui-btn:hover::after, .ui-btn:focus::after { opacity: 1; transform: scale(1); }
          .ui-btn:active { transform: translateY(0); }

          /* ── Toggle theme ── */
          .toggle {
            width: 40px;
            height: 40px;
            border-radius: 50%;
            display: grid;
            place-items: center;
            cursor: pointer;
            line-height: 1;
          }
          .input { display: none; }
          .icon {
            grid-column: 1 / 1;
            grid-row: 1 / 1;
            transition: transform 500ms;
            line-height: 0.1;
          }
          .icon--moon { transition-delay: 200ms; color: #b4b4b4; }
          .icon--sun  { transform: scale(0); color: #ffa500; }
          #switch:checked + .icon--moon { transform: rotate(360deg) scale(0); }
          #switch:checked ~ .icon--sun  { transition-delay: 200ms; transform: scale(1) rotate(360deg); }
        `}</style>

        <div
          className={`flex items-center justify-between rounded-2xl border border-gray-200 bg-white/60 px-6 py-3 backdrop-blur-xl transition-all duration-300 dark:border-white/10 dark:bg-white/5 overflow-hidden ${
            isScrolled ? "shadow-lg" : ""
          }`}
        >
          {/* Logo */}
          <a
            href="#"
            className="bg-gradient-to-r from-jokia-primary to-jokia-secondary bg-clip-text text-2xl font-bold text-transparent shrink-0"
          >
            JOKIA
          </a>

          {/* Nav items — visible solo en 1050px+ */}
          <div className="nav-desktop items-center justify-center gap-6 flex-1 min-w-0 overflow-hidden">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="group relative text-[0.95rem] font-medium text-gray-700 transition-colors hover:text-jokia-primary dark:text-white/70 dark:hover:text-white whitespace-nowrap"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r from-jokia-primary to-jokia-secondary transition-all duration-300 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Right side actions */}
          <div className="flex items-center gap-3 shrink-0">
            {/* Theme toggle — siempre visible */}
            <label htmlFor="switch" className="toggle" aria-label="Toggle theme">
              <input
                type="checkbox"
                className="input"
                id="switch"
                checked={theme === "light"}
                onChange={toggleTheme}
              />
              <div className="icon icon--moon">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path fillRule="evenodd" d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="icon icon--sun">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                  <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
                </svg>
              </div>
            </label>

            {/* CTA — solo en 1050px+ */}
            <a href="#contacto" className="nav-cta ui-btn" aria-label="Iniciar proyecto">
              Iniciar proyecto →
            </a>

            {/* Hamburguesa — solo por debajo de 1050px */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="nav-hamburger p-1"
              aria-label="Abrir menú"
            >
              <svg className="h-6 w-6 text-gray-700 dark:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Menú desplegable — debajo de 1050px */}
        {isMobileMenuOpen && (
          <div className="nav-mobile-menu mt-2 rounded-2xl border border-gray-200 bg-white/95 p-4 backdrop-blur-xl dark:border-white/10 dark:bg-gray-900/95 shadow-xl">
            <div className="flex flex-col space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="rounded-xl px-4 py-3 text-[0.95rem] font-medium text-gray-700 transition-colors hover:bg-jokia-primary/10 hover:text-jokia-primary dark:text-white/70 dark:hover:bg-jokia-primary/10 dark:hover:text-white"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-2">
                <a
                  href="#contacto"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="ui-btn w-full"
                >
                  Iniciar proyecto →
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
