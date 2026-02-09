import { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { motion } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import ProjectCard from '../ui/ProjectCard';
import ProjectCarousel from '../three/ProjectCarousel';
import projectsData from '../../data/projects.json';

const ITEMS_PER_PAGE = 6;

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);

  const categories = ['All', ...new Set(projectsData.map(p => p.category))];

  const filtered = activeCategory === 'All'
    ? projectsData
    : projectsData.filter(p => p.category === activeCategory);

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <section id="projects" className="relative py-24 px-4">
      {/* 3D Background */}
      <div className="absolute top-0 right-0 w-80 h-80 opacity-30 pointer-events-none hidden lg:block">
        <Suspense fallback={null}>
          <Canvas camera={{ position: [0, 0, 4] }}>
            <ProjectCarousel />
          </Canvas>
        </Suspense>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <SectionHeading
          title="Projects"
          subtitle="A collection of projects that showcase my passion for building and learning"
        />

        {/* Category Filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-2 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setVisibleCount(ITEMS_PER_PAGE);
              }}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-primary text-white shadow-lg shadow-primary/25'
                  : 'bg-primary/10 text-primary hover:bg-primary/20'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Project Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {/* Load More */}
        {hasMore && (
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <button
              onClick={() => setVisibleCount(prev => prev + ITEMS_PER_PAGE)}
              className="px-8 py-3 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
            >
              Load More Projects
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
