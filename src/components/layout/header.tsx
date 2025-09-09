
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Filter, PackagePlus } from 'lucide-react';
import { Icons } from '@/components/icons';
import LanguageSwitcher from '../language-switcher';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react';

export default function AppHeader() {
  const [city, setCity] = React.useState("all");

  return (
    <header className="sticky top-0 z-40 w-full bg-white/80 shadow-sm backdrop-blur-md">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <Icons.logo className="h-8 w-8" />
              <span className="ml-2 text-2xl font-bold font-headline text-primary">KU-ONLINE</span>
            </Link>
          </div>

          <div className="hidden md:flex flex-1 max-w-2xl mx-6">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search for products, brands, and categories..."
                className="w-full rounded-full border-gray-300 pr-40 focus:border-primary focus:ring-primary focus:ring-2"
              />
              <div className="absolute right-0 top-0 h-full flex items-center">
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                         <Button variant="ghost" className="rounded-full h-full px-4 border-l">
                            <Filter className="h-5 w-5 mr-2" />
                             <span className="capitalize">{city === 'all' ? 'All Cities' : city}</span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>Filter by City</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={city} onValueChange={setCity}>
                            <DropdownMenuRadioItem value="all">All Cities</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="erbil">Erbil</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="sulaymaniyah">Sulaymaniyah</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="duhok">Duhok</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="zaxo">Zaxo</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Button className="h-full rounded-r-full px-5 bg-primary hover:bg-accent-foreground">
                    <Search className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-4">
             <Button asChild>
                <Link href="#">
                  <PackagePlus className="mr-2 h-4 w-4" />
                  Create Listing
                </Link>
              </Button>
            <LanguageSwitcher />
            <Button variant="outline">Log In</Button>
          </div>
        </div>

        <div className="mt-2 pb-3 md:hidden">
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Input
                    type="text"
                    placeholder="Search on KU-ONLINE..."
                    className="w-full rounded-full border-gray-300 pr-10 focus:border-primary"
                    />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                </div>
                 <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" size="icon" className="rounded-full">
                            <Filter className="h-5 w-5" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56" align="end">
                        <DropdownMenuLabel>Filter by City</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuRadioGroup value={city} onValueChange={setCity}>
                            <DropdownMenuRadioItem value="all">All Cities</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="erbil">Erbil</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="sulaymaniyah">Sulaymaniyah</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="duhok">Duhok</DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="zaxo">Zaxo</DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
      </div>
    </header>
  );
}
