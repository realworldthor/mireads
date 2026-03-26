'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

const slides = [
  {
    tag: 'New Arrival',
    title: 'The book that will\nchange how you',
    highlight: 'build habits.',
    btn: 'Discover Now',
    bg: '#111',
  },
  {
    tag: 'Bestseller',
    title: 'Follow your dreams\nacross the',
    highlight: 'desert of life.',
    btn: 'Explore More',
    bg: '#0d0d0d',
  },
  {
    tag: 'Editor\'s Pick',
    title: 'Understand the world\nthrough',
    highlight: 'human history.',
    btn: 'Read More',
    bg: '#0f0d0a',
  },
];

const categories = [
  { icon: '📖', name: 'Fiction' },
  { icon: '💼', name: 'Business' },
  { icon: '🧠', name: 'Self Help' },
  { icon: '🔭', name: 'Science' },
  { icon: '🏛️', name: 'History' },
  { icon: '🐉', name: 'Fantasy' },
  { icon: '💰', name: 'Finance' },
  { icon: '🎨', name: 'Art' },
];

const testimonials = [
  { quote: 'Ordered at 9pm, had the book in my hands before finishing my tea. This is the future of book shopping.', name: 'Arjun Rao', book: 'Atomic Habits', initials: 'AR' },
  { quote: 'The curation is incredible. I found three books I didn\'t know I needed, and all arrived within the hour.', name: 'Priya Sharma', book: 'The Alchemist', initials: 'PS' },
  { quote: 'Finally a bookstore that understands urgency. Gifted a book on a friend\'s birthday — same day, done.', name: 'Nikhil Kumar', book: 'Sapiens', initials: 'NK' },
];

