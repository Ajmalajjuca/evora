import API from "./axios";

/**
 * 🧠 Event Service — handles all event-related API requests
 */

// ✅ Get all events (with optional query params)
export const getAllEvents = async (params = {}) => {
  try {
    const res = await API.get("/events", { params });
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    throw error;
  }
};

// ✅ Get single event by ID
export const getEventById = async (id) => {
  try {
    const res = await API.get(`/events/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error fetching event with id ${id}:`, error);
    throw error;
  }
};

export const getBookingById = async (id) => {
  try {
    const res = await API.get(`/book`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error fetching event with id ${id}:`, error);
    throw error;
  }
}

export const bookEvent = async (bookingData) => {
  try {
    const res = await API.post(`/book`, bookingData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error booking event ${eventId}:`, error);
    throw error;
  }
};

// ✅ Search events by title or keyword
export const searchEvents = async (query) => {
  try {
    const res = await API.get(`/events/search`, { params: { q: query } });
    return res.data;
  } catch (error) {
    console.error("❌ Error searching events:", error);
    throw error;
  }
};

// ✅ Get events by date or category
export const filterEvents = async (filters) => {
  try {
    const res = await API.get(`/events/filter`, { params: filters });
    return res.data;
  } catch (error) {
    console.error("❌ Error filtering events:", error);
    throw error;
  }
};





