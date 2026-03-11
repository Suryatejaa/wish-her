"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import FadeInSection from "./FadeInSection";

export default function SectionVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isBlocked, setIsBlocked] = useState(false);

  const attemptPlay = () => {
    if (videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsBlocked(false);
          })
          .catch((error) => {
            console.log("Autoplay prevented:", error);
            setIsBlocked(true);
          });
      }
    }
  };

  useEffect(() => {
    attemptPlay();
  }, []);

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play();
      setIsBlocked(false);
    }
  };

  return (
    <section
      id="video-message"
      className="min-h-screen py-16 flex flex-col justify-center items-center relative z-10 w-full"
    >
      <FadeInSection>
        <div className="transition-all duration-700">
          <>
            <h1 className="text-xl title">There is something special for you!!</h1>
            <p className="text-[var(--text-secondary)] italic mt-2 text-sm">
              I can't wait you to see this..
            </p>
          </>
        </div>
      </FadeInSection>
      <div className="w-[90%] sm:w-full max-w-[400px] flex flex-col items-center gap-6 text-center px-4 sm:px-0 mt-8">
        <div className="w-full rounded-3xl overflow-hidden p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] glass relative group">
          <video
            ref={videoRef}
            className="w-full aspect-[16/9] rounded-2xl object-cover bg-black block"
            autoPlay  
            playsInline
            loop
          >
            <source
              src="https://res.cloudinary.com/dnff39o2f/video/upload/v1773047299/IMG_0174_jyar0t.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>

          {/* Autoplay Blocked Overlay */}
          {isBlocked && (
            <div 
              onClick={handleManualPlay}
              className="absolute inset-2 z-20 rounded-2xl bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/50"
            >
              <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <p className="text-white text-sm font-medium tracking-wide drop-shadow-md">Tap to Play with Sound ✨</p>
            </div>
          )}
        </div>

        {/* Continue Button to navigate to the Proposal page */}
        <FadeInSection>
          <div className="mt-8">
            <Link href="/proposal">
              <button className="glass-button text-sm px-8 py-3 bg-white/60">
                One last thing...
              </button>
            </Link>
          </div>
        </FadeInSection>
      </div>
    </section>
  );
}
