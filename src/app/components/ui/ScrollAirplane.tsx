"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const PASSENGER_WINDOWS = Array.from({ length: 27 }, (_, i) =>
  Math.round(300 + i * ((820 - 300) / 26))
);

const PATH_SPRING = { stiffness: 50, damping: 20, mass: 0.8 };
const OPACITY_SPRING = { stiffness: 90, damping: 26, mass: 0.5 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Handcrafted side-profile narrow-body jet. Tail fixed left, nose fixed
// right. Combined tilt/bank is clamped to +/-2deg so the aircraft always
// reads as level, side-on flight — never banking, flipping, or spinning.
export function ScrollAirplane() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const rawXVw = useTransform(
    scrollYProgress,
    [0, 0.2, 0.6, 1],
    [-20, -6, 55, 118]
  );
  const rawYVh = useTransform(
    scrollYProgress,
    [0, 0.2, 0.5, 1],
    [88, 78, 40, -14]
  );
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.68, 1, 1.12, 0.95]
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.06, 0.94, 1],
    [0, 1, 1, 0]
  );
  const rawTilt = useTransform(scrollYProgress, [0, 0.5, 1], [-1.1, 0.4, -0.8]);

  const xVw = useSpring(rawXVw, PATH_SPRING);
  const yVh = useSpring(rawYVh, PATH_SPRING);
  const scale = useSpring(rawScale, PATH_SPRING);
  const opacity = useSpring(rawOpacity, OPACITY_SPRING);
  const tilt = useSpring(rawTilt, PATH_SPRING);

  const bobVh = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 8) * 1.3);
  const bankDeg = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 4.5) * 0.6);

  const combinedYVh = useTransform([yVh, bobVh], ([y, b]: number[]) => y + b);
  const combinedRotate = useTransform([tilt, bankDeg], ([t, b]: number[]) =>
    clamp(t + b, -2, 2)
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
          viewBox="0 0 1000 300"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[540px]"
        >
          <defs>
            <linearGradient id="jetBody" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="42%" stopColor="#fafbfd" />
              <stop offset="70%" stopColor="#e9ecf1" />
              <stop offset="100%" stopColor="#ccd2da" />
            </linearGradient>

            <linearGradient id="jetWing" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#fdfdfe" />
              <stop offset="100%" stopColor="#b9bfc7" />
            </linearGradient>

            <linearGradient id="jetEngine" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f4f5f7" />
              <stop offset="28%" stopColor="#c7cad0" />
              <stop offset="72%" stopColor="#93989f" />
              <stop offset="100%" stopColor="#72777f" />
            </linearGradient>

            <linearGradient id="jetFan" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#23262c" />
              <stop offset="100%" stopColor="#4d525a" />
            </linearGradient>

            <linearGradient id="jetWindow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e7f4ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7ba3c6" stopOpacity="0.88" />
            </linearGradient>

            <linearGradient id="jetCockpit" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#1c2b42" />
              <stop offset="100%" stopColor="#496e94" />
            </linearGradient>

            <linearGradient id="jetGloss" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="jetShadowGrad" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <mask id="jetGlossMask">
              <rect x="0" y="0" width="1000" height="150" fill="url(#jetGloss)" />
            </mask>

            <filter id="jetDropShadow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur in="SourceAlpha" stdDeviation="5" result="blur" />
              <feOffset in="blur" dx="0" dy="8" result="offsetBlur" />
              <feComponentTransfer in="offsetBlur" result="shadow">
                <feFuncA type="linear" slope="0.2" />
              </feComponentTransfer>
              <feMerge>
                <feMergeNode in="shadow" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* ground/ambient contact shadow */}
          <ellipse cx="500" cy="278" rx="440" ry="30" fill="url(#jetShadowGrad)" />

          <g filter="url(#jetDropShadow)">
            {/* far-side (opposite) wing, hinted above the dorsal line */}
            <path
              d="M 575 90 L 645 68 L 660 72 L 600 95 Z"
              fill="url(#jetWing)"
              opacity="0.5"
            />
            {/* far-side engine hint */}
            <ellipse cx="560" cy="183" rx="26" ry="12" fill="url(#jetEngine)" opacity="0.5" />

            {/* far-side horizontal stabilizer hint */}
            <path d="M 178 128 L 100 95 L 88 90 L 115 112 Z"
              fill="url(#jetWing)" opacity="0.5" />

            {/* near-side horizontal stabilizer, wide root tapering to a small tip */}
            <path d="M 175 160 L 90 196 L 78 201 L 105 178 Z" fill="url(#jetWing)" />

            {/* vertical stabilizer (rudder fin): wide chord at the fuselage root, swept back to a narrow tip */}
            <path d="M 270 100 L 222 22 L 205 25 L 185 108 Z" fill="url(#jetWing)" />
            <path d="M 222 22 L 205 25 L 213 60 Z" fill="#08080c" opacity="0.07" />

            {/* wing root fairing, blends the wing into the belly */}
            <ellipse cx="582" cy="206" rx="22" ry="9" fill="url(#jetBody)" />

            {/* main wing, near side: wide root chord tapering to the tip, swept back toward the tail */}
            <path d="M 600 203 L 455 250 L 430 262 L 560 209 Z" fill="url(#jetWing)" />
            {/* upturned winglet at the tip */}
            <path d="M 455 250 L 430 262 L 438 222 Z" fill="url(#jetWing)" />
            {/* wing spar highlight */}
            <path d="M 560 209 L 430 262" stroke="#a7adb5" strokeOpacity="0.55" strokeWidth="1.5" fill="none" />

            {/* engine pylon */}
            <path d="M 552 208 L 556 224 L 522 228 L 518 212 Z" fill="url(#jetWing)" />

            {/* engine nacelle */}
            <path
              d="M 447 240
                 C 447 231 460 227 478 227
                 L 534 227
                 C 550 227 556 237 556 252
                 C 556 267 550 276 534 276
                 L 478 276
                 C 460 276 447 272 447 263
                 Z"
              fill="url(#jetEngine)"
            />
            {/* intake fan, forward end faces the nose (right) */}
            <ellipse cx="551" cy="252" rx="6.5" ry="22" fill="url(#jetFan)" />
            <ellipse cx="548" cy="252" rx="4" ry="18" fill="#191c20" opacity="0.7" />
            <path d="M 548 236 L 548 268" stroke="#787e87" strokeWidth="1" opacity="0.55" />
            <path d="M 543 238 L 553 266" stroke="#787e87" strokeWidth="0.8" opacity="0.45" />
            <path d="M 553 238 L 543 266" stroke="#787e87" strokeWidth="0.8" opacity="0.45" />
            {/* exhaust, aft end */}
            <ellipse cx="449" cy="252" rx="3.5" ry="16" fill="#34373c" opacity="0.75" />

            {/* fuselage: one continuous smooth silhouette, tail (left) to nose (right) */}
            <path
              d="M 40 150
                 C 50 120 115 103 210 100
                 C 340 96 480 91 620 92
                 C 740 93 840 98 915 118
                 Q 950 132 960 150
                 Q 950 168 915 179
                 C 840 198 740 203 620 204
                 C 480 205 340 202 210 198
                 C 115 195 50 178 40 150 Z"
              fill="url(#jetBody)"
            />
            {/* glossy dorsal sheen */}
            <path
              d="M 40 150
                 C 50 120 115 103 210 100
                 C 340 96 480 91 620 92
                 C 740 93 840 98 915 118
                 Q 950 132 960 150
                 L 925 150
                 C 850 133 730 126 600 125
                 C 460 125 320 130 190 141
                 L 90 149 Z"
              fill="#ffffff"
              opacity="0.55"
              mask="url(#jetGlossMask)"
            />

            {/* cockpit windshield, just aft of the nose tip */}
            <path
              d="M 878 108 C 898 111 918 118 934 130
                 C 926 137 915 139 904 136
                 C 890 132 880 122 874 113 Z"
              fill="url(#jetCockpit)"
            />

            {/* forward entry door */}
            <rect x="290" y="152" width="14" height="34" rx="5"
              fill="none" stroke="#a3a9b1" strokeOpacity="0.55" strokeWidth="1.2" />
            {/* aft entry door */}
            <rect x="760" y="158" width="14" height="34" rx="5"
              fill="none" stroke="#a3a9b1" strokeOpacity="0.55" strokeWidth="1.2" />
            {/* forward cargo door */}
            <rect x="350" y="192" width="46" height="13" rx="2"
              fill="none" stroke="#93999f" strokeOpacity="0.5" strokeWidth="1.1" />
            {/* aft cargo door */}
            <rect x="640" y="195" width="50" height="13" rx="2"
              fill="none" stroke="#93999f" strokeOpacity="0.5" strokeWidth="1.1" />

            {/* passenger windows */}
            {PASSENGER_WINDOWS.map((cx) => (
              <ellipse key={cx} cx={cx} cy="150" rx="6" ry="7.6" fill="url(#jetWindow)" />
            ))}

            {/* panel lines, kept faint so they read as texture, not clutter */}
            <path d="M 220 104 C 380 98 620 96 890 116" stroke="#c3c8ce" strokeOpacity="0.5" strokeWidth="1" fill="none" />
            <path d="M 220 195 C 380 200 620 202 885 182" stroke="#c3c8ce" strokeOpacity="0.5" strokeWidth="1" fill="none" />
            <path d="M 250 102 L 256 197" stroke="#c3c8ce" strokeOpacity="0.35" strokeWidth="1" fill="none" />
            <path d="M 615 92 L 613 204" stroke="#c3c8ce" strokeOpacity="0.35" strokeWidth="1" fill="none" />
            <path d="M 870 111 L 866 189" stroke="#c3c8ce" strokeOpacity="0.35" strokeWidth="1" fill="none" />
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
