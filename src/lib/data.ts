export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: 'Electronics' | 'Apparel' | 'Books' | 'Home Goods';
  image: string;
  largeImage: string;
  dataAiHint: string;
}

const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Noise-Cancelling Headphones',
    description: 'Immerse yourself in music with these high-fidelity, noise-cancelling headphones. Long-lasting battery and comfortable design for all-day wear.',
    price: 249.99,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=1',
    largeImage: 'https://picsum.photos/800/800?random=1',
    dataAiHint: 'headphones music'
  },
  {
    id: '2',
    name: 'Smartwatch Series 7',
    description: 'Stay connected and track your fitness goals with the latest smartwatch. Features a bright display, ECG app, and countless watch faces.',
    price: 399.00,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=2',
    largeImage: 'https://picsum.photos/800/800?random=2',
    dataAiHint: 'smartwatch technology'
  },
  {
    id: '3',
    name: 'Classic Cotton T-Shirt',
    description: 'A timeless classic. Made from 100% premium cotton for a soft, comfortable feel. Available in various colors.',
    price: 29.99,
    category: 'Apparel',
    image: 'https://picsum.photos/400/400?random=3',
    largeImage: 'https://picsum.photos/800/800?random=3',
    dataAiHint: 'shirt clothing'
  },
  {
    id: '4',
    name: 'Slim-Fit Denim Jeans',
    description: 'Modern and stylish slim-fit jeans. Crafted with a bit of stretch for comfort and a perfect fit.',
    price: 89.50,
    category: 'Apparel',
    image: 'https://picsum.photos/400/400?random=4',
    largeImage: 'https://picsum.photos/800/800?random=4',
    dataAiHint: 'jeans fashion'
  },
  {
    id: '5',
    name: 'The Midnight Library',
    description: 'A captivating novel by Matt Haig. A story about choices, regrets, and the infinite possibilities of life.',
    price: 15.99,
    category: 'Books',
    image: 'https://picsum.photos/400/400?random=5',
    largeImage: 'https://picsum.photos/800/800?random=5',
    dataAiHint: 'book reading'
  },
  {
    id: '6',
    name: 'Atomic Habits',
    description: 'An Easy & Proven Way to Build Good Habits & Break Bad Ones by James Clear. A bestseller for self-improvement.',
    price: 19.99,
    category: 'Books',
    image: 'https://picsum.photos/400/400?random=6',
    largeImage: 'https://picsum.photos/800/800?random=6',
    dataAiHint: 'book learning'
  },
  {
    id: '7',
    name: 'Modern Ceramic Vase',
    description: 'A beautiful, minimalist ceramic vase to elevate your home decor. Perfect for fresh flowers or as a standalone piece.',
    price: 45.00,
    category: 'Home Goods',
    image: 'https://picsum.photos/400/400?random=7',
    largeImage: 'https://picsum.photos/800/800?random=7',
    dataAiHint: 'vase decor'
  },
  {
    id: '8',
    name: 'Aromatic Scented Candle',
    description: 'Create a relaxing ambiance with this soy wax scented candle. Lavender and vanilla notes. 40+ hours of burn time.',
    price: 24.00,
    category: 'Home Goods',
    image: 'https://picsum.photos/400/400?random=8',
    largeImage: 'https://picsum.photos/800/800?random=8',
    dataAiHint: 'candle home'
  },
  {
    id: '9',
    name: 'Portable Bluetooth Speaker',
    description: 'Take your music anywhere. This speaker is waterproof, dustproof, and delivers surprisingly big sound.',
    price: 129.95,
    category: 'Electronics',
    image: 'https://picsum.photos/400/400?random=9',
    largeImage: 'https://picsum.photos/800/800?random=9',
    dataAiHint: 'speaker music'
  },
  {
    id: '10',
    name: 'Leather Crossbody Bag',
    description: 'A stylish and practical bag for your daily essentials. Made from genuine leather with multiple compartments.',
    price: 150.00,
    category: 'Apparel',
    image: 'https://picsum.photos/400/400?random=10',
    largeImage: 'https://picsum.photos/800/800?random=10',
    dataAiHint: 'bag fashion'
  },
  {
    id: '11',
    name: 'The Psychology of Money',
    description: 'Timeless lessons on wealth, greed, and happiness by Morgan Housel. A must-read for anyone interested in finance.',
    price: 18.50,
    category: 'Books',
    image: 'https://picsum.photos/400/400?random=11',
    largeImage: 'https://picsum.photos/800/800?random=11',
    dataAiHint: 'book finance'
  },
  {
    id: '12',
    name: 'Digital Air Fryer',
    description: 'Cook your favorite foods with less oil. This large-capacity air fryer is perfect for families and easy to clean.',
    price: 99.99,
    category: 'Home Goods',
    image: 'https://picsum.photos/400/400?random=12',
    largeImage: 'https://picsum.photos/800/800?random=12',
    dataAiHint: 'kitchen cooking'
  },
];

export const getProducts = (): Product[] => products;

export const getProductById = (id: string): Product | undefined => {
  return products.find(p => p.id === id);
}

export const getProductsByCategory = (category: string): Product[] => {
  return products.filter(p => p.category === category);
}

export const getRelatedProducts = (currentProductId: string): Product[] => {
  const currentProduct = getProductById(currentProductId);
  if (!currentProduct) return [];
  
  return products.filter(p => p.category === currentProduct.category && p.id !== currentProductId).slice(0, 4);
}

export const searchProducts = (query: string): Product[] => {
  if (!query) return [];
  return products.filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
}

export const getCategories = (): string[] => {
    return Array.from(new Set(products.map(p => p.category)));
}

export const getMaxPrice = (): number => {
    return Math.max(...products.map(p => p.price));
}
