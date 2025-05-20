
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Session, User as SupabaseUser } from '@supabase/supabase-js';
import { toast } from '@/hooks/use-toast';

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
  supabaseUser: SupabaseUser | null;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [supabaseUser, setSupabaseUser] = useState<SupabaseUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching user profile:', error);
      return null;
    }
  };

  // Set up auth state change listener
  useEffect(() => {
    setIsLoading(true);

    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        console.log('Auth state changed:', event, session);
        if (session) {
          setSupabaseUser(session.user);
          // Use setTimeout to prevent potential deadlocks
          setTimeout(() => {
            handleSession(session);
          }, 0);
        } else {
          setUser(null);
          setSupabaseUser(null);
          setIsLoading(false);
        }
      }
    );

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      if (session) {
        setSupabaseUser(session.user);
        handleSession(session);
      } else {
        setIsLoading(false);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Handle session changes
  const handleSession = async (session: Session | null) => {
    if (!session?.user) {
      setUser(null);
      setSupabaseUser(null);
      setIsLoading(false);
      return;
    }

    try {
      // Fetch user profile from profiles table
      const profile = await fetchUserProfile(session.user.id);
      
      if (profile) {
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: profile.name || session.user.email?.split('@')[0] || 'User',
          role: profile.role as 'user' | 'admin',
          avatar: profile.avatar
        });
      } else {
        // Fallback if profile not found
        setUser({
          id: session.user.id,
          email: session.user.email || '',
          name: session.user.email?.split('@')[0] || 'User',
          role: 'user',
          avatar: undefined
        });
        
        console.warn('User profile not found, using fallback data');
      }
    } catch (error) {
      console.error('Error handling session:', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        if (error.message.includes('Email not confirmed')) {
          toast({
            title: "Email not confirmed",
            description: "Please check your email to confirm your account",
            variant: "destructive",
          });
        } else {
          toast({
            title: "Login failed",
            description: error.message || "An error occurred during login",
            variant: "destructive",
          });
        }
        throw error;
      }
      
      // We don't need to manually set the user here as onAuthStateChange will handle it
      toast({
        title: "Login successful",
        description: "Welcome back!",
      });
      
      return data;
    } catch (error: any) {
      console.error('Login error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  // Signup function
  const signup = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Create user in Supabase Auth
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name: name,
          },
        },
      });
      
      if (error) {
        toast({
          title: "Signup failed",
          description: error.message || "An error occurred during signup",
          variant: "destructive",
        });
        throw error;
      }
      
      toast({
        title: "Account created",
        description: "Please check your email to verify your account",
      });
      
      return data;
    } catch (error: any) {
      console.error('Signup error:', error);
      setIsLoading(false);
      throw error;
    }
  };

  // Logout function
  const logout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // We don't need to manually set the user here as onAuthStateChange will handle it
      toast({
        title: "Logged out",
        description: "You have been successfully logged out",
      });
    } catch (error: any) {
      console.error('Error logging out:', error);
      toast({
        title: "Logout failed",
        description: error.message || "An error occurred during logout",
        variant: "destructive",
      });
    }
  };
  
  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, supabaseUser, isLoading, isAdmin, login, signup, logout }}>
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
