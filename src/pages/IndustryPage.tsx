import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { industries } from "@/components/IndustriesField";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import LazyVideo from "@/components/LazyVideo";
import GlassPanel from "@/components/GlassPanel";

const industryContent: Record<string, { tagline: string; description: string; services: string[]; benefits: string[] }> = {
  "retail-luxury": {
    tagline: "Captivate shoppers at the point of decision",
    description: "Our holographic displays and interactive installations transform retail environments into immersive brand experiences that stop traffic, extend dwell time, and drive measurable conversions.",
    services: ["In-store holographic displays", "Interactive product showcases", "Footfall analytics & heatmaps", "Campaign performance tracking"],
    benefits: ["3x increase in product engagement", "47% longer dwell time", "Real-time behavioral analytics", "Seamless brand integration"],
  },
  "real-estate": {
    tagline: "Sell properties before they're built",
    description: "3D architectural simulations and holographic building visualizations that let buyers walk through properties, explore finishes, and experience spaces — accelerating sales cycles.",
    services: ["3D building simulations", "Holographic property tours", "Interactive floor plan exploration", "Sales center installations"],
    benefits: ["Accelerated sales cycles", "Premium buyer experience", "Off-plan visualization", "Data-driven engagement insights"],
  },
  "automotive": {
    tagline: "The showroom of the future",
    description: "Holographic vehicle displays and interactive configurators that let customers explore every angle, color, and feature without a physical car on the floor.",
    services: ["Holographic vehicle displays", "Interactive configurators", "Showroom digital twin", "Test drive simulation"],
    benefits: ["Reduced physical inventory needs", "Enhanced product discovery", "Personalized experiences", "Higher conversion rates"],
  },
  "universities": {
    tagline: "Recruit the next generation with immersion",
    description: "Interactive campus simulations and holographic installations that give prospective students a taste of university life, boosting enrollment and engagement.",
    services: ["Campus simulation experiences", "Open day installations", "Interactive program explorers", "Student engagement analytics"],
    benefits: ["Higher open day engagement", "Boosted enrollment rates", "Data on prospective interests", "Memorable recruitment experiences"],
  },
  "telecom": {
    tagline: "Simplify complexity through experience",
    description: "Interactive displays that make complex telecom offerings tangible, helping customers understand and choose products through holographic demonstrations.",
    services: ["Product visualization displays", "Interactive plan comparisons", "In-store holographic demos", "Network coverage simulation"],
    benefits: ["Simplified product understanding", "Reduced support queries", "Higher plan upgrades", "Enhanced retail experience"],
  },
  "banking": {
    tagline: "Transform waiting into interaction",
    description: "Branch engagement systems that turn idle wait times into interactive brand experiences, educating customers on services and driving cross-sell opportunities.",
    services: ["Branch engagement displays", "Interactive service explorers", "Queue management integration", "Financial product visualization"],
    benefits: ["Increased product awareness", "Reduced perceived wait time", "Cross-sell opportunities", "Branch modernization"],
  },
  "airports-malls": {
    tagline: "Monetize attention in high-footfall spaces",
    description: "DOOH holographic networks that capture attention in the busiest physical environments, delivering premium advertising experiences for brands.",
    services: ["DOOH holographic networks", "Wayfinding installations", "Brand campaign activations", "Footfall monetization analytics"],
    benefits: ["Premium CPM rates", "Higher engagement than traditional DOOH", "Real-time campaign optimization", "Scalable network revenue"],
  },
  "healthcare": {
    tagline: "Precision training through simulation",
    description: "Medical simulations and holographic anatomy displays that improve training precision and patient education through interactive 3D experiences.",
    services: ["Anatomy simulation displays", "Surgical training holograms", "Patient education systems", "Medical device visualization"],
    benefits: ["Enhanced training outcomes", "Better patient understanding", "Reduced training costs", "Interactive learning experiences"],
  },
  "events-exhibitions": {
    tagline: "Create experiences they'll never forget",
    description: "Immersive exhibition booths and event activations that generate qualified leads, stop traffic, and create unforgettable brand moments.",
    services: ["Immersive booth design", "Holographic stage displays", "Interactive product launches", "Event analytics & lead capture"],
    benefits: ["Higher booth traffic", "Qualified lead generation", "Social media amplification", "Measurable event ROI"],
  },
  "industrial": {
    tagline: "Simplify complex systems visually",
    description: "Industrial simulations and holographic machine visualizations that simplify training, maintenance procedures, and complex system understanding.",
    services: ["Machine simulation displays", "Maintenance training holograms", "Process visualization", "Safety training simulations"],
    benefits: ["Reduced training time", "Fewer operational errors", "Visual maintenance guides", "Scalable training deployment"],
  },
  "airlines": {
    tagline: "Elevate every passenger touchpoint",
    description: "From lounge experiences to gate displays, holographic systems that inform, entertain, and engage passengers throughout their journey.",
    services: ["Lounge holographic displays", "Gate information systems", "In-terminal brand activations", "Passenger flow analytics"],
    benefits: ["Enhanced passenger experience", "Ancillary revenue opportunities", "Premium lounge differentiation", "Real-time engagement data"],
  },
  "hospitality": {
    tagline: "Redefine the guest experience",
    description: "Interactive lobby installations and concierge displays that welcome guests with immersive brand experiences and intelligent service interactions.",
    services: ["Lobby holographic displays", "Interactive concierge systems", "Event space installations", "Guest engagement analytics"],
    benefits: ["Memorable first impressions", "Reduced staffing pressure", "Upsell opportunities", "Guest satisfaction data"],
  },
};

const IndustryPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const industry = industries.find((i) => i.slug === slug);
  const content = slug ? industryContent[slug] : null;

  if (!industry || !content) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Industry not found.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <CursorLight />
      <Header />

      {/* Hero with video */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        <LazyVideo src={industry.video} className="h-full w-full object-cover" style={{ filter: "brightness(0.5) saturate(1.2)" }} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/#industries" className="font-display text-[10px] tracking-[0.3em] text-glow-primary hover:text-foreground transition-colors">
              ← INDUSTRIES
            </Link>
            <div className="mt-4 flex items-center gap-4">
              <span className="text-4xl">{industry.icon}</span>
              <h1 className="font-display text-4xl font-light tracking-tight text-foreground md:text-6xl">
                {industry.name}
              </h1>
            </div>
            <p className="mt-3 font-display text-lg text-glow-primary">{content.tagline}</p>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-5xl">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl font-body text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {content.description}
          </motion.p>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
            <GlassPanel delay={0.1} hover={false} className="p-8">
              <p className="font-display text-[10px] tracking-[0.3em] text-glow-primary mb-6">OUR SERVICES</p>
              <ul className="space-y-4">
                {content.services.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-glow-primary/60" />
                    <span className="font-body text-sm text-foreground">{s}</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>

            <GlassPanel delay={0.2} hover={false} className="p-8">
              <p className="font-display text-[10px] tracking-[0.3em] text-glow-accent mb-6">KEY BENEFITS</p>
              <ul className="space-y-4">
                {content.benefits.map((b) => (
                  <li key={b} className="flex items-start gap-3">
                    <span className="mt-1.5 block h-1.5 w-1.5 rounded-full bg-glow-accent/60" />
                    <span className="font-body text-sm text-foreground">{b}</span>
                  </li>
                ))}
              </ul>
            </GlassPanel>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/get-started"
              className="glass-panel edge-glow inline-block rounded-full px-10 py-4 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary"
            >
              GET STARTED WITH {industry.name.toUpperCase()}
            </Link>
          </motion.div>
        </div>
      </section>

      <FooterSystem />
    </div>
  );
};

export default IndustryPage;
