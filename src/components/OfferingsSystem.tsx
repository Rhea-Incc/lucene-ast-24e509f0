import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const offerings = [
  {
    title: "Holographic Systems",
    description: "Light-field displays that stop traffic and convert attention into interaction",
    video: "/videos/showreel.mp4",
    accent: "glow-primary" as const,
  },
  {
    title: "Simulation & 3D Environments",
    description: "Real-time spatial simulations for architecture, products, and immersive spaces",
    video: "/videos/comp-1.mp4",
    accent: "glow-accent" as const,
  },
  {
    title: "Lucen Brain",
    description: "AI-driven analytics that maps footfall, dwell time, and behavioral patterns into actionable data",
    video: "/videos/data-viz.mp4",
    accent: "glow-primary" as const,
  },
  {
    title: "Content & Experience Design",
    description: "3D modeling, animation, and interactive content crafted for holographic delivery",
    video: "/videos/track-overlay.mp4",
    accent: "glow-accent" as const,
  },
];

const OfferingsSystem = () => {
  return (
    <section className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-primary">CAPABILITIES</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            What we
            <span className="ml-2 bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">
              build
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {offerings.map((item, i) => (
            <GlassPanel key={item.title} delay={i * 0.12} className="group relative overflow-hidden">
              {/* Video background */}
              <div className="absolute inset-0 opacity-20 transition-opacity duration-700 group-hover:opacity-40">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="h-full w-full object-cover"
                >
                  <source src={item.video} type="video/mp4" />
                </video>
              </div>

              {/* Hover glow */}
              <div
                className="absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-0 transition-opacity duration-700 group-hover:opacity-100"
                style={{
                  background: `radial-gradient(circle, ${
                    item.accent === "glow-primary"
                      ? "hsl(185 100% 45% / 0.15)"
                      : "hsl(260 80% 65% / 0.15)"
                  } 0%, transparent 70%)`,
                }}
              />

              <div className="relative z-10">
                <p className="font-display text-[10px] tracking-[0.3em] text-muted-foreground">
                  {item.title.toUpperCase()}
                </p>
                <h3 className={`mt-4 font-display text-xl font-light ${
                  item.accent === "glow-primary" ? "text-glow-primary" : "text-glow-accent"
                }`}>
                  {item.title}
                </h3>
                <p className="mt-3 max-w-xs font-body text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OfferingsSystem;
