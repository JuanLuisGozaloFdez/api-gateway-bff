import express from 'express';
import cors from 'cors';
import { globalLimiter, authLimiter, ticketsLimiter } from './middleware/rateLimiting';
import * as gatewayController from './controllers/gatewayController';

const app = express();

app.use(cors());
app.use(express.json());

// Apply global rate limiter
app.use(globalLimiter);

// Health check
app.get('/health', (_req, res) => res.json({ status: 'ok', service: 'api-gateway-bff' }));

// Proxy routes with specific rate limiters
app.use('/api/auth', authLimiter, gatewayController.proxyAuth);
app.use('/api/tickets', ticketsLimiter, gatewayController.proxyTickets);
app.use('/api/payments', ticketsLimiter, gatewayController.proxyPayments);

// 404 handler
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

export default app;
