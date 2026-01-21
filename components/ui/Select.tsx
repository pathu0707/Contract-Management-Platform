"use client";

import { SelectHTMLAttributes } from "react";

interface SelectProps
  extends SelectHTMLAttributes<HTMLSelectElement> {}

export default function Select({
  className = "",
  children,
  ...props
}: SelectProps) {
  return (
    <select
      {...props}
      className={`w-full rounded-md border px-3 py-2 text-sm focus:border-blue-500 focus:outline-none ${className}`}
    >
      {children}
    </select>
  );
}
