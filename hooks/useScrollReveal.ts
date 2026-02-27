import { useRef } from "react";
import { useInView } from "framer-motion";

/**
 * Returns a ref and a boolean indicating whether the element is in view.
 * @param threshold - fraction of the element that must be visible (0–1)
 * @param margin - root margin in px (e.g. "0px 0px -80px 0px" to trigger slightly before centre)
 */
export function useScrollReveal(threshold = 0.12, margin = "0px 0px -60px 0px") {
  const ref = useRef<HTMLElement | HTMLDivElement | null>(null);
  const isInView = useInView(ref as React.RefObject<Element>, {
    once: true,
    amount: threshold,
    margin,
  } as Parameters<typeof useInView>[1]);
  return { ref, isInView };
}
