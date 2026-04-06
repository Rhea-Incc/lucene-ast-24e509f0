import { motion } from "framer-motion";
import { ShoppingBag, Plane, Building2, Landmark, GraduationCap, Hotel, Train, Heart, Clapperboard, Car, Ship, Wifi } from "lucide-react";

const locations = [
  { x: 12, y: 25, label: "Shopping Mall", type: "mall", icon: ShoppingBag },
  { x: 28, y: 60, label: "Airport Terminal", type: "airport", icon: Plane },
  { x: 45, y: 20, label: "Convention Center", type: "event", icon: Building2 },
  { x: 62, y: 50, label: "Bank HQ", type: "bank", icon: Landmark },
  { x: 78, y: 30, label: "Luxury Mall", type: "mall", icon: ShoppingBag },
  { x: 20, y: 80, label: "Stadium", type: "event", icon: Clapperboard },
  { x: 50, y: 70, label: "Train Station", type: "transit", icon: Train },
  { x: 85, y: 65, label: "University Campus", type: "education", icon: GraduationCap },
  { x: 35, y: 40, label: "Auto Dealership", type: "automotive", icon: Car },
  { x: 70, y: 80, label: "Hotel Resort", type: "hospitality", icon: Hotel },
  { x: 55, y: 35, label: "Metro Hub", type: "transit", icon: Train },
  { x: 15, y: 45, label: "Hospital", type: "healthcare", icon: Heart },
  { x: 90, y: 20, label: "Airline Lounge", type: "airport", icon: Plane },
  { x: 40, y: 85, label: "Exhibition Hall", type: "event", icon: Building2 },
  { x: 75, y: 45, label: "Cinema Complex", type: "mall", icon: Clapperboard },
  { x: 8, y: 70, label: "Ferry Terminal", type: "transit", icon: Ship },
  { x: 60, y: 12, label: "Corporate Office", type: "corporate", icon: Building2 },
  { x: 30, y: 15, label: "Telecom Store", type: "telecom", icon: Wifi },
  { x: 95, y: 50, label: "Sports Arena", type: "event", icon: Clapperboard },
  { x: 48, y: 92, label: "Music Festival", type: "event", icon: Clapperboard },
];

const connections = [
  [0, 1], [0, 4], [1, 6], [2, 3], [2, 10], [3, 7],
  [4, 12], [5, 6], [6, 9], [7, 14], [8, 10], [9, 14],
  [10, 11], [11, 15], [12, 14], [13, 5], [1, 13],
  [16, 2], [17, 0], [18, 12], [19, 5], [16, 3], [17, 8],
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
          <p className="font-display text-sm tracking-[0.4em] text-glow-primary">NETWORK</p>
          <h2 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
            Physical
            <span className="ml-2 bg-gradient-to-r from-glow-primary to-glow-accent bg-clip-text text-transparent">
              media network
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-base text-muted-foreground">
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
          <svg className="absolute inset-0 h-full w-full" xmlns="http://www.w3.org/2000/svg">
            {[20, 40, 60, 80].map((v) => (
              <g key={v}>
                <line x1={`${v}%`} y1="0%" x2={`${v}%`} y2="100%" stroke="hsl(185 100% 45% / 0.04)" strokeWidth="1" />
                <line x1="0%" y1={`${v}%`} x2="100%" y2={`${v}%`} stroke="hsl(185 100% 45% / 0.04)" strokeWidth="1" />
              </g>
            ))}

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
                  transition={{ duration: 1.2, delay: i * 0.06 }}
                />
                <motion.circle
                  r="2"
                  fill="hsl(185 100% 45% / 0.6)"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: [0, 1, 0] }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 1.5 + i * 0.12, repeat: Infinity, repeatDelay: 3 + i * 0.4 }}
                >
                  <animateMotion
                    dur={`${2 + i * 0.2}s`}
                    repeatCount="indefinite"
                    begin={`${1.5 + i * 0.12}s`}
                    path={`M${locations[a].x * 8},${locations[a].y * 5} L${locations[b].x * 8},${locations[b].y * 5}`}
                  />
                </motion.circle>
              </g>
            ))}
          </svg>

          {/* Location nodes with icons + labels */}
          {locations.map((loc, i) => {
            const Icon = loc.icon;
            return (
              <motion.div
                key={i}
                className="absolute group"
                style={{ left: `${loc.x}%`, top: `${loc.y}%`, transform: "translate(-50%, -50%)" }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.05 }}
              >
                <motion.div
                  className="relative flex h-8 w-8 items-center justify-center cursor-pointer rounded-full glass-panel border border-[hsl(var(--glow-primary)/0.2)]"
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 3 + (i % 4), repeat: Infinity, ease: "easeInOut" }}
                  whileHover={{ scale: 1.5 }}
                >
                  <Icon className="h-3.5 w-3.5 text-[hsl(var(--glow-primary))]" />
                  <motion.div
                    className="absolute h-12 w-12 rounded-full bg-[hsl(var(--glow-primary)/0.08)]"
                    animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0.05, 0.3] }}
                    transition={{ duration: 2 + i * 0.3, repeat: Infinity }}
                  />
                </motion.div>
                {/* Label — visible on hover */}
                <div className="absolute left-1/2 top-full mt-1 -translate-x-1/2 opacity-0 transition-opacity group-hover:opacity-100 pointer-events-none z-20">
                  <div className="glass-panel whitespace-nowrap rounded-lg px-2.5 py-1.5 border border-[hsl(var(--glow-primary)/0.15)]">
                    <p className="font-display text-[9px] tracking-[0.15em] text-foreground">{loc.label}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default NetworkMap;
