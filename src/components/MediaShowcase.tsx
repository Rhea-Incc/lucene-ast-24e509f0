import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const MediaShowcase = () => {
  return (
    <section className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-right"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-accent">MEDIA ENGINE</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Media is
            <span className="ml-2 bg-gradient-to-r from-glow-accent to-glow-warm bg-clip-text text-transparent">
              primary
            </span>
          </h2>
        </motion.div>

        {/* Asymmetric layout */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Large panel */}
          <div className="md:col-span-7">
            <GlassPanel delay={0.1} className="relative h-80 overflow-hidden md:h-96">
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="h-32 w-32 rounded-full"
                  style={{
                    background: "radial-gradient(circle, hsl(185 100% 45% / 0.3) 0%, hsl(260 80% 65% / 0.1) 50%, transparent 70%)",
                  }}
                  animate={{
                    scale: [1, 1.5, 1],
                    rotate: [0, 180, 360],
                  }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <div className="relative z-10">
                <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                  HOLOGRAPHIC VIEWPORT
                </p>
                <p className="mt-2 font-display text-lg text-foreground">Full-Bleed Cinematic</p>
              </div>
            </GlassPanel>
          </div>

          {/* Stacked panels */}
          <div className="flex flex-col gap-6 md:col-span-5">
            <GlassPanel delay={0.2} className="flex-1">
              <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                DEPTH MASKING
              </p>
              <div className="mt-4 flex gap-2">
                {[0.2, 0.4, 0.6, 0.8, 1].map((opacity, i) => (
                  <motion.div
                    key={i}
                    className="h-12 w-12 rounded-lg border border-glow-primary/20"
                    style={{ opacity, background: `hsl(185 100% 45% / ${opacity * 0.15})` }}
                    animate={{ y: [0, -4 * (i + 1), 0] }}
                    transition={{ duration: 3 + i, repeat: Infinity, ease: "easeInOut" }}
                  />
                ))}
              </div>
            </GlassPanel>

            <GlassPanel delay={0.3} className="flex-1">
              <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                LIGHT WRAP
              </p>
              <p className="mt-3 font-body text-sm leading-relaxed text-muted-foreground">
                Dynamic color grading with real-time light integration and soft-edge compositing
              </p>
              <div className="silk-ribbon mt-4 h-1 w-full rounded-full" />
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaShowcase;
