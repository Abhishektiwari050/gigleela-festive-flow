import { Button } from "@/components/ui/button";
import { 
  Search, 
  Menu, 
  X,
  Heart, 
  ChevronDown,
  Users,
  UserPlus,
  Share2,
  Bell,
  User,
  LogOut,
  Settings
} from "lucide-react";
import { useState, useEffect } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { useNavigate, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Header = ({ isHeroInView = false }: { isHeroInView?: boolean }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAuthenticated, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setHasScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  const handleSearch = () => {
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Sanskritiq - Connecting Heritage',
          text: 'Discover authentic Indian cultural performances and services',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const handleLogout = () => {
    logout();
    setIsMobileMenuOpen(false);
  };

  const getUserInitials = (name: string) => {
    return name
      .split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const navItems = [
    { path: '/services', label: 'Services' },
    { path: '/artists', label: 'Artists' },
    { path: '/about', label: 'About Us' },
    { path: '/contact', label: 'Contact' }
  ];

  const handleHomeNavigation = () => {
    navigate('/');
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
  };

  return (
    <header className={cn(
      "fixed top-0 z-50 w-full transition-all duration-500",
      isHeroInView 
        ? "bg-transparent border-transparent backdrop-blur-none text-white" 
        : "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b text-foreground",
      hasScrolled && !isHeroInView ? "shadow-lg border-border/50" : ""
    )}>
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <div 
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={handleHomeNavigation}
            role="button"
            tabIndex={0}
            onKeyPress={(e) => e.key === 'Enter' && handleHomeNavigation()}
          >
            <div className="h-10 w-10 rounded-lg bg-gradient-festival flex items-center justify-center transform group-hover:rotate-12 transition-all duration-500 festival-glow">
              {/* Sanskritiq Heritage Logo SVG */}
              <svg 
                viewBox="0 0 48 48" 
                className="h-8 w-8 text-white"
                fill="currentColor"
              >
                <circle cx="24" cy="24" r="22" stroke="#C19A6B" strokeWidth="4" fill="#F5F0E6" />
                <path d="M24 12c4 0 7 3 7 7s-3 7-7 7-7-3-7-7 3-7 7-7zm0 14c6.627 0 12 2.686 12 6v4H12v-4c0-3.314 5.373-6 12-6z" fill="#C19A6B" />
              </svg>
            </div>
            <div>
              <h1 className={cn(
                "text-xl font-bold bg-clip-text transition-colors",
                isHeroInView ? "text-white" : "text-festival-gradient"
              )}>
                Sanskritiq
              </h1>
              <p className={cn(
                "text-xs -mt-1 transition-colors",
                isHeroInView ? "text-white/80" : "text-muted-foreground"
              )}>Connecting Heritage</p>
            </div>
          </div>
        </div>

        {/* Navigation - Desktop */}
        <nav className="hidden lg:flex items-center space-x-6">
          {navItems.map((item) => (
            <button
              key={item.path}
              onClick={() => handleNavigation(item.path)}
              className={cn(
                "transition-all duration-300 font-medium px-3 py-2 rounded-lg",
                location.pathname === item.path 
                  ? (isHeroInView ? "text-white bg-white/20" : "text-primary bg-primary/10")
                  : (isHeroInView ? "text-white/90 hover:text-white hover:bg-white/10" : "text-foreground hover:text-primary hover:bg-accent/50")
              )}
              aria-current={location.pathname === item.path ? "page" : undefined}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "hidden sm:flex transition-colors",
              isHeroInView ? "text-white hover:bg-white/10 hover:text-white" : "hover:bg-primary/10"
            )}
            onClick={() => setIsSearchOpen(!isSearchOpen)}
          >
            <Search className="h-4 w-4" />
          </Button>

          {isAuthenticated && (
            <>
              {/* Notifications */}
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hidden sm:flex transition-colors",
                  isHeroInView ? "text-white hover:bg-white/10 hover:text-white" : "hover:bg-primary/10"
                )}
                onClick={() => navigate('/notifications')}
              >
                <Bell className="h-4 w-4" />
              </Button>

              {/* Favorites */}
              <Button 
                variant="ghost" 
                size="icon" 
                className={cn(
                  "hidden sm:flex transition-colors",
                  isHeroInView ? "text-white hover:bg-white/10 hover:text-white" : "hover:bg-primary/10"
                )}
                onClick={() => navigate('/favorites')}
              >
                <Heart className="h-4 w-4" />
              </Button>
            </>
          )}

          {/* Share */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "hidden sm:flex transition-colors",
              isHeroInView ? "text-white hover:bg-white/10 hover:text-white" : "hover:bg-primary/10"
            )}
            onClick={handleShare}
          >
            <Share2 className="h-4 w-4" />
          </Button>
          
          {!isAuthenticated && !isLoading && (
            <>
              {/* Join Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "hidden sm:flex festival-glow hover:scale-105 transition-all font-semibold",
                      isHeroInView 
                        ? "text-white border-white/60 bg-white/10 hover:bg-white/20 hover:border-white shadow-lg backdrop-blur-sm" 
                        : "border-primary/30 bg-primary/5 hover:bg-primary/10 text-primary hover:border-primary"
                    )}
                  >
                    Join Now
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => navigate('/join-artist')}
                  >
                    <UserPlus className="h-4 w-4 mr-2" />
                    Join as Artist
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    className="cursor-pointer"
                    onClick={() => navigate('/join-client')}
                  >
                    <Users className="h-4 w-4 mr-2" />
                    Join as Client
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button 
                variant="festival" 
                size="sm" 
                className={cn(
                  "hidden sm:flex hover:shadow-glow transition-all font-semibold",
                  isHeroInView 
                    ? "bg-white text-purple-600 hover:bg-white/90 shadow-lg" 
                    : "bg-gradient-festival text-white hover:bg-gradient-festival/90"
                )}
                onClick={() => navigate('/signin')}
              >
                Sign In
              </Button>
            </>
          )}

          {isAuthenticated && user && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  className="hidden sm:flex items-center space-x-2 hover:bg-primary/10"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={user.profileImage || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80`} />
                    <AvatarFallback className="text-xs">
                      {getUserInitials(user.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{user.name}</span>
                  <ChevronDown className="h-3 w-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm text-muted-foreground">
                  {user.email}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate('/dashboard')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate(`/profile`)}
                >
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate('/favorites')}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  Favorites
                </DropdownMenuItem>
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate('/notifications')}
                >
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer"
                  onClick={() => navigate('/settings')}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem 
                  className="cursor-pointer text-destructive focus:text-destructive"
                  onClick={handleLogout}
                >
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {/* Mobile Menu Button */}
          <Button 
            variant="ghost" 
            size="icon" 
            className={cn(
              "lg:hidden transition-colors",
              isHeroInView ? "text-white hover:bg-white/10 hover:text-white" : "hover:bg-accent hover:text-accent-foreground"
            )}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
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
                  placeholder="Search artists, services, or cultural events..."
                  className="w-full pl-10 pr-4 py-3 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-ring focus:border-primary transition-all duration-300"
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                />
              </div>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => setIsSearchOpen(false)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                Cancel
              </Button>
              <Button 
                variant="default" 
                size="sm"
                onClick={handleSearch}
                disabled={!searchQuery.trim()}
              >
                Search
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 right-0 bg-background border-b border-border animate-slide-up">
          <div className="container py-4">
            <nav className="space-y-2">
              {navItems.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNavigation(item.path)}
                  className={cn(
                    "w-full text-left px-4 py-3 rounded-lg transition-all duration-300 font-medium",
                    location.pathname === item.path
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-accent/50 hover:text-primary"
                  )}
                  aria-current={location.pathname === item.path ? "page" : undefined}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;