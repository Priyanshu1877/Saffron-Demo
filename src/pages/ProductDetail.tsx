import { useParams, Link } from "react-router-dom";
import { useProducts } from "@/lib/products-context";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useState } from "react";
import { Star, Heart, Minus, Plus, ChevronLeft, Truck, Shield, RotateCcw } from "lucide-react";
import { motion } from "framer-motion";
import ProductCard from "@/components/ProductCard";

export default function ProductDetail() {
  const { id } = useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const isWishlisted = product ? isInWishlist(product.id) : false;
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });

  if (!product) {
    return (
      <div className="pt-40 pb-24 text-center">
        <h1 className="font-display text-3xl text-foreground">Product not found</h1>
        <Link to="/shop" className="text-primary mt-4 inline-block font-body text-sm">
          Back to Shop
        </Link>
      </div>
    );
  }

  const related = products.filter((p) => p.id !== product.id).slice(0, 4);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setZoomPosition({ x, y });
  };

  return (
    <main className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 mb-8"
        >
          <Link to="/shop" className="flex items-center gap-1 text-sm font-body text-muted-foreground hover:text-foreground transition-colors">
            <ChevronLeft size={14} />
            Back to Shop
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          {/* Images */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            {/* Main image with zoom */}
            <div
              className="relative overflow-hidden bg-secondary aspect-square mb-4 cursor-crosshair"
              onMouseEnter={() => setIsZoomed(true)}
              onMouseLeave={() => setIsZoomed(false)}
              onMouseMove={handleMouseMove}
            >
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300"
                style={
                  isZoomed
                    ? {
                      transform: "scale(2)",
                      transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`,
                    }
                    : {}
                }
              />
              {product.badge && (
                <span className="absolute top-4 left-4 bg-primary text-primary-foreground text-[10px] font-body tracking-[0.15em] uppercase px-3 py-1">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`w-20 h-20 overflow-hidden border-2 transition-colors ${selectedImage === i ? "border-primary" : "border-transparent"
                    }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-body text-xs tracking-[0.2em] uppercase text-primary mb-2">{product.category}</p>
            <h1 className="font-display text-3xl md:text-4xl font-light text-foreground mb-3">{product.name}</h1>

            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={14} className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-border"} />
                ))}
              </div>
              <span className="text-sm font-body text-muted-foreground">
                {product.rating} ({product.reviews} reviews)
              </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
              <span className="font-display text-3xl font-semibold text-foreground">${product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="font-body text-lg text-muted-foreground line-through">${product.originalPrice.toFixed(2)}</span>
              )}
            </div>

            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">{product.description}</p>

            {/* Details */}
            <div className="border-t border-b border-border py-5 mb-6">
              <p className="font-body text-xs tracking-[0.15em] uppercase text-foreground mb-3">Details</p>
              <ul className="space-y-2">
                {product.details.map((detail, i) => (
                  <li key={i} className="font-body text-sm text-muted-foreground flex items-center gap-2">
                    <span className="w-1 h-1 bg-primary rounded-full" />
                    {detail}
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-3 hover:bg-secondary transition-colors">
                  <Minus size={14} />
                </button>
                <span className="px-4 py-3 font-body text-sm min-w-[40px] text-center">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-3 hover:bg-secondary transition-colors">
                  <Plus size={14} />
                </button>
              </div>
              <button
                onClick={() => {
                  for (let i = 0; i < quantity; i++) addItem(product);
                }}
                className="flex-1 bg-foreground text-primary-foreground py-3.5 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors"
              >
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 border transition-colors ${isWishlisted
                  ? "border-red-500 bg-red-500 text-white hover:bg-red-600 hover:border-red-600"
                  : "border-border hover:border-primary hover:text-primary"
                  }`}
                aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
              >
                <Heart size={18} className={isWishlisted ? "fill-current" : ""} />
              </button>
            </div>

            {/* Trust signals */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { icon: Truck, label: "Free Shipping" },
                { icon: Shield, label: "Authentic" },
                { icon: RotateCcw, label: "Easy Returns" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="text-center py-3 bg-secondary">
                  <Icon size={18} className="mx-auto mb-1.5 text-primary" />
                  <span className="font-body text-[10px] tracking-wider uppercase text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24">
          <h2 className="font-display text-3xl font-light text-foreground text-center mb-12">
            You May Also <span className="italic">Like</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
