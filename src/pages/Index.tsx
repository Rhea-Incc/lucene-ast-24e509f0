import { lazy, Suspense } from "react";
import CursorLight from "@/components/CursorLight";
import HeroEnvironment from "@/components/HeroEnvironment";
import Header from "@/components/Header";
import SEO from "@/components/SEO";

const LucenDefinition = lazy(() => import("@/components/LucenDefinition"));
const OfferingsSystem = lazy(() => import("@/components/OfferingsSystem"));
const PipelineSystem = lazy(() => import("@/components/PipelineSystem"));
const IndustriesField = lazy(() => import("@/components/IndustriesField"));
const UseCasesStream = lazy(() => import("@/components/UseCasesStream"));
const BusinessModels = lazy(() => import("@/components/BusinessModels"));
const NetworkMap = lazy(() => import("@/components/NetworkMap"));
const LucenBrainDeep = lazy(() => import("@/components/LucenBrainDeep"));
const PartnershipsNode = lazy(() => import("@/components/PartnershipsNode"));
const ClosingSequence = lazy(() => import("@/components/ClosingSequence"));
const FooterSystem = lazy(() => import("@/components/FooterSystem"));

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <SEO
        title="Lucen — Turn Physical Attention Into Measurable Revenue"
        description="Holographic systems, simulation, and Lucen Brain analytics — the infrastructure for phygital attention."
        path="/"
      />
      <CursorLight />
      <Header />
      <HeroEnvironment />
      <Suspense fallback={null}>
        <LucenDefinition />
        <OfferingsSystem />
        <PipelineSystem />
        <IndustriesField />
        <UseCasesStream />
        <BusinessModels />
        <NetworkMap />
        <LucenBrainDeep />
        <PartnershipsNode />
        <ClosingSequence />
        <FooterSystem />
      </Suspense>
    </div>
  );
};

export default Index;
