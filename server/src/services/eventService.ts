import { EventRepository } from "../repositories/eventRepository.js";
import { AppError } from "../utils/AppError.js";
import { IEvent } from "../types/event.js";
import { BookRepository } from "../repositories/bookRepository.js";
import { IBooking } from "../types/book.js";

const eventRepository = new EventRepository();

export class EventService {
  // Get all events
  async getAllEvents() {
    const events = await eventRepository.findAll();
    if (!events.length) throw new AppError("No events found", 404);
    return events;
  }

  // Get event by ID
  async getEventById(id: string) {
    const event = await eventRepository.findById(id);
    if (!event) throw new AppError("Event not found", 404);
    return event;
  }

  // Get events by category
  async getEventsByCategory(category: string) {
    const events = await eventRepository.findByCategory(category);
    if (!events.length) throw new AppError(`No events found in category: ${category}`, 404);
    return events;
  }

  // Create new event
  async createEvent(data: Partial<IEvent>): Promise<IEvent> {
    if (!data.title || !data.date || !data.time || !data.location) {
      throw new AppError("Missing required fields: title, date, time, or location", 400);
    }

    const event = await eventRepository.create(data);
    return event;
  }

  // Update event
  async updateEvent(id: string, data: Partial<IEvent>) {
    const updatedEvent = await eventRepository.update(id, data);
    if (!updatedEvent) throw new AppError("Event not found", 404);
    return updatedEvent;
  }

  // Delete event
  async deleteEvent(id: string) {
    const deletedEvent = await eventRepository.delete(id);
    if (!deletedEvent) throw new AppError("Event not found", 404);
    return deletedEvent;
  }


}
