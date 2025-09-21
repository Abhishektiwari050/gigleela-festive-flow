import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Music,
  Users,
  Calendar,
  Crown,
  Heart,
  Sparkles,
  Mic,
  Camera
} from "lucide-react";

const services = [
  {
    icon: Music,
    title: "Classical Performances",
    description: "Authentic Hindustani & Carnatic classical music, dance, and instrumental performances.",
    features: ["Solo & Group", "Traditional Ragas", "Sacred Music"],
    color: "text-primary",
  },
  {
    icon: Heart,
    title: "Wedding Celebrations",
    description: "Sacred ceremonies with traditional artists for mehndi, sangeet, and wedding rituals.",
    features: ["Ceremonial Music", "Folk Dances", "Devotional Songs"],
    color: "text-accent",
  },
  {
    icon: Crown,
    title: "Festival Events",
    description: "Celebrate festivals with authentic cultural performances and traditional art forms.",
    features: ["Seasonal Celebrations", "Religious Events", "Community Gatherings"],
    color: "text-primary-glow",
  },
  {
    icon: Users,
    title: "Corporate Culture",
    description: "Bring Indian heritage to corporate events with curated cultural performances.",
    features: ["Team Building", "Cultural Workshops", "Executive Entertainment"],
    color: "text-primary",
  },
  {
    icon: Calendar,
    title: "Private Events",
    description: "Intimate house concerts and private celebrations with master artists.",
    features: ["House Concerts", "Birthday Celebrations", "Family Gatherings"],
    color: "text-accent",
  },
  {
    icon: Sparkles,
    title: "Cultural Education",
    description: "Educational workshops and masterclasses to learn traditional Indian arts.",
    features: ["Learning Sessions", "Masterclasses", "Heritage Workshops"],
    color: "text-primary-glow",
  },
];

const addOns = [
  { icon: Mic, title: "Professional Audio", description: "High-quality sound systems for performances" },
  { icon: Camera, title: "Event Documentation", description: "Professional photography and videography" },
  { icon: Sparkles, title: "Decoration Services", description: "Traditional Indian decor and ambiance" },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Our
            <span className="text-festival-gradient"> Services</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            From intimate classical performances to grand festival celebrations, we connect you 
            with India's finest artists for every cultural occasion.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const IconComponent = service.icon;
            return (
              <Card 
                key={index}
                className="group border-0 shadow-md hover:shadow-festival transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-8">
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300 mb-4">
                      <IconComponent className={`h-8 w-8 ${service.color}`} />
                    </div>
                    <h3 className="font-bold text-xl group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                    <div className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center justify-center text-sm text-muted-foreground">
                          <div className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></div>
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Add-on Services */}
        <div className="bg-card rounded-2xl p-8 border border-border relative overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 opacity-5">
            <img 
              src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
              alt="Indian festival background"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="relative z-10">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-4">Complete Event Solutions</h3>
              <p className="text-muted-foreground">Enhance your cultural experience with our additional services</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
              {addOns.map((addon, index) => {
                const IconComponent = addon.icon;
                return (
                  <div key={index} className="text-center space-y-3 animate-slide-up" style={{ animationDelay: `${(index + 6) * 0.1}s` }}>
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <IconComponent className="h-6 w-6 text-primary" />
                    </div>
                    <h4 className="font-semibold">{addon.title}</h4>
                    <p className="text-sm text-muted-foreground">{addon.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <Button size="xl" variant="hero" className="animate-sparkle">
            Explore All Services
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;