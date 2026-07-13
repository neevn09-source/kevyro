"use client";

import { useActionState, useEffect, useState } from "react";
import {
  buttonBaseStyles,
  buttonVariantStyles,
} from "@/app/components/ui/Button";
import { joinWaitlist, type WaitlistFormState } from "@/app/components/waitlist/actions";

const initialState: WaitlistFormState = { status: "idle" };

export function WaitlistButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [state, formAction, pending] = useActionState(
    joinWaitlist,
    initialState
  );

  function openModal() {
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

  return (
    <>
      <button
        type="button"
        onClick={openModal}
        onPointerUp={openModal}
        onTouchEnd={(event) => {
          event.preventDefault();
          openModal();
        }}
        className={`${buttonBaseStyles} ${buttonVariantStyles.secondary} relative z-50 touch-manipulation pointer-events-auto`}
      >
        Join the Waitlist
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 py-8 sm:items-center"
          role="dialog"
          aria-modal="true"
          aria-labelledby="waitlist-modal-title"
        >
          <div
            aria-hidden
            onClick={closeModal}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
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

            {state.status === "success" ? (
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

                <form action={formAction} className="mt-6 space-y-4">
                  <div>
                    <label htmlFor="waitlist-email" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="waitlist-email"
                      name="email"
                      type="email"
                      required
                      autoFocus
                      placeholder="you@example.com"
                      className="relative z-50 w-full touch-manipulation rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground pointer-events-auto placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
                    />
                    {state.status === "error" && (
                      <p role="alert" className="mt-2 text-sm text-red-400">
                        {state.message}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className={`${buttonBaseStyles} ${buttonVariantStyles.primary} relative z-50 w-full touch-manipulation pointer-events-auto disabled:cursor-not-allowed disabled:opacity-60`}
                  >
                    {pending ? "Joining…" : "Join"}
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
