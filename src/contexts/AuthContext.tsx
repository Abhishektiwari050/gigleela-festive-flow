import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Mock User interface (simplified)
interface User {
  id: string;
  name: string;
  email: string;
  role: 'client' | 'artist';
  phone?: string;
  location?: string;
  profileImage?: string;
}

// Types
interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'LOGOUT' };

interface AuthContextType extends AuthState {
  signIn: (email: string, password: string) => Promise<boolean>;
  signUp: (userData: {
    name: string;
    email: string;
    password: string;
    role: 'client' | 'artist';
    phone?: string;
    location?: string;
  }) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => Promise<boolean>;
}

// Initial state
const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
  error: null,
};

// Reducer
function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'SET_LOADING':
      return {
        ...state,
        isLoading: action.payload,
      };
    case 'SET_USER':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: !!action.payload,
        isLoading: false,
        error: null,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };
    case 'LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    default:
      return state;
  }
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  const { toast } = useToast();

  // Check for existing auth on mount - mock implementation
  useEffect(() => {
    const checkAuth = () => {
      try {
        dispatch({ type: 'SET_LOADING', payload: true });
        // Mock auth check - simulate no existing user
        dispatch({ type: 'SET_USER', payload: null });
      } catch (error) {
        console.log('No valid auth token found');
        dispatch({ type: 'SET_USER', payload: null });
      }
    };

    // Use setTimeout to simulate async behavior without hanging
    setTimeout(checkAuth, 100);
  }, []);

  // Sign in function - mock implementation
  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo purposes
      const mockUser: User = {
        id: '1',
        name: 'Demo User',
        email: email,
        role: 'client'
      };
      
      dispatch({ type: 'SET_USER', payload: mockUser });
      toast({
        title: 'Welcome back!',
        description: `Signed in successfully as ${mockUser.name}`,
      });
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Sign in failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast({
        title: 'Sign in failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  // Sign up function - mock implementation
  const signUp = async (userData: {
    name: string;
    email: string;
    password: string;
    role: 'client' | 'artist';
    phone?: string;
    location?: string;
  }): Promise<boolean> => {
    try {
      dispatch({ type: 'SET_LOADING', payload: true });
      dispatch({ type: 'SET_ERROR', payload: null });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful registration
      const mockUser: User = {
        id: '2',
        name: userData.name,
        email: userData.email,
        role: userData.role,
        phone: userData.phone,
        location: userData.location
      };
      
      dispatch({ type: 'SET_USER', payload: mockUser });
      toast({
        title: 'Account created!',
        description: `Welcome to Gigleela, ${mockUser.name}!`,
      });
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Sign up failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast({
        title: 'Sign up failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
    toast({
      title: 'Signed out',
      description: 'You have been successfully signed out.',
    });
  };

  // Update user function - mock implementation
  const updateUser = async (userData: Partial<User>): Promise<boolean> => {
    try {
      if (!state.user) {
        throw new Error('No user to update');
      }
      
      dispatch({ type: 'SET_LOADING', payload: true });
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Mock successful update
      const updatedUser = { ...state.user, ...userData };
      dispatch({ type: 'SET_USER', payload: updatedUser });
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully.',
      });
      return true;
    } catch (error: any) {
      const errorMessage = error.message || 'Update failed';
      dispatch({ type: 'SET_ERROR', payload: errorMessage });
      toast({
        title: 'Update failed',
        description: errorMessage,
        variant: 'destructive',
      });
      return false;
    }
  };

  const contextValue: AuthContextType = {
    ...state,
    signIn,
    signUp,
    logout,
    updateUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

// Hook to use auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;