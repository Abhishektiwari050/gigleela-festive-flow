import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, Artist } from "@/lib/api";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  Phone, 
  Mail, 
  CreditCard, 
  CheckCircle,
  ArrowLeft,
  Star,
  AlertCircle
} from "lucide-react";

const BookingPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [artist, setArtist] = useState<Artist | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state
  const [bookingData, setBookingData] = useState({
    eventDate: '',
    eventTime: '',
    eventDuration: '2',
    eventLocation: '',
    eventType: '',
    guestCount: '',
    specialRequests: '',
    contactName: user?.name || '',
    contactPhone: user?.phone || '',
    contactEmail: user?.email || '',
    budget: ''
  });

  useEffect(() => {
    if (!user) {
      navigate('/signin');
      return;
    }
    
    if (id) {
      fetchArtistData();
    }
  }, [id, user, navigate]);

  const fetchArtistData = async () => {
    try {
      setLoading(true);
      const artistData = await apiClient.getArtist(id!);
      const artistInfo = artistData.data?.artist || artistData;
      setArtist(artistInfo);
      setBookingData(prev => ({
        ...prev,
        budget: artistInfo.price?.toString() || ''
      }));
    } catch (error) {
      console.error('Error fetching artist:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setBookingData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return bookingData.eventDate && 
               bookingData.eventTime && 
               bookingData.eventLocation && 
               bookingData.eventType;
      case 2:
        return bookingData.contactName && 
               bookingData.contactPhone && 
               bookingData.contactEmail;
      case 3:
        return true; // Review step
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!artist) return;
    
    setSubmitting(true);
    try {
      const bookingRequest = {
        artistId: artist.id,
        ...bookingData,
        amount: parseFloat(bookingData.budget),
        status: 'pending'
      };
      
      // Mock API call - replace with actual implementation
      console.log('Booking request:', bookingRequest);
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Redirect to success page or dashboard
      navigate('/profile?tab=bookings');
    } catch (error) {
      console.error('Error submitting booking:', error);
      alert('Failed to submit booking request. Please try again.');
    } finally {
      setSubmitting(false);
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
            onClick={() => navigate(`/artist/${artist.id}`)} 
            variant="ghost" 
            className="text-purple-600 hover:text-purple-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Artist Profile
          </Button>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Artist Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-6">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <img
                    src={artist.image || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'}
                    alt={artist.name}
                    className="w-20 h-20 rounded-full mx-auto mb-3 object-cover"
                  />
                  <h2 className="text-xl font-bold">{artist.name}</h2>
                  <Badge variant="secondary" className="mt-2">{artist.category}</Badge>
                </div>
                
                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-purple-600" />
                    <span>{artist.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-500" />
                    <span>4.8 (120 reviews)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4 text-purple-600" />
                    <span>₹{artist.price}/event</span>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <h3 className="font-semibold mb-2">What's Included:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Performance setup</li>
                    <li>• Traditional costumes</li>
                    <li>• Sound equipment (if needed)</li>
                    <li>• Travel within city limits</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Book {artist.name}
                </CardTitle>
                
                {/* Progress Steps */}
                <div className="flex items-center gap-4 mt-4">
                  {[1, 2, 3].map((step) => (
                    <div
                      key={step}
                      className={`flex items-center ${step < 3 ? 'flex-1' : ''}`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                          currentStep >= step
                            ? 'bg-purple-600 text-white'
                            : 'bg-gray-200 text-gray-600'
                        }`}
                      >
                        {currentStep > step ? <CheckCircle className="w-4 h-4" /> : step}
                      </div>
                      {step < 3 && (
                        <div
                          className={`flex-1 h-0.5 mx-2 ${
                            currentStep > step ? 'bg-purple-600' : 'bg-gray-200'
                          }`}
                        />
                      )}
                    </div>
                  ))}
                </div>
                
                <div className="flex justify-between text-sm text-gray-600 mt-2">
                  <span>Event Details</span>
                  <span>Contact Info</span>
                  <span>Review & Book</span>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                {/* Step 1: Event Details */}
                {currentStep === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">Event Details</h3>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDate">Event Date *</Label>
                        <Input
                          id="eventDate"
                          type="date"
                          value={bookingData.eventDate}
                          onChange={(e) => handleInputChange('eventDate', e.target.value)}
                          min={new Date().toISOString().split('T')[0]}
                        />
                      </div>
                      <div>
                        <Label htmlFor="eventTime">Event Time *</Label>
                        <Input
                          id="eventTime"
                          type="time"
                          value={bookingData.eventTime}
                          onChange={(e) => handleInputChange('eventTime', e.target.value)}
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="eventDuration">Duration (hours)</Label>
                        <Select value={bookingData.eventDuration} onValueChange={(value) => handleInputChange('eventDuration', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 hour</SelectItem>
                            <SelectItem value="2">2 hours</SelectItem>
                            <SelectItem value="3">3 hours</SelectItem>
                            <SelectItem value="4">4 hours</SelectItem>
                            <SelectItem value="6">6 hours</SelectItem>
                            <SelectItem value="8">Full day (8 hours)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label htmlFor="guestCount">Expected Guests</Label>
                        <Input
                          id="guestCount"
                          type="number"
                          value={bookingData.guestCount}
                          onChange={(e) => handleInputChange('guestCount', e.target.value)}
                          placeholder="50"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="eventLocation">Event Location *</Label>
                      <Input
                        id="eventLocation"
                        value={bookingData.eventLocation}
                        onChange={(e) => handleInputChange('eventLocation', e.target.value)}
                        placeholder="Full address of the event venue"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="eventType">Event Type *</Label>
                      <Select value={bookingData.eventType} onValueChange={(value) => handleInputChange('eventType', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select event type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="wedding">Wedding</SelectItem>
                          <SelectItem value="birthday">Birthday Party</SelectItem>
                          <SelectItem value="corporate">Corporate Event</SelectItem>
                          <SelectItem value="festival">Festival</SelectItem>
                          <SelectItem value="cultural">Cultural Program</SelectItem>
                          <SelectItem value="religious">Religious Ceremony</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="specialRequests">Special Requests</Label>
                      <Textarea
                        id="specialRequests"
                        value={bookingData.specialRequests}
                        onChange={(e) => handleInputChange('specialRequests', e.target.value)}
                        placeholder="Any specific songs, performances, or requirements..."
                        rows={3}
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Contact Information */}
                {currentStep === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
                    
                    <div>
                      <Label htmlFor="contactName">Full Name *</Label>
                      <Input
                        id="contactName"
                        value={bookingData.contactName}
                        onChange={(e) => handleInputChange('contactName', e.target.value)}
                        placeholder="Your full name"
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="contactPhone">Phone Number *</Label>
                        <Input
                          id="contactPhone"
                          type="tel"
                          value={bookingData.contactPhone}
                          onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactEmail">Email Address *</Label>
                        <Input
                          id="contactEmail"
                          type="email"
                          value={bookingData.contactEmail}
                          onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="budget">Budget</Label>
                      <Input
                        id="budget"
                        type="number"
                        value={bookingData.budget}
                        onChange={(e) => handleInputChange('budget', e.target.value)}
                        placeholder={artist.price?.toString()}
                      />
                      <p className="text-sm text-gray-600 mt-1">
                        Artist's rate: ₹{artist.price}/event
                      </p>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Review & Confirm */}
                {currentStep === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-6"
                  >
                    <h3 className="text-lg font-semibold mb-4">Review Your Booking</h3>
                    
                    <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                      <div className="grid md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium">Event Date:</span> {bookingData.eventDate}
                        </div>
                        <div>
                          <span className="font-medium">Time:</span> {bookingData.eventTime}
                        </div>
                        <div>
                          <span className="font-medium">Duration:</span> {bookingData.eventDuration} hours
                        </div>
                        <div>
                          <span className="font-medium">Event Type:</span> {bookingData.eventType}
                        </div>
                        <div className="md:col-span-2">
                          <span className="font-medium">Location:</span> {bookingData.eventLocation}
                        </div>
                        {bookingData.guestCount && (
                          <div>
                            <span className="font-medium">Guests:</span> {bookingData.guestCount}
                          </div>
                        )}
                        <div>
                          <span className="font-medium">Budget:</span> ₹{bookingData.budget}
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <div className="text-sm">
                          <h4 className="font-medium text-blue-900 mb-1">Booking Process</h4>
                          <ul className="text-blue-700 space-y-1">
                            <li>• Your request will be sent to {artist.name}</li>
                            <li>• The artist will review and confirm availability</li>
                            <li>• You'll receive a confirmation within 24 hours</li>
                            <li>• Payment will be processed upon confirmation</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={handleBack}
                    disabled={currentStep === 1}
                  >
                    Back
                  </Button>
                  
                  {currentStep < 3 ? (
                    <Button
                      onClick={handleNext}
                      disabled={!validateStep(currentStep)}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      Next
                    </Button>
                  ) : (
                    <Button
                      onClick={handleSubmit}
                      disabled={submitting}
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      {submitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Submit Booking Request
                        </>
                      )}
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingPage;