"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import LanyardCanvas from "./Lanyard";
import DotGrid from "./DotGrid";
import { Mail } from "lucide-react";
import { RandomLetterSwapPingPong } from "./ui/random-letter-swap";
import { InteractiveHoverButton } from "./ui/interactive-hover-button";
import DownloadButton from "./ui/button-download";

export default function Hero() {
  const [downloadStatus, setDownloadStatus] = useState<"idle" | "downloading" | "downloaded" | "complete">(
    "idle"
  );
  const [progress, setProgress] = useState(0);

  // No JS mobile detection; layout handled via CSS media queries.
  const handleDownload = () => {
    if (downloadStatus !== "idle") return;
    setDownloadStatus("downloading");
    setProgress(0);
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setDownloadStatus("downloaded");
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
    <div
      className="relative min-h-screen w-full grid md:grid-cols-2 items-start justify-start gap-12 px-6 md:px-12 py-8 md:py-20 overflow-hidden bg-black"
      id="home"
    >
      {/* Background grid */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <DotGrid
          dotSize={4}
          gap={20}
          baseColor="#1a1a2e"
          activeColor="#6366f1"
          proximity={150}
          shockRadius={300}
        />
      </div>



      {/* Hero content */}
      <div className="relative z-20 w-full md:w-[560px] flex flex-col items-start text-left space-y-4">
        {/* Availability badge */}
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-block px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-medium"
        >
          Available for new opportunities
        </motion.span>

        {/* Name */}
        <motion.h1
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[1.1] flex flex-wrap gap-x-2"
        >
          <RandomLetterSwapPingPong label="Manuri" />
          <RandomLetterSwapPingPong label="Susatwik" className="text-primary italic" />
        </motion.h1>

        {/* Role */}
        <motion.h2
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-xl md:text-2xl font-medium text-gray-400"
        >
          Full Stack &amp; AI Developer
        </motion.h2>

        {/* Mobile profile picture – placed directly under name & role */}
        <div className="block md:hidden">
          <motion.img
            src="/profile.png"
            alt="Profile"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-44 h-44 rounded-full object-cover object-center mx-auto border border-primary mt-6 mb-6"
          />
        </div>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="max-w-lg text-lg text-gray-400 font-light leading-relaxed"
        >
          Building intelligent web systems, AI tools, and scalable digital products that push the
          boundaries of technology.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="relative z-50 flex flex-col sm:flex-row gap-4 mt-4"
        >
          <InteractiveHoverButton
            text="View Projects"
            onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
          />
          <button
            onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          >
            <Mail className="w-4 h-4" />
            Contact Me
          </button>
          <DownloadButton
            downloadStatus={downloadStatus}
            progress={progress}
            onClick={handleDownload}
            className="px-4 py-2 bg-white/5 border border-white/10 text-white font-semibold rounded-full hover:bg-white/10 transition-all"
          />
        </motion.div>


      </div>

       {/* Right‑side column with Lanyard */}
       <div className="hidden md:block w-1/2 h-full pointer-events-none">
         <LanyardCanvas />
       </div>

      {/* Scroll indicator – hide on mobile */}
      <div className="hidden md:block">
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
    </div>
  );
}
