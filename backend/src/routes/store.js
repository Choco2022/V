import { Router } from 'express';
import { createStore, getSellerDashboard, getStoreBySlug } from '../controllers/storeController.js';
import { requireAuth, requireRole } from '../middleware/auth.js';

const router = Router();

router.post('/', requireAuth, requireRole('seller'), createStore);
router.get('/dashboard/me', requireAuth, requireRole('seller'), getSellerDashboard);
router.get('/:slug', getStoreBySlug);

export default router;
