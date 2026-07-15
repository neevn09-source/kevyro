export type PlanId = "bronze" | "silver" | "gold";

export type Plan = {
  id: PlanId;
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
  highlighted?: boolean;
};

export const plans: Plan[] = [
  {
    id: "bronze",
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
    id: "silver",
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
    id: "gold",
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

export function getPlan(id: string): Plan | undefined {
  return plans.find((plan) => plan.id === id);
}
