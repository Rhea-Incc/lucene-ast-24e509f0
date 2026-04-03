import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const groups = [
  {
    title: "Technology Partners",
    description: "Hardware, software, and integration allies",
    accent: "glow-primary",
  },
  {
    title: "Space Partners",
    description: "Malls, airports, banks, and public venues",
    accent: "glow-accent",
  },
  {
    title: "Brand Partners",
    description: "Agencies, brands, and campaign collaborators",
    accent: "glow-warm",
  },
];

const PartnershipsNode = () => {
  return (
    <section className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-warm">ECOSYSTEM</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Partnership
            <span className="ml-2 bg-gradient-to-r from-glow-warm to-glow-accent bg-clip-text text-transparent">
              triad
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {groups.map((g, i) => (
            <GlassPanel key={g.title} delay={i * 0.15} className="text-center p-6">
              <motion.div
                className="mx-auto mb-4 h-16 w-16 rounded-full"
                style={{
                  background: `radial-gradient(circle, hsl(var(--${g.accent}) / 0.3) 0%, transparent 70%)`,
                }}
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
              />
              <p className="font-display text-sm tracking-wide text-foreground">{g.title}</p>
              <p className="mt-2 font-body text-xs text-muted-foreground">{g.description}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnershipsNode;
