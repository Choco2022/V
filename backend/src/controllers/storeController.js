import { Store } from '../models/Store.js';

function slugifyStoreName(storeName) {
  return storeName
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function buildUniqueSlug(baseName) {
  const baseSlug = slugifyStoreName(baseName) || `store-${Date.now()}`;
  let slug = baseSlug;
  let attempt = 1;

  while (await Store.exists({ slug })) {
    attempt += 1;
    slug = `${baseSlug}-${attempt}`;
  }

  return slug;
}

export async function createStore(req, res, next) {
  try {
    const { storeName, logo, banner, themeColor, description, contactInfo, socialLinks } = req.body;

    if (!storeName?.trim()) {
      return res.status(400).json({ message: 'storeName is required' });
    }

    const existingStore = await Store.findOne({ ownerId: req.user._id });
    if (existingStore) {
      return res.status(409).json({ message: 'Seller already has a store' });
    }

    const slug = await buildUniqueSlug(storeName);
    const store = await Store.create({
      ownerId: req.user._id,
      storeName,
      slug,
      logo,
      banner,
      themeColor,
      description,
      contactInfo,
      socialLinks
    });

    return res.status(201).json({ store });
  } catch (error) {
    return next(error);
  }
}

export async function getSellerDashboard(req, res, next) {
  try {
    const store = await Store.findOne({ ownerId: req.user._id });

    if (!store) {
      return res.status(404).json({ message: 'Store not found for this seller' });
    }

    return res.json({
      store,
      summary: {
        totalSales: 0,
        totalOrders: 0,
        pendingOrders: 0,
        message: 'Analytics will be expanded in checkout/order phases'
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function getStoreBySlug(req, res, next) {
  try {
    const store = await Store.findOne({ slug: req.params.slug }).populate({
      path: 'ownerId',
      select: 'name'
    });

    if (!store) {
      return res.status(404).json({ message: 'Store not found' });
    }

    return res.json({ store });
  } catch (error) {
    return next(error);
  }
}
