"use client";

import { motion } from "framer-motion";
import {
  Code2,
  Cpu,
  Layers,
  Rocket,
  Webhook,
  Zap,
  CheckCircle2,
  Building2,
  Users2,
  Terminal
} from "lucide-react";
import Image from "next/image";
import ProfileCard from '@/components/ui/ProfileCard';
import { BackgroundPaths } from "./background-paths";

const SERVICES = [
  {
    title: "Full-Stack Development",
    description: "Build scalable web applications using React, Next.js, Node.js, and modern backend architectures.",
    icon: Code2,
  },
  {
    title: "AI Applications",
    description: "Develop AI-powered tools using APIs such as OpenAI, LangChain, and other intelligent automation systems.",
    icon: Cpu,
  },
  {
    title: "Interactive Interfaces",
    description: "Create immersive UI experiences using WebGL, Three.js, and advanced animations.",
    icon: Layers,
  },
  {
    title: "Product Development",
    description: "Design and build complete digital products from idea to deployment.",
    icon: Rocket,
  },
  {
    title: "System Architecture",
    description: "Plan scalable systems, APIs, and data flows for modern web platforms.",
    icon: Webhook,
  },
  {
    title: "Performance Optimization",
    description: "Improve performance, scalability, and user experience for production applications.",
    icon: Zap,
  },
];

const STATS = [
  { label: "Projects Built", value: "15+", icon: Building2 },
  { label: "Production Applications", value: "3", icon: Terminal },
  { label: "AI Tools Developed", value: "5", icon: Cpu },
  { label: "User Satisfaction", value: "98%", icon: Users2 },
];

export default function AboutUsSection() {
  return (
    <section id="about" className="relative w-full bg-[#050505] text-white overflow-hidden border-t border-white/5 min-h-screen flex flex-col items-center justify-center">
      
      {/* 2. BackgroundPaths positioned behind */}
      <BackgroundPaths />

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 w-full">
        
        {/* Animated Title at the Top */}
        <div className="text-center mb-12">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter">
            {"About Me".split(" ").map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ y: 50, opacity: 0 }}
                    whileInView={{ y: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      delay: wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 25,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-500"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h2>
        </div>

        {/* Step 3: Header Description */}
        <div className="flex flex-col items-center text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <p className="max-w-3xl text-gray-400 text-lg md:text-xl leading-relaxed font-light">
              Full-stack developer building AI-powered web platforms, real-time systems, and interactive digital experiences.
              I focus on turning complex ideas into simple, scalable digital products.
            </p>
          </motion.div>
        </div>

        {/* Step 4 & 9: Layout & Service Blocks */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8 items-center">
          
          {/* Left Column Services (Desktop) / First 3 (Tablet) */}
          <div className="space-y-12">
            {SERVICES.slice(0, 3).map((service, index) => (
              <ServiceCard key={index} service={service} index={index} />
            ))}
          </div>

          {/* Center Column: Profile Card (Responsive) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative z-10 flex flex-col items-center justify-center h-full order-first lg:order-none md:col-span-2 lg:col-span-1 mb-12 lg:mb-0 w-full max-w-[340px] md:max-w-[400px] mx-auto"
          >
            <ProfileCard
              name="Manuri Susatwik"
              title="Full Stack & AI Developer"
              handle="susatwik"
              status="Available for Opportunities"
              contactText="Contact Me"
              avatarUrl="/s.jpeg"
              miniAvatarUrl="/s.jpeg"
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

          {/* Right Column Services (Desktop) / Last 3 (Tablet) */}
          <div className="space-y-12">
            {SERVICES.slice(3, 6).map((service, index) => (
              <ServiceCard key={index + 3} service={service} index={index + 3} />
            ))}
          </div>
        </div>

        {/* Step 5: Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-24 pt-12 border-t border-white/5">
          {STATS.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-white/5 border border-white/10 mb-4 text-primary group-hover:scale-110 transition-transform">
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</span>
              <span className="text-sm text-gray-500 uppercase tracking-widest font-medium">{stat.label}</span>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof SERVICES[0], index: number }) {
  const Icon = service.icon;
  return (
    <motion.div
      initial={{ opacity: 0, x: index < 3 ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="flex flex-col space-y-4 group"
    >
      <div className="flex items-center gap-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 text-primary group-hover:bg-primary group-hover:text-black transition-all duration-300">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-xl font-semibold text-white group-hover:text-primary transition-colors">
          {service.title}
        </h3>
      </div>
      <p className="text-gray-400 font-light leading-relaxed group-hover:text-gray-300 transition-colors pl-14">
        {service.description}
      </p>
    </motion.div>
  );
}
