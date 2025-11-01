import { Request, Response, NextFunction } from "express";
import { catchAsync } from "../utils/catchAsync.js";
import { EventService } from "../services/eventService.js";
import { ApiResponse } from "../utils/apiResponse.js";

const eventService = new EventService();

/**
 * @desc Get all events
 * @route GET /api/events
 * @access Public or Protected (based on your setup)
 */
export const getEvents = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const events = await eventService.getAllEvents();
  return ApiResponse.success(res, events, "Events fetched successfully");
});

/**
 * @desc Get single event by ID
 * @route GET /api/events/:id
 * @access Public
 */
export const getEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const event = await eventService.getEventById(req.params.id);
  if (!event) return ApiResponse.error(res, "Event not found", 404);
  return ApiResponse.success(res, event, "Event fetched successfully");
});

/**
 * @desc Get events by category
 * @route GET /api/events/category/:category
 * @access Public
 */
export const getEventsByCategory = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const events = await eventService.getEventsByCategory(req.params.category);
  return ApiResponse.success(res, events, `Events in category '${req.params.category}' fetched successfully`);
});

/**
 * @desc Create a new event
 * @route POST /api/events
 * @access Admin or Organizer
 */
export const createEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const event = await eventService.createEvent(req.body);
  return ApiResponse.success(res, event, "Event created successfully", 201);
});

/**
 * @desc Update an existing event
 * @route PUT /api/events/:id
 * @access Admin or Organizer
 */
export const updateEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const event = await eventService.updateEvent(req.params.id, req.body);
  if (!event) return ApiResponse.error(res, "Event not found", 404);
  return ApiResponse.success(res, event, "Event updated successfully");
});

/**
 * @desc Delete event by ID
 * @route DELETE /api/events/:id
 * @access Admin
 */
export const deleteEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const deleted = await eventService.deleteEvent(req.params.id);
  if (!deleted) return ApiResponse.error(res, "Event not found", 404);
  return ApiResponse.success(res, null, "Event deleted successfully", 204);
});


