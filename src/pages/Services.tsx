import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Users, Camera, Mic, Palette, Trophy, Clock, MapPin } from "lucide-react";

const Services = () => {
  const services = [
    {
      icon: Music,
      title: "Classical & Folk Music",
      description: "Authentic traditional performances for your special occasions",
      features: ["Vocal Performances", "Instrumental Shows", "Group Ensembles"],
      price: "Starting from ₹5,000",
      popular: true
    },
    {
      icon: Users,
      title: "Dance Performances",
      description: "Captivating dance forms from across India",
      features: ["Classical Dance", "Folk Dance", "Fusion Performances"],
      price: "Starting from ₹8,000",
      popular: false
    },
    {
      icon: Camera,
      title: "Cultural Events",
      description: "Complete cultural program management",
      features: ["Event Planning", "Artist Coordination", "Technical Support"],
      price: "Starting from ₹15,000",
      popular: false
    },
    {
      icon: Mic,
      title: "Wedding Entertainment",
      description: "Make your wedding celebration unforgettable",
      features: ["Sangeet Performances", "Ceremony Music", "Reception Shows"],
      price: "Starting from ₹12,000",
      popular: true
    },
    {
      icon: Palette,
      title: "Art & Craft Workshops",
      description: "Interactive cultural learning experiences",
      features: ["Painting Workshops", "Craft Sessions", "Cultural Education"],
      price: "Starting from ₹3,000",
      popular: false
    },
    {
      icon: Trophy,
      title: "Competition & Events",
      description: "Professional performances for competitions",
      features: ["Contest Preparation", "Performance Coaching", "Event Participation"],
      price: "Starting from ₹6,000",
      popular: false
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-festival overflow-hidden">
          <div className="absolute inset-0 bg-festival-pattern opacity-10"></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Our Services
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Discover authentic cultural performances and services that bring heritage to life
            </p>
            <Button size="lg" variant="secondary" className="animate-bounce">
              Explore All Services
            </Button>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Perfect Service</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                From intimate gatherings to grand celebrations, we have the perfect cultural touch for every occasion
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <Card key={index} className="relative group hover:shadow-elegant transition-all duration-300 hover:-translate-y-2">
                  {service.popular && (
                    <Badge className="absolute -top-2 -right-2 bg-primary text-primary-foreground">
                      Popular
                    </Badge>
                  )}
                  <CardHeader>
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="p-3 rounded-lg bg-primary/10">
                        <service.icon className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-xl">{service.title}</CardTitle>
                    </div>
                    <CardDescription className="text-base">
                      {service.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <div className="pt-4 border-t">
                        <p className="text-lg font-semibold text-primary mb-4">{service.price}</p>
                        <Button className="w-full" variant="outline">
                          Book Now
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
              <p className="text-muted-foreground text-lg">Simple steps to book your perfect cultural experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">1. Choose Service</h3>
                <p className="text-muted-foreground">Browse through our curated list of cultural services and select what fits your event</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Clock className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">2. Book & Schedule</h3>
                <p className="text-muted-foreground">Select your preferred date and time, and confirm your booking with our artists</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-4">3. Enjoy Experience</h3>
                <p className="text-muted-foreground">Sit back and enjoy authentic cultural performances that bring heritage to life</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-festival">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Celebrate Heritage?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with authentic artists and bring the richness of Indian culture to your next event
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary">
                Browse Artists
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                Contact Us
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;