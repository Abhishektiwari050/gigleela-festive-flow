import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Phone, Mail, Clock, MessageCircle, Users, HelpCircle } from "lucide-react";

const Contact = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our team",
      contact: "+91 9876 543 210",
      availability: "Mon-Sat, 9 AM - 8 PM"
    },
    {
      icon: Mail,
      title: "Email Us",
      description: "Get detailed assistance",
      contact: "hello@sanskritiq.com",
      availability: "Response within 24 hours"
    },
    {
      icon: MessageCircle,
      title: "Live Chat",
      description: "Instant support online",
      contact: "Chat with us",
      availability: "Mon-Fri, 10 AM - 6 PM"
    },
    {
      icon: MapPin,
      title: "Visit Us",
      description: "Meet us in person",
      contact: "Mumbai, Maharashtra",
      availability: "By appointment only"
    }
  ];

  const faqs = [
    {
      question: "How do I book an artist?",
      answer: "Browse our artist directory, select your preferred performer, and use our instant booking system. You can also contact artists directly through our platform."
    },
    {
      question: "What types of events do you cater to?",
      answer: "We serve weddings, corporate events, festivals, private parties, cultural celebrations, and educational programs across India."
    },
    {
      question: "How are artist prices determined?",
      answer: "Artists set their own pricing based on event type, duration, location, and requirements. All prices are transparent with no hidden fees."
    },
    {
      question: "Can I cancel or reschedule a booking?",
      answer: "Yes, cancellation and rescheduling policies vary by artist. Most offer flexible options with advance notice."
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
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              We're here to help you connect with authentic cultural experiences. Reach out to us anytime!
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How Can We Help?</h2>
              <p className="text-muted-foreground text-lg">Choose the best way to reach us</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {contactMethods.map((method, index) => (
                <Card key={index} className="text-center hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                  <CardHeader>
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <method.icon className="h-8 w-8 text-primary" />
                    </div>
                    <CardTitle className="text-xl">{method.title}</CardTitle>
                    <p className="text-muted-foreground text-sm">{method.description}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold text-primary mb-2">{method.contact}</p>
                    <p className="text-sm text-muted-foreground">{method.availability}</p>
                    <Button className="mt-4 w-full" variant="outline" size="sm">
                      Contact Now
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Send us a Message</h2>
                <p className="text-muted-foreground mb-8">
                  Fill out the form below and we'll get back to you as soon as possible. 
                  We typically respond within 24 hours.
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-sm">Average response time: 2-4 hours</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Users className="h-5 w-5 text-primary" />
                    <span className="text-sm">Dedicated support team</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <HelpCircle className="h-5 w-5 text-primary" />
                    <span className="text-sm">Expert guidance available</span>
                  </div>
                </div>
              </div>
              
              <Card>
                <CardContent className="p-8">
                  <form className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Enter your first name" />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Enter your last name" />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="Enter your email" />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="Enter your phone number" />
                    </div>
                    
                    <div>
                      <Label htmlFor="inquiryType">Inquiry Type</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select inquiry type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="booking">Event Booking</SelectItem>
                          <SelectItem value="artist">Artist Registration</SelectItem>
                          <SelectItem value="partnership">Partnership</SelectItem>
                          <SelectItem value="support">Technical Support</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea 
                        id="message" 
                        placeholder="Tell us about your event or inquiry..."
                        rows={5}
                      />
                    </div>
                    
                    <Button type="submit" className="w-full">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 px-4">
          <div className="container mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
              <p className="text-muted-foreground text-lg">Quick answers to common questions</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              {faqs.map((faq, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-3">{faq.question}</h3>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="text-center mt-12">
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <Button variant="outline">
                View All FAQs
              </Button>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Visit Our Office</h2>
              <p className="text-muted-foreground">We'd love to meet you in person</p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-semibold mb-4">Mumbai Office</h3>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <MapPin className="h-5 w-5 text-primary mt-1" />
                      <div>
                        <p className="font-medium">Sanskritiq Technologies</p>
                        <p className="text-muted-foreground">
                          123 Cultural Arts Plaza<br />
                          Bandra West, Mumbai - 400050<br />
                          Maharashtra, India
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="h-5 w-5 text-primary" />
                      <p className="text-muted-foreground">
                        Monday - Saturday: 9:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                </div>
                
                <Button className="w-full sm:w-auto">
                  Schedule a Visit
                </Button>
              </div>
              
              <div className="bg-muted rounded-lg h-64 flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p>Interactive map coming soon</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Contact;