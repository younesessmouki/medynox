'use client';

import { useState, useRef, useEffect } from 'react';
import { MessageSquare, X, Send, Minimize2, Maximize2, Search, MoreVertical, Check, CheckCheck } from 'lucide-react';

interface Message {
  id: string;
  sender: string;
  message: string;
  time: string;
  status: 'sent' | 'delivered' | 'read';
  sent: boolean;
}

interface Conversation {
  id: string;
  name: string;
  role: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online?: boolean;
}

const mockConversations: Conversation[] = [
  {
    id: '1',
    name: 'Dr. Fatima Alaoui',
    role: 'Médecin',
    lastMessage: 'Merci pour les informations',
    time: '10:30',
    unread: 2,
    avatar: '👩‍⚕️',
    online: true,
  },
  {
    id: '2',
    name: 'Secrétaire Sarah',
    role: 'Secrétaire',
    lastMessage: 'Le patient est arrivé',
    time: '09:15',
    unread: 0,
    avatar: '👩',
    online: true,
  },
  {
    id: '3',
    name: 'Dr. Ahmed Benali',
    role: 'Médecin',
    lastMessage: 'Réunion à 14h',
    time: 'Hier',
    unread: 1,
    avatar: '👨‍⚕️',
    online: false,
  },
];

const mockMessages: Record<string, Message[]> = {
  '1': [
    {
      id: '1',
      sender: 'Dr. Fatima Alaoui',
      message: 'Bonjour, pouvez-vous me donner les résultats du patient Ahmed?',
      time: '10:25',
      status: 'read',
      sent: false,
    },
    {
      id: '2',
      sender: 'Vous',
      message: 'Bien sûr, je vous les envoie maintenant.',
      time: '10:27',
      status: 'read',
      sent: true,
    },
    {
      id: '3',
      sender: 'Dr. Fatima Alaoui',
      message: 'Merci pour les informations',
      time: '10:30',
      status: 'read',
      sent: false,
    },
  ],
  '2': [
    {
      id: '1',
      sender: 'Secrétaire Sarah',
      message: 'Le patient est arrivé',
      time: '09:15',
      status: 'read',
      sent: false,
    },
  ],
  '3': [
    {
      id: '1',
      sender: 'Dr. Ahmed Benali',
      message: 'Réunion à 14h',
      time: 'Hier',
      status: 'read',
      sent: false,
    },
  ],
};

