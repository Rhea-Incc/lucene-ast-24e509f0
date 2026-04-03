import { motion } from "framer-motion";

const FooterSystem = () => {
  return (
    <footer className="relative px-6 py-24">
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="silk-ribbon mb-16 h-px w-full origin-left"
        />

        <div className="flex flex-col items-center gap-6">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl"
          >
            <span className="text-glow">LUCEN</span>
          </motion.p>
          <p className="font-body text-xs tracking-[0.3em] text-muted-foreground">
            THIS IS NOT A WEBSITE — IT IS A SYSTEM
          </p>
          <div className="mt-8 flex gap-8">
            {["SYSTEM", "ENGINE", "PROTOCOL", "ARCHIVE"].map((item) => (
              <a
                key={item}
                href="#"
                className="font-display text-[10px] tracking-[0.3em] text-muted-foreground transition-colors duration-300 hover:text-glow-primary"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSystem;
