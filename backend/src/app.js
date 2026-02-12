import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.js';
import { errorHandler } from './middleware/errorHandler.js';
import storeRoutes from './routes/store.js';
import productRoutes from './routes/product.js';
import cartRoutes from './routes/cart.js';

export const app = express();

app.use(cors());
app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok', service: 'velora-backend' });
});

app.use('/api/auth', authRoutes);
app.use('/api/stores', storeRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use(errorHandler);
