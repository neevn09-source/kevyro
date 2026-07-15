import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Container } from "@/app/components/ui/Container";
import { CheckoutSummary } from "@/app/components/checkout/CheckoutSummary";
import { getPlan } from "@/lib/plans";
import { getSession } from "@/lib/auth";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ plan: string }>;
}): Promise<Metadata> {
  const { plan: planId } = await params;
  const plan = getPlan(planId);

  return {
    title: plan ? `Checkout — ${plan.tier} — Kevyro` : "Checkout — Kevyro",
  };
}

export default async function CheckoutPage({
  params,
}: {
  params: Promise<{ plan: string }>;
}) {
  const { plan: planId } = await params;
  const plan = getPlan(planId);

  if (!plan) {
    notFound();
  }

  const session = await getSession();
  if (!session) {
    redirect(`/signup?next=${encodeURIComponent(`/checkout/${plan.id}`)}`);
  }

  if (plan.id === "bronze") {
    redirect("/plan?welcome=bronze");
  }

  return (
    <>
      <Navbar />
      <main className="flex-1 py-24 sm:py-32">
        <Container>
          <CheckoutSummary plan={plan} />
        </Container>
      </main>
      <Footer />
    </>
  );
}
