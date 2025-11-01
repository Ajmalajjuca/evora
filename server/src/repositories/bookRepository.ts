// repositories/bookRepository.ts
import { Booking } from "../models/Booking.js";
import { IBooking } from "../types/book.js";

export class BookRepository {
  /**
   * Creates a new booking in the database
   * @param data - Partial booking data
   * @returns The created booking document or null
   */
  async bookEvent(data: Partial<IBooking>): Promise<IBooking | null> {
      return await Booking.create(data);
  }

  /**
   * Retrieves all bookings
   */
  async getAllBookings(): Promise<IBooking[]> {
    return await Booking.find();
  }

  /**
   * Retrieves a single booking by ID
   */
  async getBookingsByUserId(userId: string): Promise<IBooking[]> {
  return await Booking.find({ userId }).populate("userId")
      .populate("eventId").lean();
}

  /**
   * Deletes a booking by ID
   */
  async deleteBooking(id: string): Promise<boolean> {
    const result = await Booking.findByIdAndDelete(id);
    return result !== null;
  }
}

// Export an instance for easier use
export const bookRepository = new BookRepository();
