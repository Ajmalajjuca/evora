export interface IBooking {
  _id: string;
  userId: string;
  eventId: string;
  ticketQuantity: number;
  totalAmount: number;
  createdAt: Date;
  updatedAt: Date;
}
