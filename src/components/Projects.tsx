"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

// Project Data with Media & Layout Configuration
const projects = [
    {
        id: "hirescale-ai",
        title: "HireScale AI",
        category: "AI System • Full Stack",
        description: "AI-driven recruitment intelligence with real-time adaptive interview simulations.",
        longDescription: "Architected a high-fidelity recruitment suite integrating a custom ATS scoring engine with a stateful interview simulator. The system employs a hybrid AI + rule-based evaluation logic for resume parsing and utilizes session-based memory to drive adaptive, non-linear interview flows. Built on a scalable Node.js/Supabase backbone with real-time analytics for hiring signal tracking.",
        techStack: ["React", "TypeScript", "Node.js", "Express", "Supabase", "Gemini Pro", "Redis"],
        repo: "#",
        demo: "https://stateful-interview-system.vercel.app/",
        color: "from-blue-600/20 to-violet-500/20",
        hoverColor: "group-hover:from-blue-600/40 group-hover:to-violet-500/40",
        span: "md:col-span-2 md:row-span-2",
        mediaType: "image",
        mediaUrl: "/images/hirescale-ai.png",
        demoUrl: "/images/hirescale-ai.png"
    },
    {
        id: "recovermate",
        title: "RecoverMate",
        category: "AI Automation • RAG",
        description: "AI-powered invoice recovery & dispute handling system on WhatsApp.",
        longDescription: "An end-to-end AI system that automates invoice recovery over WhatsApp for SMBs. Features include WhatsApp automation using Twilio, AI intent classification & promise-to-pay detection, RAG-based dispute handling using Pinecone, Gemini AI for response generation & date extraction, PDF invoice data extraction, and a Real-time React dashboard with invoice risk indicators.",
        techStack: ["React", "Node.js", "MongoDB", "Twilio", "Gemini AI", "Pinecone"],
        repo: "#",
        demo: "https://recovermate-web.onrender.com",
        color: "from-emerald-600/20 to-teal-500/20",
        hoverColor: "group-hover:from-emerald-600/40 group-hover:to-teal-500/40",
        span: "md:col-span-1 md:row-span-2",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "restaurant-flow",
        title: "RestaurantFlow",
        category: "Operational Workflow • System Design",
        description: "A multi-tenant restaurant management interface with real-time order lifecycle synchronization.",
        longDescription: "A comprehensive operational system designed to decouple customer-facing menus from back-of-house kitchen workflows. It utilizes a centralized React Context state engine to orchestrate orders through a multi-stage lifecycle (Pending → Preparing → Ready → Delivered). The system manages cross-role synchronization between Kitchen Kanban boards, Server notification panels, and Admin inventory controls.",
        techStack: ["React 18", "Vite", "React Context", "Framer Motion", "Lucide React"],
        repo: "#",
        demo: "https://restaurant-ordering-kitchen.vercel.app/",
        color: "from-orange-600/20 to-zinc-900/20",
        hoverColor: "group-hover:from-orange-600/40 group-hover:to-zinc-900/40",
        span: "md:col-span-2",
        mediaType: "image",
        mediaUrl: "/images/kitchen-os-mockup.png",
        demoUrl: "/images/kitchen-os-mockup.png"
    },
    {
        id: "pawdentify",
        title: "Pawdentify",
        category: "AI • Computer Vision",
        description: "AI Dog Breed Classification using Deep Learning.",
        longDescription: "An advanced computer vision system capable of identifying different dog breeds with high accuracy using Convolutional Neural Networks (CNNs).",
        techStack: ["Python", "TensorFlow", "CNN", "Deep Learning"],
        repo: "#",
        demo: "https://pawdentify-frontend.vercel.app",
        color: "from-orange-600/20 to-amber-500/20",
        hoverColor: "group-hover:from-orange-600/40 group-hover:to-amber-500/40",
        span: "md:col-span-1",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "stockease",
        title: "StockEase",
        category: "AI • Management",
        description: "Intelligent inventory management system.",
        longDescription: "An AI-enhanced inventory tracking system designed to optimize stock levels and reduce wastage through intelligent forecasting.",
        techStack: ["React", "Node.js", "AI Prediction"],
        repo: "#",
        demo: "https://codecrafters-stock-control-hub.lovable.app",
        color: "from-blue-600/20 to-indigo-500/20",
        hoverColor: "group-hover:from-blue-600/40 group-hover:to-indigo-500/40",
        span: "md:col-span-2",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/4483610/pexels-photo-4483610.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "diabetes-prediction",
        title: "Diabetes Prediction",
        category: "Machine Learning",
        description: "ML-based system for early diabetes detection.",
        longDescription: "A machine learning predictive model built to analyze health parameters and predict the likelihood of diabetes, deployed via Streamlit for easy access.",
        techStack: ["Python", "Scikit-Learn", "Streamlit", "ML"],
        repo: "#",
        demo: "https://diabetes-prediction-app0704.streamlit.app",
        color: "from-red-600/20 to-rose-500/20",
        hoverColor: "group-hover:from-red-600/40 group-hover:to-rose-500/40",
        span: "md:col-span-1",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/5726794/pexels-photo-5726794.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "learn-spark",
        title: "Learn Spark Academy",
        category: "EdTech • Voice AI",
        description: "Voice-First Educational Platform.",
        longDescription: "An interactive educational platform leveraging voice technology to enhance learning experiences for students.",
        techStack: ["React", "Speech Recognition", "Node.js"],
        repo: "#",
        demo: "https://learn-spark-academy-voice.lovable.app",
        color: "from-purple-600/20 to-violet-500/20",
        hoverColor: "group-hover:from-purple-600/40 group-hover:to-violet-500/40",
        span: "md:col-span-2",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/301920/pexels-photo-301920.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    },
    {
        id: "recipe-rescue",
        title: "Zero Waste Recipe Generator",
        category: "AI • Sustainability",
        description: "AI-powered platform to minimize food waste.",
        longDescription: "An intelligent application that generates unique recipes based on ingredients you already have at home, helping to reduce food waste and promote sustainable cooking.",
        techStack: ["React", "AI", "Node.js"],
        repo: "#",
        demo: "https://recipe-rescue-connect.lovable.app",
        color: "from-green-600/20 to-lime-500/20",
        hoverColor: "group-hover:from-green-600/40 group-hover:to-lime-500/40",
        span: "md:col-span-1",
        mediaType: "image",
        mediaUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
        demoUrl: "https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
    }
];

