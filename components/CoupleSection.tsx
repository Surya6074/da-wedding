"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import invitationData from "@/data/invitation.json";
import { SectionTitle } from "./ui/SectionTitle";
import { GlassCard } from "./ui/GlassCard";
import { GoldDivider } from "./ui/GoldDivider";
import { useInvite } from "./InviteContext";
import { Heart } from "lucide-react";

export const CoupleSection: React.FC = () => {
  const { groom, bride, invitation_message } = invitationData;
  const { inviteName } = useInvite();

  return (
    <section
      id="couple"
      className="relative py-24 px-4 bg-[#FFF8E7] overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div
        style={{ position: "absolute" }}
        className="absolute top-10 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full opacity-5 pointer-events-none select-none"
      >
        <Image
          src="./images/mandala.svg"
          alt="Background Mandala"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-5xl mx-auto relative z-10">
        <SectionTitle
          subtitle="Two Souls, One Destiny"
          title="The Groom & The Bride"
          description="Bounded by love, blessed by elders, and united by sacred tradition."
        />

        {/* Couple Cards Grid with Slide-in Animations */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center my-12">
          {/* Groom Card (Slides from Left) */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <GlassCard
              ornateCorners
              glow
              className="p-6 sm:p-8 text-center group hover:border-[#C9A227] transition-all duration-300"
            >
              {/* Arch Framed Photo Container */}
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#C9A227] p-1.5 bg-[#FFF8E7] shadow-xl group-hover:scale-102 transition-transform duration-500">
                <div style={{ position: "relative" }} className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden">
                  <Image
                    src={groom.photo}
                    alt={groom.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D051B]/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Groom Details */}
              <div className="mt-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[11px] font-serif uppercase tracking-widest text-[#B0125B] font-bold">
                    The Groom
                  </span>
                  <span className="text-xs text-[#C9A227] font-serif">॥ மணமகன் ॥</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E2E] mt-1">
                  {groom.name}
                </h3>
                <p className="text-sm font-serif text-[#C9A227] font-semibold tracking-wider">
                  {groom.qualifications}
                </p>

                <GoldDivider variant="diamond" className="my-3 max-w-[200px]" />

                {/* Parentage details */}
                <p className="text-xs sm:text-sm font-serif text-[#4A0E2E]/80 leading-relaxed">
                  <span className="font-semibold text-[#B0125B]">{groom.relation}</span>{" "}
                  {groom.parents.father} & {groom.parents.mother}
                </p>

                {groom.about && (
                  <p className="text-xs font-serif italic text-[#4A0E2E]/70 mt-3 px-4">
                    &ldquo;{groom.about}&rdquo;
                  </p>
                )}
              </div>
            </GlassCard>
          </motion.div>

          {/* Center Heart Ornament (Absolute on desktop, inline on mobile) */}
          <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
              className="w-14 h-14 rounded-full bg-[#FFF8E7] border-2 border-[#C9A227] shadow-[0_0_25px_rgba(201,162,39,0.5)] flex items-center justify-center text-[#B0125B]"
            >
              <Heart className="w-6 h-6 fill-[#B0125B] text-[#B0125B] animate-pulse" />
            </motion.div>
          </div>

          {/* Bride Card (Slides from Right) */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <GlassCard
              ornateCorners
              glow
              className="p-6 sm:p-8 text-center group hover:border-[#C9A227] transition-all duration-300"
            >
              {/* Arch Framed Photo Container */}
              <div className="relative w-48 h-64 sm:w-56 sm:h-72 mx-auto rounded-t-full rounded-b-2xl overflow-hidden border-2 border-[#C9A227] p-1.5 bg-[#FFF8E7] shadow-xl group-hover:scale-102 transition-transform duration-500">
                <div style={{ position: "relative" }} className="relative w-full h-full rounded-t-full rounded-b-xl overflow-hidden">
                  <Image
                    src={bride.photo}
                    alt={bride.name}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 768px) 192px, 224px"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D051B]/60 via-transparent to-transparent" />
                </div>
              </div>

              {/* Bride Details */}
              <div className="mt-6">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <span className="text-[11px] font-serif uppercase tracking-widest text-[#B0125B] font-bold">
                    The Bride
                  </span>
                  <span className="text-xs text-[#C9A227] font-serif">॥ மணமகள் ॥</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E2E] mt-1">
                  {bride.name}
                </h3>
                <p className="text-sm font-serif text-[#C9A227] font-semibold tracking-wider">
                  {bride.qualifications}
                </p>

                <GoldDivider variant="diamond" className="my-3 max-w-[200px]" />

                {/* Parentage details */}
                <p className="text-xs sm:text-sm font-serif text-[#4A0E2E]/80 leading-relaxed">
                  <span className="font-semibold text-[#B0125B]">{bride.relation}</span>{" "}
                  {bride.parents.father} & {bride.parents.mother}
                </p>

                {bride.about && (
                  <p className="text-xs font-serif italic text-[#4A0E2E]/70 mt-3 px-4">
                    &ldquo;{bride.about}&rdquo;
                  </p>
                )}
              </div>
            </GlassCard>
          </motion.div>
        </div>

        {/* Invitation Message Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-14 max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#2D051B] via-[#4A0E2E] to-[#700938] border border-[#C9A227] shadow-2xl text-center text-[#FFF8E7]"
        >
          <span className="text-2xl text-[#E8D9A0] block mb-2 font-serif">❖</span>
          {inviteName && (
            <p className="font-serif text-lg sm:text-2xl font-bold text-[#E8D9A0] mb-2">
              Dearest {inviteName},
            </p>
          )}
          <p className="font-serif text-base sm:text-xl italic leading-relaxed text-[#FFF8E7]/95">
            &ldquo;{invitation_message}&rdquo;
          </p>
          <div className="mt-4 flex items-center justify-center gap-2 text-xs font-serif uppercase tracking-widest text-[#E8D9A0]/80">
            <span>With Best Compliments:</span>
            <span className="font-bold text-[#E8D9A0]">{invitationData.compliments_from}</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CoupleSection;
