"use client";
import { useMemo, useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import TextButton from "../buttons/TextButton";

type Option = { value: string; label: string };
type Variant = "primary" | "secondary";
type Align = "left" | "right";

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  variant?: Variant;
  align?: Align;
  arrowSize?: number;
  getDisplayLabel?: (option: Option | undefined) => string;
  disabled?: boolean;
  containerClassName?: string;
  inputClassName?: string;
  labelClassName?: string;
  arrowClassName?: string;
  menuClassName?: string;
  itemClassName?: string;
};

export default function Dropdown({
  options,
  value,
  onChange,
  variant = "secondary",
  align = "right",
  arrowSize = 14,
  getDisplayLabel,
  disabled = false,
  containerClassName = "",
  inputClassName = "",
  labelClassName = "",
  arrowClassName = "",
  menuClassName = "",
  itemClassName = "",
}: Props) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const selected = useMemo(() => options.find(o => o.value === value), [options, value]);
  const display = getDisplayLabel?.(selected) ?? selected?.label ?? "";

  const justify = align === "right" ? "justify-end" : "justify-start";
  const textAlign = align === "right" ? "text-right" : "text-left";
  const menuAnchor = align === "right" ? "right-0" : "left-0";

  const onBlur: React.FocusEventHandler<HTMLDivElement> = (e) => {
    const next = e.relatedTarget as Node | null;
    if (next && wrapRef.current?.contains(next)) return;
    setOpen(false);
  };

  const baseContainer = "relative inline-flex";
  const baseInput =
    variant === "primary"
      ? "inline-flex items-center gap-1 border border-black bg-white cursor-pointer"
      : "inline-flex items-center gap-1 bg-transparent cursor-pointer border-b border-transparent hover:border-black";
  const baseLabel = twMerge(variant === "secondary" && "font-bold", "leading-none truncate");
  const baseArrow = "flex items-center justify-center";
  const baseMenu =
    "absolute top-full z-10 bg-white border border-black mt-1 shadow-xl whitespace-nowrap";
  const baseItem = "block w-full cursor-pointer text-left";

  return (
    <div
      ref={wrapRef}
      className={twMerge(baseContainer, containerClassName)}
      tabIndex={0}
      onBlur={onBlur}
    >
      <button
        type="button"
        disabled={disabled}
        className={twMerge(
          baseInput,
          justify,
          inputClassName,
          variant === "secondary" && open && "border-black",
          disabled && "cursor-not-allowed text-black/40 hover:border-transparent"
        )}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => !disabled && setOpen(s => !s)}
      >
        <span className={twMerge(baseLabel, textAlign, labelClassName)}>{display}</span>
        <span className={twMerge(baseArrow, arrowClassName)}>
          {open ? <RiArrowDropUpLine size={arrowSize} /> : <RiArrowDropDownLine size={arrowSize} />}
        </span>
      </button>

      {open && !disabled && (
        <div className={twMerge(baseMenu, menuAnchor, menuClassName)} role="listbox">
          {options.map(o => (
            <TextButton
              key={o.value}
              active={o.value === value}
              ariaSelected={o.value === value}
              className={twMerge(baseItem, itemClassName)}
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
