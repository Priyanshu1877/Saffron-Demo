import { useState } from "react";
import { categories } from "@/lib/products";
import { useProducts } from "@/lib/products-context";
import ProductCard from "@/components/ProductCard";
import { motion } from "framer-motion";

export default function Shop() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");

  const filtered = activeCategory === "All"
    ? products
    : products.filter((p) => p.category === activeCategory);

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price-low") return a.price - b.price;
    if (sortBy === "price-high") return b.price - a.price;
    if (sortBy === "rating") return b.rating - a.rating;
    return 0;
  });

  return (
    <main className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Shop</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Our <span className="italic">Collections</span>
          </h1>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="flex flex-wrap items-center gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs font-body tracking-[0.15em] uppercase px-4 py-2 border transition-colors duration-300 ${activeCategory === cat
                  ? "bg-foreground text-primary-foreground border-foreground"
                  : "border-border text-muted-foreground hover:border-foreground hover:text-foreground"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-background border border-border text-sm font-body px-4 py-2 focus:outline-none focus:border-primary"
          >
            <option value="featured">Featured</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Top Rated</option>
          </select>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {sorted.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>
      </div>
    </main>
  );
}
