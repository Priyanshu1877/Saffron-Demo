import { Link } from "react-router-dom";
import { useCart } from "@/lib/cart";
import { Minus, Plus, X, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();

  return (
    <main className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Shopping <span className="italic">Cart</span>
          </h1>
        </motion.div>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingBag size={64} className="mx-auto text-muted-foreground/20 mb-6" />
            <h2 className="font-display text-2xl text-muted-foreground mb-4">Your cart is empty</h2>
            <Link
              to="/shop"
              className="inline-block bg-foreground text-primary-foreground px-8 py-3 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-6">
              {/* Header */}
              <div className="hidden md:grid grid-cols-[2fr_1fr_1fr_auto] gap-4 pb-4 border-b border-border">
                <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground">Product</span>
                <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground text-center">Quantity</span>
                <span className="font-body text-xs tracking-[0.15em] uppercase text-muted-foreground text-right">Total</span>
                <span className="w-8" />
              </div>

              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_auto] gap-4 items-center py-4 border-b border-border"
                >
                  <div className="flex gap-4">
                    <img src={item.product.image} alt={item.product.name} className="w-24 h-28 object-cover bg-secondary" />
                    <div>
                      <h3 className="font-display text-base font-medium text-foreground">{item.product.name}</h3>
                      <p className="text-xs text-muted-foreground mt-1">{item.product.weight}</p>
                      <p className="font-body text-sm font-medium mt-1">${item.product.price.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="flex items-center border border-border">
                      <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2.5 py-2 hover:bg-secondary">
                        <Minus size={12} />
                      </button>
                      <span className="px-3 py-2 text-sm font-body">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2.5 py-2 hover:bg-secondary">
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>

                  <p className="font-body text-base font-medium text-right">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </p>

                  <button onClick={() => removeItem(item.product.id)} className="text-muted-foreground hover:text-foreground justify-self-end" aria-label="Remove">
                    <X size={16} />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <div className="lg:sticky lg:top-32 h-fit">
              <div className="bg-secondary p-8">
                <h3 className="font-display text-xl font-medium text-foreground mb-6">Order Summary</h3>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{totalPrice >= 100 ? "Free" : "$9.99"}</span>
                  </div>
                </div>
                <div className="border-t border-border pt-4 mb-6">
                  <div className="flex justify-between">
                    <span className="font-body text-sm tracking-wider uppercase">Total</span>
                    <span className="font-display text-2xl font-semibold">
                      ${(totalPrice + (totalPrice >= 100 ? 0 : 9.99)).toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Coupon */}
                <div className="flex mb-6">
                  <input
                    type="text"
                    placeholder="Coupon code"
                    className="flex-1 border border-border px-4 py-2.5 text-sm font-body bg-background focus:outline-none focus:border-primary"
                  />
                  <button className="bg-foreground text-primary-foreground px-4 py-2.5 text-xs font-body tracking-wider uppercase hover:bg-primary transition-colors">
                    Apply
                  </button>
                </div>

                <Link
                  to="/checkout"
                  className="block w-full bg-foreground text-primary-foreground text-center py-3.5 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
