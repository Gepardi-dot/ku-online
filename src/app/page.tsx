
'use client';

import { useState } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { Button } from '@/components/ui/button';
import { ArrowRight, ListFilter, ChevronDown } from 'lucide-react';
import ProductCard from '@/components/product-card';
import type { Product } from '@/lib/types';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';
import { Input } from '@/components/ui/input';


const categories = [
    { name: 'Electronics', href: '#' }, { name: 'Fashion', href: '#' },
    { name: 'Home & Garden', href: '#' }, { name: 'Toys', href: '#' },
    { name: 'Sports', href: '#' }, { name: 'Kids', href: '#' },
    { name: 'Motors', href: '#' }, { name: 'Services', href: '#' },
    { name: 'Others', href: '#' },
];

const placeholderProducts: Product[] = [
    { id: '1', name: 'Vintage Leather Jacket', price: 150000, currency: 'IQD', seller: { name: 'Erbil Classic Wears', avatarUrl: 'https://picsum.photos/seed/seller1/40/40' }, category: 'Fashion', condition: 'Used - Good', imageUrl: 'https://picsum.photos/seed/jacket/400/300', imageHint: 'leather jacket', location: 'Erbil', createdAt: new Date().toISOString() },
    { id: '2', name: 'Modern Bookshelf', price: 90000, currency: 'IQD', seller: { name: 'Suli Home Goods', avatarUrl: 'https://picsum.photos/seed/seller2/40/40' }, category: 'Home & Garden', condition: 'New', imageUrl: 'https://picsum.photos/seed/bookshelf/400/300', imageHint: 'modern bookshelf', location: 'Sulaymaniyah', createdAt: new Date().toISOString() },
    { id: '3', name: 'Gaming Mouse', price: 75000, currency: 'IQD', seller: { name: 'Duhok Electronics', avatarUrl: 'https://picsum.photos/seed/seller3/40/40' }, category: 'Electronics', condition: 'New', imageUrl: 'https://picsum.photos/seed/mouse/400/300', imageHint: 'gaming mouse', location: 'Duhok', createdAt: new Date().toISOString() },
    { id: '4', name: 'Handmade Ceramic Vase', price: 45000, currency: 'IQD', seller: { name: 'Kurdistan Crafts', avatarUrl: 'https://picsum.photos/seed/seller4/40/40' }, category: 'Home & Garden', condition: 'New', imageUrl: 'https://picsum.photos/seed/vase/400/300', imageHint: 'ceramic vase', location: 'Erbil', createdAt: new Date().toISOString() },
    { id: '5', name: 'Professional Football', price: 35000, currency: 'IQD', seller: { name: 'Zaxo Sports', avatarUrl: 'https://picsum.photos/seed/seller5/40/40' }, category: 'Sports & Outdoors', condition: 'New', imageUrl: 'https://picsum.photos/seed/football/400/300', imageHint: 'professional football', location: 'Zaxo', createdAt: new Date().toISOString() },
    { id: '6', name: 'Wireless Headphones', price: 110000, currency: 'IQD', seller: { name: 'Erbil Electronics', avatarUrl: 'https://picsum.photos/seed/seller2/40/40' }, category: 'Electronics', condition: 'New', imageUrl: 'https://picsum.photos/seed/headphones/400/300', imageHint: 'wireless headphones', location: 'Erbil', createdAt: new Date().toISOString() },
    { id: '7', name: 'Designer Sunglasses', price: 200000, currency: 'IQD', seller: { name: 'Chic Boutique', avatarUrl: 'https://picsum.photos/seed/seller3/40/40' }, category: 'Fashion', condition: 'New', imageUrl: 'https://picsum.photos/seed/sunglasses/400/300', imageHint: 'designer sunglasses', location: 'Sulaymaniyah', createdAt: new Date().toISOString() },
    { id: '8', name: 'Antique Kurdish Rug', price: 500000, currency: 'IQD', seller: { name: 'Nishtiman Crafts', avatarUrl: 'https://picsum.photos/seed/seller1/40/40' }, category: 'Home & Garden', condition: 'Used - Fair', imageUrl: 'https://picsum.photos/seed/rug/400/300', imageHint: 'kurdish rug', location: 'Duhok', createdAt: new Date().toISOString() },
];


