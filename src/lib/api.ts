// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api';

interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

interface PaginationData {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'artist';
  phone?: string;
  location?: string;
  profileImage?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Artist {
  id: string;
  userId: string;
  name: string;
  specialty: string;
  category: string;
  genres: string[];
  location: string;
  bio?: string;
  experience?: string;
  image: string;
  images?: string[];
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
  createdAt: string;
  updatedAt: string;
}

export interface Booking {
  id: string;
  clientId: string;
  artistId: string;
  eventDate: string;
  eventType: string;
  duration: number;
  location: string;
  description?: string;
  budget: number;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
  updatedAt: string;
  client?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  artist?: {
    id: string;
    name: string;
    specialty: string;
    image: string;
    contact?: any;
  };
}

export interface Favorite {
  id: string;
  userId: string;
  artistId: string;
  createdAt: string;
  artist?: Artist;
}

export interface Review {
  id: string;
  artistId: string;
  clientId: string;
  bookingId: string;
  rating: number;
  comment?: string;
  createdAt: string;
  client?: {
    id: string;
    name: string;
  };
}

export interface Category {
  id: string;
  name: string;
  description?: string;
  image?: string;
}

// API Client Class
class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string = API_BASE_URL) {
    this.baseURL = baseURL;
    this.loadTokenFromStorage();
  }

  private loadTokenFromStorage() {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string) {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken() {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || `HTTP error! status: ${response.status}`);
      }

      return data;
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Auth API
  async signUp(userData: {
    name: string;
    email: string;
    password: string;
    role: 'client' | 'artist';
    phone?: string;
    location?: string;
  }) {
    const response = await this.request<{ user: User; token: string }>('/auth/signup', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async signIn(credentials: { email: string; password: string }) {
    const response = await this.request<{ user: User; token: string }>('/auth/signin', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
    
    if (response.data?.token) {
      this.setToken(response.data.token);
    }
    
    return response;
  }

  async getCurrentUser() {
    return this.request<{ user: User }>('/auth/me');
  }

  async refreshToken(token: string) {
    return this.request<{ token: string }>('/auth/refresh', {
      method: 'POST',
      body: JSON.stringify({ token }),
    });
  }

  // Artists API
  async getArtists(params?: {
    search?: string;
    category?: string;
    location?: string;
    availability?: string;
    minPrice?: number;
    maxPrice?: number;
    featured?: boolean;
    sortBy?: string;
    sortOrder?: 'asc' | 'desc';
    page?: number;
    limit?: number;
  }) {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          queryParams.append(key, value.toString());
        }
      });
    }
    
    const queryString = queryParams.toString();
    const endpoint = `/artists${queryString ? `?${queryString}` : ''}`;
    
    return this.request<{ artists: Artist[]; pagination: PaginationData }>(endpoint);
  }

  async getArtist(id: string) {
    return this.request<{ artist: Artist }>(`/artists/${id}`);
  }

  async createArtist(artistData: Partial<Artist>) {
    return this.request<{ artist: Artist }>('/artists', {
      method: 'POST',
      body: JSON.stringify(artistData),
    });
  }

  async updateArtist(id: string, artistData: Partial<Artist>) {
    return this.request<{ artist: Artist }>(`/artists/${id}`, {
      method: 'PUT',
      body: JSON.stringify(artistData),
    });
  }

  async deleteArtist(id: string) {
    return this.request<{ artist: Artist }>(`/artists/${id}`, {
      method: 'DELETE',
    });
  }

  async getCategories() {
    return this.request<{ categories: Category[] }>('/artists/categories/all');
  }

  // Users API
  async getUser(id: string) {
    return this.request<{ user: User }>(`/users/${id}`);
  }

  async updateUser(id: string, userData: Partial<User>) {
    return this.request<{ user: User }>(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(userData),
    });
  }

  async changePassword(id: string, passwords: { currentPassword: string; newPassword: string }) {
    return this.request(`/users/${id}/password`, {
      method: 'PUT',
      body: JSON.stringify(passwords),
    });
  }

  async getUserBookings(id?: string) {
    const endpoint = id ? `/users/${id}/bookings` : '/bookings/user';
    return this.request<{ bookings: Booking[] }>(endpoint);
  }

  async getUserFavorites(id: string) {
    return this.request<{ favorites: Favorite[] }>(`/users/${id}/favorites`);
  }

  // Favorites API - consolidated methods
  async getFavorites(userId?: string) {
    if (userId) {
      return this.request<{ favorites: Favorite[] }>(`/favorites/${userId}`);
    }
    return this.request<Favorite[]>('/favorites');
  }

  async addFavorite(artistId: string) {
    return this.request<{ favorite: Favorite }>('/favorites', {
      method: 'POST',
      body: JSON.stringify({ artistId }),
    });
  }

  async removeFavorite(artistId: string) {
    return this.request<{ favorite: Favorite }>(`/favorites/${artistId}`, {
      method: 'DELETE',
    });
  }

  // Reviews API
  async getReviews(artistId: string) {
    return this.request<{ reviews: Review[] }>(`/reviews/artist/${artistId}`);
  }

  async getArtistReviews(artistId: string) {
    return this.request<Review[]>(`/reviews/artist/${artistId}`);
  }

  async addReview(reviewData: {
    artistId: string;
    clientId: string;
    bookingId: string;
    rating: number;
    comment?: string;
  }) {
    return this.request<{ review: Review }>('/reviews', {
      method: 'POST',
      body: JSON.stringify(reviewData),
    });
  }

  // Get artist bookings
  async getArtistBookings(artistId: string) {
    return this.request<Booking[]>(`/bookings/artist/${artistId}`);
  }
}

// Create and export a singleton instance
export const apiClient = new ApiClient();
export default apiClient;