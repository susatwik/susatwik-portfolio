/* eslint-disable react/no-unknown-property */
'use client';
import { useRef, useEffect, useState, useMemo } from 'react';
import { Canvas, extend, useFrame } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import { BallCollider, CuboidCollider, Physics, RigidBody, useRopeJoint, useSphericalJoint, RapierRigidBody } from '@react-three/rapier';
import { MeshLineGeometry, MeshLineMaterial } from 'meshline';
import * as THREE from 'three';
import './Lanyard.css';
import CardModel from './CardModel';

extend({ MeshLineGeometry, MeshLineMaterial });

export default function LanyardCanvas({ 
  position = [0, 0, 15] as [number, number, number], 
  gravity = [0, -9.81, 0] as [number, number, number], 
  fov = 25, 
  transparent = true 
}) {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    setIsMobile(window.innerWidth < 768);
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  if (!mounted) return <div className="lanyard-wrapper" style={{ width: '100%', height: '100%' }} />;

  return (
    <div className="lanyard-wrapper" style={{ width: '100%', height: '100%', pointerEvents: 'auto' }}>
      <Canvas
        camera={{ position: position, fov: fov }}
        dpr={[1, 2]}
        frameloop="always"
        gl={{ alpha: transparent, antialias: true }}
        onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), transparent ? 0 : 1)}
      >
        <ambientLight intensity={1.5} />
        <Physics gravity={gravity} timeStep={1 / 60}>
          <Band isMobile={isMobile} />
        </Physics>
        
        {/* Localized Glow */}
        <pointLight position={[5, 5, 5]} intensity={50} color="#6366f1" />
        <pointLight position={[-5, -5, 5]} intensity={30} color="#818cf8" />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}

function Band({ maxSpeed = 50, minSpeed = 0, isMobile = false }) {
  const band = useRef<any>(null),
    fixed = useRef<RapierRigidBody>(null!),
    j1 = useRef<RapierRigidBody>(null!),
    j2 = useRef<RapierRigidBody>(null!),
    j3 = useRef<RapierRigidBody>(null!),
    card = useRef<RapierRigidBody>(null!);
  
  const vec = new THREE.Vector3();
  const dir = new THREE.Vector3();
  const segmentProps = { type: 'dynamic', canSleep: true, colliders: false, angularDamping: 2, linearDamping: 2 } as any;

  const [curve] = useState(() => new THREE.CatmullRomCurve3([new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3(), new THREE.Vector3()]));
  const [dragged, drag] = useState<THREE.Vector3 | false>(false);
  const [hovered, hover] = useState(false);

  // 1. Multi-color Lanyard Texture
  const strapTexture = useMemo(() => {
    if (typeof window === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 32;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const grad = ctx.createLinearGradient(0, 0, 512, 0);
    grad.addColorStop(0, '#6366f1');   // Indigo
    grad.addColorStop(0.25, '#818cf8'); // Light Indigo
    grad.addColorStop(0.5, '#4f46e5');  // Deep Blue
    grad.addColorStop(0.75, '#c084fc'); // Purple
    grad.addColorStop(1, '#6366f1');    // Back to Indigo

    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 512, 32);

    // Add subtle pattern
    ctx.strokeStyle = 'rgba(255,255,255,0.1)';
    ctx.lineWidth = 2;
    for (let i = 0; i < 512; i += 20) {
      ctx.beginPath(); ctx.moveTo(i, 0); ctx.lineTo(i + 10, 32); ctx.stroke();
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.wrapS = THREE.RepeatWrapping;
    tex.repeat.set(5, 1);
    return tex;
  }, []);

  // Joints
  useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
  useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
  useSphericalJoint(j3, card, [[0, 0, 0], [0, 1.5, 0]]);

  useEffect(() => {
    if (hovered) {
      document.body.style.cursor = dragged ? 'grabbing' : 'grab';
      return () => void (document.body.style.cursor = 'auto');
    }
  }, [hovered, dragged]);

  useFrame((state, delta) => {
    const t = state.clock.elapsedTime;
    if (!card.current || !j1.current || !j2.current || !j3.current || !fixed.current) return;

    if (dragged) {
      vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
      dir.copy(vec).sub(state.camera.position).normalize();
      vec.add(dir.multiplyScalar(state.camera.position.length()));
      [card, j1, j2, j3, fixed].forEach(ref => ref.current?.wakeUp());
      card.current?.setNextKinematicTranslation({ x: vec.x - dragged.x, y: vec.y - dragged.y, z: vec.z - dragged.z });
    } else {
      // 2. Idle Motion: Gentle oscillation and rotational drift
      const angVel = card.current.angvel();
      card.current.setAngvel({
        x: angVel.x * 0.98 + Math.sin(t) * 0.01,
        y: angVel.y * 0.98 + Math.cos(t * 0.8) * 0.01,
        z: angVel.z * 0.98 + Math.sin(t * 1.2) * 0.01
      }, true);

      // Subtle force for vertical oscillation
      card.current.applyImpulse({ x: 0, y: Math.sin(t * 2) * 0.05, z: 0 }, true);
    }

    if (fixed.current) {
      [j1, j2].forEach(ref => {
        const trans = ref.current.translation();
        if (!(ref.current as any).lerped) (ref.current as any).lerped = new THREE.Vector3().copy(trans);
        const clampedDistance = Math.max(0.1, Math.min(1, (ref.current as any).lerped.distanceTo(trans)));
        (ref.current as any).lerped.lerp(trans, delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)));
      });
      curve.points[0].copy(j3.current.translation());
      curve.points[1].copy((j2.current as any).lerped);
      curve.points[2].copy((j1.current as any).lerped);
      curve.points[3].copy(fixed.current.translation());
      band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
    }

    if (strapTexture) {
      strapTexture.offset.x -= delta * 0.1; // Slow scrolling pattern
    }
  });

  return (
    <>
      <group position={[0, 4, 0]}>
        <RigidBody ref={fixed} {...segmentProps} type="fixed" />
        <RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
          <BallCollider args={[0.1]} />
        </RigidBody>
        <RigidBody 
          position={[2, 0, 0]} 
          ref={card} 
          {...segmentProps} 
          type={dragged ? 'kinematicPosition' : 'dynamic'}
          colliders={false}
        >
          <CuboidCollider args={[0.6, 0.85, 0.05]} />
          <group
            scale={3.2}
            position={[0, -1.15, 0]}
            onPointerOver={() => hover(true)}
            onPointerOut={() => hover(false)}
            onPointerUp={e => ((e.target as any).releasePointerCapture(e.pointerId), drag(false))}
            onPointerDown={e => (
              (e.target as any).setPointerCapture(e.pointerId),
              drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current?.translation() || new THREE.Vector3())))
            )}
          >
            <CardModel />
          </group>
        </RigidBody>
      </group>
      <mesh ref={band}>
        {/* @ts-ignore */}
        <meshLineGeometry />
        {/* @ts-ignore */}
        <meshLineMaterial
          useMap={1}
          map={strapTexture}
          color="white"
          depthTest={false}
          resolution={isMobile ? [1000, 2000] : [1000, 1000]}
          lineWidth={2}
          transparent
        />
      </mesh>
    </>
  );
}
