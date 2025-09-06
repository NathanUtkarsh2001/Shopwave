"use client";

import { useContext, useEffect, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { AppContext } from '@/context/AppContext';
import { getAIProductRecommendations } from '@/ai/flows/ai-product-recommendations';
import { Product, getProductById } from '@/lib/data';
import { ProductCard } from './ProductCard';
import { Skeleton } from '../ui/skeleton';

interface RecommendationsProps {
  currentProduct: Product;
  relatedProducts: Product[];
}

export function Recommendations({ currentProduct, relatedProducts }: RecommendationsProps) {
  const context = useContext(AppContext);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      setIsLoading(true);
      if (context?.user) {
        // Logged-in user: use AI
        const viewedProducts = JSON.parse(localStorage.getItem('shopwave_viewed_products') || '[]');
        const cartProductNames = context.cartItems.map(item => item.name);
        
        let userHistory = `The user is currently viewing "${currentProduct.name}". `;
        if (viewedProducts.length > 0) {
          userHistory += `They have recently viewed: ${viewedProducts.join(', ')}. `;
        }
        if (cartProductNames.length > 0) {
            userHistory += `Their cart contains: ${cartProductNames.join(', ')}.`;
        }
        
        try {
          const result = await getAIProductRecommendations({
            userHistory: userHistory,
            numberOfRecommendations: 5,
          });
          setRecommendations(result.recommendations);
        } catch (error) {
          console.error("AI recommendation failed, falling back to static.", error);
          // Fallback to static recommendations on error
          setRecommendations(relatedProducts.map(p => p.name));
        }
      } else {
        // Logged-out user: use basic 'others bought'
        setRecommendations(relatedProducts.map(p => p.name));
      }
      setIsLoading(false);
    };

    fetchRecommendations();
  }, [context?.user, currentProduct.name, context?.cartItems, relatedProducts]);

  // A bit of a hack to get full product objects from recommended names
  const allProducts = getProductById('1') ? require('@/lib/data').getProducts() : [];
  const recommendedProducts = recommendations
    .map(name => allProducts.find((p: Product) => p.name === name))
    .filter((p): p is Product => p !== undefined && p.id !== currentProduct.id)
    .slice(0, 4);

  return (
    <div className="container mx-auto px-4 md:px-6">
      <h2 className="text-3xl font-bold mb-8 text-center">{context?.user ? 'Just For You' : 'You Might Also Like'}</h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => <Skeleton key={i} className="h-[400px] w-full" />)}
        </div>
      ) : (
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {recommendedProducts.map((product) => (
            <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
              <div className="p-1">
                <ProductCard product={product} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-12" />
        <CarouselNext className="mr-12" />
      </Carousel>
      )}
    </div>
  );
}
