import React, { useEffect, useState } from 'react';
import BlogCard from '../components/BlogCard';
import { API_BASE_URL } from '../api';

export default function BlogPage() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/blogs/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to connect to backend API');
        return res.json();
      })
      .then((data) => {
        const articles = Array.isArray(data) ? data : data.results || [];
        setBlogs(articles);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error fetching blogs:', err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-20 text-center opacity-70 animate-pulse">Loading articles...</div>;
  }

  if (error) {
    return (
      <div className="py-16 text-center text-red-400">
        Could not load blogs. Make sure Django backend is running.
      </div>
    );
  }

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-extrabold mb-2">Articles & Insights</h1>
        <p className="opacity-80 text-sm" style={{ color: 'var(--text-muted)' }}>
          Thoughts, tutorials, and notes.
        </p>
      </div>

      {blogs.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center opacity-70">
          No blog posts published in database yet.
        </div>
      )}
    </div>
  );
}