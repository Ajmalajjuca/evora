import express, { Router } from "express";
import { authorize, protect } from "../middleware/auth.js";
import { bookEvent, getBooking } from "../controllers/bookingController.js";


const router: Router = express.Router();

router.post("/", protect, authorize("user", "admin"), bookEvent);
router.get("/", protect, authorize("user", "admin"), getBooking);


export default router;
