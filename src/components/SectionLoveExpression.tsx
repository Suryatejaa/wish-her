"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import FadeInSection from "./FadeInSection";

export default function SectionLoveExpression() {
  const [flippedCards, setFlippedCards] = useState<{ [key: number]: boolean }>({
    1: false,
    2: false,
  });

  const [holdSuccess, setHoldSuccess] = useState(false);
  const [isHolding, setIsHolding] = useState(false);
  const holdTimerRef = useRef<NodeJS.Timeout | null>(null);

  const toggleFlip = (id: number) => {
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const startHold = (e: React.TouchEvent | React.MouseEvent) => {
    if (holdSuccess) return;

    // Prevent action if multiple fingers used
    if ("touches" in e && e.touches.length > 1) return;

    setIsHolding(true);

    holdTimerRef.current = setTimeout(() => {
      setHoldSuccess(true);
      setIsHolding(false);

      if (typeof navigator !== "undefined" && navigator.vibrate) {
        navigator.vibrate(50);
      }
    }, 10); // 1.2 seconds 
  };

  const cancelHold = () => {
    if (holdSuccess) return;
    setIsHolding(false);
    if (holdTimerRef.current) {
      clearTimeout(holdTimerRef.current);
      holdTimerRef.current = null;
    }
  };

  return (
    <section
      id="love-expression"
      className="min-h-screen py-16 flex flex-col justify-center items-center relative z-10 w-full"
    >
      <div className="w-full flex flex-col items-center gap-8 px-4 sm:px-0">
        <FadeInSection className="text-xl font-medium text-[var(--text-secondary)]">
          <h3>Just a few small things...</h3>
        </FadeInSection>

        <div className="w-[90%] sm:w-full max-w-[400px] flex flex-col gap-6">
          {/* Card 1 */}
          <div
            className={`interactive-card glass ${
              flippedCards[1] ? "scale-105" : ""
            } w-full h-10 p-8 rounded-3xl text-center cursor-pointer relative overflow-hidden transition-transform duration-400`}
            onClick={() => toggleFlip(1)}
            style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"}}
          >
            <span
              className={`text-[1.1rem] font-medium text-[var(--text-secondary)] transition-opacity duration-300 ${
                flippedCards[1] ? "opacity-0" : "opacity-100"
              }`}
            >
              Tap to Reveal
            </span>
            <div
              className={`absolute inset-0 flex items-center justify-center text-xl font-normal text-[var(--text-primary)] transition-opacity duration-400 p-8 ${
                flippedCards[1] ? "opacity-100" : "opacity-0"
              }`}
            >
              You light up my bad days ✨
            </div>
          </div>

          {/* Card 2 */}
          <div
            className={`interactive-card glass ${
              flippedCards[2] ? "scale-105" : ""
            } w-full h-10 p-8 rounded-3xl align-center justify-center text-center cursor-pointer relative overflow-hidden transition-transform duration-400`}
            onClick={() => toggleFlip(2)}
            style={{ transitionTimingFunction: "cubic-bezier(0.175, 0.885, 0.32, 1.275)"}}
          >
            <span
              className={`text-[1.1rem] font-medium text-[var(--text-secondary)] transition-opacity duration-300 ${
                flippedCards[2] ? "opacity-0" : "opacity-100"
              }`}
            >
              Tap again...
            </span>
            <div
              className={`absolute inset-0 flex items-center justify-center text-xl font-normal text-[var(--text-primary)] transition-opacity duration-400 p-8 ${
                flippedCards[2] ? "opacity-100" : "opacity-0"
              }`}
            >
              You're my safe space 💖
            </div>
          </div>

          {/* Press and Hold Card */}
          <div className="w-full h-20 p-6 rounded-3xl relative overflow-hidden glass">
            <p
              className={`text-center text-[var(--deep-pink)] text-sm mb-4 transition-opacity duration-500 ${
                holdSuccess ? "opacity-0" : "opacity-90"
              }`}
            >
              Press and hold ✨
            </p>
            <div
              className={`p-6 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] text-center transition-all duration-300 cursor-pointer select-none ${
                isHolding
                  ? "scale-95 bg-[#fafaf9]"
                  : holdSuccess
                  ? "scale-105 bg-[var(--primary-light-pink)]"
                  : "bg-white"
              }`}
              style={{
                WebkitUserSelect: "none",
                WebkitTouchCallout: "none",
                WebkitTapHighlightColor: "transparent",
              }}
              onContextMenu={(e) => e.preventDefault()}
              onTouchStart={startHold}
              onTouchEnd={cancelHold}
              onTouchCancel={cancelHold}
              onTouchMove={cancelHold}
              onMouseDown={startHold}
              onMouseUp={cancelHold}
              onMouseLeave={cancelHold}
            >
              <p className="text-lg h-20 align-center flex text-center justify-center m-8 p-8">
                {holdSuccess
                  ? "I am so incredibly proud of you."
                  : "You mean the world to me."}
              </p>
            </div>
            
          </div>
            {/* Show continue button only after hold success */}
            <div className={`mt-8 flex p-8 justify-center transition-all duration-1000 ${holdSuccess ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`}>
               <Link href="/quiz">
                 <button className="glass-button text-sm px-6 py-2">Continue ✨</button>
               </Link>
            </div>
        </div>
      </div>
    </section>
  );
}
