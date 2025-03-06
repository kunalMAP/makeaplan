
import React from 'react';
import { DollarSign } from 'lucide-react';

interface EventPriceFormProps {
  isFree: boolean;
  price: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EventPriceForm: React.FC<EventPriceFormProps> = ({
  isFree,
  price,
  onChange
}) => {
  return (
    <div className="space-y-4">
      <div className="flex items-center">
        <input
          type="checkbox"
          id="isFree"
          name="isFree"
          checked={isFree}
          onChange={onChange}
          className="w-4 h-4 text-primary border-gray-300 rounded focus:ring-primary/20"
        />
        <label htmlFor="isFree" className="ml-2 block text-sm">
          This is a free event
        </label>
      </div>
      
      {!isFree && (
        <div>
          <label htmlFor="price" className="block text-sm font-medium mb-1">
            <span className="flex items-center">
              <DollarSign className="w-4 h-4 mr-1" />
              Price
            </span>
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={price}
            onChange={onChange}
            min="0"
            step="0.01"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary focus:outline-none"
            placeholder="0.00"
            required={!isFree}
          />
        </div>
      )}
    </div>
  );
};

export default EventPriceForm;
