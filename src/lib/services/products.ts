import { db, products, categories, users, Product, User, Category } from '@/lib/database';
import { eq, and, desc, ilike, gte, lte, sql } from 'drizzle-orm';

export interface ProductWithRelations extends Omit<Product, 'seller' | 'category'> {
  seller: User;
  category?: Category;
}

export interface ProductFilters {
  category?: string;
  condition?: string;
  minPrice?: number;
  maxPrice?: number;
  location?: string;
  search?: string;
}

export async function getProducts(filters: ProductFilters = {}, limit = 20, offset = 0) {
  let query = db
    .select({
      product: products,
      seller: users,
      category: categories,
    })
    .from(products)
    .leftJoin(users, eq(products.sellerId, users.id))
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(
      eq(products.isActive, true),
      eq(products.isSold, false)
    ))
    .orderBy(desc(products.createdAt))
    .limit(limit)
    .offset(offset);

  // Apply filters
  const conditions = [
    eq(products.isActive, true),
    eq(products.isSold, false)
  ];

  if (filters.category) {
    conditions.push(eq(products.categoryId, filters.category));
  }

  if (filters.condition) {
    conditions.push(eq(products.condition, filters.condition));
  }

  if (filters.minPrice) {
    conditions.push(gte(products.price, filters.minPrice.toString()));
  }

  if (filters.maxPrice) {
    conditions.push(lte(products.price, filters.maxPrice.toString()));
  }

  if (filters.location) {
    conditions.push(ilike(products.location, `%${filters.location}%`));
  }

  if (filters.search) {
    conditions.push(
      sql`(${products.title} ILIKE ${`%${filters.search}%`} OR ${products.description} ILIKE ${`%${filters.search}%`})`
    );
  }

  const result = await db
    .select({
      product: products,
      seller: users,
      category: categories,
    })
    .from(products)
    .leftJoin(users, eq(products.sellerId, users.id))
    .leftJoin(categories, eq(products.categoryId, categories.id))
    .where(and(...conditions))
    .orderBy(desc(products.createdAt))
    .limit(limit)
    .offset(offset);

  return result.map(row => ({
    ...row.product,
    seller: row.seller!,
    category: row.category || undefined,
  }));
}

export async function getCategories() {
  return await db
    .select()
    .from(categories)
    .where(eq(categories.isActive, true))
    .orderBy(categories.sortOrder);
}

export async function createProduct(productData: Omit<typeof products.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
  const [newProduct] = await db.insert(products).values({
    ...productData,
    createdAt: new Date(),
    updatedAt: new Date(),
  }).returning();
  
  return newProduct;
}

export async function incrementProductViews(productId: string) {
  await db
    .update(products)
    .set({
      views: sql`${products.views} + 1`,
      updatedAt: new Date(),
    })
    .where(eq(products.id, productId));
}