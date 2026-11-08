"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { GoldDivider } from "./GoldDivider";

interface SectionTitleProps {
  subtitle?: string;
  title: string;
  description?: string;
  className?: string;
  align?: "center" | "left";
  dark?: boolean;
}

export const SectionTitle: React.FC<SectionTitleProps> = ({
  subtitle,
  title,
  description,
  className,
  align = "center",
  dark = false,
}) => {
  return (
    <div
      className={cn(
        "mb-10 md:mb-14",
        align === "center" ? "text-center mx-auto" : "text-left",
        "max-w-2xl px-4",
        className
      )}
    >
      {subtitle && (
        <p className="font-script text-2xl md:text-3xl text-[#B0125B] tracking-wide mb-1 select-none">
          {subtitle}
        </p>
      )}

      <h2
        className={cn(
          "text-3xl md:text-4xl lg:text-5xl font-serif font-bold tracking-tight uppercase",
          dark
            ? "text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#E8D9A0] to-[#C9A227]"
            : "text-transparent bg-clip-text bg-gradient-to-r from-[#B0125B] via-[#4A0E2E] to-[#700938]"
        )}
      >
        {title}
      </h2>

      <GoldDivider variant="mandala" className={align === "left" ? "mx-0" : "mx-auto"} />

      {description && (
        <p
          className={cn(
            "text-base md:text-lg font-serif italic mt-3 leading-relaxed",
            dark ? "text-[#E8D9A0]/90" : "text-[#4A0E2E]/80"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
};
