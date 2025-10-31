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
    duration: {
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
    category: {
      type: String,
      enum: [
        "Technology",
        "Business",
        "Education",
        "Entertainment",
        "Health",
        "Sports",
        "Other",
      ],
      default: "Other",
    },
    rating: {
      type: Number,
      min: 0,
      max: 5,
      default: 0,
    },
    description: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true }
);

export const Event = mongoose.model("Event", eventSchema);
