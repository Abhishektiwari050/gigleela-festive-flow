import { Button } from "@/components/ui/button";
import { Play, Search, Star, Sparkles, Users, Calendar } from "lucide-react";
import heroImage from "@/assets/hero-festival.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/10 to-primary-glow/5 animate-pulse"></div>
        <img
          src={heroImage}
          alt="Heritage celebration with traditional Indian performing artists showcasing cultural diversity"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/90 via-background/70 to-background/90" />
      </div>

      {/* Enhanced Floating Elements */}
      <div className="absolute top-20 left-10 animate-float">
        <div className="w-4 h-4 rounded-full bg-gradient-festival opacity-70 animate-sparkle"></div>
      </div>
      <div className="absolute top-32 right-20 animate-float" style={{ animationDelay: '1s' }}>
        <Sparkles className="h-8 w-8 text-primary-glow animate-sparkle" />
      </div>
      <div className="absolute bottom-32 left-20 animate-float" style={{ animationDelay: '2s' }}>
        <Star className="h-6 w-6 text-accent animate-sparkle" />
      </div>
      <div className="absolute top-1/4 left-1/4 animate-float" style={{ animationDelay: '1.5s' }}>
        <div className="w-2 h-2 rounded-full bg-primary opacity-60"></div>
      </div>
      <div className="absolute bottom-1/4 right-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
        <div className="w-3 h-3 rounded-full bg-accent/60 animate-sparkle"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 container mx-auto px-4 text-center animate-slide-up">
        <div className="max-w-5xl mx-auto">
          {/* Enhanced Badge */}
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-festival/10 border-2 border-primary/30 mb-8 animate-sparkle">
            <Sparkles className="w-4 h-4 text-primary mr-2" />
            <span className="text-sm font-semibold text-primary">🇮🇳 Celebrating India's Rich Cultural Heritage</span>
          </div>

          {/* Enhanced Main Heading */}
          <h1 className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-tight">
            <span className="block mb-2">Discover India's</span>
            <span className="block text-festival-gradient animate-sparkle text-6xl sm:text-7xl lg:text-9xl">
              Cultural Treasures
            </span>
            <span className="block text-3xl sm:text-4xl lg:text-5xl mt-4 font-medium text-muted-foreground">
              One Artist at a Time
            </span>
          </h1>

          {/* Enhanced Subtitle */}
          <p className="text-lg sm:text-xl lg:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            Connect with master artists preserving ancient traditions. From classical ragas to folk dances, 
            <span className="text-primary font-medium"> experience authentic Indian performing arts</span> for your most cherished celebrations.
          </p>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 max-w-3xl mx-auto">
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Users className="h-6 w-6 text-primary mx-auto mb-2" />
              <div className="text-2xl font-bold text-festival-gradient">2000+</div>
              <div className="text-sm text-muted-foreground">Master Artists</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <Calendar className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-festival-gradient">500+</div>
              <div className="text-sm text-muted-foreground">Events Monthly</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Star className="h-6 w-6 text-primary-glow mx-auto mb-2" />
              <div className="text-2xl font-bold text-festival-gradient">4.9★</div>
              <div className="text-sm text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-card/50 border border-border/50 animate-slide-up" style={{ animationDelay: '0.8s' }}>
              <Sparkles className="h-6 w-6 text-accent mx-auto mb-2" />
              <div className="text-2xl font-bold text-festival-gradient">50+</div>
              <div className="text-sm text-muted-foreground">Art Forms</div>
            </div>
          </div>

          {/* Enhanced CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-12">
            <Button size="xl" variant="hero" className="min-w-[240px] text-lg font-semibold animate-float">
              <Search className="mr-3 h-6 w-6" />
              Explore Heritage Artists
            </Button>
            <Button size="xl" variant="outline" className="min-w-[240px] text-lg font-semibold group border-2">
              <Play className="mr-3 h-6 w-6 group-hover:scale-125 transition-transform duration-300" />
              Watch Cultural Stories
            </Button>
          </div>

          {/* Enhanced Trust Indicators */}
          <div className="text-center animate-slide-up" style={{ animationDelay: '1s' }}>
            <p className="text-sm font-medium text-muted-foreground mb-6">
              Trusted by cultural enthusiasts and event organizers across India
            </p>
            <div className="flex flex-wrap justify-center items-center gap-8 text-xs font-medium text-muted-foreground/80">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
                <span>Wedding Celebrations</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '0.5s' }}></div>
                <span>Festival Events</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-primary-glow animate-pulse" style={{ animationDelay: '1s' }}></div>
                <span>Corporate Gatherings</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" style={{ animationDelay: '1.5s' }}></div>
                <span>Cultural Centers</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;