"use client";

import { useState } from "react";
import Link from "next/link";
import FadeInSection from "./FadeInSection";

export default function SectionVideo() {
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
      <div className="w-[90%] sm:w-full max-w-[400px] flex flex-col items-center gap-6 text-center px-4 sm:px-0">
        <div className="w-full rounded-3xl overflow-hidden p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] glass">
          <video
            className="w-full aspect-[16/9] rounded-2xl object-cover bg-black block"
            controls
            playsInline
          >
            <source
              src="https://res.cloudinary.com/dnff39o2f/video/upload/v1773047299/IMG_0174_jyar0t.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
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
