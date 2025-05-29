
import React, { useState } from 'react';
import EventBasicInfoForm from './EventBasicInfoForm';
import EventDateLocationForm from './EventDateLocationForm';
import EventPriceForm from './EventPriceForm';
import EventFormActions from './EventFormActions';
import { matchEventToCategory } from '@/utils/categoryMatcher';

export interface EventFormData {
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price: string;
  isFree: boolean;
  category?: string;
}

interface EventFormProps {
  onSubmit: (eventData: EventFormData) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ onSubmit, onCancel }) => {
  const [eventData, setEventData] = useState<EventFormData>({
    title: '',
    description: '',
    date: '',
    time: '',
    location: '',
    imageUrl: '',
    price: '',
    isFree: true,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const validateForm = () => {
    if (!eventData.title.trim()) {
      return 'Event title is required';
    }
    if (!eventData.description.trim()) {
      return 'Event description is required';
    }
    if (!eventData.date) {
      return 'Event date is required';
    }
    if (!eventData.time) {
      return 'Event time is required';
    }
    if (!eventData.location.trim()) {
      return 'Event location is required';
    }
    if (!eventData.isFree && !eventData.price) {
      return 'Price is required for paid events';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateForm();
    if (validationError) {
      alert(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Auto-categorize the event based on title and description
      const category = matchEventToCategory(eventData.title, eventData.description);
      
      console.log("Submitting event data:", { ...eventData, category });
      
      await onSubmit({
        ...eventData,
        category
      });
    } catch (error) {
      console.error("Error in form submission:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-6">
      <EventBasicInfoForm
        title={eventData.title}
        description={eventData.description}
        imageUrl={eventData.imageUrl}
        onChange={handleChange}
      />
      
      <EventDateLocationForm
        date={eventData.date}
        time={eventData.time}
        location={eventData.location}
        onChange={handleChange}
      />
      
      <EventPriceForm
        isFree={eventData.isFree}
        price={eventData.price}
        onChange={handleChange}
      />
      
      <EventFormActions onCancel={onCancel} isSubmitting={isSubmitting} />
    </form>
  );
};

export default EventForm;
