import { useState } from "react";
import { motion } from "framer-motion";
import { Phone, MessageCircle, ArrowUpRight } from "lucide-react";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import GlassPanel from "@/components/GlassPanel";
import SEO from "@/components/SEO";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

const PHONE_1 = "+254727750097";
const PHONE_2 = "+254727105289";

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "", type: "message" as "message" | "callback" });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
        message: `[${form.type === "callback" ? "CALLBACK REQUEST" : "MESSAGE"}] ${form.message.trim()}`,
      });
      if (error) throw error;

      await supabase.functions.invoke("send-contact-notification", {
        body: { name: form.name, email: form.email, company: form.company, message: form.message, type: form.type },
      });

      toast({ title: form.type === "callback" ? "Callback requested!" : "Message sent!", description: "We'll get back to you soon." });
      setForm({ name: "", email: "", company: "", message: "", type: "message" });
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
      <SEO
        title="Contact Lucen — Message, Call, or Request a Callback"
        description="Reach Lucen by message, phone (+254727750097, +254727105289), or schedule a callback to discuss your phygital project."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Lucen",
          url: "https://lucene-ast.lovable.app/",
          telephone: ["+254727750097", "+254727105289"],
          contactPoint: [
            { "@type": "ContactPoint", telephone: "+254727750097", contactType: "sales" },
            { "@type": "ContactPoint", telephone: "+254727105289", contactType: "customer support" },
          ],
        }}
      />
      <CursorLight />
      <Header />

      <section className="relative flex min-h-[80vh] items-center justify-center px-6 pt-16">
        <div className="mx-auto max-w-3xl w-full">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="text-center mb-12">
            <p className="font-display text-xs tracking-[0.4em] text-glow-primary">CONNECT</p>
            <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
              Get in <span className="bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">touch</span>
            </h1>
            <p className="mt-4 font-body text-sm text-muted-foreground">Ready to transform physical attention into measurable revenue?</p>
          </motion.div>

          {/* Quick contact options */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 mb-8">
            <GlassPanel delay={0.1} hover className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--glow-primary)/0.2)] bg-[hsl(var(--glow-primary)/0.08)]">
                <Phone className="h-5 w-5 text-[hsl(var(--glow-primary))]" />
              </div>
              <div>
                <p className="font-display text-xs tracking-[0.15em] text-foreground">CALL US</p>
                <a href={`tel:${PHONE_1}`} className="font-body text-sm text-muted-foreground hover:text-[hsl(var(--glow-primary))] transition-colors">{PHONE_1}</a>
                <br />
                <a href={`tel:${PHONE_2}`} className="font-body text-sm text-muted-foreground hover:text-[hsl(var(--glow-primary))] transition-colors">{PHONE_2}</a>
              </div>
            </GlassPanel>

            <GlassPanel delay={0.15} hover className="flex items-center gap-4 p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[hsl(var(--glow-accent)/0.2)] bg-[hsl(var(--glow-accent)/0.08)]">
                <MessageCircle className="h-5 w-5 text-[hsl(var(--glow-accent))]" />
              </div>
              <div>
                <p className="font-display text-xs tracking-[0.15em] text-foreground">WHATSAPP</p>
                <a href={`https://wa.me/${PHONE_1.replace("+", "")}`} target="_blank" rel="noopener noreferrer" className="font-body text-sm text-muted-foreground hover:text-[hsl(var(--glow-accent))] transition-colors flex items-center gap-1">
                  Chat with us <ArrowUpRight className="h-3 w-3" />
                </a>
              </div>
            </GlassPanel>
          </div>

          <GlassPanel delay={0.2} hover={false} className="p-8">
            <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <input name="name" type="text" placeholder="Name *" value={form.name} onChange={handleChange} className={inputClass} required />
                <input name="email" type="email" placeholder="Email *" value={form.email} onChange={handleChange} className={inputClass} required />
              </div>
              <input name="company" type="text" placeholder="Company" value={form.company} onChange={handleChange} className={inputClass} />

              {/* Contact type selector */}
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "message" }))}
                  className={`glass-panel rounded-full px-5 py-2 font-display text-[10px] tracking-[0.15em] transition-all duration-300 ${
                    form.type === "message" ? "edge-glow text-foreground" : "text-muted-foreground"
                  }`}
                >
                  LEAVE A MESSAGE
                </button>
                <button
                  type="button"
                  onClick={() => setForm((p) => ({ ...p, type: "callback" }))}
                  className={`glass-panel rounded-full px-5 py-2 font-display text-[10px] tracking-[0.15em] transition-all duration-300 ${
                    form.type === "callback" ? "edge-glow text-foreground" : "text-muted-foreground"
                  }`}
                >
                  REQUEST CALLBACK
                </button>
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder={form.type === "callback" ? "Best time to reach you and brief project details... *" : "Tell us about your project... *"}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="glass-panel edge-glow rounded-full px-8 py-3 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary disabled:opacity-50"
              >
                {loading ? "SENDING..." : form.type === "callback" ? "REQUEST CALLBACK" : "SEND MESSAGE"}
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
