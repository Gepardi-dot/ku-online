'use client';

import { useEffect, useState } from 'react';
import type { ProductWithRelations } from '@/lib/services/products';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';

interface SimilarItemsProps {
  product: ProductWithRelations;
}

const placeholderProducts: ProductWithRelations[] = [
  {
    id: '1',
    title: 'Vintage Leather Jacket',
    description: 'High-quality vintage leather jacket in excellent condition',
    price: '150000.00',
    currency: 'IQD',
    condition: 'Used - Good',
    categoryId: 'fashion',
    sellerId: 'seller1',
    location: 'Erbil',
    images: ['https://picsum.photos/seed/jacket/400/300'],
    isActive: true,
    isSold: false,
    isPromoted: false,
    views: 234,
    createdAt: new Date('2024-02-15T10:00:00Z'),
    updatedAt: new Date('2024-03-01T12:00:00Z'),
    seller: {
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
  },
  {
    id: '2',
    title: 'Modern Bookshelf',
    description: 'Minimalist bookshelf for living room storage',
    price: '90000.00',
    currency: 'IQD',
    condition: 'New',
    categoryId: 'home',
    sellerId: 'seller2',
    location: 'Sulaymaniyah',
    images: ['https://picsum.photos/seed/bookshelf/400/300'],
    isActive: true,
    isSold: false,
    isPromoted: false,
    views: 112,
    createdAt: new Date('2024-02-10T08:00:00Z'),
    updatedAt: new Date('2024-02-20T09:30:00Z'),
    seller: {
      id: 'seller2',
      email: 'homegoods@example.com',
      phone: '+964750000002',
      fullName: 'Suli Home Goods',
      avatar: 'https://picsum.photos/seed/seller2/40/40',
      location: 'Sulaymaniyah',
      bio: 'Curated furniture for modern homes',
      isVerified: true,
      rating: '4.60',
      totalRatings: 18,
      createdAt: new Date('2023-05-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    },
  },
  {
    id: '3',
    title: 'Gaming Mouse Pro',
    description: 'Professional gaming mouse with RGB lighting',
    price: '75000.00',
    currency: 'IQD',
    condition: 'New',
    categoryId: 'electronics',
    sellerId: 'seller3',
    location: 'Duhok',
    images: ['https://picsum.photos/seed/mouse/400/300'],
    isActive: true,
    isSold: false,
    isPromoted: true,
    views: 156,
    createdAt: new Date('2024-01-20T08:00:00Z'),
    updatedAt: new Date('2024-02-01T09:30:00Z'),
    seller: {
      id: 'seller3',
      email: 'electronics@example.com',
      phone: '+964750000003',
      fullName: 'Duhok Electronics',
      avatar: 'https://picsum.photos/seed/seller3/40/40',
      location: 'Duhok',
      bio: 'Electronics and gadgets specialist',
      isVerified: true,
      rating: '4.90',
      totalRatings: 45,
      createdAt: new Date('2023-04-01T00:00:00Z'),
      updatedAt: new Date('2024-01-01T00:00:00Z'),
    },
  },
];

export default function SimilarItems({ product }: SimilarItemsProps) {
  const [similarProducts, setSimilarProducts] = useState<ProductWithRelations[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const filtered = placeholderProducts.filter(
      (item) => item.categoryId === product.categoryId && item.id !== product.id
    );

    const timer = setTimeout(() => {
      setSimilarProducts(filtered);
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [product]);

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">You Might Also Like</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div key={index} className="p-1">
                <Card>
                  <CardContent className="flex flex-col aspect-square items-center justify-center p-6 gap-4">
                    <Skeleton className="w-full h-32 rounded-lg" />
                    <Skeleton className="w-3/4 h-6" />
                    <Skeleton className="w-1/2 h-8" />
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (similarProducts.length === 0) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: 'start',
            loop: similarProducts.length > 3,
          }}
          className="w-full"
        >
          <CarouselContent>
            {similarProducts.map((recProduct) => (
              <CarouselItem key={recProduct.id} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1 h-full">
                  <ProductCard product={recProduct} />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="hidden sm:flex" />
          <CarouselNext className="hidden sm:flex" />
        </Carousel>
      </CardContent>
    </Card>
  );
}
