
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';

interface CreateEventButtonProps {
  onClick: () => void;
}

const CreateEventButton: React.FC<CreateEventButtonProps> = ({ onClick }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const handleClick = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in or sign up to create an event",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    onClick();
  };
  
  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
      aria-label="Create Event"
    >
      <PlusIcon className="h-6 w-6" />
    </button>
  );
};

export default CreateEventButton;
