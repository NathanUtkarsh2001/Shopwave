"use client";

import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import { Minus, Plus, Video } from 'lucide-react';
import { AppContext } from '@/context/AppContext';
import { Product } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { generateProductVideo } from '@/ai/flows/video-generation';
import { Progress } from '@/components/ui/progress';

interface ProductDetailsClientProps {
  product: Product;
}

export function ProductDetailsClient({ product }: ProductDetailsClientProps) {
  const context = useContext(AppContext);
  const [quantity, setQuantity] = useState(1);
  const [viewedProducts, setViewedProducts] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isVideoLoading, setIsVideoLoading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Record product view for AI recommendations
    const storedViews = JSON.parse(localStorage.getItem('shopwave_viewed_products') || '[]');
    if (!storedViews.includes(product.name)) {
      const newViews = [...storedViews, product.name].slice(-10); // keep last 10 views
      localStorage.setItem('shopwave_viewed_products', JSON.stringify(newViews));
      setViewedProducts(newViews);
    } else {
        setViewedProducts(storedViews);
    }
  }, [product.name]);
  
  if (!context) return null;
  const { addToCart } = context;

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleGenerateVideo = async () => {
    setIsVideoLoading(true);
    setVideoUrl(null);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 500);

    try {
      const result = await generateProductVideo({
        productDescription: `A cinematic shot of a ${product.name}. ${product.description}`,
      });
      if (result && result.video) {
        setVideoUrl(result.video);
      }
    } catch (error) {
      console.error('Failed to generate video:', error);
    } finally {
      clearInterval(interval);
      setProgress(100);
      setIsVideoLoading(false);
    }
  };


  return (
    <div className="container mx-auto px-4 md:px-6">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
        <div className="aspect-square relative bg-card rounded-lg overflow-hidden shadow-lg">
          {videoUrl ? (
            <video src={videoUrl} controls autoPlay className="w-full h-full object-cover" />
          ) : (
            <>
            <Image
              src={product.largeImage}
              alt={product.name}
              data-ai-hint={product.dataAiHint}
              fill
              className="object-cover"
              priority
            />
             <div className="absolute bottom-4 right-4">
                <Button onClick={handleGenerateVideo} disabled={isVideoLoading}>
                  <Video className="mr-2 h-4 w-4" />
                  {isVideoLoading ? 'Generating...' : 'Generate Video'}
                </Button>
              </div>
            </>
          )}
           {isVideoLoading && (
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-center">
                <Progress value={progress} className="w-3/4 mb-4" />
                <p className="text-white">Generating video, this may take a minute...</p>
              </div>
            )}
        </div>
        <div className="flex flex-col justify-center">
          <Badge variant="outline" className="w-fit mb-2">{product.category}</Badge>
          <h1 className="text-3xl lg:text-4xl font-bold mb-4">{product.name}</h1>
          <p className="text-muted-foreground mb-6 text-lg">{product.description}</p>
          <p className="text-4xl font-extrabold mb-8">${product.price.toFixed(2)}</p>

          <div className="flex items-center gap-4 mb-8">
            <div className="flex items-center gap-2 border rounded-md p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="w-10 text-center font-medium">{quantity}</span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setQuantity(q => q + 1)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            <Button size="lg" className="flex-1" onClick={handleAddToCart}>Add to Cart</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
