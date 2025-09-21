import express from 'express';
import { db, User, generateId } from '../db';

const router = express.Router();

// Get all users (admin only)
router.get('/', (req, res) => {
  try {
    const users = db.users.map(user => {
      const { password, ...userWithoutPassword } = user;
      return userWithoutPassword;
    });
    
    res.json({
      success: true,
      data: { users }
    });
  } catch (error) {
    console.error('Get users error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user by ID
router.get('/:id', (req, res) => {
  try {
    const user = db.users.find(u => u.id === req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const { password, ...userWithoutPassword } = user;
    res.json({
      success: true,
      data: { user: userWithoutPassword }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Update user profile
router.put('/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const userIndex = db.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const updatedFields = { ...req.body, updatedAt: new Date() };
    delete updatedFields.id; // Prevent ID modification
    delete updatedFields.password; // Password updates should go through separate endpoint
    delete updatedFields.role; // Role updates should be restricted
    delete updatedFields.createdAt; // Prevent createdAt modification

    db.users[userIndex] = {
      ...db.users[userIndex],
      ...updatedFields
    };

    const { password, ...userWithoutPassword } = db.users[userIndex];
    res.json({
      success: true,
      message: 'User profile updated successfully',
      data: { user: userWithoutPassword }
    });
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Change password
router.put('/:id/password', (req, res) => {
  try {
    const userId = req.params.id;
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({
        success: false,
        message: 'Current password and new password are required'
      });
    }

    const userIndex = db.users.findIndex(u => u.id === userId);
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    // Verify current password (in production, use bcrypt.compare)
    if (db.users[userIndex].password !== currentPassword) {
      return res.status(401).json({
        success: false,
        message: 'Current password is incorrect'
      });
    }

    // Update password (in production, hash with bcrypt)
    db.users[userIndex].password = newPassword;
    db.users[userIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Password updated successfully'
    });
  } catch (error) {
    console.error('Change password error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Delete user
router.delete('/:id', (req, res) => {
  try {
    const userId = req.params.id;
    const userIndex = db.users.findIndex(u => u.id === userId);
    
    if (userIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const deletedUser = db.users.splice(userIndex, 1)[0];
    
    // Also delete related data
    if (deletedUser.role === 'artist') {
      // Remove artist profile
      const artistIndex = db.artists.findIndex(a => a.userId === userId);
      if (artistIndex !== -1) {
        db.artists.splice(artistIndex, 1);
      }
    }
    
    // Remove bookings
    db.bookings = db.bookings.filter(b => b.clientId !== userId);
    
    // Remove favorites
    db.favorites = db.favorites.filter(f => f.userId !== userId);
    
    // Remove reviews
    db.reviews = db.reviews.filter(r => r.clientId !== userId);

    const { password, ...userWithoutPassword } = deletedUser;
    res.json({
      success: true,
      message: 'User deleted successfully',
      data: { user: userWithoutPassword }
    });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's bookings
router.get('/:id/bookings', (req, res) => {
  try {
    const userId = req.params.id;
    
    // Find user
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    let bookings: any[];
    if (user.role === 'client') {
      bookings = db.bookings.filter(b => b.clientId === userId);
    } else {
      // For artists, find bookings for their artist profile
      const artist = db.artists.find(a => a.userId === userId);
      if (artist) {
        bookings = db.bookings.filter(b => b.artistId === artist.id);
      } else {
        bookings = [];
      }
    }

    res.json({
      success: true,
      data: { bookings }
    });
  } catch (error) {
    console.error('Get user bookings error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

// Get user's favorites
router.get('/:id/favorites', (req, res) => {
  try {
    const userId = req.params.id;
    
    const user = db.users.find(u => u.id === userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    const userFavorites = db.favorites.filter(f => f.userId === userId);
    const favoriteArtists = userFavorites.map(fav => {
      const artist = db.artists.find(a => a.id === fav.artistId);
      return {
        ...fav,
        artist
      };
    }).filter(item => item.artist); // Filter out favorites where artist no longer exists

    res.json({
      success: true,
      data: { favorites: favoriteArtists }
    });
  } catch (error) {
    console.error('Get user favorites error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
});

export default router;