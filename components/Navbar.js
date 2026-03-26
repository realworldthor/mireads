'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';
import { useCart } from '@/components/CartContext';

export default function Navbar() {
  const { data: session } = useSession();
  const { cart } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav style={{
      position: 'sticky', top: 0, zIndex: 100,
      background: '#0a0a0a', borderBottom: '1px solid #222',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '0 40px', height: '64px',
    }}>

      {/* LOGO */}
      <Link href="/">
        <Image 
          src="/logo.avif" 
          alt="BookBlitz Logo" 
          width={140} 
          height={40}
          style={{ objectFit: "contain" }}
        />
      </Link>

      {/* DESKTOP LINKS */}
      <div style={{ display: 'flex', gap: '32px', alignItems: 'center' }}>
        <Link href="/" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa' }}
          onMouseEnter={e => e.target.style.color = '#f5f0e8'}
          onMouseLeave={e => e.target.style.color = '#aaa'}>
          Home
        </Link>
        <Link href="/browse" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa' }}
          onMouseEnter={e => e.target.style.color = '#f5f0e8'}
          onMouseLeave={e => e.target.style.color = '#aaa'}>
          Browse
        </Link>

        {session ? (
          <>
            <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a96e' }}>
              Hi, {session.user.name.split(' ')[0]}
            </span>
            <button onClick={() => signOut()} style={{
              fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.12em',
              textTransform: 'uppercase', border: '1px solid #555', color: '#aaa',
              padding: '8px 20px', background: 'transparent', cursor: 'pointer', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.target.style.borderColor = '#c9a96e'; e.target.style.color = '#c9a96e'; }}
              onMouseLeave={e => { e.target.style.borderColor = '#555'; e.target.style.color = '#aaa'; }}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link href="/auth/login" style={{
              fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px',
              letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa',
            }}
              onMouseEnter={e => e.target.style.color = '#f5f0e8'}
              onMouseLeave={e => e.target.style.color = '#aaa'}>
              Login
            </Link>
            <Link href="/auth/signup" style={{
              fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.12em',
              textTransform: 'uppercase', border: '1px solid #c9a96e', color: '#c9a96e',
              padding: '8px 20px', transition: 'all 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#c9a96e'; e.currentTarget.style.color = '#0a0a0a'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#c9a96e'; }}>
              Sign Up
            </Link>
          </>
        )}

        {/* CART */}
        <Link href="/cart" style={{ position: 'relative', fontSize: '18px', cursor: 'pointer' }}>
          🛒
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: '-6px', right: '-8px',
              background: '#c9a96e', color: '#0a0a0a',
              fontFamily: 'sans-serif', fontSize: '10px', fontWeight: 700,
              borderRadius: '50%', width: '16px', height: '16px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {totalItems}
            </span>
          )}
        </Link>
      </div>

      {/* MOBILE MENU BUTTON */}
      <div style={{ display: 'none' }} className="mobile-menu-btn">
        <button onClick={() => setMenuOpen(!menuOpen)} style={{
          background: 'transparent', border: 'none', color: '#f5f0e8',
          fontSize: '22px', cursor: 'pointer',
        }}>
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div style={{
          position: 'absolute', top: '64px', left: 0, right: 0,
          background: '#0a0a0a', borderBottom: '1px solid #222',
          padding: '20px 40px', display: 'flex', flexDirection: 'column', gap: '16px',
        }}>
          <Link href="/" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa' }}>Home</Link>
          <Link href="/browse" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa' }}>Browse</Link>
          {session ? (
            <>
              <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#c9a96e' }}>Hi, {session.user.name}</span>
              <button onClick={() => signOut()} style={{ background: 'transparent', border: 'none', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa', textAlign: 'left', cursor: 'pointer' }}>Logout</button>
            </>
          ) : (
            <>
              <Link href="/auth/login" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa' }}>Login</Link>
              <Link href="/auth/signup" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#c9a96e' }}>Sign Up</Link>
            </>
          )}
          <Link href="/cart" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#aaa' }}>
            Cart {totalItems > 0 ? `(${totalItems})` : ''}
          </Link>
        </div>
      )}

    </nav>
  );
}