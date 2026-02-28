import { useCart } from "@/lib/cart";
import { useOrders } from "@/lib/orders";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Loader2, CheckCircle, CreditCard, Lock, Package } from "lucide-react";
import { toast } from "sonner";

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart();
  const { addOrder } = useOrders();
  const navigate = useNavigate();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("card");

  const shipping = totalPrice >= 100 ? 0 : 9.99;
  const total = totalPrice + shipping;

  const handleCheckout = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsProcessing(true);

    const formData = new FormData(e.currentTarget);
    const shippingDetails = {
      firstName: formData.get("firstName") as string,
      lastName: formData.get("lastName") as string,
      email: formData.get("email") as string,
      address: formData.get("address") as string,
      city: formData.get("city") as string,
      state: formData.get("state") as string,
      zip: formData.get("zip") as string,
    };

    // Simulate payment processing delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    addOrder({
      items,
      total,
      shipping: shippingDetails
    });

    setIsProcessing(false);
    setIsSuccess(true);
    clearCart();
    toast.success("Order placed successfully!");
  };

  if (items.length === 0 && !isSuccess) {
    return (
      <main className="pt-40 pb-24 text-center">
        <h1 className="font-display text-3xl text-foreground mb-4">Nothing to checkout</h1>
        <Link to="/shop" className="text-primary font-body text-sm hover:underline">
          Continue Shopping
        </Link>
      </main>
    );
  }

  if (isSuccess) {
    return (
      <main className="pt-40 pb-24 text-center container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md mx-auto bg-card p-12 rounded-lg border border-border text-center"
        >
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-16 h-16 text-green-500" />
          </div>
          <h1 className="font-display text-3xl text-foreground mb-4">
            Order Confirmed!
          </h1>
          <p className="text-muted-foreground font-body mb-8">
            Thank you for your purchase. We've sent a confirmation email to your inbox.
          </p>
          <div className="flex flex-col gap-3">
            <button
              onClick={() => navigate("/orders")}
              className="w-full bg-secondary text-secondary-foreground py-4 text-sm font-body tracking-[0.15em] uppercase hover:bg-secondary/80 transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              View My Orders
            </button>
            <button
              onClick={() => navigate("/shop")}
              className="w-full bg-foreground text-primary-foreground py-4 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
            <span className="italic">Checkout</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <form onSubmit={handleCheckout} className="space-y-8">
              {/* Shipping Information */}
              <div>
                <h2 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                  Shipping Information
                </h2>
                <div className="bg-card/50 p-6 rounded-lg border border-border space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        First Name
                      </label>
                      <input
                        required
                        name="firstName"
                        className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        Last Name
                      </label>
                      <input
                        required
                        name="lastName"
                        className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                        placeholder="Doe"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Email
                    </label>
                    <input
                      required
                      name="email"
                      type="email"
                      className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                      Address
                    </label>
                    <input
                      required
                      name="address"
                      className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                      placeholder="123 Fashion St"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        City
                      </label>
                      <input
                        required
                        name="city"
                        className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        State
                      </label>
                      <input
                        required
                        name="state"
                        className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                      />
                    </div>
                    <div>
                      <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                        ZIP
                      </label>
                      <input
                        required
                        name="zip"
                        className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div>
                <h2 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                  Payment Method
                </h2>
                <div className="bg-card/50 p-6 rounded-lg border border-border space-y-6">
                  <div className="flex gap-4 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("card")}
                      className={`flex-1 py-3 px-4 rounded-md border text-sm font-body transition-all ${paymentMethod === "card"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-muted-foreground"
                        }`}
                    >
                      Credit Card
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("paypal")}
                      className={`flex-1 py-3 px-4 rounded-md border text-sm font-body transition-all ${paymentMethod === "paypal"
                        ? "border-primary bg-primary/5 text-primary"
                        : "border-border hover:border-muted-foreground"
                        }`}
                    >
                      PayPal
                    </button>
                  </div>

                  {paymentMethod === "card" && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-top-2">
                      <div className="relative">
                        <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                          Card Number
                        </label>
                        <div className="relative">
                          <input
                            required={paymentMethod === "card"}
                            type="text"
                            maxLength={19}
                            className="w-full border border-border px-4 py-3 pl-10 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                            placeholder="0000 0000 0000 0000"
                          />
                          <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                            Expiry Date
                          </label>
                          <input
                            required={paymentMethod === "card"}
                            type="text"
                            placeholder="MM/YY"
                            maxLength={5}
                            className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                          />
                        </div>
                        <div>
                          <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">
                            CVC
                          </label>
                          <div className="relative">
                            <input
                              required={paymentMethod === "card"}
                              type="text"
                              maxLength={4}
                              className="w-full border border-border px-4 py-3 pl-10 text-sm font-body bg-background focus:outline-none focus:border-primary rounded-md"
                              placeholder="123"
                            />
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {paymentMethod === "paypal" && (
                    <div className="text-center py-8 text-muted-foreground text-sm font-body animate-in fade-in slide-in-from-top-2">
                      You will be redirected to PayPal to complete your purchase securely.
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full bg-foreground text-primary-foreground py-4 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 rounded-md"
              >
                {isProcessing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Processing...
                  </>
                ) : (
                  `Place Order — $${total.toFixed(2)}`
                )}
              </button>
            </form>
          </motion.div>

          {/* Summary */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="lg:sticky lg:top-24">
              <h2 className="font-body text-xs tracking-[0.2em] uppercase text-muted-foreground mb-6">
                Order Summary
              </h2>
              <div className="bg-card/50 p-6 rounded-lg border border-border">
                <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex gap-4 group">
                      <div className="relative overflow-hidden w-16 h-20 bg-secondary rounded-sm">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-display text-sm font-medium">
                          {item.product.name}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-body text-sm">
                        ${(item.product.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-border pt-4 space-y-2">
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm font-body">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between font-body pt-2 border-t border-border mt-2">
                    <span className="text-sm tracking-wider uppercase font-medium">
                      Total
                    </span>
                    <span className="font-display text-xl font-semibold">
                      ${total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/30 rounded-lg border border-border/50">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Your transaction is secured with industry-standard SSK encryption. We do not store your full card details.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
