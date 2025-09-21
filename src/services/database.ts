import { supabase, Artist, Review, Booking } from '@/lib/supabase'

// Artist service functions
export const artistService = {
  // Get all artists with optional filters
  async getArtists(filters?: {
    specialization?: string
    location?: string
    minRating?: number
    maxPrice?: number
  }) {
    let query = supabase
      .from('artists')
      .select('*')
      .eq('available', true)
      .order('rating', { ascending: false })

    if (filters?.specialization) {
      query = query.contains('specialization', [filters.specialization])
    }
    
    if (filters?.location) {
      query = query.ilike('location', `%${filters.location}%`)
    }
    
    if (filters?.minRating) {
      query = query.gte('rating', filters.minRating)
    }

    const { data, error } = await query
    
    if (error) {
      console.error('Error fetching artists:', error)
      return { data: null, error }
    }
    
    return { data, error: null }
  },

  // Get single artist by ID
  async getArtistById(id: string) {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      console.error('Error fetching artist:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  // Get artist reviews
  async getArtistReviews(artistId: string) {
    const { data, error } = await supabase
      .from('reviews')
      .select('*')
      .eq('artist_id', artistId)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching reviews:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  // Search artists
  async searchArtists(searchTerm: string) {
    const { data, error } = await supabase
      .from('artists')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,bio.ilike.%${searchTerm}%,location.ilike.%${searchTerm}%`)
      .eq('available', true)
      .order('rating', { ascending: false })

    if (error) {
      console.error('Error searching artists:', error)
      return { data: null, error }
    }

    return { data, error: null }
  }
}

// Booking service functions
export const bookingService = {
  // Create a new booking
  async createBooking(booking: Omit<Booking, 'id' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('bookings')
      .insert([booking])
      .select()
      .single()

    if (error) {
      console.error('Error creating booking:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  // Get bookings for a user
  async getUserBookings(userEmail: string) {
    const { data, error } = await supabase
      .from('bookings')
      .select(`
        *,
        artists:artist_id (
          name,
          profile_image,
          specialization
        )
      `)
      .eq('client_email', userEmail)
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Error fetching user bookings:', error)
      return { data: null, error }
    }

    return { data, error: null }
  },

  // Update booking status
  async updateBookingStatus(bookingId: string, status: string) {
    const { data, error } = await supabase
      .from('bookings')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', bookingId)
      .select()
      .single()

    if (error) {
      console.error('Error updating booking:', error)
      return { data: null, error }
    }

    return { data, error: null }
  }
}

// Review service functions
export const reviewService = {
  // Add a new review
  async addReview(review: Omit<Review, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('reviews')
      .insert([review])
      .select()
      .single()

    if (error) {
      console.error('Error adding review:', error)
      return { data: null, error }
    }

    // Update artist rating
    await this.updateArtistRating(review.artist_id)

    return { data, error: null }
  },

  // Update artist rating based on reviews
  async updateArtistRating(artistId: string) {
    const { data: reviews, error } = await supabase
      .from('reviews')
      .select('rating')
      .eq('artist_id', artistId)

    if (error || !reviews) return

    const avgRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length
    const totalReviews = reviews.length

    await supabase
      .from('artists')
      .update({ 
        rating: Number(avgRating.toFixed(1)), 
        total_reviews: totalReviews,
        updated_at: new Date().toISOString()
      })
      .eq('id', artistId)
  }
}

// Analytics service
export const analyticsService = {
  // Get dashboard stats
  async getDashboardStats() {
    const [artistsRes, bookingsRes, reviewsRes] = await Promise.all([
      supabase.from('artists').select('id').eq('available', true),
      supabase.from('bookings').select('id, status'),
      supabase.from('reviews').select('rating')
    ])

    const totalArtists = artistsRes.data?.length || 0
    const totalBookings = bookingsRes.data?.length || 0
    const avgRating = reviewsRes.data?.length 
      ? reviewsRes.data.reduce((sum, r) => sum + r.rating, 0) / reviewsRes.data.length 
      : 0

    return {
      totalArtists,
      totalBookings,
      avgRating: Number(avgRating.toFixed(1)),
      pendingBookings: bookingsRes.data?.filter(b => b.status === 'pending').length || 0
    }
  }
}