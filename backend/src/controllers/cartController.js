import mongoose from 'mongoose';
import { Cart } from '../models/Cart.js';
import { Product } from '../models/Product.js';

async function getOrCreateCart(buyerId) {
  return (
    (await Cart.findOne({ buyerId })) ||
    Cart.create({
      buyerId,
      items: []
    })
  );
}

export async function getCart(req, res, next) {
  try {
    const cart = await getOrCreateCart(req.user._id);
    await cart.populate('items.productId');
    return res.json({ cart });
  } catch (error) {
    return next(error);
  }
}

export async function addItemToCart(req, res, next) {
  try {
    const { productId, quantity = 1 } = req.body;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid productId' });
    }

    const product = await Product.findById(productId);
    if (!product || !product.isActive) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const cart = await getOrCreateCart(req.user._id);
    const existingItem = cart.items.find((item) => item.productId.equals(product._id));

    if (existingItem) {
      existingItem.quantity += Number(quantity);
    } else {
      cart.items.push({ productId: product._id, quantity: Number(quantity) });
    }

    await cart.save();
    await cart.populate('items.productId');
    return res.status(201).json({ cart });
  } catch (error) {
    return next(error);
  }
}

export async function removeCartItem(req, res, next) {
  try {
    const { productId } = req.params;

    if (!mongoose.isValidObjectId(productId)) {
      return res.status(400).json({ message: 'Invalid productId' });
    }

    const cart = await getOrCreateCart(req.user._id);
    cart.items = cart.items.filter((item) => !item.productId.equals(productId));
    await cart.save();
    await cart.populate('items.productId');

    return res.json({ cart });
  } catch (error) {
    return next(error);
  }
}
