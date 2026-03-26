'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';
import { useSearchParams } from 'next/navigation';

const categories = ['All', 'Fiction', 'Business', 'Self Help', 'Science', 'History', 'Fantasy', 'Finance'];
const sortOptions = [
  { label: 'Relevance', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Top Rated', value: 'rating' },
];

function BrowseContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';

  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState(initialCategory);
  const [sort, setSort] = useState('');
  const [toast, setToast] = useState(false);
  const [addedId, setAddedId] = useState(null);
  const { addToCart } = useCart();

  useEffect(() => {
    fetchBooks();
  }, [category, sort]);

  async function fetchBooks() {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (category && category !== 'All') params.set('category', category);
    if (sort) params.set('sort', sort);
    const res = await fetch(`/api/books?${params.toString()}`);
    const data = await res.json();
    setBooks(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function handleSearch(e) {
    e.preventDefault();
    fetchBooks();
  }

  function handleAddToCart(book) {
    addToCart(book);
    setAddedId(book._id);
    setToast(true);
    setTimeout(() => { setToast(false); setAddedId(null); }, 2000);
  }

  return (
    <main style={{ background: '#0a0a0a', minHeight: '100vh', color: '#f5f0e8' }}>

      {/* PAGE HEADER */}
      <section style={{ padding: '64px 60px 48px', borderBottom: '1px solid #1a1a1a' }}>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>
          Our Collection
        </div>
        <h1 style={{ fontSize: '42px', fontWeight: 400, fontStyle: 'italic', color: '#f5f0e8', marginBottom: '32px' }}>
          Browse <strong style={{ fontStyle: 'normal' }}>All Books</strong>
        </h1>

        {/* SEARCH BAR */}
        <form onSubmit={handleSearch} style={{ display: 'flex', gap: '0', maxWidth: '560px' }}>
          <input
            type="text"
            placeholder="Search by title or author..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              flex: 1, padding: '13px 20px',
              background: '#111', border: '1px solid #333',
              borderRight: 'none', color: '#f5f0e8',
              fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px',
              outline: 'none', letterSpacing: '0.03em',
            }}
          />
          <button type="submit" style={{
            padding: '13px 28px', background: '#c9a96e', border: 'none',
            color: '#0a0a0a', fontFamily: 'Helvetica Neue, sans-serif',
            fontSize: '12px', letterSpacing: '0.15em', textTransform: 'uppercase',
            fontWeight: 700, cursor: 'pointer',
          }}>
            Search
          </button>
        </form>
      </section>

      <div style={{ display: 'flex', minHeight: 'calc(100vh - 300px)' }}>

        {/* SIDEBAR */}
        <aside style={{ width: '240px', flexShrink: 0, borderRight: '1px solid #1a1a1a', padding: '40px 32px' }}>

          <div style={{ marginBottom: '48px' }}>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>
              Genre
            </div>
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 0', background: 'transparent', border: 'none',
                borderBottom: '1px solid #1a1a1a', cursor: 'pointer',
                fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px',
                letterSpacing: '0.05em', color: category === cat ? '#c9a96e' : '#666',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => { if (category !== cat) e.target.style.color = '#f5f0e8'; }}
                onMouseLeave={e => { if (category !== cat) e.target.style.color = '#666'; }}
              >
                {cat}
                {category === cat && <span style={{ float: 'right', color: '#c9a96e' }}>—</span>}
              </button>
            ))}
          </div>

          <div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '20px' }}>
              Sort By
            </div>
            {sortOptions.map(opt => (
              <button key={opt.value} onClick={() => setSort(opt.value)} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 0', background: 'transparent', border: 'none',
                borderBottom: '1px solid #1a1a1a', cursor: 'pointer',
                fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px',
                letterSpacing: '0.05em', color: sort === opt.value ? '#c9a96e' : '#666',
                transition: 'color 0.2s',
              }}
                onMouseEnter={e => { if (sort !== opt.value) e.target.style.color = '#f5f0e8'; }}
                onMouseLeave={e => { if (sort !== opt.value) e.target.style.color = '#666'; }}
              >
                {opt.label}
                {sort === opt.value && <span style={{ float: 'right', color: '#c9a96e' }}>—</span>}
              </button>
            ))}
          </div>

        </aside>

        {/* BOOKS GRID */}
        <div style={{ flex: 1, padding: '40px 48px' }}>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '13px', color: '#555', letterSpacing: '0.05em' }}>
              {loading ? 'Loading...' : `${books.length} titles found`}
            </div>
            <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#c9a96e' }}>
              {category !== 'All' ? category : 'All Genres'}
            </div>
          </div>

          {loading && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {[...Array(6)].map((_, i) => (
                <div key={i}>
                  <div style={{ background: '#111', aspectRatio: '2/3', marginBottom: '16px' }} />
                  <div style={{ background: '#111', height: '12px', marginBottom: '8px', width: '60%' }} />
                  <div style={{ background: '#111', height: '10px', width: '40%' }} />
                </div>
              ))}
            </div>
          )}

          {!loading && books.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0' }}>
              <div style={{ fontSize: '64px', marginBottom: '24px' }}>📭</div>
              <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e', marginBottom: '12px' }}>No Results</div>
              <p style={{ fontSize: '22px', fontStyle: 'italic', color: '#555', marginBottom: '24px' }}>No books found.</p>
              <button onClick={() => { setSearch(''); setCategory('All'); setSort(''); }} style={{
                fontFamily: 'Helvetica Neue, sans-serif', fontSize: '12px', letterSpacing: '0.15em',
                textTransform: 'uppercase', border: '1px solid #c9a96e', color: '#c9a96e',
                padding: '11px 28px', background: 'transparent', cursor: 'pointer',
              }}>
                Clear Filters
              </button>
            </div>
          )}

          {!loading && books.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
              {books.map(book => (
                <div key={book._id}>
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
                        {addedId === book._id ? 'Added ✓' : 'Add to Cart'}
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
                    <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', color: '#555', marginTop: '6px' }}>
                      ⭐ {book.rating} · ⚡ {book.deliveryTime}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={`toast ${toast ? 'show' : ''}`}>Added to cart</div>
    </main>
  );
}

export default function BrowsePage() {
  return (
    <Suspense fallback={
      <main style={{ background: '#0a0a0a', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: 'Helvetica Neue, sans-serif', fontSize: '11px', letterSpacing: '0.25em', textTransform: 'uppercase', color: '#c9a96e' }}>Loading...</div>
      </main>
    }>
      <BrowseContent />
    </Suspense>
  );
}