
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { Menu, X, Bell, MessageSquare } from 'lucide-react';
import { toast } from "@/hooks/use-toast";
import UserAvatar from './UserAvatar';
import SearchBar from './SearchBar';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <SearchBar />
            
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
              
              <Link to="/profile">
                <UserAvatar size="sm" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80" alt="User" />
              </Link>
            </div>
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
          
          <div className="pt-4 pb-3 border-t border-gray-200">
            <div className="flex items-center px-3">
              <div className="flex-shrink-0">
                <UserAvatar size="md" src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80" alt="User" />
              </div>
              <div className="ml-3">
                <div className="text-base font-medium text-foreground">
                  Jane Doe
                </div>
                <div className="text-sm font-medium text-secondary">
                  jane@example.com
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
