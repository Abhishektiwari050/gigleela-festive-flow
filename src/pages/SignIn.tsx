import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useState, useEffect } from "react";

const SignIn = () => {
  const navigate = useNavigate();
  const { signIn, isAuthenticated, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      return;
    }

    setIsSubmitting(true);
    
    try {
      const success = await signIn(formData.email, formData.password);
      if (success) {
        navigate('/', { replace: true });
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <section className="flex items-center justify-center py-20 px-4 bg-gradient-festival min-h-[60vh]">
          <Card className="w-full max-w-md shadow-lg">
            <CardHeader>
              <CardTitle className="text-3xl font-bold text-center mb-2">Sign In</CardTitle>
              <p className="text-muted-foreground text-center">
                Access your account to book artists and manage your events.
              </p>
            </CardHeader>
            <CardContent>
              <form className="space-y-6" onSubmit={handleSignIn}>
                <div>
                  <label htmlFor="email" className="block mb-1 font-medium">Email</label>
                  <Input 
                    id="email" 
                    name="email"
                    type="email" 
                    placeholder="you@example.com" 
                    value={formData.email}
                    onChange={handleChange}
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-1 font-medium">Password</label>
                  <Input 
                    id="password" 
                    name="password"
                    type="password" 
                    placeholder="Your password" 
                    value={formData.password}
                    onChange={handleChange}
                    required 
                    disabled={isSubmitting}
                  />
                </div>
                <Button 
                  type="submit" 
                  className="w-full" 
                  disabled={isSubmitting || !formData.email || !formData.password}
                >
                  {isSubmitting ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>
              <div className="text-center mt-4">
                <span className="text-sm text-muted-foreground">Don&apos;t have an account?</span>
                <Button
                  variant="link"
                  className="ml-1 p-0 h-auto text-primary transition-colors duration-150"
                  onClick={() => navigate("/join-client")}
                  disabled={isSubmitting}
                >
                  Sign Up
                </Button>
              </div>
              
              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted rounded-lg">
                <h4 className="font-medium mb-2">Demo Credentials:</h4>
                <div className="text-sm space-y-1">
                  <p><strong>Client:</strong> client@example.com / password123</p>
                  <p><strong>Artist:</strong> priya.sharma@example.com / artist123</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SignIn;