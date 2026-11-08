"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { useMusic } from "./MusicContext";
import { useInvite } from "./InviteContext";
import invitationData from "@/data/invitation.json";
import { GoldDivider } from "./ui/GoldDivider";
import { MailOpen, Music, Heart } from "lucide-react";

export const SplashScreen: React.FC = () => {
  const { isInvitationOpened, openInvitation, startMusic } = useMusic();
  const { inviteName } = useInvite();
  const [isOpening, setIsOpening] = useState(false);

  // Lock body scroll while splash is active
  useEffect(() => {
    if (!isInvitationOpened) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isInvitationOpened]);

  const handleOpen = () => {
    // Synchronously trigger music on user tap so audio plays without any browser lag
    startMusic();
    setIsOpening(true);

    // Auspicious confetti burst in gold and rose colors
    try {
      confetti({
        particleCount: 65,
        spread: 80,
        origin: { y: 0.6 },
        colors: ["#C9A227", "#B0125B", "#E8D9A0", "#FFF8E7"],
        disableForReducedMotion: true,
      });
    } catch {
      // ignore
    }

    // Unmount splash and unlock scroll after the door reveal animation completes
    setTimeout(() => {
      openInvitation();
    }, 700);
  };

  if (isInvitationOpened) return null;

  return (
    <AnimatePresence>
      {!isInvitationOpened && (
        <motion.div
          key="splash-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-[#2D051B]"
        >
          {/* Left Door Panel */}
          <motion.div
            animate={isOpening ? { x: "-100%", opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 bottom-0 left-0 w-1/2 bg-gradient-to-br from-[#2D051B] via-[#4A0E2E] to-[#700938] border-r border-[#C9A227]/40 shadow-2xl flex items-center justify-end overflow-hidden"
          >
            <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#C9A227]/20 to-transparent pointer-events-none" />
            <div className="absolute -left-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#C9A227]/20 pointer-events-none" />
          </motion.div>

          {/* Right Door Panel */}
          <motion.div
            animate={isOpening ? { x: "100%", opacity: 0 } : { x: 0, opacity: 1 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
            className="absolute top-0 bottom-0 right-0 w-1/2 bg-gradient-to-bl from-[#2D051B] via-[#4A0E2E] to-[#700938] border-l border-[#C9A227]/40 shadow-2xl flex items-center justify-start overflow-hidden"
          >
            <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#C9A227]/20 to-transparent pointer-events-none" />
            <div className="absolute -right-20 top-1/2 -translate-y-1/2 w-96 h-96 rounded-full border border-[#C9A227]/20 pointer-events-none" />
          </motion.div>

          {/* Center Envelope / Seal Card */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0, y: 20 }}
            animate={
              isOpening
                ? { scale: 1.15, opacity: 0, y: -20 }
                : { scale: 1, opacity: 1, y: 0 }
            }
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative z-10 w-11/12 max-w-md mx-auto p-8 rounded-3xl bg-[#FFF8E7]/95 border-2 border-[#C9A227] shadow-[0_0_50px_rgba(201,162,39,0.35)] text-center backdrop-blur-md"
          >
            {/* Ornate Corner Accents */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#C9A227]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#C9A227]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#C9A227]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#C9A227]" />

            {/* Save The Date Header */}
            <div className="flex items-center justify-center gap-3 mb-4">
              <span className="h-[1px] w-8 sm:w-12 bg-[#C9A227]/60" />
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] font-serif text-[#C9A227] font-bold">
                SAVE THE DATE
              </span>
              <span className="h-[1px] w-8 sm:w-12 bg-[#C9A227]/60" />
            </div>

            {/* Personalized Guest Badge */}
            {inviteName && (
              <div className="mb-4 px-4 py-2 rounded-2xl bg-[#B0125B]/10 border border-[#C9A227]/40 shadow-sm">
                <span className="text-[10px] font-serif uppercase tracking-widest text-[#B0125B] font-bold block">
                  Special Invitation For
                </span>
                <span className="font-serif text-lg font-bold text-[#4A0E2E]">
                  Dearest {inviteName}
                </span>
              </div>
            )}

            {/* Central Monogram Seal */}
            <div className="relative my-4 inline-flex items-center justify-center">
              <div className="w-24 h-24 rounded-full border-2 border-dashed border-[#C9A227] flex items-center justify-center p-1 bg-[#FFF8E7] shadow-inner">
                <div className="w-full h-full rounded-full bg-gradient-to-tr from-[#B0125B] to-[#700938] flex items-center justify-center shadow-lg">
                  <span className="font-script text-3xl text-[#E8D9A0] font-normal tracking-wide flex items-center justify-center gap-1">
                    D <Heart className="w-5 h-5 fill-rose-300 text-rose-300" /> A
                  </span>
                </div>
              </div>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#4A0E2E] mt-2">
              {invitationData.groom.name.split(" ")[1]} & {invitationData.bride.name.split(" ")[1]}
            </h1>

            <p className="font-script text-xl text-[#B0125B] mt-1">
              Wedding Invitation
            </p>

            <GoldDivider variant="mandala" className="my-3" />

            <p className="text-sm font-serif text-[#4A0E2E]/80 mb-6 font-medium">
              {invitationData.save_the_date.day}, {invitationData.save_the_date.date}
            </p>

            {/* Open Invitation Button */}
            <button
              onClick={handleOpen}
              disabled={isOpening}
              className="relative inline-flex items-center justify-center gap-3 w-full py-3.5 px-6 rounded-full bg-gradient-to-r from-[#B0125B] via-[#700938] to-[#B0125B] text-[#FFF8E7] font-serif text-base tracking-widest uppercase font-semibold border border-[#E8D9A0] shadow-[0_4px_25px_rgba(176,18,91,0.4)] transition-all duration-300 hover:scale-102 hover:shadow-[0_6px_30px_rgba(201,162,39,0.5)] active:scale-98 cursor-pointer"
            >
              <MailOpen className="w-5 h-5 text-[#E8D9A0]" />
              <span>Open Invitation</span>
              <span className="text-xs text-[#E8D9A0]/90 font-normal lowercase tracking-normal">
                (Tap to enter)
              </span>
            </button>

            <p className="text-[11px] font-serif text-[#4A0E2E]/70 mt-3 flex items-center justify-center gap-1.5 font-medium">
              <Music className="w-3.5 h-3.5 text-[#B0125B]" />
              <span>Plays traditional Mangala Isai on opening</span>
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SplashScreen;
