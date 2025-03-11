
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare, LogOut, User as UserIcon } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import UserAvatar from './UserAvatar';
import SearchBar from './SearchBar';
import { useAuth } from '@/hooks/useAuth';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout, isAdmin } = useAuth();

  // Detect scroll to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNotificationClick = () => {
    toast({
      title: "Notifications",
      description: "You have no new notifications at this time.",
    });
  };

  const handleMessageClick = () => {
    navigate('/messaging');
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    toast({
      title: "Logged out",
      description: "You have been logged out successfully",
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'py-2 bg-white/80 backdrop-blur-md shadow-sm'
          : 'py-4 bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                Make A Plan
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-5">
              <Link
                to="/"
                className={`transition-colors duration-200 ${
                  isActive('/') 
                    ? 'text-primary font-medium' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Home
              </Link>
              <Link
                to="/events"
                className={`transition-colors duration-200 ${
                  isActive('/events') 
                    ? 'text-primary font-medium' 
                    : 'text-secondary hover:text-primary'
                }`}
              >
                Discover
              </Link>
              {user && (
                <Link
                  to="/messaging"
                  className={`transition-colors duration-200 ${
                    isActive('/messaging') 
                      ? 'text-primary font-medium' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  Messages
                </Link>
              )}
              {user && (
                <Link
                  to="/profile"
                  className={`transition-colors duration-200 ${
                    isActive('/profile') 
                      ? 'text-primary font-medium' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  Profile
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className={`transition-colors duration-200 ${
                    isActive('/admin') 
                      ? 'text-primary font-medium' 
                      : 'text-secondary hover:text-primary'
                  }`}
                >
                  Admin
                </Link>
              )}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            
            {user ? (
              <div className="flex items-center space-x-2">
                <button 
                  onClick={handleNotificationClick}
                  className="p-2 rounded-full hover:bg-accent transition-colors duration-200 relative"
                >
                  <Bell className="h-5 w-5 text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                </button>
                
                <button 
                  onClick={handleMessageClick}
                  className="p-2 rounded-full hover:bg-accent transition-colors duration-200 relative"
                >
                  <MessageSquare className="h-5 w-5 text-secondary" />
                  <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
                </button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <UserAvatar size="sm" src={user.avatar || ""} alt={user.name} />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/profile')}>
                      <UserIcon className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    {isAdmin && (
                      <DropdownMenuItem onClick={() => navigate('/admin')}>
                        <UserIcon className="mr-2 h-4 w-4" />
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      Logout
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link
                  to="/login"
                  className="px-4 py-2 border border-primary text-primary rounded-md hover:bg-primary/10 transition-colors"
                >
                  Log in
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90 transition-colors"
                >
                  Sign up
                </Link>
              </div>
            )}
          </div>

          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-secondary hover:text-primary hover:bg-accent transition-colors duration-200"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen
            ? 'max-h-screen py-4 opacity-100'
            : 'max-h-0 py-0 opacity-0 overflow-hidden'
        }`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 sm:px-3 bg-white/80 backdrop-blur-md">
          <Link
            to="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-accent transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/events"
            className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-accent transition-colors duration-200"
            onClick={() => setIsMenuOpen(false)}
          >
            Discover
          </Link>
          
          {user ? (
            <>
              <Link
                to="/messaging"
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Messages
              </Link>
              <Link
                to="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-accent transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </Link>
              {isAdmin && (
                <Link
                  to="/admin"
                  className="block px-3 py-2 rounded-md text-base font-medium text-secondary hover:text-primary hover:bg-accent transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin
                </Link>
              )}
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-accent transition-colors duration-200"
              >
                Logout
              </button>
              
              <div className="pt-4 pb-3 border-t border-gray-200">
                <div className="flex items-center px-3">
                  <div className="flex-shrink-0">
                    <UserAvatar size="md" src={user.avatar || ""} alt={user.name} />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-foreground">
                      {user.name}
                    </div>
                    <div className="text-sm font-medium text-secondary">
                      {user.email}
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="pt-4 pb-3 border-t border-gray-200 flex flex-col space-y-2">
              <Link
                to="/login"
                className="block px-3 py-2 text-center rounded-md text-base font-medium text-primary border border-primary hover:bg-primary/10 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Log in
              </Link>
              <Link
                to="/signup"
                className="block px-3 py-2 text-center rounded-md text-base font-medium text-white bg-primary hover:bg-primary/90 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
