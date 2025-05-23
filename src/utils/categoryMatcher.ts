
// List of categories and their related keywords
const categoryKeywords = {
  'tech': ['tech', 'technology', 'coding', 'programming', 'developer', 'software', 'hardware', 'ai', 'artificial intelligence', 'machine learning', 'data science', 'blockchain', 'web3', 'crypto'],
  'business': ['business', 'entrepreneur', 'startup', 'finance', 'investment', 'marketing', 'management', 'leadership', 'career', 'professional', 'networking'],
  'art-design': ['art', 'design', 'creative', 'photography', 'painting', 'drawing', 'illustration', 'graphic design', 'exhibition', 'gallery', 'fashion', 'crafts'],
  'food-drink': ['food', 'drink', 'culinary', 'cooking', 'baking', 'chef', 'restaurant', 'wine', 'beer', 'cocktail', 'tasting', 'dining', 'brunch', 'dinner'],
  'health-wellness': ['health', 'wellness', 'fitness', 'yoga', 'meditation', 'mindfulness', 'nutrition', 'workout', 'exercise', 'gym', 'running', 'cycling', 'mental health'],
  'music-performance': ['music', 'concert', 'performance', 'gig', 'band', 'dj', 'festival', 'show', 'live music', 'singing', 'dance', 'theater', 'opera'],
  'education-learning': ['education', 'learning', 'workshop', 'seminar', 'course', 'class', 'training', 'lecture', 'conference', 'talk', 'discussion', 'study', 'school', 'university'],
  'sports-recreation': ['sports', 'recreation', 'outdoor', 'adventure', 'hiking', 'camping', 'climbing', 'swimming', 'biking', 'games', 'tournament', 'competition', 'marathon'],
  'social': ['social', 'networking', 'meetup', 'community', 'club', 'gathering', 'party', 'celebration', 'mixer', 'friends', 'singles', 'dating', 'anniversary', 'reunion'],
  'other': [] // Default category, no keywords needed
};

interface CategoryScore {
  category: string;
  score: number;
}

// Match event to category based on title and description
export const matchEventToCategory = (title: string, description: string): string => {
  if (!title && !description) return 'other';
  
  const combinedText = `${title} ${description}`.toLowerCase();
  
  // Score each category based on keyword matches
  const categoryScores: CategoryScore[] = Object.entries(categoryKeywords).map(([category, keywords]) => {
    if (category === 'other') return { category, score: 0 }; // Skip scoring 'other' category
    
    const score = keywords.reduce((total, keyword) => {
      // Count occurrences of keyword in text
      const regex = new RegExp(keyword, 'gi');
      const matches = combinedText.match(regex);
      return total + (matches ? matches.length : 0);
    }, 0);
    
    return { category, score };
  });
  
  // Sort by score (highest first) and get the highest scoring category
  const sortedCategories = categoryScores.sort((a, b) => b.score - a.score);
  
  // Return the highest scoring category as a string, or 'other' if no matches
  return sortedCategories[0].score > 0 ? sortedCategories[0].category : 'other';
};

// Get all available categories
export const getCategories = (): { id: string; name: string }[] => {
  return [
    { id: 'all', name: 'All Events' },
    { id: 'tech', name: 'Tech' },
    { id: 'business', name: 'Business' },
    { id: 'art-design', name: 'Art & Design' },
    { id: 'food-drink', name: 'Food & Drink' },
    { id: 'health-wellness', name: 'Health & Wellness' },
    { id: 'music-performance', name: 'Music & Performance' },
    { id: 'education-learning', name: 'Education' },
    { id: 'sports-recreation', name: 'Sports & Recreation' },
    { id: 'social', name: 'Social' },
    { id: 'other', name: 'Other' },
  ];
};
