"use client";

import Image from 'next/image';
import Link from 'next/link';
import { useContext } from 'react';
import { Plus } from 'lucide-react';

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Product } from '@/lib/data';
import { AppContext } from '@/context/AppContext';
import { Badge } from '../ui/badge';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const context = useContext(AppContext);
  if (!context) return null;
  const { addToCart } = context;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link href={`/product/${product.id}`} className="block group">
      <Card className="h-full flex flex-col overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <CardHeader className="p-0">
          <div className="relative aspect-square w-full overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              data-ai-hint={product.dataAiHint}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        </CardHeader>
        <CardContent className="p-4 flex-grow">
          <Badge variant="secondary" className="mb-2">{product.category}</Badge>
          <CardTitle className="text-lg leading-tight group-hover:text-primary transition-colors">
            {product.name}
          </CardTitle>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex justify-between items-center">
          <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
          <Button size="icon" onClick={handleAddToCart}>
            <Plus className="h-5 w-5" />
            <span className="sr-only">Add to cart</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
