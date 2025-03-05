
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const SearchBar: React.FC = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/events?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
      setIsExpanded(false);
    }
  };

  return (
    <form onSubmit={handleSearch} className={`relative transition-all duration-300 ease-in-out ${isExpanded ? 'w-full md:w-80' : 'w-10'}`}>
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-5 h-5 text-secondary" />
      </div>
      <input
        type="search"
        className={`block w-full p-2.5 pl-10 text-sm rounded-full bg-accent text-foreground focus:ring-2 focus:ring-primary/20 focus:outline-none transition-all duration-300 ease-in-out ${
          isExpanded ? 'opacity-100' : 'opacity-0'
        }`}
        placeholder="Find events, people, or interests..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onFocus={() => setIsExpanded(true)}
        onBlur={() => {
          if (!searchQuery) {
            setIsExpanded(false);
          }
        }}
      />
      {isExpanded && searchQuery && (
        <button
          type="button"
          className="absolute inset-y-0 right-0 flex items-center pr-3 opacity-100"
          onClick={() => {
            setSearchQuery('');
          }}
        >
          <span className="sr-only">Clear</span>
          <svg className="w-4 h-4 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      )}
      <button
        type="button"
        className={`absolute inset-y-0 left-0 p-2.5 rounded-full text-secondary hover:text-primary transition-opacity duration-300 ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        }`}
        onClick={() => setIsExpanded(true)}
      >
        <span className="sr-only">Search</span>
        <Search className="w-5 h-5" />
      </button>
    </form>
  );
};

export default SearchBar;
