
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PlusIcon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import EventModal from './EventModal';
import { Dialog } from './ui/dialog';

const CreateEventButton: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  
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
    
    setIsModalOpen(true);
  };
  
  return (
    <>
      <button
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-40 p-4 rounded-full bg-primary text-white shadow-lg hover:bg-primary/90 transition-colors"
        aria-label="Create Event"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
      
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        {isModalOpen && (
          <EventModal 
            isOpen={isModalOpen} 
            onClose={() => setIsModalOpen(false)} 
          />
        )}
      </Dialog>
    </>
  );
};

export default CreateEventButton;
