"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import invitationData from "@/data/invitation.json";
import { GoldDivider } from "./ui/GoldDivider";
import { useInvite } from "./InviteContext";
import { MapPin, Heart } from "lucide-react";

export const Hero: React.FC = () => {
  const { inviteName } = useInvite();
  const heroRef = useRef<HTMLElement | null>(null);
  const mandalaRef = useRef<HTMLDivElement | null>(null);
  const gopuramRef = useRef<HTMLDivElement | null>(null);
  const contentRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // Smooth scroll-driven layered parallax (steady, no mouse tilt)
      if (mandalaRef.current) {
        gsap.to(mandalaRef.current, {
          y: -100,
          rotation: 30,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      }

      if (gopuramRef.current) {
        gsap.to(gopuramRef.current, {
          y: -50,
          scale: 1.04,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 0.8,
          },
        });
      }

      if (contentRef.current) {
        gsap.to(contentRef.current, {
          y: 60,
          opacity: 0.35,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "85% top",
            scrub: 0.6,
          },
        });
      }
    }, heroRef);

    return () => {
      ctx.revert();
    };
  }, []);

  const scrollToCouple = () => {
    const el = document.getElementById("couple");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#2D051B] via-[#4A0E2E] to-[#FFF8E7] pt-14 pb-16 px-4"
    >
      {/* Background Rotating Mandala Layer */}
      <div
        ref={mandalaRef}
        style={{ position: "absolute" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[340px] sm:w-[560px] md:w-[720px] h-[340px] sm:h-[560px] md:h-[720px] opacity-15 pointer-events-none select-none z-0"
      >
        <Image
          src="./images/mandala.svg"
          alt="Mandala motif"
          fill
          loading="eager"
          className="object-contain animate-[spin_80s_linear_infinite]"
          priority
        />
      </div>

      {/* Background Gopuram Temple Silhouette Layer */}
      <div
        ref={gopuramRef}
        style={{ position: "absolute" }}
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 sm:h-96 opacity-25 pointer-events-none select-none z-1"
      >
        <Image
          src="./images/gopuram-silhouette.svg"
          alt="Temple Gopuram Silhouette"
          fill
          loading="eager"
          className="object-bottom object-contain"
          priority
        />
      </div>

      {/* Decorative Auspicious Corner Kalasam Accents */}
      <div className="absolute top-8 left-6 sm:left-12 text-center pointer-events-none select-none z-10 hidden sm:block">
        <div className="w-12 h-16 relative">
          <Image src="./images/kalasam.svg" alt="Auspicious Kalasam" fill className="object-contain opacity-75" />
        </div>
      </div>
      <div className="absolute top-8 right-6 sm:right-12 text-center pointer-events-none select-none z-10 hidden sm:block">
        <div className="w-12 h-16 relative">
          <Image src="./images/kalasam.svg" alt="Auspicious Kalasam" fill className="object-contain opacity-75" />
        </div>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 w-full max-w-3xl mx-auto text-center">
        <div ref={contentRef} className="flex flex-col items-center">
          
          {/* Save The Date Badge */}
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-[#FFF8E7]/10 border border-[#C9A227]/50 backdrop-blur-md mb-3 shadow-lg">
            <span className="text-[#E8D9A0] text-xs">✦</span>
            <span className="text-xs sm:text-sm font-serif tracking-[0.25em] text-[#E8D9A0] font-bold uppercase">
              SAVE THE DATE
            </span>
            <span className="text-[#E8D9A0] text-xs">✦</span>
          </div>

          {/* Personalized Guest Welcome Banner */}
          {inviteName && (
            <div className="my-2 px-6 py-2 rounded-full bg-gradient-to-r from-[#B0125B]/90 via-[#700938] to-[#B0125B]/90 border border-[#E8D9A0] shadow-[0_0_25px_rgba(201,162,39,0.4)] animate-pulse">
              <span className="text-xs sm:text-sm font-serif tracking-wider text-[#FFF8E7]">
                ✨ Dearest <span className="font-bold text-[#E8D9A0]">{inviteName}</span>, We Warmly Invite You & Family! ✨
              </span>
            </div>
          )}

          {/* Invitation Script Heading */}
          <h2 className="font-script text-4xl sm:text-6xl text-[#E8D9A0] font-normal drop-shadow-[0_2px_15px_rgba(201,162,39,0.4)] mb-2">
            {invitationData.invitation_type}
          </h2>

          <p className="max-w-xl text-xs sm:text-sm md:text-base font-serif italic text-[#FFF8E7]/90 px-4 leading-relaxed font-light mb-3">
            &ldquo;{invitationData.invocation}&rdquo;
          </p>

          <GoldDivider variant="lotus" className="my-2" />

          {/* Royal Temple Card Framing the Couple */}
          <div className="relative my-4 sm:my-5 p-6 sm:p-10 rounded-3xl bg-[#2D051B]/85 border-2 border-[#C9A227] shadow-[0_0_50px_rgba(201,162,39,0.3)] backdrop-blur-md max-w-2xl w-full">
            {/* Ornate Gold Filigree Corner Brackets */}
            <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#E8D9A0]" />
            <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#E8D9A0]" />
            <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#E8D9A0]" />
            <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#E8D9A0]" />

            <div className="flex flex-col md:flex-row items-center justify-center gap-4 sm:gap-8 text-center">
              
              {/* Groom Section - Single Bold Full Name with Degree */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#C9A227] font-semibold mb-1">
                  The Groom
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#FFF8E7] via-[#E8D9A0] to-[#C9A227] drop-shadow-md">
                  {invitationData.groom.name}
                </h1>
                <span className="text-xs sm:text-sm font-serif text-[#E8D9A0] tracking-widest uppercase mt-1.5 font-medium">
                  {invitationData.groom.qualifications}
                </span>
              </div>

              {/* Central Sacred Knot / Heart Medallion */}
              <div className="my-1 sm:my-0 flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-tr from-[#B0125B] to-[#700938] border-2 border-[#E8D9A0] shadow-[0_0_20px_rgba(201,162,39,0.6)]">
                <Heart className="w-5 h-5 fill-rose-200 text-rose-200 animate-pulse" />
              </div>

              {/* Bride Section - Single Bold Full Name with Degree */}
              <div className="flex flex-col items-center">
                <span className="text-[11px] font-serif uppercase tracking-widest text-[#C9A227] font-semibold mb-1">
                  The Bride
                </span>
                <h1 className="font-serif text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-[#C9A227] via-[#E8D9A0] to-[#FFF8E7] drop-shadow-md">
                  {invitationData.bride.name}
                </h1>
                <span className="text-xs sm:text-sm font-serif text-[#E8D9A0] tracking-widest uppercase mt-1.5 font-medium">
                  {invitationData.bride.qualifications}
                </span>
              </div>
            </div>

            <GoldDivider variant="diamond" className="my-4 max-w-sm" />

            {/* Auspicious Muhurtham & Venue Details */}
            <div className="flex flex-col items-center justify-center gap-1.5 text-center">
              <p className="text-base sm:text-lg font-serif font-bold text-[#E8D9A0] tracking-wider">
                {invitationData.save_the_date.day}, {invitationData.save_the_date.date}
              </p>
              <p className="text-xs sm:text-sm font-serif text-[#FFF8E7]/90 font-medium">
                Subha Muhurtham: <span className="text-[#E8D9A0] font-semibold">{invitationData.save_the_date.time.from} to {invitationData.save_the_date.time.to} IST</span>
              </p>
              <div className="mt-1 flex items-center justify-center gap-1.5 text-xs font-serif text-[#E8D9A0]/90">
                <MapPin className="w-3.5 h-3.5 text-[#E8D9A0] shrink-0" />
                <span>{invitationData.venue.name}, {invitationData.venue.location}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-6 flex flex-col items-center justify-center">
          <button
            onClick={scrollToCouple}
            aria-label="Scroll down to invitation"
            className="group flex flex-col items-center gap-1 text-[#E8D9A0] transition-transform duration-300 hover:scale-105 cursor-pointer"
          >
            <span className="text-[11px] font-serif uppercase tracking-widest font-semibold opacity-80 group-hover:opacity-100">
              Scroll to View Invitation
            </span>
            <div className="w-5 h-9 rounded-full border-2 border-[#E8D9A0]/60 flex items-start justify-center p-1 shadow-sm">
              <span className="w-1.5 h-2 rounded-full bg-[#E8D9A0] animate-[bounce_1.5s_infinite]" />
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
