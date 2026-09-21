import React, { useState } from 'react';
import { API_BASE_URL } from '../api';

export default function ContactPage({ profile }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus('sending');

    fetch(`${API_BASE_URL}/api/contact/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to send message');
        return res.json();
      })
      .then(() => {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
      })
      .catch((err) => {
        console.error(err);
        setStatus('error');
      });
  };

  return (
    <div className="max-w-2xl mx-auto py-8">
      <h1 className="text-3xl font-extrabold mb-2">Get In Touch</h1>
      <p className="opacity-80 text-sm mb-8" style={{ color: 'var(--text-muted)' }}>
        Have a question or want to work together? Drop me a message below!
      </p>

      {profile?.email && (
        <div className="mb-6 p-4 rounded-xl border" style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)' }}>
          <p className="text-sm font-semibold">Direct Email:</p>
          <a href={`mailto:${profile.email}`} className="text-blue-400 hover:underline text-sm">
            {profile.email}
          </a>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Your Name</label>
          <input
            type="text"
            required
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="w-full p-3 rounded-lg border outline-none focus:border-blue-400"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Your Email</label>
          <input
            type="email"
            required
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-3 rounded-lg border outline-none focus:border-blue-400"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Message</label>
          <textarea
            rows="5"
            required
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-3 rounded-lg border outline-none focus:border-blue-400"
            style={{ backgroundColor: 'var(--bg-card)', borderColor: 'var(--border-color)', color: 'var(--text-main)' }}
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={status === 'sending'}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-500 font-semibold text-white rounded-xl transition w-full disabled:opacity-50"
        >
          {status === 'sending' ? 'Sending...' : 'Send Message'}
        </button>

        {status === 'success' && (
          <p className="text-green-400 text-sm text-center pt-2">Message sent successfully!</p>
        )}
        {status === 'error' && (
          <p className="text-red-400 text-sm text-center pt-2">Failed to send message. Please try again.</p>
        )}
      </form>
    </div>
  );
}