export const SERVICE_URLS = {
  TICKETS: process.env.TICKETS_SERVICE_URL || 'http://localhost:3001',
  AUTH: process.env.AUTH_SERVICE_URL || 'http://localhost:3002',
  PAYMENTS: process.env.PAYMENTS_SERVICE_URL || 'http://localhost:3003',
  NOTIFICATIONS: process.env.NOTIFICATIONS_SERVICE_URL || 'http://localhost:3004'
};

export const SERVICES = {
  tickets: { url: SERVICE_URLS.TICKETS, timeout: 5000 },
  auth: { url: SERVICE_URLS.AUTH, timeout: 5000 },
  payments: { url: SERVICE_URLS.PAYMENTS, timeout: 10000 },
  notifications: { url: SERVICE_URLS.NOTIFICATIONS, timeout: 5000 }
};
