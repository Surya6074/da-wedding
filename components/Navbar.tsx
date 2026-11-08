"use client";

import React, { useState, useEffect } from "react";
import { useMusic } from "./MusicContext";
import { cn } from "@/lib/utils";
import { Heart } from "lucide-react";

const NAV_ITEMS = [
  { label: "Home", href: "#hero" },
  { label: "Couple", href: "#couple" },
  { label: "Countdown", href: "#countdown" },
  { label: "Events", href: "#events" },
  { label: "Gallery", href: "#gallery" },
  { label: "Location", href: "#location" },
];

export const Navbar: React.FC = () => {
  const { isInvitationOpened } = useMusic();
  const [activeSection, setActiveSection] = useState("hero");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);

      // Determine active section
      const sections = NAV_ITEMS.map((item) => item.href.substring(1));
      const scrollPos = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isInvitationOpened) return null;

  const scrollTo = (href: string) => {
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={cn(
        "fixed top-1 left-0 right-0 z-40 transition-all duration-300 px-4 py-2 sm:py-3",
        scrolled ? "backdrop-blur-md" : "backdrop-blur-none"
      )}
    >
      <nav className="max-w-4xl mx-auto flex items-center justify-between px-4 sm:px-6 py-2.5 rounded-full bg-[#FFF8E7]/90 border border-[#C9A227]/40 shadow-lg backdrop-blur-md">
        {/* Monogram Logo */}
        <a
          href="#hero"
          onClick={(e) => {
            e.preventDefault();
            scrollTo("#hero");
          }}
          className="flex items-center gap-2 group cursor-pointer"
        >
          <span className="font-script text-2xl text-[#B0125B] font-bold group-hover:text-[#700938] transition-colors flex items-center gap-1">
            D <Heart className="w-3.5 h-3.5 fill-[#C9A227] text-[#C9A227]" /> A
          </span>
          <span className="hidden md:inline-block text-xs font-serif uppercase tracking-widest text-[#4A0E2E]/70 font-semibold border-l border-[#C9A227]/40 pl-2">
            22 Nov 2026
          </span>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-1 lg:gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.href.substring(1);
            return (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(item.href);
                }}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-serif uppercase tracking-wider font-semibold transition-all duration-200 cursor-pointer",
                  isActive
                    ? "bg-[#B0125B] text-[#FFF8E7] shadow-sm"
                    : "text-[#4A0E2E] hover:text-[#B0125B] hover:bg-[#E8D9A0]/40"
                )}
              >
                {item.label}
              </a>
            );
          })}
        </div>

        {/* Mobile Hamburger Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-1.5 rounded-lg text-[#4A0E2E] hover:bg-[#E8D9A0]/50 transition-colors cursor-pointer"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </nav>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden mt-2 max-w-sm mx-auto p-4 rounded-2xl bg-[#FFF8E7]/98 border border-[#C9A227] shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex flex-col gap-2">
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.href.substring(1);
              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollTo(item.href);
                  }}
                  className={cn(
                    "px-4 py-2.5 rounded-xl text-sm font-serif font-semibold tracking-wider transition-colors",
                    isActive
                      ? "bg-[#B0125B] text-[#FFF8E7]"
                      : "text-[#4A0E2E] hover:bg-[#E8D9A0]/40"
                  )}
                >
                  {item.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
