import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const metrics = [
  { label: "FOOTFALL", value: "12.4K", change: "+18%", trend: "up" },
  { label: "DWELL TIME", value: "47s", change: "+23%", trend: "up" },
  { label: "INTERACTIONS", value: "3.2K", change: "+31%", trend: "up" },
  { label: "CONVERSION", value: "8.7%", change: "+12%", trend: "up" },
];

const LucenBrainDeep = () => {
  return (
    <section className="relative px-6 py-32">
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(260 80% 65% / 0.05) 0%, transparent 60%)",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-accent">INTELLIGENCE</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Lucen
            <span className="ml-2 bg-gradient-to-r from-glow-accent to-glow-primary bg-clip-text text-transparent">
              Brain
            </span>
          </h2>
          <p className="mt-4 max-w-lg font-body text-sm text-muted-foreground">
            Every interaction becomes measurable, optimizable, and monetizable.
          </p>
        </motion.div>

        {/* Dashboard simulation */}
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {metrics.map((m, i) => (
            <GlassPanel key={m.label} delay={i * 0.1} className="text-center p-5">
              <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">{m.label}</p>
              <motion.p
                className="mt-3 font-display text-3xl font-light text-glow-primary"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              >
                {m.value}
              </motion.p>
              <p className="mt-1 font-body text-xs text-glow-primary/70">{m.change}</p>
            </GlassPanel>
          ))}
        </div>

        {/* Heatmap / funnel simulation */}
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2">
          <GlassPanel delay={0.3} className="h-48 relative overflow-hidden">
            <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">HEATMAP</p>
            <div className="absolute inset-0 mt-8 flex items-center justify-center">
              {[0.15, 0.25, 0.4, 0.6, 0.8].map((o, i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full"
                  style={{
                    width: `${(5 - i) * 40 + 20}px`,
                    height: `${(5 - i) * 40 + 20}px`,
                    background: `radial-gradient(circle, hsl(185 100% 45% / ${o}) 0%, transparent 70%)`,
                  }}
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </GlassPanel>

          <GlassPanel delay={0.4} className="h-48 relative overflow-hidden">
            <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">CONVERSION FUNNEL</p>
            <div className="mt-6 flex items-end justify-center gap-3 h-28">
              {[100, 72, 48, 31, 18].map((h, i) => (
                <motion.div
                  key={i}
                  className="w-10 rounded-t-md"
                  style={{
                    background: `linear-gradient(to top, hsl(185 100% 45% / ${0.3 + i * 0.1}), hsl(260 80% 65% / ${0.2 + i * 0.1}))`,
                  }}
                  initial={{ height: 0 }}
                  whileInView={{ height: `${h}%` }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.12 }}
                />
              ))}
            </div>
          </GlassPanel>
        </div>
      </div>
    </section>
  );
};

export default LucenBrainDeep;
