"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

interface MusicContextType {
  isPlaying: boolean;
  isInvitationOpened: boolean;
  openInvitation: () => void;
  startMusic: () => void;
  toggleMusic: () => void;
  setIsPlaying: (playing: boolean) => void;
}

const MusicContext = createContext<MusicContextType | null>(null);

export const MusicProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInvitationOpened, setIsInvitationOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [wasPlayingBeforeHidden, setWasPlayingBeforeHidden] = useState(false);

  // Check saved preference on mount
  useEffect(() => {
    const saved = localStorage.getItem("wedding_music_enabled");
    if (saved !== null) {
      // do not auto-start until invitation is opened
    }
  }, []);

  const openInvitation = useCallback(() => {
    setIsInvitationOpened(true);
    setIsPlaying(true);
    localStorage.setItem("wedding_music_enabled", "true");
  }, []);

  const startMusic = useCallback(() => {
    setIsPlaying(true);
    localStorage.setItem("wedding_music_enabled", "true");
  }, []);

  const toggleMusic = useCallback(() => {
    setIsPlaying((prev) => {
      const next = !prev;
      localStorage.setItem("wedding_music_enabled", String(next));
      return next;
    });
  }, []);

  // Handle visibilitychange
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.hidden) {
        if (isPlaying) {
          setWasPlayingBeforeHidden(true);
          setIsPlaying(false);
        }
      } else {
        if (wasPlayingBeforeHidden) {
          setIsPlaying(true);
          setWasPlayingBeforeHidden(false);
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
  }, [isPlaying, wasPlayingBeforeHidden]);

  return (
    <MusicContext.Provider
      value={{
        isPlaying,
        isInvitationOpened,
        openInvitation,
        startMusic,
        toggleMusic,
        setIsPlaying,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
};

export const useMusic = () => {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error("useMusic must be used within a MusicProvider");
  }
  return context;
};