const INITIAL_VISIBLE_COUNT = 6;

export default function Projects() {
    const [mounted, setMounted] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [visibleCount, setVisibleCount] = useState<number>(INITIAL_VISIBLE_COUNT);

    // Derived data
    const visibleProjects = projects.slice(0, visibleCount);
    const selectedProject = projects.find((p) => p.id === selectedId);
    const hasMore = visibleCount < projects.length;

    useEffect(() => {
        setMounted(true);
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <section className="relative z-20 bg-[#0a0a0a] min-h-screen py-32 px-4 md:px-12 overflow-visible md:overflow-hidden" id="projects">
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
                        Selected <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-400 to-purple-400">Works</span>
                    </h2>
                    <p className="text-gray-400 text-lg max-w-2xl leading-relaxed">
                        A curated selection of projects demonstrating full-stack capabilities,
                        microservices architecture, and modern interface design.
                    </p>
                </motion.div>

                {/* Bento Grid Layout */}
                <motion.div layout>
                    {mounted && isMobile ? (
                        <div className="relative" style={{ perspective: '1000px' }}>
                            {visibleProjects.map((project, index) => (
                                <motion.div
                                    key={project.id}
                                    layoutId={project.id}
                                    onClick={() => setSelectedId(project.id)}
                                    initial={{ opacity: 0, y: 20, scale: Math.max(0.94, 1 - index * 0.03) }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.5, ease: "easeOut" }}
                                    className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md ${project.span}`}
                                    whileHover={{ scale: 1.015 }}
                                    style={{
                                        position: "sticky",
                                        top: "60px",
                                        minHeight: "70vh",
                                        maxHeight: "80vh",
                                        width: "100%",
                                        zIndex: index + 1,
                                        // progressive shadow for depth perception
                                        boxShadow: `0 ${index * 4}px ${12 + index * 4}px rgba(0,0,0,${0.15 + index * 0.07})`,
                                        // Push subsequent cards below viewport
                                        marginTop: index === 0 ? 0 : "80vh",
                                        // Scale and opacity for inactive cards
                                        transform: index === 0 ? "scale(1)" : "scale(0.95)",
                                        opacity: index === 0 ? 1 : 0.9,
                                    }}
                                >
                                    <img
                                        src={project.mediaUrl}
                                        alt={project.title}
                                        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                                    />
                                    <div className={`absolute inset-0 bg-linear-to-br ${project.color} ${project.hoverColor} transition-all duration-500 opacity-60 group-hover:opacity-80 mix-blend-overlay`} />
                                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                    <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                        <div className="flex justify-between items-start">
                                            <span className="inline-block px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-blue-300 backdrop-blur-md">
                                                {project.category}
                                            </span>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                                    <path d="M5 12h14M12 5l7 7-7 7" />
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="relative group/btn-container">
                                            <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform drop-shadow-lg">
                                                {project.title}
                                            </h3>
                                            <p className="text-gray-200 text-sm line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md pr-20">
                                                {project.description}
                                            </p>
                                            {project.demo !== "#" && (
                                                <div className="absolute bottom-0 right-0 z-20">
                                                    <div className="relative group/tooltip">
                                                        <motion.a
                                                            href={project.demo}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            onClick={(e) => e.stopPropagation()}
                                                            whileHover={{
                                                                scale: 1.1,
                                                                boxShadow: "0 0 20px rgba(255,255,255,0.3)"
                                                            }}
                                                            whileTap={{ scale: 0.95 }}
                                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold backdrop-blur-md transition-colors"
                                                        >
                                                            Live Demo
                                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                            </svg>
                                                        </motion.a>
                                                        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-30">
                                                            View Live Project
                                                        </span>
                                                    </div>
                                                </div>
                                            )}
                                            <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                                {project.techStack.slice(0, 3).map(t => (
                                                    <span key={t} className="text-[10px] uppercase tracking-wider text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(280px,auto)] grid-flow-dense">
                            <AnimatePresence mode="popLayout">
                                {visibleProjects.map((project, index) => (
                                    <motion.div
                                        key={project.id}
                                        layoutId={project.id}
                                        onClick={() => setSelectedId(project.id)}
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                                        viewport={{ once: true }}
                                        className={`group relative rounded-3xl overflow-hidden cursor-pointer border border-white/10 bg-white/5 backdrop-blur-md ${project.span}`}
                                        whileHover={{ scale: 1.015 }}
                                    >
                                        <img
                                            src={project.mediaUrl}
                                            alt={project.title}
                                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-700 group-hover:scale-110"
                                        />
                                        <div className={`absolute inset-0 bg-linear-to-br ${project.color} ${project.hoverColor} transition-all duration-500 opacity-60 group-hover:opacity-80 mix-blend-overlay`} />
                                        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-500" />
                                        <div className="absolute inset-0 opacity-[0.05] bg-[url('/noise.svg')]" />
                                        <div className="absolute inset-0 p-8 flex flex-col justify-between z-10">
                                            <div className="flex justify-between items-start">
                                                <span className="inline-block px-3 py-1 rounded-full bg-black/40 border border-white/10 text-xs font-mono text-blue-300 backdrop-blur-md">
                                                    {project.category}
                                                </span>
                                                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <div className="relative group/btn-container">
                                                <h3 className="text-2xl font-bold text-white mb-2 leading-tight group-hover:translate-x-1 transition-transform drop-shadow-lg">
                                                    {project.title}
                                                </h3>
                                                <p className="text-gray-200 text-sm line-clamp-3 leading-relaxed opacity-90 group-hover:opacity-100 transition-opacity drop-shadow-md pr-20">
                                                    {project.description}
                                                </p>
                                                {project.demo !== "#" && (
                                                    <div className="absolute bottom-0 right-0 z-20">
                                                        <div className="relative group/tooltip">
                                                            <motion.a
                                                                href={project.demo}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                onClick={(e) => e.stopPropagation()}
                                                                whileHover={{
                                                                    scale: 1.1,
                                                                    boxShadow: "0 0 20px rgba(255,255,255,0.3)"
                                                                }}
                                                                whileTap={{ scale: 0.95 }}
                                                                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold backdrop-blur-md transition-colors"
                                                            >
                                                                Live Demo
                                                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                                </svg>
                                                            </motion.a>
                                                            <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 z-30">
                                                                View Live Project
                                                            </span>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex flex-wrap gap-2 mt-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                                                    {project.techStack.slice(0, 3).map(t => (
                                                        <span key={t} className="text-[10px] uppercase tracking-wider text-white/80 bg-black/40 px-2 py-1 rounded backdrop-blur-sm border border-white/5">
                                                            {t}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </motion.div>
                    )}
                </motion.div>

                {/* Pagination Buttons */}
                <motion.div layout className="flex justify-center mt-12">
                    {hasMore ? (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setVisibleCount(prev => prev + 6)}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
                        >
                            View More Projects
                            <svg className="w-4 h-4 group-hover:translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </motion.button>
                    ) : projects.length > INITIAL_VISIBLE_COUNT && (
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => {
                                const projectsSection = document.getElementById('projects');
                                if (projectsSection) {
                                    projectsSection.scrollIntoView({ behavior: 'smooth' });
                                }
                                setVisibleCount(INITIAL_VISIBLE_COUNT);
                            }}
                            className="px-8 py-3 rounded-full bg-white/5 border border-white/10 text-white font-medium hover:bg-white/10 transition-colors backdrop-blur-md flex items-center gap-2 group"
                        >
                            Show Less
                            <svg className="w-4 h-4 group-hover:-translate-y-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                            </svg>
                        </motion.button>
                    )}
                </motion.div>

                {/* Enhanced Modal */}
                <AnimatePresence>
                    {selectedId && selectedProject && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedId(null)}
                                className="fixed inset-0 bg-black/80 backdrop-blur-xl z-60"
                            />
                            <div className="fixed inset-0 flex items-center justify-center z-70 pointer-events-auto p-4 md:p-8">
                                <motion.div
                                    layoutId={selectedId}
                                    className="bg-[#121212] w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-4xl border border-white/10 shadow-2xl relative scrollbar-hide"
                                >
                                    <button
                                        onClick={() => setSelectedId(null)}
                                        className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white/70 hover:text-white transition-colors border border-white/10"
                                    >
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>

                                    <div className="flex flex-col md:flex-row h-full">
                                        { /* Visual Side - Prioritize 'demoUrl', fallback to 'mediaUrl' */}
                                        <div className={`w-full md:w-2/5 min-h-[300px] relative overflow-hidden flex flex-col justify-end p-8`}>
                                            <img
                                                src={selectedProject.demoUrl || selectedProject.mediaUrl}
                                                alt={selectedProject.title}
                                                className="absolute inset-0 w-full h-full object-cover opacity-80"
                                            />
                                            <div className={`absolute inset-0 bg-linear-to-b ${selectedProject.color} mix-blend-overlay opacity-80`} />
                                            <div className="absolute inset-0 bg-black/20" />

                                            <motion.span
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.2 }}
                                                className="relative z-10 inline-block px-3 py-1 rounded-full bg-black/40 text-xs font-mono text-white mb-4 w-fit border border-white/10 backdrop-blur-md"
                                            >
                                                {selectedProject.category}
                                            </motion.span>
                                            <motion.h3
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                                className="relative z-10 text-4xl font-bold text-white leading-none tracking-tight drop-shadow-xl"
                                            >
                                                {selectedProject.title}
                                            </motion.h3>
                                        </div>

                                        {/* Content Side */}
                                        <div className="w-full md:w-3/5 p-8 md:p-12 bg-[#121212]">
                                            <motion.div
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">About the project</h4>
                                                <p className="text-gray-300 leading-relaxed mb-8 text-lg">
                                                    {selectedProject.longDescription}
                                                </p>

                                                <div className="mb-10">
                                                    <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Core Technologies</h4>
                                                    <div className="flex flex-wrap gap-2">
                                                        {selectedProject.techStack.map((tech, i) => (
                                                            <motion.span
                                                                key={tech}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.5 + (i * 0.05) }}
                                                                className="px-4 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-sm text-gray-200 border border-white/5 transition-colors cursor-default"
                                                            >
                                                                {tech}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="flex gap-4 pt-4 border-t border-white/10">
                                                    <a
                                                        href={selectedProject.repo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 py-4 rounded-xl bg-white text-black font-bold text-center hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                                                    >
                                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                                                        View Code
                                                    </a>
                                                    <a
                                                        href={selectedProject.demo}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex-1 py-4 rounded-xl bg-white/5 text-white font-bold text-center hover:bg-white/10 transition-colors border border-white/10 flex items-center justify-center gap-2"
                                                    >
                                                        Live Demo
                                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                                    </a>
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
}
