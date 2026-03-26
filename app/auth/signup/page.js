'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoading(true);

    const res = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: form.name, email: form.email, password: form.password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.error || 'Something went wrong.');
      setLoading(false);
    } else {
      router.push('/auth/login?registered=true');
    }
  }

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8', display: 'flex' }}>

      {/* LEFT PANEL — DECORATIVE */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px', background: '#0d0d0d', borderRight: '1px solid #1a1a1a', position: 'relative', overflow: 'hidden' }}>

        <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ fontSize: '80px', color: '#c9a96e', opacity: 0.15, fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '-20px' }}>"</div>
          <blockquote style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8', lineHeight: 1.7, marginBottom: '32px' }}>
            There is no friend as loyal as a book. Join thousands of readers who get their books in minutes.
          </blockquote>
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>
            — Ernest Hemingway
          </div>
        </div>

        {/* PERKS */}
        <div style={{ position: 'absolute', bottom: '80px', display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', padding: '0 60px' }}>
          {[
            ['⚡', 'Delivered in 10 minutes'],
            ['📚', '10,000+ titles available'],
            ['🎁', 'Free delivery on first order'],
          ].map(([icon, text]) => (
            <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '16px' }}>{icon}</span>
              <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#555', letterSpacing: '0.03em' }}>{text}</span>
            </div>
          ))}
        </div>

      </div>

      {/* RIGHT PANEL — FORM */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 72px' }}>
        <div style={{ maxWidth: '400px' }}>

          {/* LABEL */}
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>
            Get Started
          </div>

          {/* HEADING */}
          <h1 style={{ fontSize: '38px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8', marginBottom: '8px', lineHeight: 1.2 }}>
            Create your
          </h1>
          <h1 style={{ fontSize: '38px', fontWeight: 700, fontStyle: 'normal', color: '#f5f0e8', marginBottom: '48px', lineHeight: 1.2 }}>
            account.
          </h1>

          {/* ERROR */}
          {error && (
            <div style={{ background: '#1a0a0a', border: '1px solid #5a1a1a', color: '#ff6b6b', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', padding: '12px 16px', marginBottom: '24px', letterSpacing: '0.03em' }}>
              {error}
            </div>
          )}

          {/* FORM */}
          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {[
              { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Manas Awasthi' },
              { label: 'Email Address', key: 'email', type: 'email', placeholder: 'you@example.com' },
              { label: 'Password', key: 'password', type: 'password', placeholder: '••••••••' },
              { label: 'Confirm Password', key: 'confirm', type: 'password', placeholder: '••••••••' },
            ].map(field => (
              <div key={field.key}>
                <label style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '8px' }}>
                  {field.label}
                </label>
                <input
                  type={field.type}
                  required
                  placeholder={field.placeholder}
                  value={form[field.key]}
                  onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                  style={{
                    width: '100%', padding: '13px 16px',
                    background: '#111', border: '1px solid #333',
                    color: '#f5f0e8', fontFamily: 'Helvetica Neue, sans-serif',
                    fontSize: '14px', outline: 'none', letterSpacing: '0.03em',
                    transition: 'border-color 0.2s',
                  }}
                  onFocus={e => e.target.style.borderColor = '#c9a96e'}
                  onBlur={e => e.target.style.borderColor = '#333'}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%', padding: '14px',
                background: loading ? '#333' : '#c9a96e',
                border: 'none', color: '#0a0a0a',
                fontFamily: 'Helvetica Neue, sans-serif',
                fontSize: '12px', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 700,
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'opacity 0.2s', marginTop: '8px',
              }}
              onMouseEnter={e => { if (!loading) e.target.style.opacity = '0.85'; }}
              onMouseLeave={e => e.target.style.opacity = '1'}
            >
              {loading ? 'Creating account...' : 'Create Account →'}
            </button>

          </form>

          {/* DIVIDER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
            <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
          </div>

          {/* LOGIN LINK */}
          <p style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#666', textAlign: 'center' }}>
            Already have an account?{' '}
            <Link href="/auth/login" style={{ color: '#c9a96e', borderBottom: '1px solid #c9a96e', paddingBottom: '1px' }}>
              Sign in →
            </Link>
          </p>

        </div>
      </div>

    </main>
  );
}