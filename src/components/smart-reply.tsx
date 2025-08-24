'use client';
import { useState, useEffect } from 'react';
import { smartReplySuggestions } from '@/ai/flows/smart-reply';
import { Button } from '@/components/ui/button';
import { Sparkles } from 'lucide-react';

type SmartReplyProps = {
  messageHistory: string[];
  onSelectReply: (reply: string) => void;
};

export default function SmartReply({ messageHistory, onSelectReply }: SmartReplyProps) {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (messageHistory.length === 0) {
        setSuggestions([]);
        return;
      }
      
      setLoading(true);
      try {
        const result = await smartReplySuggestions({ messageHistory });
        setSuggestions(result.suggestions || []);
      } catch (error) {
        console.error('Error fetching smart replies:', error);
        setSuggestions([]);
      } finally {
        setLoading(false);
      }
    };

    if (messageHistory.length > 0) {
       const lastMessage = messageHistory[messageHistory.length - 1];
       if (lastMessage && lastMessage.startsWith('other:')) {
         const timer = setTimeout(fetchSuggestions, 500);
         return () => clearTimeout(timer);
       }
    }
    
    setSuggestions([]);

  }, [messageHistory]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground h-9">
        <Sparkles className="h-4 w-4 animate-pulse" />
        <span>Generating replies...</span>
      </div>
    );
  }

  if (suggestions.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
      {suggestions.map((suggestion, index) => (
        <Button
          key={index}
          variant="outline"
          size="sm"
          className="rounded-full bg-card/80 backdrop-blur-sm whitespace-nowrap"
          onClick={() => onSelectReply(suggestion)}
        >
          {suggestion}
        </Button>
      ))}
    </div>
  );
}
