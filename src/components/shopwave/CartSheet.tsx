"use client";

import Image from 'next/image';
import { useContext } from 'react';
import { Minus, Plus, Trash2, X } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetTrigger,
  SheetClose
} from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AppContext } from '@/context/AppContext';
import { Separator } from '../ui/separator';
import { ScrollArea } from '../ui/scroll-area';
import Link from 'next/link';
import { CartItem } from '@/hooks/use-cart';

interface CartSheetProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CartSheet({ isOpen, onOpenChange }: CartSheetProps) {
  const context = useContext(AppContext);

  if (!context) return null;

  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = context;

  const total = getCartTotal();

  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="px-6">
          <SheetTitle>Shopping Cart ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})</SheetTitle>
        </SheetHeader>
        <Separator />
        {cartItems.length > 0 ? (
          <>
            <ScrollArea className="flex-1">
              <div className="flex flex-col gap-6 p-6 pr-6">
                {cartItems.map((item: CartItem) => (
                  <div key={item.id} className="flex items-start justify-between space-x-4">
                    <div className="flex items-center space-x-4">
                      <div className="relative aspect-square w-20 overflow-hidden rounded-md">
                        <Image
                          src={item.image}
                          alt={item.name}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                      <div>
                        <Link href={`/product/${item.id}`} className="font-medium hover:underline" onClick={() => onOpenChange(false)}>{item.name}</Link>
                        <p className="text-sm text-muted-foreground">${item.price.toFixed(2)}</p>
                         <div className="flex items-center gap-2 mt-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                        </div>
                      </div>
                    </div>
                     <div className="flex flex-col items-end h-full justify-between">
                        <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-muted-foreground hover:text-destructive"
                            onClick={() => removeFromCart(item.id)}
                            >
                            <Trash2 className="h-4 w-4" />
                        </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <Separator />
            <SheetFooter className="flex-col gap-4 p-6 bg-background">
                <div className="flex justify-between text-lg font-semibold">
                    <span>Subtotal</span>
                    <span>${total.toFixed(2)}</span>
                </div>
                <Button className="w-full" size="lg">Checkout</Button>
                <Button variant="outline" className="w-full" onClick={() => clearCart()}>Clear Cart</Button>
            </SheetFooter>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-4">
            <ShoppingBag className="h-16 w-16 text-muted-foreground" />
            <p className="text-lg font-medium">Your cart is empty</p>
            <SheetClose asChild>
                <Button variant="link">Start Shopping</Button>
            </SheetClose>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
