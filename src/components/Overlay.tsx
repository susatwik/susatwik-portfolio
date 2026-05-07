"use client";

import { useScroll, useTransform, motion } from "framer-motion";

export default function Overlay({ scrollYProgress }: { scrollYProgress: any }) {
    // Opacity transforms
    const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
    const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.4, 0.5], [0, 1, 1, 0]);
    const opacity3 = useTransform(scrollYProgress, [0.5, 0.6, 0.7, 0.8], [0, 1, 1, 0]);

    // Parallax Y movement (optional polish)
    const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0.2, 0.5], [50, -50]);
    const y3 = useTransform(scrollYProgress, [0.5, 0.8], [50, -50]);

    return (
        <div className="absolute inset-0 pointer-events-none z-10 flex flex-col justify-center text-white mix-blend-difference">
            {/* Section 1 */}
            <motion.div
                style={{ opacity: opacity1, y: y1 }}
                className="absolute inset-0 flex items-end justify-center p-8 pb-32 md:pb-48"
            >
                <div className="text-center relative">
                    <h1 className="text-6xl md:text-8xl font-bold tracking-tight mb-4">Susatwik Manuri.</h1>
                    <p className="text-xl md:text-2xl font-light text-gray-300">AI-Driven Full-Stack Developer.</p>

                    {/* Scroll Indicator */}
                    <motion.div
                        initial={{ opacity: 0, y: 0 }}
                        animate={{ opacity: 1, y: [0, 10, 0] }}
                        transition={{
                            opacity: { delay: 1, duration: 1 },
                            y: { repeat: Infinity, duration: 2, ease: "easeInOut" }
                        }}
                        style={{ opacity: useTransform(scrollYProgress, [0, 0.05], [1, 0]) }}
                        className="absolute left-1/2 -bottom-16 md:-bottom-24 transform -translate-x-1/2"
                    >
                        <div className="flex flex-col items-center gap-2">
                            <span className="text-xs uppercase tracking-[0.2em] text-gray-400 font-medium">Scroll</span>
                            <svg
                                width="20"
                                height="20"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-gray-400"
                            >
                                <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
                            </svg>
                        </div>
                    </motion.div>
                </div>
            </motion.div>

            {/* Section 2 */}
            <motion.div
                style={{ opacity: opacity2, y: y2 }}
                className="absolute inset-0 flex items-center justify-start p-8 md:p-24"
            >
                <div className="max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">Building intelligent, scalable systems using <span className="text-blue-500">MERN, LLMs, and automation.</span></h2>
                </div>
            </motion.div>

            {/* Section 3 */}
            <motion.div
                style={{ opacity: opacity3, y: y3 }}
                className="absolute inset-0 flex items-center justify-end p-8 md:p-24 text-right"
            >
                <div className="max-w-3xl">
                    <h2 className="text-5xl md:text-7xl font-bold leading-tight">From AI models to <span className="text-purple-500">production-ready</span> web platforms.</h2>
                </div>
            </motion.div>
        </div>
    );
}
