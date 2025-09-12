import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Shield, 
  Clock, 
  CreditCard, 
  MessageSquare, 
  Star,
  Users,
  Calendar,
  Award
} from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Discover Talent",
    description: "Find the perfect artist for your event with our smart search and filtering system.",
    color: "text-primary",
  },
  {
    icon: Shield,
    title: "Verified Artists",
    description: "All artists are verified with portfolios, reviews, and performance history.",
    color: "text-accent",
  },
  {
    icon: Clock,
    title: "Real-time Availability",
    description: "See which artists are available right now for last-minute bookings.",
    color: "text-primary-glow",
  },
  {
    icon: CreditCard,
    title: "Transparent Pricing",
    description: "No hidden fees. See exact prices upfront including travel and setup costs.",
    color: "text-primary",
  },
  {
    icon: MessageSquare,
    title: "Direct Communication",
    description: "Chat directly with artists to discuss your event requirements and details.",
    color: "text-accent",
  },
  {
    icon: Star,
    title: "Quality Guaranteed",
    description: "Read reviews and ratings from previous clients to make informed decisions.",
    color: "text-primary-glow",
  },
];

const stats = [
  { number: "2000+", label: "Verified Artists", icon: Users },
  { number: "500+", label: "Events Monthly", icon: Calendar },
  { number: "4.8★", label: "Average Rating", icon: Star },
  { number: "50+", label: "Cities Covered", icon: Award },
];

const FeaturesSection = () => {
  return (
    <section className="py-20 gradient-subtle">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Why Choose
            <span className="text-festival-gradient"> Sanskritiq</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We connect you with authentic Indian heritage through verified master artists. 
            Experience the richness of our cultural traditions.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={index} 
                className="text-center p-6 border-0 shadow-md hover:shadow-festival transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-3xl font-bold text-festival-gradient mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {stat.label}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <Card 
                key={index}
                className="group border-0 shadow-md hover:shadow-festival transition-all duration-300 transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300">
                        <IconComponent className={`h-6 w-6 ${feature.color}`} />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <Button size="xl" variant="hero" className="animate-sparkle">
            Start Exploring Artists
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;