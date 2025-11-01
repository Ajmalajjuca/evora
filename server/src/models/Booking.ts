import mongoose from 'mongoose';
import { IBooking } from '../types/book.js';
const bookingSchema = new mongoose.Schema({
  // References
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },

  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Booking ID
  bookingId: {
    type: String,
    unique: true,
    default: function() {
      return `BK${Date.now()}`;
    }
  },

  // Ticket Details
  ticketQuantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },

  totalAmount: {
    type: Number,
    required: true,
    min: 0
  },

  // Status
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled'],
    default: 'confirmed'
  },

}, {
  timestamps: true
});

// Index for queries
bookingSchema.index({ userId: 1, eventId: 1 });

export const Booking = mongoose.model<IBooking>('Booking', bookingSchema);

