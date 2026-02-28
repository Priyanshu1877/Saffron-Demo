import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingBag, Heart, User, Menu, X, LogOut, Search } from "lucide-react";
import { useCart } from "@/lib/cart";
import { useWishlist } from "@/lib/wishlist";
import { useAuth } from "@/lib/auth";
import { motion, AnimatePresence } from "framer-motion";
import { SearchOverlay, ChatBot } from "@/components/OverlayFeatures";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/shop", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/orders", label: "Orders" },
  { href: "/recipes", label: "Recipes" },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { totalItems, setIsOpen } = useCart();
  const { items: wishlistItems } = useWishlist();
  const { user, logout } = useAuth();
  const location = useLocation();

  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Show navbar if scrolling up or at the top
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 10) {
        // Hide navbar if scrolling down and not at the top
        setIsVisible(false);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 transition-transform duration-300 ${isVisible || mobileOpen ? 'translate-y-0' : '-translate-y-full'
          }`}
      >
        {/* Top bar */}
        <div className="bg-foreground text-primary-foreground text-center py-1.5 text-xs font-body tracking-[0.2em] uppercase">
          Free Worldwide Shipping on Orders Over $100
        </div>

        <nav className="container mx-auto px-6 flex items-center justify-between h-16 lg:h-20">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden text-foreground"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

            <Link to="/" className="flex flex-col items-start lg:items-center">
              <span className="font-display text-xl lg:text-2xl font-semibold tracking-wider text-foreground">
                ZAFERON GOLD
              </span>
              <span className="text-[8px] lg:text-[10px] font-body tracking-[0.35em] uppercase text-muted-foreground">
                Premium Luxury
              </span>
            </Link>
          </div>

          {/* Nav links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={`text-sm font-body tracking-[0.15em] uppercase transition-colors duration-300 hover:text-primary ${location.pathname === link.href ? "text-primary" : "text-muted-foreground"
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsSearchOpen(true)}
              className="text-foreground hover:text-primary transition-colors"
              aria-label="Search"
            >
              <Search size={20} />
            </button>

            {user ? (
              <>
                <Link to="/orders" className="text-foreground hover:text-primary transition-colors" aria-label="Orders">
                  <User size={20} />
                </Link>
                <button
                  onClick={logout}
                  className="text-foreground hover:text-primary transition-colors"
                  aria-label="Logout"
                  title="Logout"
                >
                  <LogOut size={20} />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-foreground hover:text-primary transition-colors" aria-label="Account">
                <User size={20} />
              </Link>
            )}

            <Link to="/wishlist" className="relative hidden lg:block text-foreground hover:text-primary transition-colors" aria-label="Wishlist">
              <Heart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-red-500 text-white rounded-full text-[10px] flex items-center justify-center font-body">
                  {wishlistItems.length}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsOpen(true)}
              className="relative text-foreground hover:text-primary transition-colors"
              aria-label="Cart"
            >
              <ShoppingBag size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-primary text-primary-foreground rounded-full text-[10px] flex items-center justify-center font-body">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-background border-t border-border overflow-hidden"
            >
              <div className="px-6 py-6 flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-body tracking-[0.15em] uppercase text-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <AnimatePresence>
        {isSearchOpen && <SearchOverlay onClose={() => setIsSearchOpen(false)} />}
      </AnimatePresence>
      <ChatBot />
    </>
  );
}
