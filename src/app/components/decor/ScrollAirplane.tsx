"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

// Scroll progress is scoped to this wrapper (the "runway" — Hero + Features)
// rather than the whole document, so the climb completes at a consistent
// point regardless of how long the rest of the page is.
export function ScrollAirplane({ children }: { children: ReactNode }) {
  const targetRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0vh", "-90vh"]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, -12]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.9, 0]);

  return (
    <div ref={targetRef}>
      <div className="relative z-10">{children}</div>

      {!prefersReducedMotion && (
        <motion.div
          aria-hidden
          style={{ opacity }}
          className="pointer-events-none fixed inset-0 -z-10 flex items-center justify-center"
        >
          <motion.svg
            style={{ y, rotate }}
            width="320"
            height="320"
            viewBox="0 0 200 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[45vh] w-[45vh] max-h-[420px] max-w-[420px] will-change-transform"
          >
            <defs>
              <linearGradient
                id="plane-body-gradient"
                x1="0"
                y1="200"
                x2="200"
                y2="0"
              >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
            </defs>

            {/* fuselage */}
            <path
              d="M100 8
                 C112 8 121 40 121 100
                 C121 160 112 192 100 192
                 C88 192 79 160 79 100
                 C79 40 88 8 100 8 Z"
              fill="url(#plane-body-gradient)"
            />

            {/* main wing */}
            <path
              d="M100 84 L40 140 L58 148 L100 116 L142 148 L160 140 Z"
              fill="url(#plane-body-gradient)"
              opacity="0.85"
            />

            {/* tailplane */}
            <path
              d="M100 168 L72 190 L84 194 L100 178 L116 194 L128 190 Z"
              fill="url(#plane-body-gradient)"
              opacity="0.85"
            />

            {/* nose cone highlight */}
            <ellipse cx="100" cy="22" rx="11" ry="16" fill="var(--background)" opacity="0.15" />

            {/* cabin windows */}
            <circle cx="100" cy="52" r="3.2" fill="var(--background)" opacity="0.6" />
            <circle cx="100" cy="66" r="3.2" fill="var(--background)" opacity="0.6" />
            <circle cx="100" cy="80" r="3.2" fill="var(--background)" opacity="0.6" />
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
}
