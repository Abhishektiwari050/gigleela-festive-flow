import React, { useState, useEffect } from "react";
import { Button } from "../components/ui/button";
import { Link } from "react-router-dom";

const featuredEvents = [
  {
    title: "Summer Music Gala 2024",
    date: "July 15, 2024",
    location: "Central Park, NYC",
    image: "/assets/hero-festival.jpg",
    description: "Experience an unforgettable night of music, food, and festivities with top artists from around the world.",
  },
  {
    title: "Art & Culture Fest",
    date: "August 10, 2024",
    location: "Downtown LA",
    image: "/assets/hero-festival.jpg",
    description: "A celebration of creativity, featuring art installations, live performances, and workshops.",
  },
  {
    title: "Tech Innovators Expo",
    date: "September 5, 2024",
    location: "Silicon Valley",
    image: "/assets/hero-festival.jpg",
    description: "Discover the latest in technology and innovation at the premier industry event of the year.",
  },
];

const testimonials = [
  {
    name: "Alex Johnson",
    quote:
      "This event was a game-changer for our company. The organization and energy were unmatched!",
    avatar: "/public/placeholder.svg",
  },
  {
    name: "Maria Gomez",
    quote:
      "I met so many amazing people and learned so much. Can't wait for next year!",
    avatar: "/public/placeholder.svg",
  },
  {
    name: "Samuel Lee",
    quote:
      "The best event experience I've ever had. Everything was seamless and inspiring.",
    avatar: "/public/placeholder.svg",
  },
];

export default function Index() {
  const videos = ["/video1.mp4", "/video2.mp4", "/video3.mp4"];
  const [current, setCurrent] = useState(0);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % videos.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Navigation */}
      <nav className="w-full fixed top-0 left-0 z-30 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold tracking-tight text-white">Sanskritiq</div>
          <div className="hidden md:flex gap-8 text-base font-medium text-white">
            <Link to="/" className="hover:text-gray-300">Home</Link>
            <Link to="/artists" className="hover:text-gray-300">Artists</Link>
            <Link to="/services" className="hover:text-gray-300">Services</Link>
            <Link to="/about" className="hover:text-gray-300">About</Link>
            <Link to="/contact" className="hover:text-gray-300">Contact</Link>
          </div>
          <div className="flex gap-2">
            <Link to="/signin">
              <Button variant="outline" className="text-white border-white hover:bg-white/20">Sign In</Button>
            </Link>
            <Link to="/join-client">
              <Button className="bg-white/20 text-white hover:bg-white/30">Join as Client</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section - Immersive Video Carousel */}
      <section className="relative flex flex-col justify-center items-center min-h-screen bg-gradient-to-b from-primary/10 to-white">
        <div className="absolute inset-0 w-full h-full z-0">
          {/* Video Carousel */}
          <div className="relative w-full h-full">
            {videos.map((src, index) => (
              <video
                key={index}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${index === current ? 'opacity-100' : 'opacity-0'}`}
                src={src}
                autoPlay
                loop
                muted
                poster="/assets/hero-festival.jpg"
              />
            ))}
            <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
            {/* Animated Text Overlay for UK localization */}
            <div className="absolute inset-0 flex flex-col items-center justify-end pb-24 pointer-events-none z-20">
              <span className="hero-carousel-animated-text bg-gradient-to-r from-yellow-500 via-[#FF9933] to-red-500 text-transparent bg-clip-text text-4xl md:text-6xl font-extrabold mb-6 animate-fade-in">
                Celebrating Togetherness
              </span>
              <span className="hero-carousel-animated-text text-white text-lg md:text-2xl mb-8 font-medium animate-fade-in-delay">
                Discover, join, and celebrate the most spectacular events across the UK.
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
