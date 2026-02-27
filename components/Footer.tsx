"use client";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden border-t border-gray-100 bg-white dark:border-white/8 dark:bg-gray-950">
      <style>{`
        .social-btn {
          width: 45px;
          height: 45px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: none;
          background: rgba(124, 58, 237, 0.12);
          position: relative;
          border-radius: 10px;
          cursor: pointer;
          transition: background .3s;
          text-decoration: none;
        }
        .social-btn .svgContainer {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          background: transparent;
          border-radius: 10px;
          transition: none;
          border: none;
          z-index: 1;
          position: relative;
        }
        .social-btn .BG { display: none; }
        .social-btn:hover { background: rgba(124, 58, 237, 0.22); }
        .bg-instagram {
          background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
        }
        .bg-facebook {
          background: linear-gradient(45deg, #1877f2 0%, #0c5bc9 50%, #094fa8 100%);
        }
        .bg-whatsapp {
          background: linear-gradient(45deg, #25d366 0%, #128c7e 50%, #075e54 100%);
        }
      `}</style>

      {/* Subtle top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-60" />

      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">

        {/* Main grid */}
        <div className="grid grid-cols-2 gap-x-12 gap-y-12 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">

          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <span className="bg-gradient-to-r from-purple-500 to-violet-400 bg-clip-text text-2xl font-black tracking-tight text-transparent">
              JOKIA
            </span>
            <p className="mt-3 max-w-[220px] text-sm leading-relaxed text-gray-500 dark:text-white/50">
              Diseñando futuros digitales. Branding, marketing y web de alto
              impacto para marcas que no se conforman con lo ordinario.
            </p>

            <div className="mt-5 flex gap-6">
              {/* Instagram */}
              <a href="https://www.instagram.com/jokia.ia/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="social-btn">
                <span className="svgContainer">
                  <svg fill="currentColor" className="text-gray-800 dark:text-white" viewBox="0 0 448 512" height="1.1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"/>
                  </svg>
                </span>
                <span className="BG bg-instagram" />
              </a>

              {/* Facebook */}
              <a href="https://www.facebook.com/profile.php?id=61587477543232" target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="social-btn">
                <span className="svgContainer">
                  <svg fill="currentColor" className="text-gray-800 dark:text-white" viewBox="0 0 24 24" height="1.1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </span>
                <span className="BG bg-facebook" />
              </a>

              {/* WhatsApp */}
              <a href="https://wa.me/5493547656447" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" className="social-btn">
                <span className="svgContainer">
                  <svg fill="currentColor" className="text-gray-800 dark:text-white" viewBox="0 0 24 24" height="1.1em" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </span>
                <span className="BG bg-whatsapp" />
              </a>
            </div>
          </div>

          {/* Servicios */}
          <div>
            <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-white/30">
              Servicios
            </p>
            <ul className="space-y-2.5">
              {["Branding", "Marketing Digital", "Landing Pages", "POS (Próximamente)"].map((item) => (
                <li key={item}>
                  <a href="#servicios" className="text-sm text-gray-600 transition-colors duration-150 hover:text-purple-500 dark:text-white/55 dark:hover:text-purple-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Empresa */}
          <div>
            <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-white/30">
              Empresa
            </p>
            <ul className="space-y-2.5">
              {[
                { label: "Sobre Jokia", href: "#jokia" },
                { label: "Proceso", href: "#proceso" },
                { label: "Resultados", href: "#results" },
                { label: "Marcas", href: "#marcas" },
              ].map(({ label, href }) => (
                <li key={label}>
                  <a href={href} className="text-sm text-gray-600 transition-colors duration-150 hover:text-purple-500 dark:text-white/55 dark:hover:text-purple-400">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <p className="mb-4 text-[0.72rem] font-bold uppercase tracking-[0.12em] text-gray-400 dark:text-white/30">
              Contacto
            </p>
            <ul className="space-y-2.5">
              <li>
                <a href="#contacto" className="text-sm text-gray-600 transition-colors duration-150 hover:text-purple-500 dark:text-white/55 dark:hover:text-purple-400">
                  Iniciar proyecto
                </a>
              </li>
              <li>
                <a href="mailto:contacto@jokia.agency" className="text-sm text-gray-600 transition-colors duration-150 hover:text-purple-500 dark:text-white/55 dark:hover:text-purple-400">
                  contacto@jokia.agency
                </a>
              </li>
              <li>
                <a href="https://wa.me/5493547656447" target="_blank" rel="noopener noreferrer" className="text-sm text-gray-600 transition-colors duration-150 hover:text-purple-500 dark:text-white/55 dark:hover:text-purple-400">
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-gray-100 pt-8 dark:border-white/8 sm:flex-row">
          <p className="text-xs text-gray-400 dark:text-white/35">
            © {currentYear} JOKIA · Córdoba, Argentina · V1.
          </p>
          <div className="flex gap-6">
            <a href="#faq" className="text-xs text-gray-400 transition-colors duration-150 hover:text-purple-500 dark:text-white/35 dark:hover:text-purple-400">
              Preguntas frecuentes
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
}
