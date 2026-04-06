import { motion } from "framer-motion";
import { useState } from "react";
import { Eye, Fingerprint, Camera, Brain, Target, TrendingUp, ArrowRight } from "lucide-react";

const nodes = [
  { label: "Attention", detail: "Holographic systems stop people instantly", icon: Eye },
  { label: "Interaction", detail: "QR, NFC, gesture engagement", icon: Fingerprint },
  { label: "Capture", detail: "Cameras + sensors track behavior", icon: Camera },
  { label: "Analysis", detail: "Lucen Brain processes patterns", icon: Brain },
  { label: "Retargeting", detail: "Users are re-engaged digitally", icon: Target },
  { label: "Conversion", detail: "Interaction becomes measurable revenue", icon: TrendingUp },
];

const PipelineSystem = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <motion.div
        className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full"
        style={{ background: "radial-gradient(circle, hsl(185 100% 45% / 0.05) 0%, transparent 60%)" }}
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <p className="font-display text-sm tracking-[0.4em] text-glow-accent">PIPELINE</p>
          <h2 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
            From attention to
            <span className="ml-3 bg-gradient-to-r from-glow-primary to-glow-warm bg-clip-text text-transparent">
              conversion
            </span>
          </h2>
          <p className="mx-auto mt-6 max-w-2xl font-body text-base text-muted-foreground leading-relaxed">
            Every touchpoint is measured. Every interaction is monetized. Our six-stage pipeline transforms physical attention into digital revenue.
          </p>
        </motion.div>

        {/* Pipeline flow — vertical on mobile, horizontal on desktop */}
        <div className="relative flex flex-col items-center gap-4 md:flex-row md:gap-0 md:justify-between">
          {/* Connecting line — desktop */}
          <div className="absolute left-[8%] right-[8%] top-1/2 hidden h-[2px] -translate-y-1/2 md:block">
            <motion.div
              className="h-full w-full rounded-full"
              style={{
                background: "linear-gradient(to right, hsl(185 100% 45% / 0.4), hsl(260 80% 65% / 0.4), hsl(35 100% 60% / 0.4))",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {nodes.map((node, i) => {
            const Icon = node.icon;
            return (
              <div key={node.label} className="flex items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: i * 0.12 }}
                  onMouseEnter={() => setHoveredIndex(i)}
                  onMouseLeave={() => setHoveredIndex(null)}
                  className="group relative z-10 flex flex-col items-center"
                >
                  {/* Node circle */}
                  <motion.div
                    className="glass-panel relative flex h-20 w-20 items-center justify-center rounded-full border border-border/30 transition-all duration-500 sm:h-24 sm:w-24"
                    whileHover={{ scale: 1.15 }}
                    animate={hoveredIndex === i ? { boxShadow: "0 0 40px -5px hsl(185 100% 45% / 0.5)" } : { boxShadow: "0 0 0px transparent" }}
                  >
                    <Icon className="h-7 w-7 text-[hsl(var(--glow-primary))] sm:h-8 sm:w-8" />
                    {/* Pulse ring */}
                    <motion.div
                      className="absolute inset-0 rounded-full border border-[hsl(var(--glow-primary)/0.2)]"
                      animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }}
                      transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                    />
                  </motion.div>

                  {/* Step number */}
                  <motion.p
                    className="mt-2 font-display text-[10px] tracking-[0.2em] text-glow-primary"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </motion.p>

                  {/* Label */}
                  <p className="mt-1 font-display text-sm tracking-[0.15em] text-foreground sm:text-base">
                    {node.label.toUpperCase()}
                  </p>

                  {/* Detail on hover */}
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{
                      opacity: hoveredIndex === i ? 1 : 0,
                      height: hoveredIndex === i ? "auto" : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 max-w-[160px] overflow-hidden text-center"
                  >
                    <p className="font-body text-sm leading-relaxed text-muted-foreground">{node.detail}</p>
                  </motion.div>
                </motion.div>

                {/* Arrow between nodes */}
                {i < nodes.length - 1 && (
                  <motion.div
                    className="hidden md:flex items-center mx-1"
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: 0.8 + i * 0.12 }}
                  >
                    <ArrowRight className="h-5 w-5 text-[hsl(var(--glow-primary)/0.5)]" />
                  </motion.div>
                )}

                {/* Vertical arrow on mobile */}
                {i < nodes.length - 1 && (
                  <motion.div
                    className="flex md:hidden items-center py-1"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                  >
                    <ArrowRight className="h-5 w-5 rotate-90 text-[hsl(var(--glow-primary)/0.4)]" />
                  </motion.div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PipelineSystem;
