
export type Chat = {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  timestamp: string;
  unreadCount: number;
  phoneNumber: string;
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
  { id: '1', name: 'Alice', avatar: 'https://placehold.co/100x100.png', lastMessage: 'See you tomorrow!', timestamp: '10:42 AM', unreadCount: 2, phoneNumber: '1112223333' },
  { id: '2', name: 'Bob', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Okay, sounds good.', timestamp: '10:30 AM', unreadCount: 0, phoneNumber: '2223334444' },
  { id: '3', name: 'Design Team', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Alice: Let\'s review the mockups.', timestamp: '9:05 AM', unreadCount: 5, phoneNumber: '3334445555' },
  { id: '4', name: 'Charlie', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Can you send me the file?', timestamp: 'Yesterday', unreadCount: 0, phoneNumber: '4445556666'},
  { id: '5', name: 'David', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Happy Birthday! 🎉', timestamp: 'Yesterday', unreadCount: 0, phoneNumber: '5556667777' },
  { id: '6', name: 'Eve', avatar: 'https://placehold.co/100x100.png', lastMessage: 'Are you free this weekend?', timestamp: 'Friday', unreadCount: 1, phoneNumber: '6667778888' },
];

export const messages: Record<string, Message[]> = {
  '1': [
    { id: 'm1-1', text: 'Hey Alice! Just checking in about our meeting tomorrow. Are we still on for 1 PM?', timestamp: '10:35 AM', sender: 'me', status: 'read' },
    { id: 'm1-2', text: 'Hi! Yes, absolutely. 1 PM works perfectly for me.', timestamp: '10:36 AM', sender: 'other', status: 'read' },
    { id: 'm1-3', text: 'Great! I\'ve booked the conference room. I\'ll send over the agenda shortly.', timestamp: '10:36 AM', sender: 'me', status: 'read' },
    { id: 'm1-4', text: 'Perfect. Looking forward to it!', timestamp: '10:37 AM', sender: 'other', status: 'read' },
    { id: 'm1-5', text: 'Me too. I think we can finalize the project details then.', timestamp: '10:38 AM', sender: 'me', status: 'read' },
    { id: 'm1-6', text: 'See you tomorrow!', timestamp: '10:42 AM', sender: 'other', status: 'read' },
  ],
  '2': [
    { id: 'm2-1', text: 'Hey Bob, did you get a chance to look at the documents I sent over?', timestamp: '10:28 AM', sender: 'me', status: 'read' },
    { id: 'm2-2', text: 'Yep, just finished reviewing them. Everything looks good on my end.', timestamp: '10:29 AM', sender: 'other', status: 'read' },
    { id: 'm2-3', text: 'Okay, sounds good.', timestamp: '10:30 AM', sender: 'other', status: 'read' },
  ],
  '3': [
    { id: 'm3-1', text: 'Morning team! Quick reminder about our design sync at 10 AM.', timestamp: '8:55 AM', sender: 'other', status: 'read' },
    { id: 'm3-2', text: 'Hi Team, let\'s sync up on the new designs.', timestamp: '9:00 AM', sender: 'me', status: 'read' },
    { id: 'm3-3', text: 'Bob: I\'ll be presenting the initial wireframes.', timestamp: '9:02 AM', sender: 'other', status: 'read' },
    { id: 'm3-4', text: 'Alice: Let\'s review the mockups.', timestamp: '9:05 AM', sender: 'other', status: 'read' },
  ],
   '4': [
    { id: 'm4-1', text: 'Hey Charlie, wondering if you have that presentation file handy?', timestamp: 'Yesterday', sender: 'me', status: 'delivered' },
    { id: 'm4-2', text: 'Can you send me the file?', timestamp: 'Yesterday', sender: 'other', status: 'read' },
  ],
  '5': [
    { id: 'm5-1', text: 'Happy Birthday! 🎉', timestamp: 'Yesterday', sender: 'me', status: 'sent' },
  ],
   '6': [
    { id: 'm6-1', text: 'Hey Eve, how have you been?', timestamp: 'Friday', sender: 'me', status: 'delivered' },
     { id: 'm6-2', text: 'Are you free this weekend?', timestamp: 'Friday', sender: 'other', status: 'read' },
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
