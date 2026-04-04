import { motion } from "framer-motion";

const locations = [
  { x: 12, y: 25, label: "Shopping Mall", type: "mall" },
  { x: 28, y: 60, label: "Airport Terminal", type: "airport" },
  { x: 45, y: 20, label: "Convention Center", type: "event" },
  { x: 62, y: 50, label: "Bank HQ", type: "bank" },
  { x: 78, y: 30, label: "Luxury Mall", type: "mall" },
  { x: 20, y: 80, label: "Stadium", type: "event" },
  { x: 50, y: 70, label: "Train Station", type: "transit" },
  { x: 85, y: 65, label: "University Campus", type: "education" },
  { x: 35, y: 40, label: "Auto Dealership", type: "automotive" },
  { x: 70, y: 80, label: "Hotel Resort", type: "hospitality" },
  { x: 55, y: 35, label: "Metro Hub", type: "transit" },
  { x: 15, y: 45, label: "Hospital", type: "healthcare" },
  { x: 90, y: 20, label: "Airline Lounge", type: "airport" },
  { x: 40, y: 85, label: "Exhibition Hall", type: "event" },
  { x: 75, y: 45, label: "Cinema Complex", type: "mall" },
  { x: 8, y: 70, label: "Ferry Terminal", type: "transit" },
];

const connections = [
  [0, 1], [0, 4], [1, 6], [2, 3], [2, 10], [3, 7],
  [4, 12], [5, 6], [6, 9], [7, 14], [8, 10], [9, 14],
  [10, 11], [11, 15], [12, 14], [13, 5], [1, 13],
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
            Lucen builds and monetizes physical media networks in high-footfall environments across cities worldwide.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="glass-panel relative mx-auto h-96 max-w-5xl overflow-hidden rounded-2xl p-6 sm:h-[500px]"
        >
          {/* Grid lines */}
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            {[20, 40, 60, 80].map((v) => (
              <g key={v}>
                <line x1={`${v}%`} y1="0%" x2={`${v}%`} y2="100%" stroke="hsl(185 100% 45% / 0.04)" strokeWidth="1" />
                <line x1="0%" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="hsl(185 100% 45% / 0.04)" strokeWidth="1" />
              </g>
            ))}

            {/* Connections with animated pulse */}
            {connections.map(([a, b], i) => (
              <g key={`c-${i}`}>
                <motion.line
                  x1={`${locations[a].x}%`} y1={`${locations[a].y}%`}
                  x2={`${locations[b].x}%`} y2={`${locations[b].y}%`}
                  stroke="hsl(185 100% 45% / 0.12)"
                  strokeWidth="1"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1.2, delay: i * 0.08 }}
                />
                {/* Traveling light pulse */}
                <motion.circle
                  r="2"
                  fill="hsl(185 100% 45% / 0.6)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.5 + i * 0.15, repeat: Infinity, repeatDelay: 3 + i * 0.5 }}
                >
                  <animateMotion
                    dur={`${2 + i * 0.3}s`}
                    repeatCount="indefinite"
                    begin={`${1.5 + i * 0.15}s`}
                    path={`M${locations[a].x * 8},${locations[a].y * 5} L${locations[b].x * 8},${locations[b].y * 5}`}
                  />
                </motion.circle>
              </g>
            ))}
          </svg>

          {/* Location nodes */}
          {locations.map((loc, i) => (
            <motion.div
              key={i}
              className="absolute group"
              style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 + i * 0.06 }}
            >
              <motion.div
                className="relative flex h-3 w-3 items-center justify-center cursor-pointer"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
                whileHover={{ scale: 1.8 }}
              >
                <div className="h-3 w-3 rounded-full bg-glow-primary/70" />
                <motion.div
                  className="absolute h-8 w-8 rounded-full bg-glow-primary/10"
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.1, 0.3] }}
                  transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                />
              </motion.div>
              <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none">
                <div className="glass-panel whitespace-nowrap rounded-lg px-2 py-1">
                  <p className="font-display text-[8px] tracking-[0.15em] text-foreground">{loc.label}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkMap;
