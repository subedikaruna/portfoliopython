import React from 'react';

export default function Footer({ profile }) {
  return (
    <footer
      className="border-t py-6 mt-12 transition-colors duration-300"
      style={{
        backgroundColor: 'var(--nav-bg)',
        borderColor: 'var(--border-color)',
        color: 'var(--text-muted)',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
        <p>© {new Date().getFullYear()} {profile?.name || 'Portfolio'}. All rights reserved.</p>

        <div className="flex gap-4">
          {profile?.github_url && (
            <a href={profile.github_url} target="_blank" rel="noreferrer" className="hover:text-blue-400">
              GitHub
            </a>
          )}
          {profile?.linkedin_url && (
            <a href={profile.linkedin_url} target="_blank" rel="noreferrer" className="hover:text-blue-400">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}