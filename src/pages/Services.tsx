import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import GlassPanel from "@/components/GlassPanel";
import LazyVideo from "@/components/LazyVideo";
import SEO from "@/components/SEO";

const services = [
  { title: "Holographic Systems", video: "/videos/scale-your-message.mp4", description: "Light-field displays that stop traffic and convert attention into interaction. Our holographic systems create impossible-to-ignore experiences in physical spaces." },
  { title: "Simulation & 3D Environments", video: "/videos/simulation.mp4", description: "Real-time spatial simulations for architecture, products, and immersive spaces. From real estate walkthroughs to industrial training." },
  { title: "Lucen Brain", video: "/videos/data-viz.mp4", description: "AI-driven analytics that maps footfall, dwell time, and behavioral patterns into actionable data. Every interaction becomes measurable." },
  { title: "Content & Experience Design", video: "/videos/track-overlay.mp4", description: "3D modeling, animation, and interactive content crafted for holographic delivery. We design experiences, not just content." },
];

const Services = () => (
  <div className="relative min-h-screen overflow-hidden bg-background">
    <SEO
      title="Services — Holographic Systems, Simulation & Lucen Brain"
      description="Light-field holographic displays, real-time 3D simulation environments, AI analytics, and immersive content design."
      path="/services"
      jsonLd={services.map((s) => ({ "@context": "https://schema.org", "@type": "Service", name: s.title, description: s.description, provider: { "@type": "Organization", name: "Lucen" } }))}
    />
    <CursorLight />
    <Header />

    <section className="relative pt-32 pb-16 px-6">
      <div className="mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
          <p className="font-display text-xs tracking-[0.4em] text-glow-primary">CAPABILITIES</p>
          <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
            What we <span className="bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">build</span>
          </h1>
        </motion.div>
      </div>
    </section>

    <section className="px-6 pb-32">
      <div className="mx-auto max-w-6xl flex flex-col gap-16">
        {services.map((s, i) => (
          <motion.div key={s.title} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}
            className={`flex flex-col gap-8 md:flex-row md:items-center md:gap-12 ${i % 2 !== 0 ? "md:flex-row-reverse" : ""}`}
          >
            <div className="glass-panel relative w-full overflow-hidden rounded-2xl md:w-1/2">
              <div className="aspect-video">
                <LazyVideo src={s.video} className="h-full w-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <p className="font-display text-[10px] tracking-[0.3em] text-glow-primary">{String(i + 1).padStart(2, "0")}</p>
              <h2 className="mt-3 font-display text-2xl font-light text-foreground md:text-3xl">{s.title}</h2>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">{s.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>

    <FooterSystem />
  </div>
);

export default Services;
