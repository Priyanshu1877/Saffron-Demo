import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "./products";
import { toast } from "sonner";

interface WishlistContextType {
    items: Product[];
    addToWishlist: (product: Product) => void;
    removeFromWishlist: (productId: string) => void;
    isInWishlist: (productId: string) => boolean;
    toggleWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function WishlistProvider({ children }: { children: ReactNode }) {
    const [items, setItems] = useState<Product[]>(() => {
        const saved = localStorage.getItem("wishlist");
        if (saved) {
            try {
                return JSON.parse(saved);
            } catch (e) {
                console.error("Failed to parse wishlist from local storage", e);
            }
        }
        return [];
    });

    // Save to local storage whenever items change
    useEffect(() => {
        localStorage.setItem("wishlist", JSON.stringify(items));
    }, [items]);

    const addToWishlist = (product: Product) => {
        if (items.some((i) => i.id === product.id)) return;
        setItems((prev) => [...prev, product]);
        toast.success("Added to wishlist");
    };

    const removeFromWishlist = (productId: string) => {
        setItems((prev) => prev.filter((i) => i.id !== productId));
        toast.success("Removed from wishlist");
    };

    const isInWishlist = (productId: string) => {
        return items.some((i) => i.id === productId);
    };

    const toggleWishlist = (product: Product) => {
        if (isInWishlist(product.id)) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist(product);
        }
    };

    return (
        <WishlistContext.Provider value={{ items, addToWishlist, removeFromWishlist, isInWishlist, toggleWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
}

export function useWishlist() {
    const context = useContext(WishlistContext);
    if (!context) throw new Error("useWishlist must be used within WishlistProvider");
    return context;
}
