
import React from 'react';
import { getCategories } from '@/utils/categoryMatcher';

interface Category {
  id: string;
  name: string;
}

interface EventsCategoriesProps {
  selectedCategory: string;
  handleCategoryChange: (categoryId: string) => void;
}

const EventsCategories: React.FC<EventsCategoriesProps> = ({
  selectedCategory,
  handleCategoryChange
}) => {
  // Get categories from our utility
  const categories = getCategories();
  
  return (
    <div className="flex overflow-x-auto space-x-2 py-2 mb-8 scrollbar-none">
      {categories.map(category => (
        <button
          key={category.id}
          onClick={() => handleCategoryChange(category.id)}
          className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category.id
              ? 'bg-primary text-white'
              : 'bg-accent/50 hover:bg-accent text-secondary hover:text-foreground'
          }`}
          aria-label={`Filter by ${category.name}`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default EventsCategories;
