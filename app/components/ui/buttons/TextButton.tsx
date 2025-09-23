"use client";
import { MouseEventHandler, ReactNode } from "react";
import Link from "next/link";

export type TextButtonProps = {
  children: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>;
  className?: string;
  ariaSelected?: boolean;
  variant?: "primary" | "secondary";
  showArrow?: boolean;
  disabled?: boolean;
};

function cx(...parts: Array<string | false | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export default function TextButton({
  children,
  href,
  active = false,
  onClick,
  className = "",
  ariaSelected,
  variant = "primary",
  showArrow = true,
  disabled = false,
}: TextButtonProps) {
  const base =
    variant === "primary"
      ? cx("text-black", "cursor-pointer", active && "font-bold", !disabled && "hover:underline")
      : cx("text-black", "cursor-pointer", active && "underline", !disabled && "hover:font-bold");

  const cls = cx(
    base,
    disabled && "cursor-not-allowed text-black/40 pointer-events-none",
    className
  );

  const content =
    variant === "primary" && active && showArrow ? (
      <span>
        {"> "}
        {children}
      </span>
    ) : (
      children
    );

  if (href) {
    // For disabled links: make it inert but keep markup stable
    if (disabled) {
      return (
        <span className={cls} aria-selected={ariaSelected} aria-disabled="true">
          {content}
        </span>
      );
    }
    return (
      <Link
        href={href}
        className={cls}
        aria-selected={ariaSelected}
        onClick={onClick as MouseEventHandler<HTMLAnchorElement>}
      >
        {content}
      </Link>
    );
  }

  return (
    <button
      type="button"
      onClick={onClick as MouseEventHandler<HTMLButtonElement>}
      aria-selected={ariaSelected}
      disabled={disabled}
      className={cls}
    >
      {content}
    </button>
  );
}
