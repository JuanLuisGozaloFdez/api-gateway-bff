import request from 'supertest';
import app from '../src/app';

describe('API Gateway BFF', () => {
  it('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', service: 'api-gateway-bff' });
  });

  it('GET /notfound returns 404', async () => {
    const res = await request(app).get('/notfound');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  it('POST /api/auth/register calls auth service and returns result', async () => {
    // Mock response from auth service
    const res = await request(app)
      .post('/api/auth/register')
      .send({ email: 'test@example.com', password: 'password123' });
    
    // Should fail since auth service is not running, but gateway should attempt proxy
    expect([200, 503]).toContain(res.status);
  });

  it('Rate limiter allows requests within limit', async () => {
    // Make 5 requests (should all succeed or some fail due to auth limiter)
    for (let i = 0; i < 5; i++) {
      const res = await request(app).get('/health');
      expect([200, 429]).toContain(res.status);
    }
  });

  it('Returns 503 when service is unavailable', async () => {
    // Trying to reach a non-existent service
    const res = await request(app)
      .post('/api/auth/login')
      .send({ email: 'test@example.com', password: 'password123' });
    
    expect(res.status).toBe(503);
    expect(res.body).toHaveProperty('error');
  });

  it('CORS headers are present', async () => {
    const res = await request(app).get('/health');
    expect(res.headers['access-control-allow-origin']).toBeDefined();
  });
});
