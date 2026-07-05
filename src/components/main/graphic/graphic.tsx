"use client";

import { useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Component, ReactNode, useEffect, useRef, useState } from "react";
import * as THREE from "three";

const canCreateWebGLContext = () => {
  try {
    const canvas = document.createElement("canvas");
    return Boolean(
      canvas.getContext("webgl2") ||
        canvas.getContext("webgl") ||
        canvas.getContext("experimental-webgl")
    );
  } catch {
    return false;
  }
};

const GraphicFallback = () => {
  return (
    <div
      aria-hidden='true'
      className='flex h-full w-full items-center justify-center overflow-hidden'
    >
      <div className='relative size-56 sm:size-72'>
        <div className='absolute inset-7 rounded-[2.4rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.92),rgba(236,253,245,0.72),rgba(245,245,245,0.9))] shadow-[0_34px_90px_rgba(15,23,42,0.14),inset_0_1px_1px_rgba(255,255,255,0.9)] ring-1 ring-neutral-950/5 dark:bg-[linear-gradient(135deg,rgba(39,39,42,0.9),rgba(20,83,45,0.28),rgba(10,10,10,0.9))] dark:ring-white/10' />
        <div className='absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[conic-gradient(from_130deg,rgba(22,163,74,0.28),rgba(255,255,255,0.78),rgba(15,23,42,0.18),rgba(22,163,74,0.22))] blur-[1px] dark:bg-[conic-gradient(from_130deg,rgba(74,222,128,0.25),rgba(255,255,255,0.18),rgba(255,255,255,0.06),rgba(74,222,128,0.2))]' />
        <div className='absolute left-1/2 top-1/2 h-16 w-48 -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] rounded-full bg-[linear-gradient(115deg,#111827,#3f3f46_48%,#f4f4f5_49%,#18181b_62%,#52525b)] p-[1px] shadow-[0_24px_55px_rgba(15,23,42,0.22)] dark:bg-[linear-gradient(115deg,#f8fafc,#a1a1aa_48%,#111827_49%,#f8fafc_62%,#71717a)]'>
          <div className='h-full w-full rounded-full bg-white/96 dark:bg-neutral-950/95' />
        </div>
        <div className='absolute left-1/2 top-1/2 h-14 w-44 -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-full bg-[linear-gradient(115deg,rgba(22,163,74,0.28),rgba(15,23,42,0.34),rgba(244,244,245,0.78),rgba(15,23,42,0.26))] p-[1px] opacity-90 shadow-[0_18px_45px_rgba(15,23,42,0.12)] dark:bg-[linear-gradient(115deg,rgba(74,222,128,0.25),rgba(255,255,255,0.28),rgba(24,24,27,0.9),rgba(255,255,255,0.16))]'>
          <div className='h-full w-full rounded-full bg-white/80 dark:bg-neutral-950/80' />
        </div>
        <div className='absolute left-12 top-12 size-3 rounded-full bg-green-700/50 shadow-[0_0_30px_rgba(22,163,74,0.45)] dark:bg-green-300/60' />
        <div className='absolute bottom-12 right-14 size-2 rounded-full bg-neutral-950/25 dark:bg-white/30' />
      </div>
    </div>
  );
};

class GraphicErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: unknown) {
    console.error("Graphic WebGL fallback rendered", error);
  }

  render() {
    if (this.state.hasError) return <GraphicFallback />;
    return this.props.children;
  }
}

export const GraphicMesh = () => {
  const torusKnotRef = useRef<THREE.Mesh>(null);
  const matcap1 = useTexture("/main/images/matcap1.jpg");

  useFrame((state, delta) => {
    if (!torusKnotRef.current) return;
    torusKnotRef.current.rotation.x += delta;
  });

  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh ref={torusKnotRef}>
        <torusKnotGeometry args={[0.5, 0.2]} />
        <meshMatcapMaterial matcap={matcap1} flatShading />
      </mesh>
    </>
  );
};

export const Graphic = () => {
  const [isWebGLAvailable, setIsWebGLAvailable] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    setIsWebGLAvailable(canCreateWebGLContext());
  }, []);

  if (!isWebGLAvailable) {
    return <GraphicFallback />;
  }

  return (
    <GraphicErrorBoundary>
      <Canvas
        flat
        linear
        camera={{
          near: 1,
          fov: 30,
          position: [5, 5, 5],
        }}
      >
        <ambientLight intensity={1} />
        <GraphicMesh />
      </Canvas>
    </GraphicErrorBoundary>
  );
};
