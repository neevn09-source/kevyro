"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  buttonBaseStyles,
  buttonVariantStyles,
} from "@/app/components/ui/Button";

export function WaitlistButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function openModal() {
    setEmail("");
    setSubmitted(false);
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") closeModal();
    }

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    console.log("Waitlist signup:", email);
    setSubmitted(true);
  }

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        className={`${buttonBaseStyles} ${buttonVariantStyles.secondary}`}
      >
        Join the Waitlist
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-modal-title"
        >
          <div
            aria-hidden
            onClick={closeModal}
            className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          />

          <div className="relative w-full max-w-sm rounded-2xl border border-border bg-surface p-8 shadow-2xl">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close"
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-background hover:text-foreground"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {submitted ? (
              <div className="text-center">
                <p className="text-lg font-medium text-foreground">
                  You&apos;re on the list! 🚀
                </p>
                <p className="mt-2 text-sm text-muted">
                  We&apos;ll email you as soon as live AI planning is ready.
                </p>
              </div>
            ) : (
              <>
                <h2
                  id="waitlist-modal-title"
                  className="text-lg font-semibold text-foreground"
                >
                  Join the Waitlist
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Get early access to live AI planning.
                </p>

                <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="waitlist-email"
                      type="email"
                      required
                      autoFocus
                      value={email}
                      onChange={(event) => setEmail(event.target.value)}
                      placeholder="you@example.com"
                      className="w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                  </div>

                  <button
                    type="submit"
                    className={`${buttonBaseStyles} ${buttonVariantStyles.primary} w-full`}
                  >
                    Join
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
