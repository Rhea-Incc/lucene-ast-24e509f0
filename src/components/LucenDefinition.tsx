import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const LucenDefinition = () => {
  return (
    <section className="relative px-6 py-32">
      {/* Subtle holographic background loop */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "conic-gradient(from 0deg, hsl(185 100% 45% / 0.04), hsl(260 80% 65% / 0.06), hsl(35 100% 60% / 0.03), hsl(185 100% 45% / 0.04))",
          }}
          animate={{ rotate: [0, 360] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl">
        <GlassPanel delay={0.1} hover={false} className="p-8 md:p-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-display text-xs tracking-[0.4em] text-glow-primary mb-6">
              SYSTEM DEFINITION
            </p>
            <h2 className="font-display text-3xl font-light leading-tight tracking-tight text-foreground sm:text-5xl md:text-6xl">
              We Turn Physical Attention Into{" "}
              <span className="bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">
                Measurable Revenue
              </span>
            </h2>
            <p className="mt-6 max-w-2xl font-body text-base leading-relaxed text-muted-foreground sm:text-lg">
              Lucen builds intelligent environments where light captures attention, data maps behavior,
              and systems convert engagement into sales.
            </p>
          </motion.div>
        </GlassPanel>
      </div>
    </section>
  );
};

export default LucenDefinition;
