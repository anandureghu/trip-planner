"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useRef, useEffect, useMemo } from "react";

export default function CubeLoader() {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Canvas>
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <VideoCube />
      </Canvas>
    </div>
  );
}

function VideoCube() {
  const meshRef = useRef<THREE.Mesh>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = document.createElement("video");
    video.src = "/gradient.webm";
    video.crossOrigin = "anonymous";
    video.loop = true;
    video.muted = true;
    video.play();
    videoRef.current = video;
  }, []);

  const videoTexture = useMemo(() => {
    if (!videoRef.current) return null;
    return new THREE.VideoTexture(videoRef.current);
  }, [videoRef.current]);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  if (!videoTexture) return null;

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial map={videoTexture} />
    </mesh>
  );
}
