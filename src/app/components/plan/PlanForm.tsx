"use client";

import { useActionState } from "react";
import {
  generateItinerary,
  type BudgetTier,
  type PlanFormState,
} from "@/app/plan/actions";

const initialState: PlanFormState = { status: "idle" };

const budgetTiers: { value: BudgetTier; label: string }[] = [
  { value: "budget", label: "Budget" },
  { value: "moderate", label: "Moderate" },
  { value: "luxury", label: "Luxury" },
];

const preferenceOptions = [
  "Adventure",
  "Relaxation",
  "Culture & History",
  "Food & Dining",
  "Nightlife",
  "Nature & Outdoors",
  "Family-friendly",
  "Shopping",
];

export function PlanForm() {
  const [state, formAction, pending] = useActionState(
    generateItinerary,
    initialState
  );

  return (
    <div className="mx-auto w-full max-w-2xl">
      <form action={formAction} className="space-y-8">
        <div>
          <label
            htmlFor="destination"
            className="block text-sm font-medium text-foreground"
          >
            Destination
          </label>
          <input
            id="destination"
            name="destination"
            type="text"
            placeholder="e.g. Lisbon, Portugal"
            required
            className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
          />
          {state.errors?.destination && (
            <p className="mt-2 text-sm text-red-400">
              {state.errors.destination}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium text-foreground"
            >
              Start date
            </label>
            <input
              id="startDate"
              name="startDate"
              type="date"
              required
              className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {state.errors?.startDate && (
              <p className="mt-2 text-sm text-red-400">
                {state.errors.startDate}
              </p>
            )}
          </div>

          <div>
            <label
              htmlFor="endDate"
              className="block text-sm font-medium text-foreground"
            >
              End date
            </label>
            <input
              id="endDate"
              name="endDate"
              type="date"
              required
              className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-accent"
            />
            {state.errors?.endDate && (
              <p className="mt-2 text-sm text-red-400">
                {state.errors.endDate}
              </p>
            )}
          </div>
        </div>

        <fieldset>
          <legend className="block text-sm font-medium text-foreground">
            Budget tier
          </legend>
          <div className="mt-2 flex gap-2 rounded-lg border border-border bg-surface p-1">
            {budgetTiers.map((tier, index) => (
              <label
                key={tier.value}
                className="flex-1 cursor-pointer rounded-md px-4 py-2 text-center text-sm text-muted transition-colors has-[:checked]:bg-gradient-to-r has-[:checked]:from-accent has-[:checked]:to-accent-2 has-[:checked]:text-white has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent"
              >
                <input
                  type="radio"
                  name="budget"
                  value={tier.value}
                  defaultChecked={index === 1}
                  className="sr-only"
                />
                {tier.label}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="block text-sm font-medium text-foreground">
            Preferences <span className="font-normal text-muted">(optional)</span>
          </legend>
          <div className="mt-3 flex flex-wrap gap-2">
            {preferenceOptions.map((preference) => (
              <label
                key={preference}
                className="cursor-pointer rounded-full border border-border bg-surface px-4 py-2 text-sm text-muted transition-colors has-[:checked]:border-accent has-[:checked]:text-foreground has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-accent"
              >
                <input
                  type="checkbox"
                  name="preferences"
                  value={preference}
                  className="sr-only"
                />
                {preference}
              </label>
            ))}
          </div>
        </fieldset>

        <button
          type="submit"
          disabled={pending}
          className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {pending ? "Generating your itinerary…" : "Generate itinerary"}
        </button>

        {state.status === "error" && !state.errors && (
          <p role="alert" className="text-sm text-red-400">
            {state.message ?? "Something went wrong. Please try again."}
          </p>
        )}
      </form>

      {state.status === "success" && state.itinerary && (
        <div className="mt-16 rounded-2xl border border-border bg-surface p-8">
          <h2 className="text-2xl font-semibold text-foreground">
            Your trip to {state.itinerary.destination}
          </h2>
          <p className="mt-2 text-sm text-muted">
            {state.itinerary.startDate} — {state.itinerary.endDate} ·{" "}
            {state.itinerary.budget} budget
          </p>

          <div className="mt-8 space-y-6">
            {state.itinerary.days.map((day) => (
              <div
                key={day.day}
                className="border-t border-border pt-6 first:border-t-0 first:pt-0"
              >
                <h3 className="text-lg font-medium text-foreground">
                  Day {day.day}: {day.title}
                </h3>
                <ul className="mt-3 space-y-2">
                  {day.activities.map((activity) => (
                    <li key={activity} className="text-sm text-muted">
                      {activity}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
