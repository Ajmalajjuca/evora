import React, { useState, useMemo } from 'react';
import {
  Plus,
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Tag,
  Image,
  FileText,
  Search,
  Filter,
  TrendingUp,
  CheckCircle2,
  Radio,
  Sparkles,
  IndianRupee,
} from 'lucide-react';
import { createEvent, deleteEvent, updateEvent } from '../Service/eventService';

// Helper function to categorize events
const categorizeEvent = (event) => {
  const now = new Date();

  // Create event start time by combining date and time
  const eventStartTime = new Date(event.date);

  // If time is a string like "21:29", parse and set it
  if (event.time && typeof event.time === 'string' && event.time.includes(':')) {
    const [hours, minutes] = event.time.split(':').map(num => parseInt(num));
    eventStartTime.setHours(hours, minutes, 0, 0);
  }
  // If time is already a Date object
  else if (event.time) {
    const timeObj = new Date(event.time);
    eventStartTime.setHours(timeObj.getHours(), timeObj.getMinutes(), 0, 0);
  }

  // Calculate end time by adding duration to start time
  const eventEndTime = new Date(eventStartTime);
  const durationHours = parseInt(event.hours) || 0;
  const durationMinutes = parseInt(event.minutes) || 0;
  eventEndTime.setHours(eventEndTime.getHours() + durationHours);
  eventEndTime.setMinutes(eventEndTime.getMinutes() + durationMinutes);

  // Check if event is currently happening
  if (eventStartTime <= now && now <= eventEndTime) {
    return 'live';
  }
  // Check if event hasn't started yet
  else if (eventStartTime > now) {
    return 'upcoming';
  }
  // Event has ended
  else {
    return 'completed';
  }
};

// Event Card Component
const EventCard = ({ event, onEdit, onDelete, status }) => {
  const statusConfig = {
    live: {
      badge: 'Live Now',
      badgeClass: 'bg-red-500/20 text-red-400 border-red-500/30',
      icon: Radio,
      glow: 'bg-red-500',
    },
    upcoming: {
      badge: 'Upcoming',
      badgeClass: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      icon: Sparkles,
      glow: 'bg-blue-500',
    },
    completed: {
      badge: 'Completed',
      badgeClass: 'bg-green-500/20 text-green-400 border-green-500/30',
      icon: CheckCircle2,
      glow: 'bg-green-500',
    },
  };

  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden flex flex-col">
      {/* Glow effect */}
      <div className={`absolute inset-0 ${config.glow} opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl blur-xl`}></div>

      {/* Image */}
      {event.image && (
        <div className="relative h-40 overflow-hidden">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>

          {/* Status Badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-semibold border backdrop-blur-md flex items-center gap-1.5 ${config.badgeClass}`}>
            <StatusIcon className="w-3 h-3" />
            {config.badge}
          </div>

          {/* Price Badge */}
          {event.price && (
            <div className="absolute top-3 left-3 px-3 py-1.5 rounded-full text-sm font-bold border backdrop-blur-md flex items-center gap-1.5 bg-emerald-500/20 text-emerald-400 border-emerald-500/30">
              <span>₹{event.price}</span>
            </div>
          )}
        </div>
      )}

      <div className="relative z-10 p-5 flex flex-col flex-grow">
        {/* Header */}
        <div className="mb-3">
          <h3 className="text-lg font-semibold text-white mb-1 line-clamp-1">
            {event.title}
          </h3>
          <p className="text-zinc-400 text-sm line-clamp-2 h-[2.5rem]">
            {event.description || "No description available."}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-2 mb-4 flex-grow-0">
          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
            <Calendar className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 text-xs">
              {event.date
                ? new Date(event.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : "No date"}
            </span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
            <Clock className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 text-xs">
              {event.time}
            </span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
            <MapPin className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 text-xs line-clamp-1">{event.location}</span>
          </div>

          <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
            <Users className="w-4 h-4 text-zinc-400" />
            <span className="text-zinc-300 text-xs">{event.attendees}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 mt-auto">
          <button
            onClick={() => onEdit(event)}
            className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 hover:border-white/20 transition-all"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(event._id)}
            className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, label, value, color, isActive, onClick }) => (
  <button
    onClick={onClick}
    className={`relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 ${
      isActive
        ? `border-${color}-500/50 bg-${color}-500/10`
        : 'bg-zinc-900/50 border-zinc-800 hover:border-zinc-700'
    }`}
  >
    <div className="flex items-center justify-between">
      <div className="text-left">
        <p className="text-zinc-400 text-sm mb-1">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
      </div>
      <div className={`p-4 rounded-xl bg-${color}-500/20`}>
        <Icon className={`w-6 h-6 text-${color}-400`} />
      </div>
    </div>
  </button>
);

