# Gigleela Festive Flow - Database Setup Guide

## Option 1: Supabase (Recommended) 🚀

### Why Supabase?
- **Free tier**: Up to 50MB database, 2 projects
- **Built-in authentication**: JWT, social login, email verification
- **Real-time subscriptions**: Live updates for bookings/reviews
- **Auto-generated APIs**: REST and GraphQL endpoints
- **Dashboard**: Visual database management
- **File storage**: For artist images and portfolios

### Setup Steps:

#### 1. Create Supabase Account
1. Go to [supabase.com](https://supabase.com)
2. Sign up with GitHub/Google
3. Create a new project
4. Choose a region close to your users

#### 2. Database Setup
1. Go to **SQL Editor** in your Supabase dashboard
2. Copy and paste the entire content from `database/setup.sql`
3. Click **Run** to create all tables and sample data

#### 3. Get Your Credentials
1. Go to **Settings** → **API**
2. Copy your:
   - **Project URL**
   - **Anon/Public Key**

#### 4. Environment Setup
Create `.env.local` in your project root:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

#### 5. Enable Authentication (Optional)
1. Go to **Authentication** → **Settings**
2. Enable email/password authentication
3. Configure email templates
4. Set up social providers if needed

#### 6. File Storage Setup
1. Go to **Storage**
2. Create a bucket called `artist-images`
3. Set it to public for easy access
4. Upload sample images

---

## Option 2: Airtable (Simple Alternative) 📊

### Why Airtable?
- **Visual interface**: Spreadsheet-like database
- **No SQL required**: Point-and-click setup
- **Built-in forms**: For artist registration
- **API access**: REST API for all data
- **Free tier**: 1,200 records per base

### Setup Steps:

#### 1. Create Airtable Account
1. Go to [airtable.com](https://airtable.com)
2. Sign up and create a new base
3. Name it "Gigleela Artists"

#### 2. Create Tables
Create these tables with the following fields:

**Artists Table:**
- Name (Single line text)
- Email (Email)
- Phone (Phone number)
- Specialization (Multiple select)
- Experience (Number)
- Hourly Rate (Currency)
- Event Rate (Currency)
- Location (Single line text)
- Bio (Long text)
- Profile Image (Attachment)
- Portfolio (Attachment)
- Rating (Number)
- Total Reviews (Number)
- Available (Checkbox)

**Reviews Table:**
- Artist (Link to Artists)
- Client Name (Single line text)
- Client Email (Email)
- Rating (Single select: 1,2,3,4,5)
- Comment (Long text)
- Event Type (Single line text)
- Event Date (Date)

**Bookings Table:**
- Artist (Link to Artists)
- Client Name (Single line text)
- Client Email (Email)  
- Client Phone (Phone number)
- Event Type (Single line text)
- Event Date (Date)
- Event Time (Single line text)
- Duration (Number)
- Location (Single line text)
- Requirements (Long text)
- Status (Single select: Pending, Confirmed, Completed, Cancelled)
- Total Amount (Currency)
- Payment Status (Single select: Pending, Paid, Refunded)

#### 3. Get API Credentials
1. Go to your base
2. Click **Help** → **API documentation**
3. Copy your Base ID and API key
4. Add to `.env.local`:

```env
VITE_AIRTABLE_BASE_ID=your-base-id
VITE_AIRTABLE_API_KEY=your-api-key
```

---

## Option 3: Google Sheets (Quick Start) 📈

### Why Google Sheets?
- **Free**: No limits for basic usage
- **Familiar**: Everyone knows spreadsheets
- **Collaborative**: Multiple people can edit
- **API access**: Google Sheets API
- **Easy backup**: Always in Google Drive

### Setup Steps:

#### 1. Create Google Sheets
1. Create 3 sheets: "Artists", "Reviews", "Bookings"
2. Add column headers as per the database schema
3. Add sample data

#### 2. Enable API Access
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a new project
3. Enable Google Sheets API
4. Create service account credentials
5. Download the JSON key file

#### 3. Share Sheets
1. Share each sheet with the service account email
2. Give "Editor" permissions

#### 4. Environment Setup
```env
VITE_GOOGLE_SHEETS_ID=your-spreadsheet-id
VITE_GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
```

---

## Current Implementation Status ✅

### What's Ready:
- ✅ **Database schema** (SQL file ready for Supabase)
- ✅ **Service functions** (CRUD operations)
- ✅ **TypeScript types** (Full type safety)
- ✅ **Sample data** (6 artists, reviews, bookings)
- ✅ **Frontend integration** (Ready to connect)

### Integration Points:
- **Artists Page**: `/artists` → `artistService.getArtists()`
- **Artist Profile**: `/artist/:id` → `artistService.getArtistById()`
- **Booking Flow**: Creates entries via `bookingService.createBooking()`
- **Reviews**: Displays via `reviewService` and `artistService.getArtistReviews()`
- **Search**: Uses `artistService.searchArtists()`

### To Connect Real Database:
1. Choose your preferred option above
2. Set up the database/service
3. Add environment variables
4. Replace sample data in components with service calls

---

## Recommendation 🎯

**Start with Supabase** because:
- Most complete solution
- Built for web apps
- Handles authentication
- Real-time features
- Easy to scale
- Great developer experience

Once you have Supabase set up, all your data will be persistent and accessible via a beautiful dashboard at `https://your-project.supabase.co`!

## Data Access URLs After Setup:

- **Supabase Dashboard**: `https://your-project.supabase.co`
- **API Endpoints**: `https://your-project.supabase.co/rest/v1/artists`
- **Backend Status Page**: `http://localhost:8083/backend-status`
- **Artists Data**: `http://localhost:8083/artists`