import { Button } from "@/components/ui/button";
import { Search, Menu, Heart, User } from "lucide-react";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-gradient-festival flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="text-xl font-bold text-festival-gradient">Rangmanch</span>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Discover Artists
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            Events
          </a>
          <a href="#" className="text-foreground hover:text-primary transition-colors">
            How it Works
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Heart className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" className="hidden sm:flex">
            <User className="h-4 w-4" />
            Sign In
          </Button>
          <Button variant="festival" size="sm" className="hidden sm:flex">
            Join as Artist
          </Button>
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;