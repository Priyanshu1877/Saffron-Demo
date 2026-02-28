import { useOrders } from "@/lib/orders";
import { ShoppingBag, TrendingUp, Users, ArrowUpRight, ArrowDownRight, Clock, Package } from "lucide-react";

export default function AdminDashboard() {
    const { orders } = useOrders();

    const totalRevenue = orders.reduce((acc, order) => acc + order.total, 0);
    const totalOrders = orders.length;
    const pendingOrders = orders.filter((o) => o.status === "Processing").length;

    const stats = [
        {
            label: "Total Revenue",
            value: `$${totalRevenue.toLocaleString()}`,
            change: "+12.5%",
            trend: "up",
            icon: TrendingUp,
            color: "text-emerald-600",
            bg: "bg-emerald-50",
        },
        {
            label: "Total Orders",
            value: totalOrders,
            change: "+4.2%",
            trend: "up",
            icon: ShoppingBag,
            color: "text-blue-600",
            bg: "bg-blue-50",
        },
        {
            label: "Pending Orders",
            value: pendingOrders,
            change: "-2.1%",
            trend: "down",
            icon: Clock,
            color: "text-amber-600",
            bg: "bg-amber-50",
        },
    ];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 transition-all hover:shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                                <stat.icon size={24} />
                            </div>
                            <span className={`flex items-center text-xs font-semibold px-2.5 py-1 rounded-full ${stat.trend === "up" ? "text-emerald-700 bg-emerald-50" : "text-rose-700 bg-rose-50"
                                }`}>
                                {stat.trend === "up" ? <ArrowUpRight size={14} className="mr-1" /> : <ArrowDownRight size={14} className="mr-1" />}
                                {stat.change}
                            </span>
                        </div>
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">{stat.label}</p>
                            <h3 className="text-3xl font-bold text-gray-900 tracking-tight">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-6 border-b border-gray-100 flex justify-between items-center">
                    <div>
                        <h3 className="text-lg font-bold text-gray-900">Recent Orders</h3>
                        <p className="text-sm text-gray-500 mt-1">Manage your latest transactions</p>
                    </div>
                    <button className="text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                        View All
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50">
                            <tr>
                                <th className="px-6 py-4 font-semibold">Order ID</th>
                                <th className="px-6 py-4 font-semibold">Customer</th>
                                <th className="px-6 py-4 font-semibold">Date</th>
                                <th className="px-6 py-4 font-semibold">Amount</th>
                                <th className="px-6 py-4 font-semibold">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {orders.slice(0, 5).map((order) => (
                                <tr key={order.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-gray-900">
                                        <div className="flex items-center gap-2">
                                            <Package size={16} className="text-gray-400" />
                                            #{order.id}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="font-medium text-gray-900">{order.shipping.firstName} {order.shipping.lastName}</span>
                                            <span className="text-xs text-gray-500">{order.shipping.email}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-500">{new Date(order.date).toLocaleDateString()}</td>
                                    <td className="px-6 py-4 font-medium text-gray-900">${order.total.toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${order.status === "Delivered" ? "bg-emerald-50 text-emerald-700 border-emerald-100" :
                                                order.status === "Shipped" ? "bg-blue-50 text-blue-700 border-blue-100" :
                                                    "bg-amber-50 text-amber-700 border-amber-100"
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${order.status === "Delivered" ? "bg-emerald-500" :
                                                    order.status === "Shipped" ? "bg-blue-500" :
                                                        "bg-amber-500"
                                                }`}></span>
                                            {order.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                            {orders.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                                        <div className="flex flex-col items-center justify-center">
                                            <ShoppingBag size={48} className="text-gray-200 mb-4" />
                                            <p className="text-base font-medium text-gray-900">No orders found</p>
                                            <p className="text-sm text-gray-500 mt-1">Your recent orders will appear here.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
