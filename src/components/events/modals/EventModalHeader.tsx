
import React from 'react';
import { X } from 'lucide-react';

interface EventModalHeaderProps {
  onClose: () => void;
}

const EventModalHeader: React.FC<EventModalHeaderProps> = ({ onClose }) => {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-between p-6 border-b bg-white/90 backdrop-blur-sm">
      <h2 className="text-xl font-bold">Create New Event</h2>
      <button 
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        className="p-2 rounded-full hover:bg-accent transition-colors"
        aria-label="Close"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );
};

export default EventModalHeader;
