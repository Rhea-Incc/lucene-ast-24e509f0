import { motion } from "framer-motion";
import { ReactNode } from "react";

interface GlassPanelProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  hover?: boolean;
}

const GlassPanel = ({ children, className = "", delay = 0, hover = true }: GlassPanelProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, filter: "blur(12px)", y: 24, scale: 0.97 }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={hover ? { y: -6, scale: 1.01, transition: { duration: 0.3 } } : undefined}
      className={`glass-panel rounded-2xl p-6 transition-shadow duration-500 ${hover ? "hover:edge-glow" : ""} ${className}`}
    >
      {children}
    </motion.div>
  );
};

export default GlassPanel;
