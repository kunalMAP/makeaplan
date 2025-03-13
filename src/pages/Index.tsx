
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import FeaturedEvents from '@/components/FeaturedEvents';
import Footer from '@/components/Footer';
import CreateEventButton from '@/components/CreateEventButton';

const Index: React.FC = () => {
  const navigate = useNavigate();
  
  const handleCategoryClick = (category: string) => {
    navigate(`/events?category=${encodeURIComponent(category.toLowerCase())}`);
  };

  const handleViewAllCategories = () => {
    navigate('/events');
  };

  const handleViewCalendar = () => {
    navigate('/events?view=calendar');
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-4">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-2xl font-bold">Popular Categories</h2>
                <button 
                  onClick={handleViewAllCategories}
                  className="text-primary hover:text-primary/80 transition-colors"
                >
                  View All
                </button>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {[
                  { name: 'Tech', icon: '💻', count: 123 },
                  { name: 'Outdoors', icon: '🏔️', count: 87 },
                  { name: 'Food & Drink', icon: '🍷', count: 205 },
                  { name: 'Arts', icon: '🎨', count: 156 },
                  { name: 'Sports', icon: '⚽', count: 98 },
                  { name: 'Music', icon: '🎸', count: 173 },
                ].map((category) => (
                  <div 
                    key={category.name}
                    onClick={() => handleCategoryClick(category.name)}
                    className="flex flex-col items-center justify-center p-4 rounded-xl bg-accent/50 hover:bg-accent transition-colors cursor-pointer h-28 hover:shadow-md hover:translate-y-[-2px] transition-all duration-200"
                  >
                    <span className="text-3xl mb-2">{category.icon}</span>
                    <span className="font-medium">{category.name}</span>
                    <span className="text-xs text-secondary">{category.count} plans</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-accent/30 rounded-2xl p-6">
              <h3 className="font-semibold mb-4">Upcoming in Your Area</h3>
              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div 
                    key={item} 
                    className="flex gap-3 p-3 hover:bg-accent rounded-lg transition-colors cursor-pointer"
                    onClick={() => navigate(`/events/event-${item}`)}
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center font-medium text-primary">
                      {item + 14}
                      <span className="text-xs">Nov</span>
                    </div>
                    <div>
                      <h4 className="font-medium line-clamp-1">Weekend Art Workshop</h4>
                      <p className="text-sm text-secondary line-clamp-1">Downtown Gallery • 10:00 AM</p>
                    </div>
                  </div>
                ))}
                <button 
                  className="w-full py-2 text-sm text-primary hover:text-primary/80 transition-colors"
                  onClick={handleViewCalendar}
                >
                  View Calendar
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <FeaturedEvents />
      </main>

      <CreateEventButton />
      
      <Footer />
    </div>
  );
};

export default Index;
