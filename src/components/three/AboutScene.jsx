import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';

function TerminalWindow() {
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.1;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.05;
    }
  });

  return (
    <Float speed={1} rotationIntensity={0.3} floatIntensity={0.5}>
      <group ref={groupRef}>
        {/* Terminal body */}
        <RoundedBox args={[3, 2, 0.1]} radius={0.1} smoothness={4}>
          <meshPhysicalMaterial
            color="#1e1e2e"
            transparent
            opacity={0.9}
            roughness={0.1}
            metalness={0.5}
          />
        </RoundedBox>
        {/* Terminal header */}
        <RoundedBox args={[3, 0.3, 0.12]} radius={0.05} smoothness={4} position={[0, 0.85, 0.02]}>
          <meshPhysicalMaterial color="#2d2d3f" roughness={0.3} />
        </RoundedBox>
        {/* Traffic lights */}
        <mesh position={[-1.2, 0.85, 0.08]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#ff5f57" />
        </mesh>
        <mesh position={[-1, 0.85, 0.08]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#febc2e" />
        </mesh>
        <mesh position={[-0.8, 0.85, 0.08]}>
          <sphereGeometry args={[0.06, 16, 16]} />
          <meshBasicMaterial color="#28c840" />
        </mesh>
        {/* Code lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <RoundedBox
            key={i}
            args={[1.5 + Math.random() * 0.8, 0.08, 0.02]}
            radius={0.02}
            smoothness={2}
            position={[-0.3 + Math.random() * 0.2, 0.4 - i * 0.25, 0.06]}
          >
            <meshBasicMaterial
              color={['#6366f1', '#06b6d4', '#8b5cf6', '#22c55e', '#f59e0b'][i]}
              transparent
              opacity={0.6}
            />
          </RoundedBox>
        ))}
      </group>
    </Float>
  );
}

export default function AboutScene() {
  return (
    <group>
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#6366f1" />
      <pointLight position={[-5, -5, 5]} intensity={0.4} color="#06b6d4" />
      <TerminalWindow />
    </group>
  );
}
