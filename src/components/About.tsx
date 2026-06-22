"use client";

import { motion } from "framer-motion";
import { ChevronRight, Folder, Cpu, Brain } from "lucide-react";
import Image from "next/image";
import ProfileCard from "./ui/ProfileCard";

export default function About() {
  const blocks = [
    {
      title: "Who I Am",
      text: "Full-stack developer building AI-powered web platforms, real-time systems, and interactive applications.",
    },
    {
      title: "What I Build",
      text: "I build products like gamified learning platforms (Learn Spark Arcade), AI assistants, and scalable modern web systems.",
    },
    {
      title: "What Problems I Solve",
      text: "I turn complex ideas into simple, high-performance digital products that people actually use.",
    },
  ];

  const tech = [
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Three.js",
    "OpenAI",
  ];

  const stats = [
    { icon: Folder, value: "15+", label: "Projects Built" },
    { icon: Cpu, value: "3", label: "Production Systems" },
    { icon: Brain, value: "1", label: "AI Learning Platform" },
  ];

  return (
    <section id="about" className="relative w-full bg-[#050505] scroll-mt-28">
      <div className="max-w-6xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Profile Image */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative w-full max-w-[380px] mx-auto md:mx-0"
          >
            <ProfileCard
              name="Manuri Susatwik"
              title="Full Stack & AI Developer"
              handle="susatwik"
              status="Available for Opportunities"
              contactText="Contact Me"
              avatarUrl="/profile.png"
              miniAvatarUrl="/profile.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              behindGlowEnabled={true}
              behindGlowColor="rgba(99, 102, 241, 0.55)"
              behindGlowSize="55%"
              innerGradient="linear-gradient(145deg,#1e1b4b88 0%,#312e8188 40%,#0f172a88 100%)"
              onContactClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >

            {/* Heading */}
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-3">
                About <span className="text-primary italic">Me</span>
              </h2>
              <div className="w-20 h-1 bg-primary rounded-full" />
            </div>

            {/* Text Blocks */}
            <div className="space-y-6">
              {blocks.map((b, i) => (
                <div key={i}>
                  <h3 className="text-white font-semibold uppercase text-sm tracking-wider mb-1">
                    {b.title}
                  </h3>
                  <p className="text-gray-400 text-lg leading-relaxed">
                    {b.text}
                  </p>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-10 pt-2">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={i} className="flex items-center gap-3 group">
                    <Icon className="w-5 h-5 text-primary group-hover:scale-110 transition" />
                    <div>
                      <p className="text-white text-xl font-semibold">{s.value}</p>
                      <p className="text-gray-400 text-sm">{s.label}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 pt-2">
              {tech.map((t, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-white/5 border border-white/10 text-gray-300 hover:bg-primary/10 hover:border-primary/40 transition-all"
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Buttons */}
            <div className="flex gap-4 pt-6 flex-wrap">

              <a
                href="#projects"
                className="flex items-center gap-2 px-8 py-4 bg-white text-black font-semibold rounded-full hover:scale-105 transition-all group"
              >
                Explore My Work
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <a
                href="/resume.pdf"
                target="_blank"
                className="px-8 py-4 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all"
              >
                Download Resume
              </a>

            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}
