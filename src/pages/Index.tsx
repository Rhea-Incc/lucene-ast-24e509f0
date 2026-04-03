import CursorLight from "@/components/CursorLight";
import HeroEnvironment from "@/components/HeroEnvironment";
import LucenDefinition from "@/components/LucenDefinition";
import OfferingsSystem from "@/components/OfferingsSystem";
import PipelineSystem from "@/components/PipelineSystem";
import IndustriesField from "@/components/IndustriesField";
import UseCasesStream from "@/components/UseCasesStream";
import BusinessModels from "@/components/BusinessModels";
import NetworkMap from "@/components/NetworkMap";
import LucenBrainDeep from "@/components/LucenBrainDeep";
import PartnershipsNode from "@/components/PartnershipsNode";
import ClosingSequence from "@/components/ClosingSequence";
import FooterSystem from "@/components/FooterSystem";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <CursorLight />
      <HeroEnvironment />
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
    </div>
  );
};

export default Index;
