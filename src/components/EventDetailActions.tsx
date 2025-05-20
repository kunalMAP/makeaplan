
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar, Share2 } from 'lucide-react';
import MessageHostButton from '@/components/MessageHostButton';

interface EventDetailActionsProps {
  eventId: string;
  hostId: string;
  title: string;
}

const EventDetailActions: React.FC<EventDetailActionsProps> = ({ 
  eventId, 
  hostId,
  title
}) => {
  const handleAddToCalendar = () => {
    // Implement calendar functionality here
    console.log('Add to calendar clicked');
  };

  const handleShareEvent = () => {
    // Implement share functionality here
    if (navigator.share) {
      navigator.share({
        title: title,
        url: window.location.href,
      }).catch(console.error);
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button 
        onClick={handleAddToCalendar}
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Calendar className="h-4 w-4" />
        Add to Calendar
      </Button>
      
      <MessageHostButton 
        hostId={hostId} 
        eventId={eventId}
        eventTitle={title}
      />
      
      <Button 
        onClick={handleShareEvent}
        variant="outline" 
        className="flex items-center gap-2"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
    </div>
  );
};

export default EventDetailActions;
