import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Home, ArrowLeft, Search, Users } from "lucide-react";
import { motion } from "framer-motion";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  const popularPages = [
    { label: 'Browse Artists', path: '/artists', icon: Users },
    { label: 'Search', path: '/search', icon: Search },
    { label: 'About Us', path: '/about', icon: Home },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col relative overflow-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 opacity-5">
        <img 
          src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1400&q=80"
          alt="Indian classical dance background"
          className="w-full h-full object-cover"
        />
      </div>
      <Header />
      <main className="flex-1 flex items-center justify-center py-12 px-4 relative z-10">
        <div className="max-w-lg w-full text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* 404 Illustration */}
            <div className="mb-8">
              <div className="text-8xl md:text-9xl font-bold text-primary/20 mb-4">
                404
              </div>
              <div className="text-6xl mb-4">🎭</div>
            </div>
            
            <Card className="shadow-lg">
              <CardContent className="p-8">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <h1 className="text-2xl md:text-3xl font-bold mb-4">
                    Oops! Page not found
                  </h1>
                  <p className="text-muted-foreground mb-6">
                    The page you're looking for doesn't exist or has been moved.
                    Let's get you back on track!
                  </p>
                  
                  <div className="text-sm text-muted-foreground mb-6 p-3 bg-muted rounded-lg">
                    <strong>Requested URL:</strong> {location.pathname}
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 mb-6">
                    <Button onClick={goBack} variant="outline" className="flex-1">
                      <ArrowLeft className="h-4 w-4 mr-2" />
                      Go Back
                    </Button>
                    <Button onClick={() => navigate('/')} className="flex-1">
                      <Home className="h-4 w-4 mr-2" />
                      Home Page
                    </Button>
                  </div>
                  
                  {/* Popular Pages */}
                  <div className="border-t pt-6">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Popular pages:
                    </h3>
                    <div className="grid gap-2">
                      {popularPages.map((page) => {
                        const Icon = page.icon;
                        return (
                          <Button
                            key={page.path}
                            variant="ghost"
                            className="justify-start"
                            onClick={() => navigate(page.path)}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {page.label}
                          </Button>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NotFound;
