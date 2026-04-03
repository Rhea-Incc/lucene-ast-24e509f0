import { motion } from "framer-motion";
import { useState } from "react";

const nodes = [
  {
    label: "Attention",
    detail: "Holographic systems stop people instantly",
    icon: "◉",
  },
  {
    label: "Interaction",
    detail: "QR, NFC, gesture engagement",
    icon: "◎",
  },
  {
    label: "Capture",
    detail: "Cameras + sensors track behavior",
    icon: "⊙",
  },
  {
    label: "Analysis",
    detail: "Lucen Brain processes patterns",
    icon: "◈",
  },
  {
    label: "Retargeting",
    detail: "Users are re-engaged digitally",
    icon: "◇",
  },
  {
    label: "Conversion",
    detail: "Interaction becomes measurable revenue",
    icon: "◆",
  },
];

const PipelineSystem = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="relative px-6 py-32 overflow-hidden">
      {/* Ambient glow */}
      <motion.div
        className="absolute right-0 top-1/2 h-[600px] w-[600px] -translate-y-1/2 translate-x-1/2 rounded-full"
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
          className="mb-16 text-center"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-accent">PIPELINE</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            From attention to
            <span className="ml-2 bg-gradient-to-r from-glow-primary to-glow-warm bg-clip-text text-transparent">
              conversion
            </span>
          </h2>
        </motion.div>

        {/* Pipeline flow */}
        <div className="relative flex flex-col items-center gap-0 md:flex-row md:gap-0 md:justify-between">
          {/* Connecting line */}
          <div className="absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 md:block">
            <motion.div
              className="h-full w-full"
              style={{
                background: "linear-gradient(to right, hsl(185 100% 45% / 0.3), hsl(260 80% 65% / 0.3), hsl(35 100% 60% / 0.3))",
              }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            />
          </div>

          {nodes.map((node, i) => (
            <motion.div
              key={node.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="group relative z-10 flex flex-col items-center"
            >
              {/* Node */}
              <motion.div
                className="glass-panel relative flex h-16 w-16 items-center justify-center rounded-full border border-border/30 transition-all duration-500"
                whileHover={{ scale: 1.2 }}
                style={{
                  boxShadow: hoveredIndex === i
                    ? "0 0 30px -5px hsl(185 100% 45% / 0.4)"
                    : "none",
                }}
              >
                <span className="font-display text-lg text-glow-primary">{node.icon}</span>
              </motion.div>

              {/* Label */}
              <p className="mt-3 font-display text-[10px] tracking-[0.2em] text-foreground">
                {node.label.toUpperCase()}
              </p>

              {/* Expanded detail */}
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{
                  opacity: hoveredIndex === i ? 1 : 0,
                  height: hoveredIndex === i ? "auto" : 0,
                }}
                transition={{ duration: 0.3 }}
                className="mt-2 max-w-[140px] overflow-hidden text-center"
              >
                <p className="font-body text-xs leading-relaxed text-muted-foreground">
                  {node.detail}
                </p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PipelineSystem;
