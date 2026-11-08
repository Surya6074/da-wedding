"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GoldDividerProps {
  className?: string;
  variant?: "mandala" | "lotus" | "diamond" | "simple";
}

export const GoldDivider: React.FC<GoldDividerProps> = ({
  className,
  variant = "mandala",
}) => {
  return (
    <div
      className={cn(
        "flex items-center justify-center gap-3 my-6 w-full max-w-md mx-auto",
        className
      )}
    >
      <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#C9A227]/70 to-[#C9A227]" />

      {variant === "mandala" && (
        <div className="flex items-center gap-1.5 text-[#C9A227]">
          <span className="text-xs opacity-75">✦</span>
          <span className="text-base font-serif">❖</span>
          <span className="text-xs opacity-75">✦</span>
        </div>
      )}

      {variant === "lotus" && (
        <svg
          className="w-6 h-6 text-[#C9A227] fill-current drop-shadow-sm"
          viewBox="0 0 24 24"
        >
          <path d="M12 3c-1.5 3-4 6-8 7 3 2 6 3 8 7 2-4 5-5 8-7-4-1-6.5-4-8-7z" />
          <path d="M12 17c-2-2-4-2.5-6-2 1.5 2 3.5 3 6 3 2.5 0 4.5-1 6-3-2-.5-4 0-6 2z" opacity="0.6"/>
        </svg>
      )}

      {variant === "diamond" && (
        <div className="w-2.5 h-2.5 rotate-45 border border-[#C9A227] bg-[#E8D9A0]/60" />
      )}

      {variant === "simple" && (
        <div className="w-1.5 h-1.5 rounded-full bg-[#C9A227]" />
      )}

      <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#C9A227]/70 to-[#C9A227]" />
    </div>
  );
};
