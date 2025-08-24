import { Check, CheckCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { Message } from '@/lib/data';

type MessageBubbleProps = {
  message: Message;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isSentByMe = message.sender === 'me';

  const MessageStatus = () => {
    if (!isSentByMe) return null;
    if (message.status === 'read') {
      return <CheckCheck className="h-4 w-4 text-blue-500" />;
    }
    if (message.status === 'delivered') {
      return <CheckCheck className="h-4 w-4 text-muted-foreground" />;
    }
    return <Check className="h-4 w-4 text-muted-foreground" />;
  };

  return (
    <div className={cn('flex w-full', isSentByMe ? 'justify-end' : 'justify-start')}>
      <div
        className={cn(
          'p-2 px-3 rounded-lg max-w-sm md:max-w-md shadow-sm relative',
          isSentByMe ? 'chat-bubble-sent rounded-br-none' : 'chat-bubble-received rounded-bl-none'
        )}
      >
        <p className="text-sm pb-4">{message.text}</p>
        <div className="flex items-center justify-end space-x-1 absolute bottom-1 right-2">
          <p className="text-xs text-muted-foreground/80">{message.timestamp}</p>
          <MessageStatus />
        </div>
      </div>
    </div>
  );
}
