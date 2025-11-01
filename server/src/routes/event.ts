import express, { Router } from "express";
import { authorize, protect } from "../middleware/auth.js";
import {
  getEvents,
  getEvent,
  getEventsByCategory,
  createEvent,
  updateEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router: Router = express.Router();

// ✅ Public routes (no authentication)
router.get("/", getEvents);
router.get("/:id", getEvent);

// ✅ Protected admin routes
router.post("/", protect, authorize("admin"), createEvent);
router.put("/:id", protect, authorize("admin"), updateEvent);
router.delete("/:id", protect, authorize("admin"), deleteEvent);



export default router;
