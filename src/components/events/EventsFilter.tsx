
import React from 'react';
import { Filter, Calendar, MapPin } from 'lucide-react';

interface EventsFilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  handleApplyFilters: () => void;
  handleResetFilters: () => void;
}

const EventsFilter: React.FC<EventsFilterProps> = ({
  isFilterOpen,
  setIsFilterOpen,
  handleApplyFilters,
  handleResetFilters
}) => {
  return (
    <>
      <button
        onClick={() => setIsFilterOpen(!isFilterOpen)}
        className="flex items-center space-x-2 py-2 px-4 border rounded-lg hover:bg-accent transition-colors"
      >
        <Filter className="w-4 h-4" />
        <span>Filters</span>
      </button>
      
      {/* Filters Panel */}
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
    </>
  );
};

export default EventsFilter;
