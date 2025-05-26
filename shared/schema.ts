import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  email: text("email").notNull().unique(),
  password: text("password").notNull(),
  name: text("name"),
  stripeCustomerId: text("stripe_customer_id"),
  subscribedAgents: text("subscribed_agents").array().default([]), // Array of agent IDs user has access to
  trialEndsAt: timestamp("trial_ends_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

// New table for agent subscriptions
export const agentSubscriptions = pgTable("agent_subscriptions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  agentId: text("agent_id").notNull(), // e.g., "resume-analyzer", "business-intelligence", etc.
  stripeSubscriptionId: text("stripe_subscription_id").notNull(),
  status: text("status").notNull(), // active, trialing, past_due, canceled, etc.
  priceId: text("price_id").notNull(), // Stripe price ID for this agent
  currentPeriodStart: timestamp("current_period_start"),
  currentPeriodEnd: timestamp("current_period_end"),
  trialEnd: timestamp("trial_end"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  email: true,
  password: true,
  name: true,
});

export const orders = pgTable("orders", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull(),
  stripeInvoiceId: text("stripe_invoice_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  amount: integer("amount").notNull(), // amount in cents
  status: text("status").notNull(), // pending, completed, failed
  items: text("items").notNull(), // JSON string of cart items
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertOrderSchema = createInsertSchema(orders).omit({
  id: true,
  createdAt: true,
});

export const insertAgentSubscriptionSchema = createInsertSchema(agentSubscriptions).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertOrder = z.infer<typeof insertOrderSchema>;
export type Order = typeof orders.$inferSelect;
export type InsertAgentSubscription = z.infer<typeof insertAgentSubscriptionSchema>;
export type AgentSubscription = typeof agentSubscriptions.$inferSelect;

// Agent pricing configuration
export const AGENT_PLANS = {
  "resume-analyzer": {
    name: "Resume Analyzer Agent",
    monthlyPrice: 19.00,
    description: "Professional resume evaluation tool with detailed feedback and ATS compatibility assessment",
    features: ["Resume Analysis", "ATS Compatibility Check", "Improvement Suggestions", "Score Rating"]
  },
  "business-intelligence": {
    name: "Business Intelligence Agent",
    monthlyPrice: 49.00,
    description: "Advanced business analytics and intelligence platform for data-driven decisions",
    features: ["Advanced Analytics", "Custom Reports", "Data Visualization", "Business Insights"]
  },
  "sop-assistant": {
    name: "SOP Assistant Agent",
    monthlyPrice: 29.00,
    description: "Standard Operating Procedures creation and management assistant",
    features: ["SOP Creation", "Process Documentation", "Workflow Optimization", "Template Library"]
  },
  "ai-recruitment": {
    name: "AI Recruitment Assistant",
    monthlyPrice: 39.00,
    description: "Intelligent recruitment assistance for candidate screening and evaluation",
    features: ["Candidate Screening", "Interview Questions", "Skill Assessment", "Hiring Recommendations"]
  },
  "crisp-write": {
    name: "CrispWrite Agent",
    monthlyPrice: 24.00,
    description: "AI-powered writing assistant for professional content creation",
    features: ["Content Writing", "Grammar Check", "Style Enhancement", "Professional Formatting"]
  }
} as const;
