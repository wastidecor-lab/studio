
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import type { Status } from '@/lib/data';
import { cn } from '@/lib/utils';

type StatusListProps = {
  statuses: Status[];
};

export default function StatusList({ statuses }: StatusListProps) {
  const myStatuses = statuses.filter(s => s.name === "My Status");
  const recentUpdates = statuses.filter(s => s.name !== "My Status");

  return (
    <div className="bg-card h-full">
      <div className="p-4">
        <Link href="/status/create" className="flex items-center space-x-4 cursor-pointer">
          <div className="relative">
            <Avatar className="h-14 w-14">
              <AvatarImage 
                src={myStatuses.length > 0 ? myStatuses[0].avatar : "https://placehold.co/100x100.png"} 
                alt="My Status" 
                data-ai-hint="profile user" 
              />
              <AvatarFallback>Me</AvatarFallback>
            </Avatar>
            {myStatuses.length === 0 && (
              <div className="absolute bottom-0 right-0 bg-accent rounded-full p-1 border-2 border-card">
                <Plus className="h-3 w-3 text-accent-foreground" />
              </div>
            )}
          </div>
          <div>
            <p className="font-semibold">My status</p>
            <p className="text-sm text-muted-foreground">
              {myStatuses.length > 0 ? `${myStatuses.length} updates` : 'Tap to add status update'}
            </p>
          </div>
        </Link>
      </div>
      <div className="px-4 py-2 bg-background/70">
        <p className="text-sm font-semibold text-primary">Recent updates</p>
      </div>
      <div className="divide-y divide-border">
        {recentUpdates.map((status) => (
          <div key={status.id} className="flex items-center p-3 space-x-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className={cn("p-0.5 rounded-full", status.isNew ? 'bg-gradient-to-tr from-accent to-green-400' : 'bg-transparent')}>
              <Avatar className="h-12 w-12 border-2 border-card">
                <AvatarImage src={status.avatar} alt={status.name} data-ai-hint="profile picture" />
                <AvatarFallback>{status.name.charAt(0)}</AvatarFallback>
              </Avatar>
            </div>
            <div className="flex-1">
              <p className="font-semibold">{status.name}</p>
              <p className="text-sm text-muted-foreground">{status.timestamp}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
