"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import quizData from "@/data/quiz.json";

export default function SectionQuiz() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const currentX = e.touches[0].clientX;
    const diff = touchStartX - currentX;
    
    if (Math.abs(diff) > 50) { // 50px swipe threshold
      if (diff > 0 && activeIndex < quizData.length - 1) {
        // Swipe left -> next
        setActiveIndex((prev) => prev + 1);
        setTouchStartX(null);
      } else if (diff < 0 && activeIndex > 0) {
        // Swipe right -> prev
        setActiveIndex((prev) => prev - 1);
        setTouchStartX(null);
      }
    }
  };

  const handleTouchEnd = () => {
    setTouchStartX(null);
  };

  const handleOptionClick = () => {
    if (activeIndex < quizData.length - 1) {
      setActiveIndex((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  return (
    <section
      id="quiz-carousel"
      className="min-h-screen py-16 w-full flex flex-col justify-center items-center relative z-10 overflow-hidden"
    >
      {/* Liquid Flow Blurry Background that transitions slowly */}
      <div 
        className="absolute inset-0 -z-10 transition-opacity duration-1000 ease-in-out"
        style={{
          background: "radial-gradient(circle at 50% 50%, rgba(253,242,248,0.8) 0%, rgba(243,232,255,0.4) 100%)",
          filter: "blur(40px)",
        }}
      />

      <div 
        className="w-full relative h-[500px] flex items-center justify-center overflow-visible"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {quizData.map((item, index) => {
          // Calculate the offset from the active index
          const offset = index - activeIndex;

          // Compute styles based on offset for a 3D carousel effect
          const isActive = offset === 0;
          const isVisible = Math.abs(offset) <= 1; // Only render immediate neighbors
          
          if (!isVisible) return null;

          const translateX = offset * 95; // % - Slightly overlapping the edge to be visible
          const scale = isActive ? 1.05 : 0.85;
          const opacity = isActive ? 1 : 0.4;
          const zIndex = isActive ? 20 : 10;
          const blur = isActive ? 0 : 4; // Blur neighbors for depth

          return (
            <div
              key={item.id}
              className={`absolute p-8 transition-all duration-700 ease-[cubic-bezier(0.25,1,0.5,1)] w-[85%] max-w-[320px] rounded-3xl p-8 shadow-xl flex flex-col items-center gap-6 ${
                isActive ? "glass bg-white/40" : "bg-white/20"
              }`}
              style={{
                transform: `translateX(${translateX}%) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                filter: `blur(${blur}px)`,
              }}
            >
              {/* Image Container */}
              <div className="w-full relative rounded-2xl overflow-hidden shadow-sm" style={{ paddingBottom: '55%' }}>
                 <img
                    src={item.image}
                    alt={item.question}
                    className="absolute inset-0 object-cover w-full h-full"
                 />
              </div>

              {/* Question Text */}
              <h3 className="text-xl font-medium text-center text-[var(--text-primary)] leading-tight h-16 flex items-center justify-center px-1">
                {item.question}
              </h3>

              {/* Options */}
              <div className="w-full flex justify-center gap-4  pb-6 rounded-b-3xl">
                {item.options.map((opt, i) => (
                  <button
                    key={i}
                    onClick={() => {
                        if (isActive) handleOptionClick();
                    }}
                    disabled={!isActive}
                    className=" text-lg rounded-full border-2 border-gray-300 text-[var(--text-primary)] transition-all active:scale-95 flex-1 max-w-[140px]"
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Link revealed after the quiz */}
      <div 
        className={`mt-6 transition-all duration-1000 flex flex-col items-center ${
          isFinished ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8 pointer-events-none"
        }`}
      >
        <p className="italic text-[var(--text-secondary)] mb-6">Perfect score. ✨</p>
        <Link href="/birthday">
          <button className="glass-button text-sm px-8 py-3 bg-white/60">
            Open your next surprise
          </button>
        </Link>
      </div>
    </section>
  );
}
