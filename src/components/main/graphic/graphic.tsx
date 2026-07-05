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
      className='flex h-full w-full items-center justify-center'
    >
      <div className='relative size-44 sm:size-56'>
        <div className='absolute inset-0 rounded-full border-[18px] border-neutral-950/10 shadow-[inset_0_0_38px_rgba(15,23,42,0.08)] dark:border-white/10' />
        <div className='absolute inset-8 rounded-full border-[16px] border-green-700/20 dark:border-green-300/20' />
        <div className='absolute left-1/2 top-1/2 h-16 w-44 -translate-x-1/2 -translate-y-1/2 rotate-[-28deg] rounded-full border-[16px] border-neutral-950/70 shadow-[0_22px_60px_rgba(15,23,42,0.16)] dark:border-white/70' />
        <div className='absolute left-1/2 top-1/2 h-12 w-36 -translate-x-1/2 -translate-y-1/2 rotate-[28deg] rounded-full border-[12px] border-neutral-950/35 dark:border-white/35' />
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
