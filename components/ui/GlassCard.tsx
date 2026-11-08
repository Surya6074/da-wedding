"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
  dark?: boolean;
  ornateCorners?: boolean;
  glow?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({
  children,
  className,
  dark = false,
  ornateCorners = false,
  glow = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "relative rounded-2xl transition-all duration-300",
        dark
          ? "bg-[#2D051B]/80 text-[#FFF8E7] border border-[#C9A227]/40 backdrop-blur-xl shadow-2xl"
          : "bg-[#FFF8E7]/90 text-[#4A0E2E] border border-[#C9A227]/30 backdrop-blur-lg shadow-xl",
        glow && "shadow-[0_0_25px_rgba(201,162,39,0.25)] hover:shadow-[0_0_35px_rgba(201,162,39,0.4)]",
        className
      )}
      {...props}
    >
      {ornateCorners && (
        <>
          {/* Top Left Corner */}
          <div className="absolute top-2 left-2 w-3.5 h-3.5 border-t-2 border-l-2 border-[#C9A227]/60 pointer-events-none" />
          {/* Top Right Corner */}
          <div className="absolute top-2 right-2 w-3.5 h-3.5 border-t-2 border-r-2 border-[#C9A227]/60 pointer-events-none" />
          {/* Bottom Left Corner */}
          <div className="absolute bottom-2 left-2 w-3.5 h-3.5 border-b-2 border-l-2 border-[#C9A227]/60 pointer-events-none" />
          {/* Bottom Right Corner */}
          <div className="absolute bottom-2 right-2 w-3.5 h-3.5 border-b-2 border-r-2 border-[#C9A227]/60 pointer-events-none" />
        </>
      )}
      {children}
    </div>
  );
};
