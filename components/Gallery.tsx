"use client";

import React, { useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import invitationData from "@/data/invitation.json";
import { SectionTitle } from "./ui/SectionTitle";
import "yet-another-react-lightbox/styles.css";

// Dynamic import of Lightbox for optimal bundle size
const Lightbox = dynamic(() => import("yet-another-react-lightbox"), {
  ssr: false,
});

export const Gallery: React.FC = () => {
  const [index, setIndex] = useState(-1);
  const galleryItems = invitationData.gallery || [];

  const slides = galleryItems.map((item) => ({
    src: item.src,
    alt: item.alt,
    title: item.caption,
  }));

  return (
    <section
      id="gallery"
      className="relative py-24 px-4 bg-[#FFF8E7] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        <SectionTitle
          subtitle="Cherished Memories"
          title="Moments of Love"
          description="Glimpses of love, divine rituals, laughter, and timeless heritage leading to our wedding day."
        />

        {/* Masonry / Parallax Grid */}
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 space-y-6 my-12">
          {galleryItems.map((item, idx) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: (idx % 3) * 0.1 }}
              className="break-inside-avoid"
            >
              <div
                onClick={() => setIndex(idx)}
                className="group relative rounded-2xl overflow-hidden border border-[#C9A227]/40 shadow-lg cursor-pointer bg-[#FFF8E7] transition-all duration-300 hover:shadow-2xl hover:border-[#C9A227] hover:-translate-y-1"
              >
                <div style={{ position: "relative" }} className="relative w-full aspect-[4/5] overflow-hidden">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                  />
                  {/* Subtle dark gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#2D051B]/80 via-transparent to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
                </div>

                {/* Caption Banner on Hover & Mobile */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-center transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="font-serif text-sm font-semibold text-[#E8D9A0] tracking-wide drop-shadow-md">
                    {item.caption}
                  </p>
                  <span className="text-[10px] uppercase font-serif tracking-widest text-[#FFF8E7]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-1 inline-block">
                    Tap to view
                  </span>
                </div>

                {/* Corner Golden Accent */}
                <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-[#2D051B]/70 border border-[#C9A227]/60 flex items-center justify-center text-[10px] text-[#E8D9A0] opacity-0 group-hover:opacity-100 transition-opacity">
                  ⤢
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Lightbox for Fullscreen Viewer */}
        <Lightbox
          open={index >= 0}
          index={index}
          close={() => setIndex(-1)}
          slides={slides}
        />
      </div>
    </section>
  );
};

export default Gallery;
