import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    hours: {
      type: String,
    },
    minutes: {
      type: String,
    },
    location: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: "",
    },
    attendees: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
    price: {
      type: String,
      default: "0",
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
