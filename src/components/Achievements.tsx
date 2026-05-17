"use client";

import { motion } from "framer-motion";
import BorderGlow from "./ui/BorderGlow";

const ACHIEVEMENTS = [
  {
    quote: "Secured runner-up position among 50+ teams by building an innovative solution.",
    name: "Hackathon Prayatna 2.0",
    role: "Runner-up",
    initials: "HP",
  },
  {
    quote: "Demonstrated broad technical knowledge in a highly competitive IEEE event.",
    name: "IEEE Quiz Competition",
    role: "Runner-up",
    initials: "IEEE",
  },
  {
    quote: "Led the organization of a large-scale hackathon event with over 100 participants.",
    name: "ACM Hackathon",
    role: "Organizer",
    initials: "ACM",
  },
  {
    quote: "Served as Point of Contact for Corporate Committee, managing external relations.",
    name: "Inspira 2025",
    role: "Corporate POC",
    initials: "CC",
  },
];

export default function Achievements() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] py-32 overflow-hidden" id="achievements">
      {/* Background Ambience - Different position for variety */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-6 mb-16 text-center relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight"
        >
          Achievements & <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Leadership</span>
        </motion.h2>
        <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
          Recognitions and roles that reflect my commitment to technical excellence and community leadership.
        </p>
      </div>

      <div className="relative w-full overflow-hidden mask-linear-fade">
        {/* Mask gradient for fade effect on edges */}
        <div className="absolute top-0 left-0 w-32 h-full z-20 bg-linear-to-r from-[#121212] to-transparent" />
        <div className="absolute top-0 right-0 w-32 h-full z-20 bg-linear-to-l from-[#121212] to-transparent" />

        <div className="flex w-max">
          <motion.div
            className="flex gap-8 px-4"
            animate={{ x: "-50%" }}
            transition={{
              duration: 30,
              ease: "linear",
              repeat: Infinity,
            }}
          >
            {[...ACHIEVEMENTS, ...ACHIEVEMENTS, ...ACHIEVEMENTS].map((item, index) => (
              <BorderGlow
                key={index}
                className="w-[350px] md:w-[450px] shrink-0"
                edgeSensitivity={35}
                glowColor="260 100 80"
                backgroundColor="#0b0b12"
                borderRadius={28}
                glowRadius={42}
                glowIntensity={1.2}
                coneSpread={24}
                animated={false}
                colors={['#6366f1', '#8b5cf6', '#38bdf8']}
              >
                <div className="relative h-full p-8 rounded-[28px] bg-black/40 border border-white/10 hover:border-white/20 transition-colors duration-300 backdrop-blur-sm flex flex-col shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-full bg-linear-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold text-lg">
                      {item.initials}
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">{item.name}</h4>
                      <p className="text-sm text-gray-400">{item.role}</p>
                    </div>
                  </div>
                  <p className="text-gray-300 italic leading-relaxed">
                    "{item.quote}"
                  </p>
                </div>
              </BorderGlow>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
