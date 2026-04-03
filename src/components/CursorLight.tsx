import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CursorLight = () => {
  const [pos, setPos] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, []);

  return (
    <motion.div
      className="pointer-events-none fixed z-50"
      animate={{ x: pos.x - 200, y: pos.y - 200 }}
      transition={{ type: "spring", damping: 25, stiffness: 200, mass: 0.5 }}
    >
      <div
        className="h-[400px] w-[400px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(185 100% 45% / 0.08) 0%, hsl(260 80% 65% / 0.03) 40%, transparent 70%)",
        }}
      />
    </motion.div>
  );
};

export default CursorLight;
