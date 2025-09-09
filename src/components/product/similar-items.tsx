"use client";

import { useState, useEffect } from 'react';
import type { Product } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import ProductCard from '@/components/product-card';
import { Skeleton } from '@/components/ui/skeleton';

interface SimilarItemsProps {
  product: Product;
}

const placeholderProducts: Product[] = [
    { id: '1', name: 'Vintage Leather Jacket', price: 150000, currency: 'IQD', seller: { name: 'Erbil Classic Wears', avatarUrl: 'https://picsum.photos/seed/seller1/40/40', rating: 4.8 }, category: 'Fashion', condition: 'Used - Good', imageUrl: 'https://picsum.photos/seed/jacket/400/300', imageHint: 'leather jacket', location: 'Erbil', createdAt: new Date().toISOString() },
    { id: '2', name: 'Modern Bookshelf', price: 90000, currency: 'IQD', seller: { name: 'Suli Home Goods', avatarUrl: 'https://picsum.photos/seed/seller2/40/40', rating: 4.6 }, category: 'Home & Garden', condition: 'New', imageUrl: 'https://picsum.photos/seed/bookshelf/400/300', imageHint: 'modern bookshelf', location: 'Sulaymaniyah', createdAt: new Date().toISOString() },
    { id: '3', name: 'Gaming Mouse', price: 75000, currency: 'IQD', seller: { name: 'Duhok Electronics', avatarUrl: 'https://picsum.photos/seed/seller3/40/40', rating: 4.9 }, category: 'Electronics', condition: 'New', imageUrl: 'https://picsum.photos/seed/mouse/400/300', imageHint: 'gaming mouse', location: 'Duhok', createdAt: new Date().toISOString() },
    { id: '4', name: 'Handmade Ceramic Vase', price: 45000, currency: 'IQD', seller: { name: 'Kurdistan Crafts', avatarUrl: 'https://picsum.photos/seed/seller4/40/40', rating: 4.7 }, category: 'Home & Garden', condition: 'New', imageUrl: 'https://picsum.photos/seed/vase/400/300', imageHint: 'ceramic vase', location: 'Erbil', createdAt: new Date().toISOString() },
    { id: '5', name: 'Professional Football', price: 35000, currency: 'IQD', seller: { name: 'Zaxo Sports', avatarUrl: 'https://picsum.photos/seed/seller5/40/40', rating: 4.5 }, category: 'Sports & Outdoors', condition: 'New', imageUrl: 'https://picsum.photos/seed/football/400/300', imageHint: 'professional football', location: 'Zaxo', createdAt: new Date().toISOString() },
];


export default function SimilarItems({ product }: SimilarItemsProps) {
  const [similarProducts, setSimilarProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    // In a real app, you would fetch similar products from your backend.
    // For this frontend-only starter, we will filter placeholder products from the same category.
    const filtered = placeholderProducts.filter(p => p.category === product.category && p.id !== product.id);
    
    // Simulate network delay
    setTimeout(() => {
        setSimilarProducts(filtered);
        setIsLoading(false);
    }, 800);

  }, [product]);

  if (isLoading) {
    return (
        <Card>
            <CardHeader><CardTitle className="font-headline text-2xl">You Might Also Like</CardTitle></CardHeader>
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
    return null; // Don't show the section if there are no similar items
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">You Might Also Like</CardTitle>
      </CardHeader>
      <CardContent>
        <Carousel
          opts={{
            align: "start",
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
          <CarouselPrevious className="hidden sm:flex"/>
          <CarouselNext className="hidden sm:flex"/>
        </Carousel>
      </CardContent>
    </Card>
  );
}
