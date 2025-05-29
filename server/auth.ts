import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Express } from "express";
import session from "express-session";
import { scrypt, randomBytes, timingSafeEqual } from "crypto";
import { promisify } from "util";
import { storage } from "./storage";
import { User as SelectUser } from "@shared/schema";

declare global {
  namespace Express {
    interface User extends SelectUser {}
  }
}

const scryptAsync = promisify(scrypt);

async function hashPassword(password: string) {
  const salt = randomBytes(16).toString("hex");
  const buf = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${buf.toString("hex")}.${salt}`;
}

async function comparePasswords(supplied: string, stored: string) {
  try {
    const [hashed, salt] = stored.split(".");
    const hashedBuf = Buffer.from(hashed, "hex");
    const suppliedBuf = (await scryptAsync(supplied, salt, 64)) as Buffer;
    return timingSafeEqual(hashedBuf, suppliedBuf);
  } catch (error) {
    console.error("Password comparison error:", error);
    return false;
  }
}

export function setupAuth(app: Express) {
  const sessionSettings: session.SessionOptions = {
    secret: process.env.SESSION_SECRET || "crispai-marketplace-secret",
    resave: false,
    saveUninitialized: false,
    store: storage.sessionStore,
    cookie: {
      secure: false, // Fix for development
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
      sameSite: 'lax' // Fix for cross-origin issues
    }
  };

  app.set("trust proxy", 1);
  app.use(session(sessionSettings));
  app.use(passport.initialize());
  app.use(passport.session());

  passport.use(
    new LocalStrategy(
      { usernameField: 'email' }, // Change the default 'username' field to 'email'
      async (email, password, done) => {
        try {
          const user = await storage.getUserByEmail(email);
          if (!user) {
            return done(null, false);
          }
          
          // Check password
          const isPasswordValid = await comparePasswords(password, user.password);
          if (!isPasswordValid) {
            return done(null, false);
          }
          
          return done(null, user);
        } catch (error) {
          console.error("Authentication error:", error);
          return done(null, false);
        }
      }
    ),
  );

  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser(async (id: number, done) => {
    const user = await storage.getUser(id);
    done(null, user);
  });

  app.post("/api/register", async (req, res, next) => {
    try {
      const existingUser = await storage.getUserByEmail(req.body.email);
      if (existingUser) {
        return res.status(400).json({ message: "Email already exists" });
      }

      // Create user with hashed password
      const hashedPassword = await hashPassword(req.body.password);
      const user = await storage.createUser({
        ...req.body,
        password: hashedPassword,
      });

      // Return success without auto-login
      res.status(201).json({ 
        message: "Registration successful. Please log in.", 
        success: true 
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed. Please try again." });
    }
  });

  app.post("/api/login", (req, res, next) => {
    // Set content type for login responses
    res.setHeader('Content-Type', 'application/json');
    
    // Validate request body
    if (!req.body || !req.body.email || !req.body.password) {
      return res.status(400).json({ 
        message: "Missing email or password", 
        success: false 
      });
    }
    
    // Additional validation for empty values
    if (!req.body.email.trim() || !req.body.password.trim()) {
      return res.status(400).json({ 
        message: "Email and password cannot be empty", 
        success: false 
      });
    }
    
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        console.error("Authentication error:", err);
        return res.status(500).json({ 
          message: "Authentication error occurred", 
          success: false 
        });
      }
      
      if (!user) {
        return res.status(401).json({ 
          message: "Invalid username or password", 
          success: false 
        });
      }
      
      req.login(user, (loginErr) => {
        if (loginErr) {
          console.error("Login error:", loginErr);
          return res.status(500).json({ 
            message: "Login error occurred", 
            success: false 
          });
        }
        
        return res.status(200).json({
          ...user,
          success: true
        });
      });
    })(req, res, next);
  });

  app.post("/api/logout", (req, res, next) => {
    req.logout((err) => {
      if (err) return next(err);
      res.sendStatus(200);
    });
  });

  app.get("/api/user", (req, res) => {
    // Set content type for API user info responses
    res.setHeader('Content-Type', 'application/json');
    
    if (!req.isAuthenticated()) {
      return res.status(401).json({ message: "Not authenticated", success: false });
    }
    
    res.status(200).json({
      ...req.user,
      success: true
    });
  });
}