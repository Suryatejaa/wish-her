"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const MUTED_ROUTES = ["/video", "/proposal"];

export default function AudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const pathname = usePathname();
  const shouldMute = MUTED_ROUTES.includes(pathname);

  // Create audio element once on mount
  useEffect(() => {
    const audio = new Audio("/music/remo-bgm.mp3");
    audio.loop = true;
    audio.volume = 1;
    audioRef.current = audio;

    // Try autoplay immediately (works if user already interacted before)
    const tryPlay = () => {
      audio.play().catch(() => {
        // Autoplay blocked — wait for first interaction
      });
    };

    tryPlay();

    // Attach listener for first user interaction as fallback
    const onInteraction = () => {
      audio.play().catch(() => {});
    };

    document.addEventListener("touchstart", onInteraction, { once: true });
    document.addEventListener("click", onInteraction, { once: true });
    document.addEventListener("keydown", onInteraction, { once: true });

    return () => {
      audio.pause();
      document.removeEventListener("touchstart", onInteraction);
      document.removeEventListener("click", onInteraction);
      document.removeEventListener("keydown", onInteraction);
    };
  }, []);

  // Fade volume smoothly when route changes to/from a muted route
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const targetVolume = shouldMute ? 0 : 1;
    let current = audio.volume;
    const step = shouldMute ? -0.05 : 0.05;

    const interval = setInterval(() => {
      current = Math.round(Math.max(0, Math.min(1, current + step)) * 100) / 100;
      audio.volume = current;
      if (current === targetVolume) clearInterval(interval);
    }, 50);

    return () => clearInterval(interval);
  }, [shouldMute]);

  return null; // No DOM output needed
}
