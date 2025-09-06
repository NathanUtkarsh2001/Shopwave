"use client";

import { getCategories, getMaxPrice } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface ProductFiltersProps {
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const categories = getCategories();
const maxPrice = Math.ceil(getMaxPrice());

export function ProductFilters({
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  searchTerm,
  setSearchTerm
}: ProductFiltersProps) {

  const handleCategoryToggle = (category: string) => {
    setSelectedCategories(
      selectedCategories.includes(category)
        ? selectedCategories.filter(c => c !== category)
        : [...selectedCategories, category]
    );
  };
  
  return (
    <div className="space-y-8 sticky top-20">
      <div>
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <Input 
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Category</h3>
        <div className="flex flex-wrap gap-2">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategories.includes(category) ? 'default' : 'outline'}
              onClick={() => handleCategoryToggle(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-semibold mb-4">Price Range</h3>
        <Slider
          defaultValue={[maxPrice]}
          max={maxPrice}
          step={1}
          value={[priceRange[1]]}
          onValueChange={(value) => setPriceRange([0, value[0]])}
        />
        <div className="flex justify-between text-sm text-muted-foreground mt-2">
          <span>$0</span>
          <span>${priceRange[1]}</span>
        </div>
      </div>
    </div>
  );
}