export default function HomePage() {
  const [books, setBooks] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [toast, setToast] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch('/api/books')
      .then((r) => r.json())
      .then((data) => setBooks(Array.isArray(data) ? data.slice(0, 8) : []));
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  function handleAddToCart(book) {
    addToCart(book);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  const marqueeBooks = [...books, ...books];

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8' }}>

      {/* HERO SLIDER */}
      <section style={{ position: 'relative', height: '520px', overflow: 'hidden', background: '#0a0a0a' }}>
        {slides.map((slide, i) => (
          <div key={i} style={{
            position: 'absolute', inset: 0, opacity: currentSlide === i ? 1 : 0,
            transition: 'opacity 0.8s ease', display: 'flex', alignItems: 'center',
            background: slide.bg,
          }}>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(10,10,10,0.97) 45%, rgba(10,10,10,0.4) 100%)' }} />

{/* LEFT TEXT */}
<div style={{ position: 'relative', zIndex: 2, padding: '0 60px', maxWidth: '520px' }}>
  <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px', display: 'block' }}>
    ⚡ {slide.tag} · Delivered in 10 mins
  </span>
  <h2 style={{ fontSize: '36px', lineHeight: 1.25, color: '#f5f0e8', fontWeight: 400, marginBottom: '20px', fontStyle: 'italic', whiteSpace: 'pre-line' }}>
    {slide.title} <strong style={{ fontStyle: 'normal', fontWeight: 700, color: '#c9a96e' }}>{slide.highlight}</strong>
  </h2>
  <Link href="/browse" style={{
    display: 'inline-block', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px',
    letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #f5f0e8',
    color: '#f5f0e8', padding: '11px 28px', transition: 'all 0.2s',
  }}>
    {slide.btn}
  </Link>
</div>

{/* RIGHT BOOK COVER */}
<div style={{ position: 'absolute', right: '120px', top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
  {books[i] && (
    <div style={{ position: 'relative' }}>
      <div style={{ position: 'absolute', bottom: '-24px', left: '50%', transform: 'translateX(-50%)', width: '140px', height: '20px', background: 'rgba(0,0,0,0.6)', filter: 'blur(12px)', borderRadius: '50%' }} />
      {books[i]?.cover ? (
        <img
          src={books[i].cover}
          alt={books[i].title}
          style={{ width: '200px', aspectRatio: '2/3', objectFit: 'cover', display: 'block', position: 'relative', zIndex: 1, boxShadow: '8px 8px 32px rgba(0,0,0,0.8), -2px 0 8px rgba(0,0,0,0.4)' }}
        />
      ) : (
        <div style={{ width: '200px', aspectRatio: '2/3', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px', position: 'relative', zIndex: 1, boxShadow: '8px 8px 32px rgba(0,0,0,0.8)' }}>📖</div>
      )}
      <div style={{ position: 'absolute', bottom: '-40px', left: 0, right: 0, textAlign: 'center', zIndex: 1 }}>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e' }}>{books[i]?.title}</div>
      </div>
    </div>
  )}
</div>
          </div>
        ))}
        {/* Dots */}
        <div style={{ position: 'absolute', bottom: '24px', left: '60px', display: 'flex', gap: '8px', zIndex: 10 }}>
          {slides.map((_, i) => (
            <div key={i} onClick={() => setCurrentSlide(i)} style={{
              width: '24px', height: '2px', cursor: 'pointer',
              background: currentSlide === i ? '#c9a96e' : '#555',
              transition: 'background 0.2s',
            }} />
          ))}
        </div>
      </section>

      {/* TICKER */}
      <div style={{ background: '#c9a96e', padding: '10px 0', overflow: 'hidden', whiteSpace: 'nowrap' }}>
        <div style={{ display: 'inline-block', animation: 'tick 22s linear infinite' }}>
          {['Free delivery on first order', 'Delivered in 10 minutes', '10,000+ titles available', 'New arrivals every week', 'Free delivery on first order', 'Delivered in 10 minutes', '10,000+ titles available', 'New arrivals every week'].map((text, i) => (
            <span key={i} style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#0a0a0a', fontWeight: 600, margin: '0 40px' }}>
              {text}
            </span>
          ))}
        </div>
      </div>

      {/* CATEGORIES */}
      <section style={{ padding: '80px 60px' }}>
        <div className="section-label">Shop by Genre</div>
        <div className="section-title">Browse by <em>Category</em></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '1px', background: '#222', border: '1px solid #222' }}>
          {categories.map((cat) => (
            <Link key={cat.name} href={`/browse?category=${cat.name}`} style={{
              background: '#0a0a0a', padding: '28px 12px', textAlign: 'center', cursor: 'pointer',
              transition: 'background 0.2s', display: 'block',
            }}
              onMouseEnter={e => { e.currentTarget.style.background = '#141414'; e.currentTarget.querySelector('span').style.color = '#c9a96e'; }}
              onMouseLeave={e => { e.currentTarget.style.background = '#0a0a0a'; e.currentTarget.querySelector('span').style.color = '#888'; }}
            >
              <div style={{ fontSize: '24px', marginBottom: '8px' }}>{cat.icon}</div>
              <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888', transition: 'color 0.2s' }}>
                {cat.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* FEATURED BOOKS */}
      <section style={{ padding: '0 60px 80px' }}>
        <div className="section-label">Curated for You</div>
        <div className="section-title">Featured <em>Books</em></div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '32px' }}>
          {books.slice(0, 8).map((book) => (
            <div key={book._id} style={{ cursor: 'pointer' }}>
              <div className="book-cover-wrap" style={{ position: 'relative', marginBottom: '16px', overflow: 'hidden', background: '#111' }}>
                {book.cover ? (
                  <img src={book.cover} alt={book.title} style={{ display: 'block', width: '100%', aspectRatio: '2/3', objectFit: 'cover' }} />
                ) : (
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '64px', background: '#111', aspectRatio: '2/3' }}>📖</div>
                )}
                <div className="book-overlay">
                  <button onClick={() => handleAddToCart(book)} style={{
                    fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em',
                    textTransform: 'uppercase', border: '1px solid #f5f0e8', color: '#f5f0e8',
                    padding: '9px 20px', cursor: 'pointer', background: 'transparent', transition: 'all 0.2s',
                  }}
                    onMouseEnter={e => { e.target.style.background = '#f5f0e8'; e.target.style.color = '#0a0a0a'; }}
                    onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = '#f5f0e8'; }}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <Link href={`/books/${book._id}`}>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '6px' }}>{book.category}</div>
                <div style={{ fontSize: '16px', fontWeight: 400, color: '#f5f0e8', marginBottom: '4px', lineHeight: 1.35 }}>{book.title}</div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#888', marginBottom: '10px' }}>{book.author}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div>
                    <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '15px', fontWeight: 600, color: '#f5f0e8' }}>₹{book.price}</span>
                    {book.originalPrice && <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#555', textDecoration: 'line-through', marginLeft: '6px' }}>₹{book.originalPrice}</span>}
                  </div>
                  {book.originalPrice && (
                    <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '10px', letterSpacing: '0.1em', background: '#c9a96e', color: '#0a0a0a', padding: '3px 8px', fontWeight: 600 }}>
                      {Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)}% off
                    </span>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* MARQUEE */}
      {marqueeBooks.length > 0 && (
        <div style={{ padding: '48px 0', borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a', overflow: 'hidden' }}>
          <div className="marquee-track" style={{ display: 'flex', gap: '24px', animation: 'marquee 30s linear infinite', width: 'max-content' }}>
            {marqueeBooks.map((book, i) => (
              <div key={i} style={{ width: '120px', flexShrink: 0, cursor: 'pointer' }}>
                <div style={{ width: '120px', height: '168px', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '44px', marginBottom: '10px', overflow: 'hidden' }}>
                  {book.cover ? <img src={book.cover} alt={book.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : '📖'}
                </div>
                <div style={{ fontSize: '12px', color: '#888', lineHeight: 1.3 }}>{book.title}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* FOUNDER */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', background: '#0f0f0f', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '420px', fontSize: '120px' }}>👤</div>
        <div style={{ padding: '72px 56px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className="section-label">Our Story</div>
          <blockquote style={{ fontSize: '22px', fontWeight: 400, lineHeight: 1.6, color: '#f5f0e8', fontStyle: 'italic', marginBottom: '32px', borderLeft: '2px solid #c9a96e', paddingLeft: '24px' }}>
            "We built mireads because great books deserve to reach readers fast — not in days, but in minutes."
          </blockquote>
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '4px' }}>John Doe</div>
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#666' }}>Founder & CEO, BookBlitz</div>
          <Link href="/browse" style={{ display: 'inline-block', marginTop: '28px', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#f5f0e8', borderBottom: '1px solid #c9a96e', paddingBottom: '2px' }}>
            Browse our collection →
          </Link>
        </div>
      </div>

      {/* TESTIMONIALS */}
      <section style={{ padding: '80px 60px 0' }}>
        <div className="section-label">Reader Stories</div>
        <div className="section-title">What our <em>readers</em> say</div>
      </section>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: '#1a1a1a' }}>
        {testimonials.map((t, i) => (
          <div key={i} style={{ background: '#0a0a0a', padding: '40px 32px' }}>
            <p style={{ fontSize: '15px', lineHeight: 1.8, color: '#bbb', fontStyle: 'italic', marginBottom: '24px' }}>"{t.quote}"</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'sans-serif', fontSize: '14px', fontWeight: 700, color: '#0a0a0a', flexShrink: 0 }}>{t.initials}</div>
              <div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', fontWeight: 600, color: '#f5f0e8' }}>{t.name}</div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', color: '#666' }}>{t.book}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <section style={{ padding: '100px 60px', textAlign: 'center', borderTop: '1px solid #1a1a1a' }}>
        <div className="section-label" style={{ textAlign: 'center', marginBottom: '16px' }}>Start Reading Today</div>
        <h2 style={{ fontSize: '48px', fontWeight: 400, color: '#f5f0e8', marginBottom: '16px', fontStyle: 'italic' }}>
          Your next great read,<br /><strong style={{ fontStyle: 'normal' }}>ten minutes away.</strong>
        </h2>
        <p style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '15px', color: '#888', marginBottom: '40px', maxWidth: '480px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
          Thousands of titles. Instant delivery. No subscriptions, no fuss — just books at your door.
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/browse" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', background: '#c9a96e', color: '#0a0a0a', padding: '14px 36px', fontWeight: 700, border: 'none', cursor: 'pointer' }}>
            Browse All Books
          </Link>
          <Link href="/auth/signup" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #555', color: '#f5f0e8', padding: '14px 36px', cursor: 'pointer', background: 'transparent' }}>
            Create Account
          </Link>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#050505', borderTop: '1px solid #1a1a1a', padding: '48px 60px 32px', display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '40px' }}>
        <div>
          <div style={{ fontSize: '20px', fontWeight: 700, letterSpacing: '0.04em', color: '#f5f0e8', marginBottom: '12px' }}>mi<span style={{ color: '#c9a96e' }}>reads</span></div>
          <p style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#555', lineHeight: 1.7, maxWidth: '240px' }}>Quick commerce for books. Get any title delivered to your door in under 10 minutes.</p>
        </div>
        {[
          { title: 'Navigate', links: [['Home', '/'], ['Browse Books', '/browse'], ['Cart', '/cart']] },
          { title: 'Account', links: [['Sign Up', '/auth/signup'], ['Login', '/auth/login']] },
          { title: 'Company', links: [['About Us', '/'], ['Contact', '/'], ['Privacy Policy', '/']] },
        ].map((col) => (
          <div key={col.title}>
            <h4 style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>{col.title}</h4>
            {col.links.map(([label, href]) => (
              <Link key={label} href={href} style={{ display: 'block', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#666', marginBottom: '8px' }}>{label}</Link>
            ))}
          </div>
        ))}
        <div style={{ borderTop: '1px solid #1a1a1a', marginTop: '32px', paddingTop: '20px', gridColumn: '1 / -1', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#444' }}>© 2026 mireads. All rights reserved.</p>
          <p style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#444' }}>Made with ♥ for readers everywhere</p>
        </div>
      </footer>

      {/* TOAST */}
      <div className={`toast ${toast ? 'show' : ''}`}>Added to cart</div>

    </main>
  );
}