
import React from 'react';
import { PlusCircle } from 'lucide-react';

interface CreateEventButtonProps {
  onClick: () => void;
}

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 z-30 flex items-center justify-center p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-all duration-300 group"
    >
      <PlusCircle className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
      <span className="absolute opacity-0 group-hover:opacity-100 group-hover:right-16 pointer-events-none bg-foreground/90 text-white px-2 py-1 rounded text-sm whitespace-nowrap transition-all duration-300">
        Create Event
      </span>
    </button>
  );
};

export default CreateEventButton;
