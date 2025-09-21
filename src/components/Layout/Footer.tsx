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
                  <span className="text-white font-bold text-sm">S</span>
                </div>
                <div>
                  <span className="text-xl font-bold text-festival-gradient">Sanskritiq</span>
                  <p className="text-xs text-muted-foreground -mt-1">Connecting Heritage</p>
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                India's premier digital marketplace connecting master performing artists 
                with cultural enthusiasts across the country.
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
                  <span>sanskritiqq@gmail.com</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-muted-foreground">
                  <Phone className="h-4 w-4 text-primary" />
                  <span>+91 95905 83161</span>
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
              © 2024 Sanskritiq. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

              <div className="h-8 w-8 rounded-full bg-gradient-festival flex items-center justify-center">
                {/* Sanskritiq Heritage Logo SVG */}
                <svg 
                  viewBox="0 0 48 48" 
                  className="h-6 w-6 text-white"
                  fill="currentColor"
                >
                  <circle cx="24" cy="24" r="22" stroke="#C19A6B" strokeWidth="4" fill="#F5F0E6" />
                  <path d="M24 12c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7zm0 14c6.627 0 12 2.686 12 6v4H12v-4c0-3.314 5.373-6 12-6z" fill="#C19A6B" />
                </svg>
              </div>