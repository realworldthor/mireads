'use client';

import { useState } from 'react';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      email: form.email,
      password: form.password,
      redirect: false,
    });

    if (res.error) {
      setError('Invalid email or password. Please try again.');
      setLoading(false);
    } else {
      router.push('/');
    }
  }

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8', display: 'flex' }}>

      {/* LEFT PANEL */}
      <div style={{ flex: 1, borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px 72px', background: '#0a0a0a' }}>
        <div style={{ maxWidth: '400px' }}>

          {/* LABEL */}
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>
            Welcome Back
          </div>

          {/* HEADING */}
          <h1 style={{ fontSize: '38px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8', marginBottom: '8px', lineHeight: 1.2 }}>
            Sign in to your
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

            <div>
              <label style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '8px' }}>
                Email Address
              </label>
              <input
                type="email"
                required
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
                placeholder="you@example.com"
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

            <div>
              <label style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#555', display: 'block', marginBottom: '8px' }}>
                Password
              </label>
              <input
                type="password"
                required
                value={form.password}
                onChange={e => setForm({ ...form, password: e.target.value })}
                placeholder="••••••••"
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
              {loading ? 'Signing in...' : 'Sign In →'}
            </button>

          </form>

          {/* DIVIDER */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', margin: '32px 0' }}>
            <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
            <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', color: '#444', letterSpacing: '0.1em' }}>OR</span>
            <div style={{ flex: 1, height: '1px', background: '#1a1a1a' }} />
          </div>

          {/* SIGNUP LINK */}
          <p style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#666', textAlign: 'center' }}>
            Don't have an account?{' '}
            <Link href="/auth/signup" style={{ color: '#c9a96e', borderBottom: '1px solid #c9a96e', paddingBottom: '1px' }}>
              Create one →
            </Link>
          </p>

        </div>
      </div>

      {/* RIGHT PANEL */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '80px', background: '#0d0d0d', position: 'relative', overflow: 'hidden' }}>

        {/* BIG QUOTE */}
        <div style={{ position: 'relative', zIndex: 2, maxWidth: '420px', textAlign: 'center' }}>
          <div style={{ fontSize: '80px', color: '#c9a96e', opacity: 0.15, fontFamily: 'Georgia, serif', lineHeight: 1, marginBottom: '-20px' }}>"</div>
          <blockquote style={{ fontSize: '22px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8', lineHeight: 1.7, marginBottom: '32px' }}>
            A reader lives a thousand lives before he dies. The man who never reads lives only one.
          </blockquote>
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e' }}>
            — George R.R. Martin
          </div>
        </div>

        {/* DECORATIVE BOOKS */}
        <div style={{ position: 'absolute', bottom: '40px', left: '50%', transform: 'translateX(-50%)', display: 'flex', gap: '12px', opacity: 0.15 }}>
          {['📚', '📖', '📕', '📗', '📘'].map((e, i) => (
            <span key={i} style={{ fontSize: '32px' }}>{e}</span>
          ))}
        </div>

        {/* STATS */}
        <div style={{ position: 'absolute', bottom: '100px', display: 'flex', gap: '48px' }}>
          {[['10,000+', 'Titles'], ['10 mins', 'Delivery'], ['50,000+', 'Readers']].map(([num, label]) => (
            <div key={label} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '20px', fontWeight: 700, color: '#c9a96e', marginBottom: '4px' }}>{num}</div>
              <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#444' }}>{label}</div>
            </div>
          ))}
        </div>

      </div>

    </main>
  );
}