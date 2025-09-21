import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Mail,
  Phone,
  MapPin,
  Clock,
  MessageSquare,
  Send,
  Users,
  Heart
} from "lucide-react";

const contactMethods = [
  {
    icon: Mail,
    title: "Email Us",
    description: "hello@sanskritiq.in",
    action: "Send Email",
    color: "text-primary",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "+91 98765 43210",
    action: "Call Now",
    color: "text-accent",
  },
  {
    icon: MessageSquare,
    title: "Live Chat",
    description: "Available 9 AM - 9 PM",
    action: "Start Chat",
    color: "text-primary-glow",
  },
];

const offices = [
  { city: "Mumbai", address: "Bandra West, Mumbai 400050", phone: "+91 98765 43210" },
  { city: "Delhi", address: "Connaught Place, New Delhi 110001", phone: "+91 98765 43211" },
  { city: "Bangalore", address: "Koramangala, Bangalore 560034", phone: "+91 98765 43212" },
];

const ContactSection = () => {
  return (
    <section id="contact" className="py-20 gradient-subtle relative overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt="Indian cultural instruments background"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Get in
            <span className="text-festival-gradient"> Touch</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Have questions about our artists or services? We're here to help you create 
            unforgettable cultural experiences.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="animate-slide-up">
            <Card className="border-0 shadow-festival">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-2xl font-bold">Send us a Message</h3>
                    <p className="text-muted-foreground">We'll respond within 24 hours</p>
                  </div>
                  
                  <form className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">Your Name</label>
                        <input
                          type="text"
                          placeholder="Enter your full name"
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">Email Address</label>
                        <input
                          type="email"
                          placeholder="your@email.com"
                          className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number</label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Event Type</label>
                      <select className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring">
                        <option>Select event type</option>
                        <option>Wedding Celebration</option>
                        <option>Festival Event</option>
                        <option>Corporate Function</option>
                        <option>Private Event</option>
                        <option>Cultural Workshop</option>
                        <option>Other</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium mb-2">Message</label>
                      <textarea
                        rows={4}
                        placeholder="Tell us about your event requirements, preferred artists, date, location, and any special requests..."
                        className="w-full px-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring resize-none"
                      ></textarea>
                    </div>
                    
                    <Button size="lg" variant="festival" className="w-full">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            {/* Contact Methods */}
            <div className="space-y-6 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-6">Contact Methods</h3>
              {contactMethods.map((method, index) => {
                const IconComponent = method.icon;
                return (
                  <Card key={index} className="group border-0 shadow-md hover:shadow-festival transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex-shrink-0">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                            <IconComponent className={`h-6 w-6 ${method.color}`} />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-semibold mb-1">{method.title}</h4>
                          <p className="text-muted-foreground">{method.description}</p>
                        </div>
                        <Button variant="outline" size="sm">
                          {method.action}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            {/* Office Locations */}
            <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold mb-6">Our Offices</h3>
              <div className="space-y-4">
                {offices.map((office, index) => (
                  <Card key={index} className="border-0 shadow-md">
                    <CardContent className="p-6">
                      <div className="flex items-start space-x-4">
                        <MapPin className="h-5 w-5 text-primary mt-1 flex-shrink-0" />
                        <div>
                          <h4 className="font-semibold">{office.city}</h4>
                          <p className="text-muted-foreground text-sm mb-1">{office.address}</p>
                          <p className="text-muted-foreground text-sm">{office.phone}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <Card className="border-0 shadow-festival bg-gradient-festival text-white">
                <CardContent className="p-8 text-center">
                  <Heart className="h-12 w-12 mx-auto mb-4 opacity-90" />
                  <h3 className="text-xl font-bold mb-2">Join Our Community</h3>
                  <p className="mb-6 opacity-90">
                    Become part of India's largest cultural heritage community
                  </p>
                  <div className="space-y-3">
                    <Button variant="secondary" size="lg" className="w-full">
                      <Users className="mr-2 h-5 w-5" />
                      Join as Artist
                    </Button>
                    <Button variant="outline" size="lg" className="w-full bg-transparent border-white/30 text-white hover:bg-white/10">
                      <Heart className="mr-2 h-5 w-5" />
                      Join as Culture Enthusiast
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;