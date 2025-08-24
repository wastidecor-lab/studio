'use client';
import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { ArrowLeft, MoreVertical, Phone, Video, Mic, Paperclip, Smile, Send } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { chats, messages as allMessages, type Chat, type Message } from '@/lib/data';
import MessageBubble from '@/components/message-bubble';
import SmartReply from '@/components/smart-reply';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

export default function ChatScreen() {
  const router = useRouter();
  const params = useParams();
  const { toast } = useToast();
  const chatId = params.id as string;

  const [chat, setChat] = useState<Chat | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  
  const scrollViewportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentChat = chats.find((c) => c.id === chatId) || null;
    setChat(currentChat);
    if (currentChat) {
      setMessages(allMessages[chatId] || []);
    }
  }, [chatId]);
  
  const scrollToBottom = () => {
    if (scrollViewportRef.current) {
        scrollViewportRef.current.scrollTop = scrollViewportRef.current.scrollHeight;
    }
  }

  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  useEffect(() => {
    const timeout = setTimeout(scrollToBottom, 100);
    return () => clearTimeout(timeout);
  }, []);

  const handleSendMessage = () => {
    if (newMessage.trim() === '') return;
    const msg: Message = {
      id: Date.now().toString(),
      text: newMessage,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
      status: 'sent',
    };
    setMessages([...messages, msg]);
    setNewMessage('');
  };

  const handleSmartReply = (reply: string) => {
    setNewMessage(reply);
  }

  const showComingSoon = () => {
    toast({
      title: 'Feature Coming Soon!',
      description: 'This feature will be available in a future update.',
    });
  }

  if (!chat) {
    return (
      <div className="flex flex-col h-screen bg-background items-center justify-center">
        <p>Loading chat...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col h-screen bg-background">
      <header className="bg-primary text-primary-foreground shadow-md flex items-center p-2 space-x-2 sticky top-0 z-10">
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <Avatar>
          <AvatarImage src={chat.avatar} alt={chat.name} data-ai-hint="profile picture"/>
          <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <p className="font-semibold">{chat.name}</p>
          <p className="text-xs text-primary-foreground/80">online</p>
        </div>
        <div className="flex items-center">
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full" onClick={showComingSoon}>
            <Video className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full" onClick={() => router.push(`tel:${chat.phoneNumber}`)}>
            <Phone className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full">
            <MoreVertical className="h-5 w-5" />
          </Button>
        </div>
      </header>

      <div className={cn("flex-1 overflow-hidden bg-background", "bg-[url('https://i.redd.it/qwd83gr4b2561.png')] bg-center bg-cover")}>
        <ScrollArea className="h-full">
            <div className="p-4 space-y-4" data-radix-scroll-area-viewport="" ref={scrollViewportRef}>
                {messages.map((msg) => (
                    <MessageBubble key={msg.id} message={msg} />
                ))}
            </div>
        </ScrollArea>
      </div>

      <footer className="p-2 space-y-2 bg-transparent sticky bottom-0">
        <SmartReply messageHistory={messages.map(m => `${m.sender === 'me' ? 'user' : 'other'}: ${m.text}`)} onSelectReply={handleSmartReply} />
        <div className="flex items-center space-x-2">
          <div className="flex-1 flex items-center bg-card rounded-full p-1 shadow-sm border">
            <Button variant="ghost" size="icon" className="rounded-full">
                <Smile className="text-muted-foreground" />
            </Button>
            <Input
              placeholder="Type a message..."
              className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 h-9"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <Button variant="ghost" size="icon" className="rounded-full">
                <Paperclip className="text-muted-foreground -rotate-45" />
            </Button>
          </div>
          <Button size="icon" className="rounded-full h-12 w-12 bg-accent hover:bg-accent/90 shadow-sm" onClick={handleSendMessage}>
            {newMessage ? <Send /> : <Mic />}
          </Button>
        </div>
      </footer>
    </div>
  );
}
