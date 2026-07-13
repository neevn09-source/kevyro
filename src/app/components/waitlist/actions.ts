"use server";

import { supabase } from "@/lib/supabase";

export type WaitlistFormState = {
  status: "idle" | "success" | "error";
  message?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function joinWaitlist(
  _prevState: WaitlistFormState,
  formData: FormData
): Promise<WaitlistFormState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!EMAIL_PATTERN.test(email)) {
    return { status: "error", message: "Enter a valid email address." };
  }

  const { error } = await supabase
    .from("waitlist_signups")
    .insert({ email });

  if (error) {
    // Unique violation: this email is already on the list — treat as success.
    if (error.code === "23505") {
      return { status: "success" };
    }
    return {
      status: "error",
      message: "Something went wrong. Please try again.",
    };
  }

  return { status: "success" };
}
