"use server";

export type BudgetTier = "budget" | "moderate" | "luxury";

export type ItineraryDay = {
  day: number;
  title: string;
  activities: string[];
};

export type Itinerary = {
  destination: string;
  startDate: string;
  endDate: string;
  budget: BudgetTier;
  preferences: string[];
  days: ItineraryDay[];
};

export type PlanFormState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"destination" | "startDate" | "endDate", string>>;
  message?: string;
  itinerary?: Itinerary;
};

function getTripLength(startDate: string, endDate: string): number {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const diffMs = end.getTime() - start.getTime();
  return Math.max(1, Math.round(diffMs / (1000 * 60 * 60 * 24)) + 1);
}

function buildMockItinerary(
  destination: string,
  startDate: string,
  endDate: string,
  budget: BudgetTier,
  preferences: string[]
): Itinerary {
  const tripLength = getTripLength(startDate, endDate);
  const focus =
    preferences.length > 0 ? preferences.join(", ") : "a bit of everything";

  const days: ItineraryDay[] = Array.from({ length: tripLength }, (_, index) => ({
    day: index + 1,
    title: index === 0 ? `Arrival in ${destination}` : `Exploring ${destination}`,
    activities: [
      `Morning: settle in and explore near your ${budget}-tier stay`,
      `Afternoon: activities themed around ${focus}`,
      `Evening: local dining recommended for your budget`,
    ],
  }));

  return { destination, startDate, endDate, budget, preferences, days };
}

// TODO: replace the mock generation below with a real AI provider call
// once we're past the waitlist stage and have an API key provisioned.
// The form, validation, and pending/error UI won't need to change —
// only the body of this function.
export async function generateItinerary(
  _prevState: PlanFormState,
  formData: FormData
): Promise<PlanFormState> {
  const destination = String(formData.get("destination") ?? "").trim();
  const startDate = String(formData.get("startDate") ?? "");
  const endDate = String(formData.get("endDate") ?? "");
  const budget = String(formData.get("budget") ?? "moderate") as BudgetTier;
  const preferences = formData.getAll("preferences").map(String);

  const errors: PlanFormState["errors"] = {};

  if (!destination) {
    errors.destination = "Enter a destination.";
  }
  if (!startDate) {
    errors.startDate = "Choose a start date.";
  }
  if (!endDate) {
    errors.endDate = "Choose an end date.";
  }
  if (startDate && endDate && new Date(endDate) < new Date(startDate)) {
    errors.endDate = "End date must be after the start date.";
  }

  if (Object.keys(errors).length > 0) {
    return { status: "error", errors };
  }

  // Simulated latency so the pending state is meaningful to test against.
  await new Promise((resolve) => setTimeout(resolve, 900));

  const itinerary = buildMockItinerary(
    destination,
    startDate,
    endDate,
    budget,
    preferences
  );

  return { status: "success", itinerary };
}
