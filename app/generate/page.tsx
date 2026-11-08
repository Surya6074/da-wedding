"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import invitationData from "@/data/invitation.json";
import { GoldDivider } from "@/components/ui/GoldDivider";
import { ArrowLeft, MessageCircle, Copy, Check, ExternalLink, Heart } from "lucide-react";

function capitalizeWords(text: string): string {
  if (!text) return "";
  return text
    .split(/\s+/)
    .map((word) =>
      word.length > 0 ? word.charAt(0).toUpperCase() + word.slice(1) : ""
    )
    .join(" ");
}

const SITE_URL = "https://surya6074.github.io/da-wedding";

export default function GenerateInvitePage() {
  const [guestName, setGuestName] = useState("");
  const [copiedMessage, setCopiedMessage] = useState(false);

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    // Automatically capitalize first letter of each word as typed
    const formatted = val.replace(/(?:^|\s)\S/g, (char) => char.toUpperCase());
    setGuestName(formatted);
  };

  const cleanName = guestName.trim()
    ? capitalizeWords(guestName.trim().replace(/^['"]|['"]$/g, ""))
    : "";

  const inviteUrl = cleanName
    ? `${SITE_URL}/?invite=${encodeURIComponent(cleanName)}`
    : `${SITE_URL}/`;

  // Formatted WhatsApp message matching the reference image
  const whatsappMessage = `✨ *WEDDING INVITATION* ✨

${cleanName ? `Dearest *${cleanName}*,` : "Dearest Friends & Family,"}

Together with our families, we cordially invite you to celebrate our wedding!

💍 *${invitationData.groom.name} & ${invitationData.bride.name}*

💒 *Muhurtham (Wedding):*
Sunday, 22nd November 2026 • 7:30 AM – 9:00 AM IST

🍽️ *Kalyana Virundhu (Traditional Feast):*
Sunday, 22nd November 2026 • 11:30 AM onwards

✨ *Wedding Reception:*
Sunday, 22nd November 2026 • 6:00 PM onwards

📍 *Venue:*
${invitationData.venue.name}, ${invitationData.venue.location}

${inviteUrl}`;

  const handleShareWhatsApp = () => {
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(whatsappMessage)}`;
    window.open(url, "_blank");
  };

  const handleCopyMessage = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(whatsappMessage).then(() => {
        setCopiedMessage(true);
        setTimeout(() => setCopiedMessage(false), 2500);
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#2D051B] via-[#4A0E2E] to-[#FFF8E7] text-[#FFF8E7] py-12 px-4 selection:bg-[#B0125B] selection:text-[#FFF8E7]">
      <div className="max-w-2xl mx-auto">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFF8E7]/10 hover:bg-[#FFF8E7]/20 border border-[#C9A227]/40 text-xs font-serif text-[#E8D9A0] font-semibold transition-all hover:scale-105"
          >
            <ArrowLeft className="w-3.5 h-3.5 text-[#E8D9A0]" />
            <span>Back to Wedding Invite</span>
          </Link>

          <span className="text-xs font-serif text-[#E8D9A0]/80">
            22 Nov 2026 • Poombarai
          </span>
        </div>

        {/* Card Header */}
        <div className="text-center mb-8">
          {/* Enhanced Royal Seal Logo */}
          <div className="inline-flex items-center justify-center w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-tr from-[#B0125B] via-[#700938] to-[#2D051B] border-2 border-[#C9A227] shadow-[0_0_30px_rgba(201,162,39,0.5)] mb-4 p-1">
            <div className="w-full h-full rounded-full border border-dashed border-[#E8D9A0]/60 flex items-center justify-center">
              <span className="font-script text-3xl sm:text-4xl text-[#E8D9A0] tracking-wide flex items-center justify-center gap-1.5">
                D <Heart className="w-5 h-5 fill-rose-300 text-rose-300" /> A
              </span>
            </div>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#E8D9A0] to-[#C9A227]">
            Wedding Invite Generator
          </h1>

          <p className="font-serif text-sm text-[#E8D9A0]/90 mt-2 max-w-md mx-auto leading-relaxed">
            Generate custom invitation links for your WhatsApp guests with their names.
          </p>

          <GoldDivider variant="mandala" className="my-4 max-w-xs" />
        </div>

        {/* Generator Box - High Contrast Royal Card */}
        <div className="relative rounded-3xl p-6 sm:p-8 bg-[#2D051B] text-[#FFF8E7] border-2 border-[#C9A227] shadow-[0_0_35px_rgba(201,162,39,0.3)] mb-8 backdrop-blur-xl">
          {/* Ornate Corner Brackets */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C9A227] pointer-events-none" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C9A227] pointer-events-none" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C9A227] pointer-events-none" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C9A227] pointer-events-none" />

          <label className="block text-xs uppercase font-serif tracking-widest text-[#E8D9A0] font-bold mb-2">
            Guest / Family Name:
          </label>

          <div className="relative">
            <input
              type="text"
              value={guestName}
              onChange={handleNameChange}
              placeholder="e.g. Suresh Kumar, Murugan Uncle & Family"
              className="w-full px-4 py-3.5 rounded-2xl bg-[#FFF8E7] text-[#4A0E2E] font-serif text-base sm:text-lg font-bold border-2 border-[#C9A227] focus:outline-none focus:ring-2 focus:ring-[#B0125B] shadow-inner placeholder:text-[#4A0E2E]/40"
            />
            {guestName && (
              <button
                onClick={() => setGuestName("")}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-serif text-[#4A0E2E] font-bold hover:text-[#B0125B] px-2.5 py-1 rounded bg-[#E8D9A0] shadow-xs cursor-pointer"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Suggestion Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="text-xs font-serif text-[#FFF8E7]/90 font-medium">Quick fill:</span>
            {["Dear Friends", "Murugan & Family", "Relatives", "Colleagues"].map((name) => (
              <button
                key={name}
                onClick={() => setGuestName(name)}
                className="text-xs font-serif px-3 py-1 rounded-full bg-[#FFF8E7]/15 hover:bg-[#FFF8E7]/30 text-[#FFF8E7] border border-[#C9A227]/50 transition-colors cursor-pointer font-medium shadow-xs"
              >
                {name}
              </button>
            ))}
          </div>

          {/* Primary Action Buttons */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              onClick={handleShareWhatsApp}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[#25D366] text-[#0B141A] font-serif text-sm uppercase tracking-wider font-bold shadow-lg hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 text-[#0B141A]" />
              <span>Share on WhatsApp</span>
            </button>

            <button
              onClick={handleCopyMessage}
              className="flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#B0125B] to-[#700938] text-[#FFF8E7] font-serif text-sm uppercase tracking-wider font-semibold border border-[#E8D9A0] shadow-md hover:brightness-110 active:scale-98 transition-all cursor-pointer"
            >
              {copiedMessage ? (
                <>
                  <Check className="w-4 h-4 text-[#E8D9A0]" />
                  <span>Message Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#FFF8E7]" />
                  <span>Copy Message</span>
                </>
              )}
            </button>
          </div>

          {/* Bottom Preview Link */}
          <div className="mt-4 flex items-center justify-center pt-3.5 border-t border-[#C9A227]/30 text-xs font-serif">
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E8D9A0] hover:text-[#FFF8E7] underline underline-offset-4 flex items-center gap-1.5 cursor-pointer font-semibold transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5 text-[#E8D9A0]" />
              <span>Preview Invite</span>
            </a>
          </div>
        </div>

        {/* Live WhatsApp Message Preview (Styled like authentic WhatsApp bubble) */}
        <div>
          <div className="flex items-center justify-between mb-3 px-2">
            <span className="text-xs uppercase font-serif tracking-widest text-[#E8D9A0] font-semibold">
              Live WhatsApp Message Preview:
            </span>
            <span className="text-[11px] font-serif text-[#FFF8E7]/60">
              Matches reference format
            </span>
          </div>

          <div className="p-4 sm:p-6 rounded-3xl bg-[#0B141A] border border-[#C9A227]/40 shadow-2xl">
            {/* WhatsApp Chat Bubble */}
            <div className="max-w-md ml-auto rounded-2xl rounded-tr-none bg-[#E7FFDB] text-[#111B21] p-4 shadow-md font-sans text-sm leading-relaxed border border-[#D1F4CC]">
              {/* Simulated Rich Link Preview Card */}
              <div className="mb-3 rounded-xl overflow-hidden border border-[#D0E7C8] bg-[#F7FDF4] shadow-xs">
                <div className="h-28 bg-gradient-to-br from-[#2D051B] to-[#700938] flex flex-col items-center justify-center text-center p-3 text-[#FFF8E7] border-b border-[#D0E7C8]">
                  <span className="font-script text-xl text-[#E8D9A0]">Deivendran & Akshaya</span>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#E8D9A0]/90 mt-0.5">
                    Wedding Invitation • 22 Nov 2026
                  </span>
                </div>
                <div className="p-2.5 text-xs text-[#111B21]">
                  <p className="font-bold">Deivendran & Akshaya | Wedding Invitation</p>
                  <p className="text-[11px] text-[#54656F] line-clamp-1 mt-0.5">
                    Save the Date: 22 November 2026 | Arulmigu Kuzhandhai Velappar Thirukkovil
                  </p>
                  <p className="text-[10px] text-[#8696A0] mt-0.5">
                    surya6074.github.io
                  </p>
                </div>
              </div>

              {/* Message Content */}
              <p className="font-bold text-[#075E54] text-center tracking-wide mb-2">
                ✨ WEDDING INVITATION ✨
              </p>

              <p className="font-semibold text-base mb-2">
                Dearest <span className="text-[#075E54] font-bold">{cleanName || "Friends & Family"}</span>,
              </p>

              <p className="text-xs sm:text-sm text-[#3B4A54] mb-3">
                Together with our families, we cordially invite you to celebrate our wedding!
              </p>

              <p className="font-bold text-sm text-[#075E54] mb-2">
                💍 {invitationData.groom.name} & {invitationData.bride.name}
              </p>

              <div className="space-y-1.5 text-xs text-[#3B4A54] my-2 p-2 rounded-lg bg-black/5">
                <p>
                  <span className="font-bold">💒 Muhurtham (Wedding):</span><br />
                  Sunday, 22nd November 2026 • 7:30 AM – 9:00 AM IST
                </p>
                <p>
                  <span className="font-bold">🍽️ Kalyana Virundhu (Feast):</span><br />
                  Sunday, 22nd November 2026 • 11:30 AM onwards
                </p>
                <p>
                  <span className="font-bold">✨ Wedding Reception:</span><br />
                  Sunday, 22nd November 2026 • 6:00 PM onwards
                </p>
                <p>
                  <span className="font-bold">📍 Venue:</span><br />
                  {invitationData.venue.name}, {invitationData.venue.location}
                </p>
              </div>

              <p className="text-xs text-[#027EB5] break-all font-mono mt-3 underline">
                {inviteUrl}
              </p>

              {/* Chat timestamp & read ticks */}
              <div className="text-right text-[10px] text-[#667781] mt-1 flex items-center justify-end gap-1">
                <span>Just now</span>
                <span className="text-[#53BDEB]">✓✓</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
