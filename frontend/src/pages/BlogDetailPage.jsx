import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function BlogDetailPage() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/blogs/${slug}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Article not found');
        return res.json();
      })
      .then((data) => {
        setBlog(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center">
        <div className="animate-pulse text-lg opacity-80">Fetching article...</div>
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-2xl font-bold">Article Not Found</h2>
        <Link to="/blog" className="text-blue-400 underline">
          &larr; Return to Blog
        </Link>
      </div>
    );
  }

  const formattedDate = new Date(blog.created_at).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-3xl mx-auto py-6"
    >
      <Link
        to="/blog"
        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6"
      >
        &larr; Back to Blog
      </Link>

      <div
        className="p-8 md:p-10 rounded-3xl border backdrop-blur-md"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        <span className="text-sm font-semibold text-blue-400 block mb-2">
          Published {formattedDate}
        </span>
        <h1 className="text-3xl md:text-5xl font-extrabold mb-8 leading-tight">
          {blog.title}
        </h1>

        {/* Cover Image */}
        {blog.cover_image && (
          <div className="rounded-2xl overflow-hidden mb-10 border border-white/10 shadow-xl">
            <img
              src={blog.cover_image}
              alt={blog.title}
              className="w-full h-auto max-h-[420px] object-cover"
            />
          </div>
        )}

        {/* Dynamic Blocks 1 through 6 */}
        {[1, 2, 3, 4, 5, 6].map((num) => {
          const headline = blog[`headline_${num}`];
          const desc = blog[`description_${num}`];
          const img = blog[`image_${num}`];

          if (!headline && !desc && !img) return null;

          return (
            <section key={num} className="mb-10 last:mb-0">
              {headline && (
                <h2 className="text-2xl font-bold mb-4 border-b pb-2 border-white/10">
                  {headline}
                </h2>
              )}
              {img && (
                <div className="rounded-xl overflow-hidden mb-4 border border-white/10">
                  <img src={img} alt={headline || `Section ${num}`} className="w-full h-auto" />
                </div>
              )}
              {desc && (
                <p className="text-base leading-relaxed opacity-90 whitespace-pre-line">
                  {desc}
                </p>
              )}
            </section>
          );
        })}
      </div>
    </motion.article>
  );
}