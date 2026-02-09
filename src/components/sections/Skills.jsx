import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import SkillSphere from '../three/SkillSphere';
import skillsData from '../../data/skills.json';

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Skills"
          subtitle="Technologies and tools I work with"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* 3D Skill Sphere */}
          <motion.div
            className="h-[400px] hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 6] }}>
                <SkillSphere skills={skillsData.categories} />
              </Canvas>
            </Suspense>
          </motion.div>

          {/* Skill Categories */}
          <div className="space-y-8">
            {skillsData.categories.map((category, catIndex) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: catIndex * 0.1 }}
              >
                <h3 className="text-lg font-bold mb-3 text-primary">{category.name}</h3>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 cursor-default"
                      style={{
                        background: 'rgba(99,102,241,0.1)',
                        border: '1px solid rgba(99,102,241,0.2)',
                      }}
                      whileHover={{
                        scale: 1.05,
                        background: 'rgba(99,102,241,0.2)',
                      }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
