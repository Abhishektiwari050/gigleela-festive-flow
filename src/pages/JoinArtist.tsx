import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { ImageUpload, MultiImageUpload } from "@/components/ui/image-upload";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const JoinArtist = () => {
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: '',
    specialty: '',
    experience: '',
    bio: '',
    profileImage: null as File | null,
    profileImagePreview: '',
    portfolioImages: [] as File[],
    portfolioImagePreviews: [] as string[]
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const specialties = [
    'Classical Singer',
    'Folk Singer',
    'Instrumental Musician',
    'Classical Dancer',
    'Folk Dancer',
    'Tabla Player',
    'Sitar Player',
    'Flute Player',
    'Veena Player',
    'Bharatanatyam Dancer',
    'Kathak Dancer',
    'Other'
  ];

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const handleProfileImageChange = (file: File | null, dataUrl?: string) => {
    setFormData({
      ...formData,
      profileImage: file,
      profileImagePreview: dataUrl || ''
    });
  };

  const handlePortfolioImagesChange = (files: File[], previews: string[]) => {
    setFormData({
      ...formData,
      portfolioImages: [...formData.portfolioImages, ...files],
      portfolioImagePreviews: previews
    });
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.specialty) {
      newErrors.specialty = 'Please select your specialty';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await signUp({
        name: formData.name.trim(),
        email: formData.email.trim(),
        password: formData.password,
        role: 'artist',
        phone: formData.phone.trim() || undefined,
        location: formData.location.trim()
      });
      
      if (success) {
        navigate('/', { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 min-h-[60vh]">
          <Card className="w-full max-w-2xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Join as Artist</CardTitle>
              <p className="text-muted-foreground text-center">
                Share your talent with the world and connect with event organizers.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleApply}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block mb-1 font-medium">Full Name *</label>
                    <Input 
                      id="name" 
                      name="name"
                      type="text" 
                      placeholder="Your full name" 
                      value={formData.name}
                      onChange={handleChange}
                      required 
                      disabled={isSubmitting}
                      className={errors.name ? 'border-red-500' : ''}
                    />
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block mb-1 font-medium">Email *</label>
                    <Input 
                      id="email" 
                      name="email"
                      type="email" 
                      placeholder="you@example.com" 
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      disabled={isSubmitting}
                      className={errors.email ? 'border-red-500' : ''}
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="password" className="block mb-1 font-medium">Password *</label>
                    <Input 
                      id="password" 
                      name="password"
                      type="password" 
                      placeholder="Create a password" 
                      value={formData.password}
                      onChange={handleChange}
                      required 
                      disabled={isSubmitting}
                      className={errors.password ? 'border-red-500' : ''}
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="confirmPassword" className="block mb-1 font-medium">Confirm Password *</label>
                    <Input 
                      id="confirmPassword" 
                      name="confirmPassword"
                      type="password" 
                      placeholder="Confirm your password" 
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required 
                      disabled={isSubmitting}
                      className={errors.confirmPassword ? 'border-red-500' : ''}
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block mb-1 font-medium">Phone *</label>
                    <Input 
                      id="phone" 
                      name="phone"
                      type="tel" 
                      placeholder="Your phone number" 
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="location" className="block mb-1 font-medium">Location *</label>
                    <Input 
                      id="location" 
                      name="location"
                      type="text" 
                      placeholder="City, State" 
                      value={formData.location}
                      onChange={handleChange}
                      required 
                      disabled={isSubmitting}
                      className={errors.location ? 'border-red-500' : ''}
                    />
                    {errors.location && <p className="text-red-500 text-sm mt-1">{errors.location}</p>}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="specialty" className="block mb-1 font-medium">Specialty *</label>
                    <Select 
                      value={formData.specialty} 
                      onValueChange={(value) => handleSelectChange('specialty', value)}
                      disabled={isSubmitting}
                    >
                      <SelectTrigger className={errors.specialty ? 'border-red-500' : ''}>
                        <SelectValue placeholder="Select your specialty" />
                      </SelectTrigger>
                      <SelectContent>
                        {specialties.map((specialty) => (
                          <SelectItem key={specialty} value={specialty}>
                            {specialty}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.specialty && <p className="text-red-500 text-sm mt-1">{errors.specialty}</p>}
                  </div>
                  
                  <div>
                    <label htmlFor="experience" className="block mb-1 font-medium">Years of Experience</label>
                    <Input 
                      id="experience" 
                      name="experience"
                      type="text" 
                      placeholder="e.g., 5 years" 
                      value={formData.experience}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="bio" className="block mb-1 font-medium">Bio</label>
                  <Textarea 
                    id="bio" 
                    name="bio"
                    placeholder="Tell us about your artistic background and experience..." 
                    value={formData.bio}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    rows={4}
                  />
                </div>
                
                {/* Profile Image Upload */}
                <div>
                  <label className="block mb-2 font-medium">Profile Picture</label>
                  <ImageUpload
                    onImageChange={handleProfileImageChange}
                    preview={formData.profileImagePreview}
                    placeholder="Upload your profile picture"
                    disabled={isSubmitting}
                    className="max-w-sm"
                  />
                </div>
                
                {/* Portfolio Images Upload */}
                <div>
                  <label className="block mb-2 font-medium">Portfolio Images</label>
                  <MultiImageUpload
                    onImagesChange={handlePortfolioImagesChange}
                    values={formData.portfolioImagePreviews}
                    maxFiles={8}
                    disabled={isSubmitting}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Upload photos of your performances, instruments, or artistic work
                  </p>
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Artist Account'}
                </Button>
              </form>
              
              <div className="text-center mt-4">
                <span className="text-sm text-muted-foreground">Already have an account?</span>
                <Button
                  variant="link"
                  className="ml-1 p-0 h-auto text-primary transition-colors duration-150"
                  onClick={() => navigate("/signin")}
                  disabled={isSubmitting}
                >
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
};

export default JoinArtist;