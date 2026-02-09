import { motion } from 'framer-motion';

export default function Button({ children, variant = 'primary', href, onClick, className = '', ...props }) {
  const base = 'inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm transition-all duration-300 cursor-pointer';
  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark shadow-lg shadow-primary/25 hover:shadow-primary/40',
    secondary: 'border-2 border-primary text-primary hover:bg-primary hover:text-white',
    ghost: 'text-muted-light hover:text-primary dark:text-muted-dark',
    glossy: 'bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl hover:scale-105',
  };

  const Component = href ? motion.a : motion.button;

  return (
    <Component
      className={`${base} ${variants[variant]} ${className}`}
      href={href}
      onClick={onClick}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </Component>
  );
}
