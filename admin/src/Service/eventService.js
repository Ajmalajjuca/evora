import api from "../api/axios";

/**
 * 🧠 Event Service — handles all event-related API requests
 */

// ✅ Get all events (with optional query params)
export const getAllEvents = async (params = {}) => {
  try {
    const res = await api.get("/events", { params });
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching events:", error);
    throw error;
  }
};

// ✅ Get single event by ID
export const getEventById = async (id) => {
  try {
    const res = await api.get(`/events/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error fetching event with id ${id}:`, error);
    throw error;
  }
};

// ✅ Create new event
export const createEvent = async (eventData) => {
  try {
    const res = await api.post("/events", eventData);
    return res.data;
  } catch (error) {
    console.error("❌ Error creating event:", error);
    throw error;
  }
};

// ✅ Update event by ID
export const updateEvent = async (id, updateData) => {
  try {
    const res = await api.put(`/events/${id}`, updateData);
    return res.data;
  } catch (error) {
    console.error(`❌ Error updating event ${id}:`, error);
    throw error;
  }
};

// ✅ Delete event
export const deleteEvent = async (id) => {
  try {
    const res = await api.delete(`/events/${id}`);
    return res.data;
  } catch (error) {
    console.error(`❌ Error deleting event ${id}:`, error);
    throw error;
  }
};

// ✅ Search events by title or keyword
export const searchEvents = async (query) => {
  try {
    const res = await api.get(`/events/search`, { params: { q: query } });
    return res.data;
  } catch (error) {
    console.error("❌ Error searching events:", error);
    throw error;
  }
};

// ✅ Get events by date or category
export const filterEvents = async (filters) => {
  try {
    const res = await api.get(`/events/filter`, { params: filters });
    return res.data;
  } catch (error) {
    console.error("❌ Error filtering events:", error);
    throw error;
  }
};

// ✅ Get event analytics (for admin dashboard)
export const getEventAnalytics = async () => {
  try {
    const res = await api.get("/events/analytics");
    return res.data;
  } catch (error) {
    console.error("❌ Error fetching event analytics:", error);
    throw error;
  }
};



