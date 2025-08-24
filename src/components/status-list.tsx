import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Plus } from 'lucide-react';
import type { Status } from '@/lib/data';

type StatusListProps = {
  statuses: Status[];
};

export default function StatusList({ statuses }: StatusListProps) {
  return (
    <div className="bg-card h-full">
      <div className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Avatar className="h-14 w-14">
              <AvatarImage src="https://placehold.co/100x100.png" alt="My Status" data-ai-hint="profile user" />
              <AvatarFallback>Me</AvatarFallback>
            </Avatar>
            <div className="absolute bottom-0 right-0 bg-accent rounded-full p-1 border-2 border-card">
              <Plus className="h-3 w-3 text-accent-foreground" />
            </div>
          </div>
          <div>
            <p className="font-semibold">My status</p>
            <p className="text-sm text-muted-foreground">Tap to add status update</p>
          </div>
        </div>
      </div>
      <div className="px-4 py-2 bg-background/70">
        <p className="text-sm font-semibold text-primary">Recent updates</p>
      </div>
      <div className="divide-y divide-border">
        {statuses.map((status) => (
          <div key={status.id} className="flex items-center p-3 space-x-4 hover:bg-muted/50 transition-colors cursor-pointer">
            <div className={`p-0.5 rounded-full ${status.isNew ? 'bg-gradient-to-tr from-accent to-green-400' : 'bg-transparent'}`}>
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
