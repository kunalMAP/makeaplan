
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useAuth } from '@/hooks/useAuth';
import ProtectedRoute from '@/components/ProtectedRoute';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User } from '@/hooks/useAuth';

// Mock user data - in a real app this would come from an API
const mockUsers: User[] = [
  {
    id: 'user-1',
    email: 'jane@example.com',
    name: 'Jane Doe',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb'
  },
  {
    id: 'user-2',
    email: 'john@example.com',
    name: 'John Smith',
    role: 'user',
    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36'
  },
  {
    id: 'admin-1',
    email: 'admin@example.com',
    name: 'Admin User',
    role: 'admin',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e'
  }
];

// Mock event data
interface AdminEvent {
  id: string;
  title: string;
  organizer: string;
  date: string;
  attendees: number;
  status: 'active' | 'cancelled' | 'completed';
}

const mockEvents: AdminEvent[] = [
  {
    id: 'event-1',
    title: 'Tech Meetup: AI and the Future',
    organizer: 'Jane Doe',
    date: 'Nov 15, 2023',
    attendees: 120,
    status: 'active'
  },
  {
    id: 'event-2',
    title: 'Weekend Hike: Coastal Trail',
    organizer: 'John Smith',
    date: 'Nov 18, 2023',
    attendees: 45,
    status: 'active'
  },
  {
    id: 'event-3',
    title: 'Community Art Exhibition',
    organizer: 'Jane Doe',
    date: 'Nov 25, 2023',
    attendees: 85,
    status: 'active'
  }
];

const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState('users');
  
  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen flex flex-col">
        <Navbar />
        
        <main className="flex-grow pt-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
            </div>
            
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full justify-start border-b rounded-none p-0">
                  <TabsTrigger 
                    value="users" 
                    className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Users
                  </TabsTrigger>
                  <TabsTrigger 
                    value="events" 
                    className="rounded-none px-6 py-3 data-[state=active]:border-b-2 data-[state=active]:border-primary"
                  >
                    Events
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="users" className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">User</th>
                          <th className="px-4 py-3 text-left font-medium">Email</th>
                          <th className="px-4 py-3 text-left font-medium">Role</th>
                          <th className="px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockUsers.map(user => (
                          <tr key={user.id} className="border-b hover:bg-accent/10">
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-3">
                                <img 
                                  src={user.avatar} 
                                  alt={user.name} 
                                  className="w-8 h-8 rounded-full object-cover"
                                />
                                <span>{user.name}</span>
                              </div>
                            </td>
                            <td className="px-4 py-3">{user.email}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                user.role === 'admin' 
                                  ? 'bg-primary/20 text-primary' 
                                  : 'bg-secondary/20 text-secondary'
                              }`}>
                                {user.role}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-sm text-primary hover:underline">
                                Edit
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
                
                <TabsContent value="events" className="p-6">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="px-4 py-3 text-left font-medium">Event Title</th>
                          <th className="px-4 py-3 text-left font-medium">Organizer</th>
                          <th className="px-4 py-3 text-left font-medium">Date</th>
                          <th className="px-4 py-3 text-left font-medium">Attendees</th>
                          <th className="px-4 py-3 text-left font-medium">Status</th>
                          <th className="px-4 py-3 text-left font-medium">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockEvents.map(event => (
                          <tr key={event.id} className="border-b hover:bg-accent/10">
                            <td className="px-4 py-3">{event.title}</td>
                            <td className="px-4 py-3">{event.organizer}</td>
                            <td className="px-4 py-3">{event.date}</td>
                            <td className="px-4 py-3">{event.attendees}</td>
                            <td className="px-4 py-3">
                              <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                event.status === 'active' 
                                  ? 'bg-green-100 text-green-800' 
                                  : event.status === 'cancelled'
                                    ? 'bg-red-100 text-red-800'
                                    : 'bg-blue-100 text-blue-800'
                              }`}>
                                {event.status}
                              </span>
                            </td>
                            <td className="px-4 py-3">
                              <button className="text-sm text-primary hover:underline mr-2">
                                View
                              </button>
                              <button className="text-sm text-red-600 hover:underline">
                                Cancel
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
        
        <Footer />
      </div>
    </ProtectedRoute>
  );
};

export default Admin;
