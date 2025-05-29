import express, { type Request, Response } from "express";
import { setupVite, serveStatic, log } from "./vite";
import { createProxyMiddleware } from 'http-proxy-middleware';
import { spawn } from 'child_process';

const app = express();

// Start Django backend
const startDjango = () => {
  log("Starting Django backend...");
  const django = spawn('python', ['manage.py', 'runserver', '0.0.0.0:8000'], {
    cwd: './backend',
    stdio: ['ignore', 'pipe', 'pipe']
  });

  django.stdout.on('data', (data) => {
    const output = data.toString();
    if (output.includes('Starting development server')) {
      log("Django backend started on port 8000");
    }
  });

  django.stderr.on('data', (data) => {
    console.error('Django error:', data.toString());
  });

  django.on('close', (code) => {
    console.log(`Django process exited with code ${code}`);
    // Restart Django if it crashes
    setTimeout(startDjango, 2000);
  });

  return django;
};

// Start Django backend
const djangoProcess = startDjango();

// Proxy API requests to Django backend
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:8000',
  changeOrigin: true,
  pathRewrite: {
    '^/api': '/api'
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

    // Fallback route for SPA
    app.get('*', (req, res) => {
      if (!req.path.startsWith('/api')) {
        // Let Vite handle the routing for the React app
        res.redirect('/');
      }
    });

    log(`Frontend server running on port 5000, proxying API to Django on port 8000`);
  } catch (error) {
    console.error('Failed to start frontend server:', error);
    process.exit(1);
  }
})();