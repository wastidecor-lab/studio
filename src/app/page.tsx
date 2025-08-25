
'use client';
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MoreVertical, Search, Camera, MessageSquare, Phone, Newspaper, Cog, PhoneCall, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatList from "@/components/chat-list";
import StatusList from "@/components/status-list";
import CallHistory from "@/components/call-history";
import MiniAppsGrid from "@/components/mini-apps-grid";
import { chats, statuses as initialStatuses, calls, type Status } from "@/lib/data";
import { subscribe as subscribeToStatuses, getStatuses } from '@/lib/status-actions';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"


export default function Home() {
  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("tools");
  
  const allInitialStatuses = [...initialStatuses, ...getStatuses()];
  const [statuses, setStatuses] = useState<Status[]>(allInitialStatuses);
  
  useEffect(() => {
    const unsubscribe = subscribeToStatuses((newStatuses) => {
        // Combine initial dummy statuses with new statuses
        setStatuses([...initialStatuses, ...newStatuses]);
    });
    // Clean up subscription on component unmount
    return () => unsubscribe();
  }, []);


  const renderFab = () => {
    switch (currentTab) {
      case 'chats':
        return (
          <Button size="icon" className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 shadow-lg" onClick={() => console.log('New Chat')}>
            <MessageSquare />
          </Button>
        );
      case 'updates':
         return (
          <div className="flex flex-col items-center gap-2">
            <Button size="icon" variant="outline" className="rounded-full h-10 w-10 bg-card hover:bg-muted/80 shadow-sm border" asChild>
                <Link href="/camera">
                  <Camera />
                </Link>
            </Button>
            <Button size="icon" className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 shadow-lg" asChild>
                <Link href="/status/create">
                  <Plus />
                </Link>
            </Button>
          </div>
        );
      case 'calls':
        return (
          <Button size="icon" className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 shadow-lg" onClick={() => console.log('New Call')}>
            <PhoneCall />
          </Button>
        );
      case 'tools':
        return (
          <Button size="icon" className="rounded-full h-14 w-14 bg-accent hover:bg-accent/90 shadow-lg" onClick={() => console.log('Add new tool')}>
            <Plus />
          </Button>
        );
      default:
        return null;
    }
  }


  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3 h-[56px]">
            <h1 className="text-xl font-bold">ZikarX</h1>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full" asChild>
                <Link href="/camera">
                  <Camera className="h-5 w-5" />
                </Link>
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full">
                <Search className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full">
                    <MoreVertical className="h-5 w-5" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>New Group</DropdownMenuItem>
                  <DropdownMenuItem>Linked Devices</DropdownMenuItem>
                  <DropdownMenuItem>Starred Messages</DropdownMenuItem>
                  <DropdownMenuItem>Settings</DropdownMenuItem>
                  <DropdownMenuItem>Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      
      <Tabs defaultValue="tools" className="w-full flex-grow flex flex-col" onValueChange={setCurrentTab}>
        <main className="flex-grow overflow-y-auto pb-14">
            <TabsContent value="chats" className="m-0 flex-grow overflow-y-auto">
                <ChatList chats={chats} />
            </TabsContent>
            <TabsContent value="updates" className="m-0 flex-grow overflow-y-auto">
                <StatusList statuses={statuses} />
            </TabsContent>
            <TabsContent value="calls" className="m-0 flex-grow overflow-y-auto">
              <CallHistory calls={calls} />
            </TabsContent>
            <TabsContent value="tools" className="m-0 flex-grow overflow-y-auto">
                <MiniAppsGrid />
            </TabsContent>
        </main>
        
        <div className="fixed bottom-16 right-4 z-30">
            {renderFab()}
        </div>

        <div className="fixed bottom-0 left-0 right-0 z-20">
            <TabsList className="grid w-full grid-cols-4 bg-primary text-primary-foreground/70 rounded-none h-auto p-0">
                <TabsTrigger value="chats" className="flex-col gap-1 py-2 text-xs font-medium rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary focus-visible:ring-offset-0 focus-visible:ring-0">
                    <MessageSquare />
                    <span>Chats</span>
                </TabsTrigger>
                <TabsTrigger value="updates" className="flex-col gap-1 py-2 text-xs font-medium rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary focus-visible:ring-offset-0 focus-visible:ring-0">
                    <Newspaper />
                    <span>Updates</span>
                </TabsTrigger>
                <TabsTrigger value="calls" className="flex-col gap-1 py-2 text-xs font-medium rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary focus-visible:ring-offset-0 focus-visible:ring-0">
                    <Phone />
                    <span>Calls</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="flex-col gap-1 py-2 text-xs font-medium rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary focus-visible:ring-offset-0 focus-visible:ring-0">
                    <Cog />
                    <span>Tools</span>
                </TabsTrigger>
            </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
