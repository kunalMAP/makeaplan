
import React, { useState } from 'react';
import { Dialog } from '@/components/ui/dialog';
import { X, Calendar, Clock, MapPin, DollarSign, Users } from 'lucide-react';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose }) => {
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    price: '',
    isFree: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    if (name === 'isFree') {
      setEventData({
        ...eventData,
        isFree: (e.target as HTMLInputElement).checked,
        price: (e.target as HTMLInputElement).checked ? '' : eventData.price,
      });
    } else {
      setEventData({
        ...eventData,
        [name]: value,
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log(eventData);
    onClose();
  };

  return (
    <Dialog open={isOpen}>
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
        <div 
          className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b bg-white/90 backdrop-blur-sm">
            <h2 className="text-xl font-bold">Create New Event</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-accent transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="space-y-4">
              <div>
                <label htmlFor="title" className="block text-sm font-medium mb-1">
                  Event Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={eventData.title}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  placeholder="What's your event called?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="description" className="block text-sm font-medium mb-1">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={eventData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none resize-none"
                  placeholder="Tell people about your event..."
                  required
                />
              </div>
              
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
                    value={eventData.date}
                    onChange={handleChange}
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
                    value={eventData.time}
                    onChange={handleChange}
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
                  value={eventData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  placeholder="Where is your event taking place?"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
                  Cover Image URL
                </label>
                <input
                  type="url"
                  id="imageUrl"
                  name="imageUrl"
                  value={eventData.imageUrl}
                  onChange={handleChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
              
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isFree"
                  name="isFree"
                  checked={eventData.isFree}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
                />
                <label htmlFor="isFree" className="ml-2 block text-sm">
                  This is a free event
                </label>
              </div>
              
              {!eventData.isFree && (
                <div>
                  <label htmlFor="price" className="block text-sm font-medium mb-1">
                    <span className="flex items-center">
                      <DollarSign className="w-4 h-4 mr-1" />
                      Price
                    </span>
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={eventData.price}
                    onChange={handleChange}
                    min="0"
                    step="0.01"
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
                    placeholder="0.00"
                    required={!eventData.isFree}
                  />
                </div>
              )}
            </div>
            
            <div className="flex justify-end space-x-4 pt-4 border-t">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-lg border border-gray-300 text-secondary hover:bg-accent transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </Dialog>
  );
};

export default EventModal;
