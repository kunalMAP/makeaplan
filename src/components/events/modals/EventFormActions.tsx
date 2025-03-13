
import React from 'react';

interface EventFormActionsProps {
  onCancel: () => void;
  isSubmitting?: boolean;
}

const EventFormActions: React.FC<EventFormActionsProps> = ({ 
  onCancel,
  isSubmitting = false
}) => {
  return (
    <div className="flex justify-end space-x-4 pt-4 border-t">
      <button
        type="button"
        onClick={onCancel}
        className="px-4 py-2 rounded-lg border border-gray-300 text-secondary hover:bg-accent transition-colors"
        disabled={isSubmitting}
      >
        Cancel
      </button>
      <button
        type="submit"
        className={`px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors ${
          isSubmitting ? 'opacity-70 cursor-not-allowed' : ''
        }`}
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Creating...' : 'Create Event'}
      </button>
    </div>
  );
};

export default EventFormActions;
