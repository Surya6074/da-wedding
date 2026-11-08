"use client";

import React from "react";
import Link from "next/link";
import invitationData from "@/data/invitation.json";
import { GoldDivider } from "./ui/GoldDivider";
import { ArrowUp, Sparkles } from "lucide-react";

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-[#2D051B] text-[#FFF8E7] pt-16 pb-12 px-4 border-t-2 border-[#C9A227]/40 overflow-hidden">
      {/* Background Decorative Mandala Accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 opacity-10 pointer-events-none select-none">
        <div className="w-full h-full rounded-full border border-[#C9A227] animate-[spin_80s_linear_infinite]" />
      </div>

      <div className="max-w-2xl mx-auto relative z-10 text-center">
        {/* Sacred Traditional Motifs */}
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#FFF8E7]/10 border border-[#C9A227] mb-3 text-xl text-[#E8D9A0] shadow-md">
          ❖
        </div>

        <p className="text-xs uppercase font-serif tracking-widest text-[#C9A227] font-semibold mb-1">
          ॥ சுபம் ॥
        </p>

        <p className="font-script text-3xl sm:text-4xl text-[#E8D9A0] tracking-wide mb-2">
          With Love & Auspicious Blessings
        </p>

        <p className="font-serif text-sm sm:text-base italic text-[#FFF8E7]/85 max-w-lg mx-auto leading-relaxed px-4">
          &ldquo;Your gracious presence, prayers, and heartfelt blessings on our wedding day will be our most cherished gift as we begin our new journey together.&rdquo;
        </p>

        <GoldDivider variant="lotus" className="my-5" />

        {/* Compliments Box */}
        <div className="inline-block px-8 py-3 rounded-2xl bg-[#FFF8E7]/5 border border-[#C9A227]/40 backdrop-blur-sm mb-4 shadow-inner">
          <p className="text-[11px] uppercase font-serif tracking-widest text-[#E8D9A0]/80 font-medium">
            With Best Compliments From
          </p>
          <p className="text-base sm:text-lg font-serif font-bold text-[#FFF8E7] mt-0.5">
            {invitationData.compliments_from}
          </p>
        </div>

        {/* Generator Link */}
        {/* <div className="mb-6">
          <Link
            href="/generate"
            className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#FFF8E7]/5 hover:bg-[#FFF8E7]/15 border border-[#C9A227]/30 text-xs font-serif text-[#E8D9A0]/80 hover:text-[#E8D9A0] transition-all"
          >
            <span>💌</span>
            <span>Create WhatsApp Invitations (/generate)</span>
          </Link>
        </div> */}


        {/* Couple & Date Footnote */}
        <div className="pt-6 border-t border-[#C9A227]/20 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-serif text-[#FFF8E7]/70">
          <p className="font-medium text-[#E8D9A0]">
            {invitationData.groom.name} & {invitationData.bride.name}
          </p>

          <button
            onClick={scrollToTop}
            aria-label="Back to top"
            className="text-[#E8D9A0] hover:text-[#FFF8E7] transition-colors inline-flex items-center gap-1.5 cursor-pointer font-semibold py-1 px-3 rounded-full hover:bg-[#FFF8E7]/10"
          >
            <span>Back to Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-[#E8D9A0]" />
          </button>

          <p>{invitationData.save_the_date.date} • {invitationData.venue.location}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
