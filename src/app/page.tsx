import { Suspense } from 'react';
import AppLayout from '@/components/layout/app-layout';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import ProductCard from '@/components/product-card-new';
import Link from 'next/link';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { getProducts, getCategories } from '@/lib/services/products';

interface SearchPageProps {
  searchParams: Promise<{
    category?: string;
    condition?: string;
    location?: string;
    search?: string;
  }>;
}

async function ProductsList({ searchParams }: SearchPageProps) {
  // Await searchParams for Next.js 15 compatibility
  const params = await searchParams;
  
  const [products, categories] = await Promise.all([
    getProducts({
      category: params.category,
      condition: params.condition,
      location: params.location,
      search: params.search,
    }),
    getCategories(),
  ]);

  return (
    <>
      {/* Categories */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-x-6 gap-y-2 flex-wrap">
            <h3 className="text-lg font-semibold mr-4">Categories:</h3>
                        {categories.length === 0 ? (
              <span className="text-sm text-muted-foreground">No categories available yet.</span>
            ) : (
              categories.map((category) => (
                <Link
                  href={`/?category=${category.id}`}
                  key={category.id}
                  className="font-medium text-muted-foreground hover:text-primary transition-colors"
                >
                  {category.icon ? `${category.icon} ` : ''}
                  {category.name}
                </Link>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Products */}
      <section id="products" className="pt-6 pb-12 bg-accent">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl md:text-3xl font-bold">Latest Listings</h2>
            <Button asChild variant="link" className="text-primary font-semibold">
              <Link href="/products">View All <ArrowRight className="ml-2 h-4 w-4" /></Link>
            </Button>
          </div>

          <div className="grid grid-cols-2 gap-x-2 gap-y-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          {products.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No products found. Try adjusting your filters.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default async function MarketplacePage({ searchParams }: SearchPageProps) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  return (
    <AppLayout user={user}>
      <div className="flex flex-col">
        <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading...</div>}>
          <ProductsList searchParams={searchParams} />
        </Suspense>

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
                    Delivery times vary depending on the seller&apos;s location and your location. Most local deliveries are completed within 1-3 business days.
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


