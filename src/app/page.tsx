import { Header } from '@/components/shopwave/Header';
import { ProductView } from '@/components/shopwave/ProductView';
import { getProducts } from '@/lib/data';

export default function Home() {
  const products = getProducts();
  
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1">
        <ProductView initialProducts={products} />
      </main>
      <footer className="bg-background border-t">
        <div className="container mx-auto py-6 px-4 md:px-6 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} ShopWave. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
