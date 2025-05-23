
import React from 'react';
import { useNavigate } from 'react-router-dom';
import EventCard, { EventProps } from './EventCard';

// Sample data for featured events
const featuredEvents: EventProps[] = [
  {
    id: '1',
    title: 'Tech Meetup: AI and the Future',
    description: 'Join us for an exciting discussion about the future of AI and how it will shape our world. Network with like-minded professionals.',
    date: 'Nov 15, 2023',
    time: '6:00 PM',
    location: 'Innovation Hub, San Francisco',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: '20',
    attendees: {
      count: 120,
      avatars: []
    },
    organizer: {
      name: 'Tech Innovators',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      id: 'tech-innovators-id'
    },
    featured: true
  },
  {
    id: '2',
    title: 'Weekend Hike: Coastal Trail',
    description: 'Explore the beautiful coastal trail with a group of outdoor enthusiasts. All experience levels welcome!',
    date: 'Nov 18, 2023',
    time: '8:00 AM',
    location: 'Marin Headlands Trail',
    imageUrl: 'https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    price: 'Free',
    attendees: {
      count: 45,
      avatars: []
    },
    organizer: {
      name: 'Outdoor Adventures',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      id: 'outdoor-adventures-id'
    }
  },
  {
    id: '3',
    title: 'Wine Tasting Tour',
    description: 'Sample the finest wines from local vineyards with expert sommeliers guiding your experience.',
    date: 'Nov 22, 2023',
    time: '3:00 PM',
    location: 'Napa Valley Winery',
    imageUrl: 'https://images.unsplash.com/photo-1567529684892-09290a1b2d05?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2016&q=80',
    price: '50',
    attendees: {
      count: 35,
      avatars: []
    },
    organizer: {
      name: 'Wine Enthusiasts',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80',
      id: 'wine-enthusiasts-id'
    }
  }
];

const FeaturedEvents: React.FC = () => {
  const navigate = useNavigate();

  const handleViewAllEvents = () => {
    navigate('/events');
  };

  return (
    <section className="py-12 md:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">Featured Events</h2>
          <p className="text-secondary max-w-2xl mx-auto">
            Discover the most popular and exciting events happening near you
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {featuredEvents.map((event, index) => (
            <EventCard 
              key={event.id} 
              event={event} 
              className={index === 0 ? "md:col-span-2" : ""}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllEvents}
            className="inline-flex items-center justify-center rounded-lg border border-input bg-background hover:bg-accent px-6 py-3 transition-colors"
          >
            View All Events
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
