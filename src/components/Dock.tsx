"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

// Icons (Using simple SVGs or lucid-react if available, but I'll use SVG here for zero-deps)
const Icons = {
  Home: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" /></svg>
  ),
  Code: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>
  ),
  Zap: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>
  ),
  Compass: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10" /><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" /></svg>
  ),
  Star: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
  ),
  BookOpen: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" /></svg>
  ),
  Mail: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><rect width="20" height="16" x="2" y="4" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
  ),
  User: (props: any) => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg>
  ),
};

const DOCK_ITEMS = [
  { id: "home", icon: Icons.Home, label: "Home", href: "#home" },
  { id: "about", icon: Icons.User, label: "About", href: "#about" },
  { id: "projects", icon: Icons.Code, label: "Projects", href: "#projects" },
  { id: "testimonials", icon: Icons.Star, label: "Testimonials", href: "#testimonials" },
  { id: "blog", icon: Icons.BookOpen, label: "Blog", href: "#blog" },
  { id: "skills", icon: Icons.Zap, label: "Skills", href: "#skills" },
  { id: "journey", icon: Icons.Compass, label: "Journey", href: "#journey" },
  { id: "work-together", icon: Icons.Mail, label: "Let's Work Together", href: "#contact" },
];

export default function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-[95vw] sm:max-w-none flex justify-center pointer-events-none">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="flex h-12 sm:h-16 items-end gap-1.5 sm:gap-4 rounded-2xl border border-white/10 bg-white/5 px-2 sm:px-4 pb-1.5 sm:pb-3 backdrop-blur-md overflow-x-auto sm:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] pointer-events-auto"
      >
        {DOCK_ITEMS.map((item) => (
          <DockIcon key={item.id} mouseX={mouseX} item={item} />
        ))}
      </motion.div>
    </div>
  );
}

function DockIcon({
  mouseX,
  item,
}: {
  mouseX: MotionValue;
  item: (typeof DOCK_ITEMS)[0];
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, (val) => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 640;
    const baseW = isMobile ? 32 : 40;
    const maxW = isMobile ? 40 : 80;

    const absVal = Math.abs(val);
    if (absVal > 150) return baseW;
    const percentage = 1 - absVal / 150;
    return baseW + percentage * (maxW - baseW);
  });

  const width = useSpring(widthSync, { mass: 0.1, stiffness: 150, damping: 12 });

  return (
    <Link href={item.href} className="shrink-0">
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square rounded-full bg-gray-700/50 border border-white/10 flex items-center justify-center hover:bg-gray-600/80 transition-colors group relative"
      >
        <item.icon className="w-1/2 h-1/2 text-gray-200 group-hover:text-white" />

        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10 hidden sm:block">
          {item.label}
        </span>
      </motion.div>
    </Link>
  );
}
