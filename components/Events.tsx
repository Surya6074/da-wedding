"use client";

import React from "react";
import { motion } from "framer-motion";
import invitationData from "@/data/invitation.json";
import { SectionTitle } from "./ui/SectionTitle";
import { GlassCard } from "./ui/GlassCard";
import { GoldDivider } from "./ui/GoldDivider";
import { generateGoogleCalendarUrl } from "@/lib/calendar";
import { Calendar, Clock, MapPin, CalendarPlus, Sparkles } from "lucide-react";

export const Events: React.FC = () => {
  const events = invitationData.events || [];

  return (
    <section
      id="events"
      className="relative py-24 px-4 bg-gradient-to-b from-[#FFF8E7] via-[#FDF5DE] to-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-4xl mx-auto relative z-10">
        <SectionTitle
          subtitle="Celebrations & Rituals"
          title="Wedding Events"
          description="Join us in every sacred moment, from the divine Muhurtham vows to joyful celebratory feasts."
        />

        {/* Timeline Container */}
        <div className="relative mt-12">
          {/* Vertical Golden Connecting Line */}
          <div className="hidden sm:block absolute left-1/2 top-4 bottom-4 -translate-x-1/2 w-0.5 bg-gradient-to-b from-[#C9A227] via-[#B0125B] to-[#C9A227] opacity-40 pointer-events-none" />

          <div className="space-y-10 sm:space-y-12">
            {events.map((event, index) => {
              const isEven = index % 2 === 0;
              const isMainEvent = event.id === "muhurtham";

              const handleCalendarClick = () => {
                const url = generateGoogleCalendarUrl({
                  title: `${event.title} - ${invitationData.groom.name} & ${invitationData.bride.name}`,
                  description: `${event.description}\nVenue: ${event.venue}, ${event.location}`,
                  location: `${event.venue}, ${event.location}`,
                  startTime: invitationData.iso_datetime,
                  endTime: invitationData.iso_end_datetime,
                });
                window.open(url, "_blank", "noopener,noreferrer");
              };

              return (
                <motion.div
                  key={event.id || index}
                  initial={{ opacity: 0, y: 35 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className={`relative flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-0 ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Timeline Node Icon (Center) */}
                  <div className="hidden sm:flex absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#FFF8E7] border-2 border-[#C9A227] shadow-lg items-center justify-center text-[#B0125B] font-serif font-bold text-sm z-20">
                    {index + 1}
                  </div>

                  {/* Empty Spacer Column for opposite side on desktop */}
                  <div className="hidden sm:block sm:w-[calc(50%-2rem)]" />

                  {/* Event Details Card */}
                  <div className="w-full sm:w-[calc(50%-2rem)]">
                    <GlassCard
                      ornateCorners
                      glow={isMainEvent}
                      className={`relative p-6 sm:p-7 overflow-hidden ${
                        isMainEvent
                          ? "border-2 border-[#C9A227] bg-[#FFF8E7]/95"
                          : "border border-[#C9A227]/40"
                      }`}
                    >
                      {/* Save The Date Ribbon for Muhurtham */}
                      {isMainEvent && (
                        <div className="absolute top-0 right-0">
                          <div className="inline-flex items-center gap-1 bg-gradient-to-r from-[#B0125B] to-[#700938] text-[#FFF8E7] text-[10px] uppercase font-serif tracking-widest font-bold py-1 px-3.5 rounded-bl-xl shadow-md border-b border-l border-[#E8D9A0]/60">
                            <Sparkles className="w-3 h-3 text-[#E8D9A0]" />
                            <span>Primary Ceremony</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center gap-2 text-xs font-serif uppercase tracking-widest text-[#B0125B] font-bold">
                        <span>✦</span>
                        <span>{event.sub_title}</span>
                      </div>

                      <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#4A0E2E] mt-1.5">
                        {event.title}
                      </h3>

                      <GoldDivider variant="simple" className="my-3 mx-0" />

                      {/* Date & Time */}
                      <div className="space-y-2.5 text-sm font-serif text-[#4A0E2E]/90">
                        <div className="flex items-center gap-2.5">
                          <Calendar className="w-4 h-4 text-[#B0125B] shrink-0" />
                          <span className="font-semibold">{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2.5">
                          <Clock className="w-4 h-4 text-[#B0125B] shrink-0" />
                          <span className="font-semibold text-[#B0125B]">{event.time}</span>
                        </div>
                        <div className="flex items-start gap-2.5">
                          <MapPin className="w-4 h-4 text-[#B0125B] shrink-0 mt-0.5" />
                          <div>
                            <span className="font-bold text-[#4A0E2E]">{event.venue}</span>
                            <span className="block text-xs text-[#4A0E2E]/70">{event.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Description */}
                      <p className="mt-3 text-xs sm:text-sm font-serif italic text-[#4A0E2E]/80 leading-relaxed border-t border-[#C9A227]/20 pt-3">
                        {event.description}
                      </p>

                      {/* Dress Code & Action */}
                      <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 border-t border-[#C9A227]/20">
                        {event.dress_code && (
                          <div className="text-[11px] font-serif text-[#C9A227] font-semibold">
                            Dress code: <span className="text-[#4A0E2E] font-normal">{event.dress_code}</span>
                          </div>
                        )}

                        <button
                          onClick={handleCalendarClick}
                          className="text-xs font-serif font-semibold text-[#B0125B] hover:text-[#700938] inline-flex items-center gap-1.5 hover:underline cursor-pointer ml-auto"
                        >
                          <CalendarPlus className="w-3.5 h-3.5" />
                          <span>Add to Calendar</span>
                        </button>
                      </div>
                    </GlassCard>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Events;
