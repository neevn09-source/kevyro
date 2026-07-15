import type { Plan } from "@/lib/plans";

type CheckoutSummaryProps = {
  plan: Plan;
};

export function CheckoutSummary({ plan }: CheckoutSummaryProps) {
  const billingCycle = plan.period === "/year" ? "Annual" : "Monthly";
  const total = plan.period ? `${plan.price}${plan.period}` : plan.price;

  return (
    <div className="mx-auto max-w-md">
      <div className="text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
          Checkout
        </h1>
        <p className="mt-4 text-muted">
          You&apos;re about to subscribe to the {plan.tier} plan.
        </p>
      </div>

      <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-lg font-medium text-foreground">{plan.tier}</h2>
          <p className="flex items-baseline gap-1">
            <span className="text-2xl font-semibold text-foreground">
              {plan.price}
            </span>
            {plan.period && (
              <span className="text-sm text-muted">{plan.period}</span>
            )}
          </p>
        </div>
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

        <div className="mt-8 space-y-2 rounded-xl border border-border bg-background p-5">
          <p className="text-xs font-medium uppercase tracking-wide text-muted">
            Billing summary
          </p>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Plan</span>
            <span className="text-foreground">{plan.tier}</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted">Billing cycle</span>
            <span className="text-foreground">{billingCycle}</span>
          </div>
          <div className="flex items-center justify-between border-t border-border pt-2 text-sm font-medium">
            <span className="text-foreground">Total due today</span>
            <span className="text-foreground">{total}</span>
          </div>
        </div>

        {/* Stripe Checkout integration goes here: swap this disabled button
            for a form/action that creates a Stripe Checkout Session and
            redirects to its hosted payment page. */}
        <button
          type="button"
          disabled
          className="mt-8 inline-flex w-full cursor-not-allowed items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-medium text-white opacity-60"
        >
          Continue to payment
        </button>
        <p className="mt-3 text-center text-xs text-muted">
          Payment processing isn&apos;t connected yet — this is a preview of
          checkout.
        </p>
      </div>
    </div>
  );
}
