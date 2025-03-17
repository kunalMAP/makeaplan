
import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsFilter from '@/components/events/EventsFilter';
import EventsCategories from '@/components/events/EventsCategories';
import EventsGrid from '@/components/events/EventsGrid';
import CreateEventButton from '@/components/CreateEventButton';
import { categories } from '@/data/eventsData';
import { EventFormData } from '@/components/events/modals/EventForm';
import { EventProps } from '@/components/EventCard';
import { toast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';

const Events: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  
  // Store all events in state
  const [allEvents, setAllEvents] = useState<EventProps[]>([]);
  
  const navigate = useNavigate();
  const { user } = useAuth();
  
  // Fetch events from Supabase
  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // First, fetch all events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .order('created_at', { ascending: false });
        
        if (eventsError) throw eventsError;
        
        // Then for each event, fetch the organizer profile
        const formattedEvents: EventProps[] = await Promise.all(eventsData.map(async (event) => {
          // Fetch the profile for the event creator
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('name, avatar')
            .eq('id', event.user_id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
            // Provide default values if profile fetch fails
            return {
              id: event.id,
              title: event.title,
              description: event.description || '',
              date: formatDate(event.date),
              time: event.time,
              location: event.location,
              imageUrl: event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
              price: event.is_free ? 'Free' : event.price,
              attendees: {
                count: 0,
                avatars: []
              },
              organizer: {
                name: 'Anonymous',
                avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
              }
            };
          }
          
          return {
            id: event.id,
            title: event.title,
            description: event.description || '',
            date: formatDate(event.date),
            time: event.time,
            location: event.location,
            imageUrl: event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
            price: event.is_free ? 'Free' : event.price,
            attendees: {
              count: 0,
              avatars: []
            },
            organizer: {
              name: profileData?.name || 'Anonymous',
              avatar: profileData?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
            }
          };
        }));
        
        setAllEvents(formattedEvents);
      } catch (error) {
        console.error('Error fetching events:', error);
        toast({
          title: "Error fetching events",
          description: "Could not load events. Please try again later.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchEvents();
  }, []);
  
  // Set up real-time subscription for new events
  useEffect(() => {
    const channel = supabase
      .channel('public:events')
      .on('postgres_changes', 
        { 
          event: 'INSERT', 
          schema: 'public', 
          table: 'events' 
        }, 
        async (payload) => {
          // Fetch the event profile separately
          const { data: profileData, error: profileError } = await supabase
            .from('profiles')
            .select('name, avatar')
            .eq('id', payload.new.user_id)
            .single();
          
          if (profileError) {
            console.error('Error fetching profile:', profileError);
          }
          
          // Format the new event
          const newEvent: EventProps = {
            id: payload.new.id,
            title: payload.new.title,
            description: payload.new.description || '',
            date: formatDate(payload.new.date),
            time: payload.new.time,
            location: payload.new.location,
            imageUrl: payload.new.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
            price: payload.new.is_free ? 'Free' : payload.new.price,
            attendees: {
              count: 0,
              avatars: []
            },
            organizer: {
              name: profileData?.name || 'Anonymous',
              avatar: profileData?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
            }
          };
          
          // Update events list with the new event
          setAllEvents(prevEvents => [newEvent, ...prevEvents]);
        }
      )
      .subscribe();
      
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  
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

    // Toast notification handled by EventModal when event is created
  };

  // Helper function to format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString; // If parsing fails, return the original string
    }
  };
  
  // Function to parse date string back to Date object for comparison
  const parseEventDate = (dateString: string): Date => {
    if (!dateString) return new Date();
    try {
      // Handle date formats like "Nov 15, 2023"
      return new Date(dateString);
    } catch (e) {
      return new Date(); // Return current date as fallback
    }
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
          
          {isLoading ? (
            <div className="py-20 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-secondary">Loading events...</p>
            </div>
          ) : (
            <EventsGrid 
              events={currentAndFutureEvents}
              visibleEvents={visibleEvents}
              handleLoadMore={handleLoadMore}
            />
          )}
        </div>
      </main>
      
      <CreateEventButton />
      
      <Footer />
    </div>
  );
};

export default Events;
