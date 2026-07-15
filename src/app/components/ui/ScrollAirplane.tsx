"use client";

import {
  easeIn,
  easeInOut,
  easeOut,
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";

const CABIN_WINDOWS = Array.from({ length: 27 }, (_, i) =>
  Math.round(340 + i * ((830 - 340) / 26))
);

const PANEL_RIVETS = Array.from({ length: 12 }, (_, i) => Math.round(360 + i * 38));

// Each axis gets its own spring "personality": x carries the aircraft's
// forward inertia (heavy, slow to catch up), y is the lively lift force of
// the climb, scale is the aircraft's mass (slow, no bounce), tilt is a
// control-surface response (quick), opacity trails behind all of them.
const X_SPRING = { stiffness: 40, damping: 22, mass: 1.1 };
const Y_SPRING = { stiffness: 62, damping: 17, mass: 0.7 };
const SCALE_SPRING = { stiffness: 45, damping: 23, mass: 1.2 };
const TILT_SPRING = { stiffness: 70, damping: 15, mass: 0.5 };
const OPACITY_SPRING = { stiffness: 85, damping: 24, mass: 0.5 };

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

// Handcrafted side-profile narrow-body jet, drawn from scratch. Tail fixed
// left, nose fixed right, at all scroll positions. Combined tilt/bank is
// clamped to +/-2deg so the aircraft always reads as level, side-on
// flight — it never banks, flips, or spins toward/away from the viewer.
export function ScrollAirplane() {
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();

  // Five-act takeoff, mapped directly onto scroll progress:
  // runway roll -> rotation/liftoff -> initial climb -> climb-out -> vanish.
  const rawXVw = useTransform(
    scrollYProgress,
    [0, 0.1, 0.22, 0.4, 0.65, 1],
    [-24, -14, -2, 20, 60, 122],
    { ease: [easeIn, easeIn, easeInOut, easeIn, easeIn] }
  );
  const rawYVh = useTransform(
    scrollYProgress,
    [0, 0.1, 0.22, 0.4, 0.65, 1],
    [92, 89, 76, 52, 15, -20],
    { ease: [easeIn, easeIn, easeInOut, easeIn, easeOut] }
  );
  const rawScale = useTransform(
    scrollYProgress,
    [0, 0.12, 0.35, 0.6, 0.85, 1],
    [0.6, 0.85, 1.15, 1.05, 0.8, 0.55],
    { ease: [easeOut, easeOut, easeInOut, easeIn, easeIn] }
  );
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 0.05, 0.7, 0.88, 1],
    [0, 1, 1, 0.55, 0],
    { ease: [easeOut, easeInOut, easeIn, easeIn] }
  );
  const rawTilt = useTransform(
    scrollYProgress,
    [0, 0.08, 0.22, 0.45, 0.75, 1],
    [-0.3, -0.2, 1.4, 1.1, 0.5, 0.2],
    { ease: [easeIn, easeOut, easeOut, easeInOut, easeInOut] }
  );

  const xVw = useSpring(rawXVw, X_SPRING);
  const yVh = useSpring(rawYVh, Y_SPRING);
  const scale = useSpring(rawScale, SCALE_SPRING);
  const opacity = useSpring(rawOpacity, OPACITY_SPRING);
  const tilt = useSpring(rawTilt, TILT_SPRING);

  // Runway rumble (high-frequency, decays hard right after liftoff) layered
  // under a gentler in-flight float (lower-frequency, persists throughout).
  const rumbleVh = useTransform(scrollYProgress, (v) =>
    Math.sin(v * Math.PI * 40) * 0.8 * Math.max(0, 1 - v * 4)
  );
  const floatVh = useTransform(scrollYProgress, (v) => Math.sin(v * Math.PI * 7) * 1.1);
  // Bank oscillation eases out as the aircraft climbs into smoother air.
  const bankDeg = useTransform(
    scrollYProgress,
    (v) => Math.sin(v * Math.PI * 4.5) * (0.5 * (1 - v * 0.6))
  );

  const combinedYVh = useTransform(
    [yVh, rumbleVh, floatVh],
    ([y, r, f]: number[]) => y + r + f
  );
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
          viewBox="0 0 1100 320"
          xmlns="http://www.w3.org/2000/svg"
          className="h-auto w-[240px] sm:w-[320px] md:w-[400px] lg:w-[480px] xl:w-[540px]"
        >
          <defs>
            <linearGradient id="fuseGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="40%" stopColor="#f9fbfd" />
              <stop offset="70%" stopColor="#e6eaf0" />
              <stop offset="100%" stopColor="#c8cfd8" />
            </linearGradient>

            <linearGradient id="wingGrad2" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#fcfdfe" />
              <stop offset="100%" stopColor="#b4bac2" />
            </linearGradient>

            <linearGradient id="engineGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#f2f4f6" />
              <stop offset="28%" stopColor="#c4c8ce" />
              <stop offset="72%" stopColor="#8f959c" />
              <stop offset="100%" stopColor="#6d7379" />
            </linearGradient>

            <linearGradient id="fanGrad2" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#20232a" />
              <stop offset="100%" stopColor="#4c525a" />
            </linearGradient>

            <linearGradient id="windowGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#e9f5ff" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7aa2c5" stopOpacity="0.88" />
            </linearGradient>

            <linearGradient id="cockpitGrad2" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#192640" />
              <stop offset="100%" stopColor="#456a92" />
            </linearGradient>

            <linearGradient id="glossGrad2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.78" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            <radialGradient id="shadowGrad2" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#000000" stopOpacity="0.28" />
              <stop offset="60%" stopColor="#000000" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0" />
            </radialGradient>

            <mask id="glossMask2">
              <rect x="0" y="0" width="1100" height="165" fill="url(#glossGrad2)" />
            </mask>

            <filter id="dropShadow2" x="-30%" y="-30%" width="160%" height="160%">
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

          {/* ambient contact shadow */}
          <ellipse cx="550" cy="298" rx="470" ry="30" fill="url(#shadowGrad2)" />

          <g filter="url(#dropShadow2)">
            {/* far-side wing, hinted above the dorsal line for dihedral depth */}
            <path d="M 650 100 L 730 75 L 742 80 L 662 106 Z" fill="url(#wingGrad2)" opacity="0.5" />
            {/* far-side engine hint */}
            <ellipse cx="660" cy="205" rx="27" ry="13" fill="url(#engineGrad2)" opacity="0.5" />
            {/* far-side horizontal stabilizer hint */}
            <path d="M 285 140 L 195 98 L 183 93 L 210 113 Z" fill="url(#wingGrad2)" opacity="0.5" />

            {/* near-side horizontal stabilizer, wide root tapering to a narrow tip */}
            <path d="M 290 185 L 185 228 L 170 235 L 205 215 Z" fill="url(#wingGrad2)" />

            {/* vertical stabilizer (rudder fin): wide root along the fuselage, swept back to a narrow tip */}
            <path d="M 340 108 L 275 25 L 255 22 L 230 120 Z" fill="url(#wingGrad2)" />
            <path d="M 275 25 L 255 22 L 262 62 Z" fill="#08080c" opacity="0.07" />

            {/* wing root fairing, blends the wing into the belly */}
            <ellipse cx="655" cy="219" rx="24" ry="10" fill="url(#fuseGrad2)" />

            {/* main wing, near side: wide root chord tapering to the tip, swept toward the tail */}
            <path d="M 700 215 L 515 265 L 480 278 L 640 222 Z" fill="url(#wingGrad2)" />
            {/* upturned winglet */}
            <path d="M 515 265 L 480 278 L 495 235 Z" fill="url(#wingGrad2)" />
            {/* wing spar highlight */}
            <path d="M 640 222 L 480 278" stroke="#9da3ab" strokeOpacity="0.5" strokeWidth="1.5" fill="none" />

            {/* engine pylon */}
            <path d="M 596 220 L 600 236 L 566 240 L 562 227 Z" fill="url(#wingGrad2)" />

            {/* engine nacelle */}
            <path
              d="M 490 248
                 C 490 238 504 234 522 234
                 L 582 234
                 C 600 234 606 245 606 261
                 C 606 277 600 288 582 288
                 L 522 288
                 C 504 288 490 284 490 274
                 Z"
              fill="url(#engineGrad2)"
            />
            {/* intake fan, forward end faces the nose (right) */}
            <ellipse cx="601" cy="261" rx="7" ry="24" fill="url(#fanGrad2)" />
            <ellipse cx="598" cy="261" rx="4.5" ry="20" fill="#181b1f" opacity="0.7" />
            <path d="M 598 245 L 598 277" stroke="#767c85" strokeWidth="1" opacity="0.55" />
            <path d="M 593 247 L 603 275" stroke="#767c85" strokeWidth="0.8" opacity="0.45" />
            <path d="M 603 247 L 593 275" stroke="#767c85" strokeWidth="0.8" opacity="0.45" />
            {/* exhaust, aft end */}
            <ellipse cx="494" cy="261" rx="3.5" ry="17" fill="#32353a" opacity="0.75" />

            {/* fuselage: one continuous smooth silhouette, tail (left) to nose (right) */}
            <path
              d="M 60 160
                 C 72 128 145 108 250 105
                 C 380 100 520 96 690 97
                 C 830 98 940 105 1000 128
                 Q 1030 143 1040 160
                 Q 1030 177 1000 192
                 C 940 215 830 222 690 223
                 C 520 224 380 220 250 215
                 C 145 212 72 192 60 160
                 Z"
              fill="url(#fuseGrad2)"
            />
            {/* glossy dorsal sheen */}
            <path
              d="M 60 160
                 C 72 128 145 108 250 105
                 C 380 100 520 96 690 97
                 C 830 98 940 105 1000 128
                 Q 1030 143 1040 160
                 L 1005 160
                 C 920 143 800 136 670 135
                 C 520 135 370 140 230 151
                 L 100 159 Z"
              fill="#ffffff"
              opacity="0.5"
              mask="url(#glossMask2)"
            />

            {/* cockpit windshield, just aft of the nose tip */}
            <path
              d="M 955 118 C 978 122 1000 130 1018 140
                 C 1010 147 998 149 986 146
                 C 968 142 958 132 951 123 Z"
              fill="url(#cockpitGrad2)"
            />

            {/* forward entry door */}
            <rect x="382" y="163" width="14" height="34" rx="5"
              fill="none" stroke="#a1a7af" strokeOpacity="0.55" strokeWidth="1.2" />
            {/* aft entry door */}
            <rect x="792" y="168" width="14" height="34" rx="5"
              fill="none" stroke="#a1a7af" strokeOpacity="0.55" strokeWidth="1.2" />
            {/* forward cargo door */}
            <rect x="440" y="204" width="46" height="13" rx="2"
              fill="none" stroke="#91979e" strokeOpacity="0.5" strokeWidth="1.1" />
            {/* aft cargo door */}
            <rect x="720" y="207" width="50" height="13" rx="2"
              fill="none" stroke="#91979e" strokeOpacity="0.5" strokeWidth="1.1" />

            {/* passenger windows */}
            {CABIN_WINDOWS.map((cx) => (
              <ellipse key={cx} cx={cx} cy="160" rx="6" ry="7.6" fill="url(#windowGrad2)" />
            ))}

            {/* panel seam lines, kept faint so they read as texture, not clutter */}
            <path d="M 260 109 C 420 102 620 99 970 122" stroke="#c1c6cc" strokeOpacity="0.5" strokeWidth="1" fill="none" />
            <path d="M 260 211 C 420 218 620 220 965 195" stroke="#c1c6cc" strokeOpacity="0.5" strokeWidth="1" fill="none" />
            <path d="M 300 107 L 306 213" stroke="#c1c6cc" strokeOpacity="0.35" strokeWidth="1" fill="none" />
            <path d="M 685 97 L 683 223" stroke="#c1c6cc" strokeOpacity="0.35" strokeWidth="1" fill="none" />
            <path d="M 945 121 L 941 200" stroke="#c1c6cc" strokeOpacity="0.35" strokeWidth="1" fill="none" />

            {/* rivet detailing along the upper seam */}
            {PANEL_RIVETS.map((cx) => (
              <circle key={cx} cx={cx} cy={112} r="0.9" fill="#91979e" opacity="0.5" />
            ))}
          </g>
        </svg>
      </motion.div>
    </div>
  );
}
