import { Link } from "react-router-dom";
import { useWishlist } from "@/lib/wishlist";
import { useCart } from "@/lib/cart";
import { X, Heart, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import { Product } from "@/lib/products";

export default function Wishlist() {
    const { items, removeFromWishlist } = useWishlist();
    const { addItem } = useCart();

    const handleAddToCart = (product: Product) => {
        addItem(product);
    };

    return (
        <main className="pt-28 pb-24">
            <div className="container mx-auto px-6">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
                    <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
                        My <span className="italic">Wishlist</span>
                    </h1>
                </motion.div>

                {items.length === 0 ? (
                    <div className="text-center py-20">
                        <Heart size={64} className="mx-auto text-muted-foreground/20 mb-6" />
                        <h2 className="font-display text-2xl text-muted-foreground mb-4">Your wishlist is empty</h2>
                        <Link
                            to="/shop"
                            className="inline-block bg-foreground text-primary-foreground px-8 py-3 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {items.map((product) => (
                            <motion.div
                                key={product.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="group relative"
                            >
                                <div className="relative overflow-hidden bg-secondary aspect-[3/4] mb-4">
                                    <Link to={`/product/${product.id}`}>
                                        <img
                                            src={product.image}
                                            alt={product.name}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                        />
                                    </Link>

                                    <button
                                        onClick={() => removeFromWishlist(product.id)}
                                        className="absolute top-2 right-2 p-2 bg-background/80 backdrop-blur-sm rounded-full text-foreground hover:text-red-500 transition-colors z-10"
                                        aria-label="Remove from wishlist"
                                    >
                                        <X size={16} />
                                    </button>

                                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                                        <button
                                            onClick={() => handleAddToCart(product)}
                                            className="w-full bg-foreground text-primary-foreground py-3 text-xs font-body tracking-[0.15em] uppercase flex items-center justify-center gap-2 hover:bg-primary transition-colors"
                                        >
                                            <ShoppingBag size={14} />
                                            Add to Cart
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <p className="text-[10px] font-body tracking-[0.2em] uppercase text-muted-foreground">
                                        {product.category}
                                    </p>
                                    <Link to={`/product/${product.id}`}>
                                        <h3 className="font-display text-lg font-medium text-foreground hover:text-primary transition-colors">
                                            {product.name}
                                        </h3>
                                    </Link>
                                    <p className="font-body text-base font-medium text-foreground">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </main>
    );
}
