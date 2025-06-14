
import React from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import EventModalHeader from './events/modals/EventModalHeader';
import EventForm, { EventFormData } from './events/modals/EventForm';
import { DialogContent } from './ui/dialog';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEventCreated?: (eventData: EventFormData) => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, onEventCreated }) => {
  const { user } = useAuth();

  const handleSubmit = async (eventData: EventFormData) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to create an event",
        variant: "destructive",
      });
      onClose();
      return;
    }

    try {
      // Insert event into Supabase
      const { data, error } = await supabase
        .from('events')
        .insert({
          user_id: user.id,
          title: eventData.title,
          description: eventData.description,
          date: eventData.date,
          time: eventData.time,
          location: eventData.location,
          image_url: eventData.imageUrl || 'https://images.unsplash.com/photo-1540575467063-178a50c2df87',
          price: eventData.isFree ? 'Free' : eventData.price,
          is_free: eventData.isFree
        })
        .select();

      if (error) throw error;

      // Call the callback if provided
      if (onEventCreated) {
        onEventCreated(eventData);
      }

      toast({
        title: "Event created",
        description: "Your event has been created successfully",
      });

      console.log("Created event:", data);
      onClose();
    } catch (error: any) {
      console.error("Error creating event:", error);
      toast({
        title: "Failed to create event",
        description: error.message || "An error occurred while creating the event",
        variant: "destructive",
      });
    }
  };

  if (!isOpen) return null;

  return (
    <DialogContent 
      className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-0"
      onClick={(e) => e.stopPropagation()}
    >
      <EventModalHeader onClose={onClose} />
      <EventForm onSubmit={handleSubmit} onCancel={onClose} />
    </DialogContent>
  );
};

export default EventModal;
