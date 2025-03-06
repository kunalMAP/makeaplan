
import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import EventsFilter from '@/components/events/EventsFilter';
import EventsCategories from '@/components/events/EventsCategories';
import EventsGrid from '@/components/events/EventsGrid';
import CreateEventButton from '@/components/CreateEventButton';
import EventModal from '@/components/EventModal';
import { eventsData, categories } from '@/data/eventsData';

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
              <EventsFilter 
                isFilterOpen={isFilterOpen}
                setIsFilterOpen={setIsFilterOpen}
                handleApplyFilters={handleApplyFilters}
                handleResetFilters={handleResetFilters}
              />
              
              <select className="py-2 px-4 border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                <option value="recommended">Recommended</option>
                <option value="date">Date</option>
                <option value="price">Price</option>
                <option value="distance">Distance</option>
              </select>
            </div>
          </div>
          
          <EventsCategories 
            categories={categories}
            selectedCategory={selectedCategory}
            handleCategoryChange={handleCategoryChange}
          />
          
          <EventsGrid 
            events={eventsData}
            visibleEvents={visibleEvents}
            handleLoadMore={handleLoadMore}
          />
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
