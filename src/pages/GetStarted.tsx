import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import GlassPanel from "@/components/GlassPanel";
import SEO from "@/components/SEO";

const steps = [
  { num: "01", title: "Discovery Call", description: "We map your space, audience, and objectives to design the right solution." },
  { num: "02", title: "System Design", description: "Our team creates a tailored holographic system architecture for your environment." },
  { num: "03", title: "Content Creation", description: "We produce immersive 3D content optimized for your specific deployment." },
  { num: "04", title: "Deployment", description: "Installation, calibration, and integration with your existing infrastructure." },
  { num: "05", title: "Analytics & Optimization", description: "Lucen Brain activates, delivering real-time insights and continuous improvement." },
];

const GetStarted = () => (
  <div className="relative min-h-screen overflow-hidden bg-background">
    <SEO
      title="Get Started — From Discovery to Deployment with Lucen"
      description="Five-step engagement: discovery, system design, content creation, deployment, and Lucen Brain optimization."
      path="/get-started"
    />
    <CursorLight />
    <Header />

    <section className="relative pt-32 pb-16 px-6">
      <div className="mx-auto max-w-4xl text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-display text-xs tracking-[0.4em] text-glow-primary">BEGIN</p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
            Get <span className="bg-gradient-to-r from-glow-primary to-glow-warm bg-clip-text text-transparent">started</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg font-body text-sm text-muted-foreground">
            From first contact to live deployment — here's how we bring Lucen to your space.
          </p>
        </motion.div>
      </div>
    </section>

    <section className="px-6 pb-24">
      <div className="mx-auto max-w-3xl flex flex-col gap-4">
        {steps.map((s, i) => (
          <GlassPanel key={s.num} delay={i * 0.1} className="flex items-start gap-6 p-6">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-glow-primary/20 font-display text-sm text-glow-primary">{s.num}</span>
            <div>
              <h3 className="font-display text-lg font-light text-foreground">{s.title}</h3>
              <p className="mt-2 font-body text-sm text-muted-foreground">{s.description}</p>
            </div>
          </GlassPanel>
        ))}
      </div>
    </section>

    <section className="px-6 pb-32 text-center">
      <Link to="/contact" className="glass-panel edge-glow inline-block rounded-full px-10 py-4 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary">
        SCHEDULE A DISCOVERY CALL
      </Link>
    </section>

    <FooterSystem />
  </div>
);

export default GetStarted;
