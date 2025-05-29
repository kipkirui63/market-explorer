import express, { type Request, Response } from "express";
import { setupVite, serveStatic, log } from "./vite";
import { createProxyMiddleware } from 'http-proxy-middleware';

const app = express();

// Proxy API requests to Django backend
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(500).json({ error: 'Backend service unavailable' });
  }
}));

(async () => {
  try {
    const server = app.listen(5000, '0.0.0.0');
    
    // Setup Vite for frontend serving
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    log(`Frontend server running on port 5000, proxying API to Django on port 8000`);
  } catch (error) {
    console.error('Failed to start frontend server:', error);
    process.exit(1);
  }
})();