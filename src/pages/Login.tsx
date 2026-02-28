import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth";

export default function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;

    await login(email);
    navigate("/");
  };

  return (
    <main className="pt-28 pb-24 min-h-screen flex items-center">
      <div className="container mx-auto px-6">
        <div className="max-w-md mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-10">
            <Link to="/" className="font-display text-2xl font-semibold tracking-wider text-foreground">
              ZAFERON GOLD
            </Link>
            <h1 className="font-display text-3xl font-light text-foreground mt-6">
              {isSignUp ? "Create Account" : "Welcome Back"}
            </h1>
            <p className="font-body text-sm text-muted-foreground mt-2">
              {isSignUp ? "Join the Silkspun family" : "Sign in to your account"}
            </p>
          </motion.div>

          {/* Demo Login Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="mb-8 p-4 bg-primary/5 border border-primary/20 rounded-md text-sm text-center"
          >
            <p className="font-medium text-primary mb-1">Demo Login Available</p>
            <p className="text-muted-foreground text-xs">Enter any email and password to sign in.</p>
          </motion.div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            {isSignUp && (
              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Full Name</label>
                <input
                  type="text"
                  className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            )}
            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {!isSignUp && (
              <div className="text-right">
                <button type="button" className="font-body text-xs text-primary hover:underline">
                  Forgot Password?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-foreground text-primary-foreground py-3.5 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                isSignUp ? "Create Account" : "Sign In"
              )}
            </button>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or</span>
              </div>
            </div>

            <Link
              to="/admin/login"
              className="w-full block text-center bg-secondary hover:bg-secondary/80 text-foreground py-3.5 text-sm font-body tracking-[0.15em] uppercase transition-colors"
            >
              Admin Login
            </Link>
          </motion.form>

          <div className="text-center mt-8">
            <p className="font-body text-sm text-muted-foreground">
              {isSignUp ? "Already have an account?" : "Don't have an account?"}{" "}
              <button onClick={() => setIsSignUp(!isSignUp)} className="text-primary hover:underline font-medium">
                {isSignUp ? "Sign In" : "Create one"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
