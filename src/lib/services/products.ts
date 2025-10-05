import { db, products, categories, Product, User, Category } from '@/lib/database';
import { eq, sql } from 'drizzle-orm';

export interface ProductWithRelations extends Product {
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

const mockSellers: Record<string, User> = {
  seller1: {
    id: 'seller1',
    email: 'seller@example.com',
    phone: '+964750000001',
    fullName: 'Erbil Classic Wears',
    avatar: 'https://picsum.photos/seed/seller1/40/40',
    location: 'Erbil',
    bio: 'Quality fashion retailer',
    isVerified: true,
    rating: '4.80',
    totalRatings: 24,
    createdAt: new Date('2023-06-01T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
  seller2: {
    id: 'seller2',
    email: 'electronics@example.com',
    phone: '+964750000002',
    fullName: 'Duhok Electronics',
    avatar: 'https://picsum.photos/seed/seller2/40/40',
    location: 'Duhok',
    bio: 'Electronics and gadgets specialist',
    isVerified: true,
    rating: '4.90',
    totalRatings: 45,
    createdAt: new Date('2023-04-10T00:00:00Z'),
    updatedAt: new Date('2024-01-01T00:00:00Z'),
  },
};

const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Electronics',
    nameAr: 'Electronics',
    nameKu: 'Electronics',
    description: 'Phones, computers, and accessories',
    icon: 'electronics',
    isActive: true,
    sortOrder: 1,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
  {
    id: '2',
    name: 'Fashion',
    nameAr: 'Fashion',
    nameKu: 'Fashion',
    description: 'Clothing and accessories',
    icon: 'fashion',
    isActive: true,
    sortOrder: 2,
    createdAt: new Date('2024-01-01T00:00:00Z'),
  },
];

export async function getProducts(_filters: ProductFilters = {}, _limit = 20, _offset = 0) {
  const mockProducts: ProductWithRelations[] = [
    {
      id: '1',
      title: 'Vintage Leather Jacket',
      description: 'High-quality vintage leather jacket in excellent condition',
      price: '150000.00',
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
      createdAt: new Date('2024-02-15T10:00:00Z'),
      updatedAt: new Date('2024-03-01T12:00:00Z'),
      seller: mockSellers.seller1,
      category: mockCategories[1],
    },
    {
      id: '2',
      title: 'Gaming Mouse Pro',
      description: 'Professional gaming mouse with RGB lighting',
      price: '75000.00',
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
      createdAt: new Date('2024-02-05T08:00:00Z'),
      updatedAt: new Date('2024-02-20T09:30:00Z'),
      seller: mockSellers.seller2,
      category: mockCategories[0],
    },
  ];

  return mockProducts;
}

export async function getCategories() {
  return mockCategories;
}

export async function createProduct(productData: Omit<typeof products.$inferInsert, 'id' | 'createdAt' | 'updatedAt'>) {
  const [newProduct] = await db
    .insert(products)
    .values({
      ...productData,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    .returning();

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


