import { motion } from "framer-motion";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import GlassPanel from "@/components/GlassPanel";
import SEO from "@/components/SEO";
import { Eye, Brain, Lightbulb, Globe, Users, Zap } from "lucide-react";

const values = [
  { icon: Eye, title: "Attention is Currency", desc: "We believe physical attention is the most valuable — and most wasted — asset in marketing. We capture it." },
  { icon: Brain, title: "Intelligence-First", desc: "Every display is a sensor. Every interaction is data. Lucen Brain turns ambient behavior into actionable insights." },
  { icon: Lightbulb, title: "Light as Medium", desc: "Holographic light-field technology creates experiences impossible with screens — stopping power that converts." },
  { icon: Globe, title: "Global Network", desc: "From airports to malls, stadiums to universities — we build physical media networks in high-footfall environments worldwide." },
  { icon: Users, title: "Partner Ecosystem", desc: "We work with brands, agencies, property owners, and OEMs to create shared-value installations." },
  { icon: Zap, title: "Full-Stack Phygital", desc: "Hardware, software, content, analytics, and monetization — all under one roof." },
];

const About = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SEO
        title="About Lucen — Intelligent Environments & Phygital Attention"
        description="Lucen turns physical spaces into intelligent environments through holographic light, simulation, and AI-driven analytics."
        path="/about"
      />
      <CursorLight />
      <Header />

      <section className="relative flex min-h-[60vh] items-center justify-center px-6 pt-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-display text-xs tracking-[0.4em] text-glow-primary">ABOUT LUCEN</p>
            <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
              The infrastructure for{" "}
              <span className="bg-gradient-to-r from-glow-primary via-glow-accent to-glow-warm bg-clip-text text-transparent">
                phygital attention
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground">
              Lucen builds intelligent physical environments where light captures attention, data maps behavior, and systems convert engagement into measurable revenue. We are the bridge between physical spaces and digital intelligence.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <GlassPanel delay={0.1} className="p-8">
              <p className="font-display text-[10px] tracking-[0.3em] text-glow-primary">MISSION</p>
              <h3 className="mt-3 font-display text-2xl font-light text-foreground">
                Transform every physical space into a measurable, monetizable media channel.
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                We believe the future of advertising, retail, and experiences lives at the intersection of physical presence and digital intelligence. Lucen provides the full-stack infrastructure to make that future real — today.
              </p>
            </GlassPanel>

            <GlassPanel delay={0.2} className="p-8">
              <p className="font-display text-[10px] tracking-[0.3em] text-glow-accent">VISION</p>
              <h3 className="mt-3 font-display text-2xl font-light text-foreground">
                A world where every high-footfall environment is intelligent, interactive, and revenue-generating.
              </h3>
              <p className="mt-4 font-body text-sm leading-relaxed text-muted-foreground">
                From airports to malls, stadiums to corporate lobbies — we're building the physical media layer of the future, powered by holographic light, AI analytics, and seamless monetization.
              </p>
            </GlassPanel>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-16 text-center"
          >
            <p className="font-display text-xs tracking-[0.4em] text-glow-accent">WHAT DRIVES US</p>
            <h2 className="mt-3 font-display text-3xl font-light text-foreground sm:text-5xl">Our principles</h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <GlassPanel key={v.title} delay={i * 0.08} className="p-6">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-[hsl(var(--glow-primary)/0.2)] bg-[hsl(var(--glow-primary)/0.06)]">
                    <Icon className="h-5 w-5 text-[hsl(var(--glow-primary))]" />
                  </div>
                  <h3 className="font-display text-base font-medium text-foreground">{v.title}</h3>
                  <p className="mt-2 font-body text-sm leading-relaxed text-muted-foreground">{v.desc}</p>
                </GlassPanel>
              );
            })}
          </div>
        </div>
      </section>

      <FooterSystem />
    </div>
  );
};

export default About;
