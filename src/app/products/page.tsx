import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { createClient } from '@/utils/supabase/server';
import AppLayout from '@/components/layout/app-layout';
import ProductCard from '@/components/product-card-new';
import { getProducts } from '@/lib/services/products';

interface ProductsPageProps {
  searchParams: Promise<{ page?: string }>;
}

const PAGE_SIZE = 24;

async function ProductsGrid({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const page = params.page ? Math.max(1, Number(params.page)) : 1;
  const offset = (page - 1) * PAGE_SIZE;

  const products = await getProducts({}, PAGE_SIZE, offset);

  return (
    <section className="py-12">
      <div className="container mx-auto px-4 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">All Listings</h1>
            <p className="text-muted-foreground">Discover the latest items from sellers across Kurdistan.</p>
          </div>
        </div>

        {products.length === 0 ? (
          <div className="py-16 text-center text-muted-foreground">
            No listings available yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <AppLayout user={user}>
      <Suspense fallback={<div className="container mx-auto px-4 py-12 text-center">Loading listings...</div>}>
        <ProductsGrid searchParams={searchParams} />
      </Suspense>
    </AppLayout>
  );
}
