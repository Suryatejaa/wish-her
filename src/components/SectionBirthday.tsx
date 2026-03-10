"use client";

import { useState } from "react";
import Link from "next/link";
import confetti from "canvas-confetti";
import FadeInSection from "./FadeInSection";

export default function SectionBirthday() {
  const [wishMade, setWishMade] = useState(false);

  const handleConfetti = () => {
    if (wishMade) return;
    
    setWishMade(true);

    const count = 200;
    const defaults = {
      origin: { y: 0.7 },
      colors: ["#fbcfe8", "#bfdbfe", "#f3e8ff", "#ffffff", "#f9a8d4"],
    };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });
  };

  return (
    <section
      id="birthday"
      className="min-h-screen py-16 flex flex-col justify-center items-center relative z-10 w-full"
    >
      <div className="w-[90%] sm:w-full max-w-[400px] flex flex-col items-center gap-6 text-center px-4 sm:px-0">
        <FadeInSection animationClass="bounce-reveal">
          <h1 className="title">Happy Birthday! 🎂</h1>
        </FadeInSection>
        
        <FadeInSection delayClass="delay-1">
          <p>Wishing you all the joy and happiness today.</p>
        </FadeInSection>

        <FadeInSection delayClass="delay-2">
          <p>May your year be as beautiful as you are.</p>
        </FadeInSection>

        <button
          onClick={handleConfetti}
          disabled={wishMade}
          className={`glass-button mt-4 transition-all duration-300 ${
            wishMade ? "opacity-0 absolute pointer-events-none -translate-y-4" : "opacity-100"
          }`}
        >
          Make a Wish ✨
        </button>

        {/* Next button replacing Make a wish after click */}
        <div className={`transition-all duration-1000 ${wishMade ? 'opacity-100 translate-y-0' : 'opacity-0 absolute pointer-events-none translate-y-4'}`}>
          <p className="text-[var(--text-secondary)] italic mb-4">Wish made ✨</p>
          <Link href="/video" className="glass-button text-sm px-6 py-2 inline-block">
            See my gift 🎁
          </Link>
        </div>
      </div>
    </section>
  );
}
