"use client";

import { useState, useEffect, useRef } from "react";
import FadeInSection from "./FadeInSection";

export default function SectionProposal() {
  const [stage, setStage] = useState(0); // 0: Initial, 1: First Rejection, 2: Final Persuasion
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [finalResult, setFinalResult] = useState<"YES" | "NO" | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isBlocked, setIsBlocked] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const successVideoRef = useRef<HTMLVideoElement>(null);
  
  // Formspree endpoint — confirmed working
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/mnnwnrgn";

  const attemptPlay = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (ref.current) {
      const playPromise = ref.current.play();
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

  // Force play on stage change
  useEffect(() => {
    if (!submitted) {
      attemptPlay(videoRef);
    } else if (finalResult === "YES") {
      attemptPlay(successVideoRef);
    }
  }, [stage, submitted, finalResult]);

  const handleManualPlay = (ref: React.RefObject<HTMLVideoElement | null>) => {
    if (ref.current) {
      ref.current.play();
      setIsBlocked(false);
    }
  };

  const sendEmailNotification = async (response: string) => {
    const isYes = response === "ACCEPTED";
    const subject = isYes
      ? "🎉 Congratulations! Honey said YES!"
      : "💔 Sorry bro... She said NO";
    const message = `
Hey Surya! She just responded to your proposal!

📋 Response Details:
• Answer: ${response}
• Timestamp: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

${isYes ? '🎉 SHE SAID YES! Congratulations! 💕' : '💔 She said no... but hey, you tried! 🤗'}

Good luck! 🍀
    `.trim();

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: 'illasuryanani2001@gmail.com',
          subject: subject,
          message: message,
          _subject: subject,
          response: response,
          timestamp: new Date().toISOString()
        })
      });

      if (res.ok) {
        setFinalResult(isYes ? "YES" : "NO");
        setSubmitted(true);
      } else {
        const data = await res.json();
        const errMsg = data?.errors?.map((e: any) => e.message).join(", ") || `Error ${res.status}`;
        setError(errMsg);
      }
    } catch (err) {
      console.error('Email failed:', err);
      setError("Network error — please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResponse = async (answer: string) => {
    setIsSubmitting(true);
    setError(null);
    const responseType = answer.toLowerCase().includes("yes") ? "ACCEPTED" : "REJECTED";
    await sendEmailNotification(responseType);
  };

  if (submitted) {
     return (
       <section className="min-h-screen py-16 flex flex-col justify-center items-center relative z-10 w-full px-6">
         <FadeInSection className="w-full max-w-[400px]">
            <div className="flex flex-col items-center gap-8 text-center">
               {finalResult === "YES" ? (
                 <>
                   <div className="w-full rounded-3xl overflow-hidden p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] glass relative group">
                     <video
                       ref={successVideoRef}
                       className="w-full aspect-[16/9] rounded-2xl object-cover bg-black block"
                       autoPlay
                       playsInline
                       loop
                     >
                       <source
                         src="https://res.cloudinary.com/dnff39o2f/video/upload/v1773243307/accepted_ypajjx.mp4"
                         type="video/mp4"
                       />
                       Your browser does not support the video tag.
                     </video>
                     
                     {isBlocked && (
                       <div 
                         onClick={() => handleManualPlay(successVideoRef)}
                         className="absolute inset-2 z-20 rounded-2xl bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/50"
                       >
                         <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                           <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                             <path d="M8 5v14l11-7z" />
                           </svg>
                         </div>
                         <p className="text-white text-sm font-medium tracking-wide drop-shadow-md">Tap for Sound ✨❤️</p>
                       </div>
                     )}
                   </div>
                   <div>
                     <h2 className="text-3xl font-bold mb-4 text-[var(--text-primary)]">YES! ✨❤️</h2>
                     <p className="text-[var(--text-secondary)] italic text-lg leading-relaxed">
                       You've made me the happiest person. <br/> Can't wait for our forever to begin.
                     </p>
                   </div>
                 </>
               ) : (
                 <div className="p-16 rounded-3xl text-center glass">
                   <h2 className="text-2xl mb-4 text-[var(--text-primary)] font-bold">Message Sent 💔</h2>
                   <p className="text-[var(--text-secondary)] italic">I appreciate your honesty. <br/> I'll always cherish you.</p>
                 </div>
               )}
            </div>
         </FadeInSection>
       </section>
     )
  }

  return (
    <section
      id="proposal"
      className="min-h-screen py-16 flex flex-col justify-center items-center relative z-10 w-full"
    >
      <div className="w-[90%] sm:w-full max-w-[400px] flex flex-col items-center gap-6 text-center px-4 sm:px-0">
        
        {/* Dynamic Heading */}
        <FadeInSection>
          <div className="transition-all duration-700">
            {stage === 0 ? (
              <>
                <h1 className="title text-2xl">One last question 💍</h1>
                <p className="text-[var(--text-secondary)] italic mt-2 text-sm">
                  Watch this and tell me...
                </p>
              </>
            ) : stage === 1 ? (
              <>
                <h1 className="title text-2xl">Are you sure?</h1>
                <p className="text-[var(--text-secondary)] mt-2 text-3xl">🥺🥺</p>
              </>
            ) : (
              <>
                <h1 className="title text-2xl">Wait, really?</h1>
                <p className="text-[var(--text-secondary)] italic mt-2 text-sm">
                  One last look at my heart...
                </p>
              </>
            )}
          </div>
        </FadeInSection>

        {/* Dynamic Video Player */}
        <FadeInSection>
          <div className="w-full rounded-3xl overflow-hidden p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] glass transition-all duration-700 relative group">
            <video
              ref={videoRef}
              key={`video-stage-${stage}`}
              className="w-full aspect-[16/9] rounded-2xl object-cover bg-black block"
              autoPlay
              playsInline
              loop
            >
              <source
                src={
                  stage === 0 
                    ? "https://res.cloudinary.com/dnff39o2f/video/upload/v1762088979/Nani-proposal-clip_gcuo80.mp4"
                    : stage === 1
                    ? "https://res.cloudinary.com/dnff39o2f/video/upload/v1762108409/rejection-gs_dvvg1g.mp4"
                    : "https://res.cloudinary.com/dnff39o2f/video/upload/v1773241985/premalu-rejection_nubpr9.mp4"
                }
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {/* Autoplay Blocked Overlay */}
            {isBlocked && (
              <div 
                onClick={() => handleManualPlay(videoRef)}
                className="absolute inset-2 z-20 rounded-2xl bg-black/40 backdrop-blur-sm flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-black/50"
              >
                <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mb-4 transition-transform group-hover:scale-110">
                  <svg viewBox="0 0 24 24" width="32" height="32" fill="white">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <p className="text-white text-sm font-medium tracking-wide drop-shadow-md">Tap to Play ❤️</p>
              </div>
            )}
          </div>
        </FadeInSection>

        {/* Dynamic Interactive Options */}
        <FadeInSection className="w-full mt-4">
          <div className="flex justify-center gap-4 w-full">
             {stage === 0 ? (
                <>
                   <button 
                     onClick={() => handleResponse("YES! I do")}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-primary)] transition-all active:scale-95 flex-1 font-medium disabled:opacity-50"
                   >
                     Yes!!!
                   </button>
                   <button 
                     onClick={() => setStage(1)}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-secondary)] transition-all active:scale-95 flex-1 disabled:opacity-50"
                   >
                     Sorry...
                   </button>
                </>
             ) : stage === 1 ? (
                <>
                   <button 
                     onClick={() => handleResponse("Changed mind to: YES!")}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-primary)] transition-all active:scale-95 flex-1 disabled:opacity-50"
                   >
                     Haha, I'm kidding. Yes!!!❤️
                   </button>
                   <button 
                     onClick={() => setStage(2)}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-primary)] transition-all active:scale-95 flex-1 disabled:opacity-50"
                   >
                     Still No 💔
                   </button>
                </>
             ) : (
                <>
                   <button 
                     onClick={() => handleResponse("Finally: YES!! ❤️")}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-primary)] transition-all active:scale-95 flex-1 font-bold disabled:opacity-50"
                   >
                     Okay, I do!! ✨❤️
                   </button>
                   <button 
                     onClick={() => handleResponse("Final Answer: NO.")}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-secondary)] transition-all active:scale-95 flex-1 disabled:opacity-50"
                   >
                     I don't care, Goodbye!!
                   </button>
                </>
             )}
           </div>
        </FadeInSection>

        {/* Error feedback */}
        {error && (
           <p className="text-red-400 text-xs text-center mt-2 px-4 italic">{error}</p>
        )}
        
      </div>
    </section>
  );
}
