import dotenv from 'dotenv';
import { app } from './app.js';
import { connectDatabase } from './config/db.js';

dotenv.config();

const port = Number(process.env.PORT || 5000);

async function startServer() {
  await connectDatabase(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`Velora backend is running on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start backend', error);
  process.exit(1);
});
