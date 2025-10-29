import mongoose, { Document, Schema } from 'mongoose';
import { IEvent } from '../types/event';

export interface IEventDocument extends IEvent, Document {}

const eventSchema = new Schema<IEventDocument>(
  {
    title: {
      type: String,
      required: [true, 'Event title is required'],
      trim: true,
      maxlength: [100, 'Event title cannot exceed 100 characters']
    },
    description: {
      type: String,
      required: [true, 'Event description is required'],
      maxlength: [2000, 'Description too long']
    },
    category: {
      type: String,
      required: true,
      trim: true
    },
    location: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      state: String,
      country: { type: String, required: true },
      lat: Number,
      lng: Number
    },
    startDate: {
      type: Date,
      required: [true, 'Start date is required']
    },
    endDate: {
      type: Date,
      required: [true, 'End date is required']
    },
    image: {
      type: String
    },
    capacity: {
      type: Number,
      default: 0
    },
    attendees: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    ],
    price: {
      type: Number,
      default: 0
    },
    isOnline: {
      type: Boolean,
      default: false
    },
    status: {
      type: String,
      enum: ['draft', 'published', 'cancelled', 'completed'],
      default: 'draft'
    }
  },
  {
    timestamps: true
  }
);

// Index for faster search/filter
eventSchema.index({ title: 'text', category: 1, startDate: -1 });

// Virtual property for attendee count
eventSchema.virtual('attendeeCount').get(function (this: IEventDocument) {
  return this.attendees?.length || 0;
});

const Event = mongoose.model<IEventDocument>('Event', eventSchema);
export default Event;
