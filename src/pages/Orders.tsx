
import { useOrders } from "@/lib/orders";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Package, Truck, CheckCircle, Clock } from "lucide-react";

export default function Orders() {
    const { orders } = useOrders();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "Processing":
                return <Clock className="w-5 h-5 text-yellow-500" />;
            case "Shipped":
                return <Truck className="w-5 h-5 text-blue-500" />;
            case "Delivered":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            default:
                return <Package className="w-5 h-5 text-gray-500" />;
        }
    };

    if (orders.length === 0) {
        return (
            <main className="pt-40 pb-24 text-center container mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="max-w-md mx-auto"
                >
                    <Package className="w-16 h-16 mx-auto text-muted-foreground mb-6" />
                    <h1 className="font-display text-3xl text-foreground mb-4">No orders yet</h1>
                    <p className="text-muted-foreground font-body mb-8">
                        You haven't placed any orders yet. Start shopping to fill your wardrobe with elegance.
                    </p>
                    <Link to="/shop" className="text-primary font-body text-sm hover:underline uppercase tracking-widest">
                        Start Shopping
                    </Link>
                </motion.div>
            </main>
        );
    }

    return (
        <main className="pt-28 pb-24">
            <div className="container mx-auto px-6 max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
                        <span className="italic">My Orders</span>
                    </h1>
                </motion.div>

                <div className="space-y-8">
                    {orders.map((order, index) => (
                        <motion.div
                            key={order.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-card border border-border rounded-lg overflow-hidden"
                        >
                            <div className="p-6 border-b border-border bg-muted/20 flex flex-wrap gap-4 justify-between items-center">
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Order ID</p>
                                    <p className="font-mono text-sm font-medium">#{order.id}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Date</p>
                                    <p className="text-sm font-body">{new Date(order.date).toLocaleDateString()}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Total</p>
                                    <p className="text-sm font-body">${order.total.toFixed(2)}</p>
                                </div>
                                <div className="space-y-1">
                                    <p className="text-xs text-muted-foreground uppercase tracking-wider">Status</p>
                                    <div className="flex items-center gap-2">
                                        {getStatusIcon(order.status)}
                                        <span className="text-sm font-body">{order.status}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6">
                                <div className="space-y-4">
                                    {order.items.map((item, i) => (
                                        <div key={i} className="flex gap-4 items-center">
                                            <div className="w-16 h-20 bg-secondary rounded overflow-hidden flex-shrink-0">
                                                <img src={item.product.image} alt={item.product.name} className="w-full h-full object-cover" />
                                            </div>
                                            <div className="flex-1">
                                                <h4 className="font-display text-sm font-medium">{item.product.name}</h4>
                                                <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                            </div>
                                            <p className="font-body text-sm">${(item.product.price * item.quantity).toFixed(2)}</p>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-6 pt-6 border-t border-border">
                                    <h5 className="text-xs font-medium uppercase tracking-wider text-muted-foreground mb-2">Shipping To:</h5>
                                    <p className="text-sm font-body text-foreground">
                                        {order.shipping.firstName} {order.shipping.lastName}<br />
                                        {order.shipping.address}<br />
                                        {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </main>
    );
}
