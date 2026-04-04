import { motion } from "framer-motion";
import LazyImage from "./LazyImage";
import brandsImg from "@/assets/brands-events.webp";
import starbucksImg from "@/assets/starbucks.webp";
import lacosteImg from "@/assets/lacoste.webp";

const cases = [
  { label: "Retail Product Launch Activation", image: brandsImg },
  { label: "Real Estate Sales Center Visualization", image: null },
  { label: "Automotive Showroom Experience", image: lacosteImg },
  { label: "University Recruitment Installations", image: null },
  { label: "Mall Advertising Network", image: starbucksImg },
  { label: "Airport Brand Campaigns", image: null },
  { label: "Corporate Lobby Installations", image: brandsImg },
  { label: "Trade Show Immersive Booths", image: lacosteImg },
];

const UseCasesStream = () => {
  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-right"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-accent">USE CASES</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Deployed
            <span className="ml-2 bg-gradient-to-r from-glow-accent to-glow-warm bg-clip-text text-transparent">
              everywhere
            </span>
          </h2>
        </motion.div>

        {/* Horizontal scrolling strip */}
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide">
          {cases.map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              whileHover={{ y: -6, scale: 1.02 }}
              className="glass-panel group relative min-w-[280px] overflow-hidden rounded-2xl sm:min-w-[320px]"
            >
              {/* Image or gradient placeholder */}
              <div className="relative h-48 w-full overflow-hidden">
                {c.image ? (
                  <LazyImage
                    src={c.image}
                    alt={c.label}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className="h-full w-full"
                    style={{
                      background: `radial-gradient(circle at ${30 + i * 10}% ${40 + i * 5}%, hsl(185 100% 45% / 0.15) 0%, hsl(260 80% 65% / 0.08) 50%, hsl(230 30% 8%) 100%)`,
                    }}
                  />
                )}
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
              </div>

              <div className="relative z-10 p-5">
                <p className="font-display text-sm tracking-wide text-foreground">
                  {c.label}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCasesStream;
