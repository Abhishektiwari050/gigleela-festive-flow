import express from 'express';
import { db, Booking, Favorite, Review, generateId } from '../db';

const router = express.Router();

// ========== BOOKINGS API ==========

// Get all bookings (with filtering)
router.get('/bookings', (req, res) => {
  try {
    const { clientId, artistId, status, page = 1, limit = 10 } = req.query;
    
    let filteredBookings = [...db.bookings];
    
    if (clientId) {
      filteredBookings = filteredBookings.filter(b => b.clientId === clientId);
    }
    
    if (artistId) {
      filteredBookings = filteredBookings.filter(b => b.artistId === artistId);
    }
    
    if (status) {
      filteredBookings = filteredBookings.filter(b => b.status === status);
    }
    
    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedBookings = filteredBookings.slice(startIndex, endIndex);
    
    // Populate with client and artist details
    const enrichedBookings = paginatedBookings.map(booking => {
      const client = db.users.find(u => u.id === booking.clientId);
      const artist = db.artists.find(a => a.id === booking.artistId);
      
      return {
        ...booking,
        client: client ? { id: client.id, name: client.name, email: client.email } : null,
        artist: artist ? { id: artist.id, name: artist.name, specialty: artist.specialty } : null
      };
    });
    
    res.json({
      success: true,
      data: {
        bookings: enrichedBookings,
        pagination: {
          total: filteredBookings.length,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(filteredBookings.length / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single booking
router.get('/bookings/:id', (req, res) => {
  try {
    const booking = db.bookings.find(b => b.id === req.params.id);
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    // Populate with client and artist details
    const client = db.users.find(u => u.id === booking.clientId);
    const artist = db.artists.find(a => a.id === booking.artistId);
    
    const enrichedBooking = {
      ...booking,
      client: client ? { id: client.id, name: client.name, email: client.email, phone: client.phone } : null,
      artist: artist ? { 
        id: artist.id, 
        name: artist.name, 
        specialty: artist.specialty, 
        image: artist.image,
        contact: artist.contact 
      } : null
    };
    
    res.json({
      success: true,
      data: { booking: enrichedBooking }
    });
  } catch (error) {
    console.error('Get booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new booking
router.post('/bookings', (req, res) => {
  try {
    const {
      clientId,
      artistId,
      eventDate,
      eventType,
      duration,
      location,
      description,
      budget
    } = req.body;
    
    // Validate required fields
    if (!clientId || !artistId || !eventDate || !eventType || !duration || !location || !budget) {
      return res.status(400).json({
        success: false,
        message: 'All required fields must be provided'
      });
    }
    
    // Validate client exists
    const client = db.users.find(u => u.id === clientId && u.role === 'client');
    if (!client) {
      return res.status(404).json({
        success: false,
        message: 'Client not found'
      });
    }
    
    // Validate artist exists
    const artist = db.artists.find(a => a.id === artistId);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }
    
    // Check artist availability
    if (artist.availability !== 'available') {
      return res.status(400).json({
        success: false,
        message: 'Artist is not available for booking'
      });
    }
    
    const newBooking: Booking = {
      id: generateId(),
      clientId,
      artistId,
      eventDate: new Date(eventDate),
      eventType,
      duration: parseInt(duration),
      location,
      description,
      budget: parseFloat(budget),
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    db.bookings.push(newBooking);
    
    res.status(201).json({
      success: true,
      message: 'Booking created successfully',
      data: { booking: newBooking }
    });
  } catch (error) {
    console.error('Create booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update booking status
router.put('/bookings/:id', (req, res) => {
  try {
    const bookingId = req.params.id;
    const { status } = req.body;
    
    const bookingIndex = db.bookings.findIndex(b => b.id === bookingId);
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    if (!status || !['pending', 'confirmed', 'cancelled', 'completed'].includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Valid status is required (pending, confirmed, cancelled, completed)'
      });
    }
    
    db.bookings[bookingIndex].status = status;
    db.bookings[bookingIndex].updatedAt = new Date();
    
    res.json({
      success: true,
      message: 'Booking status updated successfully',
      data: { booking: db.bookings[bookingIndex] }
    });
  } catch (error) {
    console.error('Update booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete booking
router.delete('/bookings/:id', (req, res) => {
  try {
    const bookingId = req.params.id;
    const bookingIndex = db.bookings.findIndex(b => b.id === bookingId);
    
    if (bookingIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Booking not found'
      });
    }
    
    const deletedBooking = db.bookings.splice(bookingIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Booking deleted successfully',
      data: { booking: deletedBooking }
    });
  } catch (error) {
    console.error('Delete booking error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ========== FAVORITES API ==========

// Get user's favorites
router.get('/favorites/:userId', (req, res) => {
  try {
    const userId = req.params.userId;
    
    const userFavorites = db.favorites.filter(f => f.userId === userId);
    const favoriteArtists = userFavorites.map(fav => {
      const artist = db.artists.find(a => a.id === fav.artistId);
      return {
        ...fav,
        artist
      };
    }).filter(item => item.artist);
    
    res.json({
      success: true,
      data: { favorites: favoriteArtists }
    });
  } catch (error) {
    console.error('Get favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add to favorites
router.post('/favorites', (req, res) => {
  try {
    const { userId, artistId } = req.body;
    
    if (!userId || !artistId) {
      return res.status(400).json({
        success: false,
        message: 'UserId and artistId are required'
      });
    }
    
    // Check if user exists
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Check if artist exists
    const artist = db.artists.find(a => a.id === artistId);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }
    
    // Check if already in favorites
    const existingFavorite = db.favorites.find(f => f.userId === userId && f.artistId === artistId);
    if (existingFavorite) {
      return res.status(409).json({
        success: false,
        message: 'Artist already in favorites'
      });
    }
    
    const newFavorite: Favorite = {
      id: generateId(),
      userId,
      artistId,
      createdAt: new Date()
    };
    
    db.favorites.push(newFavorite);
    
    res.status(201).json({
      success: true,
      message: 'Artist added to favorites',
      data: { favorite: newFavorite }
    });
  } catch (error) {
    console.error('Add favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Remove from favorites
router.delete('/favorites/:userId/:artistId', (req, res) => {
  try {
    const { userId, artistId } = req.params;
    
    const favoriteIndex = db.favorites.findIndex(f => f.userId === userId && f.artistId === artistId);
    if (favoriteIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Favorite not found'
      });
    }
    
    const deletedFavorite = db.favorites.splice(favoriteIndex, 1)[0];
    
    res.json({
      success: true,
      message: 'Artist removed from favorites',
      data: { favorite: deletedFavorite }
    });
  } catch (error) {
    console.error('Remove favorite error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// ========== REVIEWS API ==========

// Get reviews for an artist
router.get('/reviews/artist/:artistId', (req, res) => {
  try {
    const artistId = req.params.artistId;
    const artistReviews = db.reviews.filter(r => r.artistId === artistId);
    
    // Populate with client details
    const enrichedReviews = artistReviews.map(review => {
      const client = db.users.find(u => u.id === review.clientId);
      return {
        ...review,
        client: client ? { id: client.id, name: client.name } : null
      };
    });
    
    res.json({
      success: true,
      data: { reviews: enrichedReviews }
    });
  } catch (error) {
    console.error('Get reviews error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Add review
router.post('/reviews', (req, res) => {
  try {
    const { artistId, clientId, bookingId, rating, comment } = req.body;
    
    if (!artistId || !clientId || !bookingId || !rating) {
      return res.status(400).json({
        success: false,
        message: 'ArtistId, clientId, bookingId, and rating are required'
      });
    }
    
    if (rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }
    
    // Verify booking exists and is completed
    const booking = db.bookings.find(b => b.id === bookingId && b.status === 'completed');
    if (!booking) {
      return res.status(404).json({
        success: false,
        message: 'Completed booking not found'
      });
    }
    
    // Check if review already exists for this booking
    const existingReview = db.reviews.find(r => r.bookingId === bookingId);
    if (existingReview) {
      return res.status(409).json({
        success: false,
        message: 'Review already exists for this booking'
      });
    }
    
    const newReview: Review = {
      id: generateId(),
      artistId,
      clientId,
      bookingId,
      rating: parseInt(rating),
      comment,
      createdAt: new Date()
    };
    
    db.reviews.push(newReview);
    
    // Update artist's rating and review count
    const artistIndex = db.artists.findIndex(a => a.id === artistId);
    if (artistIndex !== -1) {
      const artistReviews = db.reviews.filter(r => r.artistId === artistId);
      const totalRating = artistReviews.reduce((sum, r) => sum + r.rating, 0);
      db.artists[artistIndex].rating = totalRating / artistReviews.length;
      db.artists[artistIndex].reviews = artistReviews.length;
    }
    
    res.status(201).json({
      success: true,
      message: 'Review added successfully',
      data: { review: newReview }
    });
  } catch (error) {
    console.error('Add review error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;