import { sql } from 'drizzle-orm';
import { pgTable, uuid, text, varchar, integer, decimal, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";

// Type exports
export type User = typeof users.$inferSelect;
export type Product = typeof products.$inferSelect;
export type Category = typeof categories.$inferSelect;
export type Message = typeof messages.$inferSelect;
export type Review = typeof reviews.$inferSelect;

// Users table
export const users = pgTable('users', {
  id: uuid('id').primaryKey().defaultRandom(),
  email: varchar('email', { length: 255 }).unique(),
  phone: varchar('phone', { length: 20 }),
  fullName: text('full_name'),
  avatar: text('avatar_url'),
  location: text('location'),
  bio: text('bio'),
  isVerified: boolean('is_verified').default(false),
  rating: decimal('rating', { precision: 3, scale: 2 }).default('0.00'),
  totalRatings: integer('total_ratings').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Categories table
export const categories = pgTable('categories', {
  id: uuid('id').primaryKey().defaultRandom(),
  name: text('name').notNull(),
  nameAr: text('name_ar'),
  nameKu: text('name_ku'),
  description: text('description'),
  icon: text('icon'),
  isActive: boolean('is_active').default(true),
  sortOrder: integer('sort_order').default(0),
  createdAt: timestamp('created_at').defaultNow(),
});

// Products table
export const products = pgTable('products', {
  id: uuid('id').primaryKey().defaultRandom(),
  title: text('title').notNull(),
  description: text('description'),
  price: decimal('price', { precision: 10, scale: 2 }).notNull(),
  currency: varchar('currency', { length: 3 }).default('IQD'),
  condition: text('condition').notNull(), // New, Used - Like New, Used - Good, Used - Fair
  categoryId: uuid('category_id').references(() => categories.id),
  sellerId: uuid('seller_id').references(() => users.id),
  location: text('location'),
  images: jsonb('images').$type<string[]>().default([]),
  isActive: boolean('is_active').default(true),
  isSold: boolean('is_sold').default(false),
  isPromoted: boolean('is_promoted').default(false),
  views: integer('views').default(0),
  createdAt: timestamp('created_at').defaultNow(),
  updatedAt: timestamp('updated_at').defaultNow(),
});

// Messages table for chat
export const messages = pgTable('messages', {
  id: uuid('id').primaryKey().defaultRandom(),
  conversationId: uuid('conversation_id').notNull(),
  senderId: uuid('sender_id').references(() => users.id),
  receiverId: uuid('receiver_id').references(() => users.id),
  productId: uuid('product_id').references(() => products.id),
  content: text('content').notNull(),
  messageType: text('message_type').default('text'), // text, image, offer
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Reviews table
export const reviews = pgTable('reviews', {
  id: uuid('id').primaryKey().defaultRandom(),
  productId: uuid('product_id').references(() => products.id),
  sellerId: uuid('seller_id').references(() => users.id),
  buyerId: uuid('buyer_id').references(() => users.id),
  rating: integer('rating').notNull(), // 1-5 stars
  comment: text('comment'),
  isAnonymous: boolean('is_anonymous').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});

// Favorites table
export const favorites = pgTable('favorites', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  productId: uuid('product_id').references(() => products.id),
  createdAt: timestamp('created_at').defaultNow(),
});

// Notifications table
export const notifications = pgTable('notifications', {
  id: uuid('id').primaryKey().defaultRandom(),
  userId: uuid('user_id').references(() => users.id),
  title: text('title').notNull(),
  content: text('content'),
  type: text('type').notNull(), // message, review, product_update, system
  relatedId: uuid('related_id'), // ID of related entity (product, message, etc.)
  isRead: boolean('is_read').default(false),
  createdAt: timestamp('created_at').defaultNow(),
});