import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float } from '@react-three/drei';
import * as THREE from 'three';

function SkillWord({ text, position, color }) {
  return (
    <Text
      position={position}
      fontSize={0.2}
      color={color}
      anchorX="center"
      anchorY="middle"
    >
      {text}
    </Text>
  );
}

export default function SkillSphere({ skills = [] }) {
  const groupRef = useRef();

  const allSkills = useMemo(() => {
    const flatSkills = skills.flatMap(cat => cat.skills);
    return flatSkills.slice(0, 30);
  }, [skills]);

  const positions = useMemo(() => {
    const radius = 2.5;
    return allSkills.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i) / allSkills.length);
      const theta = Math.sqrt(allSkills.length * Math.PI) * phi;
      return new THREE.Vector3(
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
      );
    });
  }, [allSkills]);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
  });

  const colors = ['#6366f1', '#06b6d4', '#8b5cf6', '#ec4899', '#f59e0b'];

  return (
    <Float speed={0.5} rotationIntensity={0.2} floatIntensity={0.5}>
      <group ref={groupRef}>
        <ambientLight intensity={0.8} />
        {allSkills.map((skill, i) => (
          <SkillWord
            key={skill}
            text={skill}
            position={[positions[i].x, positions[i].y, positions[i].z]}
            color={colors[i % colors.length]}
          />
        ))}
        {/* Central sphere */}
        <mesh>
          <sphereGeometry args={[0.3, 16, 16]} />
          <meshBasicMaterial color="#6366f1" transparent opacity={0.2} />
        </mesh>
      </group>
    </Float>
  );
}
