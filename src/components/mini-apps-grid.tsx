import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { HandHelping, ShieldCheck, Wallet, Utensils, HeartHandshake, Users, Baby, Gem, MoreHorizontal } from 'lucide-react';

const miniApps = [
  { name: 'Darood Community', href: '/mini-apps/darood', icon: HandHelping, 'data-ai-hint': 'community prayer' },
  { name: 'Daily Zikr Challenge', href: '/mini-apps/zikr', icon: ShieldCheck, 'data-ai-hint': 'daily challenge' },
  { name: 'Jaib Nama', href: '/mini-apps/expense-tracker', icon: Wallet, 'data-ai-hint': 'expense tracker' },
  { name: 'Aj Kia Pakaen', href: '/mini-apps/recipe-finder', icon: Utensils, 'data-ai-hint': 'cooking recipe' },
  { name: 'Free Rishta Center', href: '/mini-apps/rishta', icon: HeartHandshake, 'data-ai-hint': 'matchmaking service' },
  { name: 'Family Group', href: '/mini-apps/family-group', icon: Users, 'data-ai-hint': 'family tree' },
  { name: 'Baby Name', href: '/mini-apps/baby-name', icon: Baby, 'data-ai-hint': 'baby name generator' },
  { name: 'Health & Beauty', href: '/mini-apps/health-tips', icon: Gem, 'data-ai-hint': 'health beauty' },
  { name: 'More Apps', href: '/mini-apps/more', icon: MoreHorizontal, 'data-ai-hint': 'more apps' },
];

export default function MiniAppsGrid() {
  return (
    <div className="p-4 grid grid-cols-3 gap-4">
      {miniApps.map((app) => (
        <Link href={app.href} key={app.name} className="group">
          <Card className="aspect-square flex flex-col items-center justify-center p-2 text-center transition-all hover:bg-muted/50 hover:shadow-md">
            <CardContent className="p-0 flex flex-col items-center justify-center gap-2">
              <div className="bg-primary/10 p-3 rounded-full group-hover:bg-accent/20 transition-colors">
                <app.icon className="h-6 w-6 text-primary group-hover:text-accent transition-colors" />
              </div>
              <p className="text-xs font-semibold text-foreground">{app.name}</p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
