
"use client";

import Image from 'next/image';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Calendar, MapPin, Heart } from 'lucide-react';
import type { Product } from '@/lib/types';
import { Badge } from '@/components/ui/badge';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import React from 'react';
import { formatDistanceToNow } from 'date-fns';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { toast } = useToast();

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast({
        title: "Added to Favorites",
        description: `${product.name} has been added to your wishlist.`,
    })
  }
  
  const timeAgo = product.createdAt ? formatDistanceToNow(new Date(product.createdAt), { addSuffix: true }) : 'a while ago';

  return (
    <Link href="#" className="group block">
      <Card className="overflow-hidden h-full flex flex-col transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="relative aspect-square">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
            data-ai-hint={product.imageHint || ''}
          />
          <Button 
            variant="ghost" 
            size="icon" 
            className="absolute top-2 right-2 bg-white/70 hover:bg-white text-muted-foreground hover:text-primary rounded-full h-8 w-8"
            onClick={handleFavoriteClick}
            aria-label="Add to favorites"
          >
            <Heart className="h-5 w-5" />
          </Button>
        </div>
        <CardContent className="p-2 flex flex-col flex-grow">
          <h3 className="font-semibold text-xs leading-tight line-clamp-2 group-hover:text-primary mb-1">
            {product.name}
          </h3>
          
          <div className="flex-grow space-y-1.5">
            <p className="font-bold text-primary text-base">
              {new Intl.NumberFormat('en-IQ', { style: 'currency', currency: 'IQD', minimumFractionDigits: 0 }).format(product.price)}
            </p>
             <div className="flex items-center text-xs text-muted-foreground/90 gap-1 font-semibold">
                <MapPin className="h-3 w-3" />
                <p>{product.location}</p>
            </div>
            <div className="flex items-center text-xs text-muted-foreground/90 gap-1">
                <Calendar className="h-3 w-3" />
                <p>{timeAgo}</p>
            </div>
            <Badge variant="outline" className="font-normal text-xs py-0.5 px-2">{product.condition}</Badge>
          </div>

          <div className="flex items-center gap-2 mt-2 pt-2 border-t">
            <Avatar className="h-6 w-6">
              <AvatarImage src={product.seller.avatarUrl} alt={product.seller.name} />
              <AvatarFallback>{product.seller.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
                <p className="text-xs text-muted-foreground truncate">{product.seller.name}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
