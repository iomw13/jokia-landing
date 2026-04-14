"use client";

import { useMemo, useState } from "react";
import { useI18n } from "./I18nProvider";

type TermBlock = {
  title: string;
  items: string[];
};

export default function TermsSection() {
  const { locale } = useI18n();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const content = useMemo(() => {
    if (locale === "en") {
      return {
        title: "Terms of Use",
        subtitle:
          "These terms regulate the use of this website and any engagement with services offered by JOKIA.",
        updated: "Last updated: 2026-04-13",
        blocks: [
          {
            title: "Acceptance and scope",
            items: [
              "By accessing or using this website, you agree to these Terms and to comply with applicable laws.",
              "If you do not agree, please do not use this website.",
              "These Terms apply to browsing the site and to any contact or request made through its forms, chat, or linked channels.",
            ],
          },
          {
            title: "Information and quotes",
            items: [
              "Content on this website is provided for informational purposes and does not constitute a binding offer.",
              "Any scope, pricing, or timelines are indicative until confirmed in writing.",
              "A project is considered confirmed only after written approval and, when applicable, payment of the agreed deposit.",
            ],
          },
          {
            title: "Client responsibilities",
            items: [
              "You are responsible for the accuracy of information provided and for the legality of any content you submit.",
              "You confirm that you hold the rights or permissions to use any logos, images, copy, and other materials you provide.",
              "Delays in providing required materials (content, access, approvals) may affect delivery timelines.",
            ],
          },
          {
            title: "Intellectual property",
            items: [
              "All website content (text, visuals, brand elements) is owned by JOKIA or used with permission and is protected by intellectual property laws.",
              "You may not copy, redistribute, or reuse this site’s content without prior written consent.",
              "Project deliverables and licensing/ownership terms are defined in the specific agreement or proposal for each project.",
            ],
          },
          {
            title: "Third-party services and links",
            items: [
              "This site may link to third-party services (e.g., WhatsApp, social networks). Their terms and privacy policies apply.",
              "JOKIA is not responsible for third-party availability, outages, changes, or policies.",
            ],
          },
          {
            title: "Liability and warranties",
            items: [
              "We strive to keep the site available and accurate, but we do not guarantee uninterrupted service or error-free content.",
              "To the maximum extent permitted by law, JOKIA is not liable for indirect, incidental, or consequential damages arising from the use of this website.",
              "Any warranties or service levels apply only if expressly stated in a written agreement.",
            ],
          },
          {
            title: "Changes to these Terms",
            items: [
              "We may update these Terms from time to time. The effective date is shown at the top of this section.",
              "Continued use of the website after changes implies acceptance of the updated Terms.",
            ],
          },
          {
            title: "Governing law and jurisdiction",
            items: [
              "These Terms are governed by the laws of Argentina.",
              "Any disputes will be submitted to the competent courts of Córdoba, Argentina, unless mandatory rules provide otherwise.",
            ],
          },
          {
            title: "Contact",
            items: ["For legal inquiries or requests, contact: contacto@jokia.agency"],
          },
        ] satisfies TermBlock[],
      };
    }

    return {
      title: "Términos y condiciones",
      subtitle:
        "Estos términos regulan el uso de este sitio web y cualquier contratación de servicios ofrecidos por JOKIA.",
      updated: "Última actualización: 2026-04-13",
      blocks: [
        {
          title: "Aceptación y alcance",
          items: [
            "Al acceder o utilizar este sitio, aceptás estos términos y te comprometés a cumplir la normativa aplicable.",
            "Si no estás de acuerdo, por favor no uses este sitio.",
            "Estos términos aplican al uso del sitio y a cualquier contacto o solicitud realizada por formulario, chat o canales enlazados.",
          ],
        },
        {
          title: "Información y presupuestos",
          items: [
            "El contenido es informativo y no constituye una oferta vinculante.",
            "Alcances, precios y tiempos son estimativos hasta su confirmación por escrito.",
            "Un proyecto se considera confirmado únicamente con aprobación por escrito y, cuando corresponda, el pago del anticipo acordado.",
          ],
        },
        {
          title: "Responsabilidades del cliente",
          items: [
            "Sos responsable por la veracidad de los datos enviados y por la legalidad del contenido que nos compartas.",
            "Declarás contar con derechos y/o permisos para usar logos, imágenes, textos y demás materiales que aportes.",
            "Demoras en entregar material, accesos o aprobaciones pueden afectar los plazos de entrega.",
          ],
        },
        {
          title: "Propiedad intelectual",
          items: [
            "Todo el contenido del sitio (textos, visuales, marca) pertenece a JOKIA o se utiliza con autorización y está protegido por normativa de propiedad intelectual.",
            "No está permitido copiar, redistribuir o reutilizar contenido sin consentimiento previo por escrito.",
            "Los derechos/licencias de entregables y materiales de un proyecto se definen en la propuesta o acuerdo específico de cada trabajo.",
          ],
        },
        {
          title: "Enlaces externos",
          items: [
            "Este sitio puede incluir enlaces a servicios de terceros (por ejemplo, redes sociales o WhatsApp). Aplican sus propias políticas y condiciones.",
            "JOKIA no es responsable por disponibilidad, caídas, cambios o políticas de terceros.",
          ],
        },
        {
          title: "Responsabilidad y garantías",
          items: [
            "Intentamos mantener el sitio disponible y la información actualizada, pero no garantizamos funcionamiento ininterrumpido ni ausencia de errores.",
            "En la máxima medida permitida por la ley, JOKIA no es responsable por daños indirectos, incidentales o consecuentes derivados del uso del sitio.",
            "Garantías o niveles de servicio solo aplican si están expresamente establecidos por escrito.",
          ],
        },
        {
          title: "Cambios en estos términos",
          items: [
            "Podemos actualizar estos términos periódicamente. La fecha de vigencia figura al inicio de esta sección.",
            "El uso continuado del sitio luego de una actualización implica la aceptación de los términos modificados.",
          ],
        },
        {
          title: "Ley aplicable y jurisdicción",
          items: [
            "Estos términos se rigen por las leyes de la República Argentina.",
            "Cualquier controversia será sometida a los tribunales competentes de Córdoba, Argentina, salvo normas imperativas en contrario.",
          ],
        },
        {
          title: "Contacto",
          items: [
            "Para consultas legales o solicitudes, escribinos a: contacto@jokia.agency",
          ],
        },
      ] satisfies TermBlock[],
    };
  }, [locale]);

  return (
    <section id="terminos" className="text-[#070707] dark:text-white">
      <div className="mx-auto w-full max-w-6xl px-6">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="mt-4 font-dm text-[clamp(2.2rem,4.6vw,3.4rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            <span className="bg-gradient-to-r from-[#7b5cff] to-[#1929e1] bg-clip-text text-transparent">
              {content.title}
            </span>
          </h1>
          <p className="mt-4 text-[15px] leading-7 text-[#070707]/70 dark:text-white/70">
            {content.subtitle}
          </p>
        </div>

        <div className="mx-auto mt-20 max-w-5xl rounded-3xl bg-white px-6 py-6 shadow-[0_20px_80px_rgba(140,100,220,0.35)] dark:bg-[#1e1e2e] dark:shadow-[0_20px_80px_rgba(0,0,0,0.6)] sm:px-10 sm:py-8">
          {content.blocks.map((block, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={block.title}>
                <details
                  open={isOpen}
                  onToggle={(e) => {
                    const nextOpen = (e.currentTarget as HTMLDetailsElement).open;
                    if (nextOpen) setOpenIndex(idx);
                    else if (openIndex === idx) setOpenIndex(null);
                  }}
                  className="group py-4"
                >
                  <summary className="flex w-full cursor-pointer list-none items-center justify-between gap-4 rounded-xl px-2 py-2 text-left transition-colors hover:bg-black/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#7b5cff]/25 dark:hover:bg-white/[0.06] dark:focus-visible:ring-[#7b5cff]/35">
                    <span className="text-[14px] font-semibold tracking-[-0.01em] text-[#070707] dark:text-white sm:text-[15px]">
                      {block.title}
                    </span>
                    <span className="text-[#070707]/55 transition-transform group-open:rotate-45 dark:text-white/65">
                      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </summary>

                  <ul className="mt-4 list-disc space-y-2 pl-5 text-[14px] leading-7 text-[#070707]/70 dark:text-white/70 sm:text-[15px]">
                    {block.items.map((it) => (
                      <li key={it}>{it}</li>
                    ))}
                  </ul>
                </details>
                {idx < content.blocks.length - 1 && <div className="h-px w-full bg-black/10 dark:bg-white/10" />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
