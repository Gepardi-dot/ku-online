import { db, categories, products, users } from '@/lib/database';

export async function seedDatabase() {
  try {
    // Seed categories
    const categoryData = [
      { name: 'Electronics', nameAr: 'إلكترونيات', nameKu: 'ئەلیکترۆنی', icon: '📱', sortOrder: 1 },
      { name: 'Fashion', nameAr: 'أزياء', nameKu: 'مۆد', icon: '👗', sortOrder: 2 },
      { name: 'Home & Garden', nameAr: 'المنزل والحديقة', nameKu: 'ماڵ و باخچە', icon: '🏠', sortOrder: 3 },
      { name: 'Toys', nameAr: 'ألعاب', nameKu: 'یاری', icon: '🧸', sortOrder: 4 },
      { name: 'Sports', nameAr: 'رياضة', nameKu: 'وەرزش', icon: '⚽', sortOrder: 5 },
      { name: 'Kids', nameAr: 'أطفال', nameKu: 'منداڵان', icon: '👶', sortOrder: 6 },
      { name: 'Motors', nameAr: 'سيارات', nameKu: 'ئۆتۆمبێل', icon: '🚗', sortOrder: 7 },
      { name: 'Services', nameAr: 'خدمات', nameKu: 'خزمەتگوزاری', icon: '🔧', sortOrder: 8 },
    ];

    const existingCategories = await db.select().from(categories).limit(1);
    
    if (existingCategories.length === 0) {
      await db.insert(categories).values(categoryData);
      console.log('Categories seeded successfully');
    }

  } catch (error) {
    console.error('Error seeding database:', error);
  }
}