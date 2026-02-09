import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import AboutScene from '../three/AboutScene';
import personal from '../../data/personal';

export default function About() {
  return (
    <section id="about" className="relative py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="About Me"
          subtitle="My journey in computer science and beyond"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-lg leading-relaxed text-muted-light dark:text-muted-dark mb-8">
              {personal.bio}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {personal.stats.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="text-center p-4 rounded-xl"
                  style={{
                    background: 'rgba(99,102,241,0.05)',
                    border: '1px solid rgba(99,102,241,0.1)',
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <div className="text-2xl font-bold text-primary">{stat.value}</div>
                  <div className="text-xs text-muted-light dark:text-muted-dark mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Timeline */}
            <div className="space-y-4">
              {personal.timeline.map((item, i) => (
                <motion.div
                  key={item.year}
                  className="flex gap-4 items-start"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 }}
                >
                  <div className="flex-shrink-0 w-16 text-right">
                    <span className="font-mono font-bold text-primary">{item.year}</span>
                  </div>
                  <div className="flex-shrink-0 w-px bg-primary/30 self-stretch" />
                  <div>
                    <h4 className="font-semibold">{item.title}</h4>
                    <p className="text-sm text-muted-light dark:text-muted-dark">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* 3D Scene */}
          <motion.div
            className="h-[400px] hidden lg:block"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Suspense fallback={null}>
              <Canvas camera={{ position: [0, 0, 4] }}>
                <AboutScene />
              </Canvas>
            </Suspense>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
