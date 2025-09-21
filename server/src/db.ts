
// Types
export interface User {
  id: string;
  name: string;
  email: string;
  password: string; // In production, this should be hashed
  role: 'client' | 'artist';
  phone?: string;
  location?: string;
  profileImage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Artist {
  id: string;
  userId: string; // Reference to User
  name: string;
  specialty: string;
  category: string;
  genres: string[];
  location: string;
  bio?: string;
  experience?: string;
  image: string;
  images?: string[]; // Additional portfolio images
  rating: number;
  reviews: number;
  price: number;
  priceUnit: 'per_hour' | 'per_event' | 'per_day';
  availability: 'available' | 'busy' | 'unavailable';
  featured: boolean;
  tags: string[];
  languages?: string[];
  contact?: {
    phone?: string;
    email?: string;
    website?: string;
    socialMedia?: {
      facebook?: string;
      instagram?: string;
      youtube?: string;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface Booking {
  id: string;
  clientId: string; // Reference to User
  artistId: string; // Reference to Artist
  eventDate: Date;
  eventType: string;
  duration: number; // in hours
  location: string;
  description?: string;
  budget: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

export interface Favorite {
  id: string;
  userId: string; // Reference to User
  artistId: string; // Reference to Artist
  createdAt: Date;
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

export interface Review {
  id: string;
  artistId: string;
  clientId: string;
  bookingId: string;
  rating: number;
  comment?: string;
  createdAt: Date;
}

// Database
// Helper functions
export const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const db = {
  users: [
    {
      id: '1',
      name: 'John Client',
      email: 'client@example.com',
      password: 'password123', // In production, use bcrypt
      role: 'client' as const,
      phone: '+91-9876543210',
      location: 'Mumbai, Maharashtra',
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: '2',
      name: 'Priya Sharma',
      email: 'priya.sharma@example.com',
      password: 'artist123',
      role: 'artist' as const, 
      phone: '+91-9876543211',
      location: 'Mumbai, Maharashtra',
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    }
  ] as User[],
  
  artists: [
    {
      id: '1',
      userId: '2',
      name: 'Priya Sharma',
      specialty: 'Classical Singer',
      category: 'Music',
      genres: ['Hindustani Classical', 'Devotional', 'Wedding Songs'],
      location: 'Mumbai, Maharashtra',
      bio: 'Master of Hindustani classical music with 15+ years of experience.',
      experience: '15 years',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=464&q=80',
      images: [
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&auto=format&fit=crop&w=464&q=80'
      ],
      rating: 4.9,
      reviews: 156,
      price: 15000,
      priceUnit: 'per_event' as const,
      availability: 'available' as const,
      featured: true,
      tags: ['Hindustani Classical', 'Devotional Songs', 'Wedding Songs'],
      languages: ['Hindi', 'English', 'Marathi'],
      contact: {
        phone: '+91-9876543211',
        email: 'priya.sharma@example.com'
      },
      createdAt: new Date('2024-01-10'),
      updatedAt: new Date('2024-01-10')
    },
    {
      id: '2',
      userId: '3',
      name: 'Raj Bhattacharya',
      specialty: 'Tabla Maestro',
      category: 'Music',
      genres: ['Classical', 'Fusion'],
      location: 'Delhi, NCR',
      bio: 'Renowned tabla player with expertise in classical and fusion music.',
      experience: '20 years',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
      rating: 4.8,
      reviews: 89,
      price: 12000,
      priceUnit: 'per_event' as const,
      availability: 'busy' as const,
      featured: false,
      tags: ['Classical Tabla', 'Fusion', 'Live Accompaniment'],
      languages: ['Hindi', 'English', 'Bengali'],
      createdAt: new Date('2024-01-12'),
      updatedAt: new Date('2024-01-12')
    },
    {
      id: '3',
      userId: '4',
      name: 'Meera Nair',
      specialty: 'Bharatanatyam Dancer',
      category: 'Dance',
      genres: ['Classical Dance', 'Traditional'],
      location: 'Chennai, Tamil Nadu',
      bio: 'Classical Bharatanatyam dancer and choreographer.',
      experience: '12 years',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80',
      rating: 4.9,
      reviews: 234,
      price: 20000,
      priceUnit: 'per_event' as const,
      availability: 'available' as const,
      featured: true,
      tags: ['Classical Dance', 'Choreography', 'Cultural Programs'],
      languages: ['Tamil', 'English', 'Hindi'],
      createdAt: new Date('2024-01-08'),
      updatedAt: new Date('2024-01-08')
    }
  ] as Artist[],
  
  categories: [
    { id: '1', name: 'Classical Music', description: 'Traditional Indian classical music' },
    { id: '2', name: 'Folk Dance', description: 'Regional folk dances from across India' },
    { id: '3', name: 'Devotional', description: 'Spiritual and devotional performances' },
    { id: '4', name: 'Fusion', description: 'Modern fusion of traditional and contemporary' },
    { id: '5', name: 'Instrumental', description: 'Traditional and modern instruments' }
  ] as Category[],
  
  bookings: [
    {
      id: '1',
      clientId: '1',
      artistId: '1',
      eventDate: new Date('2024-02-15'),
      eventType: 'Wedding',
      duration: 3,
      location: 'Mumbai, Maharashtra',
      description: 'Wedding ceremony performance',
      budget: 15000,
      status: 'confirmed' as const,
      createdAt: new Date('2024-01-20'),
      updatedAt: new Date('2024-01-20')
    }
  ] as Booking[],
  
  favorites: [
    {
      id: '1',
      userId: '1',
      artistId: '1',
      createdAt: new Date('2024-01-18')
    }
  ] as Favorite[],
  
  reviews: [
    {
      id: '1',
      artistId: '1',
      clientId: '1',
      bookingId: '1',
      rating: 5,
      comment: 'Amazing performance! Highly recommended.',
      createdAt: new Date('2024-01-22')
    }
  ] as Review[]
};
