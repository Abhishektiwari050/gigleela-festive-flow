import ArtistCard from "./ArtistCard";
import { useState, useEffect } from "react";
import { apiClient, Artist } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ArtistsShowcase = () => {
  const [featuredArtists, setFeaturedArtists] = useState<Artist[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFeaturedArtists = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getArtists({
          featured: true,
          limit: 6,
          sortBy: 'rating',
          sortOrder: 'desc'
        });
        
        if (response.success && response.data) {
          // Transform API data to match the expected format for ArtistCard
          const transformedArtists = response.data.artists.map(artist => ({
            id: artist.id,
            name: artist.name,
            image: artist.image,
            category: artist.specialty,
            location: artist.location,
            rating: artist.rating,
            reviews: artist.reviews,
            price: artist.price.toLocaleString(),
            available: artist.availability === 'available',
            specialties: artist.tags
          }));
          setFeaturedArtists(transformedArtists as any);
        } else {
          throw new Error(response.message || 'Failed to fetch artists');
        }
      } catch (error: any) {
        console.error('Error fetching featured artists:', error);
        setError(error.message || 'Failed to load featured artists');
        // Fallback to empty array if API fails
        setFeaturedArtists([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFeaturedArtists();
  }, []);
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Heritage
            <span className="text-festival-gradient"> Artists</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover master performers preserving India's rich cultural traditions. 
            From classical ragas to folk dances, connect with authentic artistry.
          </p>
        </div>

        {/* Artists Grid */}
        {isLoading && (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="ml-2 text-muted-foreground">Loading featured artists...</span>
          </div>
        )}

        {error && (
          <div className="text-center py-16">
            <p className="text-destructive mb-4">{error}</p>
            <Button 
              variant="outline" 
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
          </div>
        )}

        {!isLoading && !error && featuredArtists.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredArtists.map((artist, index) => (
              <div 
                key={artist.id} 
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <ArtistCard artist={artist} />
              </div>
            ))}
          </div>
        )}

        {!isLoading && !error && featuredArtists.length === 0 && (
          <div className="text-center py-16">
            <p className="text-muted-foreground mb-4">No featured artists available at the moment.</p>
            <Button 
              variant="outline" 
              onClick={() => navigate('/artists')}
            >
              Browse All Artists
            </Button>
          </div>
        )}

        {/* Browse More CTA */}
        {!isLoading && !error && (
          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">
              Showing {featuredArtists.length} featured artists
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button 
                className="text-primary font-medium hover:text-primary/80 transition-colors underline underline-offset-4"
                onClick={() => navigate('/artists')}
              >
                Browse All Artists
              </button>
              <span className="text-muted-foreground hidden sm:block">•</span>
              <button 
                className="text-primary font-medium hover:text-primary/80 transition-colors underline underline-offset-4"
                onClick={() => navigate('/artists?category=classical')}
              >
                Filter by Category
              </button>
              <span className="text-muted-foreground hidden sm:block">•</span>
              <button 
                className="text-primary font-medium hover:text-primary/80 transition-colors underline underline-offset-4"
                onClick={() => navigate('/artists?availability=available')}
              >
                Available Now Only
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ArtistsShowcase;