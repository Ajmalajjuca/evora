import React, { useState } from 'react';
import { Users, Calendar, Star, TrendingUp, Activity, Zap, ArrowUpRight, Clock, MapPin } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, trend, color }) => {
  return (
    <div className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl p-6 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 blur-xl transition-opacity"></div>

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 ${color} rounded-xl group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          {trend && (
            <div className="flex items-center gap-1 text-emerald-400 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              <span>{trend}%</span>
            </div>
          )}
        </div>

        <div>
          <p className="text-zinc-400 text-sm mb-1">{label}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
        </div>
      </div>
    </div>
  );
};

const EventCard = ({ event }) => {
  return (
    <div className="group relative bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all duration-300 overflow-hidden">
      {/* Hover glow */}
      <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-5 blur-xl transition-opacity"></div>

      {/* Image/Header */}
      <div className="relative h-48 bg-gradient-to-br from-zinc-800 to-zinc-900 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute top-4 right-4 px-3 py-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20">
          <span className="text-white text-xs font-medium">{event.category}</span>
        </div>
        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="text-white font-bold text-xl mb-2">{event.name}</h4>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Info row */}
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-1.5 text-zinc-400">
            <Calendar className="w-4 h-4" />
            <span>{event.date}</span>
          </div>
          <div className="flex items-center gap-1.5 text-zinc-400">
            <MapPin className="w-4 h-4" />
            <span>{event.location}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <Users className="w-4 h-4 text-zinc-400" />
              <span className="text-white font-medium">{event.attendees}</span>
            </div>
            <span className="text-zinc-500 text-sm">attendees</span>
          </div>

          <div className="flex items-center gap-1 bg-zinc-800/50 px-3 py-1.5 rounded-lg">
            <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            <span className="text-white font-medium">{event.rating}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button className="flex-1 bg-white text-black py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-all transform hover:scale-[1.02] active:scale-[0.98]">
            View Details
          </button>
          <button className="px-4 bg-zinc-800 text-white py-2 rounded-lg text-sm font-medium hover:bg-zinc-700 transition-all">
            Edit
          </button>
        </div>
      </div>
    </div>
  );
};

const Dashboard = ({ events = [], users = [] }) => {
  // Sample data if none provided
  const sampleEvents = events.length > 0 ? events : [
    {
      id: 1,
      name: 'Tech Conference 2024',
      date: 'Nov 15, 2024',
      location: 'San Francisco',
      attendees: 250,
      rating: 4.8,
      category: 'Technology'
    },
    {
      id: 2,
      name: 'Design Workshop',
      date: 'Nov 20, 2024',
      location: 'New York',
      attendees: 120,
      rating: 4.6,
      category: 'Design'
    },
    {
      id: 3,
      name: 'Business Summit',
      date: 'Nov 25, 2024',
      location: 'Chicago',
      attendees: 180,
      rating: 4.9,
      category: 'Business'
    }
  ];

  const sampleUsers = users.length > 0 ? users : Array(1234).fill(null);

  const totalAttendees = sampleEvents.reduce((sum, event) => sum + event.attendees, 0);
  const avgRating = (sampleEvents.reduce((sum, event) => sum + event.rating, 0) / sampleEvents.length).toFixed(1);

  return (
    <div className="min-h-screen bg-black p-6 space-y-8">
      {/* Background grid */}
      <div className="fixed inset-0 opacity-10 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}></div>
      </div>

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-2">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Dashboard</h1>
            <p className="text-zinc-400 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              Real-time analytics and insights
            </p>
          </div>
          <div className="flex items-center gap-2 text-zinc-400">
            <Clock className="w-4 h-4" />
            <span className="text-sm">Last updated: Just now</span>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          icon={Users}
          label="Total Users"
          value={sampleUsers.length.toLocaleString()}
          trend={12.5}
          color="bg-white"
        />
        <StatCard
          icon={Calendar}
          label="Total Events"
          value={sampleEvents.length}
          trend={8.2}
          color="bg-zinc-800"
        />
        <StatCard
          icon={Users}
          label="Total Attendees"
          value={totalAttendees.toLocaleString()}
          trend={15.3}
          color="bg-white"
        />
        <StatCard
          icon={Star}
          label="Avg Rating"
          value={avgRating}
          trend={5.1}
          color="bg-zinc-800"
        />
      </div>

      {/* Recent Events Section */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-white mb-1">Recent Events</h2>
            <p className="text-zinc-400 text-sm">Your latest event activities</p>
          </div>
          <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-xl font-medium hover:bg-zinc-200 transition-all transform hover:scale-[1.02]">
            View All
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleEvents.slice(0, 3).map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="relative z-10">
        <h3 className="text-xl font-bold text-white mb-4">Quick Actions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="group p-6 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all text-left">
            <Zap className="w-6 h-6 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-white font-semibold mb-1">Create Event</h4>
            <p className="text-zinc-400 text-sm">Set up a new event quickly</p>
          </button>

          <button className="group p-6 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all text-left">
            <Users className="w-6 h-6 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-white font-semibold mb-1">Manage Users</h4>
            <p className="text-zinc-400 text-sm">View and edit user profiles</p>
          </button>

          <button className="group p-6 bg-zinc-900/50 backdrop-blur-xl rounded-2xl border border-zinc-800 hover:border-zinc-700 transition-all text-left">
            <Activity className="w-6 h-6 text-white mb-3 group-hover:scale-110 transition-transform" />
            <h4 className="text-white font-semibold mb-1">View Analytics</h4>
            <p className="text-zinc-400 text-sm">Deep dive into metrics</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
