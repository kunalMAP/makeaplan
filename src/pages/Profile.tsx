import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Camera, MapPin, Calendar, Users, Settings, Edit } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import EventCard, { EventProps } from '@/components/EventCard';
import EditProfileModal from '@/components/EditProfileModal';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { matchEventToCategory } from '@/utils/categoryMatcher';
import { useAuth } from '@/hooks/useAuth';

const Profile = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [userEvents, setUserEvents] = useState<EventProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [followersCount, setFollowersCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchUserProfile = async () => {
      setLoading(true);
      try {
        // Fetch user profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', user.id)
          .single();
          
        if (profileError) {
          console.error('Profile error:', profileError);
          // If no profile exists, create a default one
          const { data: newProfile, error: createError } = await supabase
            .from('profiles')
            .insert({
              id: user.id,
              name: user.email?.split('@')[0] || 'User',
              avatar: null
            })
            .select()
            .single();
            
          if (createError) {
            console.error('Error creating profile:', createError);
          } else {
            setProfile(newProfile);
          }
        } else {
          setProfile(profileData);
        }
        
        // Fetch user's events
        const { data: eventsData, error: eventsError } = await supabase
          .from('events')
          .select('*')
          .eq('user_id', user.id)
          .order('created_at', { ascending: false });
          
        if (eventsError) {
          console.error('Events error:', eventsError);
        } else {
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
              name: profileData?.name || user.email?.split('@')[0] || 'User',
              avatar: profileData?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e',
              id: user.id
            }
          }));
          
          setUserEvents(formattedEvents);
        }

        // Get followers count
        const { count: followersCount, error: followersError } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('following_id', user.id);
        
        if (!followersError && followersCount !== null) {
          setFollowersCount(followersCount);
        }

        // Get following count
        const { count: followingCount, error: followingError } = await supabase
          .from('follows')
          .select('*', { count: 'exact', head: true })
          .eq('follower_id', user.id);
        
        if (!followingError && followingCount !== null) {
          setFollowingCount(followingCount);
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        toast({
          title: "Failed to load profile",
          description: "Could not load your profile.",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };
    
    fetchUserProfile();
  }, [user, navigate]);
  
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

  const handleEditProfile = () => {
    setIsEditModalOpen(true);
  };

  const handleProfileUpdated = (updatedProfile: any) => {
    setProfile(updatedProfile);
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
  
  if (!user) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
            <Button onClick={() => navigate('/login')}>Log In</Button>
          </div>
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
          <div className="bg-white rounded-2xl p-6 shadow-sm">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0">
              <div className="relative">
                <UserAvatar 
                  src={profile?.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'} 
                  alt={profile?.name || user.email || 'User'} 
                  size="lg"
                  className="w-24 h-24 border-4 border-white shadow-md" 
                />
                <button 
                  className="absolute bottom-0 right-0 bg-primary text-white p-2 rounded-full shadow-lg hover:bg-primary/90 transition-colors"
                  onClick={handleEditProfile}
                >
                  <Camera className="w-4 h-4" />
                </button>
              </div>
              
              <div className="md:ml-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{profile?.name || user.email?.split('@')[0] || 'User'}</h1>
                    <p className="text-secondary mt-1">{user.email}</p>
                  </div>
                  
                  <Button
                    onClick={handleEditProfile}
                    variant="outline"
                    className="mt-2 md:mt-0"
                  >
                    <Edit className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-secondary mt-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined {new Date(profile?.created_at || Date.now()).toLocaleDateString()}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>
                      <span className="font-medium text-foreground">{followingCount}</span> following
                    </span>
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
          
          <h2 className="text-2xl font-semibold mt-12 mb-6">Your Events</h2>
          
          {userEvents.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {userEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-accent/20 rounded-xl">
              <h3 className="text-lg font-medium mb-2">No events yet</h3>
              <p className="text-secondary mb-4">
                Start creating events to see them here.
              </p>
              <Button onClick={() => navigate('/events')}>
                Browse Events
              </Button>
            </div>
          )}
        </div>
      </main>
      
      <EditProfileModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        currentProfile={profile}
        onProfileUpdated={handleProfileUpdated}
      />
      
      <Footer />
    </div>
  );
};

export default Profile;
