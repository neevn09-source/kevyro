import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";
import { WaitlistButton } from "@/app/components/waitlist/WaitlistButton";

export function Hero() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[600px] bg-[radial-gradient(circle_at_top,_var(--accent)_0%,_transparent_60%)] opacity-20"
      />
      <Container className="flex flex-col items-center text-center">
        <span className="mb-6 rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          Powered by AI
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          Plan your perfect trip with AI
        </h1>
        <p className="mt-6 max-w-xl text-base text-muted sm:text-lg">
          Tell Kevyro where you want to go. Get a personalized, day-by-day
          itinerary in seconds — no spreadsheets, no endless tabs.
        </p>
        <div className="mt-10 flex flex-col flex-wrap justify-center gap-4 sm:flex-row">
          <Button href="/plan">Start planning free</Button>
          <WaitlistButton />
          <Button href="#features" variant="secondary">
            See how it works
          </Button>
        </div>
      </Container>
    </section>
  );
}