export function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const totalUnread = mockConversations.reduce((sum, conv) => sum + conv.unread, 0);

  const filteredConversations = mockConversations.filter((conv) =>
    conv.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const currentMessages = selectedChat ? mockMessages[selectedChat] || [] : [];
  const currentConversation = selectedChat
    ? mockConversations.find((c) => c.id === selectedChat)
    : null;

  useEffect(() => {
    if (isOpen && !isMinimized && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentMessages, isOpen, isMinimized]);

  useEffect(() => {
    if (isOpen && !isMinimized && inputRef.current) {
      inputRef.current.focus();
    }
  }, [selectedChat, isOpen, isMinimized]);

  const handleSendMessage = () => {
    if (message.trim() && selectedChat) {
      // In a real app, this would send the message to the backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-[#24abe0] to-[#1a8bc7] shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 flex items-center justify-center text-white group"
        >
          <MessageSquare size={24} className="group-hover:scale-110 transition-transform" />
          {totalUnread > 0 && (
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-red-500 text-white text-xs font-bold flex items-center justify-center border-2 border-black">
              {totalUnread > 9 ? '9+' : totalUnread}
            </span>
          )}
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className={`fixed bottom-6 right-6 z-50 bg-black border border-white/10 rounded-2xl shadow-2xl transition-all duration-300 ${
            isMinimized
              ? 'w-80 h-16'
              : selectedChat
              ? 'w-96 h-[600px]'
              : 'w-96 h-[600px]'
          } flex flex-col overflow-hidden`}
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-[#24abe0]/20 to-[#24abe0]/10 border-b border-white/10 p-4 flex items-center justify-between">
            {isMinimized ? (
              <>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#24abe0] flex items-center justify-center text-white font-semibold">
                    {currentConversation?.avatar || '💬'}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-white">
                      {currentConversation?.name || 'Chat Interne'}
                    </div>
                    <div className="text-xs text-white/60">
                      {currentConversation?.unread || 0} message{currentConversation?.unread !== 1 ? 's' : ''} non lu{currentConversation?.unread !== 1 ? 's' : ''}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMinimized(false)}
                  className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                >
                  <Maximize2 size={18} />
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3">
                  <MessageSquare className="text-[#24abe0]" size={20} />
                  <h3 className="font-semibold text-white">Chat Interne</h3>
                  {totalUnread > 0 && (
                    <span className="px-2 py-0.5 rounded-full bg-red-500 text-white text-xs font-bold">
                      {totalUnread}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsMinimized(true)}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Réduire"
                  >
                    <Minimize2 size={18} />
                  </button>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      setSelectedChat(null);
                      setIsMinimized(false);
                    }}
                    className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                    title="Fermer"
                  >
                    <X size={18} />
                  </button>
                </div>
              </>
            )}
          </div>

          {!isMinimized && (
            <>
              {!selectedChat ? (
                /* Conversations List */
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Search */}
                  <div className="p-3 border-b border-white/10">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" size={18} />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher une conversation..."
                        className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 text-sm"
                      />
                    </div>
                  </div>

                  {/* Conversations */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar">
                    {filteredConversations.map((conversation) => (
                      <button
                        key={conversation.id}
                        onClick={() => setSelectedChat(conversation.id)}
                        className="w-full p-3 hover:bg-white/5 transition-colors border-b border-white/5 flex items-center gap-3 group"
                      >
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#24abe0]/30 to-[#24abe0]/10 flex items-center justify-center text-2xl">
                            {conversation.avatar}
                          </div>
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
                          )}
                        </div>
                        <div className="flex-1 text-left">
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-semibold text-white text-sm">{conversation.name}</h4>
                            <span className="text-xs text-white/40">{conversation.time}</span>
                          </div>
                          <div className="flex items-center justify-between">
                            <p className="text-xs text-white/60 truncate max-w-[200px]">
                              {conversation.lastMessage}
                            </p>
                            {conversation.unread > 0 && (
                              <span className="px-2 py-0.5 rounded-full bg-[#24abe0] text-white text-xs font-bold min-w-[20px] text-center">
                                {conversation.unread}
                              </span>
                            )}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* Chat Messages */
                <div className="flex-1 flex flex-col overflow-hidden">
                  {/* Chat Header */}
                  <div className="p-3 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setSelectedChat(null)}
                        className="p-1 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors"
                      >
                        <X size={18} />
                      </button>
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#24abe0]/30 to-[#24abe0]/10 flex items-center justify-center text-xl">
                          {currentConversation?.avatar}
                        </div>
                        {currentConversation?.online && (
                          <div className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-green-500 border-2 border-black" />
                        )}
                      </div>
                      <div>
                        <h4 className="font-semibold text-white text-sm">{currentConversation?.name}</h4>
                        <p className="text-xs text-white/60">{currentConversation?.role}</p>
                      </div>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-white/10 text-white/60 hover:text-white transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>

                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto custom-scrollbar p-4 space-y-3 bg-gradient-to-b from-black to-[#0a0a0a]">
                    {currentMessages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                            msg.sent
                              ? 'bg-[#24abe0] text-white rounded-br-sm'
                              : 'bg-white/10 text-white rounded-bl-sm'
                          }`}
                        >
                          {!msg.sent && (
                            <p className="text-xs font-semibold mb-1 opacity-80">{msg.sender}</p>
                          )}
                          <p className="text-sm">{msg.message}</p>
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <span className="text-xs opacity-60">{msg.time}</span>
                            {msg.sent && (
                              <span className="text-xs">
                                {msg.status === 'read' ? (
                                  <CheckCheck size={12} className="text-blue-300" />
                                ) : msg.status === 'delivered' ? (
                                  <CheckCheck size={12} />
                                ) : (
                                  <Check size={12} />
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input */}
                  <div className="p-3 border-t border-white/10 bg-white/5">
                    <div className="flex items-center gap-2">
                      <input
                        ref={inputRef}
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Tapez un message..."
                        className="flex-1 px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-[#24abe0]/50 text-sm"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                        className="p-2 rounded-lg bg-[#24abe0] hover:bg-[#24abe0]/80 text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

