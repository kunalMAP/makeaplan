
import React from 'react';

interface EventBasicInfoFormProps {
  title: string;
  description: string;
  imageUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

const EventBasicInfoForm: React.FC<EventBasicInfoFormProps> = ({
  title,
  description,
  imageUrl,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium mb-1">
          Event Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={title}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
          placeholder="What's your event called?"
          required
        />
      </div>
      
      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={onChange}
          rows={3}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none resize-none"
          placeholder="Tell people about your event..."
          required
        />
      </div>

      <div>
        <label htmlFor="imageUrl" className="block text-sm font-medium mb-1">
          Cover Image URL
        </label>
        <input
          type="url"
          id="imageUrl"
          name="imageUrl"
          value={imageUrl}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
          placeholder="https://example.com/image.jpg"
        />
      </div>
    </div>
  );
};

export default EventBasicInfoForm;
