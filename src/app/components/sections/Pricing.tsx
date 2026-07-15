import Link from "next/link";
import { Container } from "@/app/components/ui/Container";
import { PricingCard } from "@/app/components/ui/PricingCard";
import { plans } from "@/lib/plans";

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
            <PricingCard key={plan.id} {...plan} />
          ))}
        </div>

        <p className="mt-10 text-center text-sm text-muted">
          Questions about billing or cancellation?{" "}
          <Link
            href="/billing-info"
            className="text-foreground underline decoration-border underline-offset-4 transition-colors hover:decoration-accent"
          >
            See how it works
          </Link>
        </p>
      </Container>
    </section>
  );
}
