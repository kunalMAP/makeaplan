
import React from 'react';
import { Calendar, Clock, MapPin } from 'lucide-react';

interface EventDateLocationFormProps {
  date: string;
  time: string;
  location: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventDateLocationForm: React.FC<EventDateLocationFormProps> = ({
  date,
  time,
  location,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="date" className="block text-sm font-medium mb-1">
            <span className="flex items-center">
              <Calendar className="w-4 h-4 mr-1" />
              Date
            </span>
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={date}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
            required
          />
        </div>
        
        <div>
          <label htmlFor="time" className="block text-sm font-medium mb-1">
            <span className="flex items-center">
              <Clock className="w-4 h-4 mr-1" />
              Time
            </span>
          </label>
          <input
            type="time"
            id="time"
            name="time"
            value={time}
            onChange={onChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
            required
          />
        </div>
      </div>
      
      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          <span className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            Location
          </span>
        </label>
        <input
          type="text"
          id="location"
          name="location"
          value={location}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
          placeholder="Where is your event taking place?"
          required
        />
      </div>
    </div>
  );
};

export default EventDateLocationForm;
