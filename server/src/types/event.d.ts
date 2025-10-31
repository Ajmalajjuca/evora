export interface IEvent {
  _id?: string;
  title: string;
  date: string;
  time: string;
  duration?: string;
  location: string;
  image?: string;
  attendees?: number;
  category?: string;
  rating?: number;
  description?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
