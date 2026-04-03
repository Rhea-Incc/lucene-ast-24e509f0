import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const industries = [
  { name: "Retail & Luxury", value: "Drives in-store engagement and sales", icon: "◈" },
  { name: "Real Estate", value: "Accelerates property sales", icon: "▣" },
  { name: "Automotive", value: "Enhances product discovery", icon: "◎" },
  { name: "Universities", value: "Boosts student acquisition", icon: "◉" },
  { name: "Telecom", value: "Simplifies complex offerings", icon: "◇" },
  { name: "Banking", value: "Turns waiting into interaction", icon: "◆" },
  { name: "Airports & Malls", value: "Monetizes high footfall", icon: "⊞" },
  { name: "Healthcare", value: "Improves training precision", icon: "⊕" },
  { name: "Events & Exhibitions", value: "Creates unforgettable experiences", icon: "✦" },
  { name: "Industrial", value: "Simplifies complex systems", icon: "⊙" },
];

const IndustriesField = () => {
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

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {industries.map((ind, i) => (
            <GlassPanel key={ind.name} delay={i * 0.06} className="group text-center p-5">
              <span className="block font-display text-2xl text-glow-primary transition-transform duration-300 group-hover:scale-125">
                {ind.icon}
              </span>
              <p className="mt-3 font-display text-xs tracking-wide text-foreground">
                {ind.name}
              </p>
              <p className="mt-1 font-body text-[10px] leading-relaxed text-muted-foreground">
                {ind.value}
              </p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesField;
