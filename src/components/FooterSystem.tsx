import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import lucenLogo from "@/assets/lucen-logo.webp";

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
          <img src={lucenLogo} alt="Lucen" className="h-12 w-auto opacity-60" />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl"
          >
            <span className="text-glow">LUCEN</span>
          </motion.p>
          <p className="font-body text-xs tracking-[0.3em] text-muted-foreground">
            THE INFRASTRUCTURE FOR PHYGITAL ATTENTION
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-8">
            {[
              { label: "SERVICES", to: "/services" },
              { label: "INDUSTRIES", to: "/industries" },
              { label: "CONTACT", to: "/contact" },
              { label: "GET STARTED", to: "/get-started" },
            ].map((item) => (
              <Link
                key={item.label}
                to={item.to}
                className="font-display text-[10px] tracking-[0.3em] text-muted-foreground transition-colors duration-300 hover:text-glow-primary"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSystem;
