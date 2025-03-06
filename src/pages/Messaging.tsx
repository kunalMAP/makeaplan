
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import UserAvatar from '@/components/UserAvatar';
import { MessageSquare, Send, Paperclip } from 'lucide-react';

interface MessageProps {
  id: string;
  sender: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: string;
}

interface ConversationProps {
  id: string;
  participant: {
    id: string;
    name: string;
    avatar: string;
  };
  lastMessage: string;
  lastMessageTime: string;
  unread: number;
}

// Sample data
const conversations: ConversationProps[] = [
  {
    id: '1',
    participant: {
      id: 'user1',
      name: 'Tech Innovators',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    },
    lastMessage: 'Looking forward to the meetup!',
    lastMessageTime: '2 hours ago',
    unread: 2
  },
  {
    id: '2',
    participant: {
      id: 'user2',
      name: 'Outdoor Adventures',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    },
    lastMessage: 'What gear should I bring for the hike?',
    lastMessageTime: 'Yesterday',
    unread: 0
  },
  {
    id: '3',
    participant: {
      id: 'user3',
      name: 'Wine Enthusiasts',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
    },
    lastMessage: 'The wine tasting was amazing! Thank you for organizing.',
    lastMessageTime: '3 days ago',
    unread: 0
  }
];

const messages: Record<string, MessageProps[]> = {
  '1': [
    {
      id: 'm1',
      sender: {
        id: 'user1',
        name: 'Tech Innovators',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'Hello! Are you coming to the AI meetup?',
      timestamp: '2 days ago'
    },
    {
      id: 'm2',
      sender: {
        id: 'me',
        name: 'Me',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80'
      },
      content: 'Yes, I just RSVP\'d. What time should I arrive?',
      timestamp: '1 day ago'
    },
    {
      id: 'm3',
      sender: {
        id: 'user1',
        name: 'Tech Innovators',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'Great! The doors open at 5:30 PM, but the main talks start at 6 PM. Hope to see you there!',
      timestamp: '1 day ago'
    },
    {
      id: 'm4',
      sender: {
        id: 'user1',
        name: 'Tech Innovators',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'Also, we\'ll have some light refreshments and networking after the talks.',
      timestamp: '2 hours ago'
    },
    {
      id: 'm5',
      sender: {
        id: 'user1',
        name: 'Tech Innovators',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'Looking forward to the meetup!',
      timestamp: '2 hours ago'
    }
  ],
  '2': [
    {
      id: 'm1',
      sender: {
        id: 'user2',
        name: 'Outdoor Adventures',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'Hi there! Excited for the hike this weekend?',
      timestamp: '3 days ago'
    },
    {
      id: 'm2',
      sender: {
        id: 'me',
        name: 'Me',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80'
      },
      content: 'Absolutely! Do I need to bring any special gear?',
      timestamp: '2 days ago'
    },
    {
      id: 'm3',
      sender: {
        id: 'user2',
        name: 'Outdoor Adventures',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'Just comfortable hiking shoes, water bottle, and maybe a light jacket. The trail is moderate difficulty.',
      timestamp: 'Yesterday'
    },
    {
      id: 'm4',
      sender: {
        id: 'user2',
        name: 'Outdoor Adventures',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'What gear should I bring for the hike?',
      timestamp: 'Yesterday'
    }
  ],
  '3': [
    {
      id: 'm1',
      sender: {
        id: 'user3',
        name: 'Wine Enthusiasts',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'Thank you for attending our wine tasting event!',
      timestamp: '1 week ago'
    },
    {
      id: 'm2',
      sender: {
        id: 'me',
        name: 'Me',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80'
      },
      content: 'I had a wonderful time! That Cabernet was exceptional.',
      timestamp: '6 days ago'
    },
    {
      id: 'm3',
      sender: {
        id: 'user3',
        name: 'Wine Enthusiasts',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'So glad you enjoyed it! We\'ll be hosting another tasting next month with a focus on Italian wines.',
      timestamp: '5 days ago'
    },
    {
      id: 'm4',
      sender: {
        id: 'me',
        name: 'Me',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=64&h=64&q=80'
      },
      content: 'That sounds wonderful! I\'ll definitely be there.',
      timestamp: '4 days ago'
    },
    {
      id: 'm5',
      sender: {
        id: 'user3',
        name: 'Wine Enthusiasts',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=facearea&facepad=2&w=300&h=300&q=80'
      },
      content: 'The wine tasting was amazing! Thank you for organizing.',
      timestamp: '3 days ago'
    }
  ]
};

const Messaging: React.FC = () => {
  const [selectedConversation, setSelectedConversation] = useState<string>(conversations[0].id);
  const [newMessage, setNewMessage] = useState('');
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // In a real app, this would send the message to the server
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 h-[80vh]">
              {/* Conversation List */}
              <div className="border-r hidden md:block">
                <div className="p-4 border-b">
                  <h2 className="text-lg font-bold">Messages</h2>
                </div>
                
                <div className="overflow-y-auto h-[calc(80vh-64px)]">
                  {conversations.map((conversation) => (
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
                            src={conversation.participant.avatar} 
                            alt={conversation.participant.name} 
                            size="md" 
                          />
                          {conversation.unread > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-baseline">
                            <h3 className="font-semibold truncate">{conversation.participant.name}</h3>
                            <span className="text-xs text-gray-500">{conversation.lastMessageTime}</span>
                          </div>
                          <p className="text-sm text-secondary truncate">{conversation.lastMessage}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Message Content */}
              <div className="md:col-span-2 lg:col-span-3 flex flex-col">
                {/* Conversation Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <UserAvatar 
                      src={conversations.find(c => c.id === selectedConversation)?.participant.avatar || ''} 
                      alt="Participant" 
                      size="md" 
                    />
                    <h3 className="font-semibold">{conversations.find(c => c.id === selectedConversation)?.participant.name}</h3>
                  </div>
                </div>
                
                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto flex flex-col space-y-4">
                  {messages[selectedConversation]?.map((message) => (
                    <div 
                      key={message.id}
                      className={`flex ${message.sender.id === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex max-w-[70%] ${message.sender.id === 'me' ? 'flex-row-reverse' : ''}`}>
                        {message.sender.id !== 'me' && (
                          <UserAvatar 
                            src={message.sender.avatar} 
                            alt={message.sender.name} 
                            size="sm" 
                            className="mt-1 mx-2" 
                          />
                        )}
                        <div>
                          <div 
                            className={`px-4 py-3 rounded-2xl ${
                              message.sender.id === 'me' 
                                ? 'bg-primary text-white rounded-tr-none' 
                                : 'bg-accent rounded-tl-none'
                            }`}
                          >
                            <p>{message.content}</p>
                          </div>
                          <p className={`text-xs text-gray-500 mt-1 ${message.sender.id === 'me' ? 'text-right' : ''}`}>
                            {message.timestamp}
                          </p>
                        </div>
                        {message.sender.id === 'me' && (
                          <UserAvatar 
                            src={message.sender.avatar} 
                            alt={message.sender.name} 
                            size="sm" 
                            className="mt-1 mx-2" 
                          />
                        )}
                      </div>
                    </div>
                  ))}
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
                      disabled={!newMessage.trim()}
                    >
                      <Send className="w-5 h-5" />
                    </button>
                  </form>
                </div>
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
