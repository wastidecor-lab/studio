import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import type { Chat } from '@/lib/data';

type ChatListProps = {
  chats: Chat[];
};

export default function ChatList({ chats }: ChatListProps) {
  return (
    <div className="divide-y divide-border bg-card">
      {chats.map((chat) => (
        <Link key={chat.id} href={`/chat/${chat.id}`} className="block hover:bg-muted/50 transition-colors">
          <div className="flex items-center p-3 space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={chat.avatar} alt={chat.name} data-ai-hint="profile picture" />
              <AvatarFallback>{chat.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <p className="font-semibold truncate">{chat.name}</p>
                <p className="text-xs text-muted-foreground">{chat.timestamp}</p>
              </div>
              <div className="flex justify-between items-start mt-1">
                <p className="text-sm text-muted-foreground truncate">{chat.lastMessage}</p>
                {chat.unreadCount > 0 && (
                  <Badge className="bg-accent text-accent-foreground h-5 min-w-[1.25rem] text-xs flex items-center justify-center">
                    {chat.unreadCount}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
