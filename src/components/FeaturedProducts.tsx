import { useProducts } from "@/lib/products-context";
import ProductCard from "./ProductCard";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export default function FeaturedProducts() {
  const { products } = useProducts();
  const featured = products.slice(0, 4);

  return (
    <section className="py-24 px-6">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
            Curated Selection
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Our <span className="italic">Finest</span> Collection
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <Link
            to="/shop"
            className="inline-block border border-foreground text-foreground px-10 py-3.5 text-sm font-body tracking-[0.2em] uppercase hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
          >
            View All Products
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
