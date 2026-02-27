 "use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ReactNode, useRef, MouseEvent, useEffect, useState } from "react";
import Image from "next/image";

interface ServiceCardProps {
  title: string;
  description: string;
  icon?: ReactNode;
  image?: string;
  delay?: number;
}

export default function ServiceCard({
  title,
  description,
  icon,
  image,
  delay = 0,
}: ServiceCardProps) {
  const [isMobile, setIsMobile] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ["7.5deg", "-7.5deg"]
  );
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ["-7.5deg", "7.5deg"]
  );

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    const checkMobile = () => {
      if (typeof window === "undefined") return;
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    if (typeof window === "undefined") return;
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  if (isMobile) {
    return (
      <div className="group relative h-full">
        <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div
            className="absolute inset-0 rounded-2xl"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(58, 154, 255, 0.8), transparent)",
              maskImage:
                "linear-gradient(transparent, black 20%, black 80%, transparent)",
            }}
          >
            <div className="absolute inset-0 rounded-2xl animate-border-beam [--duration:2]" />
          </div>
        </div>

        <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.07] group-hover:shadow-glow">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
            {image ? (
              <div className="mb-4 h-12 w-12 overflow-hidden rounded-xl">
                <Image
                  src={image}
                  alt={title}
                  width={48}
                  height={48}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : icon ? (
              <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-jokia-primary/20 to-jokia-secondary/20 p-2.5 backdrop-blur-sm">
                {icon}
              </div>
            ) : null}

            <h3 className="mb-2 bg-gradient-to-br from-white to-white/70 bg-clip-text text-xl font-bold text-transparent">
              {title}
            </h3>

            <p className="text-sm leading-relaxed text-white/60">
              {description}
            </p>
          </div>

          <div className="pointer-events-none absolute -left-[100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      viewport={{ once: true, margin: "-100px" }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="group relative h-full"
    >
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <div
          className="absolute inset-0 rounded-2xl"
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(58, 154, 255, 0.8), transparent)",
            maskImage:
              "linear-gradient(transparent, black 20%, black 80%, transparent)",
          }}
        >
          <div className="absolute inset-0 rounded-2xl animate-border-beam [--duration:2]" />
        </div>
      </div>

      <div className="relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl transition-all duration-500 group-hover:border-white/20 group-hover:bg-white/[0.07] group-hover:shadow-glow">
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

        <div className="relative z-10" style={{ transform: "translateZ(20px)" }}>
          {image ? (
            <div className="mb-4 h-12 w-12 overflow-hidden rounded-xl">
              <Image
                src={image}
                alt={title}
                width={48}
                height={48}
                className="h-full w-full object-cover"
              />
            </div>
          ) : icon ? (
            <div className="mb-4 h-12 w-12 rounded-xl bg-gradient-to-br from-jokia-primary/20 to-jokia-secondary/20 p-2.5 backdrop-blur-sm">
              {icon}
            </div>
          ) : null}

          <h3 className="mb-2 bg-gradient-to-br from-white to-white/70 bg-clip-text text-xl font-bold text-transparent">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-white/60">
            {description}
          </p>
        </div>

        <div className="pointer-events-none absolute -left-[100%] top-0 h-full w-full bg-gradient-to-r from-transparent via-white/10 to-transparent transition-all duration-1000 group-hover:left-[100%]" />
      </div>
    </motion.div>
  );
}
