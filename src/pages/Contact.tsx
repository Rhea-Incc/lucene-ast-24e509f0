import { motion } from "framer-motion";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import GlassPanel from "@/components/GlassPanel";

const Contact = () => (
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
          <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <input type="text" placeholder="Name" className="rounded-lg border border-border/30 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-glow-primary/40 focus:outline-none" />
              <input type="email" placeholder="Email" className="rounded-lg border border-border/30 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-glow-primary/40 focus:outline-none" />
            </div>
            <input type="text" placeholder="Company" className="rounded-lg border border-border/30 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-glow-primary/40 focus:outline-none" />
            <textarea rows={4} placeholder="Tell us about your project..." className="rounded-lg border border-border/30 bg-background/50 px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:border-glow-primary/40 focus:outline-none resize-none" />
            <button type="submit" className="glass-panel edge-glow rounded-full px-8 py-3 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary">
              SEND MESSAGE
            </button>
          </form>
        </GlassPanel>
      </div>
    </section>

    <FooterSystem />
  </div>
);

export default Contact;
