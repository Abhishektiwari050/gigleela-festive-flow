
import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { errorHandler, requestLogger, rateLimiter, corsOptions } from './middleware/auth';

const app = express();
const port = process.env.PORT || 3001;

// Middleware
app.use(cors(corsOptions));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(requestLogger);
app.use(rateLimiter());

// Routes
import authRouter from './api/auth';
import artistsRouter from './api/artists';
import usersRouter from './api/users';
import bookingsRouter from './api/bookings';

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// API routes
app.use('/api/auth', authRouter);
app.use('/api/artists', artistsRouter);
app.use('/api/users', usersRouter);
app.use('/api', bookingsRouter); // bookings, favorites, reviews

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Error handling middleware (must be last)
app.use(errorHandler);

// Start server
app.listen(port, () => {
  console.log(`🚀 Server is running on http://localhost:${port}`);
  console.log(`📝 API Documentation available at http://localhost:${port}/health`);
  console.log('\n🔗 Available endpoints:');
  console.log('  • GET  /health - Health check');
  console.log('  • POST /api/auth/signup - User registration');
  console.log('  • POST /api/auth/signin - User login');
  console.log('  • GET  /api/auth/me - Get current user');
  console.log('  • GET  /api/artists - Get all artists (with filtering)');
  console.log('  • GET  /api/artists/:id - Get single artist');
  console.log('  • POST /api/artists - Create artist profile');
  console.log('  • GET  /api/users/:id - Get user profile');
  console.log('  • GET  /api/bookings - Get bookings');
  console.log('  • POST /api/bookings - Create booking');
  console.log('  • GET  /api/favorites/:userId - Get user favorites');
  console.log('  • POST /api/favorites - Add to favorites');
});
