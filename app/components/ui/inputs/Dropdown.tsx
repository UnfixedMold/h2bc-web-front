"use client";
import { useMemo, useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import TextButton from "../buttons/TextButton";

type Option = {
  value: string;
  label: string;
  shortLabel?: string;
};

type Variant = "primary" | "secondary";
type Size = "sm" | "md" | "lg";

export type DropdownTheme = {
  sizes: Record<Size, string>;
  variants: Record<Variant, string>;
  menu: string;
  itemBase: string;
  wrapper: string;
  icon: string;
  labelPrimary: string;
  labelSecondary: string;
};

const defaultTheme: DropdownTheme = {
  sizes: {
    sm: "h-8 text-xs min-w-[72px]",
    md: "h-10 text-sm min-w-[96px]",
    lg: "h-12 text-base min-w-[128px]",
  },
  variants: {
    primary: "flex items-center w-full border border-black px-3 bg-white",
    secondary: "flex items-center w-full bg-transparent justify-end",
  },
  menu:
    "absolute top-full z-10 bg-white border border-black mt-1 shadow-xl whitespace-nowrap min-w-full",
  itemBase: "block w-full px-3 py-2",
  wrapper: "relative inline-block",
  icon: "w-6 h-6 ml-2 flex items-center justify-center",
  labelPrimary: "flex-1 min-w-0 truncate text-left",
  labelSecondary: "flex-1 min-w-0 truncate text-right",
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  className?: string;
  wrapperClassName?: string;
  variant?: Variant;
  size?: Size;
  theme?: Partial<DropdownTheme>;
  getDisplayLabel?: (option: Option | undefined) => string;
};

const mergeTheme = (b: DropdownTheme, o?: Partial<DropdownTheme>): DropdownTheme => ({
  ...b,
  ...(o || {}),
  sizes: { ...b.sizes, ...(o?.sizes || {}) },
  variants: { ...b.variants, ...(o?.variants || {}) },
});

export default function Dropdown({
  options,
  value,
  onChange,
  className = "",
  wrapperClassName = "",
  variant = "primary",
  size = "md",
  theme,
  getDisplayLabel,
}: Props) {
  const t = mergeTheme(defaultTheme, theme);
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => options.find((o) => o.value === value), [options, value]);
  const display = getDisplayLabel
    ? getDisplayLabel(selected)
    : selected?.shortLabel ?? selected?.label ?? "";

  const btnClass = `${t.variants[variant]} ${t.sizes[size]} ${className}`.trim();
  const labelClass = variant === "secondary" ? t.labelSecondary : t.labelPrimary;
  const itemAlign = variant === "secondary" ? "text-right" : "text-left";

  const handleBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    const next = e.relatedTarget as Node | null;
    if (next && wrapRef.current?.contains(next)) return;
    setOpen(false);
  };

  return (
    <div
      ref={wrapRef}
      className={`${t.wrapper} ${wrapperClassName || ""}`}
      tabIndex={0}
      onBlur={handleBlur}
    >
      <button
        type="button"
        className={btnClass}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        <span className={labelClass}>{display}</span>
        <span className={t.icon}>
          {open ? <RiArrowDropUpLine size={24} /> : <RiArrowDropDownLine size={24} />}
        </span>
      </button>

      {open && (
        <div
          className={`${t.menu} ${variant === "secondary" ? "right-0" : "left-0"}`}
          role="listbox"
        >
          {options.map((o) => (
            <TextButton
              key={o.value}
              active={o.value === value}
              ariaSelected={o.value === value}
              className={`${t.itemBase} ${itemAlign}`}
              onClick={() => {
                onChange(o.value);
                setOpen(false);
              }}
              variant="primary"
            >
              {o.label}
            </TextButton>
          ))}
        </div>
      )}
    </div>
  );
}
