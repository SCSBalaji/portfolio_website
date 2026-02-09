import { motion } from 'framer-motion';
import { Calendar, Tag } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function BlogCard({ post, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Link to={`/blog/${post.slug}`} className="block group">
        <div
          className="p-6 rounded-2xl h-full transition-all duration-300 hover:shadow-xl"
          style={{
            background: 'rgba(255,255,255,0.08)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
            border: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div className="flex items-center gap-4 text-sm text-muted-light dark:text-muted-dark mb-3">
            <span className="flex items-center gap-1">
              <Calendar size={14} />
              {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
            {post.title}
          </h3>
          
          <p className="text-muted-light dark:text-muted-dark text-sm mb-4 leading-relaxed">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="flex items-center gap-1 px-2 py-1 text-xs rounded-full bg-accent/10 text-accent"
              >
                <Tag size={10} />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
