
'use client';
import { Status } from './data';

// This is a simple in-memory store for statuses.
// In a real app, this would be replaced with a database like Firestore.
let statuses: Status[] = [];
let listeners: ((statuses: Status[]) => void)[] = [];

export function getStatuses() {
    return statuses;
}

export function addStatus(newStatusData: Omit<Status, 'id' | 'avatar' | 'name' | 'isNew'>) {
    const newStatus: Status = {
        id: `s${Date.now()}`,
        name: 'My Status',
        avatar: 'https://placehold.co/100x100.png', 
        isNew: true,
        ...newStatusData,
    };
    statuses = [newStatus, ...statuses];
    notifyListeners();
}

export function subscribe(listener: (statuses: Status[]) => void) {
    listeners.push(listener);
    // Provide an unsubscribe function
    return function unsubscribe() {
        listeners = listeners.filter(l => l !== listener);
    };
}

function notifyListeners() {
    for (const listener of listeners) {
        listener(statuses);
    }
}
