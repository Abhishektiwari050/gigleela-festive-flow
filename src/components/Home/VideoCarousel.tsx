import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Play, Pause, Volume2, VolumeX } from "lucide-react";

interface VideoSlide {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  videoUrl: string;
  posterUrl: string;
  category: string;
}

const VideoCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const videos: VideoSlide[] = [
    {
      id: "1",
      title: "Classical Indian Dance",
      subtitle: "Bharatanatyam Perfection",
      description: "Experience the grace and precision of traditional Bharatanatyam performed by master dancers",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      posterUrl: "/placeholder.svg",
      category: "Classical Dance"
    },
    {
      id: "2", 
      title: "Hindustani Classical Music",
      subtitle: "Raga Traditions",
      description: "Immerse yourself in the spiritual journey of classical Indian ragas and vocal traditions",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      posterUrl: "/placeholder.svg",
      category: "Classical Music"
    },
    {
      id: "3",
      title: "Folk Heritage",
      subtitle: "Regional Treasures", 
      description: "Discover vibrant folk performances that celebrate India's diverse cultural landscape",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      posterUrl: "/placeholder.svg",
      category: "Folk Arts"
    },
    {
      id: "4",
      title: "Festival Celebrations",
      subtitle: "Cultural Festivities",
      description: "Join the joyous celebrations that bring communities together through music and dance",
      videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", 
      posterUrl: "/placeholder.svg",
      category: "Festivals"
    }
  ];

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, videos.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % videos.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + videos.length) % videos.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    const video = document.getElementById(`video-${currentSlide}`) as HTMLVideoElement;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    const video = document.getElementById(`video-${currentSlide}`) as HTMLVideoElement;
    if (video) {
      video.muted = !isMuted;
    }
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0">
        {videos.map((video, index) => (
          <div
            key={video.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <video
              id={`video-${index}`}
              className="w-full h-full object-cover"
              poster={video.posterUrl}
              muted={isMuted}
              loop
              playsInline
              onLoadedData={() => {
                if (index === currentSlide && isPlaying) {
                  const videoElement = document.getElementById(`video-${index}`) as HTMLVideoElement;
                  videoElement?.play();
                }
              }}
            >
              <source src={video.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/40 to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            {/* Category Badge */}
            <div className="inline-block mb-4">
              <span className="px-4 py-2 bg-primary/20 text-primary border border-primary/30 rounded-full text-sm font-medium backdrop-blur-sm">
                {videos[currentSlide].category}
              </span>
            </div>

            {/* Main Content */}
            <div className="space-y-6 animate-slide-up">
              <div>
                <h2 className="text-2xl md:text-3xl font-semibold text-white/90 mb-2">
                  {videos[currentSlide].subtitle}
                </h2>
                <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                  {videos[currentSlide].title}
                </h1>
              </div>

              <p className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed">
                {videos[currentSlide].description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button size="lg" variant="secondary" className="text-lg font-semibold">
                  Explore Artists
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white hover:text-black text-lg font-semibold"
                >
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="h-12 w-12 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-24 left-4 z-20 flex space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={togglePlay}
          className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
        >
          {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleMute}
          className="h-10 w-10 rounded-full bg-black/30 text-white hover:bg-black/50 backdrop-blur-sm"
        >
          {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
        </Button>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex space-x-3">
          {videos.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white scale-125'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20">
        <div className="h-1 bg-black/30">
          <div 
            className="h-full bg-primary transition-all duration-300"
            style={{ 
              width: `${((currentSlide + 1) / videos.length) * 100}%` 
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoCarousel;