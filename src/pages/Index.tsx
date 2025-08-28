
import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { HowToUseSection } from "@/components/HowToUseSection";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      <main className="flex-1">
        <HeroSection />
        <HowToUseSection />
      </main>
    </div>
  );
};

export default Index;
