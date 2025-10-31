import React from 'react';
import { Calendar, Clock, MapPin, Users, Star, Edit2, Trash2 } from 'lucide-react';

const EventCard = ({ event, onEdit, onDelete }) => (
  <div className="bg-[#F5EFE6] rounded-lg overflow-hidden border-2 border-[#8B6F47] hover:shadow-lg transition-shadow">
    <img src={event.image} alt={event.title} className="w-full h-48 object-cover" />
    <div className="p-4">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-[#2C1810]">{event.title}</h3>
        <span className="px-2 py-1 bg-[#8B6F47] text-[#F5EFE6] text-xs rounded-full">
          {event.category}
        </span>
      </div>
      <p className="text-[#8B6F47] text-sm mb-3 line-clamp-2">{event.description}</p>
      <div className="space-y-2 mb-3">
        <div className="flex items-center text-[#2C1810] text-sm">
          <Calendar className="w-4 h-4 mr-2" />
          {event.date} at {event.time}
        </div>
        <div className="flex items-center text-[#2C1810] text-sm">
          <Clock className="w-4 h-4 mr-2" />
          {event.duration}
        </div>
        <div className="flex items-center text-[#2C1810] text-sm">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location}
        </div>
      </div>
      <div className="flex items-center justify-between pt-3 border-t border-[#8B6F47]">
        <div className="flex items-center gap-4">
          <div className="flex items-center text-[#2C1810]">
            <Users className="w-4 h-4 mr-1" />
            <span className="text-sm font-medium">{event.attendees}</span>
          </div>
          <div className="flex items-center text-[#2C1810]">
            <Star className="w-4 h-4 mr-1 fill-[#8B6F47]" />
            <span className="text-sm font-medium">{event.rating}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => onEdit(event)}
            className="p-2 bg-[#8B6F47] text-[#F5EFE6] rounded hover:bg-[#2C1810] transition"
          >
            <Edit2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(event.id)}
            className="p-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default EventCard;
