import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { apiClient, Artist } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { 
  Search as SearchIcon, 
  Filter, 
  MapPin, 
  Star, 
  Loader2, 
  Users, 
  Music, 
  Calendar,
  TrendingUp,
  Clock,
  Heart
} from "lucide-react";
import { motion } from "framer-motion";

const Search = () => {
  const { toast } = useToast();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || 'all');
  const [selectedLocation, setSelectedLocation] = useState(searchParams.get('location') || 'all');
  const [priceRange, setPriceRange] = useState(searchParams.get('price') || 'all');
  const [availability, setAvailability] = useState(searchParams.get('availability') || 'all');
  const [sortBy, setSortBy] = useState(searchParams.get('sort') || 'relevance');
  const [activeTab, setActiveTab] = useState('artists');
  
  const [artists, setArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasSearched, setHasSearched] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  
  const categories = [
    { value: 'all', label: 'All Categories' },
    { value: 'music', label: 'Music' },
    { value: 'dance', label: 'Dance' },
    { value: 'classical', label: 'Classical' },
    { value: 'folk', label: 'Folk' },
    { value: 'fusion', label: 'Fusion' },
    { value: 'instrumental', label: 'Instrumental' }
  ];
  
  const locations = [
    { value: 'all', label: 'All Locations' },
    { value: 'mumbai', label: 'Mumbai' },
    { value: 'delhi', label: 'Delhi' },
    { value: 'bangalore', label: 'Bangalore' },
    { value: 'chennai', label: 'Chennai' },
    { value: 'kolkata', label: 'Kolkata' },
    { value: 'pune', label: 'Pune' }
  ];
  
  const priceRanges = [
    { value: 'all', label: 'Any Price' },
    { value: '0-10000', label: 'Under ₹10,000' },
    { value: '10000-25000', label: '₹10,000 - ₹25,000' },
    { value: '25000-50000', label: '₹25,000 - ₹50,000' },
    { value: '50000+', label: 'Above ₹50,000' }
  ];
  
  const popularSearches = [
    'Classical Singer',
    'Bharatanatyam Dancer', 
    'Tabla Player',
    'Wedding Musicians',
    'Folk Artists',
    'Sitar Masters'
  ];
  
  // Search function
  const performSearch = async () => {
    if (!searchQuery.trim() && selectedCategory === 'all') {
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      setHasSearched(true);
      
      const params: any = {
        limit: 20,
        sortBy: sortBy === 'relevance' ? 'rating' : sortBy,
        sortOrder: sortBy === 'price' ? 'asc' : 'desc'
      };
      
      if (searchQuery.trim()) {
        params.search = searchQuery.trim();
      }
      
      if (selectedCategory !== 'all') {
        params.category = selectedCategory;
      }
      
      if (selectedLocation !== 'all') {
        params.location = selectedLocation;
      }
      
      if (availability !== 'all') {
        params.availability = availability;
      }
      
      if (priceRange !== 'all') {
        const [min, max] = priceRange.split('-');
        if (min) params.minPrice = parseInt(min);
        if (max && max !== '+') params.maxPrice = parseInt(max);
      }
      
      // Update URL params
      const newParams = new URLSearchParams();
      if (searchQuery.trim()) newParams.set('q', searchQuery.trim());
      if (selectedCategory !== 'all') newParams.set('category', selectedCategory);
      if (selectedLocation !== 'all') newParams.set('location', selectedLocation);
      if (priceRange !== 'all') newParams.set('price', priceRange);
      if (availability !== 'all') newParams.set('availability', availability);
      if (sortBy !== 'relevance') newParams.set('sort', sortBy);
      
      setSearchParams(newParams);
      
      const response = await apiClient.getArtists(params);
      
      if (response.success && response.data) {
        setArtists(response.data.artists);
        setTotalResults(response.data.pagination.total);
      } else {
        throw new Error(response.message || 'Search failed');
      }
    } catch (error: any) {
      console.error('Search error:', error);
      setError(error.message || 'Search failed');
      setArtists([]);
      setTotalResults(0);
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle search form submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };
  
  // Handle popular search clicks
  const handlePopularSearch = (term: string) => {
    setSearchQuery(term);
    setSelectedCategory('all');
    setTimeout(() => performSearch(), 100);
  };
  
  // Add to favorites
  const handleAddFavorite = async (artistId: string) => {
    if (!isAuthenticated || !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to add artists to favorites",
        variant: "destructive"
      });
      return;
    }
    
    try {
      await apiClient.addFavorite(artistId);
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
  
  // Initial search if URL has params
  useEffect(() => {
    const initialQuery = searchParams.get('q');
    const initialCategory = searchParams.get('category');
    
    if (initialQuery || initialCategory) {
      setSearchQuery(initialQuery || '');
      setSelectedCategory(initialCategory || 'all');
      performSearch();
    }
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        {/* Hero Search Section */}
        <section className="relative py-16 px-4 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
              alt="Indian musical instruments and culture background"
              className="w-full h-full object-cover"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80";
              }}
            />
          </div>
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-900/80 via-purple-900/70 to-blue-900/80"></div>
          <div className="absolute inset-0 bg-festival-pattern opacity-10"></div>
          <div className="container mx-auto relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-8"
            >
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Find Perfect Artists
              </h1>
              <p className="text-xl text-white/90 max-w-2xl mx-auto">
                Discover talented performers for your events across India
              </p>
            </motion.div>
            
            {/* Main Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="max-w-4xl mx-auto"
            >
              <Card className="p-6 shadow-2xl">
                <form onSubmit={handleSearch} className="space-y-6">
                  {/* Search Input */}
                  <div className="relative">
                    <SearchIcon className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Search for artists, specialties, instruments..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 text-lg h-14 border-2 focus:border-primary"
                    />
                  </div>
                  
                  {/* Filters */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger>
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((cat) => (
                          <SelectItem key={cat.value} value={cat.value}>
                            {cat.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={selectedLocation} onValueChange={setSelectedLocation}>
                      <SelectTrigger>
                        <SelectValue placeholder="Location" />
                      </SelectTrigger>
                      <SelectContent>
                        {locations.map((loc) => (
                          <SelectItem key={loc.value} value={loc.value}>
                            {loc.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={priceRange} onValueChange={setPriceRange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Price Range" />
                      </SelectTrigger>
                      <SelectContent>
                        {priceRanges.map((range) => (
                          <SelectItem key={range.value} value={range.value}>
                            {range.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    
                    <Select value={availability} onValueChange={setAvailability}>
                      <SelectTrigger>
                        <SelectValue placeholder="Availability" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Any Availability</SelectItem>
                        <SelectItem value="available">Available Now</SelectItem>
                        <SelectItem value="busy">Busy</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="flex justify-center">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="px-12"
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Searching...
                        </>
                      ) : (
                        <>
                          <SearchIcon className="h-4 w-4 mr-2" />
                          Search Artists
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </Card>
            </motion.div>
          </div>
        </section>
        
        {/* Popular Searches & Results */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            {!hasSearched && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center mb-12"
              >
                <h2 className="text-2xl font-bold mb-6">Popular Searches</h2>
                <div className="flex flex-wrap justify-center gap-3">
                  {popularSearches.map((term) => (
                    <Badge 
                      key={term}
                      variant="outline" 
                      className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors px-4 py-2 text-sm"
                      onClick={() => handlePopularSearch(term)}
                    >
                      <TrendingUp className="h-3 w-3 mr-1" />
                      {term}
                    </Badge>
                  ))}
                </div>
              </motion.div>
            )}
            
            {/* Search Results */}
            {hasSearched && (
              <div>
                {/* Results Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold mb-2">
                      {isLoading ? 'Searching...' : `${totalResults} Artists Found`}
                    </h2>
                    {searchQuery && (
                      <p className="text-muted-foreground">
                        Results for "{searchQuery}"
                      </p>
                    )}
                  </div>
                  
                  {!isLoading && totalResults > 0 && (
                    <Select value={sortBy} onValueChange={setSortBy}>
                      <SelectTrigger className="w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="relevance">Most Relevant</SelectItem>
                        <SelectItem value="rating">Highest Rated</SelectItem>
                        <SelectItem value="price">Price: Low to High</SelectItem>
                        <SelectItem value="reviews">Most Reviews</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                </div>
                
                {/* Loading State */}
                {isLoading && (
                  <div className="flex items-center justify-center py-16">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <span className="ml-2 text-muted-foreground">Searching artists...</span>
                  </div>
                )}
                
                {/* Error State */}
                {error && (
                  <div className="text-center py-16">
                    <p className="text-destructive text-lg mb-4">{error}</p>
                    <Button onClick={performSearch}>
                      Try Again
                    </Button>
                  </div>
                )}
                
                {/* Results Grid */}
                {!isLoading && !error && artists.length > 0 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {artists.map((artist, index) => (
                      <motion.div
                        key={artist.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <Card className="overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                          <div className="aspect-video bg-gradient-festival flex items-center justify-center overflow-hidden relative">
                            {artist.image && artist.image !== '/placeholder.svg' ? (
                              <img 
                                src={artist.image} 
                                alt={artist.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <span className="text-white font-bold text-4xl">
                                {artist.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            )}
                            
                            {/* Featured Badge */}
                            {artist.featured && (
                              <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground">
                                Featured
                              </Badge>
                            )}
                            
                            {/* Availability Badge */}
                            <Badge 
                              variant={artist.availability === 'available' ? 'default' : 'secondary'}
                              className="absolute top-3 right-3"
                            >
                              <Clock className="h-3 w-3 mr-1" />
                              {artist.availability.charAt(0).toUpperCase() + artist.availability.slice(1)}
                            </Badge>
                          </div>
                          
                          <CardContent className="p-6">
                            <div className="mb-4">
                              <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
                              <p className="text-muted-foreground">{artist.specialty}</p>
                              <div className="flex items-center text-sm text-muted-foreground mt-1">
                                <MapPin className="h-3 w-3 mr-1" />
                                {artist.location}
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
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mb-4">
                              {artist.tags.slice(0, 2).map((tag, idx) => (
                                <Badge key={idx} variant="outline" className="text-xs">
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div>
                                <span className="text-xl font-bold text-primary">
                                  ₹{artist.price.toLocaleString()}
                                </span>
                                <span className="text-muted-foreground text-xs ml-1">
                                  per {artist.priceUnit.replace('_', ' ')}
                                </span>
                              </div>
                              <div className="flex gap-2">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  onClick={() => handleAddFavorite(artist.id)}
                                >
                                  <Heart className="h-4 w-4" />
                                </Button>
                                <Button 
                                  size="sm"
                                  onClick={() => navigate(`/artists/${artist.id}`)}
                                >
                                  View Profile
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
                
                {/* No Results */}
                {!isLoading && !error && hasSearched && artists.length === 0 && (
                  <div className="text-center py-16">
                    <div className="text-6xl mb-4">🔍</div>
                    <h3 className="text-xl font-semibold mb-2">No artists found</h3>
                    <p className="text-muted-foreground mb-6">
                      Try adjusting your search criteria or browse our featured artists
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedCategory('all');
                          setSelectedLocation('all');
                          setPriceRange('all');
                          setAvailability('all');
                          setHasSearched(false);
                          setSearchParams({});
                        }}
                      >
                        Clear Filters
                      </Button>
                      <Button onClick={() => navigate('/artists')}>
                        Browse All Artists
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Search;