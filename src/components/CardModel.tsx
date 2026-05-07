"use client";

import React, { useMemo, useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function CardModel({ profileImg = "/profile.png" }: { profileImg?: string }) {
  const [imgElement, setImgElement] = useState<HTMLImageElement | null>(null);

  useEffect(() => {
    const img = new Image();
    img.src = profileImg;
    img.crossOrigin = "anonymous";
    img.onload = () => setImgElement(img);
    img.onerror = () => console.warn("Failed to load profile image:", profileImg);
  }, [profileImg]);

  // Base Texture (Card Design)
  const texture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement("canvas");
    canvas.width = 1024;
    canvas.height = 1440;
    const ctx = canvas.getContext("2d");
    if (!ctx) return new THREE.CanvasTexture(canvas);

    // 1. Background - Deep Dark Matte
    ctx.fillStyle = "#0a0a0c";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // 2. Premium Gradient / Glassmorphism Base
    const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
    grad.addColorStop(0, "rgba(255, 255, 255, 0.05)");
    grad.addColorStop(0.5, "rgba(99, 102, 241, 0.1)");
    grad.addColorStop(1, "rgba(255, 255, 255, 0.05)");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // 3. Grid Pattern (Subtle)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.03)";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 50) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i, canvas.height); ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 50) {
      ctx.beginPath(); ctx.moveTo(0, i); ctx.lineTo(canvas.width, i); ctx.stroke();
    }

    // 4. Photo Area (Clipped Oval)
    ctx.save();
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, 470, 340, 400, 0, 0, Math.PI * 2);
    ctx.clip();
    
    // Add a subtle dark base to the portrait area
    ctx.fillStyle = "rgba(10, 10, 15, 0.4)";
    ctx.fill();

    if (imgElement) {
      const aspect = imgElement.width / imgElement.height;
      const targetWidth = 680;
      const targetHeight = 800;
      const frameAspect = targetWidth / targetHeight;
      const scale = 1.0; 
      
      let drawW, drawH;
      // 'object-cover' approach for arbitrary frame aspect ratio
      if (aspect > frameAspect) {
        drawH = targetHeight * scale; 
        drawW = drawH * aspect;
      } else {
        drawW = targetWidth * scale; 
        drawH = drawW / aspect;
      }
      
      // Center horizontally
      const x = canvas.width / 2 - drawW / 2;
      
      let y;
      if (aspect > frameAspect) {
        // Center vertically for landscape
        y = 470 - drawH / 2;
      } else {
        // For portrait, implement 'object-position: center 20%'
        const topOfFrame = 470 - 400;
        const extraHeight = drawH - targetHeight;
        y = topOfFrame - (extraHeight * 0.20);
      }
      
      ctx.drawImage(imgElement, x, y, drawW, drawH);
    } else {
      ctx.fillStyle = "#1e1e2e";
      ctx.fill();
    }
    ctx.restore();

    // 5. Photo Ring
    const ringGrad = ctx.createLinearGradient(0, 70, 0, 870);
    ringGrad.addColorStop(0, "#818cf8");
    ringGrad.addColorStop(1, "#6366f1");
    ctx.strokeStyle = ringGrad;
    ctx.lineWidth = 15;
    ctx.beginPath();
    ctx.ellipse(canvas.width / 2, 470, 345, 405, 0, 0, Math.PI * 2);
    ctx.stroke();

    // 6. Text Elements
    ctx.textAlign = "center";
    
    // Name
    ctx.font = "bold 80px 'Inter', sans-serif";
    ctx.fillStyle = "#ffffff";
    ctx.shadowColor = "rgba(0,0,0,0.5)";
    ctx.shadowBlur = 10;
    ctx.fillText("MANURI SUSATWIK", canvas.width / 2, 1030);
    ctx.shadowBlur = 0;

    // Role
    ctx.font = "500 45px 'Inter', sans-serif";
    ctx.fillStyle = "#94a3b8";
    ctx.fillText("Full Stack & AI Developer", canvas.width / 2, 1100);

    // Decorative Separator
    ctx.fillStyle = "rgba(99, 102, 241, 0.3)";
    ctx.fillRect(canvas.width / 2 - 150, 1150, 300, 4);

    // QR Code Placeholder Area (Modern Look)
    ctx.strokeStyle = "rgba(255, 255, 255, 0.1)";
    ctx.setLineDash([10, 10]);
    ctx.strokeRect(canvas.width / 2 - 75, 1190, 150, 150);
    ctx.setLineDash([]);
    
    ctx.font = "bold 35px 'Inter', sans-serif";
    ctx.fillStyle = "rgba(99, 102, 241, 0.7)";
    ctx.fillText("VERIFIED ACCESS", canvas.width / 2, 1390);

    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, [imgElement]);

  const holoRef = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (holoRef.current) {
      holoRef.current.position.z = 0.035 + Math.sin(state.clock.elapsedTime * 2) * 0.001;
    }
  });

  return (
    <group>
      {/* 1. Hardware: Top Clamp & Ring */}
      <mesh position={[0, 0.72, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.12, 32]} />
        <meshStandardMaterial color="#444" metalness={1} roughness={0.1} />
      </mesh>
      <mesh position={[0, 0.82, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[0.08, 0.015, 16, 32]} />
        <meshStandardMaterial color="#666" metalness={1} roughness={0.1} />
      </mesh>

      {/* 2. Card Body: Thin Box with thickness */}
      <mesh>
        <boxGeometry args={[1, 1.4, 0.05]} />
        <meshStandardMaterial 
          attach="material-0" // Side
          color="#111" metalness={0.9} roughness={0.1} 
        />
        <meshStandardMaterial 
          attach="material-1" // Side
          color="#111" metalness={0.9} roughness={0.1} 
        />
        <meshStandardMaterial 
          attach="material-2" // Side
          color="#111" metalness={0.9} roughness={0.1} 
        />
        <meshStandardMaterial 
          attach="material-3" // Side
          color="#111" metalness={0.9} roughness={0.1} 
        />
        <meshStandardMaterial 
          attach="material-4" // Front
          map={texture || undefined} metalness={0.8} roughness={0.15} 
        />
        <meshStandardMaterial 
          attach="material-5" // Back
          map={texture || undefined} metalness={0.8} roughness={0.15} 
        />
      </mesh>

      {/* 3. Holographic Overlay (Front) */}
      <mesh ref={holoRef} position={[0, 0, 0.026]}>
        <planeGeometry args={[0.95, 1.35]} />
        <meshStandardMaterial 
          transparent 
          opacity={0.15} 
          color="#6366f1"
          metalness={1}
          roughness={0}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* 4. Edge Glow (Subtle) */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[1.02, 1.42, 0.06]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.03} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}
