import VideoCarousel from "./VideoCarousel";
import { Button } from "@/components/ui/button";
import { Search, Star, Sparkles, Users, Calendar, Play } from "lucide-react";

const HeroSection = () => {
  return (
    <section id="home" className="relative">
      {/* Video Carousel Background */}
      <VideoCarousel />
      
      {/* Overlay Content - Stats Section */}
      <div className="relative bg-background/95 backdrop-blur-sm border-t">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">
              Connecting Heritage with Modern Celebrations
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of artists and event organizers celebrating India's rich cultural traditions
            </p>
          </div>
          
          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <Users className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-3xl font-bold text-festival-gradient mb-2">2000+</div>
              <div className="text-sm text-muted-foreground">Master Artists</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <Calendar className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-festival-gradient mb-2">500+</div>
              <div className="text-sm text-muted-foreground">Events Monthly</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <Star className="h-8 w-8 text-primary-glow mx-auto mb-3" />
              <div className="text-3xl font-bold text-festival-gradient mb-2">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-6 rounded-lg bg-card hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
              <Sparkles className="h-8 w-8 text-accent mx-auto mb-3" />
              <div className="text-3xl font-bold text-festival-gradient mb-2">50+</div>
              <div className="text-sm text-muted-foreground">Art Forms</div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-12">
            <Button size="lg" className="text-lg font-semibold">
              <Search className="mr-2 h-5 w-5" />
              Find Artists
            </Button>
            <Button size="lg" variant="outline" className="text-lg font-semibold">
              <Play className="mr-2 h-5 w-5" />
              How It Works
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="text-center mt-12">
            <p className="text-sm font-medium text-muted-foreground mb-4">
              Trusted by cultural enthusiasts across India
            </p>
            <div className="flex flex-wrap justify-center items-center gap-6 text-xs font-medium text-muted-foreground/80">
              <span>🎭 Wedding Celebrations</span>
              <span>🎪 Festival Events</span>
              <span>🏢 Corporate Gatherings</span>
              <span>🎨 Cultural Centers</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;