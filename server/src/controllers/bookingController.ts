import { NextFunction, Request, Response } from "express";
import { ApiResponse } from "../utils/apiResponse.js";
import { catchAsync } from "../utils/catchAsync.js";
import { BookingService } from "../services/bookingService.js";


const bookingService = new BookingService();
export const bookEvent = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const event = await bookingService.bookEvent(req.body);
  if (!event) return ApiResponse.error(res, "Event not found", 404);
  return ApiResponse.success(res, event, "Event booked successfully");
});

export const getBooking = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const event = await bookingService.getBookingById(req.user.id);
  console.log('event:',event);


  if (!event) return ApiResponse.error(res, "Event not found", 404);
  return ApiResponse.success(res, event, "Event fetched successfully");
});
