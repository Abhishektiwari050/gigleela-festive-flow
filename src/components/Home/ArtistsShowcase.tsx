import ArtistCard from "./ArtistCard";

// Mock data for demonstration
const featuredArtists = [
  {
    id: "1",
    name: "Priya Sharma",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=464&q=80",
    category: "Classical Singer",
    location: "Mumbai",
    rating: 4.9,
    reviews: 156,
    price: "15,000",
    available: true,
    specialties: ["Hindustani Classical", "Devotional Songs", "Wedding Songs"],
  },
  {
    id: "2", 
    name: "Raj Bhattacharya",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    category: "Tabla Maestro",
    location: "Delhi",
    rating: 4.8,
    reviews: 89,
    price: "12,000",
    available: false,
    specialties: ["Classical Tabla", "Fusion", "Live Accompaniment"],
  },
  {
    id: "3",
    name: "Meera Nair",
    image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    category: "Bharatanatyam Dancer",
    location: "Chennai",
    rating: 4.9,
    reviews: 234,
    price: "20,000",
    available: true,
    specialties: ["Classical Dance", "Choreography", "Cultural Programs"],
  },
  {
    id: "4",
    name: "Arjun Mehta",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Sitar Virtuoso",
    location: "Jaipur",
    rating: 4.7,
    reviews: 67,
    price: "18,000",
    available: true,
    specialties: ["Raga Performance", "Instrumental", "Meditation Music"],
  },
  {
    id: "5",
    name: "Kavya Reddy",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
    category: "Folk Dance Group",
    location: "Hyderabad",
    rating: 4.6,
    reviews: 145,
    price: "25,000",
    available: true,
    specialties: ["Kuchipudi", "Regional Folk", "Group Performance"],
  },
  {
    id: "6",
    name: "Vikram Singh",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=387&q=80",
    category: "Flute Artist",
    location: "Pune",
    rating: 4.8,
    reviews: 98,
    price: "10,000",
    available: false,
    specialties: ["Bansuri", "Spiritual Music", "Ambient Performance"],
  },
];

const ArtistsShowcase = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16 animate-slide-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
            Featured
            <span className="text-festival-gradient"> Artists</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover talented performers ready to make your event unforgettable. 
            From classical to contemporary, find artists across all genres.
          </p>
        </div>

        {/* Artists Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredArtists.map((artist, index) => (
            <div 
              key={artist.id} 
              className="animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ArtistCard artist={artist} />
            </div>
          ))}
        </div>

        {/* Browse More CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Showing 6 of 2000+ talented artists
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <button className="text-primary font-medium hover:text-primary/80 transition-colors underline underline-offset-4">
              Browse All Artists
            </button>
            <span className="text-muted-foreground hidden sm:block">•</span>
            <button className="text-primary font-medium hover:text-primary/80 transition-colors underline underline-offset-4">
              Filter by Category
            </button>
            <span className="text-muted-foreground hidden sm:block">•</span>
            <button className="text-primary font-medium hover:text-primary/80 transition-colors underline underline-offset-4">
              Available Now Only
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArtistsShowcase;