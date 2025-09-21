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
  const [videosLoaded, setVideosLoaded] = useState(false);
  const [videoError, setVideoError] = useState(false);

  const videos: VideoSlide[] = [
    {
      id: "1",
      title: "Classical Indian Dance",
      subtitle: "Bharatanatyam Perfection",
      description: "Experience the grace and precision of traditional Bharatanatyam performed by master dancers",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
      posterUrl: "https://images.unsplash.com/photo-1594736797933-d0b22d09d3ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      category: "Classical Dance"
    },
    {
      id: "2", 
      title: "Hindustani Classical Music",
      subtitle: "Raga Traditions",
      description: "Immerse yourself in the spiritual journey of classical Indian ragas and vocal traditions",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
      posterUrl: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      category: "Classical Music"
    },
    {
      id: "3",
      title: "Folk Heritage",
      subtitle: "Regional Treasures", 
      description: "Discover vibrant folk performances that celebrate India's diverse cultural landscape",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
      posterUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      category: "Folk Arts"
    },
    {
      id: "4",
      title: "Festival Celebrations",
      subtitle: "Cultural Festivities",
      description: "Join the joyous celebrations that bring communities together through music and dance",
      videoUrl: "https://storage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4", 
      posterUrl: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&q=80",
      category: "Festivals"
    }
  ];

  // Auto-advance slides with fallback to image-only mode
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % videos.length);
    }, videoError ? 4000 : 6000); // Faster transitions for image-only mode

    return () => clearInterval(interval);
  }, [isAutoPlaying, videos.length, videoError]);

  // Check if videos can load
  useEffect(() => {
    const checkVideoSupport = () => {
      const video = document.createElement('video');
      const canPlayMp4 = video.canPlayType('video/mp4');
      if (!canPlayMp4) {
        setVideoError(true);
      }
    };
    checkVideoSupport();
  }, []);

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
      {/* Background - Video or Image */}
      <div className="absolute inset-0">
        {videoError ? (
          // Fallback to image-only carousel when videos fail
          <div
            className="absolute inset-0 transition-opacity duration-1000 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${videos[currentSlide].posterUrl})`,
            }}
          />
        ) : (
          // Video carousel when supported
          videos.map((video, index) => (
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
                preload={index === 0 ? "metadata" : "none"}
                onLoadedData={() => {
                  if (index === currentSlide && isPlaying) {
                    const videoElement = document.getElementById(`video-${index}`) as HTMLVideoElement;
                    videoElement?.play();
                  }
                  if (index === 0) setVideosLoaded(true);
                }}
                onError={(e) => {
                  console.warn(`Failed to load video ${index}, switching to image-only mode`);
                  setVideoError(true);
                  const target = e.target as HTMLVideoElement;
                  target.style.display = 'none';
                  // Show poster as fallback
                  const container = target.parentElement;
                  if (container) {
                    container.style.backgroundImage = `url(${video.posterUrl})`;
                    container.style.backgroundSize = 'cover';
                    container.style.backgroundPosition = 'center';
                  }
                }}
              >
                <source src={video.videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))
        )}
        
        {/* Enhanced Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-black/70" />
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

              {/* CTA Buttons - Enhanced visibility */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  size="lg" 
                  className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-2 border-white/20 shadow-lg ring-2 ring-white/30 backdrop-blur-sm"
                >
                  Explore Artists
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-2 border-white bg-white/10 hover:bg-white hover:text-black text-lg font-semibold backdrop-blur-sm shadow-lg ring-2 ring-white/20"
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

      {/* Video Controls - Hidden in image-only mode */}
      {!videoError && (
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
      )}

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