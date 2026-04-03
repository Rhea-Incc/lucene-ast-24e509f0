import { motion } from "framer-motion";

const HeroEnvironment = () => {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Ambient light orbs */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full animate-pulse-glow"
          style={{
            background: "radial-gradient(circle, hsl(185 100% 45% / 0.12) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(260 80% 65% / 0.1) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(35 100% 60% / 0.06) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0" />

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(20px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col items-center"
        >
          <h1 className="font-display text-6xl font-light tracking-tight text-glow sm:text-8xl md:text-9xl">
            <span className="bg-gradient-to-r from-foreground via-glow-primary to-foreground bg-clip-text text-transparent">
              LUCEN
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md text-center font-body text-sm tracking-[0.3em] text-muted-foreground"
        >
          REAL-TIME LIGHT SIMULATION INTERFACE
        </motion.p>

        {/* Silk ribbon divider */}
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="silk-ribbon h-px w-64 origin-center"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="mt-4 flex gap-4"
        >
          <button className="glass-panel edge-glow rounded-full px-8 py-3 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary">
            ENTER SYSTEM
          </button>
          <button className="rounded-full border border-border/30 px-8 py-3 font-display text-xs tracking-[0.2em] text-muted-foreground transition-all duration-300 hover:border-glow-primary/30 hover:text-foreground">
            OBSERVE
          </button>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: "linear-gradient(to top, hsl(230 40% 3%) 0%, transparent 100%)",
        }}
      />
    </section>
  );
};

export default HeroEnvironment;
