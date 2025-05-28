import { users, type User, type InsertUser, type Order, type InsertOrder, orders, agentSubscriptions, type AgentSubscription, type InsertAgentSubscription } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, data: Partial<User>): Promise<User | undefined>;
  updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined>;
  
  // Agent subscription operations
  createAgentSubscription(subscription: InsertAgentSubscription): Promise<AgentSubscription>;
  getUserAgentSubscriptions(userId: number): Promise<AgentSubscription[]>;
  getAgentSubscription(userId: number, agentId: string): Promise<AgentSubscription | undefined>;
  updateAgentSubscription(id: number, data: Partial<AgentSubscription>): Promise<AgentSubscription | undefined>;
  checkAgentAccess(userId: number, agentId: string): Promise<boolean>;
  addAgentToUser(userId: number, agentId: string): Promise<User | undefined>;
  
  // Order operations
  createOrder(order: InsertOrder): Promise<Order>;
  getOrdersByUser(userId: number): Promise<Order[]>;
  getOrderById(id: number): Promise<Order | undefined>;
  updateOrderStatus(id: number, status: string): Promise<Order | undefined>;
  
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private orders: Map<number, Order>;
  private agentSubscriptions: Map<number, AgentSubscription>;
  currentId: number;
  currentOrderId: number;
  currentSubscriptionId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.orders = new Map();
    this.agentSubscriptions = new Map();
    this.currentId = 1;
    this.currentOrderId = 1;
    this.currentSubscriptionId = 1;
    
    // Add default users for testing
    const defaultAdmin: User = {
      id: this.currentId++,
      email: "admin@crispai.com",
      password: "241f86f01627cb622477a4358b5196dac3121f7d85c913878637f2304090b25e56c96defceb514aae14f8442f5fb9d84d2b0a94e086c115b243c3fa621b58fea.bbed7c3735f5316bd3241abe71a316ba",
      name: "Admin User",
      stripeCustomerId: null,
      subscribedAgents: ["resume-analyzer", "business-intelligence", "sop-assistant", "ai-recruitment", "crisp-write"], // Admin has access to all
      trialEndsAt: null,
      createdAt: new Date()
    };
    
    // Add a test user with simple credentials (email: test@crispai.com, password: test123)
    const testUser: User = {
      id: this.currentId++,
      email: "test@crispai.com",
      password: "11f86a4b7df75abb2bc524547c2240adffd9e04f4b1c5d97ba91b6a51f50332187cb6b70d6bac42edd271fa5bbd2732ebd34429bb9cad2e4fc2a7ff7da230a10.da5cccb6ff78b26c",
      name: "Test User",
      stripeCustomerId: null,
      subscribedAgents: [],
      trialEndsAt: null,
      createdAt: new Date()
    };
    
    this.users.set(defaultAdmin.id, defaultAdmin);
    this.users.set(testUser.id, testUser);
    
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  // User operations
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.email === email,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    
    // Calculate trial end date (7 days from now)
    const trialEndsAt = new Date();
    trialEndsAt.setDate(trialEndsAt.getDate() + 7);
    
    const user: User = { 
      ...insertUser, 
      id,
      name: insertUser.name || null,
      stripeCustomerId: null,
      subscribedAgents: [], // Start with no agent subscriptions
      trialEndsAt, // 7-day trial period
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(id: number, data: Partial<User>): Promise<User | undefined> {
    const user = this.users.get(id);
    if (!user) return undefined;
    
    const updatedUser = { ...user, ...data };
    this.users.set(id, updatedUser);
    return updatedUser;
  }

  async updateStripeCustomerId(userId: number, stripeCustomerId: string): Promise<User | undefined> {
    return this.updateUser(userId, { stripeCustomerId });
  }
  
  // Agent subscription operations
  async createAgentSubscription(subscription: InsertAgentSubscription): Promise<AgentSubscription> {
    const id = this.currentSubscriptionId++;
    const agentSub: AgentSubscription = {
      ...subscription,
      id,
      createdAt: new Date()
    };
    this.agentSubscriptions.set(id, agentSub);
    return agentSub;
  }

  async getUserAgentSubscriptions(userId: number): Promise<AgentSubscription[]> {
    return Array.from(this.agentSubscriptions.values()).filter(
      (sub) => sub.userId === userId
    );
  }

  async getAgentSubscription(userId: number, agentId: string): Promise<AgentSubscription | undefined> {
    return Array.from(this.agentSubscriptions.values()).find(
      (sub) => sub.userId === userId && sub.agentId === agentId
    );
  }

  async updateAgentSubscription(id: number, data: Partial<AgentSubscription>): Promise<AgentSubscription | undefined> {
    const subscription = this.agentSubscriptions.get(id);
    if (!subscription) return undefined;
    
    const updatedSub = { ...subscription, ...data };
    this.agentSubscriptions.set(id, updatedSub);
    return updatedSub;
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
  async createOrder(orderData: InsertOrder): Promise<Order> {
    const id = this.currentOrderId++;
    const order: Order = {
      ...orderData,
      id,
      stripeInvoiceId: orderData.stripeInvoiceId || null,
      stripePaymentIntentId: orderData.stripePaymentIntentId || null,
      createdAt: new Date()
    };
    this.orders.set(id, order);
    return order;
  }

  async getOrdersByUser(userId: number): Promise<Order[]> {
    return Array.from(this.orders.values()).filter(
      (order) => order.userId === userId
    );
  }

  async getOrderById(id: number): Promise<Order | undefined> {
    return this.orders.get(id);
  }

  async updateOrderStatus(id: number, status: string): Promise<Order | undefined> {
    const order = this.orders.get(id);
    if (!order) return undefined;
    
    const updatedOrder = { ...order, status };
    this.orders.set(id, updatedOrder);
    return updatedOrder;
  }
}

// Use simple in-memory storage for development
export const storage = new MemStorage();
