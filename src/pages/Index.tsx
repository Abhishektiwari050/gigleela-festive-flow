import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Layout/Header";
import Footer from "@/components/Layout/Footer";
import { HeroHighlight, Highlight } from "@/components/ui/hero-highlight";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Spotlight } from "@/components/ui/spotlight";
import { BackgroundBeams } from "@/components/ui/background-beams";
import { FlipWords } from "@/components/ui/flip-words";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Star, 
  MapPin, 
  Calendar, 
  Users, 
  Music, 
  Palette, 
  Camera, 
  Heart,
  ArrowRight,
  Sparkles,
  Mail,
  Phone
} from "lucide-react";

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  const videos = [
    {
      src: "/video1.mp4",
      title: "Traditional Celebrations",
      description: "Experience the beauty of cultural festivals"
    },
    {
      src: "/video2.mp4", 
      title: "Artistic Performances",
      description: "Witness magnificent dance and music traditions"
    },
    {
      src: "/video3.mp4",
      title: "Heritage Stories", 
      description: "Discover stories that connect generations"
    }
  ];

  const featuredCategories = [
    {
      name: "Traditional Dance",
      icon: Music,
      description: "Classical and folk dance performances",
      count: "50+ Artists",
      color: "from-pink-500 to-rose-500"
    },
    {
      name: "Live Music",
      icon: Palette,
      description: "Authentic musical experiences",
      count: "75+ Artists", 
      color: "from-blue-500 to-indigo-500"
    },
    {
      name: "Cultural Arts",
      icon: Camera,
      description: "Visual and performing arts",
      count: "30+ Artists",
      color: "from-green-500 to-emerald-500"
    }
  ];

  // Track hero section visibility for navbar styling
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsHeroInView(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (heroRef.current) {
      observer.observe(heroRef.current);
    }

    return () => observer.disconnect();
  }, []);
  
  useEffect(() => {
    if (isAutoPlay) {
      const interval = setInterval(() => {
        setCurrent((prev) => (prev + 1) % videos.length);
      }, 6000);
      return () => clearInterval(interval);
    }
  }, [videos.length, isAutoPlay]);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header isHeroInView={isHeroInView} />

      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Spotlight effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        {/* Background Beams */}
        <BackgroundBeams className="absolute inset-0 z-0" />
        
        {/* Video Background - Optimized for faster loading */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="relative w-full h-full">
            {videos.map((video, index) => (
              <video
                key={index}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                src={video.src}
                autoPlay={isAutoPlay && index === current}
                loop
                muted
                playsInline
                preload={index === 0 ? "metadata" : "none"}
                poster="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80"
                onError={(e) => {
                  console.warn(`Failed to load hero video ${index}, falling back to image`);
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  // Show fallback image
                  const container = target.parentElement;
                  if (container) {
                    container.style.backgroundImage = `url(https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80)`;
                    container.style.backgroundSize = 'cover';
                    container.style.backgroundPosition = 'center';
                  }
                }}
              />
            ))}
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 z-10"></div>
          </div>
        </div>

        {/* Hero Content with Better Button Visibility */}
        <div className="relative z-20 text-center max-w-6xl mx-auto px-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 50, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -50, scale: 1.1 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.25, 0.46, 0.45, 0.94]
              }}
              className="space-y-8"
            >
              {/* Enhanced Hero Title */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.2 }}
                className="relative"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight">
                  <span className="block mb-4">Celebrate with</span>
                  <Highlight className="text-white">
                    <FlipWords 
                      words={["Authentic", "Traditional", "Cultural", "Artistic"]} 
                      className="text-purple-300"
                      duration={2500}
                    />
                  </Highlight>
                  <span className="block mt-4">Performances</span>
                </h1>
              </motion.div>
              
              {/* Subtitle */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <TextGenerateEffect 
                  className="text-xl md:text-2xl text-white/95 font-medium max-w-4xl mx-auto"
                  words="Connect with talented artists who bring authentic cultural performances to life, creating unforgettable experiences that celebrate heritage and tradition."
                  filter={false}
                  duration={0.02}
                />
              </motion.div>
              
              {/* Enhanced Buttons with Better Visibility */}
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.8 }}
              >
                <Link to="/artists">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button size="lg" className="bg-gradient-to-r from-orange-500 via-yellow-500 to-red-500 hover:from-orange-600 hover:via-yellow-600 hover:to-red-600 text-white px-12 py-6 text-xl font-bold rounded-full shadow-2xl border-4 border-white/60 backdrop-blur-sm ring-4 ring-orange-300/50">
                      <Sparkles className="mr-3 h-6 w-6" />
                      Explore Artists
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </motion.div>
                </Link>
                
                <Link to="/join-artist">
                  <motion.div
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Button 
                      variant="outline" 
                      size="lg" 
                      className="text-white border-4 border-cyan-400 hover:bg-cyan-500/30 backdrop-blur-md px-12 py-6 text-xl font-semibold rounded-full shadow-xl bg-cyan-500/20 ring-4 ring-cyan-400/50"
                    >
                      <Heart className="mr-3 h-6 w-6" />
                      Join as Artist
                    </Button>
                  </motion.div>
                </Link>
              </motion.div>

              {/* Simple Contact Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="mt-12"
              >
                <div className="flex justify-center gap-8 text-white/80">
                  <a href="mailto:sanskritiqq@gmail.com" className="flex items-center gap-2 hover:text-white transition-colors text-lg">
                    <Mail className="h-5 w-5" />
                    <span className="hidden sm:inline">Contact Us</span>
                  </a>
                  <a href="tel:+919590583161" className="flex items-center gap-2 hover:text-white transition-colors text-lg">
                    <Phone className="h-5 w-5" />
                    <span className="hidden sm:inline">Call Now</span>
                  </a>
                </div>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* Featured Categories Section */}
      <section className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Explore <Highlight className="text-purple-600">Cultural Arts</Highlight>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover authentic performances and traditional arts that celebrate our rich cultural heritage
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredCategories.map((category, index) => {
              const Icon = category.icon;
              return (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white h-full">
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                    
                    <CardContent className="p-8 text-center relative z-10">
                      <motion.div 
                        className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-br ${category.color} flex items-center justify-center shadow-lg`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      >
                        <Icon className="h-8 w-8 text-white" />
                      </motion.div>
                      
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {category.name}
                      </h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">
                        {category.description}
                      </p>
                      <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                        {category.count}
                      </Badge>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/artists">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg">
                View All Categories
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Trusted by <Highlight className="text-yellow-300">Thousands</Highlight>
            </h2>
            <p className="text-white/90 text-xl max-w-2xl mx-auto">
              Join our growing community of artists and event organizers
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "500+", label: "Artists", icon: Users },
              { number: "1000+", label: "Events", icon: Calendar },
              { number: "50+", label: "Cities", icon: MapPin },
              { number: "4.9", label: "Rating", icon: Star }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.5, y: 50 }}
                  whileInView={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    delay: index * 0.15,
                    type: "spring",
                    stiffness: 100
                  }}
                  viewport={{ once: true }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <Icon className="h-8 w-8 text-white mx-auto mb-4" />
                    <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                      {stat.number}
                    </div>
                    <div className="text-white/90 font-medium text-lg">{stat.label}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;