import { motion } from 'framer-motion';

export default function GlassCard({ children, className = '', hover = true, ...props }) {
  return (
    <motion.div
      className={`rounded-2xl p-6 glass-light dark:glass-dark shadow-lg ${hover ? 'hover:shadow-xl hover:scale-[1.02]' : ''} transition-all duration-300 ${className}`}
      style={{
        background: 'var(--card-bg, rgba(255,255,255,0.1))',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid rgba(255,255,255,0.15)',
      }}
      whileHover={hover ? { y: -4 } : {}}
      {...props}
    >
      {children}
    </motion.div>
  );
}
