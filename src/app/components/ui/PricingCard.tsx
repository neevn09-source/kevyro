import { Button } from "@/app/components/ui/Button";

export type PricingCardProps = {
  tier: string;
  price: string;
  period?: string;
  description: string;
  features: string[];
  cta: string;
  badge?: string;
  highlighted?: boolean;
};

export function PricingCard({
  tier,
  price,
  period,
  description,
  features,
  cta,
  badge,
  highlighted = false,
}: PricingCardProps) {
  return (
    <div
      className={`flex h-full flex-col ${highlighted ? "lg:-translate-y-2" : ""}`}
    >
      <div className="mb-4 flex h-6 items-center justify-center">
        {badge && (
          <span
            className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${
              highlighted
                ? "bg-gradient-to-r from-accent to-accent-2 text-white"
                : "border border-border bg-surface text-foreground"
            }`}
          >
            {badge}
          </span>
        )}
      </div>

      <div
        className={
          highlighted
            ? "pricing-glow relative flex-1 rounded-2xl"
            : "relative flex-1 rounded-2xl"
        }
      >
        <div
          className={`flex h-full flex-col rounded-2xl border p-8 backdrop-blur-sm transition-transform duration-300 hover:-translate-y-1 ${
            highlighted
              ? "relative border-transparent bg-surface"
              : "border-border bg-surface/80 hover:border-accent/40"
          }`}
        >
          <h3 className="text-lg font-medium text-foreground">{tier}</h3>
          <p className="mt-2 flex items-baseline gap-1">
            <span className="text-4xl font-semibold text-foreground">
              {price}
            </span>
            {period && <span className="text-sm text-muted">{period}</span>}
          </p>
          <p className="mt-2 text-sm text-muted">{description}</p>

          <ul className="mt-6 flex-1 space-y-3">
            {features.map((feature) => (
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
            variant={highlighted ? "primary" : "secondary"}
            className="mt-8 w-full"
          >
            {cta}
          </Button>
        </div>
      </div>
    </div>
  );
}
