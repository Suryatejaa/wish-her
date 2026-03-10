"use client";

import { useState } from "react";
import FadeInSection from "./FadeInSection";

export default function SectionProposal() {
  const [isRejected, setIsRejected] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Formspree endpoint to receive the proposal response
  const FORMSPREE_ENDPOINT = "https://formspree.io/f/xovrvbnb";

  const handleResponse = async (answer: string) => {
    setIsSubmitting(true);
    setError(null);

    const isYes = answer.toLowerCase().includes("yes");
    const subject = isYes
      ? "🎉 Congratulations! Honey said YES!"
      : "💔 Sorry bro... She said NO";
    const message = isYes
      ? "She said YES! Congratulations! 🥳💍 Your move now!"
      : "She said NO. Sorry bro, better luck next time... 💔";
    
    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({ 
           _subject: subject,
           message: message,
           answer: answer,
           timestamp: new Date().toISOString()
        })
      });

      const data = await res.json();
      console.log("Formspree response:", res.status, data);
      
      if (res.ok) {
        setSubmitted(true);
      } else {
        const errMsg = data?.errors?.map((e: { message: string }) => e.message).join(", ") || `Error ${res.status}`;
        setError(errMsg);
        console.error("Formspree failed:", errMsg);
      }
    } catch (err) {
      setError("Network error — please check your connection.");
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInitialSorry = () => {
    setIsRejected(true);
  };

  if (submitted) {
     return (
       <section className="min-h-screen py-16 flex flex-col justify-center items-center relative z-10 w-full">
         <FadeInSection>
            <div className="p-16 rounded-3xl text-center max-w-[320px] mx-auto">
               <h2 className="text-2xl mb-4 text-[var(--text-primary)]">Message Sent ✨</h2>
               <p className="text-[var(--text-secondary)] italic">Can't wait to see you.</p>
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
            {isRejected ? (
              <>
                <h1 className="title text-2xl">Are you sure?</h1>
                <p className="text-[var(--text-secondary)]  mt-2 text-3xl">
                  🥺🥺
                </p>
              </>
            ) : (
              <>
                <h1 className="title text-2xl">One last question 💍</h1>
                <p className="text-[var(--text-secondary)] italic mt-2 text-sm">
                  Watch this and tell me...
                </p>
              </>
            )}
          </div>
        </FadeInSection>

        {/* Dynamic Video Player */}
        <FadeInSection>
          <div className="w-full rounded-3xl overflow-hidden p-2 shadow-[0_10px_40px_rgba(0,0,0,0.1)] glass transition-all duration-700">
            {isRejected ? (
               // Secondary Video (Placeholder)
               <video
                 key="secondary-video"
                 className="w-full aspect-[16/9] rounded-2xl object-cover bg-black block"
                //  controls
                 autoPlay
                 playsInline
               >
                 <source
                   src="https://res.cloudinary.com/dnff39o2f/video/upload/v1762108409/rejection-gs_dvvg1g.mp4" 
                   type="video/mp4"
                 />
                 Your browser does not support the video tag.
               </video>
            ) : (
               // Primary Video
               <video
                 key="primary-video"
                 className="w-full aspect-[16/9] rounded-2xl object-cover bg-black block"
                 controls
                 autoPlay
                 playsInline
               >
                 <source
                   src="https://res.cloudinary.com/dnff39o2f/video/upload/v1762088979/Nani-proposal-clip_gcuo80.mp4" 
                   type="video/mp4"
                 />
                 Your browser does not support the video tag.
               </video>
            )}
          </div>
        </FadeInSection>

        {/* Dynamic Interactive Options */}
        <FadeInSection className="w-full mt-4">
          <div className="flex justify-center gap-4 w-full">
             {isRejected ? (
                <>
                   {/* Secondary Options */}
                   <button 
                     onClick={() => handleResponse("Changed mind to: YES!")}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-primary)] transition-all active:scale-95 flex-1 disabled:opacity-50"
                   >
                     Haha, I'm kidding. Yes!!!❤️
                   </button>
                   <button 
                     onClick={() => handleResponse("Still No (Sorry)")}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-primary)] transition-all active:scale-95 flex-1 disabled:opacity-50"
                   >
                     Still No 💔
                   </button>
                </>
             ) : (
                <>
                   {/* Initial Options */}
                   <button 
                     onClick={() => handleResponse("YES! I do")}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-primary)] transition-all active:scale-95 flex-1 font-medium disabled:opacity-50"
                   >
                     Yes!!!
                   </button>
                   <button 
                     onClick={handleInitialSorry}
                     disabled={isSubmitting}
                     className="glass-button py-3 px-6 text-[var(--text-secondary)] transition-all active:scale-95 flex-1 disabled:opacity-50"
                   >
                     Sorry...
                   </button>
                </>
             )}
           </div>
        </FadeInSection>

        {/* Error feedback */}
        {error && (
           <p className="text-red-400 text-xs text-center mt-2 px-4">{error}</p>
        )}
        
      </div>
    </section>
  );
}
