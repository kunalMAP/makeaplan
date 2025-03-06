
import React from 'react';
import EventCard, { EventProps } from '@/components/EventCard';

interface EventsGridProps {
  events: EventProps[];
  visibleEvents: number;
  handleLoadMore: () => void;
}

const EventsGrid: React.FC<EventsGridProps> = ({
  events,
  visibleEvents,
  handleLoadMore
}) => {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.slice(0, visibleEvents).map(event => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>
      
      {/* Load More Button */}
      <div className="text-center mt-12">
        {visibleEvents < events.length ? (
          <button 
            onClick={handleLoadMore}
            className="px-6 py-3 border rounded-lg hover:bg-accent transition-colors"
          >
            Load More Events
          </button>
        ) : (
          <p className="text-secondary">You've reached the end of the list</p>
        )}
      </div>
    </>
  );
};

export default EventsGrid;
