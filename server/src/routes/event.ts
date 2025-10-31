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

// Apply authentication middleware to all routes
router.use(protect);

// Routes
router
  .route("/")
  .get(getEvents)
  .post(authorize("admin"), createEvent);

router
  .route("/:id")
  .get(getEvent)
  .put(authorize("admin"), updateEvent)
  .delete(authorize("admin"), deleteEvent);

export default router;
