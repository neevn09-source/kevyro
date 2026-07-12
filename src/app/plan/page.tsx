import type { Metadata } from "next";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Container } from "@/app/components/ui/Container";
import { PlanForm } from "@/app/components/plan/PlanForm";

export const metadata: Metadata = {
  title: "Plan a trip — Kevyro",
  description:
    "Tell Kevyro your destination, dates, budget, and preferences, and get a personalized day-by-day itinerary.",
};

export default function PlanPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Plan your trip
            </h1>
            <p className="mt-4 text-muted">
              Tell us where you&apos;re headed and we&apos;ll put together a
              day-by-day itinerary tailored to you.
            </p>
          </div>

          <div className="mt-16">
            <PlanForm />
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
