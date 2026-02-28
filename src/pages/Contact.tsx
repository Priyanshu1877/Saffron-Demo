import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useMessages } from "@/lib/messages-context";

export default function Contact() {
  const { toast } = useToast();
  const { addMessage } = useMessages();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addMessage({
      user: form.name,
      email: form.email,
      subject: form.subject,
      content: form.message
    });
    toast({ title: "Message Sent", description: "We'll get back to you within 24 hours." });
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <main className="pt-28 pb-24">
      <div className="container mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
          <p className="font-body text-xs tracking-[0.3em] uppercase text-primary mb-3">Get in Touch</p>
          <h1 className="font-display text-4xl md:text-5xl font-light text-foreground">
            Contact <span className="italic">Us</span>
          </h1>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-5xl mx-auto">
          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Name</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div>
                <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Email</label>
                <input
                  type="email"
                  required
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Subject</label>
              <input
                type="text"
                required
                value={form.subject}
                onChange={(e) => setForm({ ...form, subject: e.target.value })}
                className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="block font-body text-xs tracking-[0.15em] uppercase text-muted-foreground mb-2">Message</label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full border border-border px-4 py-3 text-sm font-body bg-background focus:outline-none focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-foreground text-primary-foreground py-3.5 text-sm font-body tracking-[0.15em] uppercase hover:bg-primary transition-colors"
            >
              Send Message
            </button>
          </motion.form>

          {/* Info */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }} className="space-y-8">
            {[
              { icon: MapPin, title: "Visit Us", lines: ["Pampore, Srinagar", "Kashmir, India 192121"] },
              { icon: Mail, title: "Email", lines: ["hello@babysaffron.com", "support@babysaffron.com"] },
              { icon: Phone, title: "Phone", lines: ["+91 194 244 0000", "+1 (888) 555-0123"] },
              { icon: Clock, title: "Hours", lines: ["Mon – Fri: 9AM – 6PM IST", "Sat: 10AM – 4PM IST"] },
            ].map(({ icon: Icon, title, lines }, i) => (
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 bg-secondary flex items-center justify-center flex-shrink-0">
                  <Icon size={18} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-display text-base font-medium text-foreground mb-1">{title}</h3>
                  {lines.map((line, j) => (
                    <p key={j} className="font-body text-sm text-muted-foreground">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </main>
  );
}
