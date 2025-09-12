import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HeroSection from "@/components/Home/HeroSection";
import FeaturesSection from "@/components/Home/FeaturesSection";
import ArtistsShowcase from "@/components/Home/ArtistsShowcase";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ArtistsShowcase />
        <FeaturesSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
