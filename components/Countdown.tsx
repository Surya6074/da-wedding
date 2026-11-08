"use client";

import React, { useState, useEffect } from "react";
import invitationData from "@/data/invitation.json";
import { GlassCard } from "./ui/GlassCard";
import { SectionTitle } from "./ui/SectionTitle";
import { generateGoogleCalendarUrl, downloadIcsFile } from "@/lib/calendar";
import { Calendar, CalendarCheck, Sparkles } from "lucide-react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

const subscribe = () => () => {};

export const Countdown: React.FC = () => {
  const mounted = React.useSyncExternalStore(
    subscribe,
    () => true,
    () => false
  );
  const targetDate = new Date(invitationData.iso_datetime).getTime();

  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isPast: false,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isPast: true,
        });
        return;
      }

      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
        isPast: false,
      });
    };

    calculateTimeLeft();
    const interval = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(interval);
  }, [targetDate]);

  const calendarEvent = {
    title: `Wedding of ${invitationData.groom.name} & ${invitationData.bride.name}`,
    description: `${invitationData.invitation_message}\nVenue: ${invitationData.venue.name}, ${invitationData.venue.full_address}`,
    location: `${invitationData.venue.name}, ${invitationData.venue.full_address}`,
    startTime: invitationData.iso_datetime,
    endTime: invitationData.iso_end_datetime,
  };

  const handleGoogleCalendar = () => {
    const url = generateGoogleCalendarUrl(calendarEvent);
    window.open(url, "_blank", "noopener,noreferrer");
  };

  const handleDownloadIcs = () => {
    downloadIcsFile(calendarEvent);
  };

  return (
    <section
      id="countdown"
      className="relative z-20 py-20 pb-24 px-4 bg-gradient-to-b from-[#FFF8E7] via-[#FFF3D6] to-[#FFF8E7]"
    >
      <div className="max-w-4xl mx-auto relative z-10 text-center">
        <SectionTitle
          subtitle="Counting the Moments"
          title="Save Our Auspicious Date"
          description="Every ticking second brings us closer to the sacred vows of love, blessings, and togetherness."
        />

        {mounted ? (
          timeLeft.isPast ? (
            <GlassCard className="max-w-md mx-auto p-8 my-6 text-center" ornateCorners>
              <Sparkles className="w-8 h-8 text-[#B0125B] mx-auto mb-2 animate-pulse" />
              <h3 className="font-serif text-2xl font-bold text-[#4A0E2E]">
                Today is the Sacred Day!
              </h3>
              <p className="font-serif text-sm text-[#4A0E2E]/80 mt-2">
                May the divine grace forever shower upon the newly wedded couple.
              </p>
            </GlassCard>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto my-8">
              {[
                { label: "Days", value: timeLeft.days },
                { label: "Hours", value: timeLeft.hours },
                { label: "Minutes", value: timeLeft.minutes },
                { label: "Seconds", value: timeLeft.seconds },
              ].map((item, idx) => (
                <GlassCard
                  key={idx}
                  ornateCorners
                  glow
                  className="p-5 sm:p-6 text-center transition-transform hover:-translate-y-1.5 duration-300"
                >
                  <div className="text-3xl sm:text-5xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-b from-[#B0125B] to-[#700938] tracking-tight">
                    {String(item.value).padStart(2, "0")}
                  </div>
                  <div className="text-xs sm:text-sm font-serif font-semibold tracking-widest uppercase text-[#C9A227] mt-2">
                    {item.label}
                  </div>
                </GlassCard>
              ))}
            </div>
          )
        ) : (
          /* Placeholder skeleton to prevent SSR hydration flicker */
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto my-8">
            {["Days", "Hours", "Minutes", "Seconds"].map((label, idx) => (
              <div
                key={idx}
                className="h-28 rounded-2xl bg-[#E8D9A0]/20 animate-pulse border border-[#C9A227]/30 flex flex-col items-center justify-center"
              >
                <div className="w-12 h-8 bg-[#C9A227]/20 rounded mb-2" />
                <span className="text-xs uppercase font-serif text-[#C9A227]">{label}</span>
              </div>
            ))}
          </div>
        )}

        {/* Calendar Action Buttons - Side by Side with Zero Overlap or Clipping */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5 max-w-md mx-auto">
          <button
            onClick={handleGoogleCalendar}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-[#B0125B] to-[#700938] text-[#FFF8E7] font-serif text-xs uppercase tracking-wider font-semibold border border-[#E8D9A0] shadow-[0_4px_20px_rgba(176,18,91,0.3)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <Calendar className="w-4 h-4 text-[#E8D9A0]" />
            <span>Add to Google Calendar</span>
          </button>

          <button
            onClick={handleDownloadIcs}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-[#FFF8E7] text-[#4A0E2E] font-serif text-xs uppercase tracking-wider font-semibold border border-[#C9A227] shadow-sm hover:bg-[#E8D9A0]/30 active:scale-95 transition-all cursor-pointer"
          >
            <CalendarCheck className="w-4 h-4 text-[#4A0E2E]" />
            <span>Download .ics (Apple / Outlook)</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Countdown;
