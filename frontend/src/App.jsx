import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import ProjectsPage from './pages/ProjectsPage';
import ProjectDetailPage from './pages/ProjectDetailPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import ContactPage from './pages/ContactPage';
import { API_BASE_URL } from './api';

export default function App() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/profile/`)
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load profile');
        return res.json();
      })
      .then((data) => {
        const profileData = Array.isArray(data) ? data[0] : data;
        setProfile(profileData || null);
      })
      .catch((err) => console.error('Error fetching profile:', err));
  }, []);

  return (
    <Router>
      <div 
        className="min-h-screen flex flex-col font-sans transition-colors duration-300" 
        style={{ backgroundColor: 'var(--bg-main)', color: 'var(--text-main)' }}
      >
        <Navbar />

        <main className="flex-grow max-w-6xl w-full mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<HomePage profile={profile} />} />
            <Route path="/projects" element={<ProjectsPage />} />
            <Route path="/projects/:id" element={<ProjectDetailPage />} />
            <Route path="/blog" element={<BlogPage />} />
            <Route path="/blog/:slug" element={<BlogDetailPage />} />
            <Route path="/contact" element={<ContactPage profile={profile} />} />
          </Routes>
        </main>

        <Footer profile={profile} />
      </div>
    </Router>
  );
}