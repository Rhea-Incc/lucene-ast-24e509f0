import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import GlassPanel from "@/components/GlassPanel";
import SEO from "@/components/SEO";
import { industries } from "@/components/IndustriesField";

const Industries = () => {
  const navigate = useNavigate();

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SEO
        title="Industries — Where Lucen Transforms Physical Spaces"
        description="Lucen deploys holographic and intelligent environments across retail, transit, hospitality, education, stadiums, and more."
        path="/industries"
      />
      <CursorLight />
      <Header />

      <section className="relative pt-32 pb-16 px-6">
        <div className="mx-auto max-w-6xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <p className="font-display text-xs tracking-[0.4em] text-glow-primary">DOMAINS</p>
            <h1 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
              Industries we <span className="bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">transform</span>
            </h1>
          </motion.div>
        </div>
      </section>

      <section className="px-6 pb-32">
        <div className="mx-auto max-w-6xl grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {industries.map((ind, i) => (
            <GlassPanel key={ind.slug} delay={i * 0.05} className="group cursor-pointer text-center p-6">
              <div onClick={() => navigate(`/industries/${ind.slug}`)}>
                <span className="block font-display text-3xl text-glow-primary transition-transform duration-300 group-hover:scale-125">{ind.icon}</span>
                <p className="mt-4 font-display text-sm tracking-wide text-foreground">{ind.name}</p>
                <p className="mt-2 font-body text-xs leading-relaxed text-muted-foreground">{ind.value}</p>
                <span className="mt-3 inline-block font-display text-[9px] tracking-[0.2em] text-glow-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">EXPLORE →</span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </section>

      <FooterSystem />
    </div>
  );
};

export default Industries;
