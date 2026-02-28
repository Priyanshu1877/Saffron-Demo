import { X, Minus, Plus, ShoppingBag } from "lucide-react";
import { useCart } from "@/lib/cart";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, removeItem, updateQuantity, totalPrice, totalItems } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-foreground/40 z-50"
            onClick={() => setIsOpen(false)}
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-background z-50 flex flex-col"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-border">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} />
                <span className="font-body text-sm tracking-[0.15em] uppercase">Cart ({totalItems})</span>
              </div>
              <button onClick={() => setIsOpen(false)} aria-label="Close cart">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-muted-foreground/30 mb-4" />
                  <p className="font-display text-xl text-muted-foreground">Your cart is empty</p>
                  <p className="font-body text-sm text-muted-foreground/60 mt-2">Discover our premium collection</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-20 h-24 object-cover bg-secondary"
                      />
                      <div className="flex-1">
                        <h4 className="font-display text-base font-medium">{item.product.name}</h4>
                        <p className="text-xs text-muted-foreground mt-0.5">{item.product.weight}</p>
                        <p className="font-body text-sm font-medium mt-1">${item.product.price.toFixed(2)}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-7 h-7 border border-border flex items-center justify-center hover:border-primary transition-colors"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="text-sm font-body w-4 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-7 h-7 border border-border flex items-center justify-center hover:border-primary transition-colors"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-muted-foreground hover:text-foreground self-start"
                        aria-label="Remove item"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="border-t border-border px-6 py-5 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-body text-sm tracking-wider uppercase text-muted-foreground">Subtotal</span>
                  <span className="font-display text-xl font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <Link
                  to="/cart"
                  onClick={() => setIsOpen(false)}
                  className="block w-full bg-foreground text-primary-foreground text-center py-3.5 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors"
                >
                  View Cart & Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
