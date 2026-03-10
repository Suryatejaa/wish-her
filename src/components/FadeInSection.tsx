"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
  delayClass?: string;
  animationClass?: "fade-text" | "bounce-reveal";
}

export default function FadeInSection({
  children,
  className = "",
  delayClass = "",
  animationClass = "fade-text",
}: Props) {
  const [isVisible, setVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only set up observer if supported
    if (!("IntersectionObserver" in window)) {
      setVisible(true);
      return;
    }

    const currentRef = domRef.current;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            // Optionally unobserve if you only want it to fade in once:
            // if (currentRef) observer.unobserve(currentRef);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <div
      ref={domRef}
      className={`${animationClass} ${delayClass} ${
        isVisible ? "visible" : ""
      } ${className}`}
    >
      {children}
    </div>
  );
}
