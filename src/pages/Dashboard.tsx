import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { apiClient, Booking, Artist } from "@/lib/api";
import { motion } from "framer-motion";
import { 
  BarChart3, 
  Calendar, 
  DollarSign, 
  Users, 
  Star, 
  TrendingUp,
  Clock,
  MapPin,
  Phone,
  Mail,
  CheckCircle,
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  Eye
} from "lucide-react";

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [artistData, setArtistData] = useState<Artist | null>(null);
  const [activeTab, setActiveTab] = useState("overview");

  // Mock stats - replace with real data from API
  const [stats, setStats] = useState({
    totalBookings: 0,
    completedEvents: 0,
    totalEarnings: 0,
    averageRating: 4.8,
    pendingRequests: 0,
    upcomingEvents: 0
  });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    fetchDashboardData();
  }, [user, navigate]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      if (user?.role === 'artist') {
        // Fetch artist-specific data
        const [artistProfile, artistBookings] = await Promise.all([
          apiClient.getArtist(user.id),
          apiClient.getArtistBookings(user.id)
        ]);
        setArtistData(artistProfile);
        setBookings(artistBookings);
        
        // Calculate stats
        const completed = artistBookings.filter(b => b.status === 'completed').length;
        const pending = artistBookings.filter(b => b.status === 'pending').length;
        const upcoming = artistBookings.filter(b => 
          b.status === 'confirmed' && new Date(b.eventDate) > new Date()
        ).length;
        const totalEarnings = artistBookings
          .filter(b => b.status === 'completed')
          .reduce((sum, b) => sum + (b.amount || 0), 0);
        
        setStats({
          totalBookings: artistBookings.length,
          completedEvents: completed,
          totalEarnings,
          averageRating: 4.8, // Mock rating
          pendingRequests: pending,
          upcomingEvents: upcoming
        });
      } else {
        // Fetch client-specific data
        const userBookings = await apiClient.getUserBookings();
        setBookings(userBookings);
        
        const completed = userBookings.filter(b => b.status === 'completed').length;
        const pending = userBookings.filter(b => b.status === 'pending').length;
        const upcoming = userBookings.filter(b => 
          b.status === 'confirmed' && new Date(b.eventDate) > new Date()
        ).length;
        
        setStats({
          totalBookings: userBookings.length,
          completedEvents: completed,
          totalEarnings: 0, // Not applicable for clients
          averageRating: 0, // Not applicable for clients
          pendingRequests: pending,
          upcomingEvents: upcoming
        });
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingAction = async (bookingId: string, action: 'confirm' | 'reject') => {
    try {
      // Mock API call - replace with actual implementation
      console.log(`${action} booking:`, bookingId);
      
      // Update local state
      setBookings(prev => prev.map(booking => 
        booking.id === bookingId 
          ? { ...booking, status: action === 'confirm' ? 'confirmed' : 'cancelled' }
          : booking
      ));
      
      // Refresh stats
      fetchDashboardData();
    } catch (error) {
      console.error(`Error ${action}ing booking:`, error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="w-4 h-4" />;
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Welcome back, {user?.name}!
              </h1>
              <p className="text-gray-600">
                {user?.role === 'artist' 
                  ? 'Manage your bookings and profile' 
                  : 'Track your events and bookings'
                }
              </p>
            </div>
            {user?.role === 'artist' && (
              <Button 
                onClick={() => navigate('/profile')} 
                className="bg-gradient-to-r from-purple-600 to-pink-600"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </motion.div>

        {/* Stats Overview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Bookings</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <Calendar className="w-8 h-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    {user?.role === 'artist' ? 'Completed Events' : 'Events Attended'}
                  </p>
                  <p className="text-2xl font-bold">{stats.completedEvents}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          {user?.role === 'artist' ? (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Earnings</p>
                      <p className="text-2xl font-bold">₹{stats.totalEarnings.toLocaleString()}</p>
                    </div>
                    <DollarSign className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Average Rating</p>
                      <p className="text-2xl font-bold">{stats.averageRating}</p>
                    </div>
                    <Star className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </>
          ) : (
            <>
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Upcoming Events</p>
                      <p className="text-2xl font-bold">{stats.upcomingEvents}</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-blue-600" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Pending Requests</p>
                      <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                    </div>
                    <Clock className="w-8 h-8 text-yellow-600" />
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                {/* Recent Bookings */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Bookings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    {bookings.slice(0, 5).length > 0 ? (
                      <div className="space-y-4">
                        {bookings.slice(0, 5).map((booking) => (
                          <div key={booking.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                            <div className="flex-1">
                              <h4 className="font-semibold text-sm">
                                {user?.role === 'artist' ? booking.clientName : booking.artistName}
                              </h4>
                              <p className="text-xs text-gray-600">
                                {new Date(booking.eventDate).toLocaleDateString()} • {booking.eventLocation}
                              </p>
                            </div>
                            <Badge className={getStatusColor(booking.status)}>
                              {booking.status}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8 text-gray-500">
                        <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                        <p>No bookings yet</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {user?.role === 'artist' ? (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/profile')}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Update Profile
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => setActiveTab('bookings')}
                        >
                          <Calendar className="w-4 h-4 mr-2" />
                          View All Bookings
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/artists')}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View My Public Profile
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/artists')}
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Book New Artist
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/search')}
                        >
                          <Users className="w-4 h-4 mr-2" />
                          Browse Artists
                        </Button>
                        <Button 
                          variant="outline" 
                          className="w-full justify-start"
                          onClick={() => navigate('/profile')}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Upcoming Events */}
              <Card>
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.filter(b => 
                    b.status === 'confirmed' && new Date(b.eventDate) > new Date()
                  ).length > 0 ? (
                    <div className="space-y-4">
                      {bookings
                        .filter(b => b.status === 'confirmed' && new Date(b.eventDate) > new Date())
                        .slice(0, 3)
                        .map((booking) => (
                          <div key={booking.id} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-3">
                              <h4 className="font-semibold">
                                {user?.role === 'artist' ? booking.clientName : booking.artistName}
                              </h4>
                              <Badge className="bg-green-100 text-green-800">
                                {new Date(booking.eventDate).toLocaleDateString()}
                              </Badge>
                            </div>
                            <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4" />
                                {booking.eventLocation}
                              </div>
                              <div className="flex items-center gap-2">
                                <DollarSign className="w-4 h-4" />
                                ₹{booking.amount}
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                      <p>No upcoming events</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Bookings Tab */}
            <TabsContent value="bookings" className="space-y-6">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>All Bookings</CardTitle>
                    {user?.role === 'client' && (
                      <Button 
                        onClick={() => navigate('/artists')}
                        className="bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        New Booking
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <div key={booking.id} className="border rounded-lg p-4">
                          <div className="flex items-center justify-between mb-4">
                            <div>
                              <h4 className="font-semibold">
                                {user?.role === 'artist' ? booking.clientName : booking.artistName}
                              </h4>
                              <p className="text-sm text-gray-600">
                                {new Date(booking.eventDate).toLocaleDateString()} • {booking.eventLocation}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <Badge className={getStatusColor(booking.status)}>
                                {getStatusIcon(booking.status)}
                                <span className="ml-1">{booking.status}</span>
                              </Badge>
                              {user?.role === 'artist' && booking.status === 'pending' && (
                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    onClick={() => handleBookingAction(booking.id, 'confirm')}
                                    className="bg-green-600 hover:bg-green-700"
                                  >
                                    Accept
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleBookingAction(booking.id, 'reject')}
                                    className="border-red-600 text-red-600 hover:bg-red-50"
                                  >
                                    Decline
                                  </Button>
                                </div>
                              )}
                            </div>
                          </div>
                          
                          <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-600">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(booking.eventDate).toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {booking.eventLocation}
                            </div>
                            <div className="flex items-center gap-2">
                              <DollarSign className="w-4 h-4" />
                              ₹{booking.amount}
                            </div>
                          </div>
                          
                          {booking.notes && (
                            <p className="mt-3 text-sm text-gray-600 bg-gray-50 p-3 rounded">
                              <strong>Notes:</strong> {booking.notes}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 text-gray-500">
                      <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                      <p className="mb-4">
                        {user?.role === 'artist' 
                          ? 'Your booking requests will appear here' 
                          : 'Start exploring artists to make your first booking'
                        }
                      </p>
                      {user?.role === 'client' && (
                        <Button 
                          onClick={() => navigate('/artists')}
                          className="bg-gradient-to-r from-purple-600 to-pink-600"
                        >
                          Browse Artists
                        </Button>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="space-y-6">
              <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="w-5 h-5" />
                      Booking Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-12 text-gray-500">
                      <BarChart3 className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p>Analytics coming soon...</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="w-5 h-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Response Rate</span>
                        <span className="font-semibold">95%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Completion Rate</span>
                        <span className="font-semibold">98%</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Average Rating</span>
                        <span className="font-semibold">{stats.averageRating}/5</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Repeat Clients</span>
                        <span className="font-semibold">25%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;