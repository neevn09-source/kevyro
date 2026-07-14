import type { Metadata } from "next";
import Link from "next/link";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";

export const metadata: Metadata = {
  title: "Billing & cancellation — Kevyro",
  description:
    "A clear, no-surprises breakdown of how Kevyro's billing cycle, mid-month cancellations, and grace period compensation work.",
};

type Step = {
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    title: "You're billed on the same date every month",
    description:
      "Your billing date is set the day you subscribe, and it stays fixed every month after that. No surprise early charges, no shifting dates — if you subscribed on the 14th, you're billed on the 14th every month.",
  },
  {
    title: "Cancel anytime, keep what you paid for",
    description:
      "Cancel mid-cycle and you'll keep full access to your tier's benefits — itineraries, saved trips, priority generation, all of it — through the end of the billing cycle you already paid for. Nothing is cut off early.",
  },
  {
    title: "Forgot to cancel? You're covered by a grace period",
    description:
      "If a charge slips through because you canceled a day late, we make it right automatically: canceling exactly one day after your billing date adds two extra days of access to your account at no additional cost.",
  },
];

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "When exactly will I be charged?",
    answer:
      "On the same calendar date each month as your original subscription date. For example, if you upgraded on March 3rd, your next charge lands on April 3rd, then May 3rd, and so on.",
  },
  {
    question: "If I cancel mid-month, do I lose access right away?",
    answer:
      "No. Canceling stops future billing, but it doesn't revoke access early. You keep your tier's full benefits until the end of the cycle you already paid for.",
  },
  {
    question: "I forgot to cancel and got charged. What happens now?",
    answer:
      "If you cancel exactly one day after your billing date, we automatically credit your account two additional days of access to make up for the unintended charge. You don't need to contact support — it's applied automatically.",
  },
  {
    question: "Do I get a refund instead of extra days?",
    answer:
      "The grace period is provided as extra access time rather than a cash refund, so you don't lose the value of the charge — you just get a short compensation window instead.",
  },
  {
    question: "Does this work the same way for the annual Gold plan?",
    answer:
      "The same principles apply: your billing date stays fixed year over year, canceling mid-cycle keeps your access through the end of the paid year, and the one-day grace period compensation applies in the same way.",
  },
];

export default function BillingInfoPage() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-block rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
              Billing & cancellation
            </span>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              How your billing cycle actually works
            </h1>
            <p className="mt-4 text-muted">
              No fine print, no gotchas. Here&apos;s exactly what happens on
              your billing date, what happens if you cancel, and what happens
              if you forget to.
            </p>
          </div>

          <div className="mx-auto mt-16 max-w-3xl">
            <ol className="space-y-6">
              {steps.map((step, index) => (
                <li
                  key={step.title}
                  className="flex gap-5 rounded-2xl border border-border bg-surface/80 p-6 backdrop-blur-sm sm:p-8"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-2 text-sm font-semibold text-white">
                    {index + 1}
                  </div>
                  <div>
                    <h2 className="text-lg font-medium text-foreground">
                      {step.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="mx-auto mt-20 max-w-3xl">
            <div className="text-center">
              <h2 className="text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
                Billing questions, answered
              </h2>
              <p className="mt-3 text-muted">
                The short version of everything above, in case you just need
                one answer.
              </p>
            </div>

            <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-surface">
              {faqs.map((faq) => (
                <details key={faq.question} className="group p-6">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium text-foreground">
                    {faq.question}
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
                      className="shrink-0 text-muted transition-transform duration-200 group-open:rotate-45"
                    >
                      <line x1="12" y1="5" x2="12" y2="19" />
                      <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                  </summary>
                  <p className="mt-4 text-sm text-muted">{faq.answer}</p>
                </details>
              ))}
            </div>
          </div>

          <div className="mx-auto mt-16 max-w-2xl rounded-2xl border border-border bg-surface/80 p-8 text-center backdrop-blur-sm">
            <h2 className="text-lg font-medium text-foreground">
              Still have a question about your billing?
            </h2>
            <p className="mt-2 text-sm text-muted">
              Manage or cancel your plan anytime from your account, or reach
              out and we&apos;ll sort it out directly.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button href="/plan">Manage my plan</Button>
              <Link
                href="/#pricing"
                className="text-sm text-muted transition-colors hover:text-foreground"
              >
                Back to pricing
              </Link>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
