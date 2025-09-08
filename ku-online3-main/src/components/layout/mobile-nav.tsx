
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, MessageSquare, PackagePlus, Heart, User } from 'lucide-react';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '#', label: 'Messages', icon: MessageSquare },
  { href: '#', label: 'Sell', icon: PackagePlus },
  { href: '#', label: 'Favorites', icon: Heart },
  { href: '#', label: 'Account', icon: User },
];

export default function MobileNav() {
  const pathname = usePathname();

  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur-sm">
      <nav className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const isActive =
            (item.href === '/' && pathname === item.href) ||
            (item.href !== '/' && pathname.startsWith(item.href) && item.href !== '#');

          if (item.label === 'Sell') {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="relative -mt-6 flex h-16 w-16 flex-col items-center justify-center gap-1 rounded-full bg-primary text-sm font-medium text-primary-foreground shadow-lg transition-transform hover:scale-105"
              >
                <item.icon className="h-6 w-6" />
                <span>{item.label}</span>
              </Link>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                'flex flex-col items-center justify-center gap-1 w-full h-full text-sm font-medium transition-colors',
                isActive ? 'text-primary' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
