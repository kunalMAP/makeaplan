
import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import UserAvatar from './UserAvatar';
import { useNavigate } from 'react-router-dom';

interface JoinedEvent {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  image_url: string;
  price: string;
  is_free: boolean;
  joined_at: string;
  organizer: {
    name: string;
    avatar: string;
    id: string;
  };
  attendees_count: number;
}

const JoinedEventsSection: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [joinedEvents, setJoinedEvents] = useState<JoinedEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      fetchJoinedEvents();
    }
  }, [user]);

  const fetchJoinedEvents = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('event_joins')
        .select(`
          joined_at,
          events!inner (
            id,
            title,
            description,
            date,
            time,
            location,
            image_url,
            price,
            is_free,
            user_id,
            profiles!events_user_id_fkey (
              name,
              avatar
            )
          )
        `)
        .eq('user_id', user.id)
        .in('payment_status', ['completed', 'free'])
        .order('joined_at', { ascending: false });

      if (error) {
        console.error('Error fetching joined events:', error);
        return;
      }

      // Get attendee counts for each event
      const eventsWithCounts = await Promise.all(
        (data || []).map(async (join) => {
          const { count } = await supabase
            .from('event_joins')
            .select('*', { count: 'exact', head: true })
            .eq('event_id', join.events.id)
            .in('payment_status', ['completed', 'free']);

          return {
            id: join.events.id,
            title: join.events.title,
            description: join.events.description || '',
            date: formatDate(join.events.date),
            time: join.events.time,
            location: join.events.location,
            image_url: join.events.image_url || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
            price: join.events.is_free ? 'Free' : join.events.price || '0',
            is_free: join.events.is_free || false,
            joined_at: join.joined_at,
            organizer: {
              name: join.events.profiles?.name || 'Unknown',
              avatar: join.events.profiles?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
              id: join.events.user_id
            },
            attendees_count: count || 0
          };
        })
      );

      setJoinedEvents(eventsWithCounts);
    } catch (error) {
      console.error('Error fetching joined events:', error);
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

  const handleEventClick = (eventId: string) => {
    navigate(`/events/${eventId}`);
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (joinedEvents.length === 0) {
    return (
      <div className="text-center py-12 bg-accent/20 rounded-xl">
        <h3 className="text-lg font-medium mb-2">No events joined yet</h3>
        <p className="text-secondary mb-4">
          Start joining events to see them here.
        </p>
        <button 
          onClick={() => navigate('/events')}
          className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
        >
          Browse Events
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {joinedEvents.map((event) => (
        <div 
          key={event.id}
          onClick={() => handleEventClick(event.id)}
          className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer border"
        >
          <div className="flex gap-4">
            <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
              <img 
                src={event.image_url} 
                alt={event.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-semibold text-lg truncate pr-2">{event.title}</h3>
                <span className="text-sm text-primary font-medium flex-shrink-0">
                  {event.is_free ? 'Free' : `$${event.price}`}
                </span>
              </div>
              
              <div className="flex items-center space-x-2 mb-2">
                <UserAvatar 
                  src={event.organizer.avatar} 
                  alt={event.organizer.name} 
                  size="xs" 
                />
                <span className="text-sm text-secondary">by {event.organizer.name}</span>
              </div>
              
              <div className="flex flex-wrap gap-3 text-xs text-secondary">
                <div className="flex items-center">
                  <Calendar className="w-3 h-3 mr-1" />
                  <span>{event.date}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="w-3 h-3 mr-1" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  <span className="truncate max-w-[100px]">{event.location}</span>
                </div>
                
                <div className="flex items-center">
                  <Users className="w-3 h-3 mr-1" />
                  <span>{event.attendees_count} attending</span>
                </div>
              </div>
              
              <div className="mt-2">
                <span className="text-xs text-green-600 font-medium">
                  ✓ Joined {new Date(event.joined_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default JoinedEventsSection;
