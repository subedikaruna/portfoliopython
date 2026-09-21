import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProjectDetailPage() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/projects/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error('Project not found');
        return res.json();
      })
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError(err.message);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center text-center">
        <div className="animate-pulse text-lg opacity-80">Loading project specs...</div>
      </div>
    );
  }

  if (error || !project) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center text-center gap-4">
        <h2 className="text-2xl font-bold">Project Not Found</h2>
        <Link to="/projects" className="text-blue-400 underline">
          &larr; Return to All Projects
        </Link>
      </div>
    );
  }

  const tagsList = project.tags
    ? project.tags.split(',').map((t) => t.trim())
    : [];

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="max-w-4xl mx-auto py-6"
    >
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-blue-400 hover:text-blue-300 transition-colors mb-6"
      >
        &larr; Back to Projects
      </Link>

      <div
        className="p-8 rounded-3xl border backdrop-blur-md"
        style={{
          backgroundColor: 'var(--bg-card)',
          borderColor: 'var(--border-color)',
        }}
      >
        <h1 className="text-3xl md:text-4xl font-extrabold mb-4">{project.title}</h1>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {tagsList.map((tag, idx) => (
            <span
              key={idx}
              className="text-xs px-3 py-1 rounded-full border bg-blue-500/10 text-blue-400 border-blue-500/20"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Image Preview */}
        {project.image && (
          <div className="rounded-2xl overflow-hidden mb-8 border border-white/10 shadow-2xl">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto max-h-[480px] object-cover"
            />
          </div>
        )}

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-bold mb-3 border-b pb-2 border-white/10">Overview</h2>
          <p className="text-base leading-relaxed opacity-90 whitespace-pre-line">
            {project.description}
          </p>
        </div>

        {/* External Links */}
        <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
          {project.live_demo_url && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 font-semibold text-white transition-colors inline-flex items-center gap-2"
            >
              Live Demo
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H5v12h12v-6h2v7a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
              </svg>
            </a>
          )}

          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="px-6 py-2.5 rounded-xl border border-white/20 hover:bg-white/5 font-semibold transition-colors inline-flex items-center gap-2"
            >
              Source Code
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}