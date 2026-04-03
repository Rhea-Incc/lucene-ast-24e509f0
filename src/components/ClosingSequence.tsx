import { motion } from "framer-motion";

const ClosingSequence = () => {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center px-6 py-32 overflow-hidden">
      {/* Light convergence */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 2 }}
      >
        <motion.div
          className="h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(185 100% 45% / 0.1) 0%, hsl(260 80% 65% / 0.05) 40%, transparent 70%)",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      <div className="relative z-10 flex flex-col items-center gap-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl md:text-6xl"
        >
          Lucen is the infrastructure for{" "}
          <span className="bg-gradient-to-r from-glow-primary via-glow-accent to-glow-warm bg-clip-text text-transparent">
            phygital attention
          </span>
        </motion.h2>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="silk-ribbon h-px w-48 origin-center"
        />

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex gap-4"
        >
          <button className="glass-panel edge-glow rounded-full px-10 py-4 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary">
            GET IN TOUCH
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ClosingSequence;
