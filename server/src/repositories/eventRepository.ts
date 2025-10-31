import { Event } from "../models/Event.js";
import { IEvent } from "../types/event.js";

export class EventRepository {
  async findById(id: string): Promise<IEvent | null> {
    return await Event.findById(id);
  }

  async findAll(): Promise<IEvent[]> {
    return await Event.find();
  }

  async findByCategory(category: string): Promise<IEvent[]> {
    return await Event.find({ category });
  }

  async create(eventData: Partial<IEvent>): Promise<IEvent> {
    return await Event.create(eventData);
  }

  async update(id: string, data: Partial<IEvent>): Promise<IEvent | null> {
    return await Event.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
  }

  async delete(id: string): Promise<IEvent | null> {
    return await Event.findByIdAndDelete(id);
  }
}
