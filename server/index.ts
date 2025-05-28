import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";
import { runMigrations } from "./db";
import { setupAuth } from "./auth";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Detect ajax requests and properly handle content-type
app.use((req, res, next) => {
  // Force API endpoints to always use JSON content type
  if (req.path.startsWith('/api')) {
    res.setHeader('Content-Type', 'application/json');
  }

  // Always prefer JSON responses for XHR/AJAX requests
  const isAjaxRequest = req.xhr || req.headers['x-requested-with'] === 'XMLHttpRequest';
  if (isAjaxRequest && !res.getHeader('Content-Type')) {
    res.setHeader('Content-Type', 'application/json');
  }
  
  // Logging setup
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    // Make sure we're sending JSON content type
    if (!res.getHeader('Content-Type')) {
      res.setHeader('Content-Type', 'application/json');
    }
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  // Generate a session secret if not available
  if (!process.env.SESSION_SECRET) {
    process.env.SESSION_SECRET = Math.random().toString(36).substring(2, 15) + 
                               Math.random().toString(36).substring(2, 15);
    console.log("Generated temporary SESSION_SECRET");
  }
  
  let server;
  
  try {
    // Initialize database
    await runMigrations();
    console.log("Database initialized successfully");
    
    // Set up authentication
    setupAuth(app);
    console.log("Authentication setup complete");
    
    // Register routes
    server = await registerRoutes(app);
    
    // Add middleware specifically for API routes to ensure JSON responses
    app.use('/api', (req: Request, res: Response, next: NextFunction) => {
      // Set content type to JSON for all API responses
      res.setHeader('Content-Type', 'application/json');
      next();
    });

    // Improved error handler
    app.use((err: any, req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";

      // Make sure we set the proper content type and don't throw after handling
      res.status(status).json({ message, error: true });
      console.error(`Error handling request: ${req.method} ${req.path}`, err);
    });

    // importantly only setup vite in development and after
    // setting up all the other routes so the catch-all route
    // doesn't interfere with the other routes
    if (app.get("env") === "development") {
      await setupVite(app, server);
    } else {
      serveStatic(app);
    }

    // ALWAYS serve the app on port 5000
    // this serves both the API and the client.
    // It is the only port that is not firewalled.
    const port = 5000;
    server.listen({
      port,
      host: "0.0.0.0",
      reusePort: true,
    }, () => {
      log(`serving on port ${port}`);
    });
  } catch (error) {
    console.error("Failed to initialize the application:", error);
    process.exit(1);
  }
})();