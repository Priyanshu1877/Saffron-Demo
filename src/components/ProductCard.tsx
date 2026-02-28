import { Link } from "react-router-dom";
import { Heart, ShoppingBag, Star } from "lucide-react";
import { Product } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { motion } from "framer-motion";

interface ProductCardProps {
  product: Product;
  index?: number;
}

export default function ProductCard({ product, index = 0 }: ProductCardProps) {
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = isInWishlist(product.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Badge */}
          {product.badge && (
            <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-body tracking-[0.15em] uppercase px-3 py-1">
              {product.badge}
            </span>
          )}

          {/* Quick actions */}
          <div className="absolute bottom-0 left-0 right-0 p-4 flex gap-2 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
            <button
              onClick={(e) => {
                e.preventDefault();
                addItem(product);
              }}
              className="flex-1 bg-foreground text-primary-foreground py-3 text-xs font-body tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-primary transition-colors"
            >
              <ShoppingBag size={14} />
              Add to Cart
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                toggleWishlist(product);
              }}
              className={`p-3 transition-colors ${isWishlisted
                  ? "bg-red-500 text-white hover:bg-red-600"
                  : "bg-foreground text-primary-foreground hover:bg-primary"
                }`}
              aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={14} className={isWishlisted ? "fill-current" : ""} />
            </button>
          </div>
        </div>
      </Link>

      <div className="space-y-1.5">
        <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground">
          {product.category}
        </p>
        <Link to={`/product/${product.id}`}>
          <h3 className="font-display text-lg font-medium text-foreground group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={12}
              className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"}
            />
          ))}
          <span className="text-xs text-muted-foreground ml-1">({product.reviews})</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="font-body text-base font-medium text-foreground">
            ${product.price.toFixed(2)}
          </span>
          {product.originalPrice && (
            <span className="font-body text-sm text-muted-foreground line-through">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
}
