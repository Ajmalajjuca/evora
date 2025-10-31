import React, { useState } from 'react';
import { Plus, X, Calendar, Clock, MapPin, Users, Star, Tag, Image, FileText, Search, Filter } from 'lucide-react';

// Event Card Component
const EventCard = ({ event, onEdit, onDelete }) => (
  <div className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
    {/* Glow effect */}
    <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 transition-opacity duration-300 rounded-2xl blur-xl"></div>

    {/* Image */}
    {event.image && (
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 to-transparent"></div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-xs font-medium rounded-lg border border-white/20">
          {event.category}
        </div>
      </div>
    )}

    <div className="relative z-10 p-6">
      {/* Header */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-zinc-100 transition-colors line-clamp-1">
          {event.title}
        </h3>
        <p className="text-zinc-400 text-sm line-clamp-2">{event.description}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
          <Calendar className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-300 text-xs">{event.date}</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
          <Clock className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-300 text-xs">{event.time}</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
          <MapPin className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-300 text-xs">{event.location}</span>
        </div>
        <div className="flex items-center gap-2 p-2 bg-white/5 rounded-lg border border-white/10">
          <Users className="w-4 h-4 text-zinc-400" />
          <span className="text-zinc-300 text-xs">{event.attendees}</span>
        </div>
      </div>

      {/* Rating and Duration */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-1 px-2 py-1 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
          <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
          <span className="text-yellow-400 text-sm font-medium">{event.rating}</span>
        </div>
        <span className="text-zinc-400 text-sm">{event.duration}</span>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => onEdit(event)}
          className="flex-1 px-4 py-2 bg-white/5 hover:bg-white/10 text-white text-sm font-medium rounded-lg border border-white/10 hover:border-white/20 transition-all"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(event.id)}
          className="flex-1 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 text-sm font-medium rounded-lg border border-red-500/20 hover:border-red-500/30 transition-all"
        >
          Delete
        </button>
      </div>
    </div>
  </div>
);

// Main Events Page Component
const EventsPage = ({ events = [], setEvents }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [formData, setFormData] = useState({
    title: '', date: '', time: '', duration: '', location: '', image: '',
    attendees: '', category: '', rating: '', description: ''
  });

  // Mock events if none provided
  const mockEvents = events.length > 0 ? events : [
    {
      id: '1',
      title: 'Tech Conference 2025',
      date: 'Jan 15, 2025',
      time: '10:00 AM',
      duration: '3h',
      location: 'Mumbai Convention Center',
      image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800',
      attendees: 250,
      category: 'Technology',
      rating: 4.8,
      description: 'Join us for the biggest tech conference of the year featuring industry leaders.'
    },
    {
      id: '2',
      title: 'Design Workshop',
      date: 'Jan 20, 2025',
      time: '2:00 PM',
      duration: '2h 30m',
      location: 'Delhi Design Hub',
      image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?w=800',
      attendees: 80,
      category: 'Design',
      rating: 4.5,
      description: 'Learn modern design principles and techniques from expert designers.'
    },
    {
      id: '3',
      title: 'Startup Meetup',
      date: 'Jan 25, 2025',
      time: '6:00 PM',
      duration: '2h',
      location: 'Bangalore Tech Park',
      image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?w=800',
      attendees: 150,
      category: 'Business',
      rating: 4.7,
      description: 'Network with entrepreneurs and investors in the startup ecosystem.'
    }
  ];

  const displayEvents = events.length > 0 ? events : mockEvents;

  const handleEdit = (event) => {
    setEditingEvent(event);
    setFormData(event);
    setIsModalOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this event?')) {
      if (setEvents) {
        setEvents(displayEvents.filter(e => e.id !== id));
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (setEvents) {
      if (editingEvent) {
        setEvents(displayEvents.map(ev => ev.id === editingEvent.id ? { ...formData, id: ev.id } : ev));
      } else {
        setEvents([...displayEvents, { ...formData, id: Date.now().toString() }]);
      }
    }
    setIsModalOpen(false);
    setEditingEvent(null);
    setFormData({ title: '', date: '', time: '', duration: '', location: '', image: '', attendees: '', category: '', rating: '', description: '' });
  };

  const filteredEvents = displayEvents.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black p-6 relative overflow-hidden">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Floating orbs */}
      <div className="absolute top-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl opacity-5 animate-float"></div>

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
              setFormData({ title: '', date: '', time: '', duration: '', location: '', image: '', attendees: '', category: '', rating: '', description: '' });
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-black rounded-xl font-semibold hover:bg-zinc-100 transition-all transform hover:scale-105 active:scale-95 shadow-lg"
          >
            <Plus className="w-5 h-5" />
            Add Event
          </button>
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
          <button className="px-6 py-3 bg-zinc-900/50 backdrop-blur-xl border border-zinc-800 rounded-xl text-white hover:bg-zinc-800 transition-all flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Filter
          </button>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <div key={event.id} style={{ animationDelay: `${index * 100}ms` }}>
              <EventCard event={event} onEdit={handleEdit} onDelete={handleDelete} />
            </div>
          ))}
        </div>

        {filteredEvents.length === 0 && (
          <div className="text-center py-20">
            <Calendar className="w-16 h-16 text-zinc-700 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-zinc-400 mb-2">No events found</h3>
            <p className="text-zinc-600">Try adjusting your search or create a new event</p>
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
                    onChange={e => setFormData({...formData, title: e.target.value})}
                    className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                    required
                  />
                </div>

                {/* Date and Time */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Calendar className="w-4 h-4" />
                      Date
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Jan 15, 2025"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Clock className="w-4 h-4" />
                      Time
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., 10:00 AM"
                      value={formData.time}
                      onChange={e => setFormData({...formData, time: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
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
                    <input
                      type="text"
                      placeholder="e.g., 2h 30m"
                      value={formData.duration}
                      onChange={e => setFormData({...formData, duration: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
                    />
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
                      onChange={e => setFormData({...formData, location: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Category and Attendees */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Tag className="w-4 h-4" />
                      Category
                    </label>
                    <input
                      type="text"
                      placeholder="e.g., Technology"
                      value={formData.category}
                      onChange={e => setFormData({...formData, category: e.target.value})}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Users className="w-4 h-4" />
                      Attendees
                    </label>
                    <input
                      type="number"
                      placeholder="Expected attendees"
                      value={formData.attendees}
                      onChange={e => setFormData({...formData, attendees: parseInt(e.target.value) || ''})}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Rating and Image */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Star className="w-4 h-4" />
                      Rating (0-5)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      min="0"
                      max="5"
                      placeholder="e.g., 4.5"
                      value={formData.rating}
                      onChange={e => setFormData({...formData, rating: parseFloat(e.target.value) || ''})}
                      className="w-full px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-white placeholder-zinc-500 focus:outline-none focus:border-zinc-600 transition-all"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                      <Image className="w-4 h-4" />
                      Image URL
                    </label>
                    <input
                      type="url"
                      placeholder="https://example.com/image.jpg"
                      value={formData.image}
                      onChange={e => setFormData({...formData, image: e.target.value})}
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
                    onChange={e => setFormData({...formData, description: e.target.value})}
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
