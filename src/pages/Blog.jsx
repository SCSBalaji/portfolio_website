import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import SectionHeading from '../components/ui/SectionHeading';
import BlogCard from '../components/ui/BlogCard';
import blogData from '../data/blog.json';

const POSTS_PER_PAGE = 6;

export default function Blog() {
  const [activeTag, setActiveTag] = useState('All');
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE);

  const allTags = ['All', ...new Set(blogData.flatMap(post => post.tags))];

  const filtered = activeTag === 'All'
    ? blogData
    : blogData.filter(post => post.tags.includes(activeTag));

  const visible = filtered.slice(0, visibleCount);
  const hasMore = visibleCount < filtered.length;

  return (
    <>
      <Helmet>
        <title>Blog | SCS Balaji</title>
        <meta name="description" content="Thoughts, tutorials, and insights from my coding journey" />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-5xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft size={16} /> Back to Home
          </Link>

          <SectionHeading
            title="Blog"
            subtitle="Thoughts, tutorials, and insights from my coding journey"
          />

          {/* Tag Filters */}
          <motion.div
            className="flex flex-wrap justify-center gap-2 mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => {
                  setActiveTag(tag);
                  setVisibleCount(POSTS_PER_PAGE);
                }}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeTag === tag
                    ? 'bg-primary text-white shadow-lg shadow-primary/25'
                    : 'bg-primary/10 text-primary hover:bg-primary/20'
                }`}
              >
                {tag}
              </button>
            ))}
          </motion.div>

          {/* Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {visible.map((post, i) => (
              <BlogCard key={post.id} post={post} index={i} />
            ))}
          </div>

          {hasMore && (
            <div className="text-center mt-12">
              <button
                onClick={() => setVisibleCount(prev => prev + POSTS_PER_PAGE)}
                className="px-8 py-3 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary hover:text-white transition-all duration-300"
              >
                Load More Posts
              </button>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
