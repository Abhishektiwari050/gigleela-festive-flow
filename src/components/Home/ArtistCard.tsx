import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Play, MapPin, Star, Clock } from "lucide-react";

interface ArtistCardProps {
  artist: {
    id: string;
    name: string;
    image: string;
    category: string;
    location: string;
    rating: number;
    reviews: number;
    price: string;
    available: boolean;
    specialties: string[];
    videoPreview?: string;
  };
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <Card className="group overflow-hidden border-0 shadow-md hover:shadow-festival transition-all duration-300 transform hover:-translate-y-2">
      <div className="relative">
        {/* Artist Image */}
        <div className="relative h-48 overflow-hidden">
          <img
            src={artist.image}
            alt={`${artist.name} - ${artist.category} performer`}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          
          {/* Available Status */}
          {artist.available && (
            <div className="absolute top-3 left-3">
              <Badge variant="default" className="bg-green-500 text-white animate-sparkle">
                <Clock className="w-3 h-3 mr-1" />
                Available Now
              </Badge>
            </div>
          )}

          {/* Favorite Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-3 right-3 bg-white/80 hover:bg-white/90 text-gray-700 hover:text-red-500 transition-colors"
          >
            <Heart className="h-4 w-4" />
          </Button>

          {/* Video Preview Button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button size="icon" variant="hero" className="rounded-full w-12 h-12">
              <Play className="h-5 w-5 ml-0.5" />
            </Button>
          </div>

          {/* Price Overlay */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1">
            <span className="text-sm font-semibold text-foreground">₹{artist.price}</span>
          </div>
        </div>

        <CardContent className="p-4">
          {/* Artist Info */}
          <div className="space-y-3">
            <div>
              <h3 className="font-semibold text-lg text-foreground group-hover:text-primary transition-colors">
                {artist.name}
              </h3>
              <p className="text-sm text-muted-foreground">{artist.category}</p>
            </div>

            {/* Location and Rating */}
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center text-muted-foreground">
                <MapPin className="w-4 h-4 mr-1" />
                {artist.location}
              </div>
              <div className="flex items-center">
                <Star className="w-4 h-4 text-yellow-500 fill-current mr-1" />
                <span className="font-medium">{artist.rating}</span>
                <span className="text-muted-foreground ml-1">({artist.reviews})</span>
              </div>
            </div>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2">
              {artist.specialties.slice(0, 2).map((specialty, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="text-xs bg-primary/10 text-primary border-primary/20"
                >
                  {specialty}
                </Badge>
              ))}
              {artist.specialties.length > 2 && (
                <Badge variant="secondary" className="text-xs bg-muted text-muted-foreground">
                  +{artist.specialties.length - 2} more
                </Badge>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1">
                View Profile
              </Button>
              <Button variant="festival" size="sm" className="flex-1">
                Book Now
              </Button>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};

export default ArtistCard;