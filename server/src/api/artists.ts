
import express from 'express';
import { db, Artist, generateId } from '../db';

const router = express.Router();

// Get all artists with filtering, searching, and pagination
router.get('/', (req, res) => {
  try {
    const {
      search,
      category,
      location,
      availability,
      minPrice,
      maxPrice,
      featured,
      sortBy = 'name',
      sortOrder = 'asc',
      page = 1,
      limit = 10
    } = req.query;

    let filteredArtists = [...db.artists];

    // Search filter
    if (search) {
      const searchTerm = (search as string).toLowerCase();
      filteredArtists = filteredArtists.filter(artist => 
        artist.name.toLowerCase().includes(searchTerm) ||
        artist.specialty.toLowerCase().includes(searchTerm) ||
        artist.tags.some(tag => tag.toLowerCase().includes(searchTerm))
      );
    }

    // Category filter
    if (category && category !== 'all') {
      filteredArtists = filteredArtists.filter(artist => 
        artist.category.toLowerCase() === (category as string).toLowerCase()
      );
    }

    // Location filter
    if (location) {
      filteredArtists = filteredArtists.filter(artist => 
        artist.location.toLowerCase().includes((location as string).toLowerCase())
      );
    }

    // Availability filter
    if (availability) {
      filteredArtists = filteredArtists.filter(artist => 
        artist.availability === availability
      );
    }

    // Price filter
    if (minPrice) {
      filteredArtists = filteredArtists.filter(artist => 
        artist.price >= parseInt(minPrice as string)
      );
    }
    if (maxPrice) {
      filteredArtists = filteredArtists.filter(artist => 
        artist.price <= parseInt(maxPrice as string)
      );
    }

    // Featured filter
    if (featured === 'true') {
      filteredArtists = filteredArtists.filter(artist => artist.featured);
    }

    // Sorting
    filteredArtists.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'price':
          aValue = a.price;
          bValue = b.price;
          break;
        case 'rating':
          aValue = a.rating;
          bValue = b.rating;
          break;
        case 'reviews':
          aValue = a.reviews;
          bValue = b.reviews;
          break;
        case 'name':
        default:
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
      }
      
      if (sortOrder === 'desc') {
        return bValue > aValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });

    // Pagination
    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const startIndex = (pageNum - 1) * limitNum;
    const endIndex = startIndex + limitNum;
    const paginatedArtists = filteredArtists.slice(startIndex, endIndex);

    res.json({
      success: true,
      data: {
        artists: paginatedArtists,
        pagination: {
          total: filteredArtists.length,
          page: pageNum,
          limit: limitNum,
          totalPages: Math.ceil(filteredArtists.length / limitNum)
        }
      }
    });
  } catch (error) {
    console.error('Get artists error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get single artist by ID
router.get('/:id', (req, res) => {
  try {
    const artist = db.artists.find(artist => artist.id === req.params.id);
    if (!artist) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }
    
    res.json({
      success: true,
      data: { artist }
    });
  } catch (error) {
    console.error('Get artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Create new artist (requires authentication)
router.post('/', (req, res) => {
  try {
    const {
      userId,
      name,
      specialty,
      category,
      genres,
      location,
      bio,
      experience,
      image,
      price,
      priceUnit,
      tags,
      languages,
      contact
    } = req.body;

    // Validate required fields
    if (!userId || !name || !specialty || !category || !location || !price) {
      return res.status(400).json({
        success: false,
        message: 'UserId, name, specialty, category, location, and price are required'
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

    // Check if user is an artist
    if (user.role !== 'artist') {
      return res.status(403).json({
        success: false,
        message: 'Only artist users can create artist profiles'
      });
    }

    // Check if artist profile already exists for this user
    const existingArtist = db.artists.find(a => a.userId === userId);
    if (existingArtist) {
      return res.status(409).json({
        success: false,
        message: 'Artist profile already exists for this user'
      });
    }

    const newArtist: Artist = {
      id: generateId(),
      userId,
      name,
      specialty,
      category,
      genres: genres || [],
      location,
      bio,
      experience,
      image: image || `https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80`,
      rating: 0,
      reviews: 0,
      price: parseFloat(price),
      priceUnit: priceUnit || 'per_event',
      availability: 'available',
      featured: false,
      tags: tags || [],
      languages: languages || [],
      contact,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    db.artists.push(newArtist);

    res.status(201).json({
      success: true,
      message: 'Artist profile created successfully',
      data: { artist: newArtist }
    });
  } catch (error) {
    console.error('Create artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update artist by ID
router.put('/:id', (req, res) => {
  try {
    const artistId = req.params.id;
    const artistIndex = db.artists.findIndex(artist => artist.id === artistId);
    
    if (artistIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    const updatedFields = { ...req.body, updatedAt: new Date() };
    delete updatedFields.id; // Prevent ID modification
    delete updatedFields.userId; // Prevent userId modification
    delete updatedFields.createdAt; // Prevent createdAt modification

    db.artists[artistIndex] = {
      ...db.artists[artistIndex],
      ...updatedFields
    };

    res.json({
      success: true,
      message: 'Artist updated successfully',
      data: { artist: db.artists[artistIndex] }
    });
  } catch (error) {
    console.error('Update artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete artist by ID
router.delete('/:id', (req, res) => {
  try {
    const artistId = req.params.id;
    const artistIndex = db.artists.findIndex(artist => artist.id === artistId);
    
    if (artistIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Artist not found'
      });
    }

    const deletedArtist = db.artists.splice(artistIndex, 1)[0];

    res.json({
      success: true,
      message: 'Artist deleted successfully',
      data: { artist: deletedArtist }
    });
  } catch (error) {
    console.error('Delete artist error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get categories
router.get('/categories/all', (req, res) => {
  try {
    res.json({
      success: true,
      data: { categories: db.categories }
    });
  } catch (error) {
    console.error('Get categories error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;
