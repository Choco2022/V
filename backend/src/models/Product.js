import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    storeId: { type: mongoose.Schema.Types.ObjectId, ref: 'Store', required: true, index: true },
    name: { type: String, required: true, trim: true },
    description: { type: String, trim: true },
    price: { type: Number, required: true, min: 0 },
    discount: { type: Number, min: 0, max: 100, default: 0 },
    stock: { type: Number, min: 0, default: 0 },
    images: [{ type: String, trim: true }],
    isActive: { type: Boolean, default: true }
  },
  { timestamps: true }
);

export const Product = mongoose.model('Product', productSchema);
