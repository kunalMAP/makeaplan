import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Calendar, Clock, MapPin, Users, DollarSign } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import { EventProps } from '@/components/EventCard';
import { toast } from "@/hooks/use-toast";
import PaymentModal from '@/components/payments/PaymentModal';

// Sample events data (would come from an API in a real app)
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

const EventDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  
  // Find the event from the dummy data (in a real app, this would be an API call)
  const event = eventsData.find(event => event.id === id);
  
  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Event Not Found</h1>
        <button 
          onClick={() => navigate('/events')}
          className="px-4 py-2 bg-primary text-white rounded-lg"
        >
          Back to Events
        </button>
      </div>
    );
  }

  const handleJoinPlan = () => {
    setIsPaymentModalOpen(true);
  };

  const viewHostProfile = () => {
    // In a real app, this would navigate to the host's profile
    navigate(`/profile/${event.organizer.id || 'unknown'}`);
  };
  
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
              src={event.imageUrl} 
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
                
                {event.price && (
                  <div className="flex items-center">
                    <DollarSign className="w-4 h-4 mr-1" />
                    <span>{event.price === "Free" ? "Free" : `$${event.price}`}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {/* Event Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-8">
              <div>
                <h2 className="text-xl font-bold mb-4">About this Event</h2>
                <p className="text-secondary">{event.description}</p>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">What to Expect</h2>
                <ul className="list-disc list-inside space-y-2 text-secondary">
                  <li>Engaging discussions with like-minded individuals</li>
                  <li>Networking opportunities</li>
                  <li>Refreshments will be provided</li>
                  <li>Q&A session with the host</li>
                </ul>
              </div>
              
              <div>
                <h2 className="text-xl font-bold mb-4">Event Schedule</h2>
                <div className="space-y-4">
                  <div className="flex">
                    <div className="w-24 font-medium">Start</div>
                    <div>{event.time}</div>
                  </div>
                  <div className="flex">
                    <div className="w-24 font-medium">Duration</div>
                    <div>2 hours</div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="space-y-6">
              <div className="bg-accent/30 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Join this Event</h3>
                <p className="text-sm text-secondary mb-4">
                  Secure your spot at this event. Join now to connect with other attendees.
                </p>
                
                <button 
                  onClick={handleJoinPlan}
                  className="w-full py-3 px-4 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Join Plan
                </button>
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
              
              <div className="bg-accent/30 rounded-xl p-6">
                <h3 className="font-semibold mb-4">Share this Event</h3>
                <div className="flex space-x-4">
                  <button className="p-2 rounded-full bg-accent hover:bg-accent/70 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-accent hover:bg-accent/70 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-full bg-accent hover:bg-accent/70 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                    </svg>
                  </button>
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
        price={event.price === 'Free' ? '0' : event.price} 
      />
      
      <Footer />
    </div>
  );
};

export default EventDetails;
