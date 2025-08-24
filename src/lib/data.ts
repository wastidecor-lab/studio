
export type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
};

export type Message = {
  id: string;
  text: string;
  timestamp: string;
  sender: 'me' | 'other';
  status: 'sent' | 'delivered' | 'read';
};

export type Status = {
  id: string;
  name: string;
  avatar: string;
  timestamp: string;
  isNew: boolean;
};

export type Call = {
  id: string;
  name: string;
  avatar: string;
  type: 'incoming' | 'outgoing' | 'missed';
  callType: 'video' | 'voice';
  timestamp: string;
  phoneNumber: string;
};

export const chats: Chat[] = [
  { id: '1', name: 'Alice', avatar: 'https://placehold.co/100x100.png', lastMessage: 'See you tomorrow!', timestamp: '10:42 AM', unreadCount: 2 },
  { id: '2', name: 'Bob', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Okay, sounds good.', timestamp: '10:30 AM', unreadCount: 0 },
  { id: '3', name: 'Design Team', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Alice: Let\'s review the mockups.', timestamp: '9:05 AM', unreadCount: 5 },
  { id: '4', name: 'Charlie', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Can you send me the file?', timestamp: 'Yesterday', unreadCount: 0 },
  { id: '5', name: 'David', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Happy Birthday! 🎉', timestamp: 'Yesterday', unreadCount: 0 },
  { id: '6', name: 'Eve', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Are you free this weekend?', timestamp: 'Friday', unreadCount: 1 },
];

export const messages: Record<string, Message[]> = {
  '1': [
    { id: 'm1', text: 'Hey Alice!', timestamp: '10:40 AM', sender: 'me', status: 'read' },
    { id: 'm2', text: 'Hi! What\'s up?', timestamp: '10:41 AM', sender: 'other', status: 'read' },
    { id: 'm3', text: 'Not much, just wanted to confirm our meeting for tomorrow.', timestamp: '10:41 AM', sender: 'me', status: 'read' },
    { id: 'm4', text: 'Yep, it\'s on! See you tomorrow!', timestamp: '10:42 AM', sender: 'other', status: 'read' },
  ],
  '2': [
    { id: 'm5', text: 'Hey Bob, are we still on for lunch?', timestamp: '10:29 AM', sender: 'me', status: 'read' },
    { id: 'm6', text: 'Yes, absolutely. Okay, sounds good.', timestamp: '10:30 AM', sender: 'other', status: 'read' },
  ],
  '3': [
    { id: 'm7', text: 'Hi Team, let\'s sync up on the new designs.', timestamp: '9:00 AM', sender: 'me', status: 'read' },
    { id: 'm8', text: 'Alice: Let\'s review the mockups.', timestamp: '9:05 AM', sender: 'other', status: 'read' },
  ]
};

export const statuses: Status[] = [
  { id: 's1', name: 'Bob', avatar: 'https://placehold.co/100x100.png', timestamp: '15 minutes ago', isNew: true },
  { id: 's2', name: 'Charlie', avatar: 'https://placehold.co/100x100.png', timestamp: 'Today, 8:12 AM', isNew: true },
  { id: 's3', name: 'David', avatar: 'https://placehold.co/100x100.png', timestamp: 'Yesterday, 9:30 PM', isNew: false },
];

export const calls: Call[] = [
  { id: 'c1', name: 'Alice', avatar: 'https://placehold.co/100x100.png', type: 'missed', callType: 'voice', timestamp: 'Today, 11:05 AM', phoneNumber: '1234567890' },
  { id: 'c2', name: 'Design Team', avatar: 'https://placehold.co/100x100.png', type: 'outgoing', callType: 'video', timestamp: 'Today, 9:00 AM', phoneNumber: '1234567890' },
  { id: 'c3', name: 'Bob', avatar: 'https://placehold.co/100x100.png', type: 'incoming', callType: 'voice', timestamp: 'Yesterday, 10:30 PM', phoneNumber: '1234567890' },
];
