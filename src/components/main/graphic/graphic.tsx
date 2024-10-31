"use client";

import { OrbitControls, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

export const GraphicMesh = () => {
  const torusKnotRef = useRef<THREE.Mesh>(null);
  // 이미지 경로
  const matcap1 = useTexture("./main/images/matcap1.jpg");

  useFrame((state, delta) => {
    if (!torusKnotRef.current) return;
    torusKnotRef.current.rotation.x += delta;
  });

  return (
    <>
      <directionalLight position={[5, 5, 5]} intensity={1} />
      <mesh ref={torusKnotRef}>
        <torusKnotGeometry args={[0.5, 0.2]} />

        <meshMatcapMaterial matcap={matcap1} flatShading={true} />
      </mesh>
    </>
  );
};

export const Graphic = () => {
  return (
    <Canvas
      flat
      linear
      camera={{
        near: 1,
        fov: 30,
        // far: 100,
        position: [5, 5, 5],
      }}
    >
      <OrbitControls />
      <ambientLight intensity={1} />

      <GraphicMesh />
    </Canvas>
  );
};
