import { drizzle } from 'drizzle-orm/postgres-js';
import { drizzle as drizzleSqlite } from 'drizzle-orm/better-sqlite3';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import Database from 'better-sqlite3';
import * as schema from '@shared/schema';

// Detect if we're running locally (no DATABASE_URL or contains localhost)
const isLocal = !process.env.DATABASE_URL || 
                process.env.DATABASE_URL.includes('localhost') || 
                process.env.NODE_ENV === 'development';

let db: any;
let queryClient: any;

if (isLocal) {
  // Use SQLite for local development
  console.log('Using SQLite database for local development');
  const sqlite = new Database('./local_database.db');
  db = drizzleSqlite(sqlite, { schema });
  queryClient = sqlite;
} else {
  // Use PostgreSQL for production
  console.log('Using PostgreSQL database for production');
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is required for production');
  }
  queryClient = postgres(process.env.DATABASE_URL);
  db = drizzle(queryClient, { schema });
}

export { db };

// Run migrations (this will create tables if they don't exist)
export async function runMigrations() {
  console.log('Running database migrations...');
  try {
    if (isLocal) {
      // SQLite migrations
      queryClient.exec(`
        CREATE TABLE IF NOT EXISTS users (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          email TEXT,
          stripe_customer_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      queryClient.exec(`
        CREATE TABLE IF NOT EXISTS orders (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          stripe_invoice_id TEXT,
          stripe_payment_intent_id TEXT,
          amount INTEGER NOT NULL,
          status TEXT NOT NULL,
          items TEXT NOT NULL,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);

      queryClient.exec(`
        CREATE TABLE IF NOT EXISTS agent_subscriptions (
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          user_id INTEGER NOT NULL,
          agent_id TEXT NOT NULL,
          status TEXT NOT NULL,
          trial_end_date DATETIME,
          stripe_subscription_id TEXT,
          created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
          updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
      `);
    } else {
      // PostgreSQL migrations
      await queryClient`
        CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          username TEXT NOT NULL UNIQUE,
          password TEXT NOT NULL,
          email TEXT,
          stripe_customer_id TEXT,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;

      await queryClient`
        CREATE TABLE IF NOT EXISTS orders (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          stripe_invoice_id TEXT,
          stripe_payment_intent_id TEXT,
          amount INTEGER NOT NULL,
          status TEXT NOT NULL,
          items TEXT NOT NULL,
          created_at TIMESTAMP DEFAULT NOW()
        )
      `;

      await queryClient`
        CREATE TABLE IF NOT EXISTS agent_subscriptions (
          id SERIAL PRIMARY KEY,
          user_id INTEGER NOT NULL,
          agent_id TEXT NOT NULL,
          status TEXT NOT NULL,
          trial_end_date TIMESTAMP,
          stripe_subscription_id TEXT,
          created_at TIMESTAMP DEFAULT NOW(),
          updated_at TIMESTAMP DEFAULT NOW()
        )
      `;
    }

    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}