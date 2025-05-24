import { drizzle } from 'drizzle-orm/postgres-js';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import postgres from 'postgres';
import * as schema from '@shared/schema';

// Check for required environment variables
if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create postgres connection
const queryClient = postgres(process.env.DATABASE_URL);

// Create drizzle database instance
export const db = drizzle(queryClient, { schema });

// Run migrations (this will create tables if they don't exist)
export async function runMigrations() {
  console.log('Running database migrations...');
  try {
    // Use direct SQL since we're not using the drizzle-kit migrations
    // Create users table if it doesn't exist
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

    // Create orders table if it doesn't exist
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

    console.log('Database migrations completed successfully');
  } catch (error) {
    console.error('Error running migrations:', error);
    throw error;
  }
}