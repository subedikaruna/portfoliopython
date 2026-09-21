import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogCard({ blog }) {
  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.2 }}
      className="rounded-2xl border overflow-hidden flex flex-col justify-between backdrop-blur-md shadow-lg transition-shadow hover:shadow-xl"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-color)',
      }}
    >
      {/* Entire card wrapped with Link to navigate using blog.slug */}
      <Link to={`/blog/${blog.slug}`} className="block flex-1">
        {blog.cover_image && (
          <div className="h-44 w-full overflow-hidden bg-gray-900/40">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
            />
          </div>
        )}

        <div className="p-6">
          <span className="text-xs font-medium text-blue-400 block mb-2">
            {formattedDate}
          </span>
          <h3 className="text-xl font-bold mb-3 text-white line-clamp-2 hover:text-blue-400 transition-colors">
            {blog.title}
          </h3>
          <p
            className="text-sm line-clamp-3 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {blog.description_1 || blog.headline_1}
          </p>
        </div>
      </Link>

      <div className="px-6 pb-6 pt-2">
        <Link
          to={`/blog/${blog.slug}`}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
        >
          Read Article &rarr;
        </Link>
      </div>
    </motion.div>
  );
}