"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Scroll progress is scoped to this wrapper (the "runway" — Hero + Features)
// rather than the whole document, so the takeoff completes at a consistent
// point regardless of how long the rest of the page is.
export function ScrollAirplane({ children }: { children: ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const rotate = useTransform(scrollYProgress, [0, 1], [10, -55]);
  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-85vh"]);
  const x = useTransform(scrollYProgress, [0, 1], ["0vw", "6vw"]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0]);

  return (
    <div ref={targetRef}>
      {children}

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          style={{ y, x, opacity }}
          className="pointer-events-none fixed right-8 top-1/3 z-30 hidden will-change-transform lg:block xl:right-16"
        >
          <motion.svg
            style={{ rotate }}
            width="72"
            height="72"
            viewBox="0 0 100 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="drop-shadow-[0_0_18px_rgba(124,108,246,0.35)]"
          >
            <defs>
              <linearGradient
                id="airplane-gradient"
                x1="0"
                y1="100"
                x2="100"
                y2="0"
              >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>
            <path
              d="M92 8 L46 82 L38 56 L12 48 Z"
              stroke="url(#airplane-gradient)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
            <path
              d="M38 56 L58 36"
              stroke="url(#airplane-gradient)"
              strokeWidth="3"
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
}
