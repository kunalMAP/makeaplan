
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={`relative transition-all duration-300 ease-in-out ${isExpanded ? 'w-full md:w-80' : 'w-10'}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-secondary" />
      </div>
      <input
        type="search"
        className={`block w-full p-2.5 pl-10 text-sm rounded-full bg-accent text-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 ease-in-out ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
        placeholder="Find events, people, or interests..."
        onFocus={() => setIsExpanded(true)}
        onBlur={() => setIsExpanded(false)}
      />
      <button
        className={`absolute inset-y-0 right-0 flex items-center pr-3 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}
        onClick={() => setIsExpanded(false)}
      >
        <span className="sr-only">Clear</span>
        <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
      <button
        className={`absolute inset-y-0 left-0 p-2.5 rounded-full text-secondary hover:text-primary transition-opacity duration-300 ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setIsExpanded(true)}
      >
        <span className="sr-only">Search</span>
        <Search className="w-5 h-5" />
      </button>
    </div>
  );
};

export default SearchBar;
