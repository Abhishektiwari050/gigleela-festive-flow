import { Button } from "@/components/ui/button";
import { 
  Instagram, 
  Facebook, 
  Twitter, 
  Youtube,
  Mail,
  Phone,
  MapPin
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-gradient-festival flex items-center justify-center">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <span className="text-xl font-bold text-festival-gradient">Rangmanch</span>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                India's premier digital marketplace connecting talented performing artists 
                with event organizers across the country.
              </p>
              <div className="flex space-x-2">
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Instagram className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Facebook className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Twitter className="h-4 w-4" />
                </Button>
                <Button size="icon" variant="ghost" className="hover:text-primary">
                  <Youtube className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* For Artists */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">For Artists</h4>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Join as Artist
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Artist Guidelines
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing Tips
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Success Stories
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Artist Resources
                </a>
              </nav>
            </div>

            {/* For Clients */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">For Event Organizers</h4>
              <nav className="flex flex-col space-y-3">
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  How to Book
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Event Planning Guide
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Pricing & Payments
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Customer Support
                </a>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Event Categories
                </a>
              </nav>
            </div>

            {/* Contact & Support */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground">Get in Touch</h4>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4 text-primary" />
                  <span>hello@rangmanch.in</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 98765 43210</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-primary" />
                  <span>Mumbai, Delhi, Bangalore</span>
                </div>
              </div>
              
              {/* Newsletter */}
              <div className="pt-4">
                <p className="text-sm font-medium text-foreground mb-2">Stay Updated</p>
                <p className="text-xs text-muted-foreground mb-3">
                  Get notified about featured artists and special events
                </p>
                <div className="flex space-x-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    className="flex-1 px-3 py-2 text-sm border border-input rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <Button size="sm" variant="festival">
                    Subscribe
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="flex flex-wrap gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Terms of Service
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookie Policy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                About Us
              </a>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Rangmanch. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;