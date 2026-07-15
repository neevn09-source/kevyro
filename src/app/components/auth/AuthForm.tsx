"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signUpAction, logInAction, type AuthActionState } from "@/lib/actions/auth";

type AuthMode = "signup" | "login";

type AuthFormProps = {
  mode: AuthMode;
  next: string;
};

const initialState: AuthActionState = {};

export function AuthForm({ mode, next }: AuthFormProps) {
  const action = mode === "signup" ? signUpAction : logInAction;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="next" value={next} />

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-medium text-foreground"
        >
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="you@example.com"
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-medium text-foreground"
        >
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          minLength={6}
          autoComplete={mode === "signup" ? "new-password" : "current-password"}
          placeholder="••••••••"
          className="mt-2 w-full rounded-lg border border-border bg-surface px-4 py-3 text-sm text-foreground placeholder:text-muted focus:outline-none focus:ring-2 focus:ring-accent"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="inline-flex w-full items-center justify-center rounded-full bg-gradient-to-r from-accent to-accent-2 px-6 py-3 text-sm font-medium text-white transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending
          ? mode === "signup"
            ? "Creating account…"
            : "Logging in…"
          : mode === "signup"
            ? "Create account"
            : "Log in"}
      </button>

      {state?.error && (
        <p role="alert" className="text-sm text-red-400">
          {state.error}
        </p>
      )}

      <p className="text-center text-sm text-muted">
        {mode === "signup" ? (
          <>
            Already have an account?{" "}
            <Link
              href={`/login?next=${encodeURIComponent(next)}`}
              className="text-foreground underline underline-offset-4 hover:text-accent"
            >
              Log in
            </Link>
          </>
        ) : (
          <>
            Don&apos;t have an account?{" "}
            <Link
              href={`/signup?next=${encodeURIComponent(next)}`}
              className="text-foreground underline underline-offset-4 hover:text-accent"
            >
              Sign up
            </Link>
          </>
        )}
      </p>
    </form>
  );
}
