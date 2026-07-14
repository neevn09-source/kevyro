"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";

const CABIN_WINDOWS = Array.from({ length: 9 }, (_, i) => 46 + i * 11);

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

  const y = useTransform(scrollYProgress, [0, 1], ["12vh", "-95vh"]);
  const x = useTransform(scrollYProgress, [0, 1], ["-20vw", "26vw"]);
  const rotate = useTransform(scrollYProgress, [0, 0.6, 1], [-6, -11, -18]);
  const opacity = useTransform(
    scrollYProgress,
    [0, 0.08, 0.92, 1],
    [0, 0.95, 0.95, 0]
  );

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
            style={{ y, x, rotate }}
            viewBox="0 0 240 240"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="h-[46vh] w-[46vh] max-h-[440px] max-w-[440px] will-change-transform"
          >
            <defs>
              <linearGradient
                id="plane-body"
                x1="70"
                y1="230"
                x2="172"
                y2="8"
                gradientUnits="userSpaceOnUse"
              >
                <stop offset="0%" stopColor="var(--accent-2)" />
                <stop offset="100%" stopColor="var(--accent)" />
              </linearGradient>
              <radialGradient id="plane-engine" cx="35%" cy="28%" r="80%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                <stop offset="55%" stopColor="#ffffff" stopOpacity="0.32" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0.1" />
              </radialGradient>
            </defs>

            {/* horizontal tailplane (drawn first, sits under the fin) */}
            <path
              d="M120 194 L172 214 L167 225 L138 217 L124 206 Z"
              fill="url(#plane-body)"
              opacity="0.8"
            />
            <path
              d="M120 194 L68 214 L73 225 L102 217 L116 206 Z"
              fill="url(#plane-body)"
              opacity="0.8"
            />

            {/* main wings */}
            <path
              d="M121 110 L232 150 L230 165 L199 173 L150 161 L124 140 Z"
              fill="url(#plane-body)"
              opacity="0.92"
            />
            <path d="M232 150 L243 145 L236 161 L230 165 Z" fill="url(#plane-body)" />
            <path
              d="M119 110 L8 150 L10 165 L41 173 L90 161 L116 140 Z"
              fill="url(#plane-body)"
              opacity="0.92"
            />
            <path d="M8 150 L-3 145 L4 161 L10 165 Z" fill="url(#plane-body)" />

            {/* wing trailing-edge / flap detailing */}
            <path
              d="M150 161 L199 173"
              stroke="var(--background)"
              strokeOpacity="0.18"
              strokeWidth="1.5"
            />
            <path
              d="M90 161 L41 173"
              stroke="var(--background)"
              strokeOpacity="0.18"
              strokeWidth="1.5"
            />

            {/* engine pylons */}
            <path d="M150 148 L156 168 L146 168 L142 150 Z" fill="url(#plane-body)" opacity="0.85" />
            <path d="M90 148 L84 168 L94 168 L98 150 Z" fill="url(#plane-body)" opacity="0.85" />

            {/* jet engines */}
            <ellipse cx="151" cy="180" rx="9" ry="20" fill="url(#plane-engine)" />
            <ellipse cx="151" cy="180" rx="9" ry="20" fill="none" stroke="var(--accent-2)" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx="151" cy="163" r="6.5" fill="none" stroke="var(--background)" strokeOpacity="0.4" strokeWidth="1.5" />
            <ellipse cx="151" cy="198" rx="4.5" ry="3" fill="var(--background)" opacity="0.3" />

            <ellipse cx="89" cy="180" rx="9" ry="20" fill="url(#plane-engine)" />
            <ellipse cx="89" cy="180" rx="9" ry="20" fill="none" stroke="var(--accent-2)" strokeOpacity="0.35" strokeWidth="1" />
            <circle cx="89" cy="163" r="6.5" fill="none" stroke="var(--background)" strokeOpacity="0.4" strokeWidth="1.5" />
            <ellipse cx="89" cy="198" rx="4.5" ry="3" fill="var(--background)" opacity="0.3" />

            {/* fuselage */}
            <path
              d="M120 8
                 C 133 8 141 42 142 82
                 C 143 118 142 150 139 178
                 C 137 200 131 218 120 230
                 C 109 218 103 200 101 178
                 C 98 150 97 118 98 82
                 C 99 42 107 8 120 8 Z"
              fill="url(#plane-body)"
            />

            {/* vertical tail fin — drawn on top of the fuselage so it reads
                as a raised surface instead of disappearing behind it */}
            <path
              d="M120 158 L108 208 L120 228 L132 208 Z"
              fill="url(#plane-body)"
              stroke="var(--background)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeLinejoin="round"
            />
            <path
              d="M120 158 L132 208 L120 228 Z"
              fill="var(--background)"
              opacity="0.16"
            />

            {/* livery cheatlines */}
            <path
              d="M104 50 C 101 90 101 140 105 182"
              stroke="var(--background)"
              strokeOpacity="0.25"
              strokeWidth="1.2"
              fill="none"
            />
            <path
              d="M136 50 C 139 90 139 140 135 182"
              stroke="var(--background)"
              strokeOpacity="0.25"
              strokeWidth="1.2"
              fill="none"
            />

            {/* nose highlight + cockpit windshield */}
            <ellipse cx="120" cy="20" rx="9" ry="14" fill="var(--background)" opacity="0.12" />
            <ellipse cx="120" cy="27" rx="7.5" ry="10" fill="var(--background)" opacity="0.4" />

            {/* cabin windows */}
            {CABIN_WINDOWS.map((cy) => (
              <g key={cy}>
                <circle cx="109" cy={cy} r="2.1" fill="var(--background)" opacity="0.55" />
                <circle cx="131" cy={cy} r="2.1" fill="var(--background)" opacity="0.55" />
              </g>
            ))}
          </motion.svg>
        </motion.div>
      )}
    </div>
  );
}
