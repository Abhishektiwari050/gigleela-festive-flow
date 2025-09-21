import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://your-project.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'your-anon-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Artist {
  id: string
  name: string
  email: string
  phone: string
  specialization: string[]
  experience: number
  pricing: {
    hourly: number
    event: number
  }
  location: string
  bio: string
  portfolio_images: string[]
  profile_image: string
  rating: number
  total_reviews: number
  available: boolean
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  artist_id: string
  client_name: string
  client_email: string
  rating: number
  comment: string
  event_type: string
  event_date: string
  created_at: string
}

export interface Booking {
  id: string
  artist_id: string
  client_name: string
  client_email: string
  client_phone: string
  event_type: string
  event_date: string
  event_time: string
  duration: number
  location: string
  requirements: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  total_amount: number
  payment_status: 'pending' | 'paid' | 'refunded'
  created_at: string
  updated_at: string
}

export interface User {
  id: string
  email: string
  name: string
  user_type: 'client' | 'artist'
  profile_image?: string
  created_at: string
  updated_at: string
}