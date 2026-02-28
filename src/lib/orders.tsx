import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { CartItem } from "./cart";

export interface Order {
    id: string;
    items: CartItem[];
    total: number;
    date: string;
    shipping: {
        firstName: string;
        lastName: string;
        email: string;
        address: string;
        city: string;
        state: string;
        zip: string;
    };
    status: "Processing" | "Shipped" | "Delivered";
}

interface OrderContextType {
    orders: Order[]; // Fixed: Order is already imported/defined
    addOrder: (order: Omit<Order, "id" | "date" | "status" | "total"> & { total: number }) => void;
    updateStatus: (orderId: string, status: Order["status"]) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export function OrderProvider({ children }: { children: ReactNode }) {
    const [orders, setOrders] = useState<Order[]>(() => {
        // Load from local storage on initial render
        const savedOrders = localStorage.getItem("orders");
        return savedOrders ? JSON.parse(savedOrders) : [];
    });

    useEffect(() => {
        // Save to local storage whenever orders change
        localStorage.setItem("orders", JSON.stringify(orders));
    }, [orders]);

    const addOrder = (orderData: Omit<Order, "id" | "date" | "status" | "total"> & { total: number }) => {
        const newOrder: Order = {
            ...orderData,
            id: Math.random().toString(36).substr(2, 9).toUpperCase(),
            date: new Date().toISOString(),
            status: "Processing",
        };
        setOrders((prev) => [newOrder, ...prev]);
    };

    const updateStatus = (orderId: string, status: Order["status"]) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === orderId ? { ...order, status } : order
            )
        );
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, updateStatus }}>
            {children}
        </OrderContext.Provider>
    );
}

export function useOrders() {
    const context = useContext(OrderContext);
    if (!context) throw new Error("useOrders must be used within OrderProvider");
    return context;
}
