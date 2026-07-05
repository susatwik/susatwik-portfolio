"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import LanyardCanvas from "./Lanyard";
import DotGrid from "./DotGrid";
import { Mail } from "lucide-react";
import { RandomLetterSwapPingPong } from "./ui/random-letter-swap";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import DownloadButton from "./ui/button-download";

export default function Hero() {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "downloaded" | "complete">("idle")
  const [progress, setProgress] = useState(0)

  const handleDownload = () => {
    if (downloadStatus !== "idle") return;

    setDownloadStatus("downloading");
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadStatus("downloaded");
          
          // Trigger actual download
          const link = document.createElement("a");
          link.href = "/resume.pdf";
          link.download = "Susatwik_Manuri_Resume.pdf";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);

          return 100;
        }
        return prev + 5;
      });
    }, 100);

    setTimeout(() => {
      setDownloadStatus("complete");
      setTimeout(() => {
        setDownloadStatus("idle");
        setProgress(0);
      }, 1000);
    }, 3500);
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col md:flex-row items-center justify-center px-6 md:px-12 py-20 overflow-hidden bg-black" id="home">
      {/* 1. Dot Grid Background */}
      <div className="absolute inset-0 z-0">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#1a1a2e"
          activeColor="#6366f1"
          proximity={150}
          shockRadius={300}
        />
      </div>

      {/* 2. Interactive 3D Lanyard (Layered between background and content) */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <LanyardCanvas />
      </div>

      {/* 3. Hero Content */}
      <div className="relative z-20 w-full md:w-1/2 flex flex-col items-start text-left space-y-6 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="pointer-events-auto"
        >
          <span className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium mb-4">
            Available for new opportunities
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] flex flex-wrap gap-x-4">
            <RandomLetterSwapPingPong label="Manuri" />
            <RandomLetterSwapPingPong label="Susatwik" className="text-primary italic" />
          </h1>
          <h2 className="text-xl md:text-2xl font-medium text-gray-400 mt-2">
            Full Stack & AI Developer
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-lg text-lg text-gray-400 font-light leading-relaxed pointer-events-auto"
        >
          Building intelligent web systems, AI tools, and scalable digital products that push the boundaries of technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-wrap gap-4 pt-4 pointer-events-auto items-center"
        >
          <InteractiveHoverButton 
            text="View Projects" 
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          />
          <button 
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-8 py-4 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>
          
          <DownloadButton
            downloadStatus={downloadStatus}
            progress={progress}
            onClick={handleDownload}
            className="bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all h-[58px] w-48"
          />
        </motion.div>
      </div>

      {/* Spacer for Right Side on Desktop (to prevent text overlap if desired) */}
      <div className="hidden md:block w-1/2 h-full pointer-events-none" />

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 z-30 pointer-events-none"
      >
        <span className="text-[10px] uppercase tracking-widest font-bold">Scroll to explore</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-primary to-transparent" />
      </motion.div>
    </div>
  );
}
