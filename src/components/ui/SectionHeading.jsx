import { motion } from 'framer-motion';

export default function SectionHeading({ title, subtitle, className = '' }) {
  return (
    <motion.div
      className={`text-center mb-16 ${className}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-4xl md:text-5xl font-bold mb-4">
        <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          {title}
        </span>
      </h2>
      {subtitle && (
        <p className="text-muted-light dark:text-muted-dark text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
