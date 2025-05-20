
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import { MessageSquare, Send, Paperclip, Users, User } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/hooks/use-toast";
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

interface MessageProps {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  created_at: string;
  is_read: boolean;
}

interface ConversationProps {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string | null;
    type: 'host' | 'attendee';
  };
  last_message: string | null;
  last_message_time: string | null;
  unread_count: number;
}

const Messaging: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [contactType, setContactType] = useState<'all' | 'hosts' | 'attendees'>('all');

  // Fetch conversations
  const { data: conversations, isLoading: isLoadingConversations } = useQuery({
    queryKey: ['conversations', user?.id],
    queryFn: async () => {
      if (!user) return [];
      
      const { data, error } = await supabase
        .from('conversations')
        .select(`
          id,
          event:events(id, title),
          host_id,
          attendee_id,
          host:profiles!host_id(id, name, avatar),
          attendee:profiles!attendee_id(id, name, avatar),
          last_message,
          last_message_time,
          unread_count
        `)
        .or(`host_id.eq.${user.id},attendee_id.eq.${user.id}`)
        .order('last_message_time', { ascending: false });
      
      if (error) {
        console.error('Error fetching conversations:', error);
        return [];
      }
      
      return data.map(convo => {
        // Determine if the current user is the host or attendee
        const isHost = convo.host_id === user.id;
        const participant = isHost ? convo.attendee : convo.host;
        
        return {
          id: convo.id,
          participant: {
            id: participant?.id || '',
            name: participant?.name || 'Unknown User',
            avatar: participant?.avatar,
            type: isHost ? 'attendee' : 'host'
          },
          event: convo.event,
          last_message: convo.last_message,
          last_message_time: convo.last_message_time,
          unread_count: convo.unread_count || 0
        };
      });
    },
    enabled: !!user
  });
  
  // Fetch messages for selected conversation
  const { data: messages, isLoading: isLoadingMessages } = useQuery({
    queryKey: ['messages', selectedConversation],
    queryFn: async () => {
      if (!selectedConversation) return [];
      
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('conversation_id', selectedConversation)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
        return [];
      }
      
      // Mark messages as read
      if (data.length > 0) {
        await supabase
          .from('messages')
          .update({ is_read: true })
          .eq('conversation_id', selectedConversation)
          .neq('sender_id', user?.id || '');
        
        await supabase
          .from('conversations')
          .update({ unread_count: 0 })
          .eq('id', selectedConversation);
      }
      
      return data;
    },
    enabled: !!selectedConversation
  });
  
  // Set first conversation as selected by default
  useEffect(() => {
    if (conversations && conversations.length > 0 && !selectedConversation) {
      setSelectedConversation(conversations[0].id);
    }
  }, [conversations, selectedConversation]);
  
  // Filter conversations by type
  const filteredConversations = conversations ? (
    contactType === 'all' 
      ? conversations 
      : conversations.filter(conv => conv.participant.type === contactType)
  ) : [];
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedConversation || !user) {
      return;
    }
    
    try {
      // Add message to database
      const { data, error } = await supabase
        .from('messages')
        .insert({
          conversation_id: selectedConversation,
          sender_id: user.id,
          content: newMessage.trim(),
          is_read: false
        })
        .select('*')
        .single();
      
      if (error) throw error;
      
      // Update conversation last message
      await supabase
        .from('conversations')
        .update({
          last_message: newMessage.trim(),
          last_message_time: new Date().toISOString(),
          unread_count: supabase.rpc('increment_unread', { convo_id: selectedConversation })
        })
        .eq('id', selectedConversation);
      
      setNewMessage('');
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Failed to send message",
        description: "There was a problem sending your message. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user) {
    navigate('/login');
    return null;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold mb-6">Messages</h1>
          
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[80vh]">
              {/* Conversation List */}
              <div className="border-r hidden md:block">
                <div className="p-4 border-b">
                  <Tabs defaultValue="all" className="w-full">
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger 
                        value="all" 
                        onClick={() => setContactType('all')}
                        className="text-xs sm:text-sm"
                      >
                        All
                      </TabsTrigger>
                      <TabsTrigger 
                        value="hosts" 
                        onClick={() => setContactType('hosts')}
                        className="text-xs sm:text-sm"
                      >
                        <User className="mr-1 h-3 w-3" />
                        Hosts
                      </TabsTrigger>
                      <TabsTrigger 
                        value="attendees" 
                        onClick={() => setContactType('attendees')}
                        className="text-xs sm:text-sm"
                      >
                        <Users className="mr-1 h-3 w-3" />
                        Attendees
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                
                <div className="overflow-y-auto h-[calc(80vh-120px)]">
                  {isLoadingConversations ? (
                    Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="p-4 border-b">
                        <div className="flex items-start space-x-3">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="flex-1">
                            <Skeleton className="h-4 w-24 mb-2" />
                            <Skeleton className="h-3 w-40" />
                          </div>
                        </div>
                      </div>
                    ))
                  ) : filteredConversations.length === 0 ? (
                    <div className="p-8 text-center text-gray-500">
                      <MessageSquare className="mx-auto h-12 w-12 text-gray-400 mb-2" />
                      <h3 className="text-lg font-medium">No conversations yet</h3>
                      <p className="text-sm mt-1">
                        {contactType === 'all' ? 
                          "Messages with event hosts and attendees will appear here" :
                          `No ${contactType} conversations found`}
                      </p>
                    </div>
                  ) : (
                    filteredConversations.map((conversation) => (
                      <div 
                        key={conversation.id}
                        onClick={() => setSelectedConversation(conversation.id)}
                        className={`p-4 border-b hover:bg-accent/30 cursor-pointer transition-colors ${
                          selectedConversation === conversation.id ? 'bg-accent/50' : ''
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="relative">
                            <UserAvatar 
                              src={conversation.participant.avatar || ""} 
                              alt={conversation.participant.name} 
                              size="md" 
                            />
                            {conversation.unread_count > 0 && (
                              <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                                {conversation.unread_count}
                              </span>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-baseline">
                              <div className="flex items-center">
                                <h3 className="font-semibold truncate">{conversation.participant.name}</h3>
                                <span className={`ml-2 text-xs px-1.5 py-0.5 rounded-full ${
                                  conversation.participant.type === 'host' 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-secondary/10 text-secondary'
                                }`}>
                                  {conversation.participant.type === 'host' ? 'Host' : 'Attendee'}
                                </span>
                              </div>
                              <span className="text-xs text-gray-500">
                                {conversation.last_message_time ? new Date(conversation.last_message_time).toLocaleDateString() : ''}
                              </span>
                            </div>
                            <p className="text-sm text-secondary truncate">
                              {conversation.last_message || 'No messages yet'}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
              
              {/* Message Content */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                {selectedConversation && conversations ? (
                  <>
                    {/* Conversation Header */}
                    <div className="p-4 border-b flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {(() => {
                          const conversation = conversations.find(c => c.id === selectedConversation);
                          return conversation ? (
                            <>
                              <UserAvatar 
                                src={conversation.participant.avatar || ''} 
                                alt={conversation.participant.name} 
                                size="md" 
                              />
                              <div>
                                <h3 className="font-semibold">{conversation.participant.name}</h3>
                                <span className={`text-xs px-1.5 py-0.5 rounded-full ${
                                  conversation.participant.type === 'host' 
                                    ? 'bg-primary/10 text-primary' 
                                    : 'bg-secondary/10 text-secondary'
                                }`}>
                                  {conversation.participant.type === 'host' ? 'Event Host' : 'Attendee'}
                                </span>
                              </div>
                            </>
                          ) : null;
                        })()}
                      </div>
                    </div>
                    
                    {/* Messages */}
                    <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
                      {isLoadingMessages ? (
                        Array.from({ length: 3 }).map((_, i) => (
                          <div key={i} className={`flex ${i % 2 === 0 ? 'justify-start' : 'justify-end'}`}>
                            <div className={`flex max-w-[70%] ${i % 2 === 0 ? '' : 'flex-row-reverse'}`}>
                              <Skeleton className="h-8 w-8 rounded-full mt-1 mx-2" />
                              <div>
                                <Skeleton className="h-16 w-64 rounded-2xl" />
                                <Skeleton className="h-3 w-16 mt-1" />
                              </div>
                            </div>
                          </div>
                        ))
                      ) : messages && messages.length > 0 ? (
                        messages.map((message) => (
                          <div 
                            key={message.id}
                            className={`flex ${message.sender_id === user.id ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`flex max-w-[70%] ${message.sender_id === user.id ? 'flex-row-reverse' : ''}`}>
                              <UserAvatar 
                                src={message.sender_id === user.id ? user.avatar || "" : 
                                  conversations.find(c => c.id === selectedConversation)?.participant.avatar || ""} 
                                alt={message.sender_id === user.id ? user.name : 
                                  conversations.find(c => c.id === selectedConversation)?.participant.name || "User"} 
                                size="sm" 
                                className="mt-1 mx-2" 
                              />
                              <div>
                                <div 
                                  className={`px-4 py-3 rounded-2xl ${
                                    message.sender_id === user.id 
                                      ? 'bg-primary text-white rounded-tr-none' 
                                      : 'bg-accent rounded-tl-none'
                                  }`}
                                >
                                  <p>{message.content}</p>
                                </div>
                                <p className={`text-xs text-gray-500 mt-1 ${message.sender_id === user.id ? 'text-right' : ''}`}>
                                  {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                          <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                          <h3 className="text-lg font-medium text-gray-900">No messages yet</h3>
                          <p className="text-gray-500 mt-1 max-w-sm">
                            Send a message to start the conversation
                          </p>
                        </div>
                      )}
                    </div>
                    
                    {/* Message Input */}
                    <div className="p-4 border-t">
                      <form onSubmit={handleSendMessage} className="flex items-center space-x-2">
                        <button
                          type="button"
                          className="p-2 rounded-full hover:bg-accent transition-colors"
                        >
                          <Paperclip className="w-5 h-5 text-secondary" />
                        </button>
                        <input
                          type="text"
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          placeholder="Type a message..."
                          className="flex-1 p-3 border rounded-full focus:outline-none focus:ring-2 focus:ring-primary/20"
                        />
                        <button
                          type="submit"
                          className="p-3 rounded-full bg-primary text-white hover:bg-primary/90 transition-colors"
                          disabled={!newMessage.trim() || isLoadingMessages}
                        >
                          <Send className="w-5 h-5" />
                        </button>
                      </form>
                    </div>
                  </>
                ) : (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-8">
                    <MessageSquare className="h-16 w-16 text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Select a conversation</h3>
                    <p className="text-gray-500 mt-1">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Messaging;
