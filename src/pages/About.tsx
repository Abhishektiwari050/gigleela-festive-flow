import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Users, Trophy, Target, Eye, Zap, Globe, Shield } from "lucide-react";

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Cultural Preservation",
      description: "We're passionate about preserving and promoting India's rich cultural heritage through authentic performances."
    },
    {
      icon: Users,
      title: "Community Building",
      description: "Connecting artists with audiences to build a thriving community that celebrates traditional arts."
    },
    {
      icon: Trophy,
      title: "Excellence",
      description: "We maintain the highest standards of artistic quality and professional service for every event."
    },
    {
      icon: Shield,
      title: "Trust & Transparency",
      description: "Building trust through transparent pricing, verified artists, and reliable service delivery."
    }
  ];

  const team = [
    {
      name: "Priya Sharma",
      role: "Founder & CEO",
      background: "Former cultural event manager with 15+ years experience",
      image: "/placeholder.svg"
    },
    {
      name: "Rajesh Kumar",
      role: "Head of Artist Relations",
      background: "Classical musician and cultural consultant",
      image: "/placeholder.svg"
    },
    {
      name: "Anita Verma",
      role: "Technology Director",
      background: "Tech entrepreneur passionate about cultural preservation",
      image: "/placeholder.svg"
    }
  ];

  const stats = [
    { number: "500+", label: "Verified Artists" },
    { number: "2,000+", label: "Events Completed" },
    { number: "15+", label: "Art Forms Covered" },
    { number: "25+", label: "Cities Served" }
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
              About Sanskritiq
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
              We're on a mission to preserve, promote, and celebrate India's rich cultural heritage by connecting authentic artists with audiences who value tradition.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Story</h2>
                <div className="space-y-4 text-muted-foreground">
                  <p>
                    Sanskritiq was born from a simple yet powerful observation: while India's cultural heritage is incredibly rich and diverse, many talented traditional artists struggle to find platforms to showcase their skills, and event organizers often struggle to find authentic cultural performers.
                  </p>
                  <p>
                    Founded in 2024, we bridge this gap by creating a digital marketplace that celebrates and preserves our cultural traditions while providing sustainable opportunities for artists and memorable experiences for audiences.
                  </p>
                  <p>
                    Today, we're proud to be India's leading platform for authentic cultural performances, connecting heritage with modern celebration.
                  </p>
                </div>
                <Button size="lg" className="mt-6">
                  Join Our Mission
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square bg-gradient-festival rounded-2xl p-8 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Eye className="h-16 w-16 mx-auto mb-4" />
                    <h3 className="text-2xl font-bold mb-2">Our Vision</h3>
                    <p className="text-white/90">
                      To be the global platform where Indian cultural heritage thrives in the modern world
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Target className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-2xl font-bold">Our Mission</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To preserve and promote India's rich cultural heritage by creating a thriving ecosystem where traditional artists can showcase their talents, earn sustainable livelihoods, and pass on their knowledge to future generations.
                  </p>
                </CardContent>
              </Card>
              
              <Card className="p-8">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Eye className="h-8 w-8 text-primary mr-3" />
                    <h3 className="text-2xl font-bold">Our Vision</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    To be the world's most trusted platform for authentic Indian cultural experiences, where every celebration connects people with the timeless beauty and wisdom of our heritage.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Values</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                These core values guide everything we do and shape how we serve our community
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                    <value.icon className="h-8 w-8 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-20 px-4 bg-gradient-festival">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Our Impact</h2>
              <p className="text-white/90 text-lg">Growing stronger together, one celebration at a time</p>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/90">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Meet Our Team</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Passionate individuals working to preserve and promote cultural heritage
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-shadow duration-300">
                  <CardContent className="p-8">
                    <div className="w-24 h-24 bg-gradient-festival rounded-full flex items-center justify-center mx-auto mb-6">
                      <span className="text-white font-bold text-2xl">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                    <Badge variant="outline" className="mb-4">{member.role}</Badge>
                    <p className="text-muted-foreground text-sm">{member.background}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Join Our Cultural Journey
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you're an artist looking to share your talent or someone seeking authentic cultural experiences, we invite you to be part of our mission.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg">
                Join as Artist
              </Button>
              <Button size="lg" variant="outline">
                Book an Event
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;