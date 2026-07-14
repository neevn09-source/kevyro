import { Container } from "@/app/components/ui/Container";
import { PricingCard, type PricingCardProps } from "@/app/components/ui/PricingCard";

const plans: PricingCardProps[] = [
  {
    tier: "Bronze",
    price: "$0",
    period: "/month",
    description: "For casual trips and first-time planners.",
    features: [
      "3 AI-generated itineraries per month",
      "Basic AI trip planning",
      "Save a trip permanently for a one-time $7 fee",
    ],
    cta: "Start for free",
  },
  {
    tier: "Silver",
    price: "$10",
    period: "/month",
    description: "For travelers who want it planned their way.",
    features: [
      "8 AI-generated itineraries per month",
      "AI plans your trip exactly how you want it",
      "Save up to 5 trips",
      "Priority itinerary generation",
    ],
    cta: "Upgrade to Silver",
    badge: "Recommended",
    highlighted: true,
  },
  {
    tier: "Gold",
    price: "$100",
    period: "/year",
    description: "For frequent travelers who want it all.",
    features: [
      "Unlimited AI-generated itineraries",
      "Unlimited saved trips",
      "Priority customer support",
      "Highest priority AI generation",
    ],
    cta: "Upgrade to Gold",
    badge: "Best Value",
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

        <div className="mx-auto mt-16 grid max-w-5xl gap-8 lg:grid-cols-3">
          {plans.map((plan) => (
            <PricingCard key={plan.tier} {...plan} />
          ))}
        </div>
      </Container>
    </section>
  );
}
