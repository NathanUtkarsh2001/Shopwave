"use client";

import { useState, useMemo } from 'react';
import { ProductFilters } from '@/components/shopwave/ProductFilters';
import { ProductGrid } from '@/components/shopwave/ProductGrid';
import { Product } from '@/lib/data';

interface ProductViewProps {
  initialProducts: Product[];
}

export function ProductView({ initialProducts }: ProductViewProps) {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return initialProducts.filter(product => {
      const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
      const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
      const searchMatch = searchTerm === '' || product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && priceMatch && searchMatch;
    });
  }, [initialProducts, selectedCategories, priceRange, searchTerm]);

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
       <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">Discover Your Next Favorite</h1>
        <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
          Explore our curated collection of high-quality products. Use the filters to find exactly what you're looking for.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <aside className="md:col-span-1">
          <ProductFilters
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            priceRange={priceRange}
            setPriceRange={setPriceRange}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
          />
        </aside>
        <div className="md:col-span-3">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}
