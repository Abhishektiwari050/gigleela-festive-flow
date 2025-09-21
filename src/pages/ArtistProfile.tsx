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
  BookmarkPlus,
  Trophy,
  CheckCircle
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
          specialty: "Classical Dance - Bharatanatyam",
          category: "Classical Dance",
          location: "Mumbai, Maharashtra",
          rating: 4.9,
          reviews: 127,
          price: 25000,
          availability: "available",
          tags: ["Bharatanatyam", "Kathak", "Cultural Events", "Wedding Performances"],
          image: "https://images.unsplash.com/photo-1594736797933-d0b22d09d3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          featured: true,
          bio: "Master of classical Indian dance with 18+ years of experience. Trained under Guru Padma Subrahmanyam, specializing in Bharatanatyam and Kathak. Performed at prestigious venues including Kennedy Center and Lincoln Center. Known for her expressive storytelling through dance and dedication to preserving authentic classical forms.",
          gallery: [
            "https://images.unsplash.com/photo-1594736797933-d0b22d09d3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          ],
          videos: [
            {
              title: "Bharatanatyam - Varnam Performance",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnail: "https://images.unsplash.com/photo-1594736797933-d0b22d09d3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            },
            {
              title: "Kathak Fusion - Contemporary Style",
              url: "https://www.youtube.com/embed/dQw4w9WgXcQ",
              thumbnail: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
            }
          ],
          contact: { 
            phone: "+91 98765 43210", 
            email: "priya.sharma@sanskritiq.in",
            website: "www.priyasharmadance.com",
            socialMedia: {
              instagram: "@priyasharmadance",
              youtube: "PriyaSharmaClassical",
              facebook: "PriyaSharmaClassicalDance"
            }
          },
          experience: "18+ years",
          eventsCompleted: 350,
          responseTime: "Within 2 hours",
          languages: ["Hindi", "English", "Tamil", "Sanskrit"],
          genres: ["Bharatanatyam", "Kathak", "Semi-Classical", "Devotional Dance", "Fusion"],
          achievements: [
            "Kalidas Samman 2020 - Government of Madhya Pradesh",
            "Best Classical Dancer - Mumbai Dance Festival 2019",
            "Featured in Dance India Magazine - Cover Story 2021",
            "Cultural Ambassador - Make in India 2020",
            "Recognized by Ministry of Culture, Government of India",
            "International Cultural Exchange Program - USA 2019"
          ],
          certifications: [
            "Certified Classical Dance Instructor - Bharatiya Vidya Bhavan",
            "Master's Certificate in Bharatanatyam - Kalakshetra Foundation",
            "Cultural Heritage Preservation Certificate - UNESCO"
          ],
          testimonials: [
            {
              name: "Dr. Radhika Menon",
              role: "Director, Cultural Arts Foundation",
              comment: "Priya's performances are nothing short of magical. Her ability to convey emotions through classical dance is unparalleled.",
              rating: 5
            },
            {
              name: "Mr. James Anderson",
              role: "Event Organizer, Lincoln Center",
              comment: "Working with Priya was an absolute pleasure. Her professionalism and artistry elevated our cultural festival.",
              rating: 5
            }
          ],
          education: [
            "Bachelor of Fine Arts in Dance - Bharatiya Vidya Bhavan",
            "Diploma in Bharatanatyam - Kalakshetra Foundation",
            "Advanced Certification in Kathak - Kathak Kendra"
          ],
          specialServices: [
            "Solo Classical Performances",
            "Group Choreography",
            "Wedding Ceremonies",
            "Corporate Events",
            "Cultural Workshops",
            "Dance Training Sessions"
          ],
          equipment: [
            "Professional Sound System",
            "Traditional Costumes",
            "Makeup & Styling",
            "Performance Props",
            "Percussion Ensemble Setup",
            "Traditional Music Library Access"
          ],
          upcomingShows: [
            {
              date: "2024-02-15",
              venue: "National Centre for Performing Arts, Mumbai",
              event: "Classical Dance Festival 2024",
              type: "Solo Performance"
            },
            {
              date: "2024-03-08",
              venue: "Kamani Auditorium, Delhi",
              event: "Women's Day Cultural Celebration",
              type: "Featured Artist"
            }
          ],
          pricing: {
            soloPerformance: "₹25,000 - ₹40,000",
            groupPerformance: "₹45,000 - ₹75,000",
            workshop: "₹15,000 per session",
            corporate: "₹50,000 - ₹1,00,000",
            consultation: "₹5,000 per hour",
            masterclass: "₹20,000 per session"
          },
          packageDeals: [
            {
              name: "Wedding Complete Package",
              description: "Solo performance + Group choreography + Sound system",
              price: "₹75,000",
              duration: "Full day event"
            },
            {
              name: "Corporate Cultural Package",
              description: "Cultural presentation + Workshop + Q&A session",
              price: "₹85,000",
              duration: "Half day program"
            }
          ]
        },
        "2": {
          id: "2",
          name: "Pandit Ravi Shankar Mishra",
          specialty: "Hindustani Classical Music - Sitar",
          category: "Traditional Music",
          location: "Varanasi, Uttar Pradesh",
          rating: 4.8,
          reviews: 89,
          price: 35000,
          availability: "available",
          tags: ["Sitar", "Hindustani Classical", "Ragas", "Spiritual Music"],
          image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
          featured: true,
          bio: "Renowned sitar maestro from the Maihar Gharana tradition. Disciple of late Pt. Ravi Shankar, with 25+ years of dedicated practice. Regular performer at classical music festivals worldwide. His mastery over ragas and spiritual compositions creates a transcendent musical experience.",
          gallery: [
            "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
            "https://images.unsplash.com/photo-1507838153414-b4b713384a76?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
          ],
          contact: { 
            phone: "+91 94567 89012", 
            email: "ravi.mishra@sanskritiq.in",
            website: "www.ravishankarmishra.org",
            socialMedia: {
              instagram: "@panditravimishra",
              youtube: "RaviShankarMishraClassical",
              facebook: "PanditRaviShankarMishra"
            }
          },
          experience: "25+ years",
          eventsCompleted: 280,
          responseTime: "Within 3 hours",
          languages: ["Hindi", "English", "Sanskrit", "Urdu"],
          genres: ["Hindustani Classical", "Dhrupad", "Thumri", "Bhajan", "Meditation Music"],
          achievements: [
            "Sangeet Natak Akademi Award 2018",
            "Ustad Allauddin Khan Award 2017",
            "Featured artist at Darbar Festival London",
            "Cultural Ambassador - Make in India 2019",
            "Awarded by President of India 2020"
          ],
          education: [
            "Gurukul Training under Pt. Ravi Shankar (8 years)",
            "Master's in Indian Classical Music - Banaras Hindu University",
            "Fellowship in Musicology - Sangeet Research Academy"
          ],
          certifications: [
            "All India Radio Grade A Artist",
            "Doordarshan Empanelled Artist",
            "UNESCO Intangible Heritage Ambassador"
          ],
          specialServices: [
            "Solo Sitar Recitals",
            "Spiritual Music Sessions",
            "Wedding Ceremonies",
            "Corporate Meditation Programs",
            "Music Therapy Sessions",
            "Masterclass Workshops"
          ],
          equipment: [
            "Professional Sitar Collection (5 instruments)",
            "Tabla Set for Accompaniment",
            "High-Quality Sound System",
            "Traditional Costumes",
            "Recording Equipment"
          ],
          pricing: {
            soloRecital: "₹35,000 - ₹60,000",
            meditation: "₹20,000 - ₹35,000",
            workshop: "₹25,000 per session",
            corporate: "₹75,000 - ₹1,50,000",
            consultation: "₹8,000 per hour"
          },
          testimonials: [
            {
              name: "Dr. Ashwini Bhide Deshpande",
              role: "Classical Vocalist",
              comment: "Pandit Ravi's sitar playing touches the soul. His deep understanding of ragas creates a meditative atmosphere.",
              rating: 5
            },
            {
              name: "Sarah Williams",
              role: "Music Director, World Music Festival",
              comment: "An extraordinary musician who bridges traditional and contemporary audiences beautifully.",
              rating: 5
            }
          ],
          upcomingShows: [
            {
              date: "2024-02-22",
              venue: "Saptak Music Festival, Ahmedabad",
              event: "Classical Music Night",
              type: "Solo Recital"
            }
          ]
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
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
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
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
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
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
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
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80",
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
            comment: "Priya's Bharatanatyam performance at our daughter's wedding was absolutely mesmerizing. Her grace, technique, and spiritual connection to the dance left all our guests spellbound. The way she incorporated traditional stories into her performance was exceptional. Highly professional and punctual. Would definitely book again!",
            client: { name: "Rajesh Gupta" },
            createdAt: "2024-01-15T10:00:00Z",
            event: "Wedding Ceremony",
            verified: true
          },
          {
            id: "2",
            rating: 5,
            comment: "Outstanding performance at our corporate Diwali celebration. Priya managed to adapt her classical style perfectly for our diverse audience. Her explanation of the cultural significance added educational value. The costume and makeup were authentic and beautiful. Excellent communication throughout the booking process.",
            client: { name: "Anita Sharma - Tech Corp" },
            createdAt: "2024-01-10T15:30:00Z",
            event: "Corporate Event",
            verified: true
          },
          {
            id: "3",
            rating: 5,
            comment: "Priya conducted a workshop for our cultural center. Her teaching methodology is excellent - she breaks down complex movements into understandable steps. Very patient with beginners and inspiring for advanced students. The workshop covered both technical aspects and cultural context beautifully.",
            client: { name: "Dr. Meera Nair - Cultural Center" },
            createdAt: "2024-01-05T12:00:00Z",
            event: "Cultural Workshop",
            verified: true
          },
          {
            id: "4",
            rating: 4,
            comment: "Beautiful Kathak performance at our family function. Priya's expressions and storytelling through dance were captivating. The only minor issue was a slight delay in arrival due to traffic, but she more than made up for it with an extended performance. Very professional and talented artist.",
            client: { name: "Vikram Singh" },
            createdAt: "2023-12-28T18:00:00Z",
            event: "Family Function",
            verified: true
          },
          {
            id: "5",
            rating: 5,
            comment: "Priya has been our go-to artist for major cultural events. Her versatility in both Bharatanatyam and Kathak is remarkable. She always comes well-prepared with authentic costumes and has never disappointed us. A true artist who respects and preserves our cultural heritage. Highly recommended for any cultural event.",
            client: { name: "Cultural Society Mumbai" },
            createdAt: "2023-12-20T16:00:00Z",
            event: "Cultural Festival",
            verified: true
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
                    src={artist.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80'}
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
            <TabsList className="grid w-full grid-cols-6 lg:w-[800px] mx-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
              <TabsTrigger value="contact">Contact</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>About {artist.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-600 leading-relaxed">
                    {artist.bio || "A passionate artist dedicated to bringing cultural performances to life. With years of experience and a deep connection to traditional arts, they create memorable experiences for every event."}
                  </p>
                  
                  {artist.achievements && (
                    <div>
                      <h3 className="font-semibold mb-3 flex items-center gap-2">
                        <Trophy className="h-5 w-5 text-yellow-500" />
                        Achievements & Awards
                      </h3>
                      <ul className="space-y-2">
                        {artist.achievements.slice(0, 3).map((achievement, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-600">{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {artist.languages && (
                    <div>
                      <h3 className="font-semibold mb-3">Languages</h3>
                      <div className="flex flex-wrap gap-2">
                        {artist.languages.map((language, index) => (
                          <Badge key={index} variant="outline">{language}</Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Award className="w-5 h-5 text-purple-600" />
                      Specializations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {artist.genres ? artist.genres.map((genre, index) => (
                        <Badge key={index} variant="secondary">{genre}</Badge>
                      )) : (
                        <>
                          <Badge variant="secondary">{artist.category}</Badge>
                          <Badge variant="outline">Traditional Arts</Badge>
                          <Badge variant="outline">Cultural Events</Badge>
                          <Badge variant="outline">Festivals</Badge>
                        </>
                      )}
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
              
              {artist.specialServices && (
                <Card>
                  <CardHeader>
                    <CardTitle>Services Offered</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {artist.specialServices.map((service, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm">{service}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {artist.pricing && (
                <Card>
                  <CardHeader>
                    <CardTitle>Pricing Options</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {Object.entries(artist.pricing).map(([type, price], index) => (
                        <div key={index} className="p-3 border rounded-lg">
                          <h4 className="font-medium capitalize mb-1">{type.replace(/([A-Z])/g, ' $1').trim()}</h4>
                          <p className="text-primary font-semibold">{String(price)}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {artist.packageDeals && (
                <Card>
                  <CardHeader>
                    <CardTitle>Package Deals</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {artist.packageDeals.map((pkg, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                          <h4 className="font-semibold mb-2">{pkg.name}</h4>
                          <p className="text-sm text-gray-600 mb-3">{pkg.description}</p>
                          <div className="flex justify-between items-center">
                            <span className="text-primary font-bold text-lg">{pkg.price}</span>
                            <span className="text-sm text-gray-500">{pkg.duration}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              
              {artist.upcomingShows && (
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Shows</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {artist.upcomingShows.map((show, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                            <Calendar className="w-6 h-6 text-purple-600" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium">{show.event}</h4>
                            <p className="text-sm text-gray-600">{show.venue}</p>
                            <p className="text-xs text-gray-500">{new Date(show.date).toLocaleDateString()} • {show.type}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="portfolio" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Gallery</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[
                      "https://images.unsplash.com/photo-1534329539061-64caeb388c42?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1594736797933-d0b22d09d3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                      "https://images.unsplash.com/photo-1527928159272-d4d6d5079b95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                    ].map((imageUrl, index) => (
                      <div
                        key={index}
                        className="aspect-square rounded-lg bg-gradient-to-br from-purple-100 to-pink-100 overflow-hidden group cursor-pointer"
                      >
                        <img
                          src={imageUrl}
                          alt={`Performance ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-105 transition-transform group-hover:scale-110 duration-300"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.src = `https://picsum.photos/400/400?random=${index + 100}`;
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="gallery" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Gallery</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {(artist.gallery || [
                        "https://images.unsplash.com/photo-1594736797933-d0b22d09d3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1547036967-23d11aacaee0?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
                        "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      ]).map((imageUrl, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={imageUrl}
                            alt={`Performance ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://picsum.photos/400/400?random=${index + 200}`;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Behind the Scenes</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-4">
                      {[
                        "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        "https://images.unsplash.com/photo-1517164850305-99a3e65bb47e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
                        "https://images.unsplash.com/photo-1527928159272-d4d6d5079b95?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
                      ].map((imageUrl, index) => (
                        <div
                          key={index}
                          className="aspect-square rounded-lg overflow-hidden group cursor-pointer shadow-md hover:shadow-lg transition-shadow"
                        >
                          <img
                            src={imageUrl}
                            alt={`Behind the scenes ${index + 1}`}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://picsum.photos/400/400?random=${index + 300}`;
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Performance Videos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {(artist.videos || [
                      {
                        title: "Classical Performance Highlight",
                        thumbnail: "https://images.unsplash.com/photo-1594736797933-d0b22d09d3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      },
                      {
                        title: "Cultural Festival Performance",
                        thumbnail: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80"
                      }
                    ]).map((video, index) => (
                      <div key={index} className="group cursor-pointer">
                        <div className="aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-purple-100 to-pink-100 relative">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = `https://picsum.photos/600/400?random=${index + 400}`;
                            }}
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                            <div className="w-16 h-16 bg-white bg-opacity-90 rounded-full flex items-center justify-center">
                              <div className="w-0 h-0 border-l-[12px] border-l-purple-600 border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                            </div>
                          </div>
                        </div>
                        <h3 className="font-medium mt-3 text-center">{video.title}</h3>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {artist.testimonials && (
                <Card>
                  <CardHeader>
                    <CardTitle>Client Testimonials</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {artist.testimonials.map((testimonial, index) => (
                        <div key={index} className="p-4 border rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                          <div className="flex items-center gap-2 mb-3">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < testimonial.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 mb-3 italic">"{testimonial.comment}"</p>
                          <div>
                            <p className="font-semibold">{testimonial.name}</p>
                            <p className="text-sm text-gray-500">{testimonial.role}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
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