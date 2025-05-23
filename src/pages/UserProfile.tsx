
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Calendar, Users } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import EventCard, { EventProps } from '@/components/EventCard';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { matchEventToCategory } from '@/utils/categoryMatcher';
import { useAuth } from '@/hooks/useAuth';

const UserProfile = () => {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [userEvents, setUserEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followersCount, setFollowersCount] = useState(0);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
          
        if (profileError) throw profileError;
        
        setProfile(profileData);
        
        // Fetch user's events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: false });
          
        if (eventsError) throw eventsError;
        
        // Format events data
        const formattedEvents: EventProps[] = eventsData.map(event => ({
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
            name: profileData.name || 'Anonymous',
            avatar: profileData.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
            id: profileData.id || userId
          }
        }));
        
        setUserEvents(formattedEvents);

        // Check if current user is following this profile
        if (user) {
          const { data: followData, error: followError } = await supabase
            .from('follows')
            .select('*')
            .eq('follower_id', user.id)
            .eq('following_id', userId)
            .single();
          
          if (!followError && followData) {
            setIsFollowing(true);
          }

          // Get followers count
          const { count, error: countError } = await supabase
            .from('follows')
            .select('*', { count: 'exact', head: true })
            .eq('following_id', userId);
          
          if (!countError && count !== null) {
            setFollowersCount(count);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Failed to load profile",
          description: "Could not load user profile.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    if (userId) {
      fetchUserProfile();
    }
  }, [userId, user]);
  
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

  const handleFollowToggle = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to follow users.",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }

    try {
      if (isFollowing) {
        // Unfollow
        const { error } = await supabase
          .from('follows')
          .delete()
          .eq('follower_id', user.id)
          .eq('following_id', userId);

        if (error) throw error;

        setIsFollowing(false);
        setFollowersCount(prev => prev - 1);
        toast({
          title: "Unfollowed",
          description: `You are no longer following ${profile.name}.`,
        });
      } else {
        // Follow
        const { error } = await supabase
          .from('follows')
          .insert({
            follower_id: user.id,
            following_id: userId,
          });

        if (error) throw error;

        setIsFollowing(true);
        setFollowersCount(prev => prev + 1);
        toast({
          title: "Following",
          description: `You are now following ${profile.name}.`,
        });
      }
    } catch (error) {
      console.error('Error toggling follow status:', error);
      toast({
        title: "Error",
        description: "Failed to update follow status.",
        variant: "destructive",
      });
    }
  };
  
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
  
  if (!profile) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">User not found</h1>
            <Button onClick={() => navigate(-1)}>Go Back</Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Don't show follow button on own profile
  const isOwnProfile = user && user.id === userId;

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
              <UserAvatar 
                src={profile.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'} 
                alt={profile.name} 
                size="lg"
                className="w-24 h-24 border-4 border-white shadow-md" 
              />
              
              <div className="md:ml-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{profile.name || 'Anonymous'}</h1>
                  </div>
                  
                  {!isOwnProfile && (
                    <Button
                      onClick={handleFollowToggle}
                      variant={isFollowing ? "outline" : "default"}
                      className="mt-2 md:mt-0"
                    >
                      {isFollowing ? 'Unfollow' : 'Follow'}
                    </Button>
                  )}
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-secondary mt-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined {new Date(profile.created_at).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>
                      <span className="font-medium text-foreground">{followersCount}</span> followers
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <h2 className="text-2xl font-semibold mt-12 mb-6">Events by this user</h2>
          
          {userEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-accent/20 rounded-xl">
              <h3 className="text-lg font-medium mb-2">No events found</h3>
              <p className="text-secondary">
                This user hasn't created any events yet.
              </p>
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserProfile;
