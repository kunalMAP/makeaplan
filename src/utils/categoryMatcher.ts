
// Utility to match event content to appropriate categories

interface CategoryMatch {
  id: string;
  name: string;
  keywords: string[];
}

// Define categories with related keywords
const categoryMatchers: CategoryMatch[] = [
  {
    id: 'tech',
    name: 'Tech',
    keywords: ['tech', 'technology', 'programming', 'coding', 'developer', 'software', 'ai', 'artificial intelligence', 'computer', 'digital', 'innovation', 'startup']
  },
  {
    id: 'outdoors',
    name: 'Outdoors',
    keywords: ['outdoor', 'nature', 'hiking', 'camping', 'adventure', 'trek', 'mountain', 'forest', 'wildlife', 'park', 'trail', 'expedition']
  },
  {
    id: 'food-drink',
    name: 'Food & Drink',
    keywords: ['food', 'drink', 'dining', 'restaurant', 'cuisine', 'culinary', 'wine', 'beer', 'cocktail', 'tasting', 'brunch', 'dinner', 'lunch', 'breakfast', 'cook']
  },
  {
    id: 'arts',
    name: 'Arts',
    keywords: ['art', 'exhibition', 'gallery', 'museum', 'creative', 'painting', 'sculpture', 'artist', 'design', 'craft', 'performance', 'theater', 'cultural']
  },
  {
    id: 'sports',
    name: 'Sports',
    keywords: ['sport', 'game', 'match', 'tournament', 'competition', 'athletic', 'fitness', 'workout', 'training', 'team', 'league', 'player', 'soccer', 'basketball', 'football', 'baseball']
  },
  {
    id: 'music',
    name: 'Music',
    keywords: ['music', 'concert', 'festival', 'band', 'live', 'performance', 'dj', 'gig', 'song', 'artist', 'show', 'tour', 'instrument', 'stage']
  }
];

/**
 * Match event to a category based on title and description
 */
export const matchEventToCategory = (title: string, description: string = ''): string => {
  // Combine title and description, convert to lowercase for matching
  const content = `${title} ${description}`.toLowerCase();
  
  // Find the category with the most keyword matches
  let bestMatchCategory = 'other';
  let highestMatchCount = 0;
  
  for (const category of categoryMatchers) {
    const matchCount = category.keywords.reduce((count, keyword) => {
      return content.includes(keyword.toLowerCase()) ? count + 1 : count;
    }, 0);
    
    if (matchCount > highestMatchCount) {
      highestMatchCount = matchCount;
      bestMatchCategory = category.id;
    }
  }
  
  return bestMatchCategory;
};

/**
 * Get all available categories as an array
 */
export const getCategories = () => {
  return [
    { id: 'all', name: 'All' },
    ...categoryMatchers,
    { id: 'other', name: 'Other' }
  ];
};

export default matchEventToCategory;
