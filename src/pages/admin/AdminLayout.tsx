import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { LayoutDashboard, ShoppingBag, Box, LogOut, MoreVertical, X, MessageSquare, Search, Bell, User, Menu, Settings } from "lucide-react";
import { Link, Outlet, useLocation } from "react-router-dom";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AdminLayout() {
    const navigate = useNavigate();
    const location = useLocation();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    useEffect(() => {
        const auth = localStorage.getItem("adminAuth");
        if (auth !== "true") {
            navigate("/admin/login");
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("adminAuth");
        navigate("/admin/login");
        toast.success("Logged out successfully");
    };

    if (isAuthenticated === null || isAuthenticated === false) return null;

    const links = [
        { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
        { href: "/admin/orders", label: "Orders", icon: ShoppingBag },
        { href: "/admin/products", label: "Products", icon: Box },
        { href: "/admin/messages", label: "Messages", icon: MessageSquare },
    ];

    return (
        <div className="min-h-screen bg-gray-50 flex font-body text-gray-900 [&_h1]:font-body [&_h2]:font-body [&_h3]:font-body [&_h4]:font-body [&_span]:font-body">
            {/* Mobile Sidebar Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-100 shadow-sm transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                } flex flex-col`}>
                <div className="h-20 flex items-center justify-between px-8 border-b border-gray-100">
                    <div className="flex flex-col">
                        <span className="font-display text-lg font-bold tracking-tight text-gray-900">
                            ZAFERON GOLD
                        </span>
                        <span className="text-[10px] font-medium tracking-[0.2em] uppercase text-gray-400">
                            Admin
                        </span>
                    </div>
                    <button onClick={() => setIsSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-gray-600 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <nav className="flex-1 py-8 px-4 space-y-1.5 overflow-y-auto">
                    {links.map((link) => {
                        const Icon = link.icon;
                        const isActive = location.pathname === link.href || (link.href !== "/admin" && location.pathname.startsWith(link.href));

                        return (
                            <Link
                                key={link.href}
                                to={link.href}
                                className={`flex items-center gap-3.5 px-4 py-3 rounded-xl transition-all duration-200 group relative overflow-hidden ${isActive
                                    ? "bg-primary text-primary-foreground shadow-md shadow-primary/20"
                                    : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
                                    }`}
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <Icon size={20} className={isActive ? "text-primary-foreground" : "text-gray-400 group-hover:text-gray-600 transition-colors"} strokeWidth={2} />
                                <span className="text-sm font-medium">{link.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="p-4 border-t border-gray-100">
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-3 w-full text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
                    >
                        <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
                        <span className="text-sm font-medium">Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0 lg:pl-64 transition-all duration-300">
                {/* Header */}
                <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 h-20 px-4 sm:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsSidebarOpen(true)}
                            className="lg:hidden p-2 -ml-2 text-gray-500 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <Menu size={24} />
                        </button>
                        <h1 className="text-xl font-semibold text-gray-800 hidden sm:block">
                            {links.find(l => l.href === location.pathname)?.label || 'Overview'}
                        </h1>
                    </div>

                    <div className="flex items-center gap-4 sm:gap-6">
                        <div className="relative hidden sm:block">
                            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="h-10 pl-10 pr-4 rounded-full bg-gray-50 border-none focus:ring-2 focus:ring-primary/20 text-sm w-64 transition-all"
                            />
                        </div>

                        <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-full transition-all">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="h-9 w-9 rounded-full bg-gradient-to-tr from-primary to-purple-400 flex items-center justify-center text-white shadow-lg shadow-primary/20 cursor-pointer hover:scale-105 transition-transform">
                                    <User size={18} />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 bg-white border border-gray-100 shadow-xl rounded-xl p-2">
                                <DropdownMenuLabel className="font-semibold text-gray-900 px-2 py-1.5">My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator className="bg-gray-100 my-1" />
                                <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-gray-900 focus:bg-gray-50 rounded-lg px-2 py-1.5 flex items-center gap-2">
                                    <User size={16} />
                                    <span>Profile</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem className="cursor-pointer text-gray-600 focus:text-gray-900 focus:bg-gray-50 rounded-lg px-2 py-1.5 flex items-center gap-2">
                                    <Settings size={16} />
                                    <span>Settings</span>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator className="bg-gray-100 my-1" />
                                <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-700 focus:bg-red-50 rounded-lg px-2 py-1.5 flex items-center gap-2" onClick={handleLogout}>
                                    <LogOut size={16} />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
                    <div className="max-w-7xl mx-auto animate-in fade-in py-2">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}
