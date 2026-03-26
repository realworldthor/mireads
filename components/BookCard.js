'use client';
import Link from 'next/link';
import { useCart } from '@/components/CartContext';

export default function BookCard({ book }) {
  const { addToCart } = useCart();

  const discount =
    book.originalPrice && book.originalPrice > book.price
      ? Math.round(((book.originalPrice - book.price) / book.originalPrice) * 100)
      : null;

  return (
    <div
      className="bg-white rounded-[10px] border border-[#e5e7eb] overflow-hidden flex flex-col hover:shadow-md transition-shadow duration-200"
      style={{ fontFamily: 'Poppins, sans-serif' }}
    >
      {/* Cover */}
      <Link href={`/books/${book._id}`} className="block relative">
        <div className="w-full h-52 bg-[#fff4ee] flex items-center justify-center overflow-hidden">
          {book.cover ? (
            <img
              src={book.cover}
              alt={book.title}
              className="w-full h-full object-cover"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          ) : (
            <span className="text-6xl">📚</span>
          )}
        </div>
        {discount && (
          <span className="absolute top-2 left-2 bg-[#ff8c42] text-white text-xs font-semibold px-2 py-1 rounded-[20px]">
            {discount}% OFF
          </span>
        )}
        {!book.inStock && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="text-sm font-semibold text-[#6b7280]">Out of Stock</span>
          </div>
        )}
      </Link>

      {/* Info */}
      <div className="p-3 flex flex-col flex-1 gap-1">
        {book.category && (
          <span className="text-[11px] font-medium text-[#ff8c42] uppercase tracking-wide">
            {book.category}
          </span>
        )}
        <Link href={`/books/${book._id}`}>
          <h3 className="text-sm font-semibold text-[#1a1a1a] line-clamp-2 hover:text-[#ff8c42] transition-colors">
            {book.title}
          </h3>
        </Link>
        <p className="text-xs text-[#6b7280]">{book.author}</p>

        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <span key={star} className={`text-xs ${star <= Math.round(book.rating) ? 'text-yellow-400' : 'text-gray-200'}`}>
                ★
              </span>
            ))}
          </div>
          <span className="text-[11px] text-[#6b7280]">({book.reviews})</span>
        </div>

        {/* Delivery */}
        <div className="flex items-center gap-1 mt-1">
          <span className="text-[11px] bg-[#fff4ee] text-[#ff8c42] font-medium px-2 py-0.5 rounded-[20px]">
            ⚡ {book.deliveryTime}
          </span>
        </div>

        {/* Price + Add to Cart */}
        <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#e5e7eb]">
          <div>
            <span className="text-base font-bold text-[#1a1a1a]">₹{book.price}</span>
            {book.originalPrice && book.originalPrice > book.price && (
              <span className="text-xs text-[#6b7280] line-through ml-1">₹{book.originalPrice}</span>
            )}
          </div>
          <button
            onClick={() => addToCart(book)}
            disabled={!book.inStock}
            className="bg-[#ff8c42] text-white text-xs font-semibold px-3 py-1.5 rounded-[8px] hover:bg-[#e6722a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );
}