"use client";
import { useMemo, useRef, useState } from "react";
import { RiArrowDropDownLine, RiArrowDropUpLine } from "react-icons/ri";
import { twMerge } from "tailwind-merge";
import TextButton from "../buttons/TextButton";

type Option = { value: string; label: string;};
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
  variant = "primary",
  align = "left",
  arrowSize = 18,
  getDisplayLabel,
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

  const onBlur: React.FocusEventHandler<HTMLDivElement> = e => {
    const next = e.relatedTarget as Node | null;
    if (next && wrapRef.current?.contains(next)) return;
    setOpen(false);
  };

  const baseContainer = "relative inline-flex";
  const baseInput =
    variant === "primary"
      ? "inline-flex items-center border border-black bg-white cursor-pointer min-h-[40px] px-2"
      : "inline-flex items-center bg-transparent cursor-pointer border-b-2 border-transparent hover:border-black min-h-[40px]";
  const baseLabel = twMerge("truncate leading-none text-sm", variant === "secondary" && "font-bold");
  const baseArrow = "ml-1 flex items-center justify-center h-full";
  const baseMenu = "absolute top-full z-10 bg-white border border-black mt-1 shadow-xl whitespace-nowrap";
  const baseItem = "block w-full cursor-pointer text-sm text-left";

  return (
    <div
      ref={wrapRef}
      className={twMerge(baseContainer, containerClassName)}
      tabIndex={0}
      onBlur={onBlur}
    >
      <button
        type="button"
        className={twMerge(baseInput, justify, inputClassName, variant === "secondary" && open && "border-black")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(s => !s)}
      >
        <span className={twMerge(baseLabel, textAlign, labelClassName)}>{display}</span>
        <span className={twMerge(baseArrow, arrowClassName)}>
          {open ? <RiArrowDropUpLine size={arrowSize} /> : <RiArrowDropDownLine size={arrowSize} />}
        </span>
      </button>

      {open && (
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
