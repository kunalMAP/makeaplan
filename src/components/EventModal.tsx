
import React from 'react';
import { Dialog } from '@/components/ui/dialog';
import EventModalHeader from './events/modals/EventModalHeader';
import EventForm, { EventFormData } from './events/modals/EventForm';

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose }) => {
  const handleSubmit = (eventData: EventFormData) => {
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
          <EventModalHeader onClose={onClose} />
          <EventForm onSubmit={handleSubmit} onCancel={onClose} />
        </div>
      </div>
    </Dialog>
  );
};

export default EventModal;