// Main Events Page Component
const EventsPage = ({ events = [], setEvents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [formData, setFormData] = useState({
    title: '',
    date: '',
    time: '',
    duration: '',
    location: '',
    image: '',
    attendees: '',
    category: '',
    rating: '',
    description: '',
    hours: '',
    minutes: '',
    price: '',
  });

  const displayEvents = events;

  // Categorize events
  const categorizedEvents = useMemo(() => {
    const live = [];
    const upcoming = [];
    const completed = [];

    displayEvents.forEach(event => {
      const category = categorizeEvent(event);
      if (category === 'live') live.push(event);
      else if (category === 'upcoming') upcoming.push(event);
      else completed.push(event);
    });

    return { live, upcoming, completed };
  }, [displayEvents]);

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      if (setEvents) {
        try {
          // Assuming deleteEvent is available from your service
          const res = await deleteEvent(id);
          setEvents(displayEvents.filter((e) => e._id !== id));
        } catch (error) {
          console.error('Error deleting event:', error);
        }
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assuming createEvent and updateEvent are available from your service
      console.log('formData:',formData);

      const res = await (editingEvent
        ? updateEvent(editingEvent._id, formData)
        : createEvent(formData)
      );

      if (setEvents) {
        if (editingEvent) {
          setEvents([...displayEvents.filter((e) => e._id !== editingEvent._id), { ...formData, _id: editingEvent._id }]);
        } else {
          setEvents([...displayEvents, { ...formData, _id: Date.now().toString() }]);
        }
      }
      setIsModalOpen(false);
      setEditingEvent(null);
      setFormData({
        title: '',
        date: '',
        time: '',
        duration: '',
        location: '',
        image: '',
        attendees: '',
        category: '',
        rating: '',
        description: '',
        hours: '',
        minutes: '',
        price: '',
      });
    } catch (error) {
      console.error('Error creating event:', error);
    }
  };

  // Filter events based on active tab and search
  const filteredEvents = useMemo(() => {
    let eventsList = [];

    if (activeTab === 'all') {
      eventsList = displayEvents;
    } else if (activeTab === 'live') {
      eventsList = categorizedEvents.live;
    } else if (activeTab === 'upcoming') {
      eventsList = categorizedEvents.upcoming;
    } else if (activeTab === 'completed') {
      eventsList = categorizedEvents.completed;
    }

    return eventsList.filter(
      (event) =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.category && event.category.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }, [displayEvents, activeTab, searchQuery, categorizedEvents]);

  return (
    <div className="min-h-screen bg-black p-6 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
          }}
        ></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-red-500 rounded-full blur-3xl opacity-5 animate-float"></div>
      <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500 rounded-full blur-3xl opacity-5 animate-float-delayed"></div>

      <div className="relative z-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Event Management</h1>
            <p className="text-zinc-400">Manage and organize all your events</p>
          </div>
          <button
            onClick={() => {
              setEditingEvent(null);
              setFormData({
                title: '',
                date: '',
                time: '',
                duration: '',
                location: '',
                image: '',
                attendees: '',
                category: '',
                rating: '',
                description: '',
                hours: '',
                minutes: '',
                price: '',
              });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-100 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <StatsCard
            icon={Calendar}
            label="All Events"
            value={displayEvents.length}
            color="white"
            isActive={activeTab === 'all'}
            onClick={() => setActiveTab('all')}
          />
          <StatsCard
            icon={Radio}
            label="Live Now"
            value={categorizedEvents.live.length}
            color="red"
            isActive={activeTab === 'live'}
            onClick={() => setActiveTab('live')}
          />
          <StatsCard
            icon={TrendingUp}
            label="Upcoming"
            value={categorizedEvents.upcoming.length}
            color="blue"
            isActive={activeTab === 'upcoming'}
            onClick={() => setActiveTab('upcoming')}
          />
          <StatsCard
            icon={CheckCircle2}
            label="Completed"
            value={categorizedEvents.completed.length}
            color="green"
            isActive={activeTab === 'completed'}
            onClick={() => setActiveTab('completed')}
          />
        </div>

        {/* Search and Filter Bar */}
        <div className="flex gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500" />
            <input
              type="text"
              placeholder="Search events..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-700 transition-all"
            />
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <div key={event._id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
              <EventCard event={event} onEdit={handleEdit} onDelete={handleDelete} status={categorizeEvent(event)} />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">No events found</h3>
            <p className="text-zinc-600">
              {activeTab === 'all' && 'Try adjusting your search or create a new event'}
              {activeTab === 'live' && 'No events are currently live'}
              {activeTab === 'upcoming' && 'No upcoming events scheduled'}
              {activeTab === 'completed' && 'No completed events'}
            </p>
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-zinc-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden border border-zinc-800 shadow-2xl animate-scale-in">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-6 border-b border-zinc-800">
              <h3 className="text-2xl font-bold text-white">
                {editingEvent ? 'Edit Event' : 'Create New Event'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-6 h-6 text-zinc-400" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="space-y-4">
                {/* Title */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    Event Title
                  </label>
                  <input
                    type="text"
                    placeholder="Enter event title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Date Picker */}
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      Date
                    </label>
                    <input
                      type="date"
                      value={formData.date ? new Date(formData.date).toISOString().split('T')[0] : ''}
                      onChange={(e) => setFormData({ ...formData, date: new Date(e.target.value).toISOString() })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    />
                  </div>

                  {/* Time Picker */}
                  <div className="space-y-2">
  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
    <Clock className="w-4 h-4" />
    Time
  </label>
  <input
    type="time"
    value={formData.time || ''}
    onChange={(e) => {
      setFormData({ ...formData, time: e.target.value }); // directly store "HH:mm"
    }}
    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
  />
</div>

                </div>

                {/* Duration and Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      Duration
                    </label>
                    <div className="flex gap-3">
                      <select
                        value={formData.hours || ''}
                        onChange={(e) => setFormData({ ...formData, hours: e.target.value })}
                        className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-zinc-600"
                        required
                      >
                        <option value="">Hours</option>
                        {[...Array(13)].map((_, i) => (
                          <option key={i} value={i}>
                            {i}h
                          </option>
                        ))}
                      </select>

                      <select
                        value={formData.minutes || ''}
                        onChange={(e) => setFormData({ ...formData, minutes: e.target.value })}
                        className="flex-1 px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-zinc-600"
                        required
                      >
                        <option value="">Minutes</option>
                        {[0, 15, 30, 45, 60].map((m) => (
                          <option key={m} value={m}>
                            {m}m
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <MapPin className="w-4 h-4" />
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter location"
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Category and Attendees */}
<div className="grid grid-cols-1 md:grid-cols-3 gap-4">
  {/* Attendees */}
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
      <Users className="w-4 h-4" />
      Attendees
    </label>
    <input
      type="number"
      placeholder="Expected attendees"
      value={formData.attendees || ''}
      onChange={(e) => {
        const value = e.target.value === '' ? 0 : parseInt(e.target.value);
        setFormData({ ...formData, attendees: value });
      }}
      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
      required
    />
  </div>

  {/* Image URL */}
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
      <Image className="w-4 h-4" />
      Image URL
    </label>
    <input
      type="url"
      placeholder="https://example.com/image.jpg"
      value={formData.image}
      onChange={(e) => setFormData({ ...formData, image: e.target.value })}
      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
      required
    />
  </div>

  {/* Price */}
  <div className="space-y-2">
    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
      <IndianRupee className="w-4 h-4" />
      Price
    </label>
    <input
      type="number"
      placeholder="Enter price (Free = 0)"
      value={formData.price || ''}
      onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
      required
    />
  </div>
</div>


                {/* Description */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                    <FileText className="w-4 h-4" />
                    Description
                  </label>
                  <textarea
                    placeholder="Enter event description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all min-h-[120px] resize-none"
                    required
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSubmit}
                    className="flex-1 bg-white text-black py-3 rounded-xl font-semibold hover:bg-zinc-100 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {editingEvent ? 'Update Event' : 'Create Event'}
                  </button>
                  <button
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 bg-zinc-800 text-white py-3 rounded-xl font-semibold hover:bg-zinc-700 transition-all transform hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-20px) scale(1.05); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(20px) scale(1.05); }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scale-in {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
        .animate-scale-in {
          animation: scale-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EventsPage;
