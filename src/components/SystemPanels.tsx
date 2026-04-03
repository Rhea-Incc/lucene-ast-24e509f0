import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const panels = [
  {
    title: "SPATIAL RENDERING",
    metric: "60",
    unit: "FPS",
    description: "Real-time volumetric light field engine with adaptive quality scaling",
    accent: "glow-primary",
  },
  {
    title: "GLASS SYSTEM",
    metric: "28",
    unit: "BLUR",
    description: "Dynamic refraction materials with cursor-reactive edge illumination",
    accent: "glow-accent",
  },
  {
    title: "KINESIS ENGINE",
    metric: "<16",
    unit: "MS",
    description: "Sub-frame interaction response with magnetic field cursor physics",
    accent: "glow-primary",
  },
  {
    title: "MOTION CORE",
    metric: "∞",
    unit: "FLOW",
    description: "Continuous materialization system — nothing appears, everything emerges",
    accent: "glow-accent",
  },
];

const SystemPanels = () => {
  return (
    <section className="relative px-6 py-32">
      {/* Section ambient */}
      <motion.div
        className="absolute left-0 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
        style={{
          background: "radial-gradient(circle, hsl(185 100% 45% / 0.05) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-primary">SYSTEM ARCHITECTURE</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Every pixel is
            <span className="ml-2 bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">
              intentional
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {panels.map((panel, i) => (
            <GlassPanel key={panel.title} delay={i * 0.12} className="group relative overflow-hidden">
              {/* Hover glow backdrop */}
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${
                    panel.accent === "glow-primary"
                      ? "hsl(185 100% 45% / 0.15)"
                      : "hsl(260 80% 65% / 0.15)"
                  } 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                  {panel.title}
                </p>
                <div className="mt-4 flex items-baseline gap-2">
                  <span className={`font-display text-5xl font-light ${
                    panel.accent === "glow-primary" ? "text-glow-primary" : "text-glow-accent"
                  }`}>
                    {panel.metric}
                  </span>
                  <span className="font-display text-xs tracking-[0.2em] text-muted-foreground">
                    {panel.unit}
                  </span>
                </div>
                <p className="mt-4 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
                  {panel.description}
                </p>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemPanels;
