import { useOrders, Order } from "@/lib/orders";
import { useState } from "react";
import { toast } from "sonner";
import { ChevronDown, Search } from "lucide-react";

export default function AdminOrders() {
    const { orders, updateStatus } = useOrders();
    const [searchTerm, setSearchTerm] = useState("");

    const filteredOrders = orders.filter((order) =>
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shipping.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.shipping.lastName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleStatusUpdate = (orderId: string, newStatus: Order["status"]) => {
        updateStatus(orderId, newStatus);
        toast.success(`Order #${orderId} status updated to ${newStatus}`);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="font-display text-2xl font-semibold text-foreground">Orders</h1>
                <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                    <input
                        type="text"
                        placeholder="Search orders..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full pl-9 pr-4 py-2 border border-border rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-border overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-muted-foreground uppercase bg-gray-50 border-b border-border">
                            <tr>
                                <th className="px-6 py-3">Order ID</th>
                                <th className="px-6 py-3">Customer</th>
                                <th className="px-6 py-3">Date</th>
                                <th className="px-6 py-3">Items</th>
                                <th className="px-6 py-3">Total</th>
                                <th className="px-6 py-3">Status</th>
                                <th className="px-6 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-8 text-center text-muted-foreground">
                                        No orders found
                                    </td>
                                </tr>
                            ) : (
                                filteredOrders.map((order) => (
                                    <tr key={order.id} className="border-b border-border hover:bg-gray-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-foreground">#{order.id}</td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium">{order.shipping.firstName} {order.shipping.lastName}</div>
                                            <div className="text-xs text-muted-foreground">{order.shipping.email}</div>
                                        </td>
                                        <td className="px-6 py-4">{new Date(order.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4">{order.items.length} items</td>
                                        <td className="px-6 py-4 font-medium">${order.total.toFixed(2)}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium inline-block ${order.status === "Delivered" ? "bg-green-100 text-green-800" :
                                                    order.status === "Shipped" ? "bg-blue-100 text-blue-800" :
                                                        "bg-yellow-100 text-yellow-800"
                                                }`}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="relative group">
                                                <select
                                                    value={order.status}
                                                    onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order["status"])}
                                                    className="appearance-none bg-transparent border border-border rounded px-3 py-1 pr-8 text-xs focus:outline-none focus:border-primary cursor-pointer hover:bg-secondary"
                                                >
                                                    <option value="Processing">Processing</option>
                                                    <option value="Shipped">Shipped</option>
                                                    <option value="Delivered">Delivered</option>
                                                </select>
                                                <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none text-muted-foreground" size={14} />
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
