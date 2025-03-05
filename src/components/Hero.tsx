
import React, { useState } from 'react';
import { Search, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import EventModal from './EventModal';

const Hero: React.FC = () => {
  const navigate = useNavigate();
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <div className="relative overflow-hidden pt-20 pb-16 md:pt-32 md:pb-24">
      {/* Background decorative elements */}
      <div className="absolute -top-24 -right-24 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-40 -left-24 w-72 h-72 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Connect
            </span>{" "}
            through shared experiences
          </h1>
          
          <p className="text-lg md:text-xl text-secondary mb-8 animate-fade-in [animation-delay:200ms]">
            Discover and join local events that match your interests, or create your own
            and invite others to join you.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12 animate-fade-in [animation-delay:400ms]">
            <button 
              onClick={() => setIsEventModalOpen(true)}
              className="action-button px-6 py-3 w-full sm:w-auto"
            >
              Create Event
              <ArrowRight className="ml-2 h-4 w-4" />
            </button>
            
            <button 
              onClick={() => navigate('/events')}
              className="px-6 py-3 rounded-md border border-input bg-background hover:bg-accent transition-colors w-full sm:w-auto"
            >
              Explore Events
            </button>
          </div>
          
          <div className="relative mx-auto max-w-2xl rounded-2xl shadow-xl overflow-hidden animate-slide-up [animation-delay:600ms] mt-8">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/70 z-10" />
            <img 
              src="https://images.unsplash.com/photo-1540317580384-e5d43867caa6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&h=1080&q=80" 
              alt="People at an event"
              className="w-full h-80 object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white z-20">
              <div className="flex flex-col sm:flex-row gap-4 sm:items-center justify-between">
                <div>
                  <h3 className="text-xl font-bold">Find your next adventure</h3>
                  <p className="text-white/80 mb-4 sm:mb-0">Join thousands of people discovering new experiences</p>
                </div>
                
                <form onSubmit={handleSearch} className="relative bg-white/20 backdrop-blur-sm rounded-lg p-1 pl-10 flex items-center">
                  <Search className="absolute left-3 w-5 h-5 text-white/70" />
                  <input 
                    type="text"
                    placeholder="Search events..."
                    className="bg-transparent border-0 focus:outline-none text-white placeholder:text-white/50 w-full sm:w-64"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button 
                    type="submit"
                    className="bg-white text-foreground py-2 px-4 rounded-md text-sm font-medium"
                  >
                    Search
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {isEventModalOpen && (
        <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
      )}
    </div>
  );
};

export default Hero;
