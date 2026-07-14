import { Container } from "@/app/components/ui/Container";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How does Kevyro generate my itinerary?",
    answer:
      "You tell us your destination, dates, and preferences, and our AI builds a day-by-day plan tailored to your interests, pace, and budget.",
  },
  {
    question: "Is Kevyro free to use?",
    answer:
      "Yes. The Bronze plan is free and includes a limited number of AI itineraries per month. Upgrade to Silver or Gold for more itineraries, more saved trips, and priority generation.",
  },
  {
    question: "Can I change my itinerary after it's generated?",
    answer:
      "Yes. You can adjust activities, pacing, and budget, and Kevyro will update your itinerary in real time.",
  },
  {
    question: "Which destinations does Kevyro support?",
    answer:
      "Kevyro can plan trips to destinations worldwide, from major cities to smaller off-the-beaten-path locations.",
  },
  {
    question: "Do I need a credit card to start?",
    answer:
      "No. You can start planning on the Bronze plan without entering any payment details.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="scroll-mt-24 py-24 sm:py-32">
      <Container className="max-w-3xl">
        <div className="text-center">
          <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-muted">
            Can&apos;t find what you&apos;re looking for? Reach out to our
            team anytime.
          </p>
        </div>

        <div className="mt-12 divide-y divide-border rounded-2xl border border-border bg-surface">
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
      </Container>
    </section>
  );
}
