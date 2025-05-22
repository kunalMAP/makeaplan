
import React from 'react';
import { Calendar, MapPin, Users, Clock } from 'lucide-react';
import UserAvatar from './UserAvatar';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { toast } from "@/hooks/use-toast";

export interface EventProps {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: string;
  imageUrl: string;
  price?: string;
  category?: string;
  attendees: {
    count: number;
    avatars: string[];
  };
  organizer: {
    name: string;
    avatar: string;
  };
  featured?: boolean;
}

const EventCard: React.FC<{ event: EventProps; className?: string }> = ({ 
  event, 
  className 
}) => {
  const { 
    id, title, description, date, time, 
    location, imageUrl, price, attendees, 
    organizer, featured = false, category = 'other' 
  } = event;
  
  const navigate = useNavigate();
  
  const handleJoinClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click
    
    toast({
      title: `Plan Details: ${title}`,
      description: `Host: ${organizer.name} | Location: ${location} | Time: ${time}`,
      duration: 5000,
    });
  };

  const handleCardClick = () => {
    navigate(`/events/${id}`);
  };

  return (
    <div 
      className={cn(
        "relative overflow-hidden rounded-2xl hover-scale group cursor-pointer", 
        featured ? "md:col-span-2" : "", 
        className
      )}
      onClick={handleCardClick}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent z-10" />
      
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>
      
      {featured && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-primary/90 text-white">
            Featured
          </span>
        </div>
      )}
      
      {/* Category tag */}
      {category && category !== 'other' && (
        <div className="absolute top-4 left-4 z-20">
          <span className="px-2 py-1 text-xs font-medium rounded-full bg-accent/90 text-foreground">
            {category.charAt(0).toUpperCase() + category.slice(1).replace('-', ' & ')}
          </span>
        </div>
      )}
      
      {price && (
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1.5 text-sm font-medium rounded-full bg-white/90 text-foreground backdrop-blur-xs">
            {price === "Free" ? "Free" : `₹${price}`}
          </span>
        </div>
      )}
      
      <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
        <div className="flex items-center space-x-2 mb-2">
          <UserAvatar 
            src={organizer.avatar} 
            alt={organizer.name} 
            size="sm" 
            className="border-2 border-white/30" 
          />
          <span className="text-sm font-medium">{organizer.name}</span>
        </div>
        
        <h3 className="text-xl font-bold mb-2 line-clamp-1">{title}</h3>
        
        <p className="text-sm text-white/80 mb-3 line-clamp-2">{description}</p>
        
        <div className="flex flex-wrap gap-3 text-xs font-medium text-white/90">
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-1" />
            <span>{date}</span>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-1" />
            <span>{time}</span>
          </div>
          
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="truncate max-w-[150px]">{location}</span>
          </div>
          
          <div className="flex items-center">
            <Users className="w-4 h-4 mr-1" />
            <span>{attendees.count} attending</span>
          </div>
        </div>
        
        <div className="absolute bottom-4 right-4 transition-transform duration-300 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0">
          <button 
            className="px-4 py-2 rounded-lg bg-white font-medium text-sm text-foreground shadow-lg hover:bg-primary hover:text-white transition-colors"
            onClick={handleJoinClick}
          >
            Join
          </button>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
