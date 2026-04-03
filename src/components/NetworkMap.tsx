import { motion } from "framer-motion";

const locations = [
  { x: 20, y: 30, label: "Mall" },
  { x: 45, y: 55, label: "Airport" },
  { x: 70, y: 25, label: "Bank" },
  { x: 30, y: 70, label: "Mall" },
  { x: 80, y: 60, label: "Airport" },
  { x: 55, y: 40, label: "Bank" },
  { x: 15, y: 50, label: "Mall" },
  { x: 65, y: 75, label: "Airport" },
];

const NetworkMap = () => {
  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-primary">NETWORK</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Physical
            <span className="ml-2 bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">
              media network
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-sm text-muted-foreground">
            Lucen builds and monetizes physical media networks in high-footfall environments.
          </p>
        </motion.div>

        {/* Abstract city grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="glass-panel relative mx-auto h-80 max-w-4xl overflow-hidden rounded-2xl p-6 sm:h-96"
        >
          {/* Grid lines */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            {/* Horizontal lines */}
            {[25, 50, 75].map((y) => (
              <line key={`h-${y}`} x1="0%" y1={`${y}%`} x2="100%" y2={`${y}%`} stroke="hsl(185 100% 45% / 0.06)" strokeWidth="1" />
            ))}
            {/* Vertical lines */}
            {[25, 50, 75].map((x) => (
              <line key={`v-${x}`} x1={`${x}%`} y1="0%" x2={`${x}%`} y2="100%" stroke="hsl(185 100% 45% / 0.06)" strokeWidth="1" />
            ))}
            {/* Connection lines */}
            {locations.slice(0, -1).map((loc, i) => (
              <motion.line
                key={`c-${i}`}
                x1={`${loc.x}%`}
                y1={`${loc.y}%`}
                x2={`${locations[i + 1].x}%`}
                y2={`${locations[i + 1].y}%`}
                stroke="hsl(185 100% 45% / 0.15)"
                strokeWidth="1"
                initial={{ pathLength: 0 }}
                whileInView={{ pathLength: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.15 }}
              />
            ))}
          </svg>

          {/* Location nodes */}
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
            >
              <motion.div
                className="relative flex h-3 w-3 items-center justify-center"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <div className="h-3 w-3 rounded-full bg-glow-primary/60" />
                <div className="absolute h-6 w-6 rounded-full bg-glow-primary/10" />
              </motion.div>
              <p className="mt-1 font-display text-[8px] tracking-[0.2em] text-muted-foreground whitespace-nowrap">
                {loc.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkMap;
