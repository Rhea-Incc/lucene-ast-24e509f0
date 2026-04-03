import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";

const models = [
  { name: "Hardware Sales", detail: "Full holographic system ownership" },
  { name: "Leasing", detail: "Long-term deployment agreements" },
  { name: "Short-Term Rentals", detail: "Event and campaign activations" },
  { name: "SaaS Analytics", detail: "Lucen Brain subscription platform" },
  { name: "DOOH Revenue Share", detail: "Monetize public space networks" },
  { name: "Campaign Deployments", detail: "End-to-end branded experiences" },
];

const BusinessModels = () => {
  return (
    <section className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-warm">REVENUE MODELS</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Multiple paths to
            <span className="ml-2 bg-gradient-to-r from-glow-warm to-glow-primary bg-clip-text text-transparent">
              value
            </span>
          </h2>
        </motion.div>

        <div className="flex flex-col gap-3">
          {models.map((model, i) => (
            <GlassPanel key={model.name} delay={i * 0.08} className="flex items-center justify-between p-5">
              <div className="flex items-center gap-4">
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-glow-primary/20 font-display text-xs text-glow-primary">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <p className="font-display text-sm tracking-wide text-foreground">{model.name}</p>
              </div>
              <p className="hidden font-body text-xs text-muted-foreground sm:block">{model.detail}</p>
            </GlassPanel>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BusinessModels;
