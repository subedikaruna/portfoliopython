import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ProjectCard({ project }) {
  const tagsList = project.tags
    ? project.tags.split(',').map((tag) => tag.trim())
    : [];

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
      {/* Whole card header & body linked to detail page */}
      <Link to={`/projects/${project.id}`} className="block flex-1">
        <div className="relative h-48 w-full overflow-hidden bg-gray-900/40">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
        </div>

        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 text-white hover:text-blue-400 transition-colors">
            {project.title}
          </h3>
          <p
            className="text-sm line-clamp-3 mb-4 leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2">
            {tagsList.map((tag, idx) => (
              <span
                key={idx}
                className="text-xs px-2.5 py-1 rounded-full border bg-blue-500/10 text-blue-400 border-blue-500/20"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </Link>

      {/* Card Footer with Details & External Live Demo links */}
      <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-white/5">
        <Link
          to={`/projects/${project.id}`}
          className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors inline-flex items-center gap-1"
        >
          View Details &rarr;
        </Link>

        {project.live_demo_url && (
          <a
            href={project.live_demo_url}
            target="_blank"
            rel="noreferrer"
            onClick={(e) => e.stopPropagation()} // Prevents card link click when clicking Live Demo
            className="text-xs opacity-75 hover:opacity-100 transition-opacity inline-flex items-center gap-1"
            style={{ color: 'var(--text-muted)' }}
          >
            Live Demo
            <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
              <path d="M14 3h7v7h-2V6.414l-9.293 9.293-1.414-1.414L17.586 5H14V3zM5 5h6v2H5v12h12v-6h2v7a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1z" />
            </svg>
          </a>
        )}
      </div>
    </motion.div>
  );
}