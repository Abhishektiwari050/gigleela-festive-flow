import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import ArtistCard from "@/components/Home/ArtistCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Star } from "lucide-react";
import { useState } from "react";

const Artists = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { value: "all", label: "All Categories" },
    { value: "classical", label: "Classical Music" },
    { value: "folk", label: "Folk Dance" },
    { value: "devotional", label: "Devotional" },
    { value: "fusion", label: "Fusion" },
    { value: "instrumental", label: "Instrumental" }
  ];

  const artists = [
    {
      name: "Meera Sharma",
      specialty: "Classical Vocal",
      location: "Mumbai, Maharashtra",
      rating: 4.9,
      reviews: 124,
      price: "₹8,000",
      image: "/placeholder.svg",
      availability: "Available",
      featured: true,
      tags: ["Hindustani", "Devotional", "Wedding Specialist"]
    },
    {
      name: "Raj Patel",
      specialty: "Tabla Maestro",
      location: "Delhi, NCR",
      rating: 4.8,
      reviews: 89,
      price: "₹6,500",
      image: "/placeholder.svg",
      availability: "Busy",
      featured: false,
      tags: ["Classical", "Fusion", "Concert Ready"]
    },
    {
      name: "Kavya Reddy",
      specialty: "Bharatanatyam Dancer",
      location: "Chennai, Tamil Nadu",
      rating: 4.9,
      reviews: 156,
      price: "₹12,000",
      image: "/placeholder.svg",
      availability: "Available",
      featured: true,
      tags: ["Traditional", "Temple Dance", "Cultural Events"]
    },
    {
      name: "Arjun Singh",
      specialty: "Folk Singer",
      location: "Jaipur, Rajasthan",
      rating: 4.7,
      reviews: 67,
      price: "₹5,500",
      image: "/placeholder.svg",
      availability: "Available",
      featured: false,
      tags: ["Rajasthani Folk", "Wedding Songs", "Festival Music"]
    },
    {
      name: "Priya Nair",
      specialty: "Veena Artist",
      location: "Kochi, Kerala",
      rating: 4.8,
      reviews: 93,
      price: "₹7,000",
      image: "/placeholder.svg",
      availability: "Available",
      featured: false,
      tags: ["Carnatic", "Meditation Music", "Classical Concerts"]
    },
    {
      name: "Vikram Joshi",
      specialty: "Sitar Virtuoso",
      location: "Varanasi, UP",
      rating: 4.9,
      reviews: 187,
      price: "₹15,000",
      image: "/placeholder.svg",
      availability: "Available",
      featured: true,
      tags: ["Raga Master", "Spiritual Music", "International Performer"]
    }
  ];

  const filteredArtists = artists.filter(artist => {
    const matchesSearch = artist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         artist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           artist.tags.some(tag => tag.toLowerCase().includes(selectedCategory));
    return matchesSearch && matchesCategory;
  });

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
              <Button size="lg" variant="secondary">
                Join as Artist
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-primary">
                How It Works
              </Button>
            </div>
          </div>
        </section>

        {/* Search & Filters */}
        <section className="py-8 px-4 border-b">
          <div className="container mx-auto">
            <div className="flex flex-col lg:flex-row gap-4 items-center">
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
              <Button variant="outline" size="icon">
                <Filter className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Artists Grid */}
        <section className="py-12 px-4">
          <div className="container mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold mb-2">
                  {filteredArtists.length} Artists Found
                </h2>
                <p className="text-muted-foreground">
                  Authentic performers ready to bring culture to your events
                </p>
              </div>
              <Select defaultValue="featured">
                <SelectTrigger className="w-48">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured First</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="reviews">Most Reviews</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredArtists.map((artist, index) => (
                <div key={index} className="group">
                  <div className="bg-card rounded-lg border p-6 hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
                    {artist.featured && (
                      <Badge className="mb-4 bg-primary text-primary-foreground">
                        Featured Artist
                      </Badge>
                    )}
                    
                    <div className="flex items-center space-x-4 mb-4">
                      <div className="w-16 h-16 bg-gradient-festival rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-xl">
                          {artist.name.split(' ').map(n => n[0]).join('')}
                        </span>
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
                      <Badge variant={artist.availability === "Available" ? "default" : "secondary"}>
                        {artist.availability}
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
                        <span className="text-2xl font-bold text-primary">{artist.price}</span>
                        <span className="text-muted-foreground text-sm ml-1">per event</span>
                      </div>
                      <Button size="sm">
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filteredArtists.length === 0 && (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">No artists found matching your criteria.</p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSearchTerm("");
                    setSelectedCategory("all");
                  }}
                >
                  Clear Filters
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
              <Button size="lg">
                Join as Artist
              </Button>
              <Button size="lg" variant="outline">
                Learn More
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


const handleAddFavorite = (artistId: string) => {
  toast({ title: "Added to favorites!", description: `Artist ${artistId} added.` });
  // Add favorite logic here
};

<Button onClick={() => handleAddFavorite(artist.id)}>Add to Favorites</Button>