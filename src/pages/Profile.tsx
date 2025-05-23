
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Users, Edit } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import EventCard, { EventProps } from '@/components/EventCard';
import CreateEventButton from '@/components/CreateEventButton';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';
import { matchEventToCategory } from '@/utils/categoryMatcher';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  const [userEvents, setUserEvents] = useState<EventProps[]>([]);
  const [pastEvents, setTotalPastEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchUserEvents();
    }
  }, [user]);

  const fetchUserEvents = async () => {
    setLoading(true);
    try {
      // Fetch user's events
      const { data: eventsData, error: eventsError } = await supabase
        .from('events')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });
        
      if (eventsError) throw eventsError;
      
      // Get current date for comparing events
      const currentDate = new Date();
      
      // Format events data and separate into upcoming and past
      const allEvents = eventsData.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description || '',
        date: formatDate(event.date),
        time: event.time,
        location: event.location,
        imageUrl: event.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        price: event.is_free ? 'Free' : event.price,
        category: matchEventToCategory(event.title, event.description || ''),
        attendees: {
          count: 0,
          avatars: []
        },
        organizer: {
          name: user?.name || 'Anonymous',
          avatar: user?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          id: user?.id || ''
        }
      }));
      
      // Filter events into upcoming and past
      const upcoming = [];
      const past = [];
      
      for (const event of allEvents) {
        const eventDate = new Date(event.date);
        if (eventDate >= currentDate) {
          upcoming.push(event);
        } else {
          past.push(event);
        }
      }
      
      setUserEvents(upcoming);
      setTotalPastEvents(past);
    } catch (error) {
      console.error('Error fetching user events:', error);
      toast({
        title: "Failed to load events",
        description: "Could not load your events.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  // Helper function to format date
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return dateString;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
            <h1 className="text-2xl font-bold mb-4">Please login to view your profile</h1>
            <Link to="/login" className="action-button">
              Log in
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  const displayedEvents = activeTab === 'upcoming' ? userEvents : pastEvents;

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex justify-center items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Cover Image */}
        <div className="w-full h-64 md:h-80 relative overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80" 
            alt="Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
          
          <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 backdrop-blur-sm text-white hover:bg-black/30 transition-colors">
            <Edit className="w-5 h-5" />
          </button>
        </div>
        
        {/* Profile Info */}
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-20 relative z-10">
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
              <UserAvatar 
                src={user.avatar || ""} 
                alt={user.name} 
                size="lg"
                className="w-24 h-24 border-4 border-white shadow-md" 
              />
              
              <div className="md:ml-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-secondary">{user.email}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0 flex space-x-2">
                    <Link to="/settings" className="p-2 rounded-md border border-input hover:bg-accent transition-colors">
                      <Settings className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-secondary mt-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined {new Date(user.created_at || Date.now()).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Tabs */}
            <div className="mt-8 border-b">
              <div className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`pb-3 font-medium text-sm ${
                    activeTab === 'upcoming'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  Upcoming Events
                </button>
                
                <button
                  onClick={() => setActiveTab('past')}
                  className={`pb-3 font-medium text-sm ${
                    activeTab === 'past'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  Past Events
                </button>
                
                <button
                  onClick={() => setActiveTab('saved')}
                  className={`pb-3 font-medium text-sm ${
                    activeTab === 'saved'
                      ? 'text-primary border-b-2 border-primary'
                      : 'text-secondary hover:text-foreground'
                  }`}
                >
                  Saved Events
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Events Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {activeTab === 'upcoming' && (
            <>
              {userEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {userEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                  <p className="text-secondary mb-6">
                    You haven't created any events yet. Ready to plan something exciting?
                  </p>
                  <Link 
                    to="/events"
                    className="action-button"
                  >
                    Create Your First Event
                  </Link>
                </div>
              )}
            </>
          )}

          {activeTab === 'past' && (
            <>
              {pastEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pastEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No past events</h3>
                  <p className="text-secondary">
                    You haven't participated in any events yet.
                  </p>
                </div>
              )}
            </>
          )}
          
          {activeTab === 'saved' && (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No saved events</h3>
              <p className="text-secondary mb-6">
                You haven't saved any events yet. Explore events that interest you.
              </p>
              <Link to="/events" className="action-button">
                Discover Events
              </Link>
            </div>
          )}
        </div>
      </main>
      
      <CreateEventButton />

      <Footer />
    </div>
  );
};

export default Profile;
