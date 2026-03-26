'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const [toast, setToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 0;
  const total = subtotal + delivery;

  function handleRemove(id, title) {
    removeFromCart(id);
    setToastMsg(`"${title}" removed from cart`);
    setToast(true);
    setTimeout(() => setToast(false), 2000);
  }

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8' }}>

      {/* HEADER */}
      <section style={{ padding: '64px 60px 48px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>
          Your Selection
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8' }}>
          Shopping <strong style={{ fontStyle: 'normal' }}>Cart</strong>
        </h1>
      </section>

      {/* EMPTY CART */}
      {cart.length === 0 && (
        <div style={{ textAlign: 'center', padding: '120px 60px' }}>
          <div style={{ fontSize: '72px', marginBottom: '24px', opacity: 0.3 }}>🛒</div>
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>
            Empty
          </div>
          <p style={{ fontSize: '26px', fontStyle: 'italic', color: '#555', marginBottom: '40px' }}>
            Your cart is empty.
          </p>
          <Link href="/browse" style={{
            fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em',
            textTransform: 'uppercase', background: '#c9a96e', color: '#0a0a0a',
            padding: '14px 36px', fontWeight: 700,
          }}>
            Browse Books
          </Link>
        </div>
      )}

      {/* CART CONTENT */}
      {cart.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '0', minHeight: '60vh' }}>

          {/* CART ITEMS */}
          <div style={{ borderRight: '1px solid #1a1a1a', padding: '48px 60px' }}>

            {/* COLUMN HEADERS */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 40px', gap: '16px', paddingBottom: '16px', borderBottom: '1px solid #1a1a1a', marginBottom: '8px' }}>
              {['Product', 'Quantity', 'Price', ''].map((h, i) => (
                <div key={i} style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#444' }}>{h}</div>
              ))}
            </div>

            {/* ITEMS */}
            {cart.map(item => (
              <div key={item._id} style={{ display: 'grid', gridTemplateColumns: '1fr 120px 120px 40px', gap: '16px', alignItems: 'center', padding: '24px 0', borderBottom: '1px solid #1a1a1a' }}>

                {/* BOOK INFO */}
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ width: '56px', height: '80px', background: '#111', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '28px' }}>
                    {item.cover
                      ? <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      : '📖'}
                  </div>
                  <div>
                    <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '6px' }}>{item.category}</div>
                    <div style={{ fontSize: '16px', fontWeight: 400, color: '#f5f0e8', marginBottom: '4px', lineHeight: 1.3 }}>{item.title}</div>
                    <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#666' }}>{item.author}</div>
                  </div>
                </div>

                {/* QUANTITY */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0' }}>
                  <button onClick={() => updateQuantity(item._id, item.quantity - 1)} style={{
                    width: '32px', height: '32px', background: 'transparent',
                    border: '1px solid #333', color: '#f5f0e8', cursor: 'pointer',
                    fontFamily: 'Helvetica Neue, sans-serif', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.borderColor = '#c9a96e'}
                    onMouseLeave={e => e.target.style.borderColor = '#333'}
                  >−</button>
                  <div style={{ width: '40px', height: '32px', background: '#111', border: '1px solid #333', borderLeft: 'none', borderRight: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#f5f0e8' }}>
                    {item.quantity}
                  </div>
                  <button onClick={() => updateQuantity(item._id, item.quantity + 1)} style={{
                    width: '32px', height: '32px', background: 'transparent',
                    border: '1px solid #333', color: '#f5f0e8', cursor: 'pointer',
                    fontFamily: 'Helvetica Neue, sans-serif', fontSize: '16px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'border-color 0.2s',
                  }}
                    onMouseEnter={e => e.target.style.borderColor = '#c9a96e'}
                    onMouseLeave={e => e.target.style.borderColor = '#333'}
                  >+</button>
                </div>

                {/* PRICE */}
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '15px', fontWeight: 600, color: '#f5f0e8' }}>
                  ₹{item.price * item.quantity}
                  {item.originalPrice && (
                    <div style={{ fontSize: '12px', color: '#555', textDecoration: 'line-through', fontWeight: 400 }}>₹{item.originalPrice * item.quantity}</div>
                  )}
                </div>

                {/* REMOVE */}
                <button onClick={() => handleRemove(item._id, item.title)} style={{
                  background: 'transparent', border: 'none', color: '#444',
                  cursor: 'pointer', fontSize: '18px', transition: 'color 0.2s',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}
                  onMouseEnter={e => e.target.style.color = '#ff6b6b'}
                  onMouseLeave={e => e.target.style.color = '#444'}
                >
                  ✕
                </button>

              </div>
            ))}

            {/* CLEAR CART */}
            <div style={{ marginTop: '24px' }}>
              <button onClick={clearCart} style={{
                background: 'transparent', border: 'none',
                fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px',
                letterSpacing: '0.15em', textTransform: 'uppercase',
                color: '#444', cursor: 'pointer', transition: 'color 0.2s',
              }}
                onMouseEnter={e => e.target.style.color = '#ff6b6b'}
                onMouseLeave={e => e.target.style.color = '#444'}
              >
                Clear Cart
              </button>
            </div>

          </div>

          {/* ORDER SUMMARY */}
          <div style={{ padding: '48px 40px', background: '#0d0d0d' }}>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '32px' }}>
              Order Summary
            </div>

            {/* LINES */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '32px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#666' }}>Subtotal ({cart.reduce((a, i) => a + i.quantity, 0)} items)</span>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#f5f0e8' }}>₹{subtotal}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#666' }}>Delivery</span>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#c9a96e', letterSpacing: '0.05em' }}>Free</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#666' }}>Delivery Time</span>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#f5f0e8' }}>⚡ 10 mins</span>
              </div>
            </div>

            {/* DIVIDER */}
            <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '24px' }} />

            {/* TOTAL */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
              <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: '#888' }}>Total</span>
              <span style={{ fontSize: '28px', fontWeight: 400, color: '#f5f0e8' }}>₹{total}</span>
            </div>

            {/* CHECKOUT BTN */}
            <Link href="/checkout" style={{
              display: 'block', width: '100%', padding: '16px',
              background: '#c9a96e', color: '#0a0a0a', textAlign: 'center',
              fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px',
              letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 700,
            }}>
              Proceed to Checkout →
            </Link>

            {/* CONTINUE SHOPPING */}
            <Link href="/browse" style={{
              display: 'block', width: '100%', padding: '14px',
              border: '1px solid #333', color: '#888', textAlign: 'center',
              fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px',
              letterSpacing: '0.15em', textTransform: 'uppercase',
              marginTop: '12px', transition: 'border-color 0.2s',
            }}
              onMouseEnter={e => e.currentTarget.style.borderColor = '#c9a96e'}
              onMouseLeave={e => e.currentTarget.style.borderColor = '#333'}
            >
              Continue Browsing
            </Link>

            {/* TRUST BADGES */}
            <div style={{ marginTop: '40px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['⚡', 'Delivered in 10 minutes'], ['🔒', 'Secure checkout'], ['↩️', 'Easy returns']].map(([icon, text]) => (
                <div key={text} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '14px' }}>{icon}</span>
                  <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#555', letterSpacing: '0.05em' }}>{text}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      )}

      {/* TOAST */}
      <div className={`toast ${toast ? 'show' : ''}`} style={{ background: '#1a1a1a', color: '#f5f0e8', border: '1px solid #333' }}>
        {toastMsg}
      </div>

    </main>
  );
}