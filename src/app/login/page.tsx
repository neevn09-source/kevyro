import type { Metadata } from "next";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Container } from "@/app/components/ui/Container";
import { AuthForm } from "@/app/components/auth/AuthForm";

export const metadata: Metadata = {
  title: "Log in — Kevyro",
  description: "Log in to your Kevyro account.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <>
      <Navbar />
      <main className="flex-1 py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-md">
            <div className="text-center">
              <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
                Welcome back
              </h1>
              <p className="mt-4 text-muted">
                Log in to continue planning and manage your plan.
              </p>
            </div>

            <div className="mt-10 rounded-2xl border border-border bg-surface p-8">
              <AuthForm mode="login" next={next ?? "/plan"} />
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
