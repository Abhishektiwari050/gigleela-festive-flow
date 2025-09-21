import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const JoinClient = () => {
  const { signUp, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    location: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async (e: React.FormEvent) => {
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
        role: 'client',
        phone: formData.phone.trim() || undefined,
        location: formData.location.trim() || undefined
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
          <Card className="w-full max-w-xl shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Join as Client</CardTitle>
              <p className="text-muted-foreground text-center">
                Register to book artists and manage your festival events.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleRegister}>
                <div>
                  <label htmlFor="name" className="block mb-1 font-medium">Name *</label>
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
                
                <div>
                  <label htmlFor="phone" className="block mb-1 font-medium">Phone</label>
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
                  <label htmlFor="location" className="block mb-1 font-medium">Location</label>
                  <Input 
                    id="location" 
                    name="location"
                    type="text" 
                    placeholder="City, State" 
                    value={formData.location}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Creating Account...' : 'Create Account'}
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

export default JoinClient;