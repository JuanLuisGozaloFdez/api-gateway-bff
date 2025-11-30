import { Request, Response } from 'express';
import * as proxyService from '../services/proxyService';

export const proxyTickets = async (req: Request, res: Response) => {
  try {
    const result = await proxyService.proxyToService(
      'tickets',
      req.method,
      req.path.replace('/api/tickets', ''),
      req.body,
      req.headers
    );
    res.status(200).json(result);
  } catch (err: any) {
    res.status(503).json({ error: err.message });
  }
};

export const proxyAuth = async (req: Request, res: Response) => {
  try {
    const result = await proxyService.proxyToService(
      'auth',
      req.method,
      req.path.replace('/api/auth', ''),
      req.body,
      req.headers
    );
    res.status(200).json(result);
  } catch (err: any) {
    res.status(503).json({ error: err.message });
  }
};

export const proxyPayments = async (req: Request, res: Response) => {
  try {
    const result = await proxyService.proxyToService(
      'payments',
      req.method,
      req.path.replace('/api/payments', ''),
      req.body,
      req.headers
    );
    res.status(200).json(result);
  } catch (err: any) {
    res.status(503).json({ error: err.message });
  }
};
