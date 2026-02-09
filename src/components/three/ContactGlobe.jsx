import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere } from '@react-three/drei';

function NetworkNode({ position, color = '#6366f1' }) {
  return (
    <mesh position={position}>
      <sphereGeometry args={[0.04, 8, 8]} />
      <meshBasicMaterial color={color} />
    </mesh>
  );
}

export default function ContactGlobe() {
  const globeRef = useRef();

  useFrame((state) => {
    if (globeRef.current) {
      globeRef.current.rotation.y = state.clock.elapsedTime * 0.15;
    }
  });

  const nodes = Array.from({ length: 40 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 40);
    const theta = Math.sqrt(40 * Math.PI) * phi;
    const r = 1.5;
    return [
      r * Math.cos(theta) * Math.sin(phi),
      r * Math.sin(theta) * Math.sin(phi),
      r * Math.cos(phi),
    ];
  });

  return (
    <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={globeRef}>
        <ambientLight intensity={0.5} />
        <pointLight position={[3, 3, 3]} intensity={0.6} color="#6366f1" />
        
        {/* Globe wireframe */}
        <Sphere args={[1.5, 24, 24]}>
          <meshBasicMaterial color="#6366f1" wireframe transparent opacity={0.15} />
        </Sphere>
        
        {/* Inner glow */}
        <Sphere args={[1.45, 16, 16]}>
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.05} />
        </Sphere>
        
        {/* Network nodes */}
        {nodes.map((pos, i) => (
          <NetworkNode
            key={i}
            position={pos}
            color={i % 3 === 0 ? '#06b6d4' : '#6366f1'}
          />
        ))}
      </group>
    </Float>
  );
}
