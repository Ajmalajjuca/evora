export interface IEvent {
  _id: string | Types.ObjectId;
  title: string;
  date: string;
  time: string;
  hours?: string | null;
  minutes?: string | null;
  location: string;
  image?: string | null;
  attendees?: number;
  description?: string | null;
  price?: string | null;
  createdAt?: Date;
  updatedAt?: Date;
}
