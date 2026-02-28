import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product, products as initialProducts } from "./products";
import { toast } from "sonner";

interface ProductsContextType {
    products: Product[];
    addProduct: (product: Product) => void;
    deleteProduct: (id: string) => void;
    updateProduct: (id: string, updatedProduct: Partial<Product>) => void;
}

const ProductsContext = createContext<ProductsContextType | undefined>(undefined);

export function ProductsProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        // Load from local storage or use initial products
        const storedProducts = localStorage.getItem("products");
        if (storedProducts) {
            setProducts(JSON.parse(storedProducts));
        } else {
            setProducts(initialProducts);
        }
    }, []);

    useEffect(() => {
        if (products.length > 0) {
            localStorage.setItem("products", JSON.stringify(products));
        }
    }, [products]);

    const addProduct = (product: Product) => {
        setProducts((prev) => [...prev, product]);
        toast.success("Product added successfully");
    };

    const deleteProduct = (id: string) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        toast.success("Product deleted successfully");
    };

    const updateProduct = (id: string, updatedProduct: Partial<Product>) => {
        setProducts((prev) =>
            prev.map((p) => (p.id === id ? { ...p, ...updatedProduct } : p))
        );
        toast.success("Product updated successfully");
    };

    return (
        <ProductsContext.Provider value={{ products, addProduct, deleteProduct, updateProduct }}>
            {children}
        </ProductsContext.Provider>
    );
}

export function useProducts() {
    const context = useContext(ProductsContext);
    if (context === undefined) {
        throw new Error("useProducts must be used within a ProductsProvider");
    }
    return context;
}
