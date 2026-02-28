import { motion } from "framer-motion";
import aboutImage from "@/assets/about-saffron-field.jpg";
import heroImage from "@/assets/hero-saffron.jpg";
import { Award, Leaf, Globe, Heart } from "lucide-react";

const values = [
  { icon: Award, title: "Premium Quality", desc: "ISO 3632 Category I certified. Every batch undergoes rigorous laboratory testing." },
  { icon: Leaf, title: "Sustainably Sourced", desc: "Hand-harvested using traditional methods that protect the environment and support local communities." },
  { icon: Globe, title: "Global Reach", desc: "Delivering the finest Kashmiri saffron to discerning customers in over 50 countries." },
  { icon: Heart, title: "Family Heritage", desc: "Five generations of saffron cultivation, passing down artisanal knowledge and passion." },
];

export default function About() {
  return (
    <main className="pt-28 pb-24">
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src={aboutImage} alt="Saffron fields" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-foreground/50" />
        </div>
        <div className="relative z-10 text-center px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-5xl md:text-6xl font-light text-primary-foreground"
          >
            Our <span className="italic">Story</span>
          </motion.h1>
        </div>
      </section>

      {/* Story */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Since 1987</p>
            <h2 className="font-display text-4xl font-light text-foreground mb-8">
              A Legacy of <span className="italic">Excellence</span>
            </h2>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-6">
              Baby Saffron was born from a deep reverence for the Crocus sativus flower and the ancient traditions of Kashmiri saffron cultivation. For five generations, our family has tended the saffron fields in the Pampore region of Kashmir — known as "Saffron Town" — where the unique terroir produces the world's most aromatic and potent saffron.
            </p>
            <p className="font-body text-sm text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              Each autumn, during the brief two-week harvest window, our skilled artisans rise before dawn to hand-pick the delicate purple crocus flowers. The precious crimson stigmas are carefully separated and dried using time-honored techniques, preserving their extraordinary flavor, aroma, and vibrant color.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Image banner */}
      <section className="px-6">
        <div className="container mx-auto">
          <img src={heroImage} alt="Premium saffron threads" className="w-full h-[400px] object-cover" />
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="container mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="font-display text-4xl font-light text-foreground">
              Our <span className="italic">Values</span>
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="text-center p-8 bg-secondary"
              >
                <v.icon size={28} className="mx-auto mb-4 text-primary" />
                <h3 className="font-display text-lg font-medium text-foreground mb-2">{v.title}</h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
