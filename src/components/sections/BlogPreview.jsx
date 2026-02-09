import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';
import BlogCard from '../ui/BlogCard';
import blogData from '../../data/blog.json';

export default function BlogPreview() {
  const latestPosts = blogData.slice(0, 3);

  return (
    <section id="blog" className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          title="Blog"
          subtitle="Thoughts, tutorials, and insights from my coding journey"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {latestPosts.map((post, i) => (
            <BlogCard key={post.id} post={post} index={i} />
          ))}
        </div>

        <motion.div
          className="text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-3 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
          >
            View All Posts <ArrowRight size={18} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
