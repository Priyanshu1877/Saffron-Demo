import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import heroImage from "@/assets/hero-saffron.jpg";

export default function HeroSection() {
  return (
    <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Premium Kashmiri Saffron"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-foreground/50" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-3xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-body text-xs tracking-[0.4em] uppercase text-primary-foreground/80 mb-4"
        >
          The World's Finest
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-display text-5xl md:text-7xl lg:text-8xl font-light text-primary-foreground leading-[0.95] mb-6"
        >
          Premium
          <br />
          <span className="italic font-light">Kashmiri Saffron</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-body text-sm md:text-base text-primary-foreground/70 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          Hand-picked from the pristine valleys of Kashmir. Each strand embodies centuries of tradition, delivering unmatched flavor, aroma, and purity.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            to="/shop"
            className="bg-primary text-primary-foreground px-10 py-4 text-sm font-body tracking-[0.2em] uppercase hover:bg-gold-dark transition-colors duration-300"
          >
            Explore Collection
          </Link>
          <Link
            to="/about"
            className="border border-primary-foreground/40 text-primary-foreground px-10 py-4 text-sm font-body tracking-[0.2em] uppercase hover:bg-primary-foreground/10 transition-colors duration-300"
          >
            Our Story
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-px h-12 bg-primary-foreground/30 relative overflow-hidden">
          <motion.div
            animate={{ y: [0, 48, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-px h-4 bg-primary-foreground absolute top-0"
          />
        </div>
      </motion.div>
    </section>
  );
}
