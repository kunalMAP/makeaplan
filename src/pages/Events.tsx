
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsFilter from '@/components/events/EventsFilter';
import EventsCategories from '@/components/events/EventsCategories';
import EventsGrid from '@/components/events/EventsGrid';
import CreateEventButton from '@/components/CreateEventButton';
import { eventsData, categories } from '@/data/eventsData';
import { EventFormData } from '@/components/events/modals/EventForm';
import { EventProps } from '@/components/EventCard';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';

const Events: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(6);
  
  // Store all events (initial + created) in state
  const [allEvents, setAllEvents] = useState<EventProps[]>(eventsData);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
    
    // In a real app, this would filter events from an API
    // For now, we just update the URL and state
  };
  
  const handleLoadMore = () => {
    const filteredEvents = getFilteredEvents();
    setVisibleEvents(prev => Math.min(prev + 3, filteredEvents.length));
  };
  
  const handleApplyFilters = () => {
    // In a real app, this would call an API with the filter params
    setIsFilterOpen(false);
    // For demo purposes, just close the filter panel
  };
  
  const handleResetFilters = () => {
    // Reset filter form values
    setIsFilterOpen(false);
  };

  const handleEventCreated = (eventFormData: EventFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in or sign up to create an event",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    // Create a new event object from the form data
    const newEvent: EventProps = {
      id: `new-${Date.now()}`, // Generate a unique ID
      title: eventFormData.title,
      description: eventFormData.description,
      date: formatDate(eventFormData.date),
      time: eventFormData.time,
      location: eventFormData.location,
      imageUrl: eventFormData.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
      price: eventFormData.isFree ? 'Free' : eventFormData.price,
      attendees: {
        count: 0,
        avatars: []
      },
      organizer: {
        name: user ? user.name : 'Anonymous', // Use actual user name if logged in
        avatar: user ? (user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e') : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
      }
    };

    // Add the new event to the events list
    setAllEvents(prevEvents => [newEvent, ...prevEvents]);
    
    // Show success toast
    toast({
      title: "Event Created",
      description: "Your event has been successfully created",
    });
  };

  // Helper function to format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };
  
  // Function to parse date string back to Date object for comparison
  const parseEventDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    // Handle date formats like "Nov 15, 2023"
    return new Date(dateString);
  };
  
  // Function to filter events by date (show only current and future events)
  const getFilteredEvents = (): EventProps[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set to beginning of day for fair comparison
    
    return allEvents.filter(event => {
      const eventDate = parseEventDate(event.date);
      return eventDate >= today;
    });
  };
  
  // Get events filtered by date (and potentially by category in a real app)
  const currentAndFutureEvents = getFilteredEvents();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold mb-2">Discover Events</h1>
              <p className="text-secondary">Find and join events that match your interests</p>
            </div>
            
            <div className="mt-4 md:mt-0 flex items-center space-x-2">
              <EventsFilter 
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                handleApplyFilters={handleApplyFilters}
                handleResetFilters={handleResetFilters}
              />
              
              <select className="py-2 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="recommended">Recommended</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
          
          <EventsCategories 
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          
          <EventsGrid 
            events={currentAndFutureEvents}
            visibleEvents={visibleEvents}
            handleLoadMore={handleLoadMore}
          />
        </div>
      </main>
      
      <CreateEventButton />
      
      <Footer />
    </div>
  );
};

export default Events;
