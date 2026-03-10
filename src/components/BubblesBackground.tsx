"use client";

import { useEffect, useState } from "react";

interface Bubble {
  id: number;
  size: number;
  left: number;
  animDuration: number;
  animDelay: number;
}

export default function BubblesBackground() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    // Generate bubbles only on the client
    const bubbleCount = 15;
    const generatedBubbles: Bubble[] = [];

    for (let i = 0; i < bubbleCount; i++) {
      generatedBubbles.push({
        id: i,
        // 10px to 50px
        size: Math.random() * 40 + 10,
        // 0% to 100%
        left: Math.random() * 100,
        // 10s to 20s
        animDuration: Math.random() * 10 + 10,
        // 0s to 10s
        animDelay: Math.random() * 10,
      });
    }

    setBubbles(generatedBubbles);
  }, []);

  return (
    <div id="bubbles-container" className="fixed inset-0 z-[1] pointer-events-none overflow-hidden">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="absolute -bottom-[60px] rounded-full"
          style={{
            width: `${bubble.size}px`,
            height: `${bubble.size}px`,
            left: `${bubble.left}vw`,
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(255,255,255,0.1))",
            boxShadow: "0 0 10px rgba(255,255,255,0.2), inset 0 0 10px rgba(255,255,255,0.5)",
            animation: `floatBubble ${bubble.animDuration}s ${bubble.animDelay}s infinite linear`,
          }}
        />
      ))}
    </div>
  );
}