export default function MarketplacePage() {
  const [products] = useState<Product[]>(placeholderProducts);
  const [condition, setCondition] = useState('all');
  const [city, setCity] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  
  return (
    <AppLayout>
      <div className="flex flex-col">
        <section className="py-6 bg-white border-b">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
              <h3 className="text-lg font-semibold mr-4">Categories:</h3>
              {categories.map((category) => (
                <Link href={category.href} key={category.name} className="font-medium text-muted-foreground hover:text-primary transition-colors">
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="special-offers" className="pt-6 pb-12 bg-accent">
          <div className="container mx-auto px-4">
              <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl md:text-3xl font-bold">Latest Listings</h2>
                  <Button asChild variant="link" className="text-primary font-semibold">
                      <Link href="#">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
                  </Button>
              </div>

            <div className="mb-4 p-4 bg-white rounded-lg shadow-sm">
                <button 
                    onClick={() => setShowFilters(!showFilters)}
                    className="w-full flex justify-between items-center"
                >
                    <div className="flex items-center gap-2">
                        <ListFilter className="h-5 w-5 text-muted-foreground" />
                        <span className="font-semibold">Filter & Sort:</span>
                    </div>
                    <ChevronDown className={cn("h-5 w-5 text-muted-foreground transition-transform", { 'rotate-180': showFilters })} />
                </button>

                <div className={cn("mt-4 pt-4 border-t transition-all duration-300 ease-in-out", { 'hidden': !showFilters })}>
                    <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-4">
                            <Select value={condition} onValueChange={setCondition}>
                                <SelectTrigger><SelectValue placeholder="Condition" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Conditions</SelectItem>
                                    <SelectItem value="New">New</SelectItem>
                                    <SelectItem value="Used - Like New">Used - Like New</SelectItem>
                                    <SelectItem value="Used - Good">Used - Good</SelectItem>
                                    <SelectItem value="Used - Fair">Used - Fair</SelectItem>
                                </SelectContent>
                            </Select>
                            
                            <Select value={city} onValueChange={setCity}>
                                <SelectTrigger><SelectValue placeholder="City" /></SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">All Cities</SelectItem>
                                    <SelectItem value="Erbil">Erbil</SelectItem>
                                    <SelectItem value="Sulaymaniyah">Sulaymaniyah</SelectItem>
                                    <SelectItem value="Duhok">Duhok</SelectItem>
                                    <SelectItem value="Zaxo">Zaxo</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>

              <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
          </div>
        </section>

        <section className="py-12 bg-gray-50">
            <div className="container mx-auto px-4">
                <h2 className="text-2xl md:text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
                <div className="max-w-3xl mx-auto">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="item-1">
                        <AccordionTrigger>Is KU-ONLINE reliable and safe to use?</AccordionTrigger>
                        <AccordionContent>
                         Yes, KU-ONLINE is a trustworthy online shopping platform. We prioritize transaction security with buyer protection policies that ensure you can shop with confidence.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-2">
                        <AccordionTrigger>How long does shipping take?</AccordionTrigger>
                        <AccordionContent>
                          Delivery times vary depending on the seller's location and your location. Most local deliveries are completed within 1-3 business days.
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="item-3">
                        <AccordionTrigger>How can I contact customer service?</AccordionTrigger>
                        <AccordionContent>
                          You can reach our customer service team 24/7 through the Help Center on our website or app. We offer live chat and email assistance.
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                </div>
            </div>
        </section>
        
        <section className="py-12 bg-primary text-white">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-2xl md:text-3xl font-bold mb-4">Stay Updated with KU-ONLINE</h2>
                <p className="mb-6 max-w-2xl mx-auto opacity-90">Subscribe to our newsletter for exclusive deals, new product alerts, and shopping tips.</p>
                <form className="max-w-md mx-auto flex">
                    <Input type="email" placeholder="Your email address" className="flex-1 rounded-l-full text-gray-800 focus:outline-none" />
                    <Button type="submit" className="bg-accent-foreground py-3 px-6 rounded-r-full font-semibold hover:bg-orange-800 transition">Subscribe</Button>
                </form>
            </div>
        </section>
      </div>
    </AppLayout>
  );
}
