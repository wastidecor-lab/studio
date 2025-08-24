
'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Phone, Video, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import type { Call } from '@/lib/data';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type CallHistoryProps = {
  calls: Call[];
};

export default function CallHistory({ calls }: CallHistoryProps) {
  const router = useRouter();

  const getCallIcon = (type: Call['type']) => {
    const className = cn(
      'h-4 w-4',
      type === 'missed' ? 'text-destructive' : 'text-accent'
    );
    if (type === 'outgoing') {
      return <ArrowUpRight className={className} />;
    }
    return <ArrowDownLeft className={className} />;
  };

  const handleCall = (phoneNumber: string) => {
    router.push(`tel:${phoneNumber}`);
  }

  return (
    <div className="bg-card h-full">
      <div className="divide-y divide-border">
        {calls.map((call) => (
          <div key={call.id} className="flex items-center p-3 space-x-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <Avatar className="h-12 w-12">
              <AvatarImage src={call.avatar} alt={call.name} data-ai-hint="profile picture" />
              <AvatarFallback>{call.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1" onClick={() => handleCall(call.phoneNumber)}>
              <p className={cn('font-semibold', call.type === 'missed' && 'text-destructive')}>{call.name}</p>
              <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                {getCallIcon(call.type)}
                <span>{call.timestamp}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="text-primary hover:bg-primary/10 rounded-full" onClick={() => handleCall(call.phoneNumber)}>
                {call.callType === 'video' ? <Video className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
