"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import FadeInSection from "./FadeInSection";

export default function SectionOpening() {
  const [showScrollIcon, setShowScrollIcon] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowScrollIcon(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="opening"
      className="min-h-screen py-16 flex flex-col justify-center items-center relative z-10 w-full"
    >
      <div className="w-full max-w-[400px] flex flex-col items-center gap-8 px-4 sm:px-0">
        <FadeInSection className="w-full">
          <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl glass p-2">
            <Image
              src="/images/hands.avif"
              alt="Hero"
              fill
              className="object-cover rounded-2xl"
              priority
            />
          </div>
        </FadeInSection>

        <FadeInSection className="text-2xl font-bold text-center leading-relaxed">
          Hey honey, <br/> I wanted to tell you something from my heart...
        </FadeInSection>

        {/* Soft glowing orb acting as a natural prompt */}
        <div className="w-[120px] h-[120px] rounded-full blur-[20px] opacity-60 absolute -z-10 animate-[slowPulse_4s_ease-in-out_infinite] bg-[radial-gradient(circle,var(--deep-lavender)_0%,transparent_70%)]" />

        {/* Scroll down arrow (animated) linked to next page */}
        <Link href="/love-expression" className="absolute bottom-8">
          <div
            className={`transition-opacity duration-1000 animate-[blinkScroll_2s_infinite] ${
              showScrollIcon ? "opacity-100" : "opacity-0"
            }`}
          >
            <svg
              viewBox="0 0 24 24"
              width="24"
              height="24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              className="stroke-[var(--deep-pink)]"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
