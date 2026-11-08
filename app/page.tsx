"use client";

import React from "react";
import dynamic from "next/dynamic";
import { SplashScreen } from "@/components/SplashScreen";
import { Hero } from "@/components/Hero";
import { Countdown } from "@/components/Countdown";
import { CoupleSection } from "@/components/CoupleSection";
import { Events } from "@/components/Events";
import { LocationMap } from "@/components/LocationMap";
import { Footer } from "@/components/Footer";
import { MusicPlayer } from "@/components/MusicPlayer";
import { ScrollProgress } from "@/components/ScrollProgress";

// Lightweight dynamic import for canvas petals to optimize initial render
const Petals = dynamic(() => import("@/components/Petals"), {
  ssr: false,
});

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#FFF8E7] text-[#4A0E2E] overflow-x-hidden selection:bg-[#B0125B] selection:text-[#FFF8E7]">
      {/* Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Tap to Open Splash Screen with Music Autoplay Trigger */}
      <SplashScreen />

      {/* Hero Section with Auspicious Temple Parallax */}
      <Hero />

      {/* Live Countdown & Calendar Integration */}
      <Countdown />

      {/* Groom & Bride Details */}
      <CoupleSection />

      {/* Auspicious Muhurtham & Events Timeline */}
      <Events />

      {/* Venue, Route & Map Directions */}
      <LocationMap />

      {/* Traditional Auspicious Footer */}
      <Footer />

      {/* Floating Background Music Controller (Equalizer button) */}
      <MusicPlayer />

      {/* Falling Jasmine & Rose Petals Particle System */}
      <Petals />
    </main>
  );
}
