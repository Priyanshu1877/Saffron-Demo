import productJar from "@/assets/product-saffron-jar.jpg";
import productBox from "@/assets/product-saffron-box.jpg";
import productTea from "@/assets/product-saffron-tea.jpg";
import productOil from "@/assets/product-saffron-oil.jpg";
import productPowder from "@/assets/product-saffron-powder.jpg";
import productGiftSet from "@/assets/product-gift-set.jpg";

export interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  images: string[];
  category: string;
  description: string;
  details: string[];
  rating: number;
  reviews: number;
  badge?: string;
  inStock: boolean;
  weight: string;
}

export const products: Product[] = [
  {
    id: "premium-saffron-threads",
    name: "Premium Saffron Threads",
    price: 29.99,
    originalPrice: 39.99,
    image: productJar,
    images: [productJar, productBox, productGiftSet],
    category: "Saffron Threads",
    description: "Hand-picked Kashmiri saffron threads of the highest grade. Each strand is carefully selected to ensure maximum flavor, aroma, and coloring potency.",
    details: ["ISO 3632 Category I", "Hand-harvested", "Lab tested for purity", "Origin: Kashmir, India"],
    rating: 4.9,
    reviews: 142,
    badge: "Bestseller",
    inStock: true,
    weight: "1g",
  },
  {
    id: "royal-saffron-collection",
    name: "Royal Saffron Collection",
    price: 89.99,
    image: productBox,
    images: [productBox, productJar, productGiftSet],
    category: "Gift Sets",
    description: "An exquisite collection of our finest saffron varieties, presented in a handcrafted luxury box. Perfect for gifting or personal indulgence.",
    details: ["Contains 3 premium varieties", "Luxury packaging", "Certificate of authenticity", "Gift-ready presentation"],
    rating: 4.8,
    reviews: 87,
    badge: "Limited Edition",
    inStock: true,
    weight: "5g",
  },
  {
    id: "saffron-infused-tea",
    name: "Saffron Infused Tea",
    price: 24.99,
    image: productTea,
    images: [productTea, productJar, productGiftSet],
    category: "Saffron Tea",
    description: "A delicate blend of premium green tea infused with genuine Kashmiri saffron. Each cup delivers a golden hue and subtle floral notes.",
    details: ["20 individually wrapped sachets", "Organic green tea base", "Real saffron threads", "Caffeine: Low"],
    rating: 4.7,
    reviews: 203,
    inStock: true,
    weight: "40g",
  },
  {
    id: "saffron-essential-oil",
    name: "Saffron Essential Oil",
    price: 49.99,
    originalPrice: 59.99,
    image: productOil,
    images: [productOil, productJar, productGiftSet],
    category: "Beauty & Wellness",
    description: "Pure saffron essential oil extracted through cold-press methods. Rich in antioxidants, perfect for skincare and aromatherapy.",
    details: ["100% pure extraction", "Cold-pressed method", "Rich in crocin", "Dropper included"],
    rating: 4.6,
    reviews: 64,
    inStock: true,
    weight: "15ml",
  },
  {
    id: "saffron-powder",
    name: "Saffron Powder",
    price: 34.99,
    image: productPowder,
    images: [productPowder, productJar, productGiftSet],
    category: "Saffron Powder",
    description: "Finely ground premium saffron powder, ideal for cooking, baking, and beverages. Delivers instant color and flavor.",
    details: ["Finely milled", "Ideal for cooking", "No additives", "Sealed for freshness"],
    rating: 4.8,
    reviews: 118,
    badge: "Popular",
    inStock: true,
    weight: "2g",
  },
  {
    id: "luxury-gift-set",
    name: "Luxury Gift Set",
    price: 149.99,
    originalPrice: 179.99,
    image: productGiftSet,
    images: [productGiftSet, productJar, productBox, productTea],
    category: "Gift Sets",
    description: "The ultimate saffron experience. Includes our premium threads, powder, tea, and essential oil in an exquisite presentation box.",
    details: ["4 premium products", "Luxury presentation box", "Personalized message card", "Free worldwide shipping"],
    rating: 5.0,
    reviews: 56,
    badge: "Exclusive",
    inStock: true,
    weight: "Complete Set",
  },
];

export const categories = ["All", "Saffron Threads", "Saffron Powder", "Saffron Tea", "Beauty & Wellness", "Gift Sets"];
