"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function Process() {
  const { ref, inView } = useInView({ threshold: 0.12, triggerOnce: true });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const sync = () => setIsMobile(window.innerWidth < 768);
    sync();
    window.addEventListener("resize", sync);
    return () => window.removeEventListener("resize", sync);
  }, []);

  return (
    <section id="process" aria-labelledby="process-heading" className="relative py-24 lg:py-32 overflow-hidden" ref={ref}>
      {/* Background ambient glow */}
      <div className="absolute inset-0 z-0 pointer-events-none flex justify-center items-center opacity-30">
        <div className="w-full max-w-5xl h-64 bg-gradient-to-r from-blue-900/40 via-violet-900/40 to-blue-900/40 blur-[100px] rounded-full"></div>
      </div>
      
      <div className={`relative z-10 max-w-7xl mx-auto px-6 lg:px-8 reveal ${inView ? "visible" : ""}`}>
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-20 lg:mb-32">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6" id="process-heading" style={{ fontFamily: "'Clash Display', sans-serif" }}>
            How <span className="ml-1 md:ml-2">we</span> <span className="ml-1 md:ml-2">work</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-400 font-light tracking-wide">
            Four steps. No surprises. No disappearing acts.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          {/* The Glowing Laser Line (Connecting the steps) */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 -translate-y-1/2 z-0">
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-blue-500/80 to-violet-500/80 laser-line animate-laser-flow relative">
              {/* Glow layer */}
              <div className="absolute inset-0 blur-[6px] bg-gradient-to-r from-transparent via-blue-400 to-violet-400 animate-pulse-slow"></div>
            </div>
          </div>
          
          {/* Vertical line for mobile fallback */}
          <div className="lg:hidden absolute left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 bg-gradient-to-b from-blue-500/50 via-violet-500/50 to-transparent z-0"></div>
          
          {/* Grid for the cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
            {/* Step 1: Discovery */}
            <article className="card-hover-effect relative bg-space-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-10 text-center shadow-2xl overflow-hidden group transition-all duration-500 hover:border-blue-500/30 hover:bg-space-900/80 flex flex-col justify-center min-h-[320px]">
              <div className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[14rem] font-bold bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent select-none pointer-events-none transition-all duration-700 leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>1</div>
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>Discovery</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  We learn your brand, audience, and goals. No assumptions — just deep listening before a single pixel gets placed.
                </p>
              </div>
            </article>

            {/* Step 2: Design */}
            <article className="card-hover-effect relative bg-space-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-10 text-center shadow-2xl overflow-hidden group transition-all duration-500 hover:border-blue-400/30 hover:bg-space-900/80 flex flex-col justify-center min-h-[320px]">
              <div className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[14rem] font-bold bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent select-none pointer-events-none transition-all duration-700 leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>2</div>
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>Design</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  A full visual direction before we write a line of code. You see exactly what we're building and sign off on it.
                </p>
              </div>
            </article>

            {/* Step 3: Build */}
            <article className="card-hover-effect relative bg-space-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-10 text-center shadow-2xl overflow-hidden group transition-all duration-500 hover:border-violet-400/30 hover:bg-space-900/80 flex flex-col justify-center min-h-[320px]">
              <div className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[14rem] font-bold bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent select-none pointer-events-none transition-all duration-700 leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>3</div>
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>Build</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  Hand-coded in Next.js with motion, performance, and detail at every layer. Live preview within 2 weeks.
                </p>
              </div>
            </article>

            {/* Step 4: Launch */}
            <article className="card-hover-effect relative bg-space-900/60 backdrop-blur-xl border border-white/5 rounded-3xl p-8 lg:p-10 text-center shadow-2xl overflow-hidden group transition-all duration-500 hover:border-violet-500/30 hover:bg-space-900/80 flex flex-col justify-center min-h-[320px]">
              <div className="bg-number absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[12rem] md:text-[14rem] font-bold bg-gradient-to-b from-white/20 to-transparent bg-clip-text text-transparent select-none pointer-events-none transition-all duration-700 leading-none" style={{ fontFamily: "'Clash Display', sans-serif" }}>4</div>
              <div className="relative z-10 flex flex-col items-center">
                <h3 className="text-2xl font-bold mb-4 tracking-tight" style={{ fontFamily: "'Clash Display', sans-serif" }}>Launch</h3>
                <p className="text-slate-400 leading-relaxed text-sm md:text-base">
                  We handle domain, hosting, and the full launch checklist. Then we stick around — you're not on your own.
                </p>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
