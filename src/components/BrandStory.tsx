import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import aboutImage from "@/assets/about-saffron-field.jpg";

export default function BrandStory() {
  return (
    <section className="py-24 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={aboutImage}
              alt="Saffron crocus fields in Kashmir"
              className="w-full h-[500px] object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:pl-8"
          >
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">
              Our Heritage
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-light text-foreground mb-6 leading-tight">
              From Kashmir's <br />
              <span className="italic">Sacred Valleys</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
              For generations, our family has cultivated the finest Crocus sativus in the pristine highlands of Kashmir. Every autumn, as dawn breaks over the valley, our artisans hand-pick each delicate flower, carefully extracting the precious crimson stigmas that become the world's most coveted spice.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed mb-8">
              Our commitment to purity and excellence means every gram of Zaferon Gold undergoes rigorous quality testing, ensuring you receive nothing but the very best — rich in crocin, safranal, and picocrocin.
            </p>
            <Link
              to="/about"
              className="inline-block border border-foreground text-foreground px-8 py-3 text-sm font-body tracking-[0.2em] uppercase hover:bg-foreground hover:text-primary-foreground transition-colors duration-300"
            >
              Discover More
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
