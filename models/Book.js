import mongoose from 'mongoose';
const BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  cover: { type: String },
  category: { type: String },
  rating: { type: Number, default: 4 },
  reviews: { type: Number, default: 0 },
  inStock: { type: Boolean, default: true },
  deliveryTime: { type: String, default: '10 mins' },
  pages: { type: Number },
  language: { type: String, default: 'English' },
  publisher: { type: String },
  isbn: { type: String },
});
export default mongoose.models.Book || mongoose.model('Book', BookSchema);