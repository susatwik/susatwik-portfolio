"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Letters } from "@kumailnanji/letters";

export default function PortfolioIntro() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentStep, setCurrentStep] = useState<number | null>(0);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    const hasSeenIntro = sessionStorage.getItem("intro_seen");
    if (hasSeenIntro) {
      setShowIntro(false);
      return;
    }

    // Timeline (all in ms)
    // 0‑1500: draw "hello" (1.5s)
    // 1500‑2000: hold
    // 2000‑2300: fade out "hello"
    // 2300‑4100: draw "welcome to portfolio" (1.8s)
    // 4100‑4600: hold
    // 4600‑5000: fade out "welcome" and reveal portfolio
    const timer1 = setTimeout(() => setCurrentStep(1), 2000); // start fade of hello
    const timer2 = setTimeout(() => setCurrentStep(null), 4600); // start fade of welcome
    const timer3 = setTimeout(() => {
      setShowIntro(false);
      sessionStorage.setItem("intro_seen", "true");
    }, 5000);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  if (!isMounted) {
    // Solid black background during SSR to avoid flash
    return <div className="fixed inset-0 z-[9999] bg-black" />;
  }

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          key="intro-bg"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div
                key="step-hello"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="w-full flex justify-center px-6"
              >
                <Letters
                  text="hello"
                  autoPlay
                  color="white"
                  strokeWidth={2.5}
                  className="h-20 md:h-28 w-auto"
                  animation={{ type: "tween", duration: 1.5, ease: "easeInOut" }}
                />
              </motion.div>
            )}
            {currentStep === 1 && (
              <motion.div
                key="step-welcome"
                initial={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="w-full flex justify-center px-4"
              >
                {/* Upscaled to ~2.7× original size while keeping stroke weight identical */}
                <Letters
                  text="welcome to portfolio"
                  autoPlay
                  color="white"
                  strokeWidth={2.5}
                  className="h-20 md:h-28 w-auto"
                  animation={{ type: "tween", duration: 1.8, ease: "easeInOut" }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
