import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: 'Book' },
      title: String,
      cover: String,
      price: Number,
      quantity: Number,
    },
  ],
  total: { type: Number, required: true },
  address: {
    name: String,
    phone: String,
    street: String,
    city: String,
    pincode: String,
  },
  status: { type: String, default: 'placed' },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);