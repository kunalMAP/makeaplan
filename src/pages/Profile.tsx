
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Settings, MapPin, Calendar, Users, Edit } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import EventCard, { EventProps } from '@/components/EventCard';
import CreateEventButton from '@/components/CreateEventButton';
import EventModal from '@/components/EventModal';

// Sample user data
const user = {
  name: 'Jane Doe',
  username: '@janedoe',
  bio: 'Adventure seeker and photography enthusiast. Love to explore new places and meet interesting people.',
  location: 'San Francisco, CA',
  joinedDate: 'January 2022',
  followers: 432,
  following: 245,
  profileImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1400&q=80',
  coverImage: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
};

// Sample events data for profile page
const upcomingEvents: EventProps[] = [
  {
    id: '5',
    title: 'Photography Workshop',
    description: 'Learn photography techniques from professional photographers in this hands-on workshop.',
    date: 'Dec 5, 2023',
    time: '10:00 AM',
    location: 'Golden Gate Park',
    imageUrl: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80',
    price: '40',
    attendees: {
      count: 28,
      avatars: []
    },
    organizer: {
      name: 'Jane Doe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80'
    }
  },
  {
    id: '6',
    title: 'Rooftop Yoga Session',
    description: 'Join us for a relaxing yoga session with amazing city views from a rooftop location.',
    date: 'Dec 10, 2023',
    time: '7:00 AM',
    location: 'City Center Rooftop',
    imageUrl: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 'Free',
    attendees: {
      count: 15,
      avatars: []
    },
    organizer: {
      name: 'Jane Doe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80'
    }
  }
];

const pastEvents: EventProps[] = [
  {
    id: '7',
    title: 'Beach Cleanup Volunteer Day',
    description: 'Join our community effort to clean up the local beach and protect marine wildlife.',
    date: 'Oct 22, 2023',
    time: '9:00 AM',
    location: 'Ocean Beach',
    imageUrl: 'https://images.unsplash.com/photo-1618477462146-050d2797431d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 'Free',
    attendees: {
      count: 42,
      avatars: []
    },
    organizer: {
      name: 'Jane Doe',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80'
    }
  }
];

const Profile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-16">
        {/* Cover Image */}
        <div className="w-full h-64 md:h-80 relative overflow-hidden">
          <img 
            src={user.coverImage} 
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
                src={user.profileImage} 
                alt={user.name} 
                size="lg"
                className="w-24 h-24 border-4 border-white shadow-md" 
              />
              
              <div className="md:ml-6 flex-grow">
                <div className="flex flex-col md:flex-row md:items-center justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <p className="text-secondary">{user.username}</p>
                  </div>
                  
                  <div className="mt-2 md:mt-0 flex space-x-2">
                    <button className="action-button">
                      Follow
                    </button>
                    <button className="p-2 rounded-md border border-input hover:bg-accent transition-colors">
                      <Settings className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <p className="my-3">{user.bio}</p>
                
                <div className="flex flex-wrap gap-4 text-sm text-secondary">
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1" />
                    <span>{user.location}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>Joined {user.joinedDate}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    <span>
                      <span className="font-medium text-foreground">{user.followers}</span> followers · 
                      <span className="font-medium text-foreground"> {user.following}</span> following
                    </span>
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
              {upcomingEvents.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {upcomingEvents.map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                  <p className="text-secondary mb-6">
                    You haven't created any events yet. Ready to plan something exciting?
                  </p>
                  <button 
                    onClick={() => setIsEventModalOpen(true)}
                    className="action-button"
                  >
                    Create Your First Event
                  </button>
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
      
      <CreateEventButton onClick={() => setIsEventModalOpen(true)} />
      {isEventModalOpen && (
        <EventModal isOpen={isEventModalOpen} onClose={() => setIsEventModalOpen(false)} />
      )}

      <Footer />
    </div>
  );
};

export default Profile;
