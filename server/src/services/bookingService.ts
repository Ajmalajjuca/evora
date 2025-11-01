import { BookRepository } from "../repositories/bookRepository.js";
import { IBooking } from "../types/book.js";
import { AppError } from "../utils/AppError.js";


const bookRepository = new BookRepository()

export class BookingService {
  // Implement booking logic here
  async bookEvent(data: Partial<IBooking>) {
    console.log('event data:',data);

    if(!data.eventId || !data.userId || !data.ticketQuantity ) {
      throw new AppError("Missing required fields: title, date, time, or location", 400);
    }
    const bookedEvent = await bookRepository.bookEvent(data);
    return bookedEvent;
  }

  async getAllBookings() {
    const bookings = await bookRepository.getAllBookings();
    return bookings;
  }

  async getBookingById(id: string) {
    const booking = await bookRepository.getBookingsByUserId(id);
    return booking;
  }
}
