
import React from 'react';
import { cn } from "@/lib/utils";

interface UserAvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ 
  src = '/placeholder.svg', 
  alt = 'User', 
  size = 'md',
  className
}) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-14 h-14'
  };

  return (
    <div className={cn(
      "relative rounded-full overflow-hidden bg-muted flex items-center justify-center text-muted-foreground font-medium",
      sizeClasses[size],
      className
    )}>
      <img 
        src={src} 
        alt={alt}
        className="w-full h-full object-cover transition-opacity duration-300"
        onLoad={(e) => (e.target as HTMLImageElement).classList.add('opacity-100')}
        style={{ opacity: 0 }}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        {alt.charAt(0).toUpperCase()}
      </span>
    </div>
  );
};

export default UserAvatar;
