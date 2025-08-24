import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function MiniAppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen">
      <header className="bg-primary text-primary-foreground p-2 flex items-center gap-2">
        <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full" asChild>
          <Link href="/">
            <ArrowLeft />
          </Link>
        </Button>
        <h1 className="text-lg font-semibold">Mini App</h1>
      </header>
      <main className="flex-1 overflow-y-auto bg-background">{children}</main>
    </div>
  );
}
