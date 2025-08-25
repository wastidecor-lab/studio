
'use client';
import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Palette, Send, Type } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { addStatus } from '@/lib/status-actions';

const bgColors = [
  'bg-slate-700', 'bg-red-500', 'bg-blue-500', 'bg-green-600', 'bg-purple-600', 'bg-pink-500', 'bg-orange-500'
];

export default function CreateStatusPage() {
  const router = useRouter();
  const { toast } = useToast();
  const [text, setText] = useState('');
  const [bgColor, setBgColor] = useState(bgColors[0]);

  const cycleBgColor = () => {
    const currentIndex = bgColors.indexOf(bgColor);
    const nextIndex = (currentIndex + 1) % bgColors.length;
    setBgColor(bgColors[nextIndex]);
  };

  const handlePostStatus = () => {
    if (!text.trim()) {
        toast({
            variant: 'destructive',
            title: 'Status cannot be empty',
            description: 'Please write something for your status.',
        });
        return;
    }
    
    addStatus({
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        text,
        bgColor,
    });
    
    toast({
      title: 'Status Posted!',
      description: 'Your status has been shared.',
    });
    router.push('/');
  };

  return (
    <div className={cn("flex flex-col h-screen text-white", bgColor)}>
      <header className="p-2 flex justify-between items-center z-10 text-white bg-black/10">
        <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20" onClick={() => router.back()}>
          <ArrowLeft />
        </Button>
        <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20" onClick={cycleBgColor}>
                <Palette />
            </Button>
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-white/20">
                <Type />
            </Button>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <Textarea
          placeholder="Type a status"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="bg-transparent border-none text-white text-3xl text-center placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 h-auto resize-none"
          style={{
            minHeight: '4rem',
            maxHeight: '80vh',
            overflowY: 'auto',
          }}
        />
      </main>

      <footer className="p-4 z-10 flex justify-end items-center bg-black/10">
          <Button size="icon" className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 shadow-lg" onClick={handlePostStatus}>
            <Send />
          </Button>
      </footer>
    </div>
  );
}
