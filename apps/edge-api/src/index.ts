import { Hono } from 'hono';

const app = new Hono();

app.get('/health', (c) => {
  return c.json({ status: 'ok', service: 'aegis-upi-edge-api', timestamp: Date.now() });
});

export default app;

