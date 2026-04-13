import { motion, AnimatePresence } from "motion/react";
import { CircleDot, Maximize, Sparkles, ArrowLeft, Star } from "lucide-react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

interface LoadingScreenProps {
  onComplete: () => void;
  key?: string;
}

function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [wordIndex, setWordIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const words = ["Design", "Create", "Inspire"];
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    // Word rotation
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => {
        if (prev < words.length - 1) return prev + 1;
        clearInterval(wordInterval);
        return prev;
      });
    }, 900);

    // Progress counter
    let startTime: number | null = null;
    const duration = 2700;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const nextProgress = Math.min((elapsed / duration) * 100, 100);
      
      setProgress(nextProgress);

      if (nextProgress < 100) {
        requestAnimationFrame(animate);
      } else {
        setTimeout(() => {
          onCompleteRef.current();
        }, 400);
      }
    };

    requestAnimationFrame(animate);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* Element 1: "Portfolio" Label */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute top-8 left-8 md:top-12 md:left-12 text-xs md:text-sm text-muted uppercase tracking-[0.3em]"
      >
        Portfolio
      </motion.div>

      {/* Element 2: Rotating Words */}
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text/80"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Element 3: Counter */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 text-6xl md:text-8xl lg:text-9xl font-display text-text tabular-nums"
      >
        {Math.round(progress).toString().padStart(3, '0')}
      </motion.div>

      {/* Element 4: Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-stroke/50">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
          className="h-full origin-left"
          style={{
            background: "linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)",
            boxShadow: "0 0 8px rgba(137, 170, 204, 0.35)"
          }}
        />
      </div>
    </motion.div>
  );
}

function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.6 }}
      className="relative min-h-screen"
    >
      {/* ✅ Background Video Layer */}
      <div className="md:fixed relative w-full h-[60vh] md:h-full md:inset-0 z-0 bg-black pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
        </video>

        {/* ✅ Cinematic Overlay (Desktop & Mobile) */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/60" />
        <div className="absolute inset-0 bg-gradient-to-tr from-black via-transparent to-black/40" />
        
        {/* ✅ Mobile Bottom Fade (Smooth transition to content) */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent md:hidden" />
      </div>

      {/* ✅ Content Layer */}
      <div className="relative z-10 p-8 md:p-16 md:min-h-screen flex flex-col">
        <div className="max-w-7xl mx-auto w-full h-full flex flex-col justify-between flex-1">

          {/* Top Right Pagination */}
          <div className="flex justify-end items-center gap-6">
            <Link to="/support" className="group flex items-center gap-4 text-[10px] font-mono tracking-[0.2em] text-white/40 hover:text-white transition-colors">
              <span>1/20</span>
              <div className="w-24 h-[1px] bg-white/20 group-hover:bg-white/40 transition-colors" />
              <span className="text-white/80 italic uppercase">Next Project</span>
            </Link>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mt-12 mb-12">

            {/* Left Side */}
            <div className="lg:col-span-7 space-y-10">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <h1 className="text-6xl md:text-8xl font-medium tracking-tighter leading-[0.85] uppercase">
                  ARPIT<br />
                  MODERN<br />
                  ARCHITECT
                </h1>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="max-w-lg space-y-8"
              >
                <p className="text-[13px] text-white/60 leading-relaxed font-light tracking-wide">
                  Architected by Arpit with high-end coding skills and a user-centric creative vision. Don't just browse this site—feel the impact.
                </p>

                <div className="flex gap-4">
                  {[CircleDot, Maximize, Sparkles].map((Icon, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.1 }}
                      className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center cursor-pointer"
                    >
                      <Icon size={16} className="text-white/80" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Right Side */}
            <div className="lg:col-span-5 lg:pl-12">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="space-y-6"
              >
                <div className="space-y-2">
                  <h2 className="text-[11px] font-mono tracking-[0.3em] text-white/60 uppercase">
                    Technical Specs
                  </h2>
                  <div className="w-full h-[1px] bg-white/10" />
                </div>

                <div className="space-y-4 font-mono text-[11px] tracking-wider">
                  {[
                    { label: "Design", value: "React, NextJS, Tailwind" },
                    { label: "Stack", value: "NodeJS, Go, SQL" },
                    { label: "Engine", value: "Vite, Docker, AWS" },
                    { label: "Focus", value: "TypeScript, Motion, D3, AI" },
                  ].map((spec, i) => (
                    <div key={i} className="flex justify-between items-end pb-1 border-b border-white/5">
                      <span className="text-white/40 uppercase">{spec.label}</span>
                      <span className="text-white/90 text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>

              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </motion.div>
  );
}

function Support() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 1.05 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative min-h-screen bg-black flex flex-col items-center justify-center text-center p-8 overflow-hidden"
    >
      {/* ✅ Background Video Layer */}
      <div className="absolute inset-0 z-0 bg-black pointer-events-none">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover opacity-50"
        >
          <source src="/videos/support-bg.mp4" type="video/mp4" />
        </video>
        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />
      </div>

      {/* Background Texture/Grain */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Back Button */}
      <Link 
        to="/" 
        className="absolute top-8 left-8 md:top-16 md:left-16 group flex items-center gap-3 text-[10px] font-mono tracking-[0.2em] text-white/40 hover:text-white transition-colors z-50"
      >
        <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
        <span className="uppercase">Back to Home</span>
      </Link>

      <div className="relative z-10 space-y-12 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="space-y-4"
        >
          <span className="text-[11px] font-mono tracking-[0.5em] text-white/40 uppercase">
            Project 01 / Support
          </span>
          <h1 className="text-7xl md:text-9xl font-serif italic tracking-tight leading-none">
            Global<br />
            Assistance
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="space-y-8"
        >
          <p className="text-lg md:text-xl text-white/60 font-light leading-relaxed max-w-2xl mx-auto font-serif italic">
            "We don't just solve problems; we architect solutions that empower users worldwide. Our support system is the backbone of our creative vision."
          </p>
          
          <div className="flex flex-col items-center gap-4">
            <div className="w-[1px] h-24 bg-gradient-to-b from-white/20 to-transparent" />
            <span className="text-[10px] font-mono tracking-[0.3em] text-white/30 uppercase">
              Scroll to Explore
            </span>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-white/10 to-transparent" />
    </motion.div>
  );
}

function AnimatedRoutes() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait">
      <div key={location.pathname}>
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/support" element={<Support />} />
        </Routes>
      </div>
    </AnimatePresence>
  );
}

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        {isLoading && (
          <LoadingScreen key="loader" onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      
      <main 
        className="bg-black min-h-screen"
        style={{ 
          opacity: isLoading ? 0 : 1, 
          transition: "opacity 0.5s ease-out",
          transitionDelay: isLoading ? "0s" : "0.6s"
        }}
      >
        <AnimatedRoutes />
      </main>
    </BrowserRouter>
  );
}