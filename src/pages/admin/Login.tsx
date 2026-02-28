import { useNavigate, useSearchParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { ShieldCheck } from "lucide-react";

export default function AdminLogin() {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        if (username === "admin" && password === "admin@123") {
            localStorage.setItem("adminAuth", "true");
            navigate("/admin");
            toast.success("Welcome back!");
        } else {
            toast.error("Invalid credentials");
        }
    };

    const [searchParams] = useSearchParams();

    const handleDemoLogin = () => {
        setUsername("admin");
        setPassword("admin@123");
        localStorage.setItem("adminAuth", "true");
        // Add a slight delay to show the filled inputs before redirecting (optional, but nice for UX)
        setTimeout(() => {
            navigate("/admin");
            toast.success("Demo login successful!");
        }, 500);
    };

    useEffect(() => {
        if (searchParams.get("demo") === "true") {
            handleDemoLogin();
        }
    }, [searchParams]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-secondary/30 px-4">
            <div className="w-full max-w-sm p-8 bg-background border border-border rounded-xl shadow-lg relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-primary/50 to-primary" />

                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 text-primary mb-4">
                        <ShieldCheck size={24} />
                    </div>
                    <h1 className="text-2xl font-display font-semibold text-foreground">ZAFERON GOLD Admin Portal</h1>
                    <p className="text-sm text-muted-foreground mt-2">Sign in to manage your store</p>
                </div>

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-secondary/50 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-all"
                            placeholder="Enter username"
                        />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-muted-foreground">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-secondary/50 border border-border px-4 py-2.5 rounded-lg focus:outline-none focus:ring-1 focus:ring-primary focus:bg-background transition-all"
                            placeholder="Enter password"
                        />
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-foreground text-primary-foreground py-2.5 rounded-lg hover:bg-primary transition-colors font-medium tracking-wide"
                    >
                        Sign In
                    </button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                    <button
                        onClick={handleDemoLogin}
                        className="w-full bg-secondary hover:bg-secondary/80 text-foreground py-2.5 rounded-lg transition-colors font-medium text-sm flex items-center justify-center gap-2 group"
                    >
                        <span>Demo Login</span>
                        <span className="bg-primary/10 text-primary text-[10px] px-2 py-0.5 rounded font-mono group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                            admin / admin@123
                        </span>
                    </button>
                    <p className="text-center text-xs text-muted-foreground mt-4">
                        Click "Demo Login" to sign in instantly with test credentials.
                    </p>
                </div>
            </div>
        </div>
    );
}
