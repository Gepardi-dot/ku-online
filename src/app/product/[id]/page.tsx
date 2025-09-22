import { notFound } from 'next/navigation';
import Image from 'next/image';
import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { MapPin, Eye, Heart, Share2, Flag } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import ChatButton from '@/components/chat/chat-button';
import ReviewSystem from '@/components/reviews/review-system';
import { formatDistanceToNow } from 'date-fns';

// Mock data - in real app, fetch from database
const product = {
  id: '1',
  title: 'iPhone 13 Pro - 128GB - Excellent Condition',
  description: 'Selling my iPhone 13 Pro in excellent condition. Used for 6 months, always kept in case with screen protector. No scratches or damage. Includes original box, charger, and unused EarPods. Battery health is 98%. Perfect for someone looking for a premium phone at a great price.',
  price: 850000,
  currency: 'IQD',
  condition: 'Used - Like New',
  location: 'Erbil',
  images: [
    'https://picsum.photos/seed/iphone1/600/400',
    'https://picsum.photos/seed/iphone2/600/400',
    'https://picsum.photos/seed/iphone3/600/400',
  ],
  views: 234,
  createdAt: '2024-01-15T10:00:00Z',
  seller: {
    id: 'seller1',
    name: 'Ahmad Hassan',
    avatar: 'https://picsum.photos/seed/seller1/100/100',
    rating: 4.8,
    totalRatings: 24,
    joinedDate: '2023-06-01T00:00:00Z',
    responseRate: '95%',
    avgResponseTime: '2 hours'
  }
};

const mockReviews = [
  {
    id: '1',
    rating: 5,
    comment: 'Great seller! Item exactly as described. Fast delivery.',
    buyerName: 'Sarah M.',
    buyerAvatar: 'https://picsum.photos/seed/buyer1/40/40',
    createdAt: '2024-01-10T10:00:00Z',
    isAnonymous: false
  },
  {
    id: '2', 
    rating: 4,
    comment: 'Good quality product. Seller was responsive.',
    buyerName: 'Anonymous',
    createdAt: '2024-01-05T10:00:00Z',
    isAnonymous: true
  }
];

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  
  if (!id) {
    notFound();
  }

  const formatPrice = (price: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price).replace('IQD', 'IQD');
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'New':
        return 'bg-green-500';
      case 'Used - Like New':
        return 'bg-blue-500';
      case 'Used - Good':
        return 'bg-yellow-500';
      case 'Used - Fair':
        return 'bg-orange-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
                <Image
                  src={product.images[0]}
                  alt={product.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <Button size="sm" variant="secondary" className="h-8 w-8 rounded-full p-0">
                    <Heart className="h-4 w-4" />
                  </Button>
                  <Button size="sm" variant="secondary" className="h-8 w-8 rounded-full p-0">
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {product.images.length > 1 && (
                <div className="grid grid-cols-3 gap-2">
                  {product.images.slice(1).map((image, index) => (
                    <div key={index} className="relative aspect-[4/3] rounded-lg overflow-hidden">
                      <Image src={image} alt={`${product.title} ${index + 2}`} fill className="object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div>
                    <h1 className="text-2xl font-bold">{product.title}</h1>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge className={`text-white ${getConditionColor(product.condition)}`}>
                        {product.condition}
                      </Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Eye className="h-4 w-4" />
                        {product.views} views
                      </div>
                    </div>
                  </div>

                  <div className="text-3xl font-bold text-primary">
                    {formatPrice(product.price, product.currency)}
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {product.location}
                    <span>•</span>
                    <span>{formatDistanceToNow(new Date(product.createdAt), { addSuffix: true })}</span>
                  </div>

                  <Separator />

                  <div>
                    <h3 className="font-semibold mb-2">Description</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  <Separator />

                  {/* Seller Info */}
                  <div>
                    <h3 className="font-semibold mb-3">Seller Information</h3>
                    <div className="flex items-start gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={product.seller.avatar} />
                        <AvatarFallback>{product.seller.name[0]}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{product.seller.name}</h4>
                          <div className="flex items-center gap-1">
                            <span className="text-sm text-yellow-500">★</span>
                            <span className="text-sm">{product.seller.rating}</span>
                            <span className="text-sm text-muted-foreground">
                              ({product.seller.totalRatings} reviews)
                            </span>
                          </div>
                        </div>
                        <div className="text-sm text-muted-foreground mt-1">
                          <p>Member since {formatDistanceToNow(new Date(product.seller.joinedDate), { addSuffix: true })}</p>
                          <p>Response rate: {product.seller.responseRate}</p>
                          <p>Avg. response time: {product.seller.avgResponseTime}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pt-4">
                    <ChatButton
                      sellerId={product.seller.id}
                      sellerName={product.seller.name}
                      productId={product.id}
                      productTitle={product.title}
                    />
                    <Button variant="outline" className="w-full">
                      <Flag className="mr-2 h-4 w-4" />
                      Report Listing
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Reviews Section */}
        <div className="mt-8">
          <ReviewSystem
            sellerId={product.seller.id}
            productId={product.id}
            averageRating={product.seller.rating}
            totalReviews={product.seller.totalRatings}
            reviews={mockReviews}
            canReview={true}
          />
        </div>
      </div>
    </AppLayout>
  );
}