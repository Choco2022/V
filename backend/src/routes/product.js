import { Router } from 'express';
import { createProduct, getProductById, listStoreProducts } from '../controllers/productController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, requireRole('seller'), createProduct);
router.get('/store/:slug', listStoreProducts);
router.get('/:productId', getProductById);

export default router;
