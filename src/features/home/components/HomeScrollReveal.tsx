"use client";

import { useRef, type ReactNode } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

export function HomeScrollReveal({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 55,
    damping: 28,
    mass: 0.8,
  });
  const clipPath = useTransform(
    smoothProgress,
    [0, 0.22, 0.78, 1],
    [
      "inset(0% 8% 0% 8% round 18px)",
      "inset(0% 0% 0% 0% round 0px)",
      "inset(0% 0% 0% 0% round 0px)",
      "inset(0% 8% 0% 8% round 18px)",
    ],
  );
  const opacity = useTransform(smoothProgress, [0, 0.22, 0.78, 1], [0.88, 1, 1, 0.88]);

  return (
    <motion.div
      ref={ref}
      className="relative z-20 overflow-clip bg-white"
      style={prefersReducedMotion ? undefined : { clipPath, opacity }}
    >
      {children}
    </motion.div>
  );
}
