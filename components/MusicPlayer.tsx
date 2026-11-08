"use client";

import React, { useEffect, useRef, useState } from "react";
import { useMusic } from "./MusicContext";
import invitationData from "@/data/invitation.json";

declare global {
  interface Window {
    onYouTubeIframeAPIReady?: () => void;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    YT: any;
  }
}

export const MusicPlayer: React.FC = () => {
  const { isPlaying, toggleMusic, isInvitationOpened } = useMusic();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playerRef = useRef<any>(null);
  const audioFallbackRef = useRef<HTMLAudioElement | null>(null);
  const [useFallback, setUseFallback] = useState(false);
  const [playerReady, setPlayerReady] = useState(false);

  const videoId = invitationData.music?.youtube_id || "zzpXEsxxjjo";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
  const rawAudioSrc = invitationData.music?.fallback_audio || "./audio/bg-music.mp3";
  const normalizedAudioSrc = rawAudioSrc.startsWith("./")
    ? rawAudioSrc.replace(/^\./, "")
    : rawAudioSrc;
  const fallbackAudioSrc = normalizedAudioSrc.startsWith("http")
    ? normalizedAudioSrc
    : `${basePath}${normalizedAudioSrc}`;

  // Keep a stable ref for playback state across callbacks
  const isPlayingRef = useRef(isPlaying);
  useEffect(() => {
    isPlayingRef.current = isPlaying;
  }, [isPlaying]);

  const isOpenedRef = useRef(isInvitationOpened);
  useEffect(() => {
    isOpenedRef.current = isInvitationOpened;
  }, [isInvitationOpened]);

  // Load YouTube IFrame API script and initialize player once
  useEffect(() => {
    if (typeof window === "undefined") return;

    let isMounted = true;

    const initPlayer = () => {
      try {
        if (!isMounted) return;
        if (!window.YT || !window.YT.Player) {
          setTimeout(initPlayer, 250);
          return;
        }

        const container = document.getElementById("youtube-player-frame");
        if (!container) {
          setTimeout(initPlayer, 250);
          return;
        }

        playerRef.current = new window.YT.Player("youtube-player-frame", {
          height: "1",
          width: "1",
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            controls: 0,
            disablekb: 1,
            fs: 0,
            loop: 1,
            playlist: videoId,
            modestbranding: 1,
            playsinline: 1,
            rel: 0,
          },
          events: {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onReady: (event: any) => {
              if (!isMounted) return;
              try {
                if (typeof event.target?.setVolume === "function") {
                  event.target.setVolume(40);
                }
              } catch {}
              setPlayerReady(true);

              // If music playback has been initiated, start playing immediately once player is ready
              if (isPlayingRef.current) {
                try {
                  if (typeof event.target?.playVideo === "function") {
                    event.target.playVideo();
                  }
                } catch {}
              }
            },
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onStateChange: (event: any) => {
              // When video ends (0), seek to beginning and loop
              if (event.data === 0 && isPlayingRef.current) {
                try {
                  if (typeof playerRef.current?.seekTo === "function") {
                    playerRef.current.seekTo(0);
                  }
                  if (typeof playerRef.current?.playVideo === "function") {
                    playerRef.current.playVideo();
                  }
                } catch {}
              }
            },
            onError: () => {
              console.warn("YouTube player unavailable, switching to local audio fallback.");
              if (isMounted) setUseFallback(true);
            },
          },
        });
      } catch (err) {
        console.warn("Error initializing YouTube IFrame player:", err);
        if (isMounted) setUseFallback(true);
      }
    };

    if (!window.YT) {
      const tag = document.createElement("script");
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName("script")[0];
      firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
    }

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
    }

    return () => {
      isMounted = false;
      if (playerRef.current && typeof playerRef.current.destroy === "function") {
        try {
          playerRef.current.destroy();
        } catch {}
      }
    };
  }, [videoId]);

  // Synchronize playback state when user toggles or opens invite
  useEffect(() => {
    // Only return early if music is not playing and invitation has not been opened yet (initial splash)
    if (!isPlaying && !isInvitationOpened) return;

    if (useFallback) {
      if (audioFallbackRef.current) {
        if (isPlaying) {
          audioFallbackRef.current.volume = 0.4;
          audioFallbackRef.current.play().catch((err) => {
            console.log("Audio autoplay prevented:", err);
          });
        } else {
          audioFallbackRef.current.pause();
        }
      }
      return;
    }

    if (playerReady && playerRef.current) {
      try {
        if (isPlaying && typeof playerRef.current.playVideo === "function") {
          playerRef.current.playVideo();
        } else if (!isPlaying && typeof playerRef.current.pauseVideo === "function") {
          playerRef.current.pauseVideo();
        }
      } catch (e) {
        console.warn("Error controlling YouTube playback:", e);
      }
    }
  }, [isPlaying, playerReady, useFallback, isInvitationOpened]);

  return (
    <>
      {/* Hidden YouTube Player IFrame - MUST ALWAYS EXIST IN DOM */}
      <div
        className="fixed -top-96 -left-96 w-1 h-1 overflow-hidden pointer-events-none opacity-0"
        aria-hidden="true"
      >
        <div id="youtube-player-frame" />
      </div>

      {/* Fallback HTML5 Audio element */}
      <audio
        ref={audioFallbackRef}
        src={fallbackAudioSrc}
        loop
        preload="auto"
        className="hidden"
      />

      {/* Floating Music Control Button - Only visible once invitation is opened */}
      {isInvitationOpened && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={toggleMusic}
            aria-label={isPlaying ? "Mute Background Music" : "Play Background Music"}
            title={isPlaying ? "Mute Background Music" : "Play Background Music"}
            className="group relative flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-[#2D051B]/90 hover:bg-[#4A0E2E] text-[#FFF8E7] border border-[#C9A227] shadow-[0_4px_20px_rgba(201,162,39,0.35)] backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
          >
            {/* Animated Equalizer Bars */}
            <div className="flex items-end gap-1 h-4 w-4">
              <span
                className={`w-1 bg-[#E8D9A0] rounded-full transition-all duration-300 ${
                  isPlaying ? "h-4 animate-[bounce_0.8s_ease-in-out_infinite]" : "h-1.5 opacity-50"
                }`}
              />
              <span
                className={`w-1 bg-[#C9A227] rounded-full transition-all duration-300 ${
                  isPlaying ? "h-3 animate-[bounce_1.1s_ease-in-out_infinite]" : "h-2.5 opacity-50"
                }`}
              />
              <span
                className={`w-1 bg-[#E8D9A0] rounded-full transition-all duration-300 ${
                  isPlaying ? "h-4 animate-[bounce_0.6s_ease-in-out_infinite]" : "h-1 opacity-50"
                }`}
              />
            </div>

            <span className="text-xs font-serif tracking-wider font-semibold text-[#E8D9A0] select-none">
              {isPlaying ? "Mangala Isai" : "Muted"}
            </span>

            {/* Pulse ring when playing */}
            {isPlaying && (
              <span className="absolute -inset-1 rounded-full border border-[#C9A227]/40 animate-ping pointer-events-none" />
            )}
          </button>
        </div>
      )}
    </>
  );
};

export default MusicPlayer;
