import { Button } from "@/components/ui/button";
import { 
  Search, 
  Menu, 
  Heart, 
  ChevronDown,
  Users,
  UserPlus
} from "lucide-react";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleNavigation = (section: string) => {
    // Scroll to section or navigate
    const element = document.getElementById(section);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-3">
            {/* Swastik Logo */}
            <div className="h-10 w-10 rounded-lg bg-gradient-festival flex items-center justify-center transform hover:rotate-12 transition-transform duration-300">
              <svg 
                viewBox="0 0 24 24" 
                className="h-6 w-6 text-white"
                fill="currentColor"
              >
                <path d="M12 2v10h10v2H14v8h-2v-8H2v-2h10V2h2z"/>
                <path d="M14 2h8v2h-8zM2 12h8v2H2zM14 20h8v2h-8zM2 2h8v2H2z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-festival-gradient">Sanskritiq</h1>
              <p className="text-xs text-muted-foreground -mt-1">Connecting Heritage</p>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-8">
          <button 
            onClick={() => handleNavigation('services')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Services
          </button>
          <button 
            onClick={() => handleNavigation('artists')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Artists
          </button>
          <button 
            onClick={() => handleNavigation('about')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            About Us
          </button>
          <button 
            onClick={() => handleNavigation('contact')}
            className="text-foreground hover:text-primary transition-colors font-medium"
          >
            Contact
          </button>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="hidden sm:flex"
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" className="hidden sm:flex">
            <Heart className="h-4 w-4" />
          </Button>
          
          {/* Join Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="hidden sm:flex">
                Join Now
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuItem>
                <UserPlus className="h-4 w-4 mr-2" />
                Join as Artist
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Users className="h-4 w-4 mr-2" />
                Join as Client
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button variant="festival" size="sm" className="hidden sm:flex">
            Sign In
          </Button>
          <Button variant="ghost" size="icon" className="lg:hidden">
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Search Bar Overlay */}
      {isSearchOpen && (
        <div className="absolute top-full left-0 right-0 bg-background border-b border-border p-4 animate-slide-up">
          <div className="container">
            <div className="flex items-center space-x-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search for artists, services, or events..."
                  className="w-full pl-10 pr-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring"
                  autoFocus
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsSearchOpen(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;