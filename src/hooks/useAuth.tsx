
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data - in a real app this would be in a database
const mockUsers: Record<string, { password: string, user: User }> = {
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: 'admin-1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
    }
  },
  'jane@example.com': {
    password: 'jane123',
    user: {
      id: 'user-1',
      email: 'jane@example.com',
      name: 'Jane Doe',
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    }
  }
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on component mount
    const storedUser = localStorage.getItem('makeaplan_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerEmail = email.toLowerCase();
    const userData = mockUsers[lowerEmail];
    
    if (!userData || userData.password !== password) {
      setIsLoading(false);
      throw new Error('Invalid email or password');
    }
    
    // Set user and store in localStorage
    setUser(userData.user);
    localStorage.setItem('makeaplan_user', JSON.stringify(userData.user));
    setIsLoading(false);
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    // Simulate API request delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const lowerEmail = email.toLowerCase();
    
    // Check if user already exists
    if (mockUsers[lowerEmail]) {
      setIsLoading(false);
      throw new Error('User with this email already exists');
    }
    
    // Create new user
    const newUser: User = {
      id: `user-${Date.now()}`,
      email: lowerEmail,
      name,
      role: 'user',
      avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
    };
    
    // In a real app, this would be a database insert
    mockUsers[lowerEmail] = {
      password,
      user: newUser
    };
    
    // Set user and store in localStorage
    setUser(newUser);
    localStorage.setItem('makeaplan_user', JSON.stringify(newUser));
    setIsLoading(false);
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('makeaplan_user');
  };
  
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, isLoading, isAdmin, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default useAuth;
