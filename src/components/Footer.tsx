import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-foreground text-primary-foreground">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <h3 className="font-display text-2xl font-semibold tracking-wider mb-4">ZAFERON GOLD</h3>
            <p className="font-body text-sm text-primary-foreground/60 leading-relaxed mb-6">
              Curating the world's finest saffron, hand-picked from the valleys of Kashmir. Each strand tells a story of tradition and excellence.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors" aria-label="Instagram">
                <Instagram size={18} />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors" aria-label="Facebook">
                <Facebook size={18} />
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary transition-colors" aria-label="Twitter">
                <Twitter size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-6">Quick Links</h4>
            <div className="flex flex-col gap-3">
              {[
                { href: "/shop", label: "Collections" },
                { href: "/about", label: "Our Story" },
                { href: "/contact", label: "Contact Us" },
              ].map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-sm font-body text-primary-foreground/60 hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Customer Care */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-6">Customer Care</h4>
            <div className="flex flex-col gap-3">
              {["Shipping & Returns", "Privacy Policy", "Terms of Service", "FAQs"].map((label) => (
                <span key={label} className="text-sm font-body text-primary-foreground/60 hover:text-primary transition-colors cursor-pointer">
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-body text-xs tracking-[0.2em] uppercase mb-6">Newsletter</h4>
            <p className="text-sm font-body text-primary-foreground/60 mb-4">
              Subscribe for exclusive offers and updates.
            </p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-primary-foreground/10 border border-primary-foreground/20 px-4 py-2.5 text-sm font-body text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:border-primary"
              />
              <button className="bg-primary text-primary-foreground px-5 py-2.5 text-sm font-body tracking-wider uppercase hover:bg-gold-dark transition-colors">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/10 mt-12 pt-8 text-center">
          <p className="text-xs font-body text-primary-foreground/40 tracking-wider">
            © 2026 Zaferon Gold. All rights reserved. Crafted with love.
          </p>
        </div>
      </div>
    </footer>
  );
}
