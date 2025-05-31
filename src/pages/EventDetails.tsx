import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import { toast } from "@/hooks/use-toast";
import PaymentModal from '@/components/payments/PaymentModal';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import EventDetailActions from '@/components/EventDetailActions';

interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  price: string;
  is_free: boolean;
  category: string;
  user_id: string;
  organizer: {
    name: string;
    avatar: string;
    id: string;
  };
  attendees: {
    count: number;
    list: Array<{
      id: string;
      name: string;
      avatar: string;
      joined_at: string;
    }>;
  };
  hasJoined: boolean;
}

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();
  const [event, setEvent] = useState<EventData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Check if we should open the payment modal based on URL parameters
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    if (searchParams.get('join') === 'true') {
      setIsPaymentModalOpen(true);
    }
  }, [location]);

  useEffect(() => {
    if (!id) {
      navigate('/events');
      return;
    }
    
    fetchEventDetails();
  }, [id, user]);

  const fetchEventDetails = async () => {
    try {
      setLoading(true);
      
      // Fetch event details with organizer profile
      const { data: eventData, error: eventError } = await supabase
        .from('events')
        .select(`
          *,
          profiles!events_user_id_fkey (
            name,
            avatar
          )
        `)
        .eq('id', id)
        .single();

      if (eventError) {
        console.error('Error fetching event:', eventError);
        throw eventError;
      }

      if (!eventData) {
        throw new Error('Event not found');
      }

      // Fetch attendees with their profiles
      const { data: attendeesData, error: attendeesError } = await supabase
        .from('event_joins')
        .select(`
          *,
          profiles!event_joins_user_id_fkey (
            name,
            avatar
          )
        `)
        .eq('event_id', id)
        .in('payment_status', ['completed', 'free']);

      if (attendeesError) {
        console.error('Error fetching attendees:', attendeesError);
      }

      // Check if current user has joined
      let hasJoined = false;
      if (user) {
        const { data: userJoin } = await supabase
          .from('event_joins')
          .select('id')
          .eq('event_id', id)
          .eq('user_id', user.id)
          .in('payment_status', ['completed', 'free'])
          .single();
        
        hasJoined = !!userJoin;
      }

      const organizerProfile = Array.isArray(eventData.profiles) ? eventData.profiles[0] : eventData.profiles;

      const formattedEvent: EventData = {
        id: eventData.id,
        title: eventData.title,
        description: eventData.description || '',
        date: formatDate(eventData.date),
        time: eventData.time,
        location: eventData.location,
        image_url: eventData.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
        price: eventData.is_free ? 'Free' : eventData.price || '0',
        is_free: eventData.is_free || false,
        category: eventData.category || 'other',
        user_id: eventData.user_id,
        organizer: {
          name: organizerProfile?.name || 'Unknown',
          avatar: organizerProfile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
          id: eventData.user_id
        },
        attendees: {
          count: attendeesData?.length || 0,
          list: (attendeesData || []).map(attendee => {
            const attendeeProfile = Array.isArray(attendee.profiles) ? attendee.profiles[0] : attendee.profiles;
            return {
              id: attendee.user_id,
              name: attendeeProfile?.name || 'Unknown',
              avatar: attendeeProfile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
              joined_at: attendee.joined_at
            };
          })
        },
        hasJoined
      };

      setEvent(formattedEvent);
    } catch (error: any) {
      console.error('Error fetching event details:', error);
      toast({
        title: "Error",
        description: error.message || "Failed to load event details",
        variant: "destructive",
      });
      navigate('/events');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric', 
        year: 'numeric' 
      });
    } catch (e) {
      return dateString;
    }
  };

  const handleJoinPlan = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to join this event",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    if (event?.hasJoined) {
      toast({
        title: "Already joined",
        description: "You have already joined this event",
      });
      return;
    }

    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = async () => {
    if (!user || !event) return;

    try {
      const { error } = await supabase
        .from('event_joins')
        .insert({
          user_id: user.id,
          event_id: event.id,
          payment_status: event.is_free ? 'free' : 'completed',
          payment_amount: event.is_free ? 0 : parseFloat(event.price),
          payment_currency: 'USD'
        });

      if (error) {
        console.error('Error joining event:', error);
        throw error;
      }

      toast({
        title: "Successfully joined!",
        description: `You have successfully joined "${event.title}"`,
      });

      // Refresh event details to show updated attendee count
      fetchEventDetails();
      setIsPaymentModalOpen(false);
    } catch (error: any) {
      console.error('Error joining event:', error);
      toast({
        title: "Failed to join event",
        description: error.message || "An error occurred while joining the event",
        variant: "destructive",
      });
    }
  };

  const viewHostProfile = () => {
    if (event?.organizer.id) {
      navigate(`/profile/${event.organizer.id}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 flex items-center justify-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </main>
        <Footer />
      </div>
    );
  }
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20 flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
          <p className="text-secondary mb-6">The event you're looking for doesn't exist or has been removed.</p>
          <button 
            onClick={() => navigate('/events')}
            className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          >
            Back to Events
          </button>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Back Button */}
          <button 
            onClick={() => navigate('/events')}
            className="flex items-center space-x-2 mb-6 text-secondary hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Events</span>
          </button>
          
          {/* Event Hero */}
          <div className="relative rounded-2xl overflow-hidden mb-8">
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent z-10" />
            
            <img 
              src={event.image_url} 
              alt={event.title}
              className="w-full h-[40vh] object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
              <div className="flex items-center space-x-2 mb-2">
                <button onClick={viewHostProfile} className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
                  <UserAvatar 
                    src={event.organizer.avatar} 
                    alt={event.organizer.name} 
                    size="md" 
                    className="border-2 border-white/30" 
                  />
                  <span className="text-sm font-medium">Hosted by {event.organizer.name}</span>
                </button>
              </div>
              
              <h1 className="text-3xl md:text-4xl font-bold mb-2">{event.title}</h1>
              
              <div className="flex flex-wrap gap-4 text-sm font-medium text-white/90">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-1" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-1" />
                  <span>{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-1" />
                  <span>{event.attendees.count} attending</span>
                </div>
                
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 mr-1" />
                  <span>{event.is_free ? "Free" : `$${event.price}`}</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">About this Event</h2>
                <p className="text-secondary whitespace-pre-wrap">{event.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Event Actions</h2>
                <EventDetailActions 
                  eventId={event.id}
                  hostId={event.organizer.id}
                  title={event.title}
                />
              </div>

              {event.attendees.count > 0 && (
                <div>
                  <h2 className="text-xl font-bold mb-4">Attendees ({event.attendees.count})</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {event.attendees.list.map((attendee) => (
                      <div key={attendee.id} className="flex items-center space-x-3 p-3 bg-accent/20 rounded-lg">
                        <UserAvatar 
                          src={attendee.avatar} 
                          alt={attendee.name} 
                          size="sm" 
                        />
                        <div>
                          <p className="font-medium">{attendee.name}</p>
                          <p className="text-sm text-secondary">
                            Joined {new Date(attendee.joined_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
            
            <div className="space-y-6">
              <div className="bg-accent/30 rounded-xl p-6">
                <h3 className="font-semibold mb-4">
                  {event.hasJoined ? 'You\'re Attending!' : 'Join this Event'}
                </h3>
                
                {event.hasJoined ? (
                  <div className="text-center">
                    <div className="mb-4 p-4 bg-green-100 rounded-lg">
                      <p className="text-green-800 font-medium">✓ You have successfully joined this event</p>
                    </div>
                    <p className="text-sm text-secondary">
                      Check your profile for event details and updates.
                    </p>
                  </div>
                ) : (
                  <>
                    <p className="text-sm text-secondary mb-4">
                      Secure your spot at this event. Join now to connect with other attendees.
                    </p>
                    
                    {user?.id === event.user_id ? (
                      <div className="text-center p-4 bg-blue-100 rounded-lg">
                        <p className="text-blue-800 font-medium">You are the organizer of this event</p>
                      </div>
                    ) : (
                      <button 
                        onClick={handleJoinPlan}
                        className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                      >
                        {event.is_free ? 'Join for Free' : `Join for $${event.price}`}
                      </button>
                    )}
                  </>
                )}
              </div>
              
              <div className="bg-accent/30 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Event Location</h3>
                <p className="text-sm text-secondary mb-2">{event.location}</p>
                <div className="aspect-video bg-muted rounded-lg overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1518791841217-8f162f1e1131?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80" 
                    alt="Map" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <PaymentModal 
        isOpen={isPaymentModalOpen} 
        onClose={() => setIsPaymentModalOpen(false)} 
        eventTitle={event.title} 
        price={event.is_free ? '0' : event.price}
        onPaymentSuccess={handlePaymentSuccess}
      />
      
      <Footer />
    </div>
  );
};

export default EventDetails;
