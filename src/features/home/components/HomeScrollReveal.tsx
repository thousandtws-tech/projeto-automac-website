"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

export function HomeScrollReveal({ children }: { children: React.ReactNode }) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start 55%"],
  });

  const translateY = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [110, 0],
  );
  const scale = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [1, 1] : [0.975, 1],
  );
  const radius = useTransform(
    scrollYProgress,
    [0, 1],
    reduceMotion ? [0, 0] : [28, 0],
  );
  const shadow = useTransform(
    scrollYProgress,
    [0, 1],
    [
      "0 -24px 70px rgba(0, 0, 0, 0.28)",
      "0 -8px 30px rgba(0, 0, 0, 0.08)",
    ],
  );

  return (
    <motion.div
      ref={sectionRef}
      style={{
        y: translateY,
        scale,
        borderTopLeftRadius: radius,
        borderTopRightRadius: radius,
        boxShadow: shadow,
      }}
      className="relative z-20 origin-top overflow-hidden bg-white will-change-transform"
    >
      {children}
    </motion.div>
  );
}
