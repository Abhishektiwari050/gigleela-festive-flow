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
import { FloatingDock } from "@/components/ui/floating-dock";
import { Link } from "react-router-dom";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
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
  Play,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Pause,
  Globe,
  Mail,
  Phone,
  Home,
  User,
  Search,
  Settings
} from "lucide-react";

const Index = () => {
  const [current, setCurrent] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(true);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isHeroInView, setIsHeroInView] = useState(true);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Optimized floating dock items for better performance
  const floatingDockItems = useMemo(() => [
    { 
      title: "Home", 
      icon: <Home className="h-4 w-4" />, 
      href: "/" 
    },
    { 
      title: "Artists", 
      icon: <User className="h-4 w-4" />, 
      href: "/artists" 
    },
    { 
      title: "Search", 
      icon: <Search className="h-4 w-4" />, 
      href: "/search" 
    },
    { 
      title: "Play/Pause", 
      icon: isVideoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />, 
      href: "#",
      onClick: () => {
        setIsVideoPlaying(!isVideoPlaying);
        setIsAutoPlay(!isAutoPlay);
      }
    }
  ], [isVideoPlaying, isAutoPlay]);
  
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

  const testimonials = [
    {
      name: "Sarah Johnson",
      event: "Wedding Celebration",
      rating: 5,
      comment: "The traditional dance performance made our wedding absolutely magical!",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Michael Chen",
      event: "Corporate Event",
      rating: 5,
      comment: "Professional service and incredible cultural authenticity.",
      image: "/api/placeholder/60/60"
    },
    {
      name: "Priya Patel",
      event: "Festival Celebration",
      rating: 5,
      comment: "Connected us with our roots in the most beautiful way.",
      image: "/api/placeholder/60/60"
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
      }, 6000); // Optimized for better performance
      return () => clearInterval(interval);
    }
  }, [videos.length, isAutoPlay]);

  // Debug: Log component state
  console.log('Index component rendering, isHeroInView:', isHeroInView);

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <Header isHeroInView={isHeroInView} />

      {/* Hero Section with Video Background */}
      <section ref={heroRef} className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Spotlight effect */}
        <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
        
        {/* Background Beams */}
        <BackgroundBeams className="absolute inset-0 z-0" />
        
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="relative w-full h-full">
            {videos.map((video, index) => (
              <video
                key={index}
                className={`absolute inset-0 w-full h-full object-cover transition-all duration-1000 ${
                  index === current ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                }`}
                src={video.src}
                autoPlay={isAutoPlay}
                loop
                muted
                playsInline
                poster="/assets/hero-festival.jpg"
              />
            ))}
            {/* Enhanced gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
            <div className="absolute inset-0 bg-gradient-radial from-transparent via-black/20 to-black/60 z-10"></div>
          </div>
        </div>

        {/* Navigation Controls */}
        <button
          onClick={() => {
            setCurrent(current === 0 ? videos.length - 1 : current - 1);
            setIsAutoPlay(false);
          }}
          className="absolute left-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        
        <button
          onClick={() => {
            setCurrent((current + 1) % videos.length);
            setIsAutoPlay(false);
          }}
          className="absolute right-6 top-1/2 transform -translate-y-1/2 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-white/20"
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        {/* Video Control */}
        <button
          onClick={() => {
            setIsVideoPlaying(!isVideoPlaying);
            setIsAutoPlay(!isAutoPlay);
          }}
          className="absolute top-6 right-6 z-30 bg-black/30 hover:bg-black/50 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110 border border-white/20"
        >
          {isVideoPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
        </button>

        {/* Hero Content with Aceternity-style animations */}
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
              {/* Enhanced Hero Title with Aceternity Highlight and Flip Words */}
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
              
              {/* Subtitle with Enhanced Text Generate Effect */}
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
                    <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white px-10 py-5 text-xl font-bold rounded-full shadow-2xl border-2 border-white/20 backdrop-blur-sm">
                      <Sparkles className="mr-3 h-6 w-6" />
                      Explore Artists
                      <ArrowRight className="ml-3 h-6 w-6" />
                    </Button>
                  </motion.div>
                </Link>
                
                <motion.div
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-white border-2 border-white/30 hover:bg-white/10 backdrop-blur-md px-10 py-5 text-xl font-semibold rounded-full shadow-xl bg-transparent"
                    onClick={() => {
                      const videoElement = document.querySelector('video');
                      if (videoElement) {
                        if (videoElement.paused) {
                          videoElement.play();
                          setIsVideoPlaying(true);
                        } else {
                          videoElement.pause();
                          setIsVideoPlaying(false);
                        }
                      }
                    }}
                  >
                    {isVideoPlaying ? <Pause className="mr-3 h-6 w-6" /> : <Play className="mr-3 h-6 w-6" />}
                    {isVideoPlaying ? 'Pause Video' : 'Play Video'}
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </AnimatePresence>



        </div>
      </section>

      {/* Featured Categories Section with Enhanced Aceternity Effects */}
      <section className="py-20 bg-gradient-to-b from-white via-purple-50/30 to-pink-50/30 relative overflow-hidden">
        {/* Enhanced Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
        <BackgroundBeams className="opacity-30" />
        
        {/* Optimized floating elements - reduced count for better performance */}
        <div className="absolute inset-0">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-purple-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.3,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.h2 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Explore <Highlight className="text-purple-600">Cultural Arts</Highlight>
            </motion.h2>
            <motion.p 
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TextGenerateEffect 
                words="Discover authentic performances and traditional arts that celebrate our rich cultural heritage"
                className="text-xl text-gray-600"
                filter={false}
                duration={0.05}
              />
            </motion.p>
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
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <motion.div
                        whileHover={{ rotate: 15 }}
                        className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                      >
                        <ArrowRight className="h-4 w-4 text-gray-600" />
                      </motion.div>
                    </div>
                    
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
                      <div className="flex justify-center items-center space-x-2">
                        <Badge variant="secondary" className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                          {category.count}
                        </Badge>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "2rem" }}
                          transition={{ duration: 0.8, delay: index * 0.2 }}
                          className="h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
          
          {/* Call to Action */}
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/artists">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-3 rounded-full shadow-lg">
                  View All Categories
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Stats Section with Aceternity Effects */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        {/* Spotlight effects */}
        <Spotlight className="-top-20 left-20" fill="rgba(255,255,255,0.1)" />
        <Spotlight className="top-20 right-20" fill="rgba(255,255,255,0.1)" />
        
        {/* Optimized animated background elements - reduced count for performance */}
        <div className="absolute inset-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
          
          {/* Optimized beam effects */}
          <BackgroundBeams className="opacity-20" />
        </div>
        
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
              { number: "500+", label: "Artists", icon: Users, color: "from-yellow-400 to-orange-500" },
              { number: "1000+", label: "Events", icon: Calendar, color: "from-green-400 to-emerald-500" },
              { number: "50+", label: "Cities", icon: MapPin, color: "from-blue-400 to-indigo-500" },
              { number: "4.9", label: "Rating", icon: Star, color: "from-pink-400 to-rose-500" }
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
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="group cursor-pointer"
                >
                  <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300">
                    <motion.div
                      className={`w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-lg`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.8 }}
                    >
                      <Icon className="h-6 w-6 text-white" />
                    </motion.div>
                    
                    <motion.div 
                      className="text-4xl md:text-5xl font-bold mb-2 text-white"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 1, delay: index * 0.1 + 0.5 }}
                      viewport={{ once: true }}
                    >
                      {stat.number}
                    </motion.div>
                    
                    <div className="text-white/90 font-medium text-lg">{stat.label}</div>
                    
                    {/* Animated underline */}
                    <motion.div
                      className="w-0 h-0.5 bg-white/50 mx-auto mt-2 rounded-full"
                      whileInView={{ width: "2rem" }}
                      transition={{ duration: 0.8, delay: index * 0.1 + 0.8 }}
                      viewport={{ once: true }}
                    />
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section with Floating Cards */}
      <section className="py-20 bg-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 20% 50%, purple 1px, transparent 1px), radial-gradient(circle at 80% 50%, pink 1px, transparent 1px)`,
            backgroundSize: '100px 100px'
          }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              How <Highlight className="text-purple-600">It Works</Highlight>
            </h2>
            <TextGenerateEffect 
              words="Simple steps to bring authentic cultural performances to your events"
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              filter={false}
              duration={0.05}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "01",
                title: "Discover Artists",
                description: "Browse our curated collection of verified cultural performers and artists",
                icon: "🎭",
                color: "from-blue-500 to-indigo-600"
              },
              {
                step: "02",
                title: "Book & Connect",
                description: "Choose your preferred artist and connect directly for your event details",
                icon: "📅",
                color: "from-purple-500 to-pink-600"
              },
              {
                step: "03",
                title: "Celebrate Together",
                description: "Enjoy authentic cultural performances that create lasting memories",
                icon: "🎉",
                color: "from-pink-500 to-red-600"
              }
            ].map((step, index) => (
              <motion.div
                key={step.step}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -10, 
                  rotateY: 5,
                  transition: { duration: 0.3 }
                }}
                className="group relative"
              >
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 relative overflow-hidden">
                  {/* Floating background decoration */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${step.color} opacity-5 rounded-full transform translate-x-8 -translate-y-8 group-hover:scale-150 transition-transform duration-700`}></div>
                  
                  {/* Step number */}
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${step.color} text-white font-bold text-lg mb-6 shadow-lg`}>
                    {step.step}
                  </div>
                  
                  {/* Icon */}
                  <motion.div 
                    className="text-4xl mb-4"
                    whileHover={{ scale: 1.2, rotate: 10 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    {step.icon}
                  </motion.div>
                  
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-purple-600 transition-colors">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed">
                    {step.description}
                  </p>
                  
                  {/* Animated arrow for connection */}
                  {index < 2 && (
                    <motion.div 
                      className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2"
                      animate={{ x: [0, 10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <ArrowRight className="h-8 w-8 text-purple-300" />
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Testimonials Section with Aceternity Effects */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-20 left-32 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              What Our <Highlight className="text-purple-600">Clients Say</Highlight>
            </h2>
            <TextGenerateEffect 
              words="Real stories from real celebrations across the UK"
              className="text-xl text-gray-600 max-w-3xl mx-auto"
              filter={false}
              duration={0.05}
            />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 50, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group cursor-pointer"
              >
                <Card className="p-8 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 bg-white/80 backdrop-blur-sm relative overflow-hidden h-full">
                  {/* Floating quote decoration */}
                  <div className="absolute top-4 right-4 text-6xl text-purple-100 font-bold group-hover:text-purple-200 transition-colors duration-300">
                    "
                  </div>
                  
                  <CardContent className="p-0 relative z-10">
                    {/* Star rating with animation */}
                    <div className="flex items-center space-x-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.2 + i * 0.1 + 0.5 
                          }}
                          viewport={{ once: true }}
                        >
                          <Star className="h-5 w-5 text-yellow-400 fill-current" />
                        </motion.div>
                      ))}
                    </div>
                    
                    <motion.p 
                      className="text-gray-700 mb-8 italic leading-relaxed text-lg"
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      transition={{ duration: 0.8, delay: index * 0.2 + 0.8 }}
                      viewport={{ once: true }}
                    >
                      "{testimonial.comment}"
                    </motion.p>
                    
                    <div className="flex items-center space-x-4">
                      <motion.img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-4 border-purple-200 shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring", stiffness: 400, damping: 17 }}
                      />
                      <div>
                        <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                        <div className="text-purple-600 font-medium">{testimonial.event}</div>
                        
                        {/* Animated underline */}
                        <motion.div
                          className="w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mt-1"
                          whileInView={{ width: "3rem" }}
                          transition={{ duration: 0.8, delay: index * 0.2 + 1.2 }}
                          viewport={{ once: true }}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {/* Social proof section */}
          <motion.div 
            className="text-center mt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-600 mb-6 text-lg">Join thousands of satisfied customers</p>
            <div className="flex justify-center items-center space-x-8 flex-wrap">
              {["BBC", "ITV", "Channel 4", "Sky Arts", "Wedding Wire"].map((brand, index) => (
                <motion.div
                  key={brand}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 + 1.2 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.1 }}
                  className="text-gray-400 font-semibold text-lg hover:text-purple-600 transition-colors cursor-pointer"
                >
                  {brand}
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* New Artist Showcase Section with Advanced Effects */}
      <section className="py-20 bg-black relative overflow-hidden">
        {/* Multi-layer background effects */}
        <div className="absolute inset-0">
          <Spotlight className="-top-40 left-0" fill="rgba(139, 92, 246, 0.3)" />
          <Spotlight className="top-0 right-0" fill="rgba(236, 72, 153, 0.3)" />
          <BackgroundBeams />
        </div>
        
        {/* Floating particles */}
        <div className="absolute inset-0">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-20, 20, -20],
                opacity: [0, 1, 0],
                scale: [0, 2, 0],
              }}
              transition={{
                duration: 6 + Math.random() * 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Featured <Highlight className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">Artists</Highlight>
            </h2>
            <TextGenerateEffect 
              words="Meet the talented performers who bring culture to life"
              className="text-xl text-gray-300 max-w-3xl mx-auto"
              filter={false}
              duration={0.05}
            />
          </motion.div>
          
          {/* Artist cards with advanced hover effects */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              { name: "Priya Sharma", art: "Classical Dance", image: "/api/placeholder/300/400", rating: 4.9 },
              { name: "Ravi Kumar", art: "Traditional Music", image: "/api/placeholder/300/400", rating: 4.8 },
              { name: "Anita Patel", art: "Folk Performance", image: "/api/placeholder/300/400", rating: 5.0 }
            ].map((artist, index) => (
              <motion.div
                key={artist.name}
                initial={{ opacity: 0, y: 50, rotateY: -15 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                transition={{ 
                  duration: 0.8, 
                  delay: index * 0.2,
                  type: "spring",
                  stiffness: 100
                }}
                viewport={{ once: true }}
                whileHover={{ 
                  y: -20, 
                  rotateY: 5,
                  scale: 1.05,
                  transition: { duration: 0.3 }
                }}
                className="group cursor-pointer"
              >
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-gray-800 hover:border-purple-500/50 transition-all duration-500 relative overflow-hidden">
                  {/* Animated background glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-600/10 to-pink-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  {/* Artist image */}
                  <motion.div 
                    className="relative mb-6 mx-auto w-32 h-32 rounded-full overflow-hidden border-4 border-gray-700 group-hover:border-purple-500 transition-colors duration-300"
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <img 
                      src={artist.image} 
                      alt={artist.name}
                      className="w-full h-full object-cover"
                    />
                    {/* Overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </motion.div>
                  
                  <div className="text-center relative z-10">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors">
                      {artist.name}
                    </h3>
                    <p className="text-gray-400 mb-4 group-hover:text-gray-300 transition-colors">
                      {artist.art}
                    </p>
                    
                    {/* Rating stars */}
                    <div className="flex justify-center items-center space-x-1 mb-4">
                      {[...Array(5)].map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.2 + i * 0.1 + 1 
                          }}
                          viewport={{ once: true }}
                        >
                          <Star className={`h-4 w-4 ${i < Math.floor(artist.rating) ? 'text-yellow-400 fill-current' : 'text-gray-600'}`} />
                        </motion.div>
                      ))}
                      <span className="text-gray-400 ml-2">{artist.rating}</span>
                    </div>
                    
                    {/* Action button */}
                    <motion.button
                      className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      View Profile
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* Enhanced CTA */}
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            viewport={{ once: true }}
          >
            <Link to="/artists">
              <motion.div
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <Button size="lg" className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-500 hover:from-purple-700 hover:via-pink-700 hover:to-red-600 text-white px-12 py-4 text-xl font-bold rounded-full shadow-2xl border border-white/20">
                  <Sparkles className="mr-3 h-6 w-6" />
                  Explore All Artists
                  <ArrowRight className="ml-3 h-6 w-6" />
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </div>
      </section>
      
      {/* Enhanced Newsletter Section */}
      <section className="py-20 bg-gradient-to-br from-gray-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <BackgroundBeams className="opacity-10" />
        </div>
        
        <div className="max-w-4xl mx-auto px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Stay <Highlight className="text-purple-600">Connected</Highlight>
            </h2>
            <TextGenerateEffect 
              words="Get the latest updates on new artists, cultural events, and exclusive performances"
              className="text-xl text-gray-600 mb-8"
              filter={false}
              duration={0.05}
            />
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              viewport={{ once: true }}
            >
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-semibold transition-all duration-300 shadow-lg"
              >
                Subscribe
              </motion.button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      {/* Final CTA Section with Enhanced Effects */}
      <section className="py-20 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 relative overflow-hidden">
        {/* Advanced background effects */}
        <div className="absolute inset-0">
          <Spotlight className="-top-40 left-0" fill="rgba(255,255,255,0.1)" />
          <Spotlight className="top-0 right-0" fill="rgba(255,255,255,0.1)" />
          <BackgroundBeams className="opacity-30" />
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0">
          {[...Array(25)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [-30, 30, -30],
                x: [-15, 15, -15],
                opacity: [0.2, 0.8, 0.2],
                scale: [0.5, 1.5, 0.5],
                rotate: [0, 360, 0],
              }}
              transition={{
                duration: 5 + Math.random() * 3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
        
        <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <motion.h2 
              className="text-4xl md:text-6xl font-bold text-white mb-6"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              viewport={{ once: true }}
            >
              Ready to Create <span className="text-yellow-300">Magic?</span>
            </motion.h2>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <TextGenerateEffect 
                words="Join thousands of satisfied clients who've brought their celebrations to life with authentic cultural performances. Start your journey today."
                className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed"
                filter={false}
                duration={0.03}
              />
            </motion.div>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              viewport={{ once: true }}
            >
              <Link to="/artists">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-12 py-5 text-xl font-bold rounded-full shadow-2xl hover:shadow-white/25 transform transition-all duration-300">
                    <Sparkles className="mr-3 h-6 w-6" />
                    Browse Artists
                    <ArrowRight className="ml-3 h-6 w-6" />
                  </Button>
                </motion.div>
              </Link>
              
              <Link to="/join-artist">
                <motion.div
                  whileHover={{ scale: 1.05, y: -5 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <Button 
                    variant="outline" 
                    size="lg" 
                    className="text-white border-2 border-white/50 hover:bg-white/10 backdrop-blur-sm px-12 py-5 text-xl font-bold rounded-full shadow-xl bg-transparent"
                  >
                    <Heart className="mr-3 h-6 w-6" />
                    Join as Artist
                  </Button>
                </motion.div>
              </Link>
            </motion.div>
            
            {/* Contact info with floating dock style */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              viewport={{ once: true }}
              className="mt-12"
            >
              <FloatingDock 
                items={[
                  { title: "Website", icon: <Globe className="h-5 w-5" />, href: "#" },
                  { title: "Email", icon: <Mail className="h-5 w-5" />, href: "mailto:sanskritiqq@gmail.com" },
                  { title: "Phone", icon: <Phone className="h-5 w-5" />, href: "tel:+919590583161" },
                  { title: "Social", icon: <Heart className="h-5 w-5" />, href: "#" },
                  { title: "Support", icon: <Users className="h-5 w-5" />, href: "#" }
                ]}
                className="mx-auto backdrop-blur-lg bg-white/10 border-white/20"
              />
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;