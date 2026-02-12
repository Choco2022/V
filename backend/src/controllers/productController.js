import mongoose from 'mongoose';
import { Product } from '../models/Product.js';
import { Store } from '../models/Store.js';

async function findSellerStore(userId) {
  return Store.findOne({ ownerId: userId });
}

export async function createProduct(req, res, next) {
  try {
    const { name, description, price, discount, stock, images } = req.body;
    const store = await findSellerStore(req.user._id);

    if (!store) {
      return res.status(404).json({ message: 'Create a store before adding products' });
    }

    if (!name?.trim() || price == null) {
      return res.status(400).json({ message: 'name and price are required' });
    }

    const product = await Product.create({
      storeId: store._id,
      name,
      description,
      price,
      discount,
      stock,
      images
    });

    return res.status(201).json({ product });
  } catch (error) {
    return next(error);
  }
}

export async function listStoreProducts(req, res, next) {
  try {
    const { slug } = req.params;
    const store = await Store.findOne({ slug });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    const products = await Product.find({ storeId: store._id, isActive: true }).sort({ createdAt: -1 });
    return res.json({ products });
  } catch (error) {
    return next(error);
  }
}

export async function getProductById(req, res, next) {
  try {
    if (!mongoose.isValidObjectId(req.params.productId)) {
      return res.status(400).json({ message: 'Invalid productId' });
    }

    const product = await Product.findById(req.params.productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    return res.json({ product });
  } catch (error) {
    return next(error);
  }
}
