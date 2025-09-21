import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ArtistCard from "@/components/Home/ArtistCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";
import { artistService } from "@/services/database";
import type { Artist } from "@/lib/supabase";

// Extended interface for UI display
interface UIArtist extends Partial<Artist> {
  id: string;
  name: string;
  specialty?: string;
  category?: string;
  location?: string;
  rating: number;
  reviews?: number;
  price?: number;
  priceUnit?: string;
  availability?: string;
  tags?: string[];
  image?: string;
  featured?: boolean;
  bio?: string;
  contact?: { phone?: string; email?: string };
}

const Artists = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [artists, setArtists] = useState<UIArtist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("featured");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  
  // Helper function to map specializations to categories
  const getCategoryFromSpecialization = (specialization: string): string => {
    const spec = specialization.toLowerCase();
    if (spec.includes('music') || spec.includes('tabla') || spec.includes('sitar')) return 'music';
    if (spec.includes('dance') || spec.includes('bharatanatyam') || spec.includes('kathak')) return 'dance';
    if (spec.includes('classical')) return 'classical';
    if (spec.includes('folk')) return 'folk';
    if (spec.includes('devotional') || spec.includes('bhajan')) return 'devotional';
    if (spec.includes('fusion')) return 'fusion';
    if (spec.includes('instrumental') || spec.includes('veena') || spec.includes('flute')) return 'instrumental';
    return 'all';
  };

  // Sample artists data for when API is not available
  const sampleArtists: any[] = [
    {
      id: "1",
      name: "Priya Sharma",
      specialty: "Classical Dance",
      category: "dance",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      reviews: 45,
      price: 12000,
      priceUnit: "per_event",
      availability: "available",
      tags: ["Bharatanatyam", "Kathak", "Cultural Events"],
      image: "/api/placeholder/150/150",
      featured: true,
      bio: "Master of classical Indian dance forms with 15+ years of experience in cultural performances.",
      contact: { phone: "+91 98765 43210", email: "priya.sharma@example.com" }
    },
    {
      id: "2",
      name: "Ravi Kumar",
      specialty: "Traditional Music",
      category: "music",
      location: "Delhi, NCR",
      rating: 4.8,
      reviews: 38,
      price: 8000,
      priceUnit: "per_event",
      availability: "available",
      tags: ["Tabla", "Sitar", "Classical Music"],
      image: "/api/placeholder/150/150",
      featured: true,
      bio: "Renowned tabla and sitar player specializing in classical Indian music performances."
    },
    {
      id: "3",
      name: "Anita Patel",
      specialty: "Folk Performance",
      category: "folk",
      location: "Ahmedabad, Gujarat",
      rating: 5.0,
      reviews: 52,
      price: 15000,
      priceUnit: "per_event",
      availability: "available",
      tags: ["Garba", "Dandiya", "Folk Dance"],
      image: "/api/placeholder/150/150",
      featured: false,
      bio: "Expert in Gujarati folk dances and traditional celebration performances."
    },
    {
      id: "4",
      name: "Vikram Singh",
      specialty: "Devotional Music",
      category: "devotional",
      location: "Jaipur, Rajasthan",
      rating: 4.7,
      reviews: 29,
      price: 6000,
      priceUnit: "per_event",
      availability: "busy",
      tags: ["Bhajan", "Kirtan", "Spiritual Music"],
      image: "/api/placeholder/150/150",
      featured: false,
      bio: "Devotional singer specializing in bhajans and spiritual music performances."
    },
    {
      id: "5",
      name: "Meera Nair",
      specialty: "Fusion Performance",
      category: "fusion",
      location: "Bangalore, Karnataka",
      rating: 4.6,
      reviews: 33,
      price: 20000,
      priceUnit: "per_event",
      availability: "available",
      tags: ["Modern Fusion", "Contemporary", "Cultural Fusion"],
      image: "/api/placeholder/150/150",
      featured: true,
      bio: "Contemporary artist blending traditional and modern performance styles."
    },
    {
      id: "6",
      name: "Arjun Kapoor",
      specialty: "Instrumental Music",
      category: "instrumental",
      location: "Chennai, Tamil Nadu",
      rating: 4.9,
      reviews: 41,
      price: 10000,
      priceUnit: "per_event",
      availability: "available",
      tags: ["Veena", "Flute", "Classical Instrumental"],
      image: "/api/placeholder/150/150",
      featured: false,
      bio: "Master of traditional Indian instruments with expertise in veena and flute."
    }
  ];

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "music", label: "Music" },
    { value: "dance", label: "Dance" },
    { value: "classical", label: "Classical" },
    { value: "folk", label: "Folk" },
    { value: "devotional", label: "Devotional" },
    { value: "fusion", label: "Fusion" },
    { value: "instrumental", label: "Instrumental" }
  ];

  const sortOptions = [
    { value: "featured", label: "Featured First" },
    { value: "rating", label: "Highest Rated" },
    { value: "price", label: "Price: Low to High" },
    { value: "reviews", label: "Most Reviews" },
    { value: "name", label: "Name (A-Z)" }
  ];

  // Fetch artists from Supabase or use sample data as fallback
  useEffect(() => {
    const fetchArtists = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Parse URL parameters
        const urlParams = new URLSearchParams(location.search);
        const categoryParam = urlParams.get('category');
        const serviceParam = urlParams.get('service');
        
        if (categoryParam && categoryParam !== selectedCategory) {
          setSelectedCategory(categoryParam);
        }
        
        try {
          // Try Supabase first
          const filters: any = {};
          const activeCategory = categoryParam || selectedCategory;
          
          if (activeCategory !== "all") {
            // Map UI categories to database specializations
            const categoryMap: { [key: string]: string } = {
              "music": "Traditional Music",
              "dance": "Classical Dance", 
              "classical": "Classical",
              "folk": "Folk",
              "devotional": "Devotional",
              "fusion": "Fusion",
              "instrumental": "Instrumental"
            };
            
            if (categoryMap[activeCategory]) {
              filters.specialization = categoryMap[activeCategory];
            }
          }
          
          const { data, error: fetchError } = await artistService.getArtists(filters);
          
          if (fetchError || !data || data.length === 0) {
            throw new Error('No data from Supabase, using sample data');
          }
          
          // Convert Supabase data to match UI format
          const formattedArtists: UIArtist[] = data.map(artist => ({
            id: artist.id,
            name: artist.name,
            specialty: artist.specialization?.[0] || 'Cultural Artist',
            category: getCategoryFromSpecialization(artist.specialization?.[0] || ''),
            location: artist.location,
            rating: artist.rating,
            reviews: artist.total_reviews,
            price: (typeof artist.pricing === 'object' ? artist.pricing?.event || artist.pricing?.hourly : artist.pricing) || 10000,
            priceUnit: "per_event",
            availability: artist.available ? "available" : "busy",
            tags: artist.specialization,
            image: artist.profile_image || "/api/placeholder/150/150",
            featured: artist.rating >= 4.8,
            bio: artist.bio,
            contact: { phone: artist.phone, email: artist.email }
          }));
          
          setArtists(formattedArtists);
          
        } catch (apiError) {
          console.warn('Using sample data - Supabase connection failed:', apiError);
          
          // Filter sample artists based on criteria
          let filteredArtists = [...sampleArtists];
          
          // Apply category filter
          const activeCategory = categoryParam || selectedCategory;
          if (activeCategory !== "all") {
            filteredArtists = filteredArtists.filter(artist => 
              artist.category === activeCategory
            );
          }
          
          // Apply search filter
          if (searchTerm.trim()) {
            const search = searchTerm.toLowerCase();
            filteredArtists = filteredArtists.filter(artist => 
              artist.name.toLowerCase().includes(search) ||
              artist.specialty.toLowerCase().includes(search) ||
              artist.tags.some((tag: string) => tag.toLowerCase().includes(search))
            );
          }
          
          // Apply sorting
          switch (sortBy) {
            case "featured":
              filteredArtists.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
              break;
            case "rating":
              filteredArtists.sort((a, b) => b.rating - a.rating);
              break;
            case "price":
              filteredArtists.sort((a, b) => a.price - b.price);
              break;
            case "reviews":
              filteredArtists.sort((a, b) => b.reviews - a.reviews);
              break;
            case "name":
              filteredArtists.sort((a, b) => a.name.localeCompare(b.name));
              break;
          }
          
          setArtists(filteredArtists);
          setTotalPages(1);
        }
      } catch (error: any) {
        console.error('Error fetching artists:', error);
        setError(error.message || 'Failed to load artists');
        setArtists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchArtists();
  }, [searchTerm, selectedCategory, sortBy, page, location.search]);

  // Add to favorites
  const handleAddFavorite = async (artistId: string) => {
    if (!isAuthenticated) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add artists to favorites",
        variant: "destructive"
      });
      return;
    }
    
    try {
      // This would need the user ID from auth context
      // await apiClient.addToFavorites(user.id, artistId);
      toast({
        title: "Added to favorites!",
        description: "Artist has been added to your favorites"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to add to favorites",
        variant: "destructive"
      });
    }
  };

  // Handle search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1); // Reset to first page on new search
  };

  // Reset filters
  const resetFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSortBy("featured");
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="relative py-20 px-4 bg-gradient-festival overflow-hidden">
          <div className="absolute inset-0 bg-festival-pattern opacity-10"></div>
          <div className="container mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Discover Artists
            </h1>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Connect with talented performers who bring authentic Indian culture to life
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <Button size="lg" variant="secondary" asChild>
                <Link to="/join-artist">
                  Join as Artist
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary" asChild>
                <Link to="/about">
                  How It Works
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 px-4 border-b">
          <div className="container mx-auto">
            <form onSubmit={handleSearch} className="flex flex-col lg:flex-row gap-4 items-center">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search artists, specialties..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-48">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button type="submit" variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </form>
          </div>
        </section>

        {/* Artists Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {isLoading ? 'Loading...' : `${artists.length} Artists Found`}
                </h2>
                <p className="text-muted-foreground">
                  Authentic performers ready to bring culture to your events
                </p>
              </div>
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sortOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Loading State */}
            {isLoading && (
              <div className="flex items-center justify-center py-16">
                <Loader2 className="h-8 w-8 animate-spin" />
                <span className="ml-2 text-muted-foreground">Loading artists...</span>
              </div>
            )}

            {/* Error State */}
            {error && (
              <div className="text-center py-16">
                <p className="text-destructive text-lg mb-4">{error}</p>
                <Button onClick={() => window.location.reload()}>
                  Try Again
                </Button>
              </div>
            )}

            {/* Artists Grid */}
            {!isLoading && !error && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {artists.map((artist, index) => (
                  <div key={artist.id} className="group">
                    <div className="bg-card rounded-lg border p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                      {artist.featured && (
                        <Badge className="mb-4 bg-primary text-primary-foreground">
                          Featured Artist
                        </Badge>
                      )}
                      
                      <div className="flex items-center space-x-4 mb-4">
                        <div className="w-16 h-16 bg-gradient-festival rounded-full flex items-center justify-center overflow-hidden">
                          {artist.image && artist.image !== '/placeholder.svg' ? (
                            <img 
                              src={artist.image} 
                              alt={artist.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <span className="text-white font-bold text-xl">
                              {artist.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg">{artist.name}</h3>
                          <p className="text-muted-foreground">{artist.specialty}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {artist.location}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium">{artist.rating}</span>
                          <span className="text-muted-foreground text-sm ml-1">
                            ({artist.reviews} reviews)
                          </span>
                        </div>
                        <Badge variant={artist.availability === "available" ? "default" : "secondary"}>
                          {artist.availability.charAt(0).toUpperCase() + artist.availability.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-2 mb-4">
                        {artist.tags.slice(0, 2).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-2xl font-bold text-primary">₹{artist.price.toLocaleString()}</span>
                          <span className="text-muted-foreground text-sm ml-1">per {artist.priceUnit.replace('_', ' ')}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleAddFavorite(artist.id)}
                          >
                            ♡
                          </Button>
                          <Button size="sm" asChild>
                            <Link to={`/artist/${artist.id}`}>
                              View Profile
                            </Link>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!isLoading && !error && artists.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg mb-4">No artists found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  onClick={resetFilters}
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* Pagination */}
            {!isLoading && !error && totalPages > 1 && (
              <div className="flex items-center justify-center space-x-2 mt-12">
                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                >
                  Previous
                </Button>
                <span className="text-sm text-muted-foreground">
                  Page {page} of {totalPages}
                </span>
                <Button 
                  variant="outline" 
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                >
                  Next
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 bg-muted/30">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Are You a Talented Artist?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our community of cultural performers and share your talent with the world
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild>
                <Link to="/join-artist">
                  Join as Artist
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Artists;