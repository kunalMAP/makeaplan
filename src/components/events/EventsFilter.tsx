
import React, { useState } from 'react';
import { Filter, Calendar, MapPin } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

interface FilterValues {
  date: string;
  location: string;
  price: string;
}

interface EventsFilterProps {
  isFilterOpen: boolean;
  setIsFilterOpen: (isOpen: boolean) => void;
  handleApplyFilters: (filters: FilterValues) => void;
  handleResetFilters: () => void;
}

const EventsFilter: React.FC<EventsFilterProps> = ({
  isFilterOpen,
  setIsFilterOpen,
  handleApplyFilters,
  handleResetFilters
}) => {
  const [filterValues, setFilterValues] = useState<FilterValues>({
    date: '',
    location: '',
    price: 'any'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilterValues(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSelectChange = (value: string) => {
    setFilterValues(prev => ({
      ...prev,
      price: value
    }));
  };

  const onApplyFilters = () => {
    handleApplyFilters(filterValues);
  };

  const onResetFilters = () => {
    setFilterValues({
      date: '',
      location: '',
      price: 'any'
    });
    handleResetFilters();
  };

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
      <div className={`bg-accent/50 backdrop-blur-xs rounded-xl p-4 mb-8 transition-all duration-300 ${isFilterOpen ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'} transform`}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
              <Calendar className="w-4 h-4 text-secondary" />
              Date
            </h3>
            <div className="flex items-center">
              <input
                type="date"
                name="date"
                value={filterValues.date}
                onChange={handleInputChange}
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-secondary" />
              Location
            </h3>
            <div className="flex items-center">
              <input
                type="text"
                name="location"
                value={filterValues.location}
                onChange={handleInputChange}
                placeholder="Enter location"
                className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-sm mb-2">Price Range</h3>
            <div>
              <Select 
                value={filterValues.price} 
                onValueChange={handleSelectChange}
              >
                <SelectTrigger className="w-full px-3 py-2 rounded-lg border bg-background focus:outline-none focus:ring-2 focus:ring-primary/20">
                  <SelectValue placeholder="Any price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any">Any price</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="under25">Under $25</SelectItem>
                  <SelectItem value="under50">Under $50</SelectItem>
                  <SelectItem value="over50">$50+</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="flex justify-end mt-4 space-x-2">
          <button 
            onClick={onResetFilters}
            className="px-4 py-2 border rounded-lg hover:bg-accent/70 transition-colors"
          >
            Reset
          </button>
          <button 
            onClick={onApplyFilters}
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
