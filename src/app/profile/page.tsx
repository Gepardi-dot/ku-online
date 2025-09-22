import { redirect } from 'next/navigation';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import AppLayout from '@/components/layout/app-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { MapPin, Star, Package, MessageCircle, Settings, Edit } from 'lucide-react';
import ProductCard from '@/components/product-card-new';

export default async function ProfilePage() {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/');
  }

  // Mock user data - in real app, fetch from database
  const profileData = {
    fullName: user.user_metadata?.full_name || 'User',
    avatar: user.user_metadata?.avatar_url,
    email: user.email,
    phone: '+964 750 123 4567',
    location: 'Erbil',
    bio: 'Selling quality items at great prices. Fast shipping and excellent customer service.',
    rating: 4.8,
    totalRatings: 24,
    joinedDate: '2023-06-01',
    responseRate: '95%',
    totalSales: 47,
    activeListings: 12
  };

  const mockListings = [
    {
      id: '1',
      title: 'iPhone 13 Pro',
      description: 'Great condition iPhone',
      price: 850000,
      currency: 'IQD',
      condition: 'Used - Like New' as const,
      categoryId: '1',
      sellerId: user.id,
      location: 'Erbil',
      images: ['https://picsum.photos/seed/phone/400/300'],
      isActive: true,
      isSold: false,
      isPromoted: false,
      views: 234,
      createdAt: '2024-01-15T10:00:00Z',
      updatedAt: '2024-01-15T10:00:00Z',
      seller: {
        id: user.id,
        email: profileData.email,
        fullName: profileData.fullName,
        avatar: profileData.avatar,
        location: profileData.location,
        bio: profileData.bio,
        isVerified: false,
        rating: profileData.rating,
        totalRatings: profileData.totalRatings,
        createdAt: '2023-06-01T00:00:00Z',
        updatedAt: '2023-06-01T00:00:00Z'
      }
    }
  ];

  return (
    <AppLayout>
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Info */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-24 w-24 mx-auto">
                    <AvatarImage src={profileData.avatar} />
                    <AvatarFallback className="text-2xl">
                      {profileData.fullName[0]}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div>
                    <h1 className="text-2xl font-bold">{profileData.fullName}</h1>
                    <div className="flex items-center justify-center gap-1 mt-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{profileData.rating}</span>
                      <span className="text-muted-foreground">
                        ({profileData.totalRatings} reviews)
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {profileData.location}
                  </div>

                  <p className="text-sm text-muted-foreground">
                    {profileData.bio}
                  </p>

                  <div className="grid grid-cols-3 gap-4 py-4 border-t border-b">
                    <div className="text-center">
                      <div className="font-bold text-lg">{profileData.totalSales}</div>
                      <div className="text-xs text-muted-foreground">Sales</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{profileData.activeListings}</div>
                      <div className="text-xs text-muted-foreground">Active</div>
                    </div>
                    <div className="text-center">
                      <div className="font-bold text-lg">{profileData.responseRate}</div>
                      <div className="text-xs text-muted-foreground">Response</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Button className="w-full">
                      <Edit className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Profile Tabs */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="listings" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="listings">
                  <Package className="mr-2 h-4 w-4" />
                  Listings
                </TabsTrigger>
                <TabsTrigger value="reviews">
                  <Star className="mr-2 h-4 w-4" />
                  Reviews
                </TabsTrigger>
                <TabsTrigger value="messages">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Messages
                </TabsTrigger>
                <TabsTrigger value="settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </TabsTrigger>
              </TabsList>

              <TabsContent value="listings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>My Listings ({mockListings.length})</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {mockListings.map((listing) => (
                        <ProductCard key={listing.id} product={listing} />
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="reviews" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Reviews & Feedback</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      Reviews will appear here when buyers leave feedback
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Messages</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 text-muted-foreground">
                      Your conversations will appear here
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="settings" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Account Settings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium">Email</label>
                        <p className="text-sm text-muted-foreground">{profileData.email}</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Phone</label>
                        <p className="text-sm text-muted-foreground">{profileData.phone}</p>
                      </div>
                      <Button variant="outline" className="mt-4">
                        Update Contact Information
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}