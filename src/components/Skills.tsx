"use client";

import { motion } from "framer-motion";
import { GlowingEffect } from "./ui/glowing-effect";

const skills = [
  { category: "Frontend", items: ["React.js", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { category: "Backend", items: ["Node.js", "Express.js", "REST APIs", "MongoDB", "PostgreSQL"] },
  { category: "AI & Automation", items: ["Gemini / OpenAI APIs", "RAG", "CNNs & ML Models", "AI Enagents"] },
  { category: "DevOps & Tools", items: ["Git & GitHub", "GitHub Actions", "Firebase Auth", "Cloud Deployment"] },
];

export default function Skills() {
  return (
    <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-hidden" id="skills">
      {/* Background Ambience */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[100px]" />
      </div>

      <div className="max-w-7xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 tracking-tight">
            Technical <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Arsenal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
            A comprehensive stack enabling end-to-end development of scalable applications.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {skills.map((group, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative h-full rounded-[1.25rem] border-[0.75px] border-white/5 p-2 md:rounded-[1.5rem] md:p-3"
            >
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              <div className="relative h-full flex flex-col p-8 rounded-2xl bg-black/40 border border-white/10 backdrop-blur-md hover:bg-white/5 transition-colors">
                <h3 className="text-2xl font-bold text-blue-300 mb-6 uppercase tracking-wider">{group.category}</h3>
                <div className="flex flex-wrap gap-3">
                  {group.items.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="px-4 py-2 bg-black/40 rounded-full text-sm text-gray-300 border border-white/10 hover:border-white/30 hover:text-white transition-all cursor-default"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
