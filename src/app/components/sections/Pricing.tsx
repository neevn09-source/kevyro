import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";

type Plan = {
  name: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    description: "For casual trips and first-time planners.",
    features: [
      "3 AI itineraries per month",
      "Day-by-day trip plans",
      "Basic destination recommendations",
      "Save up to 2 trips",
    ],
    cta: "Start for free",
  },
  {
    name: "Premium",
    price: "$12",
    period: "/mo",
    description: "For frequent travelers who want it all.",
    features: [
      "Unlimited AI itineraries",
      "Real-time itinerary adjustments",
      "Budget-aware planning",
      "Unlimited saved trips",
      "Priority support",
    ],
    cta: "Upgrade to Premium",
    highlighted: true,
  },
];

export function Pricing() {
  return (
    <section id="pricing" className="scroll-mt-24 py-24 sm:py-32">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Simple, transparent pricing
          </h2>
          <p className="mt-4 text-muted">
            Start free. Upgrade when you&apos;re ready to travel more.
          </p>
        </div>

        <div className="mx-auto mt-16 grid max-w-3xl gap-8 sm:grid-cols-2">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-accent bg-surface shadow-[0_0_0_1px_var(--accent)]"
                  : "border-border bg-surface"
              }`}
            >
              {plan.highlighted && (
                <span className="mb-4 inline-block rounded-full bg-gradient-to-r from-accent to-accent-2 px-3 py-1 text-xs font-medium text-white">
                  Most popular
                </span>
              )}
              <h3 className="text-lg font-medium text-foreground">
                {plan.name}
              </h3>
              <p className="mt-2 flex items-baseline gap-1">
                <span className="text-4xl font-semibold text-foreground">
                  {plan.price}
                </span>
                {plan.period && (
                  <span className="text-sm text-muted">{plan.period}</span>
                )}
              </p>
              <p className="mt-2 text-sm text-muted">{plan.description}</p>

              <ul className="mt-6 space-y-3">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="flex items-start gap-2 text-sm text-foreground"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="mt-0.5 shrink-0 text-accent"
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>

              <Button
                href="/plan"
                variant={plan.highlighted ? "primary" : "secondary"}
                className="mt-8 w-full"
              >
                {plan.cta}
              </Button>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
