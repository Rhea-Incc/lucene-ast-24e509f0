import { motion } from "framer-motion";
import GlassPanel from "./GlassPanel";
import LazyVideo from "./LazyVideo";
import shoeImg from "@/assets/showcase-shoe.jpg";
import autoImg from "@/assets/showcase-automotive.jpg";
import monumentImg from "@/assets/showcase-monument.png";

const MediaShowcase = () => {
  return (
    <section className="relative px-6 py-32">
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-right"
        >
          <p className="font-display text-xs tracking-[0.4em] text-glow-accent">MEDIA ENGINE</p>
          <h2 className="mt-3 font-display text-3xl font-light tracking-tight text-foreground sm:text-5xl">
            Media is
            <span className="ml-2 bg-gradient-to-r from-glow-accent to-glow-warm bg-clip-text text-transparent">
              primary
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <GlassPanel delay={0.1} className="relative h-80 overflow-hidden md:h-96 !p-0">
              <LazyVideo
                src="/videos/captivate-passersby.mp4"
                poster={shoeImg}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute left-6 bottom-5 z-10">
                <p className="font-display text-[10px] tracking-[0.3em] text-glow-primary">HOLOGRAPHIC VIEWPORT</p>
                <p className="mt-1 font-display text-lg text-foreground">Captivate passersby</p>
              </div>
            </GlassPanel>
          </div>

          <div className="flex flex-col gap-6 md:col-span-5">
            <GlassPanel delay={0.2} className="relative h-44 overflow-hidden !p-0 md:h-[11.5rem]">
              <LazyVideo
                src="/videos/scale-your-message.mp4"
                poster={autoImg}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute left-5 bottom-4 z-10">
                <p className="font-display text-[10px] tracking-[0.3em] text-glow-accent">SCALE</p>
                <p className="mt-1 font-display text-sm text-foreground">Scale your message</p>
              </div>
            </GlassPanel>

            <GlassPanel delay={0.3} className="relative h-44 overflow-hidden !p-0 md:h-[11.5rem]">
              <LazyVideo
                src="/videos/outdoor-advertising.mp4"
                poster={monumentImg}
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
              <div className="absolute left-5 bottom-4 z-10">
                <p className="font-display text-[10px] tracking-[0.3em] text-glow-warm">OUTDOOR</p>
                <p className="mt-1 font-display text-sm text-foreground">Beyond the billboard</p>
              </div>
            </GlassPanel>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MediaShowcase;
