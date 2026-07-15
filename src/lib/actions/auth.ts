"use server";

import { redirect } from "next/navigation";
import { createSession } from "@/lib/auth";

export type AuthActionState = {
  error?: string;
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateCredentials(
  email: FormDataEntryValue | null,
  password: FormDataEntryValue | null
): string | null {
  if (typeof email !== "string" || !EMAIL_PATTERN.test(email)) {
    return "Enter a valid email address.";
  }
  if (typeof password !== "string" || password.length < 6) {
    return "Password must be at least 6 characters.";
  }
  return null;
}

// Only same-origin relative paths are allowed as a redirect target, so a
// crafted `next` query value can't be used to redirect off Kevyro.
function sanitizeNext(next: FormDataEntryValue | null): string {
  if (typeof next !== "string" || !next.startsWith("/") || next.startsWith("//")) {
    return "/plan";
  }
  return next;
}

export async function signUpAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const error = validateCredentials(email, password);
  if (error) {
    return { error };
  }

  // Mock: there's no persisted user store yet, so account creation always
  // succeeds for a well-formed email/password. Replace with
  // supabase.auth.signUp({ email, password }) when Supabase Auth is wired in.
  await createSession(email as string);
  redirect(sanitizeNext(formData.get("next")));
}

export async function logInAction(
  _prevState: AuthActionState,
  formData: FormData
): Promise<AuthActionState> {
  const email = formData.get("email");
  const password = formData.get("password");

  const error = validateCredentials(email, password);
  if (error) {
    return { error };
  }

  // Mock: no persisted credentials to check against yet, so any well-formed
  // email/password logs in. Replace with
  // supabase.auth.signInWithPassword({ email, password }) later.
  await createSession(email as string);
  redirect(sanitizeNext(formData.get("next")));
}
