import type { ReactNode } from "react";
import { Container } from "@/app/components/ui/Container";

const iconProps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: "2",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

type Feature = {
  title: string;
  description: string;
  icon: ReactNode;
};

const features: Feature[] = [
  {
    title: "AI-generated itineraries",
    description:
      "Describe your trip in plain language and get a full day-by-day plan built around your interests and time.",
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v3M12 18v3M4.2 4.2l2.1 2.1M17.7 17.7l2.1 2.1M3 12h3M18 12h3M4.2 19.8l2.1-2.1M17.7 6.3l2.1-2.1" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    title: "Personalized recommendations",
    description:
      "Every suggestion is tailored to your preferences, pace, and travel style — not a generic top-10 list.",
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.2 7.8 14 14 7.8 16.2 10 10 16.2 7.8" />
      </svg>
    ),
  },
  {
    title: "Budget-aware planning",
    description:
      "Set a budget and Kevyro keeps every recommendation within reach, from stays to activities.",
    icon: (
      <svg {...iconProps}>
        <rect x="2" y="7" width="20" height="14" rx="2" />
        <path d="M2 10h20" />
        <circle cx="17" cy="15" r="1" />
      </svg>
    ),
  },
  {
    title: "Real-time adjustments",
    description:
      "Plans change. Update an activity or a date and Kevyro reshuffles the rest of your itinerary instantly.",
    icon: (
      <svg {...iconProps}>
        <path d="M21 12a9 9 0 1 1-3-6.7" />
        <polyline points="21 3 21 9 15 9" />
      </svg>
    ),
  },
  {
    title: "Collaborative trip planning",
    description:
      "Share a trip with friends or family and plan together, without losing track of who wanted what.",
    icon: (
      <svg {...iconProps}>
        <circle cx="9" cy="8" r="3" />
        <path d="M2 20c0-3.3 3.1-6 7-6s7 2.7 7 6" />
        <circle cx="17" cy="9" r="2.5" />
        <path d="M23 20c0-2.6-2-4.7-4.5-5.4" />
      </svg>
    ),
  },
  {
    title: "Save & revisit trips",
    description:
      "Every itinerary is saved to your account, so you can revisit, duplicate, or tweak it any time.",
    icon: (
      <svg {...iconProps}>
        <path d="M6 3h12a1 1 0 0 1 1 1v17l-7-4-7 4V4a1 1 0 0 1 1-1z" />
      </svg>
    ),
  },
];

export function Features() {
  return (
    <section id="features" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Everything you need to plan smarter
          </h2>
          <p className="mt-4 text-muted">
            Kevyro handles the busywork so you can focus on the trip itself.
          </p>
        </div>
        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="rounded-2xl border border-border bg-surface p-6"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-accent to-accent-2 text-white">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-medium text-foreground">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm text-muted">{feature.description}</p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
