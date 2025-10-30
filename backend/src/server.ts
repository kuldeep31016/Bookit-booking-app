import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import experienceRoutes from './routes/experienceRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import promoRoutes from './routes/promoRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/experiences', experienceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/promo', promoRoutes);

app.use(errorHandler);

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Backend running on http://localhost:${port}`);
});


