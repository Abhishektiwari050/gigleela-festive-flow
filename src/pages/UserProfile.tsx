import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ImageUpload, MultiImageUpload } from "@/components/ui/image-upload";
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { apiClient, Booking } from "@/lib/api";
import { motion } from "framer-motion";
import { 
  User, 
  Settings, 
  Bell, 
  Shield, 
  Camera, 
  Save,
  Calendar,
  Star,
  Heart,
  CreditCard,
  LogOut,
  Trash2
} from "lucide-react";

const UserProfile = () => {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [activeTab, setActiveTab] = useState("profile");
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    bio: '', // Add bio field
    profileImage: null as File | null,
    profileImagePreview: user?.profileImage || '',
    portfolioImages: [] as File[],
    portfolioImagePreviews: [] as string[]
  });

  // Settings state
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    bookingReminders: true,
    profileVisibility: 'public' as 'public' | 'private',
    language: 'en'
  });

  useEffect(() => {
    if (user) {
      fetchUserBookings();
    }
  }, [user]);

  const fetchUserBookings = async () => {
    try {
      const response = await apiClient.getUserBookings();
      if (response.data?.bookings) {
        setBookings(response.data.bookings);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      // Set mock bookings for demo
      setBookings([]);
    }
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      // Mock update - replace with actual API call
      console.log('Updating profile:', profileData);
      // await apiClient.updateProfile(profileData);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleProfileImageChange = (file: File | null, dataUrl?: string) => {
    setProfileData(prev => ({
      ...prev,
      profileImage: file,
      profileImagePreview: dataUrl || prev.profileImagePreview
    }));
  };

  const handlePortfolioImagesChange = (files: File[], previews: string[]) => {
    setProfileData(prev => ({
      ...prev,
      portfolioImages: [...prev.portfolioImages, ...files],
      portfolioImagePreviews: previews
    }));
  };

  const handleSettingsUpdate = async () => {
    setLoading(true);
    
    try {
      // Mock update - replace with actual API call
      console.log('Updating settings:', settings);
      alert('Settings updated successfully!');
    } catch (error) {
      console.error('Error updating settings:', error);
      alert('Failed to update settings');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      try {
        // Mock delete - replace with actual API call
        console.log('Deleting account');
        alert('Account deletion request submitted');
        logout();
      } catch (error) {
        console.error('Error deleting account:', error);
        alert('Failed to delete account');
      }
    }
  };

  const getBookingStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Account</h1>
          <p className="text-gray-600">Manage your profile, bookings, and preferences</p>
        </motion.div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {user?.name?.charAt(0) || 'U'}
                  </div>
                  <h3 className="font-semibold text-lg">{user?.name}</h3>
                  <p className="text-sm text-gray-600">{user?.email}</p>
                </div>
                
                <nav className="space-y-2">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === 'profile' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('bookings')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === 'bookings' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className="w-4 h-4" />
                    My Bookings
                  </button>
                  {user?.role === 'artist' && (
                    <button
                      onClick={() => setActiveTab('portfolio')}
                      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeTab === 'portfolio' 
                          ? 'bg-purple-100 text-purple-700' 
                          : 'hover:bg-gray-100'
                      }`}
                    >
                      <Camera className="w-4 h-4" />
                      Portfolio
                    </button>
                  )}
                  <button
                    onClick={() => setActiveTab('favorites')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === 'favorites' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Heart className="w-4 h-4" />
                    Favorites
                  </button>
                  <button
                    onClick={() => setActiveTab('settings')}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-left transition-colors ${
                      activeTab === 'settings' 
                        ? 'bg-purple-100 text-purple-700' 
                        : 'hover:bg-gray-100'
                    }`}
                  >
                    <Settings className="w-4 h-4" />
                    Settings
                  </button>
                </nav>

                <div className="border-t mt-6 pt-6">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
                    onClick={logout}
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-3"
          >
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleProfileUpdate} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Full Name</Label>
                        <Input
                          id="name"
                          value={profileData.name}
                          onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address</Label>
                        <Input
                          id="email"
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                          placeholder="your.email@example.com"
                        />
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={profileData.phone}
                          onChange={(e) => setProfileData(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+91 98765 43210"
                        />
                      </div>
                      <div>
                        <Label htmlFor="location">Location</Label>
                        <Input
                          id="location"
                          value={profileData.location}
                          onChange={(e) => setProfileData(prev => ({ ...prev, location: e.target.value }))}
                          placeholder="City, State"
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        value={profileData.bio}
                        onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                        placeholder="Tell us about yourself..."
                        rows={4}
                      />
                    </div>
                    
                    <div className="flex items-center gap-6">
                      <div>
                        <ImageUpload
                          onImageChange={handleProfileImageChange}
                          preview={profileData.profileImagePreview}
                          placeholder="Upload profile picture"
                          disabled={loading}
                          className="w-32 h-32"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold mb-2">Profile Picture</h3>
                        <p className="text-sm text-muted-foreground">
                          Upload a clear photo of yourself. This will be visible to clients when they view your profile.
                        </p>
                      </div>
                    </div>

                    <Button type="submit" disabled={loading} className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Changes'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            )}

            {/* Portfolio Tab - Only for artists */}
            {activeTab === 'portfolio' && user?.role === 'artist' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Portfolio Management
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-semibold mb-4">Portfolio Images</h3>
                    <MultiImageUpload
                      onImagesChange={handlePortfolioImagesChange}
                      values={profileData.portfolioImagePreviews}
                      maxFiles={12}
                      disabled={loading}
                    />
                    <p className="text-sm text-muted-foreground mt-2">
                      Upload high-quality images of your performances, instruments, or artistic work. 
                      These will be displayed in your public profile gallery.
                    </p>
                  </div>
                  
                  <div className="pt-4 border-t">
                    <Button 
                      type="button" 
                      onClick={() => console.log('Save portfolio')}
                      disabled={loading} 
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Portfolio'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Bookings Tab */}
            {activeTab === 'bookings' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    My Bookings
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {bookings.length > 0 ? (
                    <div className="space-y-4">
                      {bookings.map((booking) => (
                        <Card key={booking.id} className="p-4">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold">{booking.artist?.name || 'Artist Name'}</h3>
                            <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                              {booking.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600 space-y-1">
                            <p>
                              <strong>Date:</strong> {new Date(booking.eventDate).toLocaleDateString()}
                            </p>
                            <p>
                              <strong>Event:</strong> {booking.eventType}
                            </p>
                            <p>
                              <strong>Location:</strong> {booking.location}
                            </p>
                            <p>
                              <strong>Amount:</strong> ₹{booking.budget || 0}
                            </p>
                          </div>
                          {booking.description && (
                            <p className="text-sm mt-2">
                              <strong>Notes:</strong> {booking.description}
                            </p>
                          )}
                        </Card>
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
            )}

            {/* Favorites Tab */}
            {activeTab === 'favorites' && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    Favorite Artists
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8 text-gray-500">
                    <Heart className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>No favorite artists yet. Explore artists and save your favorites!</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Settings Tab */}
            {activeTab === 'settings' && (
              <div className="space-y-6">
                {/* Notifications */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notification Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Email Notifications</Label>
                        <p className="text-sm text-gray-600">Receive booking updates via email</p>
                      </div>
                      <Switch
                        checked={settings.emailNotifications}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Receive urgent updates via SMS</p>
                      </div>
                      <Switch
                        checked={settings.smsNotifications}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Marketing Emails</Label>
                        <p className="text-sm text-gray-600">Receive promotional content and offers</p>
                      </div>
                      <Switch
                        checked={settings.marketingEmails}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, marketingEmails: checked }))}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Booking Reminders</Label>
                        <p className="text-sm text-gray-600">Get reminders about upcoming events</p>
                      </div>
                      <Switch
                        checked={settings.bookingReminders}
                        onCheckedChange={(checked) => setSettings(prev => ({ ...prev, bookingReminders: checked }))}
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Profile Visibility</Label>
                      <Select value={settings.profileVisibility} onValueChange={(value: 'public' | 'private') => setSettings(prev => ({ ...prev, profileVisibility: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public - Visible to all users</SelectItem>
                          <SelectItem value="private">Private - Only visible to you</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label>Language Preference</Label>
                      <Select value={settings.language} onValueChange={(value) => setSettings(prev => ({ ...prev, language: value }))}>
                        <SelectTrigger className="mt-2">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="hi">हिंदी</SelectItem>
                          <SelectItem value="bn">বাংলা</SelectItem>
                          <SelectItem value="te">తెలుగు</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                {/* Save Settings */}
                <Card>
                  <CardContent className="p-6">
                    <Button onClick={handleSettingsUpdate} disabled={loading} className="bg-gradient-to-r from-purple-600 to-pink-600">
                      <Save className="w-4 h-4 mr-2" />
                      {loading ? 'Saving...' : 'Save Settings'}
                    </Button>
                  </CardContent>
                </Card>

                {/* Danger Zone */}
                <Card className="border-red-200">
                  <CardHeader>
                    <CardTitle className="text-red-600 flex items-center gap-2">
                      <Trash2 className="w-5 h-5" />
                      Danger Zone
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">
                      Once you delete your account, there is no going back. Please be certain.
                    </p>
                    <Button 
                      variant="destructive" 
                      onClick={handleDeleteAccount}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default UserProfile;