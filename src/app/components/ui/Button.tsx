import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type ButtonVariant = "primary" | "secondary";

type LinkProps = ComponentPropsWithoutRef<typeof Link>;

type ButtonProps = Omit<LinkProps, "href" | "className"> & {
  href: string;
  variant?: ButtonVariant;
  className?: string;
};

export const buttonBaseStyles =
  "inline-flex items-center justify-center rounded-full px-6 py-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const buttonVariantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-gradient-to-r from-accent to-accent-2 text-white hover:opacity-90",
  secondary: "border border-border text-foreground hover:bg-surface",
};

export function Button({
  href,
  variant = "primary",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`${buttonBaseStyles} ${buttonVariantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
