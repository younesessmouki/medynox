'use client';

import { useState } from 'react';
import Layout from '@/components/dashboard/Layout';
import { Breadcrumbs } from '@/components/dashboard/Breadcrumbs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Send, Paperclip, Check, CheckCheck, MoreVertical } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

const mockConversations = [
  {
    id: 1,
    name: 'Dr. Fatima',
    role: 'Médecin',
    lastMessage: 'Merci pour les informations',
    time: '10:30',
    unread: 2,
    avatar: '👩‍⚕️',
  },
  {
    id: 2,
    name: 'Secrétaire Sarah',
    role: 'Secrétaire',
    lastMessage: 'Le patient est arrivé',
    time: '09:15',
    unread: 0,
    avatar: '👩',
  },
];

const mockMessages = [
  {
    id: 1,
    sender: 'Dr. Fatima',
    message: 'Bonjour, pouvez-vous me donner les résultats du patient Ahmed?',
    time: '10:25',
    status: 'read',
    sent: false,
  },
  {
    id: 2,
    sender: 'Vous',
    message: 'Bien sûr, je vous les envoie maintenant.',
    time: '10:27',
    status: 'read',
    sent: true,
  },
  {
    id: 3,
    sender: 'Dr. Fatima',
    message: 'Merci pour les informations',
    time: '10:30',
    status: 'read',
    sent: false,
  },
];

export default function ChatPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  return (
    <Layout>
      <div className="space-y-6">
        <Breadcrumbs
          items={[
            { label: 'Dashboard', href: '/dashboard' },
            { label: 'Chat Interne' },
          ]}
        />

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations Sidebar */}
          <div className="lg:col-span-1">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'} h-full`}
            >
              <div className="p-4 border-b border-white/10">
                <h2 className="font-semibold">Conversations</h2>
              </div>
              <div className="p-2 space-y-2 overflow-y-auto">
                {mockConversations.map((conv) => (
                  <div
                    key={conv.id}
                    onClick={() => setSelectedChat(conv.id)}
                    className={`p-3 rounded-lg cursor-pointer transition-colors ${
                      selectedChat === conv.id
                        ? isDark
                          ? 'bg-[#24abe0]/20'
                          : 'bg-blue-50'
                        : isDark
                          ? 'hover:bg-white/5'
                          : 'hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{conv.avatar}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-semibold text-sm truncate">{conv.name}</p>
                          {conv.unread > 0 && (
                            <Badge variant="info" size="sm">
                              {conv.unread}
                            </Badge>
                          )}
                        </div>
                        <p className={`text-xs truncate ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                          {conv.lastMessage}
                        </p>
                        <p className={`text-xs mt-1 ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
                          {conv.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3 flex flex-col">
            <Card
              className={`${
                isDark ? 'bg-white/5' : 'bg-white'
              } border ${isDark ? 'border-white/10' : 'border-gray-200'} flex-1 flex flex-col`}
            >
              {/* Chat Header */}
              <div className="p-4 border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">👩‍⚕️</div>
                  <div>
                    <p className="font-semibold">Dr. Fatima</p>
                    <p className={`text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>
                      En ligne
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreVertical size={20} />
                </Button>
              </div>

              {/* Messages */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4">
                {mockMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.sent ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[70%] p-3 rounded-lg ${
                        msg.sent
                          ? isDark
                            ? 'bg-[#24abe0] text-white'
                            : 'bg-blue-600 text-white'
                          : isDark
                            ? 'bg-white/10 text-white'
                            : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      {!msg.sent && (
                        <p className="text-xs font-semibold mb-1 opacity-70">{msg.sender}</p>
                      )}
                      <p className="text-sm">{msg.message}</p>
                      <div className="flex items-center justify-end gap-1 mt-1">
                        <span className="text-xs opacity-70">{msg.time}</span>
                        {msg.sent && (
                          <span>
                            {msg.status === 'read' ? (
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
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm">
                    <Paperclip size={16} />
                  </Button>
                  <Input
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tapez votre message..."
                    className={`flex-1 ${isDark ? 'bg-white/5' : 'bg-gray-50'}`}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter' && message.trim()) {
                        // Send message
                        setMessage('');
                      }
                    }}
                  />
                  <Button
                    onClick={() => {
                      if (message.trim()) {
                        // Send message
                        setMessage('');
                      }
                    }}
                    className="gap-2"
                  >
                    <Send size={16} />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}

