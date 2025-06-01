
import React from 'react';
import PhotoUpload from './PhotoUpload';

interface EventBasicInfoFormProps {
  title: string;
  description: string;
  imageUrl: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onPhotoChange: (photoUrl: string) => void;
}

const EventBasicInfoForm: React.FC<EventBasicInfoFormProps> = ({
  title,
  description,
  imageUrl,
  onChange,
  onPhotoChange
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

      <PhotoUpload
        onPhotoSelected={onPhotoChange}
        currentPhoto={imageUrl}
      />
    </div>
  );
};

export default EventBasicInfoForm;
