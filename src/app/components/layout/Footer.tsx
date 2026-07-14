import Link from "next/link";
import { Container } from "@/app/components/ui/Container";

const footerLinks = [
  { label: "Features", href: "#features" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
  { label: "Billing & cancellation", href: "/billing-info" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border py-12">
      <Container className="flex flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <div>
          <Link
            href="/"
            className="text-lg font-semibold tracking-tight text-foreground"
          >
            Kevyro
          </Link>
          <p className="mt-2 text-sm text-muted">
            Plan your perfect trip with AI.
          </p>
        </div>

        <nav className="flex gap-6">
          {footerLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <p className="text-sm text-muted">
          © {year} Kevyro. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
