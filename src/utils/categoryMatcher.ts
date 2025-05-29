
// Define known event categories
export const eventCategories = [
  'music',
  'art',
  'food',
  'sport',
  'tech',
  'business',
  'health',
  'education',
  'travel',
  'other'
] as const;

export type EventCategory = typeof eventCategories[number];

// Interface for category scores
interface CategoryScore {
  category: EventCategory;
  score: number;
}

// Keywords associated with each category
const categoryKeywords: Record<EventCategory, string[]> = {
  'music': ['music', 'concert', 'festival', 'band', 'performance', 'singer', 'dj', 'song', 'album', 'rock', 'jazz', 'pop'],
  'art': ['art', 'gallery', 'exhibition', 'painting', 'sculpture', 'museum', 'artist', 'craft', 'design', 'creative'],
  'food': ['food', 'restaurant', 'cuisine', 'dinner', 'lunch', 'breakfast', 'cooking', 'chef', 'taste', 'gastronomy', 'culinary'],
  'sport': ['sport', 'match', 'game', 'tournament', 'competition', 'athlete', 'team', 'fitness', 'run', 'marathon', 'race'],
  'tech': ['tech', 'technology', 'software', 'hardware', 'coding', 'digital', 'ai', 'programming', 'developer', 'innovation'],
  'business': ['business', 'entrepreneur', 'startup', 'networking', 'career', 'professional', 'industry', 'corporate', 'conference'],
  'health': ['health', 'wellness', 'yoga', 'meditation', 'mindfulness', 'workout', 'training', 'exercise', 'fitness', 'wellbeing'],
  'education': ['education', 'workshop', 'learning', 'course', 'lecture', 'seminar', 'skill', 'knowledge', 'training', 'class', 'teaching'],
  'travel': ['travel', 'journey', 'adventure', 'trip', 'destination', 'tour', 'tourism', 'expedition', 'explore', 'discovery'],
  'other': []
};

// Export function to get categories for UI components
export const getCategories = () => {
  return [
    { id: 'all', name: 'All Events' },
    ...eventCategories.map(category => ({
      id: category,
      name: category.charAt(0).toUpperCase() + category.slice(1)
    }))
  ];
};

export const matchEventToCategory = (title: string, description: string = ''): EventCategory => {
  const combinedText = `${title} ${description}`.toLowerCase();
  
  // Calculate score for each category based on keyword matches
  const categoryScores: CategoryScore[] = eventCategories.map(category => {
    const keywords = categoryKeywords[category];
    let score = 0;
    
    keywords.forEach(keyword => {
      if (combinedText.includes(keyword.toLowerCase())) {
        score++;
      }
    });
    
    return { category, score };
  });
  
  // Sort by score (highest first) and get the highest scoring category
  const sortedCategories = [...categoryScores].sort(
    (a: CategoryScore, b: CategoryScore): number => b.score - a.score
  );
  
  // Return the highest scoring category as a string, or 'other' if no matches
  return sortedCategories[0].score > 0 ? sortedCategories[0].category : 'other';
};
