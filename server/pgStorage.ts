import { users, orders, agentSubscriptions, type User, type InsertUser, type Order, type InsertOrder, type AgentSubscription, type InsertAgentSubscription } from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";
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

  // Agent subscription operations
  async createAgentSubscription(subscription: InsertAgentSubscription): Promise<AgentSubscription> {
    const result = await db.insert(agentSubscriptions).values({
      userId: subscription.userId,
      agentId: subscription.agentId,
      stripeSubscriptionId: subscription.stripeSubscriptionId,
      status: subscription.status,
      priceId: subscription.priceId,
      currentPeriodStart: subscription.currentPeriodStart || null,
      currentPeriodEnd: subscription.currentPeriodEnd || null,
      trialEnd: subscription.trialEnd || null
    }).returning();
    
    return result[0];
  }

  async getUserAgentSubscriptions(userId: number): Promise<AgentSubscription[]> {
    return db.select().from(agentSubscriptions).where(eq(agentSubscriptions.userId, userId));
  }

  async getAgentSubscription(userId: number, agentId: string): Promise<AgentSubscription | undefined> {
    const result = await db.select()
      .from(agentSubscriptions)
      .where(and(
        eq(agentSubscriptions.userId, userId),
        eq(agentSubscriptions.agentId, agentId)
      ))
      .limit(1);
    return result[0];
  }

  async updateAgentSubscription(id: number, data: Partial<AgentSubscription>): Promise<AgentSubscription | undefined> {
    const result = await db.update(agentSubscriptions)
      .set(data)
      .where(eq(agentSubscriptions.id, id))
      .returning();
    
    return result[0];
  }

  async checkAgentAccess(userId: number, agentId: string): Promise<boolean> {
    const user = await this.getUser(userId);
    if (!user) return false;

    // Admin always has access
    if (user.email === "admin@crispai.com") return true;

    // Check if user has agent in their subscribed agents list
    if (user.subscribedAgents && user.subscribedAgents.includes(agentId)) {
      return true;
    }

    // Check if user has active subscription for this agent
    const subscription = await this.getAgentSubscription(userId, agentId);
    if (subscription) {
      // Check if subscription is active or trialing
      if (subscription.status === 'active' || subscription.status === 'trialing') {
        return true;
      }
      
      // Check if still in trial period
      if (subscription.trialEnd && new Date(subscription.trialEnd) > new Date()) {
        return true;
      }
    }

    // Check global trial period
    if (user.trialEndsAt && new Date(user.trialEndsAt) > new Date()) {
      return true;
    }

    return false;
  }

  async addAgentToUser(userId: number, agentId: string): Promise<User | undefined> {
    const user = await this.getUser(userId);
    if (!user) return undefined;
    
    const currentAgents = user.subscribedAgents || [];
    if (!currentAgents.includes(agentId)) {
      const updatedAgents = [...currentAgents, agentId];
      return this.updateUser(userId, { subscribedAgents: updatedAgents });
    }
    
    return user;
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