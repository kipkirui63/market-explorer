import { users, orders, type User, type InsertUser, type Order, type InsertOrder } from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";
import session from "express-session";
import connectPg from "connect-pg-simple";
import pg from "pg";
import { IStorage } from "./storage";

// Create PostgreSQL session store
const PostgresSessionStore = connectPg(session);

export class PostgresStorage implements IStorage {
  sessionStore: session.Store;
  
  constructor() {
    // Set up PostgreSQL session store
    const pool = new pg.Pool({
      connectionString: process.env.DATABASE_URL
    });
    
    this.sessionStore = new PostgresSessionStore({
      pool,
      createTableIfMissing: true
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return result[0];
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values({
      email: user.email,
      password: user.password,
      name: user.name || null
    }).returning();
    
    return result[0];
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const result = await db.update(users)
      .set(data)
      .where(eq(users.id, id))
      .returning();
    
    return result[0];
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined> {
    return this.updateUser(userId, { stripeCustomerId });
  }

  // Subscription operations
  async updateUserSubscription(userId: number, stripeSubscriptionId: string, status: string, trialEndsAt?: Date): Promise<User | undefined> {
    return this.updateUser(userId, { 
      stripeSubscriptionId, 
      subscriptionStatus: status,
      trialEndsAt 
    });
  }

  async checkUserSubscriptionAccess(userId: number): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;
    
    // Check if user has active subscription
    if (user.subscriptionStatus === 'active') return true;
    
    // Check if user is still in trial period
    if (user.subscriptionStatus === 'trialing' && user.trialEndsAt && new Date() < user.trialEndsAt) {
      return true;
    }
    
    return false;
  }

  // Order operations
  async createOrder(order: InsertOrder): Promise<Order> {
    const result = await db.insert(orders).values({
      userId: order.userId,
      amount: order.amount,
      status: order.status,
      items: order.items,
      stripeInvoiceId: order.stripeInvoiceId || null,
      stripePaymentIntentId: order.stripePaymentIntentId || null
    }).returning();
    
    return result[0];
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return db.select().from(orders).where(eq(orders.userId, userId));
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    const result = await db.select().from(orders).where(eq(orders.id, id)).limit(1);
    return result[0];
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const result = await db.update(orders)
      .set({ status })
      .where(eq(orders.id, id))
      .returning();
    
    return result[0];
  }
}