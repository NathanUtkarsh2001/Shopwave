import { notFound } from 'next/navigation';
import { getProductById, getRelatedProducts } from '@/lib/data';
import { Header } from '@/components/shopwave/Header';
import { ProductDetailsClient } from '@/components/shopwave/ProductDetailsClient';
import { Recommendations } from '@/components/shopwave/Recommendations';

interface ProductPageProps {
  params: {
    id: string;
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = getProductById(params.id);

  if (!product) {
    notFound();
  }
  
  const relatedProducts = getRelatedProducts(product.id);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-1 py-12">
        <ProductDetailsClient product={product} />
        <div className="mt-24">
           <Recommendations currentProduct={product} relatedProducts={relatedProducts} />
        </div>
      </main>
      <footer className="bg-background border-t">
        <div className="container mx-auto py-6 px-4 md:px-6 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} ShopWave. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
