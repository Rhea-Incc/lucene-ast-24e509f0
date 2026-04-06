import { useState } from "react";
import { motion } from "framer-motion";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import GlassPanel from "@/components/GlassPanel";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast({ title: "Please fill in all required fields", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const id = crypto.randomUUID();
      const { error } = await supabase.from("contact_submissions").insert({
        id,
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;

      // Send notification email via edge function
      await supabase.functions.invoke("send-contact-notification", {
        body: { name: form.name, email: form.email, company: form.company, message: form.message },
      });

      toast({ title: "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", company: "", message: "" });
    } catch (err: any) {
      console.error(err);
      toast({ title: "Something went wrong", description: "Please try again later.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "rounded-lg border border-border/30 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-glow-primary/40 focus:outline-none";

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <CursorLight />
      <Header />

      <section className="relative flex min-h-[80vh] items-center justify-center px-6 pt-16">
        <div className="mx-auto max-w-2xl w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-glow-primary">CONNECT</p>
            <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
              Get in <span className="bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">touch</span>
            </h1>
            <p className="mt-4 font-body text-sm text-muted-foreground">Ready to transform physical attention into measurable revenue?</p>
          </motion.div>

          <GlassPanel delay={0.2} hover={false} className="p-8">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input name="name" type="text" placeholder="Name *" value={form.name} onChange={handleChange} className={inputClass} required />
                <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} className={inputClass} required />
              </div>
              <input name="company" type="text" placeholder="Company" value={form.company} onChange={handleChange} className={inputClass} />
              <textarea name="message" rows={4} placeholder="Tell us about your project... *" value={form.message} onChange={handleChange} className={`${inputClass} resize-none`} required />
              <button
                type="submit"
                disabled={loading}
                className="glass-panel edge-glow rounded-full px-8 py-3 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary disabled:opacity-50"
              >
                {loading ? "SENDING..." : "SEND MESSAGE"}
              </button>
            </form>
          </GlassPanel>
        </div>
      </section>

      <FooterSystem />
    </div>
  );
};

export default Contact;
