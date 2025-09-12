import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import HeroSection from "@/components/Home/HeroSection";
import ServicesSection from "@/components/Home/ServicesSection";
import ArtistsShowcase from "@/components/Home/ArtistsShowcase";
import FeaturesSection from "@/components/Home/FeaturesSection";
import AboutSection from "@/components/Home/AboutSection";
import ContactSection from "@/components/Home/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ArtistsShowcase />
        <FeaturesSection />
        <AboutSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
