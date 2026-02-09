import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';

function FloatingCard({ position, color, delay = 0 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.2;
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.5 + delay) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={position}>
      <RoundedBox args={[1.2, 0.8, 0.05]} radius={0.05} smoothness={4}>
        <meshPhysicalMaterial
          color={color}
          transparent
          opacity={0.3}
          roughness={0.1}
          metalness={0.5}
        />
      </RoundedBox>
    </mesh>
  );
}

export default function ProjectCarousel() {
  return (
    <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.3}>
      <group>
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={0.6} color="#6366f1" />
        <FloatingCard position={[-1.5, 0, 0]} color="#6366f1" delay={0} />
        <FloatingCard position={[0, 0.5, -0.5]} color="#06b6d4" delay={1} />
        <FloatingCard position={[1.5, -0.2, 0.3]} color="#8b5cf6" delay={2} />
      </group>
    </Float>
  );
}
