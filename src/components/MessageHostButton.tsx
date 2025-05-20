
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { toast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { MessageSquare } from 'lucide-react';

interface MessageHostButtonProps {
  hostId: string;
  eventId: string;
  eventTitle: string;
}

const MessageHostButton: React.FC<MessageHostButtonProps> = ({ hostId, eventId, eventTitle }) => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  
  const handleMessageHost = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to message the event host",
        variant: "destructive",
      });
      navigate('/login');
      return;
    }
    
    if (user.id === hostId) {
      toast({
        title: "Cannot message yourself",
        description: "You are the host of this event",
      });
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Check if conversation already exists
      const { data: existingConversations, error: checkError } = await supabase
        .from('conversations')
        .select('id')
        .eq('event_id', eventId)
        .eq('host_id', hostId)
        .eq('attendee_id', user.id)
        .single();
      
      if (checkError && checkError.code !== 'PGSQL_SINGLE_RECORD_NOT_FOUND') {
        throw checkError;
      }
      
      let conversationId;
      
      if (existingConversations) {
        // Use existing conversation
        conversationId = existingConversations.id;
      } else {
        // Create new conversation
        const { data: newConversation, error: createError } = await supabase
          .from('conversations')
          .insert({
            event_id: eventId,
            host_id: hostId,
            attendee_id: user.id,
            last_message: null,
            last_message_time: new Date().toISOString(),
            unread_count: 0
          })
          .select('id')
          .single();
          
        if (createError) throw createError;
        conversationId = newConversation.id;
      }
      
      // Navigate to messaging page
      navigate('/messaging');
      
      toast({
        title: "Conversation opened",
        description: `You can now message about "${eventTitle}"`,
      });
    } catch (error) {
      console.error('Error starting conversation:', error);
      toast({
        title: "Failed to start conversation",
        description: "There was a problem connecting you with the host",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Button 
      onClick={handleMessageHost} 
      variant="outline" 
      className="flex items-center gap-2"
      disabled={isLoading}
    >
      <MessageSquare className="h-4 w-4" />
      Message Host
    </Button>
  );
};

export default MessageHostButton;
