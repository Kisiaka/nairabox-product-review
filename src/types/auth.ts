import { LocationSelection } from './index';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  authProvider: 'email' | 'google';
  preferredLocation?: LocationSelection;
  createdAt: string;
}

export interface BookedTicket {
  id: string;
  eventId: string;
  eventTitle: string;
  eventCategory: string;
  eventImage: string;
  date: string;
  time: string;
  venue: string;
  neighbourhood: string;
  state: string;
  tierName: string;
  quantity: number;
  totalAmount: number;
  bookingRef: string;
  bookedAt: string;
}

export type AuthMode = 'signin' | 'signup';
