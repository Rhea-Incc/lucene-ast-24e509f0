import CursorLight from "@/components/CursorLight";
import HeroEnvironment from "@/components/HeroEnvironment";
import SystemPanels from "@/components/SystemPanels";
import MediaShowcase from "@/components/MediaShowcase";
import FooterSystem from "@/components/FooterSystem";

const Index = () => {
  return (
    <div className="relative min-h-screen overflow-hidden bg-background">
      <CursorLight />
      <HeroEnvironment />
      <SystemPanels />
      <MediaShowcase />
      <FooterSystem />
    </div>
  );
};

export default Index;
