import { users, type User, type InsertUser } from "@shared/schema";
import session from "express-session";
import createMemoryStore from "memorystore";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  sessionStore: session.Store;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  currentId: number;
  sessionStore: session.Store;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
    
    // Add default users for testing
    const defaultAdmin: User = {
      id: this.currentId++,
      username: "admin",
      password: "241f86f01627cb622477a4358b5196dac3121f7d85c913878637f2304090b25e56c96defceb514aae14f8442f5fb9d84d2b0a94e086c115b243c3fa621b58fea.bbed7c3735f5316bd3241abe71a316ba"
    };
    
    // Add a test user with simple credentials (username: test, password: test123)
    const testUser: User = {
      id: this.currentId++,
      username: "test",
      password: "11f86a4b7df75abb2bc524547c2240adffd9e04f4b1c5d97ba91b6a51f50332187cb6b70d6bac42edd271fa5bbd2732ebd34429bb9cad2e4fc2a7ff7da230a10.da5cccb6ff78b26c"
    };
    
    this.users.set(defaultAdmin.id, defaultAdmin);
    this.users.set(testUser.id, testUser);
    
    const MemoryStore = createMemoryStore(session);
    this.sessionStore = new MemoryStore({
      checkPeriod: 86400000, // prune expired entries every 24h
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
}

export const storage = new MemStorage();
