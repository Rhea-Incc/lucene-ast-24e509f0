import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import GlassPanel from "./GlassPanel";

export const industries = [
  { name: "Retail & Luxury", slug: "retail-luxury", value: "Drives in-store engagement and sales", icon: "◈", video: "/videos/showreel.mp4" },
  { name: "Real Estate", slug: "real-estate", value: "Accelerates property sales", icon: "▣", video: "/videos/real-estate.mp4", image: true },
  { name: "Automotive", slug: "automotive", value: "Enhances product discovery", icon: "◎", video: "/videos/autoshowroom.mp4" },
  { name: "Universities", slug: "universities", value: "Boosts student acquisition", icon: "◉", video: "/videos/school-demos.mp4" },
  { name: "Telecom", slug: "telecom", value: "Simplifies complex offerings", icon: "◇", video: "/videos/demo.mp4" },
  { name: "Banking", slug: "banking", value: "Turns waiting into interaction", icon: "◆", video: "/videos/demo.mp4" },
  { name: "Airports & Malls", slug: "airports-malls", value: "Monetizes high footfall", icon: "⊞", video: "/videos/dooh.mp4" },
  { name: "Healthcare", slug: "healthcare", value: "Improves training precision", icon: "⊕", video: "/videos/simulation.mp4" },
  { name: "Events & Exhibitions", slug: "events-exhibitions", value: "Creates unforgettable experiences", icon: "✦", video: "/videos/exhibitions.mp4" },
  { name: "Industrial", slug: "industrial", value: "Simplifies complex systems", icon: "⊙", video: "/videos/simulation-1.mp4" },
  { name: "Airlines", slug: "airlines", value: "Elevates passenger experience", icon: "✈", video: "/videos/dooh.mp4" },
  { name: "Hospitality", slug: "hospitality", value: "Transforms guest engagement", icon: "◐", video: "/videos/hospitality.mp4" },
];

const IndustriesField = () => {
  const navigate = useNavigate();

  return (
    <section className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-primary">DOMAINS</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Industries we
            <span className="ml-2 bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">
              transform
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
          {industries.map((ind, i) => (
            <GlassPanel
              key={ind.name}
              delay={i * 0.05}
              className="group cursor-pointer text-center p-5"
            >
              <div onClick={() => navigate(`/industries/${ind.slug}`)}>
                <span className="block font-display text-2xl text-glow-primary transition-transform duration-300 group-hover:scale-125">
                  {ind.icon}
                </span>
                <p className="mt-3 font-display text-xs tracking-wide text-foreground">
                  {ind.name}
                </p>
                <p className="mt-1 font-body text-[10px] leading-relaxed text-muted-foreground">
                  {ind.value}
                </p>
                <span className="mt-3 inline-block font-display text-[9px] tracking-[0.2em] text-glow-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  EXPLORE →
                </span>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesField;
