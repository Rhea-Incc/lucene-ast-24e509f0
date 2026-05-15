import { motion, useScroll, useTransform } from "framer-motion";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import lucenLogo from "@/assets/lucen-logo.png";

const navItems = [
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Contact", href: "/contact" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0.4, 0.85]);
  const location = useLocation();

  return (
    <motion.header
      className="fixed top-0 left-0 right-0 z-50"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        className="border-b border-border/20 backdrop-blur-xl"
        style={{
          backgroundColor: `hsl(230 40% 3% / var(--header-bg))`,
        }}
      >
        <motion.div
          style={{ "--header-bg": bgOpacity } as React.CSSProperties}
          className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6"
        >
          <Link to="/" className="flex items-center gap-3 group">
            <motion.img
              src={lucenLogo}
              alt="Lucen"
              className="h-9 w-auto"
              style={{ filter: "invert(1) hue-rotate(180deg) brightness(1.1) contrast(1.1)", mixBlendMode: "screen" }}
              whileHover={{ scale: 1.05 }}
            />
            <span className="font-display text-lg font-light tracking-[0.15em] text-foreground group-hover:text-glow transition-all duration-300">
              LUCEN
            </span>
          </Link>

          <nav className="hidden items-center gap-8 md:flex">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`font-display text-[11px] tracking-[0.25em] transition-colors duration-300 hover:text-glow-primary ${
                  location.pathname.startsWith(item.href)
                    ? "text-glow-primary"
                    : "text-muted-foreground"
                }`}
              >
                {item.label.toUpperCase()}
              </Link>
            ))}
            <Link
              to="/get-started"
              className="glass-panel edge-glow rounded-full px-6 py-2 font-display text-[10px] tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary"
            >
              GET STARTED
            </Link>
          </nav>

          <button
            className="flex flex-col gap-1.5 md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <motion.span animate={mobileOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-foreground" />
            <motion.span animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }} className="block h-px w-6 bg-foreground" />
            <motion.span animate={mobileOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }} className="block h-px w-6 bg-foreground" />
          </button>
        </motion.div>
      </motion.div>

      <motion.div
        initial={false}
        animate={mobileOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="overflow-hidden border-b border-border/10 backdrop-blur-xl md:hidden"
        style={{ backgroundColor: "hsl(230 40% 3% / 0.95)" }}
      >
        <nav className="flex flex-col gap-4 p-6">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className="font-display text-xs tracking-[0.25em] text-muted-foreground transition-colors hover:text-glow-primary"
            >
              {item.label.toUpperCase()}
            </Link>
          ))}
          <Link
            to="/get-started"
            onClick={() => setMobileOpen(false)}
            className="glass-panel edge-glow mt-2 rounded-full px-6 py-3 text-center font-display text-[10px] tracking-[0.2em] text-foreground"
          >
            GET STARTED
          </Link>
        </nav>
      </motion.div>
    </motion.header>
  );
};

export default Header;
