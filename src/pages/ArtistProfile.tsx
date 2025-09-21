import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { apiClient, Artist, Review } from "@/lib/api";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { 
  Star, 
  Heart, 
  MapPin, 
  Phone, 
  Mail, 
  Calendar, 
  Award,
  ArrowLeft,
  MessageCircle,
  Share2,
  BookmarkPlus
} from "lucide-react";

const ArtistProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artist, setArtist] = useState<any | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    if (id) {
      fetchArtistData();
      checkIfFavorite();
    }
  }, [id]);

  const fetchArtistData = async () => {
    try {
      setLoading(true);
      
      // Sample artist data for demo
      const sampleArtists: any = {
        "1": {
          id: "1",
          name: "Priya Sharma",
          specialty: "Classical Dance",
          category: "Classical Dance",
          location: "Mumbai, Maharashtra",
          rating: 4.9,
          reviews: 45,
          price: 12000,
          availability: "available",
          tags: ["Bharatanatyam", "Kathak", "Cultural Events"],
          image: "/api/placeholder/300/300",
          featured: true,
          bio: "Priya Sharma is a master of classical Indian dance forms with over 15 years of experience in cultural performances. She specializes in Bharatanatyam and Kathak, bringing authentic traditional dance to weddings, festivals, and cultural events. Her graceful movements and deep understanding of classical techniques make her performances truly mesmerizing.",
          contact: { phone: "+91 98765 43210", email: "priya.sharma@example.com" },
          experience: "15+ years",
          eventsCompleted: 200,
          responseTime: "Within 1 hour"
        },
        "2": {
          id: "2",
          name: "Ravi Kumar",
          specialty: "Traditional Music",
          category: "Traditional Music",
          location: "Delhi, NCR",
          rating: 4.8,
          reviews: 38,
          price: 8000,
          availability: "available",
          tags: ["Tabla", "Sitar", "Classical Music"],
          image: "/api/placeholder/300/300",
          featured: true,
          bio: "Ravi Kumar is a renowned tabla and sitar player specializing in classical Indian music performances. With a deep passion for traditional melodies and rhythms, he creates an enchanting musical atmosphere for any event. His expertise spans across various classical ragas and contemporary fusion pieces.",
          contact: { phone: "+91 98765 43211", email: "ravi.kumar@example.com" },
          experience: "12+ years",
          eventsCompleted: 180,
          responseTime: "Within 2 hours"
        },
        "3": {
          id: "3",
          name: "Anita Patel",
          specialty: "Folk Performance",
          category: "Folk Dance",
          location: "Ahmedabad, Gujarat",
          rating: 5.0,
          reviews: 52,
          price: 15000,
          availability: "available",
          tags: ["Garba", "Dandiya", "Folk Dance"],
          image: "/api/placeholder/300/300",
          featured: false,
          bio: "Anita Patel is an expert in Gujarati folk dances and traditional celebration performances. She brings the vibrant energy of Garba and Dandiya to festivals and weddings, creating an authentic cultural experience that connects people with their heritage. Her dynamic performances are a celebration of Gujarat's rich cultural traditions.",
          contact: { phone: "+91 98765 43212", email: "anita.patel@example.com" },
          experience: "10+ years",
          eventsCompleted: 150,
          responseTime: "Within 3 hours"
        },
        "4": {
          id: "4",
          name: "Vikram Singh",
          specialty: "Devotional Music",
          category: "Devotional Music",
          location: "Jaipur, Rajasthan",
          rating: 4.7,
          reviews: 29,
          price: 6000,
          availability: "busy",
          tags: ["Bhajan", "Kirtan", "Spiritual Music"],
          image: "/api/placeholder/300/300",
          featured: false,
          bio: "Vikram Singh is a devoted spiritual singer specializing in bhajans and devotional music performances. His soulful voice and deep spiritual connection create a divine atmosphere at religious gatherings, temples, and spiritual events. He brings peace and devotion to every performance.",
          contact: { phone: "+91 98765 43213", email: "vikram.singh@example.com" },
          experience: "8+ years",
          eventsCompleted: 120,
          responseTime: "Within 4 hours"
        },
        "5": {
          id: "5",
          name: "Meera Nair",
          specialty: "Fusion Performance",
          category: "Fusion Dance",
          location: "Bangalore, Karnataka",
          rating: 4.6,
          reviews: 33,
          price: 20000,
          availability: "available",
          tags: ["Modern Fusion", "Contemporary", "Cultural Fusion"],
          image: "/api/placeholder/300/300",
          featured: true,
          bio: "Meera Nair is a contemporary artist who masterfully blends traditional and modern performance styles. Her innovative fusion performances combine classical Indian dance with contemporary movements, creating a unique and captivating experience for modern audiences while honoring traditional roots.",
          contact: { phone: "+91 98765 43214", email: "meera.nair@example.com" },
          experience: "7+ years",
          eventsCompleted: 100,
          responseTime: "Within 2 hours"
        },
        "6": {
          id: "6",
          name: "Arjun Kapoor",
          specialty: "Instrumental Music",
          category: "Instrumental Music",
          location: "Chennai, Tamil Nadu",
          rating: 4.9,
          reviews: 41,
          price: 10000,
          availability: "available",
          tags: ["Veena", "Flute", "Classical Instrumental"],
          image: "/api/placeholder/300/300",
          featured: false,
          bio: "Arjun Kapoor is a master of traditional Indian instruments with exceptional expertise in veena and flute. His melodious performances showcase the pure essence of classical Indian music, creating an enchanting atmosphere for cultural events, concerts, and spiritual gatherings.",
          contact: { phone: "+91 98765 43215", email: "arjun.kapoor@example.com" },
          experience: "12+ years",
          eventsCompleted: 180,
          responseTime: "Within 1 hour"
        }
      };
      
      const sampleReviews: any = {
        "1": [
          {
            id: "1",
            rating: 5,
            comment: "Priya's performance at our wedding was absolutely magical! Her Bharatanatyam was so graceful and authentic. Highly recommended!",
            client: { name: "Rajesh & Kavya" },
            createdAt: "2024-01-15T10:00:00Z"
          },
          {
            id: "2",
            rating: 5,
            comment: "Amazing performance for our cultural festival. The audience was mesmerized by her dance. Professional and talented!",
            client: { name: "Mumbai Cultural Center" },
            createdAt: "2024-01-10T15:30:00Z"
          },
          {
            id: "3",
            rating: 4,
            comment: "Beautiful classical dance performance. Priya brought such elegance to our event.",
            client: { name: "Sunita Sharma" },
            createdAt: "2024-01-05T12:00:00Z"
          }
        ],
        "2": [
          {
            id: "4",
            rating: 5,
            comment: "Ravi's tabla and sitar performance created the perfect ambiance for our event. Truly skilled musician!",
            client: { name: "Delhi Arts Society" },
            createdAt: "2024-01-12T18:00:00Z"
          },
          {
            id: "5",
            rating: 4,
            comment: "Excellent classical music performance. The guests were thoroughly entertained.",
            client: { name: "Vikram Gupta" },
            createdAt: "2024-01-08T20:00:00Z"
          }
        ],
        "3": [
          {
            id: "6",
            rating: 5,
            comment: "Anita's Garba performance was the highlight of our Navratri celebration! Everyone joined in and had a blast.",
            client: { name: "Gujarat Cultural Association" },
            createdAt: "2024-01-14T19:00:00Z"
          },
          {
            id: "7",
            rating: 5,
            comment: "Perfect for our wedding sangeet! Anita taught everyone the steps and made it so much fun.",
            client: { name: "Amit & Priya Wedding" },
            createdAt: "2024-01-11T16:00:00Z"
          }
        ],
        "4": [
          {
            id: "8",
            rating: 5,
            comment: "Vikram's devotional singing created such a peaceful and spiritual atmosphere. Truly moving performance.",
            client: { name: "Rajasthan Temple Trust" },
            createdAt: "2024-01-13T17:00:00Z"
          },
          {
            id: "9",
            rating: 4,
            comment: "Beautiful bhajans that touched everyone's hearts. Highly recommended for spiritual events.",
            client: { name: "Spiritual Society Jaipur" },
            createdAt: "2024-01-09T14:00:00Z"
          }
        ],
        "5": [
          {
            id: "10",
            rating: 5,
            comment: "Meera's fusion performance was absolutely incredible! A perfect blend of traditional and modern.",
            client: { name: "Bangalore Arts Festival" },
            createdAt: "2024-01-16T20:00:00Z"
          },
          {
            id: "11",
            rating: 4,
            comment: "Innovative and captivating performance. The audience loved the contemporary twist on classical dance.",
            client: { name: "Tech Company Annual Event" },
            createdAt: "2024-01-07T18:30:00Z"
          }
        ],
        "6": [
          {
            id: "12",
            rating: 5,
            comment: "Arjun's veena performance was absolutely mesmerizing. Pure classical music at its finest.",
            client: { name: "Chennai Music Academy" },
            createdAt: "2024-01-15T21:00:00Z"
          },
          {
            id: "13",
            rating: 5,
            comment: "The flute melodies were so beautiful and soothing. Perfect for our cultural gathering.",
            client: { name: "Tamil Cultural Center" },
            createdAt: "2024-01-12T19:00:00Z"
          }
        ]
      };
      
      // Use sample data
      const artistData = sampleArtists[id!];
      const reviewsData = sampleReviews[id!] || [];
      
      if (artistData) {
        setArtist(artistData);
        setReviews(reviewsData);
      } else {
        setArtist(null);
      }
    } catch (error) {
      console.error('Error fetching artist data:', error);
      setArtist(null);
    } finally {
      setLoading(false);
    }
  };

  const checkIfFavorite = async () => {
    if (!user) return;
    try {
      const favoritesResponse = await apiClient.getFavorites().catch(() => []);
      const favorites = Array.isArray(favoritesResponse) ? favoritesResponse : [];
      setIsFavorite(favorites.some((fav: any) => fav.artistId === id));
    } catch (error) {
      console.error('Error checking favorites:', error);
    }
  };

  const handleToggleFavorite = async () => {
    if (!user || !artist) return;
    
    try {
      if (isFavorite) {
        await apiClient.removeFavorite(artist.id).catch(console.error);
        setIsFavorite(false);
      } else {
        await apiClient.addFavorite(artist.id).catch(console.error);
        setIsFavorite(true);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const handleBookNow = () => {
    if (!user) {
      navigate('/signin');
      return;
    }
    navigate(`/booking/${artist?.id}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
        <Header />
        <div className="container mx-auto px-4 py-12 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Artist Not Found</h1>
          <Button onClick={() => navigate('/artists')} variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Artists
          </Button>
        </div>
        <Footer />
      </div>
    );
  }

  const averageRating = reviews.length > 0 
    ? reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length 
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-6"
        >
          <Button 
            onClick={() => navigate(-1)} 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
        </motion.div>

        {/* Artist Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          <div className="relative h-64 bg-gradient-to-r from-purple-600 to-pink-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex items-end gap-6">
                <div className="w-32 h-32 rounded-full bg-white p-1 shadow-lg">
                  <img
                    src={artist.image || '/api/placeholder/128/128'}
                    alt={artist.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
                <div className="text-white pb-4">
                  <h1 className="text-3xl font-bold mb-2">{artist.name}</h1>
                  <div className="flex items-center gap-4 text-sm">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {artist.category}
                    </Badge>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {artist.location}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(averageRating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {averageRating.toFixed(1)} ({reviews.length} reviews)
                  </span>
                </div>
                <div className="text-2xl font-bold text-purple-600">
                  ₹{artist.price || 5000}/event
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleToggleFavorite}
                  className={isFavorite ? 'text-red-600 border-red-600' : ''}
                >
                  <Heart className={`w-4 h-4 mr-2 ${isFavorite ? 'fill-current' : ''}`} />
                  {isFavorite ? 'Saved' : 'Save'}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button onClick={handleBookNow} className="bg-gradient-to-r from-purple-600 to-pink-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Now
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Content Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[600px] mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {artist.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">
                    {artist.bio || "A passionate artist dedicated to bringing cultural performances to life. With years of experience and a deep connection to traditional arts, they create memorable experiences for every event."}
                  </p>
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Specialties
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary">{artist.category}</Badge>
                      <Badge variant="outline">Traditional Dance</Badge>
                      <Badge variant="outline">Cultural Events</Badge>
                      <Badge variant="outline">Festivals</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-semibold">{artist.experience || '5+ years'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Events Completed</span>
                      <span className="font-semibold">{artist.eventsCompleted || '150+'}+</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Response Time</span>
                      <span className="font-semibold">{artist.responseTime || 'Within 2 hours'}</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[...Array(8)].map((_, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden"
                      >
                        <img
                          src={`/api/placeholder/200/200`}
                          alt={`Performance ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Client Reviews</CardTitle>
                </CardHeader>
                <CardContent>
                  {reviews.length > 0 ? (
                    <div className="space-y-6">
                      {reviews.map((review) => (
                        <div key={review.id} className="border-b border-gray-200 last:border-0 pb-6 last:pb-0">
                          <div className="flex items-start gap-4">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
                              {review.client?.name?.charAt(0) || 'U'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-3 mb-2">
                                <h4 className="font-semibold">{review.client?.name || 'Anonymous'}</h4>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < review.rating
                                          ? 'text-yellow-400 fill-current'
                                          : 'text-gray-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                              <p className="text-gray-600">{review.comment}</p>
                              <p className="text-sm text-gray-400 mt-2">
                                {new Date(review.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <MessageCircle className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No reviews yet. Be the first to book and review!</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="contact" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Get in Touch</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-purple-600" />
                    <span>{artist.contact?.phone || '+91 98765 43210'}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-purple-600" />
                    <span>{artist.contact?.email || `${artist.name.toLowerCase().replace(/\s+/g, '.')}@example.com`}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-purple-600" />
                    <span>{artist.location}</span>
                  </div>
                  
                  <div className="pt-4">
                    <Button onClick={handleBookNow} className="w-full bg-gradient-to-r from-purple-600 to-pink-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      Book {artist.name}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default ArtistProfile;