import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';

function AnimatedMesh() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.3;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh ref={meshRef} scale={1.8}>
        <icosahedronGeometry args={[1, 1]} />
        <MeshDistortMaterial
          color="#6366f1"
          transparent
          opacity={0.8}
          wireframe
          distort={0.3}
          speed={2}
        />
      </mesh>
    </Float>
  );
}

function GlowSphere() {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
      <mesh scale={2.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color="#6366f1" transparent opacity={0.05} />
      </mesh>
    </Float>
  );
}

export default function HeroScene() {
  return (
    <group>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
      <AnimatedMesh />
      <GlowSphere />
    </group>
  );
}
