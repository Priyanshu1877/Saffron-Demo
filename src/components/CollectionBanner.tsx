import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import collectionBanner from "@/assets/collection-banner.jpg";

export default function CollectionBanner() {
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0">
        <img src={collectionBanner} alt="Saffron collection" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-foreground/60" />
      </div>
      <div className="relative z-10 container mx-auto px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-body text-xs tracking-[0.4em] uppercase text-primary-foreground/80 mb-3"
        >
          New Season
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="font-display text-4xl md:text-6xl font-light text-primary-foreground mb-6"
        >
          The <span className="italic">2026</span> Harvest
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="font-body text-sm text-primary-foreground/70 max-w-lg mx-auto mb-8"
        >
          Discover our latest harvest — exceptionally rich in aroma and color. Limited quantities available.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            to="/shop"
            className="inline-block bg-primary text-primary-foreground px-10 py-4 text-sm font-body tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors"
          >
            Shop the Collection
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
