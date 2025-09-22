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
  // Return mock data for demonstration while database is being set up
  const mockProducts: ProductWithRelations[] = [
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      description: 'High-quality vintage leather jacket in excellent condition',
      price: '150000',
      currency: 'IQD',
      condition: 'Used - Good',
      categoryId: '2',
      sellerId: 'seller1',
      location: 'Erbil',
      images: ['https://picsum.photos/seed/jacket/400/300'],
      isActive: true,
      isSold: false,
      isPromoted: false,
      views: 234,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: {
        id: 'seller1',
        email: 'seller@example.com',
        fullName: 'Erbil Classic Wears',
        avatar: 'https://picsum.photos/seed/seller1/40/40',
        location: 'Erbil',
        bio: 'Quality fashion retailer',
        isVerified: true,
        rating: 4.8,
        totalRatings: 24,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    },
    {
      id: '2',
      title: 'Gaming Mouse Pro',
      description: 'Professional gaming mouse with RGB lighting',
      price: '75000',
      currency: 'IQD',
      condition: 'New',
      categoryId: '1',
      sellerId: 'seller2',
      location: 'Duhok',
      images: ['https://picsum.photos/seed/mouse/400/300'],
      isActive: true,
      isSold: false,
      isPromoted: true,
      views: 156,
      createdAt: new Date(),
      updatedAt: new Date(),
      seller: {
        id: 'seller2',
        email: 'electronics@example.com',
        fullName: 'Duhok Electronics',
        avatar: 'https://picsum.photos/seed/seller2/40/40',
        location: 'Duhok',
        bio: 'Electronics and gadgets specialist',
        isVerified: true,
        rating: 4.9,
        totalRatings: 45,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      }
    }
  ];

  return mockProducts;
}

export async function getCategories() {
  // Return mock categories for demonstration
  return [
    { id: '1', name: 'Electronics', nameAr: 'إلكترونيات', nameKu: 'ئەلیکترۆنی', icon: '📱', isActive: true, sortOrder: 1, createdAt: new Date().toISOString() },
    { id: '2', name: 'Fashion', nameAr: 'أزياء', nameKu: 'مۆد', icon: '👗', isActive: true, sortOrder: 2, createdAt: new Date().toISOString() },
    { id: '3', name: 'Home & Garden', nameAr: 'المنزل والحديقة', nameKu: 'ماڵ و باخچە', icon: '🏠', isActive: true, sortOrder: 3, createdAt: new Date().toISOString() },
    { id: '4', name: 'Toys', nameAr: 'ألعاب', nameKu: 'یاری', icon: '🧸', isActive: true, sortOrder: 4, createdAt: new Date().toISOString() },
    { id: '5', name: 'Sports', nameAr: 'رياضة', nameKu: 'وەرزش', icon: '⚽', isActive: true, sortOrder: 5, createdAt: new Date().toISOString() },
  ];
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