"use client";

import { motion } from "framer-motion";



export default function Testimonials() {
    return (
        <section className="relative z-20 bg-[#0a0a0a] py-32 overflow-hidden" id="testimonials">
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
                    Valuable <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Testimonials</span>
                </motion.h2>
                <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 leading-relaxed">
                    What others say about my work and collaboration.
                </p>
            </div>

            <div className="flex justify-center mt-8 relative z-20">
                <motion.a
                    href="mailto:sathwvikmanuri@gmail.com?subject=Portfolio%20Review"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="group relative inline-flex items-center gap-3 px-8 py-4 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 transition-all hover:scale-105"
                >
                    <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400 font-bold text-lg group-hover:from-blue-300 group-hover:to-purple-300 transition-all">
                        Write a Review
                    </span>
                    <svg
                        className="w-5 h-5 text-purple-400 group-hover:text-purple-300 transition-colors"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>

                    {/* Glow effect */}
                    <div className="absolute inset-0 rounded-full bg-linear-to-r from-blue-600/20 to-purple-600/20 blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
                </motion.a>
            </div>
        </section>
    );
}
