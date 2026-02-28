import { useState, useRef, useEffect } from "react";
import { Search, X, MessageCircle, Send, Plus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useProducts } from "@/lib/products-context";

// Use a simplified Product interface if access to the one in @/lib/products is not possible, 
// or ensure this file properly imports it. Given the context, we'll assume products are imported correctly.

export function SearchOverlay({ onClose }: { onClose: () => void }) {
    const { products } = useProducts();
    const [query, setQuery] = useState("");
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, []);

    const filteredProducts = query
        ? products.filter((p) =>
            p.name.toLowerCase().includes(query.toLowerCase()) ||
            p.category.toLowerCase().includes(query.toLowerCase())
        )
        : [];

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-40 bg-transparent"
                onClick={onClose}
            />

            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                className="absolute top-16 right-4 md:right-20 w-[90vw] md:w-96 bg-background/95 backdrop-blur-md border border-border rounded-xl shadow-2xl z-50 overflow-hidden"
            >
                <div className="p-4 border-b border-border flex items-center gap-3">
                    <Search className="text-muted-foreground w-5 h-5" />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search products..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                    />
                    <button
                        onClick={onClose}
                        className="p-1 hover:bg-secondary rounded-full transition-colors"
                    >
                        <X className="w-4 h-4 text-muted-foreground" />
                    </button>
                </div>

                {filteredProducts.length > 0 ? (
                    <div className="max-h-[300px] overflow-y-auto p-2 bg-secondary/20">
                        {filteredProducts.map((product) => (
                            <Link
                                key={product.id}
                                to={`/product/${product.id}`}
                                onClick={onClose}
                                className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition-colors group"
                            >
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-12 h-12 object-cover rounded-md bg-white border border-border"
                                />
                                <div className="flex-1 min-w-0">
                                    <h3 className="text-sm font-medium truncate group-hover:text-primary transition-colors">
                                        {product.name}
                                    </h3>
                                    <p className="text-xs text-muted-foreground">
                                        ${product.price.toFixed(2)}
                                    </p>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : query ? (
                    <div className="p-8 text-center bg-secondary/20">
                        <p className="text-sm text-muted-foreground">No results found for "{query}"</p>
                    </div>
                ) : null}
            </motion.div>
        </>
    );
}

export function ChatBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{ text: string; isBot: boolean }[]>([
        { text: "Hello! Welcome to Zaferon Gold. How can I assist you with our premium saffron products today?", isBot: true },
    ]);
    const [input, setInput] = useState("");
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isOpen]);

    const handleSend = () => {
        if (!input.trim()) return;

        const userMessage = input;
        setMessages((prev) => [...prev, { text: userMessage, isBot: false }]);
        setInput("");

        // Simulate thinking delay
        setTimeout(() => {
            let botReply = "Thank you for your message. Our team will get back to you shortly.";
            const lowerInput = userMessage.toLowerCase();

            if (lowerInput.includes("saffron") || lowerInput.includes("quality")) {
                botReply = "Our saffron is sourced directly from the finest fields in Kashmir. It is ISO 3632 Category I certified, ensuring the highest potency of color, aroma, and flavor.";
            } else if (lowerInput.includes("price") || lowerInput.includes("cost")) {
                botReply = "Our Premium Saffron Threads start at $29.99 for 1g. We also offer value packs and gift sets. You can view our full price list in the Shop.";
            } else if (lowerInput.includes("shipping") || lowerInput.includes("delivery")) {
                botReply = "We offer free worldwide shipping on all orders over $100. Standard shipping usually takes 3-5 business days.";
            } else if (lowerInput.includes("return") || lowerInput.includes("refund")) {
                botReply = "We have a 30-day satisfaction guarantee. If you're not completely satisfied with your purchase, you can return it for a full refund.";
            } else if (lowerInput.includes("recipe") || lowerInput.includes("cook")) {
                botReply = "Saffron is great for paella, risotto, and tea! Check out our new Recipes page for some delicious ideas.";
            }

            setMessages((prev) => [...prev, { text: botReply, isBot: true }]);
        }, 1000);
    };

    return (
        <>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="fixed bottom-6 right-6 z-40 bg-foreground text-primary-foreground p-4 rounded-full shadow-xl hover:bg-primary transition-all hover:scale-105 active:scale-95 group"
                aria-label="Toggle chat"
            >
                {isOpen ? <X size={24} /> : <MessageCircle size={24} className="group-hover:animate-pulse" />}
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed bottom-24 right-6 z-40 w-[90vw] md:w-96 h-[500px] max-h-[70vh] bg-background border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden"
                    >
                        <div className="bg-foreground text-primary-foreground p-4 flex justify-between items-center shadow-md">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                                    <MessageCircle size={16} className="text-primary" />
                                </div>
                                <div>
                                    <h3 className="font-display font-medium text-sm">Kutus</h3>
                                    <p className="text-[10px] text-muted-foreground flex items-center gap-1">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span> Online
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-white transition-colors">
                                <X size={18} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-secondary/30">
                            {messages.map((msg, i) => (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    key={i}
                                    className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}
                                >
                                    <div
                                        className={`max-w-[80%] p-3.5 rounded-2xl text-sm font-body shadow-sm ${msg.isBot
                                            ? "bg-white text-foreground rounded-tl-none border border-border"
                                            : "bg-foreground text-primary-foreground rounded-tr-none"
                                            }`}
                                    >
                                        {msg.text}
                                    </div>
                                </motion.div>
                            ))}
                            <div ref={messagesEndRef} />
                        </div>

                        <div className="p-3 border-t border-border bg-background">
                            <div className="flex gap-2 items-center bg-secondary/50 rounded-full px-4 py-2 border border-transparent focus-within:border-primary/50 transition-colors">
                                <input
                                    type="text"
                                    placeholder="Type a message..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSend()}
                                    className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
                                />
                                <button
                                    onClick={handleSend}
                                    disabled={!input.trim()}
                                    className={`p-2 rounded-full transition-colors ${input.trim()
                                        ? "bg-foreground text-primary-foreground hover:bg-primary"
                                        : "bg-muted text-muted-foreground cursor-not-allowed"
                                        }`}
                                >
                                    <Send size={14} />
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
