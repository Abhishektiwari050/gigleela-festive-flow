import { Button } from "@/components/ui/button";
import { Play, Search, Star } from "lucide-react";
import heroImage from "@/assets/hero-festival.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden gradient-subtle">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Festival celebration with traditional Indian performing artists"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 to-background/40" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-3 h-3 rounded-full bg-primary opacity-60"></div>
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <div className="w-2 h-2 rounded-full bg-accent opacity-80"></div>
      </div>
      <div className="absolute bottom-32 left-20 animate-sparkle">
        <Star className="h-6 w-6 text-primary-glow" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-slide-up">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
            <span className="text-sm font-medium text-primary">🎭 India's Premier Talent Marketplace</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 leading-tight">
            Discover Amazing
            <span className="block text-festival-gradient animate-sparkle">
              Performing Artists
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Connect with talented singers, dancers, musicians, and performers for your special events. 
            From weddings to festivals, find the perfect artist in minutes.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center items-center gap-8 mb-10 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary"></div>
              <span className="text-muted-foreground">2000+ Verified Artists</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-accent"></div>
              <span className="text-muted-foreground">500+ Events Monthly</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-primary-glow"></div>
              <span className="text-muted-foreground">All Major Cities</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="xl" variant="hero" className="min-w-[200px]">
              <Search className="mr-2 h-5 w-5" />
              Find Artists
            </Button>
            <Button size="xl" variant="outline" className="min-w-[200px] group">
              <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Watch Demo
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <p className="text-sm text-muted-foreground mb-4">Trusted by event organizers across India</p>
            <div className="flex flex-wrap justify-center items-center gap-6 opacity-60">
              <span className="text-xs font-medium">Wedding Planners</span>
              <div className="w-1 h-1 bg-border rounded-full"></div>
              <span className="text-xs font-medium">Corporate Events</span>
              <div className="w-1 h-1 bg-border rounded-full"></div>
              <span className="text-xs font-medium">Festival Organizers</span>
              <div className="w-1 h-1 bg-border rounded-full"></div>
              <span className="text-xs font-medium">Cultural Centers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;