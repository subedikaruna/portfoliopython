import React, { useEffect, useState } from 'react';
import ProjectCard from '../components/ProjectCard';

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/projects/`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading projects:', err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div className="py-20 text-center animate-pulse">Loading projects portfolio...</div>;
  }

  return (
    <div className="space-y-8 py-6">
      <div>
        <h1 className="text-3xl font-extrabold mb-2">All Projects</h1>
        <p className="opacity-80 text-sm">A collection of web applications, APIs, and personal builds.</p>
      </div>

      {projects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      ) : (
        <div className="py-16 text-center opacity-70">
          No projects added to the backend database yet.
        </div>
      )}
    </div>
  );
}