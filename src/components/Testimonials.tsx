import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Sophia Laurent",
    role: "Culinary Chef, Paris",
    text: "The quality of Baby Saffron is unlike anything I've encountered in 20 years of professional cooking. The color, aroma, and depth of flavor are truly exceptional.",
    rating: 5,
  },
  {
    name: "Arjun Mehta",
    role: "Tea Sommelier, Mumbai",
    text: "I've sourced saffron from across the globe, and Baby Saffron's Kashmiri threads are in a league of their own. My clients can immediately taste the difference.",
    rating: 5,
  },
  {
    name: "Isabella Romano",
    role: "Wellness Expert, Milan",
    text: "Their saffron essential oil has transformed my skincare routine. You can feel the purity and potency in every drop. Absolutely premium quality.",
    rating: 5,
  },
];

export default function Testimonials() {
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
            Testimonials
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-light text-foreground">
            What Our <span className="italic">Clients</span> Say
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="bg-secondary p-8 relative"
            >
              <Quote size={32} className="text-primary/20 mb-4" />
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, j) => (
                  <Star key={j} size={12} className="fill-primary text-primary" />
                ))}
              </div>
              <p className="font-body text-sm text-muted-foreground leading-relaxed mb-6">
                "{t.text}"
              </p>
              <div>
                <p className="font-display text-base font-semibold text-foreground">{t.name}</p>
                <p className="font-body text-xs text-muted-foreground">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
