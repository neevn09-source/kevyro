import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";
import { Container } from "@/app/components/ui/Container";
import { Button } from "@/app/components/ui/Button";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="flex-1 py-24 sm:py-32">
        <Container>
          <div className="mx-auto max-w-md text-center">
            <p className="text-sm font-medium text-accent">404</p>
            <h1 className="mt-4 text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Page not found
            </h1>
            <p className="mt-4 text-muted">
              The page you&apos;re looking for doesn&apos;t exist or may have
              moved.
            </p>
            <div className="mt-8">
              <Button href="/">Back to home</Button>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
