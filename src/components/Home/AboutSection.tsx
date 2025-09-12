import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Heart,
  Star,
  Users,
  Award,
  Target,
  Globe
} from "lucide-react";

const stats = [
  { number: "5+", label: "Years of Heritage", icon: Award },
  { number: "2000+", label: "Master Artists", icon: Users },
  { number: "10,000+", label: "Cultural Events", icon: Star },
  { number: "50+", label: "Cities Connected", icon: Globe },
];

const values = [
  {
    icon: Heart,
    title: "Authentic Heritage",
    description: "We preserve and promote genuine Indian cultural traditions through verified master artists.",
  },
  {
    icon: Users,
    title: "Community Building",
    description: "Connecting artists and cultural enthusiasts to strengthen our shared heritage bonds.",
  },
  {
    icon: Target,
    title: "Cultural Excellence",
    description: "Maintaining the highest standards in traditional arts while embracing modern accessibility.",
  },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            About
            <span className="text-festival-gradient"> Sanskritiq</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Born from a passion to preserve India's rich cultural heritage, Sanskritiq bridges the gap 
            between master artists and cultural enthusiasts across the nation.
          </p>
        </div>

        {/* Story Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="space-y-6 animate-slide-up">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Heart className="w-4 h-4 text-primary mr-2" />
              <span className="text-sm font-medium text-primary">Our Story</span>
            </div>
            <h3 className="text-3xl font-bold">Connecting Heritage, One Performance at a Time</h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                In a rapidly digitalizing world, the essence of India's traditional performing arts 
                was becoming increasingly difficult to access. Master artists were confined to local 
                networks, while cultural enthusiasts struggled to find authentic performers.
              </p>
              <p>
                Sanskritiq was created to solve this disconnect. We believe that every Indian classical 
                raga, folk dance, and traditional ritual carries centuries of wisdom that deserves to 
                be celebrated and preserved.
              </p>
              <p>
                Today, we're proud to be the trusted platform where heritage meets technology, 
                ensuring that India's cultural treasures remain vibrant and accessible to all.
              </p>
            </div>
          </div>
          
          {/* Mission Card */}
          <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Card className="border-0 shadow-festival bg-gradient-subtle">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-festival">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <h4 className="text-2xl font-bold">Our Mission</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    To preserve, promote, and make accessible India's rich performing arts heritage 
                    by connecting master artists with cultural enthusiasts through technology and trust.
                  </p>
                  <div className="pt-4">
                    <Button variant="festival" size="lg">
                      Join Our Mission
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
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

        {/* Values Section */}
        <div>
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold mb-4">Our Values</h3>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The principles that guide us in preserving and promoting India's cultural heritage
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <div 
                  key={index}
                  className="text-center space-y-4 animate-slide-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-festival/10 border-2 border-primary/20">
                    <IconComponent className="h-7 w-7 text-primary" />
                  </div>
                  <h4 className="text-xl font-semibold">{value.title}</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;