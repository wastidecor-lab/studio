import { MoreVertical, Search, MessageSquare, Phone, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ChatList from "@/components/chat-list";
import StatusList from "@/components/status-list";
import CallHistory from "@/components/call-history";
import MiniAppsGrid from "@/components/mini-apps-grid";
import { chats, statuses, calls } from "@/lib/data";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-background text-foreground">
      <header className="bg-primary text-primary-foreground shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-3">
            <h1 className="text-xl font-bold">ChatWave</h1>
            <div className="flex items-center space-x-1">
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full">
                <Search className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-primary-foreground hover:bg-white/10 rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>
      
      <Tabs defaultValue="chats" className="w-full flex-grow flex flex-col">
        <div className="bg-primary sticky top-[60px] z-20">
          <TabsList className="grid w-full grid-cols-4 bg-primary text-primary-foreground/70 rounded-none p-0 h-auto">
            <TabsTrigger value="chats" className="py-3 text-sm font-bold rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary data-[state=active]:border-b-2 data-[state=active]:border-accent focus-visible:ring-offset-0 focus-visible:ring-0">CHATS</TabsTrigger>
            <TabsTrigger value="status" className="py-3 text-sm font-bold rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary data-[state=active]:border-b-2 data-[state=active]:border-accent focus-visible:ring-offset-0 focus-visible:ring-0">STATUS</TabsTrigger>
            <TabsTrigger value="calls" className="py-3 text-sm font-bold rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary data-[state=active]:border-b-2 data-[state=active]:border-accent focus-visible:ring-offset-0 focus-visible:ring-0">CALLS</TabsTrigger>
            <TabsTrigger value="mini-apps" className="py-3 text-sm font-bold rounded-none data-[state=active]:text-accent data-[state=active]:bg-primary data-[state=active]:border-b-2 data-[state=active]:border-accent focus-visible:ring-offset-0 focus-visible:ring-0">MINI APPS</TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-grow overflow-y-auto relative">
            <TabsContent value="chats" className="m-0">
                <ChatList chats={chats} />
                <Button aria-label="New chat" className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-accent shadow-lg hover:bg-accent/90 z-10">
                    <MessageSquare className="h-6 w-6 text-primary-foreground" />
                </Button>
            </TabsContent>
            <TabsContent value="status" className="m-0">
                <StatusList statuses={statuses} />
                 <div className="absolute bottom-6 right-6 flex flex-col items-center gap-4 z-10">
                    <Button aria-label="Add status text" className="h-10 w-10 rounded-full bg-secondary shadow-lg hover:bg-secondary/90">
                        <svg viewBox="0 0 24 24" className="h-5 w-5 text-secondary-foreground"><path fill="currentColor" d="M14.06 9.02l.94.94L5.92 19H5v-.92l9.06-9.06M17.66 3c-.25 0-.51.1-.7.29l-1.83 1.83l3.75 3.75l1.83-1.83a.996.996 0 0 0 0-1.41l-2.34-2.34c-.2-.2-.45-.29-.71-.29m-3.6 3.19L3 17.25V21h3.75L17.81 9.94l-3.75-3.75Z"></path></svg>
                    </Button>
                    <Button aria-label="Add status camera" className="h-14 w-14 rounded-full bg-accent shadow-lg hover:bg-accent/90">
                        <Camera className="h-6 w-6 text-primary-foreground" />
                    </Button>
                </div>
            </TabsContent>
            <TabsContent value="calls" className="m-0">
                <CallHistory calls={calls} />
                <Button aria-label="New call" className="absolute bottom-6 right-6 h-14 w-14 rounded-full bg-accent shadow-lg hover:bg-accent/90 z-10">
                    <Phone className="h-6 w-6 text-primary-foreground" />
                </Button>
            </TabsContent>
            <TabsContent value="mini-apps" className="m-0">
                <MiniAppsGrid />
            </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
