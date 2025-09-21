import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";
import { apiClient, Favorite } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Heart, Star, MapPin, Loader2, Trash2 } from "lucide-react";

const Favorites = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const { toast } = useToast();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!isAuthenticated || !user) {
      setIsLoading(false);
      return;
    }

    const fetchFavorites = async () => {
      try {
        setIsLoading(true);
        const response = await apiClient.getFavorites(user.id);
        
        if (response.success && response.data) {
          setFavorites(response.data.favorites);
        } else {
          throw new Error(response.message || 'Failed to fetch favorites');
        }
      } catch (error: any) {
        console.error('Error fetching favorites:', error);
        setError(error.message || 'Failed to load favorites');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [isAuthenticated, user]);

  const handleRemoveFavorite = async (artistId: string) => {
    if (!user) return;
    
    try {
      await apiClient.removeFromFavorites(user.id, artistId);
      setFavorites(favorites.filter(fav => fav.artistId !== artistId));
      toast({
        title: "Removed from favorites",
        description: "Artist has been removed from your favorites"
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to remove from favorites",
        variant: "destructive"
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main>
          <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
            <Card className="w-full max-w-xl shadow-lg">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-center mb-2">Sign In Required</CardTitle>
                <p className="text-muted-foreground text-center">
                  Please sign in to view your favorite artists
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Button onClick={() => navigate("/signin")}>
                    Sign In
                  </Button>
                </div>
              </CardContent>
            </Card>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold mb-2">My Favorites</h1>
            <p className="text-muted-foreground">
              Your saved artists for easy access
            </p>
          </div>

          {isLoading && (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin" />
              <span className="ml-2 text-muted-foreground">Loading favorites...</span>
            </div>
          )}

          {error && (
            <div className="text-center py-16">
              <p className="text-destructive text-lg mb-4">{error}</p>
              <Button onClick={() => window.location.reload()}>
                Try Again
              </Button>
            </div>
          )}

          {!isLoading && !error && favorites.length === 0 && (
            <Card className="w-full max-w-xl mx-auto">
              <CardHeader>
                <CardTitle className="text-center mb-2">
                  <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
                  No Favorites Yet
                </CardTitle>
                <p className="text-muted-foreground text-center">
                  Start exploring and save your favorite artists
                </p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-center">
                  <Button onClick={() => navigate("/artists")}>
                    Browse Artists
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {!isLoading && !error && favorites.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((favorite) => {
                const artist = favorite.artist;
                if (!artist) return null;
                
                return (
                  <Card key={favorite.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-gradient-festival flex items-center justify-center overflow-hidden">
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
                    </div>
                    
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-1">{artist.name}</h3>
                          <p className="text-muted-foreground text-sm">{artist.specialty}</p>
                          <div className="flex items-center text-sm text-muted-foreground mt-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            {artist.location}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleRemoveFavorite(artist.id)}
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="ml-1 font-medium text-sm">{artist.rating}</span>
                          <span className="text-muted-foreground text-xs ml-1">
                            ({artist.reviews} reviews)
                          </span>
                        </div>
                        <Badge variant={artist.availability === "available" ? "default" : "secondary"}>
                          {artist.availability.charAt(0).toUpperCase() + artist.availability.slice(1)}
                        </Badge>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-4">
                        {artist.tags.slice(0, 3).map((tag, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-xl font-bold text-primary">₹{artist.price.toLocaleString()}</span>
                          <span className="text-muted-foreground text-xs ml-1">per {artist.priceUnit.replace('_', ' ')}</span>
                        </div>
                        <Button size="sm" onClick={() => navigate(`/artists/${artist.id}`)}>
                          View Profile
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favorites;