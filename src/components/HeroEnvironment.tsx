import { motion } from "framer-motion";
import { lazy, Suspense } from "react";

const GlassParticles = lazy(() => import("./GlassParticles"));

const HeroEnvironment = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Video background */}
      <div className="absolute inset-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="h-full w-full object-cover"
          style={{ filter: "brightness(0.7) saturate(1.2)" }}
          preload="auto"
          src="/videos/desktop091224.mp4"
        />
        {/* Light overlay */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, hsl(230 40% 3% / 0.5) 70%, hsl(230 40% 3%) 100%)",
          }}
        />
      </div>

      {/* Ambient light orbs */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(185 100% 45% / 0.06) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.15, 1], x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full"
          style={{
            background: "radial-gradient(circle, hsl(260 80% 65% / 0.04) 0%, transparent 60%)",
          }}
          animate={{ scale: [1, 1.2, 1], x: [0, -25, 0], y: [0, 15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
      </div>

      {/* Noise overlay */}
      <div className="noise-overlay absolute inset-0" />

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
