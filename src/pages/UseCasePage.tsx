import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { cases } from "@/components/UseCasesStream";
import Header from "@/components/Header";
import CursorLight from "@/components/CursorLight";
import FooterSystem from "@/components/FooterSystem";
import LazyVideo from "@/components/LazyVideo";
import LazyImage from "@/components/LazyImage";
import GlassPanel from "@/components/GlassPanel";

const UseCasePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const useCase = cases.find((c) => c.slug === slug);

  if (!useCase) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Use case not found.</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <CursorLight />
      <Header />

      {/* Hero */}
      <section className="relative h-[70vh] w-full overflow-hidden">
        {useCase.video ? (
          <LazyVideo src={useCase.video} className="h-full w-full object-cover" style={{ filter: "brightness(0.5) saturate(1.2)" }} />
        ) : useCase.image ? (
          <LazyImage src={useCase.image} alt={useCase.label} className="h-full w-full object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-glow-primary/10 to-background" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 md:p-16">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <Link to="/#use-cases" className="font-display text-[10px] tracking-[0.3em] text-glow-primary hover:text-foreground transition-colors">
              ← USE CASES
            </Link>
            <h1 className="mt-4 font-display text-4xl font-light tracking-tight text-foreground md:text-6xl">
              {useCase.label}
            </h1>
          </motion.div>
        </div>
      </section>

      {/* Content */}
      <section className="px-6 py-24">
        <div className="mx-auto max-w-4xl">
          <GlassPanel delay={0.1} hover={false} className="p-8 md:p-12">
            <p className="font-body text-base leading-relaxed text-muted-foreground md:text-lg">
              {useCase.description}
            </p>
          </GlassPanel>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 text-center"
          >
            <Link
              to="/get-started"
              className="glass-panel edge-glow inline-block rounded-full px-10 py-4 font-display text-xs tracking-[0.2em] text-foreground transition-all duration-300 hover:glow-primary"
            >
              DISCUSS THIS USE CASE
            </Link>
          </motion.div>
        </div>
      </section>

      <FooterSystem />
    </div>
  );
};

export default UseCasePage;
