import { Router } from 'express';
import { addItemToCart, getCart, removeCartItem } from '../controllers/cartController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.get('/', requireAuth, requireRole('buyer'), getCart);
router.post('/items', requireAuth, requireRole('buyer'), addItemToCart);
router.delete('/items/:productId', requireAuth, requireRole('buyer'), removeCartItem);

export default router;
