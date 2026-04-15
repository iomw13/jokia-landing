"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type Locale = "es" | "en";

const messages = {
  es: {
    navbar: {
      brand: "JOKIA",
      items: {
        home: "Inicio",
        results: "Servicios",
        process: "Proceso",
        contact: "Contacto",
      },
      startProject: "Iniciar proyecto",
      toggleTheme: "Cambiar tema",
      openMenu: "Abrir menú",
      whatsapp: "Contactar por WhatsApp",
    },
    hero: {
      line1: "Recuperá tu tiempo.",
      line2Prefix: "",
      line2Accent: "Multiplicá",
      line2Suffix: " tus ingresos.",
      subtitle:
        "Automatizamos lo que te roba horas y construimos webs que convierten visitas en clientes.",
      ctaPrimary: "Quiero resultados reales",
      ctaSecondary: "Ver cómo lo hacemos",
    },
    stats: {
      headline: {
        prefix: "Páginas web",
        mid: " que convierten y ",
        midStrong: "automatizaciones",
        afterStrong: " que liberan tu tiempo. ",
        accent: "Un solo objetivo:",
        afterAccent: " que tu negocio crezca sin que vos tengas que estar en todo.",
      },
      items: {
        projects: "proyectos entregados",
        clients: "clientes activos",
        satisfaction: "satisfacción garantizada",
        automations: "automatizaciones",
      },
      services: {
        web: {
          label: "Página Web",
          desc: "Sitios rápidos, modernos y optimizados para convertir visitas en clientes.",
        },
        automation: {
          label: "Automatización",
          desc: "Conectamos tus herramientas para que el trabajo repetitivo suceda solo.",
        },
      },
    },
    process: {
      kicker: "// proceso",
      title1: "De la idea al ",
      title2: "resultado real",
      steps: [
        {
          number: "01",
          title: "Diagnóstico",
          tag: "ANÁLISIS",
          description:
            "Analizamos tu mercado, competencia y audiencia para detectar oportunidades concretas y accionables.",
          detail: "Auditoría digital · Benchmarking · Mapa de oportunidades",
          image: "/procesos/diagnostico.avif",
        },
        {
          number: "02",
          title: "Estrategia",
          tag: "PLANIFICACIÓN",
          description:
            "Definimos un plan claro, con objetivos medibles y criterios de éxito establecidos desde el inicio.",
          detail: "Roadmap · KPIs · Priorización de acciones",
          image: "/procesos/estrategia.avif",
        },
        {
          number: "03",
          title: "Ejecución",
          tag: "DESARROLLO",
          description:
            "Desarrollamos e implementamos cada solución con foco en el detalle, la funcionalidad y la calidad.",
          detail: "Diseño · Código · Integración · QA",
          image: "/procesos/ejecucion.avif",
        },
        {
          number: "04",
          title: "Optimización",
          tag: "MEJORA CONTINUA",
          description:
            "Evaluamos resultados, ajustamos y mejoramos de forma continua para lograr un mejor desempeño.",
          detail: "Métricas · A/B testing · Iteración",
          image: "/procesos/optimizacion.avif",
        },
      ],
    },
    contact: {
      leftKicker: "Jokia IA",
      leftTitle: "Tu próximo cliente\nempieza acá.",
      leftSubtitle: "Automatizamos tu negocio con inteligencia artificial.",
      title: "Hablemos de\ntu negocio.",
      replyTime: "Te respondemos en menos de 24 hs.",
      termsPrefix: "Acepto los ",
      termsLink: "Términos y condiciones",
      termsSuffix: "",
      termsHint: "Debés aceptar los Términos y condiciones para enviar el formulario.",
      labels: {
        firstName: "Nombre",
        lastName: "Apellido",
        email: "Email",
        phone: "Teléfono",
        help: "¿En qué te podemos ayudar?",
      },
      placeholders: {
        firstName: "Juan",
        lastName: "García",
        email: "juan@email.com",
        phone: "+54 9 351 xxxxxx",
        help: "Contanos sobre tu negocio...",
      },
      submit: {
        sending: "Enviando...",
        sent: "✓ Mensaje enviado",
        idle: "Empezar ahora →",
        error: "Hubo un error. Escribinos por WhatsApp.",
      },
    },
    footer: {
      blurb: "Diseñando experiencias web y automatizaciones eficientes para marcas que buscan crecer sin complicaciones.",
      contactTitle: "Contacto",
      startProject: "Iniciar proyecto",
      terms: "Términos y condiciones",
    },
    chatbot: {
      nudge: "Hola, escribime si necesitas ayuda :)",
      nudges: [
        "Hola, escribime si necesitas ayuda :)",
        "Estoy aquí para ayudarte ˙ᵕ˙",
        "A tu servicio 😎",
      ],
      title: "Jokia Assistant",
      status: "En línea · responde rápido",
      clear: "✕ limpiar",
      clearTitle: "Limpiar conversación",
      typing: "Escribiendo…",
      inputPlaceholder: "Escribí tu mensaje...",
      initialMessage: "¡Hola! 👋 Soy el asistente de Jokia. ¿Con quién hablo?",
      errorMessage: "Lo siento, hubo un error. ¿Podés intentarlo de nuevo?",
      quickReplies: [
        "Quiero automatizar procesos",
        "Necesito una web que convierta",
        "Quiero agendar una llamada",
      ],
      form: {
        title: "Dejanos tus datos",
        required: "Requerido",
        namePlaceholder: "Tu nombre *",
        phonePlaceholder: "Teléfono / WhatsApp *",
        emailPlaceholder: "Email (opcional)",
        termsPrefix: "Acepto los ",
        termsLink: "Términos y condiciones",
        termsSuffix: "",
        termsHint: "Aceptá los Términos y condiciones para poder enviar.",
        types: [
          "Web / Landing",
          "Automatización (n8n / Notion / IA)",
          "Integraciones",
          "Chatbot con IA",
          "Otro",
        ],
        submitIdle: "Quiero que me contacten 📩",
        submitLoading: "Enviando...",
        sentTitle: "✅ ¡Enviado!",
        sentSubtitle: "Te respondemos en menos de 2 horas hábiles.",
        error: "Hubo un error, intentá de nuevo.",
      },
      aria: {
        scrollTop: "Volver arriba",
        openChat: "Abrir chat",
        closeChat: "Cerrar chat",
      },
    },
  },
  en: {
    navbar: {
      brand: "JOKIA",
      items: {
        home: "Home",
        results: "Services",
        process: "Process",
        contact: "Contact",
      },
      startProject: "Start project",
      toggleTheme: "Toggle theme",
      openMenu: "Open menu",
      whatsapp: "WhatsApp",
    },
    hero: {
      line1: "Get your time back.",
      line2Prefix: "",
      line2Accent: "Grow",
      line2Suffix: " your revenue.",
      subtitle:
        "We automate what steals your hours and build websites that turn visits into customers.",
      ctaPrimary: "I want real results",
      ctaSecondary: "See how we do it",
    },
    stats: {
      headline: {
        prefix: "Websites",
        mid: " that convert and ",
        midStrong: "automations",
        afterStrong: " that free up your time. ",
        accent: "One goal:",
        afterAccent:
          " your business grows without you having to be everywhere at once.",
      },
      items: {
        projects: "projects delivered",
        clients: "active clients",
        satisfaction: "guaranteed satisfaction",
        automations: "automations",
      },
      services: {
        web: {
          label: "Website",
          desc: "Fast, modern websites optimized to turn visits into customers.",
        },
        automation: {
          label: "Automation",
          desc: "We connect your tools so repetitive work happens on its own.",
        },
      },
    },
    process: {
      kicker: "// process",
      title1: "From idea to ",
      title2: "real results",
      steps: [
        {
          number: "01",
          title: "Discovery",
          tag: "ANALYSIS",
          description:
            "We analyze your market, competitors, and audience to find clear, actionable opportunities.",
          detail: "Digital audit · Benchmarking · Opportunity map",
          image: "/procesos/diagnostico.avif",
        },
        {
          number: "02",
          title: "Strategy",
          tag: "PLANNING",
          description:
            "We define a clear plan with measurable goals and success criteria from day one.",
          detail: "Roadmap · KPIs · Action prioritization",
          image: "/procesos/estrategia.avif",
        },
        {
          number: "03",
          title: "Execution",
          tag: "BUILD",
          description:
            "We design and implement every solution with a focus on detail, functionality, and quality.",
          detail: "Design · Code · Integration · QA",
          image: "/procesos/ejecucion.avif",
        },
        {
          number: "04",
          title: "Optimization",
          tag: "ITERATION",
          description:
            "We measure results, refine, and continuously improve to reach better performance.",
          detail: "Metrics · A/B testing · Iteration",
          image: "/procesos/optimizacion.avif",
        },
      ],
    },
    contact: {
      leftKicker: "Jokia AI",
      leftTitle: "Your next customer\nstarts here.",
      leftSubtitle: "We automate your business with artificial intelligence.",
      title: "Let’s talk about\nyour business.",
      replyTime: "We reply within 24 hours.",
      termsPrefix: "I accept the ",
      termsLink: "Terms & Conditions",
      termsSuffix: "",
      termsHint: "You must accept the Terms & Conditions to submit the form.",
      labels: {
        firstName: "First name",
        lastName: "Last name",
        email: "Email",
        phone: "Phone",
        help: "How can we help?",
      },
      placeholders: {
        firstName: "John",
        lastName: "Doe",
        email: "john@email.com",
        phone: "+1 (555) 000-0000",
        help: "Tell us about your business...",
      },
      submit: {
        sending: "Sending...",
        sent: "✓ Message sent",
        idle: "Start now →",
        error: "Something went wrong. Message us on WhatsApp.",
      },
    },
    footer: {
      blurb: "Designing web experiences and efficient automations for brands that want to grow without complications.",
      contactTitle: "Contact",
      startProject: "Start project",
      terms: "Terms & Conditions",
    },
    chatbot: {
      nudge: "Hi, message me if you need help :)",
      nudges: [
        "Hi, message me if you need help :)",
        "I'm here to help you ˙ᵕ˙",
        "At your service 😎",
      ],
      title: "Jokia Assistant",
      status: "Online · replies fast",
      clear: "✕ clear",
      clearTitle: "Clear conversation",
      typing: "Typing…",
      inputPlaceholder: "Type your message...",
      initialMessage: "Hi! 👋 I'm Jokia's assistant. Who am I speaking with?",
      errorMessage: "Sorry, something went wrong. Could you try again?",
      quickReplies: [
        "I want to automate processes",
        "I need a website that converts",
        "I want to schedule a call",
      ],
      form: {
        title: "Leave your details",
        required: "Required",
        namePlaceholder: "Your name *",
        phonePlaceholder: "Phone / WhatsApp *",
        emailPlaceholder: "Email (optional)",
        termsPrefix: "I accept the ",
        termsLink: "Terms & Conditions",
        termsSuffix: "",
        termsHint: "You must accept the Terms & Conditions to send.",
        types: [
          "Website / Landing",
          "Automation (n8n / Notion / AI)",
          "Integrations",
          "AI chatbot",
          "Other",
        ],
        submitIdle: "Contact me 📩",
        submitLoading: "Sending...",
        sentTitle: "✅ Sent!",
        sentSubtitle: "We’ll reply within 2 business hours.",
        error: "Something went wrong, try again.",
      },
      aria: {
        scrollTop: "Back to top",
        openChat: "Open chat",
        closeChat: "Close chat",
      },
    },
  },
} as const;

type Messages = (typeof messages)["es"] | (typeof messages)["en"];

interface I18nContextValue {
  locale: Locale;
  messages: Messages;
  setLocale: (next: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const LOCALE_STORAGE_KEY = "jokia-locale";

const detectLocale = (): Locale => {
  if (typeof window === "undefined") return "es";
  try {
    const stored = window.localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "es" || stored === "en") return stored;
  } catch {
    // ignore
  }
  const langs = navigator.languages?.length ? navigator.languages : [navigator.language];
  const first = (langs[0] || "es").toLowerCase();
  if (first.startsWith("en")) return "en";
  if (first.startsWith("es")) return "es";
  return "es";
};

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("es");

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      window.localStorage.setItem(LOCALE_STORAGE_KEY, next);
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const t = window.setTimeout(() => setLocaleState(detectLocale()), 0);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const onLanguageChange = () => setLocaleState(detectLocale());
    window.addEventListener("languagechange", onLanguageChange);
    return () => window.removeEventListener("languagechange", onLanguageChange);
  }, []);

  const value = useMemo<I18nContextValue>(() => ({ locale, messages: messages[locale], setLocale }), [locale, setLocale]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18n must be used within I18nProvider");
  return ctx;
}
