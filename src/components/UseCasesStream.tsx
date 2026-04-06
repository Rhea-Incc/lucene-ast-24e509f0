import { motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import LazyImage from "./LazyImage";
import LazyVideo from "./LazyVideo";
import brandsImg from "@/assets/brands-events.webp";
import starbucksImg from "@/assets/starbucks.webp";
import lacosteImg from "@/assets/lacoste.webp";
import realEstateImg from "@/assets/real-estate-hologram.jpg";

export const cases = [
  { label: "Retail Product Launch Activation", slug: "retail-launch", image: brandsImg, description: "Holographic displays that captivate shoppers and drive product interaction at the point of purchase." },
  { label: "Real Estate Sales Center Visualization", slug: "real-estate-viz", image: realEstateImg, video: "/videos/real-estate.mp4", description: "3D building simulations that let buyers walk through properties before they're built." },
  { label: "Automotive Showroom Experience", slug: "automotive-showroom", image: lacosteImg, video: "/videos/autoshowroom.mp4", description: "Interactive vehicle configurators and holographic displays in dealer showrooms." },
  { label: "University Recruitment Installations", slug: "university-recruitment", video: "/videos/school-demos.mp4", description: "Immersive campus simulations that give prospective students a taste of university life." },
  { label: "Mall Advertising Network", slug: "mall-advertising", image: starbucksImg, video: "/videos/dooh-anamorphic.mp4", description: "High-impact digital out-of-home displays that monetize footfall in premium locations." },
  { label: "Airport Brand Campaigns", slug: "airport-campaigns", video: "/videos/dooh-anamorphic.mp4", description: "Captive-audience engagement through holographic displays in departure lounges and terminals." },
  { label: "Corporate Lobby Installations", slug: "corporate-lobby", video: "/videos/corporate-lobby.mp4", description: "Stunning welcome experiences that communicate brand identity through light and motion." },
  { label: "Trade Show Immersive Booths", slug: "trade-show-booths", image: lacosteImg, video: "/videos/exhibitions.mp4", description: "Exhibition stands that stop traffic and generate qualified leads through immersive experiences." },
  { label: "Airline In-Flight Experience", slug: "airline-experience", video: "/videos/simulation-2.mp4", description: "Elevating passenger journey with interactive holographic entertainment and information." },
  { label: "Hospitality Guest Engagement", slug: "hospitality-engagement", video: "/videos/hospitality.mp4", description: "Transforming hotel lobbies and concierge with intelligent interactive displays." },
  { label: "3D Simulation & Visualization", slug: "simulation-viz", video: "/videos/simulation-1-2.mp4", description: "Real-time spatial simulations for architecture, products, and immersive walkthroughs." },
  { label: "Institutional Demos & Presentations", slug: "institutional-demos", video: "/videos/institutional-demo.mp4", description: "High-impact institutional presentations with holographic 3D content delivery." },
];

const UseCasesStream = () => {
  const navigate = useNavigate();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const autoScrollTimer = useRef<ReturnType<typeof setInterval>>();

  const checkScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 10);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
  }, []);

  const scroll = useCallback((dir: number) => {
    scrollRef.current?.scrollBy({ left: dir * 340, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    if (!isMobile) return;
    autoScrollTimer.current = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - 10) {
        el.scrollTo({ left: 0, behavior: "smooth" });
      } else {
        el.scrollBy({ left: 340, behavior: "smooth" });
      }
    }, 4000);
    return () => clearInterval(autoScrollTimer.current);
  }, []);

  return (
    <section className="relative px-6 py-32 overflow-hidden">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-right"
        >
          <p className="font-display text-sm tracking-[0.4em] text-glow-accent">USE CASES</p>
          <h2 className="mt-3 font-display text-4xl font-light tracking-tight text-foreground sm:text-6xl">
            Deployed
            <span className="ml-2 bg-gradient-to-r from-glow-accent to-glow-warm bg-clip-text text-transparent">
              everywhere
            </span>
          </h2>
        </motion.div>

        {/* Mobile: horizontal scroll */}
        <div className="relative md:hidden">
          <div
            ref={scrollRef}
            onScroll={checkScroll}
            className="flex gap-5 overflow-x-auto pb-4"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            <style>{`div::-webkit-scrollbar { display: none; }`}</style>
            {cases.map((c, i) => (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.06 }}
                onClick={() => navigate(`/use-cases/${c.slug}`)}
                className="glass-panel group relative min-w-[280px] cursor-pointer overflow-hidden rounded-2xl"
              >
                <div className="relative h-[70vh] max-h-[400px] w-full overflow-hidden">
                  {c.video ? (
                    <LazyVideo src={c.video} className="h-full w-full object-cover" />
                  ) : c.image ? (
                    <LazyImage src={c.image} alt={c.label} className="h-full w-full object-cover" />
                  ) : (
                    <div className="h-full w-full bg-gradient-to-br from-glow-primary/10 to-glow-accent/5" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 to-transparent" />
                </div>
                <div className="relative z-10 p-5">
                  <p className="font-display text-sm tracking-wide text-foreground">{c.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 flex justify-center gap-4">
            <button onClick={() => scroll(-1)} disabled={!canScrollLeft} className="glass-panel flex h-10 w-10 items-center justify-center rounded-full transition-opacity disabled:opacity-20">
              <ChevronLeft className="h-4 w-4 text-foreground" />
            </button>
            <button onClick={() => scroll(1)} disabled={!canScrollRight} className="glass-panel flex h-10 w-10 items-center justify-center rounded-full transition-opacity disabled:opacity-20">
              <ChevronRight className="h-4 w-4 text-foreground" />
            </button>
          </div>
        </div>

        {/* Desktop: alternating layout */}
        <div className="hidden md:flex md:flex-col md:gap-24">
          {cases.map((c, i) => {
            const isLeft = i % 2 === 0;
            return (
              <motion.div
                key={c.slug}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-12 ${isLeft ? "" : "flex-row-reverse"}`}
              >
                <div
                  onClick={() => navigate(`/use-cases/${c.slug}`)}
                  className="glass-panel group relative w-1/2 cursor-pointer overflow-hidden rounded-2xl"
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden">
                    {c.video ? (
                      <LazyVideo src={c.video} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : c.image ? (
                      <LazyImage src={c.image} alt={c.label} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-glow-primary/10 to-glow-accent/5" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>
                </div>

                <div className={`w-1/2 ${isLeft ? "" : "text-right"}`}>
                  <p className="font-display text-xs tracking-[0.3em] text-glow-primary">
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground">
                    {c.label}
                  </h3>
                  <p className="mt-4 font-body text-base leading-relaxed text-muted-foreground">
                    {c.description}
                  </p>
                  <button
                    onClick={() => navigate(`/use-cases/${c.slug}`)}
                    className="mt-6 font-display text-xs tracking-[0.25em] text-glow-primary transition-colors hover:text-foreground"
                  >
                    EXPLORE CASE →
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default UseCasesStream;
