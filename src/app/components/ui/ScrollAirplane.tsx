"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const PASSENGER_WINDOWS = Array.from({ length: 26 }, (_, i) =>
  Math.round(172 + i * ((788 - 172) / 25))
);

const PANEL_RIVETS_TOP = Array.from({ length: 14 }, (_, i) =>
  Math.round(200 + i * 42)
);

const PANEL_RIVETS_BOTTOM = Array.from({ length: 14 }, (_, i) =>
  Math.round(200 + i * 42)
);

const SPRING = { stiffness: 55, damping: 20, mass: 0.7 };
const OPACITY_SPRING = { stiffness: 90, damping: 26, mass: 0.5 };

// A true side-profile narrow-body jet, nose fixed to the right / tail fixed
// to the left. Rotation stays within ~2deg total so the aircraft never
// reads as banking toward or away from the viewer.
export function ScrollAirplane() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Raw, scroll-driven keyframes (numeric so useSpring can smooth them).
  const rawXVw = useTransform(scrollYProgress, [0, 1], [-18, 116]);
  const rawYVh = useTransform(scrollYProgress, [0, 0.5, 1], [86, 42, -12]);
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.72, 1, 1.08, 0.92]
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.95, 1],
    [0, 1, 1, 0]
  );
  const rawTilt = useTransform(scrollYProgress, [0, 0.5, 1], [-1.4, 0.6, -1]);

  // Spring-smoothed versions for a cinematic, non-mechanical glide.
  const xVw = useSpring(rawXVw, SPRING);
  const yVh = useSpring(rawYVh, SPRING);
  const scale = useSpring(rawScale, SPRING);
  const opacity = useSpring(rawOpacity, OPACITY_SPRING);
  const tilt = useSpring(rawTilt, SPRING);

  // Subtle continuous flight character layered on top of the spring path:
  // a gentle bob and a tiny bank, both derived purely from scroll progress
  // (no rAF loop) so the component never re-renders and stays idle when
  // the page isn't scrolling.
  const bobVh = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 9) * 1.6);
  const bankDeg = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 5) * 0.9);

  const combinedYVh = useTransform([yVh, bobVh], ([yv, bv]: number[]) => yv + bv);
  const combinedRotate = useTransform(
    [tilt, bankDeg],
    ([tv, bv]: number[]) => tv + bv
  );

  const x = useTransform(xVw, (v) => `${v}vw`);
  const y = useTransform(combinedYVh, (v) => `${v}vh`);

  if (prefersReducedMotion) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[999] overflow-hidden"
    >
      <motion.div
        style={{ x, y, scale, rotate: combinedRotate, opacity }}
        className="absolute left-0 top-0 will-change-transform"
      >
        <svg
          viewBox="0 0 960 300"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-[220px] sm:w-[300px] md:w-[380px] lg:w-[460px] xl:w-[520px]"
        >
          <defs>
            <linearGradient id="fuselageGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="38%" stopColor="#fbfcfe" />
              <stop offset="66%" stopColor="#eef1f5" />
              <stop offset="100%" stopColor="#d5dbe2" />
            </linearGradient>

            <linearGradient id="wingGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#c5cad1" />
            </linearGradient>

            <linearGradient id="engineGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f5f6f8" />
              <stop offset="32%" stopColor="#cacdd3" />
              <stop offset="68%" stopColor="#9da2a9" />
              <stop offset="100%" stopColor="#7c828b" />
            </linearGradient>

            <linearGradient id="engineFanGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#2b2f36" />
              <stop offset="100%" stopColor="#565b63" />
            </linearGradient>

            <linearGradient id="windowGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e2f2ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7ea6c8" stopOpacity="0.85" />
            </linearGradient>

            <linearGradient id="cockpitGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#22334a" />
              <stop offset="100%" stopColor="#4d7096" />
            </linearGradient>

            <linearGradient id="highlightGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="shadowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.32" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <mask id="topHighlightMask">
              <rect x="0" y="0" width="960" height="150" fill="url(#highlightGrad)" />
            </mask>

            <filter id="softShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feOffset in="blur" dx="0" dy="9" result="offsetBlur" />
              <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.22" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ambient contact shadow, cheap radial falloff instead of a blur filter */}
          <ellipse cx="480" cy="232" rx="430" ry="42" fill="url(#shadowGrad)" />

          <g filter="url(#softShadow)">
            {/* far-side wing tip, peeking over the dorsal line for dihedral depth */}
            <path
              d="M 505 92 L 560 68 L 585 72 L 545 96 Z"
              fill="url(#wingGrad)"
              opacity="0.55"
            />

            {/* far-side engine hint, tucked behind the wing root */}
            <ellipse cx="522" cy="188" rx="30" ry="14" fill="url(#engineGrad)" opacity="0.55" />
            <path d="M 505 182 L 540 182 L 545 172 L 512 172 Z" fill="url(#wingGrad)" opacity="0.5" />

            {/* horizontal stabilizer (far side hint) */}
            <path d="M 110 138 L 150 118 L 168 122 L 132 144 Z" fill="url(#wingGrad)" opacity="0.55" />

            {/* horizontal stabilizer (near side) */}
            <path
              d="M 96 150 L 58 174 L 74 180 L 128 168 L 148 150 Z"
              fill="url(#wingGrad)"
            />

            {/* vertical stabilizer */}
            <path
              d="M 163 114 L 197 40 L 233 46 L 206 120 Z"
              fill="url(#wingGrad)"
            />
            <path
              d="M 197 40 L 233 46 L 214 96 Z"
              fill="var(--background, #08080c)"
              opacity="0.06"
            />

            {/* main wing root fairing */}
            <ellipse cx="470" cy="203" rx="18" ry="9" fill="url(#fuselageGrad)" />

            {/* main wing (near side) */}
            <path
              d="M 468 200 C 490 197 518 197 544 200
                 L 634 252 L 604 260 L 522 214 L 480 206 Z"
              fill="url(#wingGrad)"
            />
            <path
              d="M 522 214 L 604 260"
              stroke="#9aa0a8"
              strokeOpacity="0.5"
              strokeWidth="1.5"
              fill="none"
            />

            {/* engine pylon (near side) */}
            <path d="M 414 200 L 448 200 L 456 178 L 428 176 Z" fill="url(#wingGrad)" />

            {/* engine nacelle (near side) */}
            <path
              d="M 372 210
                 C 372 201 384 198 400 198
                 L 468 198
                 C 484 198 490 208 490 224
                 C 490 240 484 250 468 250
                 L 400 250
                 C 384 250 372 247 372 238
                 Z"
              fill="url(#engineGrad)"
            />
            {/* intake fan (forward / right end, facing the nose direction) */}
            <ellipse cx="486" cy="224" rx="7" ry="23" fill="url(#engineFanGrad)" />
            <ellipse cx="483" cy="224" rx="4.5" ry="19" fill="#1d2024" opacity="0.7" />
            <path d="M 483 208 L 483 240" stroke="#7d838c" strokeWidth="1" opacity="0.6" />
            <path d="M 478 210 L 488 238" stroke="#7d838c" strokeWidth="0.8" opacity="0.5" />
            <path d="M 488 210 L 478 238" stroke="#7d838c" strokeWidth="0.8" opacity="0.5" />
            {/* exhaust (aft / left end) */}
            <ellipse cx="374" cy="224" rx="4" ry="17" fill="#3a3d42" opacity="0.75" />

            {/* fuselage */}
            <path
              d="M 60 150
                 Q 90 128 140 118
                 C 200 108 300 100 450 96
                 C 600 97 720 102 800 110
                 Q 860 116 890 135
                 Q 900 143 900 150
                 Q 900 157 890 165
                 Q 860 184 800 190
                 C 720 198 600 203 450 204
                 C 300 202 200 196 140 182
                 Q 90 172 60 150
                 Z"
              fill="url(#fuselageGrad)"
            />
            {/* glossy top sheen */}
            <path
              d="M 60 150
                 Q 90 128 140 118
                 C 200 108 300 100 450 96
                 C 600 97 720 102 800 110
                 Q 860 116 890 135
                 Q 900 143 900 150
                 L 870 150
                 C 780 138 600 130 450 129
                 C 300 130 170 137 90 149
                 Z"
              fill="#ffffff"
              opacity="0.5"
              mask="url(#topHighlightMask)"
            />

            {/* cockpit windshield */}
            <path
              d="M 806 113 C 826 116 848 121 864 129
                 C 858 135 848 137 838 135
                 C 820 132 808 126 802 120 Z"
              fill="url(#cockpitGrad)"
            />

            {/* forward entry door */}
            <rect
              x="222" y="150" width="15" height="35" rx="5"
              fill="none" stroke="#aab0b8" strokeOpacity="0.55" strokeWidth="1.3"
            />
            {/* aft entry door */}
            <rect
              x="696" y="156" width="15" height="35" rx="5"
              fill="none" stroke="#aab0b8" strokeOpacity="0.55" strokeWidth="1.3"
            />
            {/* cargo door */}
            <rect
              x="378" y="187" width="52" height="15" rx="2"
              fill="none" stroke="#9aa0a8" strokeOpacity="0.5" strokeWidth="1.2"
            />

            {/* passenger windows */}
            {PASSENGER_WINDOWS.map((cx) => (
              <ellipse key={cx} cx={cx} cy="148" rx="6.4" ry="8.2" fill="url(#windowGrad)" />
            ))}

            {/* panel lines */}
            <path
              d="M 140 122 C 260 112 560 106 830 116"
              stroke="#c7ccd2" strokeOpacity="0.6" strokeWidth="1" fill="none"
            />
            <path
              d="M 140 178 C 260 190 560 197 820 186"
              stroke="#c7ccd2" strokeOpacity="0.6" strokeWidth="1" fill="none"
            />
            <path
              d="M 200 112 L 210 190" stroke="#c7ccd2" strokeOpacity="0.4" strokeWidth="1" fill="none"
            />
            <path
              d="M 470 97 L 465 203" stroke="#c7ccd2" strokeOpacity="0.4" strokeWidth="1" fill="none"
            />
            <path
              d="M 700 104 L 705 195" stroke="#c7ccd2" strokeOpacity="0.4" strokeWidth="1" fill="none"
            />

            {/* rivet detailing along the panel seams */}
            {PANEL_RIVETS_TOP.map((cx) => (
              <circle key={`t-${cx}`} cx={cx} cy={116} r="0.9" fill="#9aa0a8" opacity="0.5" />
            ))}
            {PANEL_RIVETS_BOTTOM.map((cx) => (
              <circle key={`b-${cx}`} cx={cx} cy={188} r="0.9" fill="#9aa0a8" opacity="0.5" />
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
