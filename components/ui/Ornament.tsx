"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface OrnamentProps {
  type: "kalasam" | "lotus" | "diya" | "knot" | "flower" | "mandala";
  className?: string;
  size?: number;
}

export const Ornament: React.FC<OrnamentProps> = ({
  type,
  className,
  size = 32,
}) => {
  if (type === "diya") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={cn("text-[#C9A227]", className)}
      >
        {/* Flame */}
        <path
          d="M24 6C24 6 20 13 20 17C20 19.2 21.8 21 24 21C26.2 21 28 19.2 28 17C28 13 24 6 24 6Z"
          fill="#FFA000"
          className="animate-pulse"
        />
        <path
          d="M24 10C24 10 22 14 22 16.5C22 17.6 22.9 18.5 24 18.5C25.1 18.5 26 17.6 26 16.5C26 14 24 10 24 10Z"
          fill="#FFF9C4"
        />
        {/* Diya Lamp Base */}
        <path
          d="M10 24C10 32 16 38 24 38C32 38 38 32 38 24H10Z"
          fill="currentColor"
        />
        <path
          d="M20 38L18 42H30L28 38H20Z"
          fill="currentColor"
          opacity="0.85"
        />
      </svg>
    );
  }

  if (type === "lotus") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 40 40"
        fill="currentColor"
        className={cn("text-[#C9A227]", className)}
      >
        <path d="M20 4C18 10 14 16 8 18C13 21 17 24 20 32C23 24 27 21 32 18C26 16 22 10 20 4Z" />
        <path
          d="M20 28C16 24 11 23 4 24C8 28 14 30 20 32C26 30 32 28 36 24C29 23 24 24 20 28Z"
          opacity="0.7"
        />
      </svg>
    );
  }

  if (type === "kalasam") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 44"
        fill="currentColor"
        className={cn("text-[#C9A227]", className)}
      >
        <path d="M18 2C22 7 24 12 18 16C12 12 14 7 18 2Z" fill="#9E7B16" />
        <path d="M18 14C23 11 28 13 28 17C23 18 19 17 18 14Z" opacity="0.9"/>
        <path d="M18 14C13 11 8 13 8 17C13 18 17 17 18 14Z" opacity="0.9"/>
        <ellipse cx="18" cy="18" rx="8" ry="2" />
        <path d="M12 19C5 24 5 34 13 37L23 37C31 34 31 24 24 19Z" />
        <ellipse cx="18" cy="37" rx="7" ry="2" />
      </svg>
    );
  }

  if (type === "flower") {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        className={cn("text-[#C9A227]", className)}
      >
        <circle cx="12" cy="12" r="3" fill="currentColor" />
        <path d="M12 2a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
        <path d="M12 14a4 4 0 0 0-4 4 4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4z" />
        <path d="M2 12a4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4z" />
        <path d="M14 12a4 4 0 0 0 4 4 4 4 0 0 0 4-4 4 4 0 0 0-4-4 4 4 0 0 0-4 4z" />
      </svg>
    );
  }

  // Default knot / mandala
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center font-serif text-[#C9A227]",
        className
      )}
      style={{ fontSize: size }}
    >
      ❖
    </span>
  );
};
