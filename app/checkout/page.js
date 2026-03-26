'use client';

import { useState } from 'react';
import { useCart } from '@/components/CartContext';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function CheckoutPage() {
  const { cart, clearCart } = useCart();
  const { data: session } = useSession();
  const router = useRouter();

  const [form, setForm] = useState({
    name: session?.user?.name || '',
    phone: '',
    street: '',
    city: '',
    pincode: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1); // 1 = address, 2 = payment, 3 = success

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const delivery = 0;
  const total = subtotal + delivery;

  async function handlePlaceOrder() {
    if (!session) { router.push('/auth/login'); return; }
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart.map(item => ({
            book: item._id,
            title: item.title,
            cover: item.cover,
            price: item.price,
            quantity: item.quantity,
          })),
          total,
          address: form,
        }),
      });

      if (res.ok) {
        clearCart();
        setStep(3);
      } else {
        const data = await res.json();
        setError(data.error || 'Something went wrong.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
    setLoading(false);
  }

  // EMPTY CART
  if (cart.length === 0 && step !== 3) return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '64px', marginBottom: '24px' }}>🛒</div>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>Empty Cart</div>
        <p style={{ fontSize: '22px', fontStyle: 'italic', color: '#555', marginBottom: '32px' }}>Nothing to checkout yet.</p>
        <Link href="/browse" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', background: '#c9a96e', color: '#0a0a0a', padding: '14px 36px', fontWeight: 700 }}>
          Browse Books
        </Link>
      </div>
    </main>
  );

  // SUCCESS PAGE
  if (step === 3) return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#1a2a1a', border: '2px solid #4a9a6a', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', margin: '0 auto 32px' }}>✓</div>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '16px' }}>Order Confirmed</div>
        <h1 style={{ fontSize: '38px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8', marginBottom: '16px', lineHeight: 1.2 }}>
          Your books are<br /><strong style={{ fontStyle: 'normal' }}>on their way.</strong>
        </h1>
        <p style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '14px', color: '#666', lineHeight: 1.7, marginBottom: '16px' }}>
          Thank you for your order, <span style={{ color: '#c9a96e' }}>{form.name}</span>. Your books will be delivered to <span style={{ color: '#888' }}>{form.street}, {form.city}</span> in under 10 minutes.
        </p>
        <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: '20px', marginBottom: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555' }}>Estimated Delivery</div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '14px', color: '#c9a96e', fontWeight: 700 }}>⚡ Under 10 Minutes</div>
          </div>
        </div>
        <Link href="/" style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase', background: '#c9a96e', color: '#0a0a0a', padding: '14px 36px', fontWeight: 700 }}>
          Back to Home
        </Link>
      </div>
    </main>
  );

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8' }}>

      {/* HEADER */}
      <div style={{ padding: '32px 60px', borderBottom: '1px solid #1a1a1a', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '8px' }}>Almost There</div>
          <h1 style={{ fontSize: '32px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8' }}>
            Complete your <strong style={{ fontStyle: 'normal' }}>order.</strong>
          </h1>
        </div>

        {/* STEP INDICATOR */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          {[['1', 'Address'], ['2', 'Payment'], ['3', 'Done']].map(([num, label], idx) => (
            <div key={num} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{
                  width: '28px', height: '28px', borderRadius: '50%',
                  background: step > idx + 1 ? '#4a9a6a' : step === idx + 1 ? '#c9a96e' : 'transparent',
                  border: step <= idx + 1 ? `1px solid ${step === idx + 1 ? '#c9a96e' : '#333'}` : 'none',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', fontWeight: 700,
                  color: step >= idx + 1 ? '#0a0a0a' : '#555',
                }}>
                  {step > idx + 1 ? '✓' : num}
                </div>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.1em', textTransform: 'uppercase', color: step === idx + 1 ? '#f5f0e8' : '#444' }}>{label}</span>
              </div>
              {idx < 2 && <div style={{ width: '32px', height: '1px', background: '#222' }} />}
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 400px', gap: '0', minHeight: 'calc(100vh - 140px)' }}>

        {/* LEFT — FORM */}
        <div style={{ padding: '48px 60px', borderRight: '1px solid #1a1a1a' }}>

          {/* STEP 1 — ADDRESS */}
          {step === 1 && (
            <div>
              <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '32px' }}>
                Delivery Address
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '520px' }}>
                {[
                  { label: 'Full Name', key: 'name', type: 'text', placeholder: 'Manas Awasthi' },
                  { label: 'Phone Number', key: 'phone', type: 'tel', placeholder: '+91 98765 43210' },
                  { label: 'Street Address', key: 'street', type: 'text', placeholder: '123, MG Road, Hazratganj' },
                  { label: 'City', key: 'city', type: 'text', placeholder: 'Lucknow' },
                  { label: 'Pincode', key: 'pincode', type: 'text', placeholder: '226001' },
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
                  onClick={() => {
                    if (!form.name || !form.phone || !form.street || !form.city || !form.pincode) {
                      setError('Please fill all fields.'); return;
                    }
                    setError('');
                    setStep(2);
                  }}
                  style={{
                    padding: '14px 36px', background: '#c9a96e', border: 'none',
                    color: '#0a0a0a', fontFamily: 'Helvetica Neue, sans-serif',
                    fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
                    fontWeight: 700, cursor: 'pointer', marginTop: '8px', alignSelf: 'flex-start',
                  }}
                >
                  Continue to Payment →
                </button>

                {error && <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#ff6b6b' }}>{error}</div>}
              </div>
            </div>
          )}

          {/* STEP 2 — PAYMENT */}
          {step === 2 && (
            <div>
              <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '32px' }}>
                Payment Method
              </div>

              {/* DELIVERY ADDRESS SUMMARY */}
              <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: '20px 24px', marginBottom: '32px', maxWidth: '520px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#555' }}>Delivering to</div>
                  <button onClick={() => setStep(1)} style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', color: '#c9a96e', background: 'transparent', border: 'none', cursor: 'pointer', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Change</button>
                </div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '14px', color: '#f5f0e8', marginBottom: '4px' }}>{form.name} · {form.phone}</div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#666' }}>{form.street}, {form.city} — {form.pincode}</div>
              </div>

              {/* PAYMENT OPTIONS */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', maxWidth: '520px', marginBottom: '32px' }}>
                {[
                  { id: 'cod', icon: '💵', label: 'Cash on Delivery', sub: 'Pay when your books arrive' },
                  { id: 'upi', icon: '📱', label: 'UPI Payment', sub: 'GPay, PhonePe, Paytm' },
                  { id: 'card', icon: '💳', label: 'Credit / Debit Card', sub: 'Visa, Mastercard, RuPay' },
                ].map(opt => (
                  <div key={opt.id} style={{
                    padding: '20px 24px', border: '1px solid #c9a96e',
                    background: '#111', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', gap: '16px',
                  }}>
                    <span style={{ fontSize: '24px' }}>{opt.icon}</span>
                    <div>
                      <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '14px', color: '#f5f0e8', marginBottom: '2px' }}>{opt.label}</div>
                      <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#555' }}>{opt.sub}</div>
                    </div>
                    <div style={{ marginLeft: 'auto', width: '16px', height: '16px', borderRadius: '50%', background: '#c9a96e', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#0a0a0a', fontWeight: 700 }}>✓</div>
                  </div>
                ))}
              </div>

              {error && <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#ff6b6b', marginBottom: '16px' }}>{error}</div>}

              <div style={{ display: 'flex', gap: '12px', maxWidth: '520px' }}>
                <button onClick={() => setStep(1)} style={{
                  padding: '14px 24px', background: 'transparent',
                  border: '1px solid #333', color: '#888',
                  fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px',
                  letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer',
                }}>
                  ← Back
                </button>
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  style={{
                    flex: 1, padding: '14px 36px',
                    background: loading ? '#333' : '#c9a96e',
                    border: 'none', color: '#0a0a0a',
                    fontFamily: 'Helvetica Neue, sans-serif',
                    fontSize: '12px', letterSpacing: '0.15em',
                    textTransform: 'uppercase', fontWeight: 700,
                    cursor: loading ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? 'Placing Order...' : `Place Order · ₹${total}`}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT — ORDER SUMMARY */}
        <div style={{ padding: '48px 40px', background: '#0d0d0d' }}>
          <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '24px' }}>
            Order Summary
          </div>

          {/* ITEMS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '32px' }}>
            {cart.map((item, i) => (
              <div key={i} style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ width: '48px', height: '64px', background: '#111', flexShrink: 0, overflow: 'hidden' }}>
                  {item.cover
                    ? <img src={item.cover} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>📖</div>
                  }
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#f5f0e8', marginBottom: '4px', lineHeight: 1.3 }}>{item.title}</div>
                  <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#555' }}>Qty: {item.quantity}</div>
                </div>
                <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '14px', color: '#f5f0e8', fontWeight: 600 }}>₹{item.price * item.quantity}</div>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '24px' }} />

          {/* TOTALS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '24px' }}>
            {[
              ['Subtotal', `₹${subtotal}`],
              ['Delivery', delivery === 0 ? 'Free' : `₹${delivery}`],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#555', letterSpacing: '0.05em' }}>{label}</span>
                <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: value === 'Free' ? '#4a9a6a' : '#888' }}>{value}</span>
              </div>
            ))}
          </div>

          {/* DIVIDER */}
          <div style={{ height: '1px', background: '#1a1a1a', marginBottom: '24px' }} />

          {/* TOTAL */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '32px' }}>
            <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#888' }}>Total</span>
            <span style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '24px', fontWeight: 700, color: '#f5f0e8' }}>₹{total}</span>
          </div>

          {/* DELIVERY PROMISE */}
          <div style={{ background: '#111', border: '1px solid #1a1a1a', padding: '16px', textAlign: 'center' }}>
            <div style={{ fontSize: '20px', marginBottom: '6px' }}>⚡</div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '4px' }}>Express Delivery</div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', color: '#555' }}>Your books arrive in under 10 minutes</div>
          </div>

        </div>
      </div>
    </main>
  );
}