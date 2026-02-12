import mongoose from 'mongoose';

const storeSchema = new mongoose.Schema(
  {
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    storeName: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    logo: { type: String, trim: true },
    banner: { type: String, trim: true },
    themeColor: { type: String, trim: true, default: '#0A1F44' },
    description: { type: String, trim: true },
    contactInfo: {
      email: { type: String, trim: true, lowercase: true },
      phone: { type: String, trim: true },
      whatsapp: { type: String, trim: true }
    },
    socialLinks: {
      instagram: { type: String, trim: true },
      facebook: { type: String, trim: true },
      tiktok: { type: String, trim: true },
      x: { type: String, trim: true }
    }
  },
  { timestamps: true }
);

export const Store = mongoose.model('Store', storeSchema);
