import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Calendar, Tag } from 'lucide-react';
import Markdown from 'react-markdown';
import blogData from '../data/blog.json';

export default function BlogPost() {
  const { slug } = useParams();
  const post = blogData.find(p => p.slug === slug);

  if (!post) {
    return (
      <main className="min-h-screen pt-24 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-light dark:text-muted-dark mb-8">
            The blog post you are looking for does not exist.
          </p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-primary hover:underline"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>
        </div>
      </main>
    );
  }

  return (
    <>
      <Helmet>
        <title>{post.title} | SCS Balaji</title>
        <meta name="description" content={post.excerpt} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
      </Helmet>

      <main className="min-h-screen pt-24 pb-16 px-4">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-primary hover:underline mb-8"
          >
            <ArrowLeft size={16} /> Back to Blog
          </Link>

          <div className="mb-8">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-light dark:text-muted-dark">
              <span className="flex items-center gap-1">
                <Calendar size={14} />
                {new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </span>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
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
          </div>

          <div
            className="prose prose-lg dark:prose-invert max-w-none
              prose-headings:text-primary
              prose-a:text-accent prose-a:no-underline hover:prose-a:underline
              prose-code:text-accent prose-code:bg-primary/10 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
              prose-pre:bg-gray-900 prose-pre:text-gray-100"
          >
            <Markdown>{post.content}</Markdown>
          </div>
        </motion.div>
      </main>
    </>
  );
}
