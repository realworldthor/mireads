'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { useSession } from 'next-auth/react';

import { useParams } from 'next/navigation';

export default function BookDetailPage() {
  const params = useParams();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(false);
  const [added, setAdded] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { data: session } = useSession();

  useEffect(() => {
    fetch(`/api/books/${params.id}`)
      .then(r => r.json())
      .then(data => { setBook(data); setLoading(false); });
  }, [params.id]);

  function handleAddToCart() {
    for (let i = 0; i < quantity; i++) addToCart(book);
    setAdded(true);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  const discount = book?.originalPrice
    ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
    : null;

  if (loading) return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📖</div>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e' }}>Loading...</div>
      </div>
    </main>
  );

  if (!book || book.error) return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>📭</div>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>Not Found</div>
        <Link href="/browse" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', border: '1px solid #c9a96e', color: '#c9a96e', padding: '11px 28px' }}>
          Back to Browse
        </Link>
      </div>
    </main>
  );

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8' }}>

      {/* BREADCRUMB */}
      <div style={{ padding: '20px 60px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <Link href="/" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#555', letterSpacing: '0.05em' }}>Home</Link>
        <span style={{ color: '#333', fontSize: '12px' }}>→</span>
        <Link href="/browse" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#555', letterSpacing: '0.05em' }}>Browse</Link>
        <span style={{ color: '#333', fontSize: '12px' }}>→</span>
        <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#c9a96e', letterSpacing: '0.05em' }}>{book.title}</span>
      </div>

      {/* MAIN CONTENT */}
      <div style={{ display: 'grid', gridTemplateColumns: '400px 1fr', gap: '0', minHeight: 'calc(100vh - 120px)' }}>

        {/* LEFT — BOOK COVER */}
        <div style={{ borderRight: '1px solid #1a1a1a', padding: '64px 48px', display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#0d0d0d', position: 'sticky', top: '64px', alignSelf: 'start' }}>
          <div style={{ width: '240px', marginBottom: '32px', position: 'relative' }}>
            {book.cover ? (
              <img src={book.cover} alt={book.title} style={{ width: '100%', aspectRatio: '2/3', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', aspectRatio: '2/3', background: '#111', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '80px' }}>📖</div>
            )}
            {discount && (
              <div style={{ position: 'absolute', top: '12px', right: '-12px', background: '#c9a96e', color: '#0a0a0a', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', fontWeight: 700, padding: '4px 10px', letterSpacing: '0.1em' }}>
                {discount}% OFF
              </div>
            )}
          </div>

          {/* DELIVERY BADGE */}
          <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: '16px 24px', textAlign: 'center', width: '100%', marginBottom: '16px' }}>
            <div style={{ fontSize: '24px', marginBottom: '6px' }}>⚡</div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '2px' }}>Express Delivery</div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#888' }}>Get it in {book.deliveryTime}</div>
          </div>

          {/* BOOK STATS */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1px', background: '#1a1a1a', width: '100%' }}>
            {[
              ['⭐', 'Rating', `${book.rating}/5`],
              ['💬', 'Reviews', book.reviews],
              ['📄', 'Pages', book.pages || 'N/A'],
              ['🌐', 'Language', book.language],
            ].map(([icon, label, value]) => (
              <div key={label} style={{ background: '#0d0d0d', padding: '14px', textAlign: 'center' }}>
                <div style={{ fontSize: '16px', marginBottom: '4px' }}>{icon}</div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', marginBottom: '2px' }}>{label}</div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#f5f0e8', fontWeight: 600 }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — BOOK INFO */}
        <div style={{ padding: '64px 72px' }}>

          {/* CATEGORY TAG */}
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>
            {book.category}
          </div>

          {/* TITLE */}
          <h1 style={{ fontSize: '44px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8', lineHeight: 1.2, marginBottom: '12px' }}>
            {book.title}
          </h1>

          {/* AUTHOR */}
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '16px', color: '#888', marginBottom: '32px', letterSpacing: '0.03em' }}>
            by <span style={{ color: '#c9a96e' }}>{book.author}</span>
          </div>

          {/* DIVIDER */}
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '32px' }} />

          {/* PRICE */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '16px', marginBottom: '12px' }}>
            <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '36px', fontWeight: 700, color: '#f5f0e8' }}>₹{book.price}</span>
            {book.originalPrice && (
              <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '20px', color: '#444', textDecoration: 'line-through' }}>₹{book.originalPrice}</span>
            )}
            {discount && (
              <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', background: '#c9a96e', color: '#0a0a0a', padding: '4px 10px', fontWeight: 700, letterSpacing: '0.1em' }}>
                Save {discount}%
              </span>
            )}
          </div>

          {book.inStock ? (
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#4a9a6a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>✓ In Stock</div>
          ) : (
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#9a4a4a', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '32px' }}>✗ Out of Stock</div>
          )}

          {/* QUANTITY + ADD TO CART */}
          <div style={{ display: 'flex', gap: '0', marginBottom: '16px' }}>
            {/* QUANTITY */}
            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #333', marginRight: '12px' }}>
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))} style={{ width: '40px', height: '48px', background: 'transparent', border: 'none', color: '#f5f0e8', fontSize: '18px', cursor: 'pointer' }}>−</button>
              <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '15px', color: '#f5f0e8', width: '32px', textAlign: 'center' }}>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)} style={{ width: '40px', height: '48px', background: 'transparent', border: 'none', color: '#f5f0e8', fontSize: '18px', cursor: 'pointer' }}>+</button>
            </div>

            {/* ADD TO CART */}
            <button
              onClick={handleAddToCart}
              disabled={!book.inStock}
              style={{
                flex: 1, padding: '14px 32px',
                background: added ? '#1a2a1a' : '#c9a96e',
                border: added ? '1px solid #4a9a6a' : 'none',
                color: added ? '#4a9a6a' : '#0a0a0a',
                fontFamily: 'Helvetica Neue, sans-serif',
                fontSize: '12px', letterSpacing: '0.15em',
                textTransform: 'uppercase', fontWeight: 700,
                cursor: book.inStock ? 'pointer' : 'not-allowed',
                transition: 'all 0.2s',
              }}
            >
              {added ? '✓ Added to Cart' : 'Add to Cart'}
            </button>

            {/* GO TO CART */}
            {added && (
              <Link href="/cart" style={{
                padding: '14px 24px', border: '1px solid #333',
                color: '#f5f0e8', fontFamily: 'Helvetica Neue, sans-serif',
                fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
                marginLeft: '12px', display: 'flex', alignItems: 'center',
              }}>
                View Cart →
              </Link>
            )}
          </div>

          {/* DIVIDER */}
          <div style={{ height: '1px', background: '#1a1a1a', margin: '40px 0' }} />

          {/* DESCRIPTION */}
          <div style={{ marginBottom: '40px' }}>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>About this Book</div>
            <p style={{ fontSize: '16px', lineHeight: 1.9, color: '#aaa', fontStyle: 'italic' }}>
              {book.description || 'A remarkable book that will change the way you think and see the world. This title has captivated readers worldwide with its unique perspective and compelling narrative.'}
            </p>
          </div>

          {/* DIVIDER */}
          <div style={{ height: '1px', background: '#1a1a1a', margin: '40px 0' }} />

          {/* BOOK DETAILS TABLE */}
          <div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>Book Details</div>
           <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <tbody>
    {[
      ['Publisher', book.publisher || 'N/A'],
      ['Language', book.language || 'English'],
      ['Pages', book.pages || 'N/A'],
      ['ISBN', book.isbn || 'N/A'],
      ['Category', book.category],
      ['Delivery', book.deliveryTime],
    ].map(([label, value]) => (
      <tr key={label} style={{ borderBottom: '1px solid #1a1a1a' }}>
        <td style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#555', padding: '12px 0', width: '140px' }}>
          {label}
        </td>
        <td style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '14px', color: '#888', padding: '12px 0' }}>
          {value}
        </td>
      </tr>
    ))}
  </tbody>
</table>
          </div>

          {/* BACK LINK */}
          <div style={{ marginTop: '48px' }}>
            <Link href="/browse" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555', borderBottom: '1px solid #333', paddingBottom: '2px' }}>
              ← Back to Browse
            </Link>
          </div>

        </div>
      </div>

      {/* TOAST */}
      <div className={`toast ${toast ? 'show' : ''}`}>Added to cart</div>

    </main>
  );
}