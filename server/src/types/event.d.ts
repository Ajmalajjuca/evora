export type EventStatus = 'draft' | 'published' | 'cancelled' | 'completed';

export interface IEvent {
  _id?: string;
  title: string;
  description: string;
  category: string; // e.g., "Conference", "Workshop", "Meetup"
  location: {
    address: string;
    city: string;
    state?: string;
    country: string;
    lat?: number;
    lng?: number;
  };
  startDate: Date;
  endDate: Date;
  image?: string;
  capacity?: number;
  attendees?: string[]; // user IDs
  price?: number; // 0 = free
  isOnline: boolean;
  status: EventStatus;
  createdAt?: Date;
  updatedAt?: Date;
}
