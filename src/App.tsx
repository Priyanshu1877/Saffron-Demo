import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/lib/cart";
import { ProductsProvider } from "@/lib/products-context";
import { MessagesProvider } from "@/lib/messages-context";
import { WishlistProvider } from "@/lib/wishlist";
import PublicLayout from "./pages/PublicLayout";
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import CartPage from "./pages/Cart";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import AdminLogin from "./pages/admin/Login";
import AdminDashboard from "./pages/admin/Dashboard";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminOrders from "./pages/admin/Orders";
import AdminMessages from "./pages/admin/Messages";
import AdminProducts from "./pages/admin/Products";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import NotFound from "./pages/NotFound";
import Wishlist from "./pages/Wishlist";
import Recipes from "./pages/Recipes";
import { OrderProvider } from "@/lib/orders";

import { AuthProvider } from "@/lib/auth";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <OrderProvider>
            <CartProvider>
              <ProductsProvider>
                <MessagesProvider>
                  <WishlistProvider>
                    <Routes>
                      {/* Public Routes */}
                      <Route element={<PublicLayout />}>
                        <Route path="/" element={<Index />} />
                        <Route path="/shop" element={<Shop />} />
                        <Route path="/product/:id" element={<ProductDetail />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/wishlist" element={<Wishlist />} />
                        <Route path="/recipes" element={<Recipes />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/checkout" element={<Checkout />} />
                        <Route path="/orders" element={<Orders />} />
                        <Route path="*" element={<NotFound />} />
                      </Route>

                      {/* Admin Routes */}
                      <Route path="/admin/login" element={<AdminLogin />} />
                      <Route path="/admin" element={<AdminLayout />}>
                        <Route index element={<AdminDashboard />} />
                        <Route path="orders" element={<AdminOrders />} />
                        <Route path="products" element={<AdminProducts />} />
                        <Route path="messages" element={<AdminMessages />} />
                      </Route>
                    </Routes>
                  </WishlistProvider>
                </MessagesProvider>
              </ProductsProvider>
            </CartProvider>
          </OrderProvider>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
