
import { EventProps } from '@/components/EventCard';

// Sample events data
export const eventsData: EventProps[] = [
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
export const categories = [
  { id: 'all', name: 'All Events' },
  { id: 'tech', name: 'Technology' },
  { id: 'outdoors', name: 'Outdoors' },
  { id: 'food', name: 'Food & Drink' },
  { id: 'arts', name: 'Arts' },
  { id: 'film', name: 'Film & Media' },
  { id: 'music', name: 'Music' },
];
