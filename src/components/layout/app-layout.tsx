import type { ReactNode } from 'react';
import AppHeader from './header';
import { createClient } from '@/utils/supabase/server';
import { cookies } from 'next/headers';

export default async function AppLayout({ children }: { children: ReactNode }) {
  const cookieStore = await cookies();
  const supabase = await createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="min-h-screen flex flex-col">
      <AppHeader user={user} />
      <main className="flex-1">{children}</main>
    </div>
  );
}
