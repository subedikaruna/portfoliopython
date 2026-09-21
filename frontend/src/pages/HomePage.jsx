import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ProjectCard from '../components/ProjectCard';

export default function HomePage({ profile }) {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects/')
      .then((res) => res.json())
      .then((data) => {
        // Filter projects where featured is true (handles both boolean true and truthy values)
        const featured = data.filter((project) => project.featured === true || project.featured === 'true');
        // Fallback to showing the first 3 projects if none are explicitly marked as featured
        setFeaturedProjects(featured.length > 0 ? featured : data.slice(0, 3));
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading featured projects:', err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="space-y-16 py-6">
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-between gap-8 py-10">
        <div className="flex-1 space-y-4">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            className="text-4xl md:text-6xl font-extrabold tracking-tight"
          >
            Hi, I'm <span className="text-blue-400">{profile?.name || 'Karuna Subedi'}</span>
          </motion.h1>
          
          <p className="text-xl text-blue-300 font-medium">
            {profile?.tagline || 'Full-Stack Developer & AI Enthusiast'}
          </p>

          <p className="text-base opacity-80 leading-relaxed max-w-2xl">
            {profile?.bio || 'Building modern, interactive full-stack web applications with React, Django, and AI integrations.'}
          </p>

          <div className="flex gap-4 pt-4">
            <Link 
              to="/contact" 
              className="px-6 py-3 bg-blue-600 hover:bg-blue-500 font-semibold rounded-xl transition text-white shadow-lg"
            >
              Get In Touch
            </Link>
            <Link 
              to="/projects" 
              className="px-6 py-3 border border-white/20 hover:bg-white/5 font-semibold rounded-xl transition"
            >
              View Projects
            </Link>
          </div>
        </div>

        {/* Profile Avatar */}
        {profile?.avatar && (
          <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500/30 shadow-2xl">
            <img 
              src={profile.avatar} 
              alt={profile.name || 'Profile'} 
              className="w-full h-full object-cover" 
            />
          </div>
        )}
      </section>

      {/* Featured Projects Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold">Featured Projects</h2>
          <Link to="/projects" className="text-sm font-semibold text-blue-400 hover:underline">
            View All Projects &rarr;
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center opacity-70 animate-pulse">Loading featured projects...</div>
        ) : featuredProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <p className="opacity-70 text-sm">No projects found. Add projects in Django Admin (`http://127.0.0.1:8000/admin/`).</p>
        )}
      </section>
    </div>
  );
}