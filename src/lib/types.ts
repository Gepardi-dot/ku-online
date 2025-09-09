
export interface Seller {
  name: string;
  avatarUrl: string;
}

export interface Product {
  id: string;
  name:string;
  price: number;
  currency: 'IQD';
  imageUrl: string;
  imageHint: string | null;
  seller: Seller;
  category: string;
  condition: 'New' | 'Used - Like New' | 'Used - Good' | 'Used - Fair';
  createdAt: string; // ISO 8601 string format
  location: string;
  tags?: string[];
}
