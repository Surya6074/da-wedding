"use client";

import React, { useState } from "react";
import invitationData from "@/data/invitation.json";
import { SectionTitle } from "./ui/SectionTitle";
import { GlassCard } from "./ui/GlassCard";
import { GoldDivider } from "./ui/GoldDivider";
import { MapPin, Compass, Copy, Check, Sparkles } from "lucide-react";

export const LocationMap: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const { venue } = invitationData;

  const handleCopyAddress = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText(venue.full_address).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handleGetDirections = () => {
    window.open(venue.google_maps_url, "_blank", "noopener,noreferrer");
  };

  return (
    <section
      id="location"
      className="relative py-24 px-4 bg-gradient-to-b from-[#FFF8E7] via-[#FDF5DE] to-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle
          subtitle="Sacred Destination"
          title="Temple Venue & Route"
          description="Nestled amidst the misty terraced valleys of Kodaikanal hills, the ancient Arulmigu Kuzhandhai Velappar Temple awaits your presence."
        />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start my-10">
          {/* Venue Info Card */}
          <div className="md:col-span-5 space-y-6">
            <GlassCard ornateCorners glow className="p-6 sm:p-7">
              <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#B0125B] font-bold">
                <MapPin className="w-4 h-4 text-[#B0125B]" />
                <span>The Sacred Mandapam</span>
              </div>

              <h3 className="text-2xl font-serif font-bold text-[#4A0E2E] mt-2 leading-snug">
                {venue.name}
              </h3>

              <GoldDivider variant="mandala" className="my-3 mx-0" />

              <p className="text-sm font-serif text-[#4A0E2E]/90 leading-relaxed">
                {venue.full_address}
              </p>

              {venue.landmark && (
                <div className="mt-3 p-3 rounded-xl bg-[#E8D9A0]/30 border border-[#C9A227]/30 text-xs font-serif text-[#4A0E2E]">
                  <span className="font-semibold text-[#B0125B]">Landmark: </span>
                  {venue.landmark}
                </div>
              )}

              {/* Action Buttons */}
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleGetDirections}
                  className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-gradient-to-r from-[#B0125B] to-[#700938] text-[#FFF8E7] text-xs font-serif uppercase tracking-wider font-semibold shadow-md hover:scale-102 active:scale-98 transition-all cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-[#FFF8E7]" />
                  <span>Get Directions</span>
                </button>

                <button
                  onClick={handleCopyAddress}
                  className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#FFF8E7] text-[#4A0E2E] border border-[#C9A227] text-xs font-serif uppercase tracking-wider font-semibold hover:bg-[#E8D9A0]/30 active:scale-98 transition-all cursor-pointer"
                >
                  <Copy className="w-4 h-4 text-[#4A0E2E]" />
                  <span>{copied ? "Copied!" : "Copy Address"}</span>
                </button>
              </div>

              {copied && (
                <p className="text-xs font-serif text-emerald-800 text-center mt-2.5 font-semibold animate-pulse flex items-center justify-center gap-1">
                  <Check className="w-3.5 h-3.5 text-emerald-700" />
                  <span>Address copied to clipboard!</span>
                </p>
              )}
            </GlassCard>

            {/* Travel Tip Card */}
            <div className="p-4 rounded-2xl bg-[#2D051B]/85 text-[#FFF8E7] border border-[#C9A227]/40 shadow-lg text-xs font-serif leading-relaxed">
              <span className="text-[#E8D9A0] font-bold mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#E8D9A0]" />
                <span>Travel Note:</span>
              </span>
              Poombarai is a scenic 45-minute drive (18 km) from Kodaikanal town. Guests travelling by car or bus can enjoy the majestic views of terrace farming and pine forests along the way.
            </div>
          </div>

          {/* Embedded Google Map Frame */}
          <div className="md:col-span-7">
            <GlassCard className="overflow-hidden border-2 border-[#C9A227] shadow-2xl p-1.5 rounded-3xl">
              <div className="relative w-full h-[380px] sm:h-[450px] rounded-2xl overflow-hidden bg-[#E8D9A0]/20">
                <iframe
                  title="Venue Google Map"
                  src={venue.embed_map_url}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="rounded-2xl"
                />
              </div>
            </GlassCard>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;
