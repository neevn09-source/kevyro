import { cookies } from "next/headers";

const SESSION_COOKIE = "kevyro_session";

export type Session = {
  user: {
    email: string;
  };
};

/**
 * Mock session store backed by an httpOnly cookie. No real credential or
 * user-record checking happens yet — swap the bodies of these three
 * functions for a real provider (e.g. Supabase `@supabase/ssr`) later;
 * every caller in the app only depends on this signature.
 */
export async function getSession(): Promise<Session | null> {
  const store = await cookies();
  const raw = store.get(SESSION_COOKIE)?.value;

  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw);
    if (typeof parsed?.email !== "string") {
      return null;
    }
    return { user: { email: parsed.email } };
  } catch {
    return null;
  }
}

export async function createSession(email: string): Promise<void> {
  const store = await cookies();
  store.set(SESSION_COOKIE, JSON.stringify({ email }), {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(SESSION_COOKIE);
}
