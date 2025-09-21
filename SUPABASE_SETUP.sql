-- Gigleela Festive Flow Database Setup
-- Copy and paste this entire script into your Supabase SQL Editor and run it

-- Create Artists table
CREATE TABLE IF NOT EXISTS artists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(20),
  specialization TEXT[] DEFAULT '{}',
  experience INTEGER DEFAULT 0,
  pricing JSONB DEFAULT '{"hourly": 0, "event": 0}',
  location VARCHAR(255),
  bio TEXT,
  portfolio_images TEXT[] DEFAULT '{}',
  profile_image TEXT,
  rating DECIMAL(3,2) DEFAULT 0.0,
  total_reviews INTEGER DEFAULT 0,
  available BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Reviews table
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  event_type VARCHAR(100),
  event_date DATE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  artist_id UUID REFERENCES artists(id) ON DELETE CASCADE,
  client_name VARCHAR(255) NOT NULL,
  client_email VARCHAR(255) NOT NULL,
  client_phone VARCHAR(20),
  event_type VARCHAR(100) NOT NULL,
  event_date DATE NOT NULL,
  event_time TIME NOT NULL,
  duration INTEGER DEFAULT 1,
  location VARCHAR(255) NOT NULL,
  requirements TEXT,
  status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled')),
  total_amount DECIMAL(10,2) DEFAULT 0.0,
  payment_status VARCHAR(20) DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'refunded')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert sample artists (with your exact data structure)
INSERT INTO artists (name, email, phone, specialization, experience, pricing, location, bio, profile_image, rating, total_reviews, available) VALUES
('Rajesh Kumar', 'rajesh@example.com', '+91-98765-43210', ARRAY['Classical Dance', 'Bharatanatyam'], 15, '{"hourly": 2500, "event": 15000}', 'Mumbai, India', 'Master of Bharatanatyam with 15+ years of experience in classical Indian dance forms.', '/api/placeholder/300/300', 4.8, 24, true),
('Priya Sharma', 'priya@example.com', '+91-87654-32109', ARRAY['Folk Music', 'Classical Vocals'], 12, '{"hourly": 2000, "event": 12000}', 'Jaipur, India', 'Renowned folk singer specializing in Rajasthani and Punjabi traditional music.', '/api/placeholder/300/300', 4.9, 18, true),
('Amit Singh', 'amit@example.com', '+91-76543-21098', ARRAY['Tabla', 'Percussion'], 20, '{"hourly": 1800, "event": 10000}', 'Delhi, India', 'Professional tabla player and percussion artist with expertise in Indian classical music.', '/api/placeholder/300/300', 4.7, 32, true),
('Lakshmi Nair', 'lakshmi@example.com', '+91-65432-10987', ARRAY['Kathakali', 'Traditional Theater'], 18, '{"hourly": 3000, "event": 18000}', 'Kochi, India', 'Expert in Kathakali and traditional Kerala performing arts with international recognition.', '/api/placeholder/300/300', 4.9, 15, true),
('Ravi Patel', 'ravi@example.com', '+91-54321-09876', ARRAY['Sitar', 'Indian Classical'], 25, '{"hourly": 3500, "event": 20000}', 'Varanasi, India', 'Sitar virtuoso and classical music composer with disciples worldwide.', '/api/placeholder/300/300', 5.0, 28, true),
('Meera Das', 'meera@example.com', '+91-43210-98765', ARRAY['Odissi Dance', 'Choreography'], 14, '{"hourly": 2200, "event": 13000}', 'Bhubaneswar, India', 'Professional Odissi dancer and choreographer specializing in temple dance traditions.', '/api/placeholder/300/300', 4.6, 21, true);

-- Insert sample reviews
INSERT INTO reviews (artist_id, client_name, client_email, rating, comment, event_type, event_date) VALUES
((SELECT id FROM artists WHERE name = 'Rajesh Kumar'), 'Sarah Johnson', 'sarah@example.com', 5, 'Absolutely mesmerizing performance! Rajesh brought such grace and authenticity to our wedding celebration.', 'Wedding', '2024-03-15'),
((SELECT id FROM artists WHERE name = 'Priya Sharma'), 'Michael Chen', 'michael@example.com', 5, 'Priya''s folk music performance was the highlight of our cultural festival. Truly exceptional!', 'Festival', '2024-02-20'),
((SELECT id FROM artists WHERE name = 'Amit Singh'), 'Lisa Wong', 'lisa@example.com', 4, 'Amazing tabla performance! The rhythm and energy were perfect for our event.', 'Concert', '2024-01-10'),
((SELECT id FROM artists WHERE name = 'Lakshmi Nair'), 'David Brown', 'david@example.com', 5, 'Spectacular Kathakali performance! Lakshmi''s artistry is truly world-class.', 'Cultural Event', '2024-04-05'),
((SELECT id FROM artists WHERE name = 'Ravi Patel'), 'Emma Wilson', 'emma@example.com', 5, 'Ravi''s sitar performance was absolutely divine. A truly spiritual experience.', 'Concert', '2024-03-22'),
((SELECT id FROM artists WHERE name = 'Meera Das'), 'James Taylor', 'james@example.com', 4, 'Beautiful Odissi dance performance. Meera''s choreography was stunning.', 'Cultural Show', '2024-02-14');

-- Insert sample bookings
INSERT INTO bookings (artist_id, client_name, client_email, client_phone, event_type, event_date, event_time, duration, location, requirements, status, total_amount) VALUES
((SELECT id FROM artists WHERE name = 'Rajesh Kumar'), 'John Smith', 'john@example.com', '+1-555-0123', 'Wedding Reception', '2024-12-15', '19:00', 2, 'Grand Ballroom, Hotel Taj', 'Traditional Bharatanatyam performance for 150 guests', 'confirmed', 15000),
((SELECT id FROM artists WHERE name = 'Priya Sharma'), 'Emily Davis', 'emily@example.com', '+1-555-0124', 'Cultural Event', '2024-11-20', '18:30', 3, 'Community Center, Downtown', 'Folk music performance with traditional instruments', 'pending', 12000),
((SELECT id FROM artists WHERE name = 'Amit Singh'), 'Robert Johnson', 'robert@example.com', '+1-555-0125', 'Corporate Event', '2024-10-30', '20:00', 1, 'Corporate Office, Tech Park', 'Tabla performance for company celebration', 'confirmed', 10000);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_artists_specialization ON artists USING GIN (specialization);
CREATE INDEX IF NOT EXISTS idx_artists_location ON artists (location);
CREATE INDEX IF NOT EXISTS idx_artists_rating ON artists (rating DESC);
CREATE INDEX IF NOT EXISTS idx_reviews_artist_id ON reviews (artist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_artist_id ON bookings (artist_id);
CREATE INDEX IF NOT EXISTS idx_bookings_event_date ON bookings (event_date);

-- Enable Row Level Security (RLS)
ALTER TABLE artists ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Create policies for public read access to artists and reviews
CREATE POLICY "Public artists are viewable by everyone" ON artists FOR SELECT USING (true);
CREATE POLICY "Public reviews are viewable by everyone" ON reviews FOR SELECT USING (true);

-- Create policies for bookings (authenticated users can see all for demo purposes)
CREATE POLICY "Users can view bookings" ON bookings FOR SELECT USING (true);
CREATE POLICY "Users can insert bookings" ON bookings FOR INSERT WITH CHECK (true);
CREATE POLICY "Users can update bookings" ON bookings FOR UPDATE USING (true);

-- Success message
SELECT 'Database setup completed! 🎉 Your Gigleela Festive Flow database is ready with 6 artists, reviews, and bookings.' as message;