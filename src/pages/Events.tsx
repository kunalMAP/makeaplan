
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Filter, Calendar, MapPin, ArrowDownAZ, TrendingUp } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventCard, { EventProps } from '@/components/EventCard';
import CreateEventButton from '@/components/CreateEventButton';
import EventModal from '@/components/EventModal';

// Sample events data
const eventsData: EventProps[] = [
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
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    }
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
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
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
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    }
  },
  {
    id: '4',
    title: 'Community Art Exhibition',
    description: 'View amazing artworks from local artists and participate in interactive art sessions.',
    date: 'Nov 25, 2023',
    time: '11:00 AM',
    location: 'Downtown Art Gallery',
    imageUrl: 'https://images.unsplash.com/photo-1544928147-79a2dbc1f389?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2574&q=80',
    price: '10',
    attendees: {
      count: 85,
      avatars: []
    },
    organizer: {
      name: 'Art Collective',
      avatar: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    }
  },
  {
    id: '5',
    title: 'Indie Film Festival',
    description: 'A celebration of independent films from around the world, with director Q&As and networking events.',
    date: 'Nov 30, 2023',
    time: '5:00 PM',
    location: 'Civic Center Theater',
    imageUrl: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2059&q=80',
    price: '25',
    attendees: {
      count: 150,
      avatars: []
    },
    organizer: {
      name: 'Film Society',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    }
  },
  {
    id: '6',
    title: 'Cooking Class: Italian Cuisine',
    description: 'Learn to prepare authentic Italian dishes with our expert chef in this hands-on cooking class.',
    date: 'Dec 3, 2023',
    time: '6:30 PM',
    location: 'Culinary Academy',
    imageUrl: 'https://images.unsplash.com/photo-1507048331197-7d4ac70811cf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2274&q=80',
    price: '75',
    attendees: {
      count: 20,
      avatars: []
    },
    organizer: {
      name: 'Cooking Enthusiasts',
      avatar: 'https://images.unsplash.com/photo-1546961329-78bef0414d7c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    }
  },
];

// Categories for filtering
const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'tech', name: 'Technology' },
  { id: 'outdoors', name: 'Outdoors' },
  { id: 'food', name: 'Food & Drink' },
  { id: 'arts', name: 'Arts' },
  { id: 'film', name: 'Film & Media' },
  { id: 'music', name: 'Music' },
];

const Events: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = searchParams.get('category') || 'all';
  
  const [selectedCategory, setSelectedCategory] = useState(categoryParam);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [visibleEvents, setVisibleEvents] = useState(6);
  
  const navigate = useNavigate();
  
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSearchParams({ category: categoryId });
    
    // In a real app, this would filter events from an API
    // For now, we just update the URL and state
  };
  
  const handleLoadMore = () => {
    setVisibleEvents(prev => Math.min(prev + 3, eventsData.length));
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
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="flex items-center space-x-2 py-2 px-4 border rounded-lg hover:bg-accent transition-colors"
              >
                <Filter className="w-4 h-4" />
                <span>Filters</span>
              </button>
              
              <select className="py-2 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="recommended">Recommended</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
          
          {/* Filters */}
          <div className={`bg-accent/50 rounded-xl p-4 mb-8 transition-all duration-300 ${isFilterOpen ? 'block' : 'hidden'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-medium text-sm mb-2">Date</h3>
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4 text-secondary" />
                  <input
                    type="date"
                    className="flex-grow px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Location</h3>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4 text-secondary" />
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="flex-grow px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
                  />
                </div>
              </div>
              
              <div>
                <h3 className="font-medium text-sm mb-2">Price</h3>
                <div className="space-x-2">
                  <select className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                    <option value="any">Any price</option>
                    <option value="free">Free</option>
                    <option value="paid">Paid</option>
                    <option value="under25">Under $25</option>
                    <option value="under50">Under $50</option>
                    <option value="over50">$50+</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end mt-4 space-x-2">
              <button 
                onClick={handleResetFilters}
                className="px-4 py-2 border rounded-lg hover:bg-accent/70 transition-colors"
              >
                Reset
              </button>
              <button 
                onClick={handleApplyFilters}
                className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Apply Filters
              </button>
            </div>
          </div>
          
          {/* Categories */}
          <div className="flex overflow-x-auto space-x-2 py-2 mb-8 scrollbar-none">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => handleCategoryChange(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category.id
                    ? 'bg-primary text-white'
                    : 'bg-accent/50 hover:bg-accent text-secondary hover:text-foreground'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsData.slice(0, visibleEvents).map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
          
          {/* Load More Button */}
          <div className="text-center mt-12">
            {visibleEvents < eventsData.length ? (
              <button 
                onClick={handleLoadMore}
                className="px-6 py-3 border rounded-lg hover:bg-accent transition-colors"
              >
                Load More Events
              </button>
            ) : (
              <p className="text-secondary">You've reached the end of the list</p>
            )}
          </div>
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

export default Events;
